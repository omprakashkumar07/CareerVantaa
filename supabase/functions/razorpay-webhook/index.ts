import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";
import { PRODUCTS } from "../_shared/config.ts";

/**
 * Verify Razorpay HMAC-SHA256 webhook signature using the Web Crypto API.
 * Uses crypto.subtle.verify() which performs constant-time comparison internally.
 */
async function verifyRazorpaySignature(
  rawBody: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBytes = await crypto.subtle.sign('HMAC', key, encoder.encode(rawBody));
  const expectedHex = Array.from(new Uint8Array(signatureBytes))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  // Constant-length comparison to mitigate timing attacks
  if (expectedHex.length !== signature.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expectedHex.length; i++) {
    mismatch |= expectedHex.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET');

    if (!secret || !signature) {
      throw new Error('Missing webhook secret or signature');
    }

    // Verify HMAC-SHA256 signature using Web Crypto API
    const isValid = await verifyRazorpaySignature(rawBody, signature, secret);
    if (!isValid) {
      console.error('Signature mismatch');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 });
    }

    const event = JSON.parse(rawBody);

    if (event.event !== 'payment_link.paid') {
      return new Response(JSON.stringify({ message: 'Event ignored' }), { status: 200 });
    }

    const payload = event.payload.payment_link.entity;
    const paymentEntity = event.payload.payment.entity;

    const paymentLinkId = payload.id;
    const razorpayPaymentId = paymentEntity.id;
    const razorpayOrderId = payload.order_id || null;
    const amount = payload.amount;
    const currency = payload.currency;
    
    // Map payment link to product
    let productId = null;
    if (paymentLinkId === Deno.env.get('RAZORPAY_STARTER_PAYMENT_LINK_ID')) productId = 'starter';
    else if (paymentLinkId === Deno.env.get('RAZORPAY_ACCELERATOR_PAYMENT_LINK_ID')) productId = 'accelerator';
    else if (paymentLinkId === Deno.env.get('RAZORPAY_LAUNCH_PAYMENT_LINK_ID')) productId = 'launch';

    if (!productId || !PRODUCTS[productId]) {
      console.error(`Unknown payment link ID: ${paymentLinkId}`);
      return new Response(JSON.stringify({ error: 'Unknown payment link' }), { status: 400 });
    }

    // Strict server-side amount validation (prices in paise)
    const expectedAmountPaise = PRODUCTS[productId].price * 100;
    if (amount !== expectedAmountPaise) {
      console.error(`Amount mismatch for ${productId}: expected ${expectedAmountPaise}, got ${amount}`);
      return new Response(JSON.stringify({ error: 'Amount mismatch' }), { status: 400 });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Check Idempotency
    const { data: existingEvent } = await supabaseAdmin
      .from('webhook_events')
      .select('id')
      .eq('event_id', event.account_id + '_' + event.event + '_' + razorpayPaymentId)
      .single();

    if (existingEvent) {
      console.log('Duplicate webhook event detected, ignoring');
      return new Response(JSON.stringify({ success: true, message: 'Already processed' }), { status: 200 });
    }

    // 2. Register Webhook Event
    const eventId = event.account_id + '_' + event.event + '_' + razorpayPaymentId;
    await supabaseAdmin.from('webhook_events').insert({
      event_id: eventId,
      event_type: event.event,
      payload: event
    });

    // 3. Create Order
    const { data: order, error: orderError } = await supabaseAdmin.from('orders').insert({
      razorpay_payment_link_id: paymentLinkId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_order_id: razorpayOrderId,
      product_id: productId,
      product_name: PRODUCTS[productId].productName,
      amount: amount,
      currency: currency,
      status: 'paid',
      customer_name: paymentEntity.notes?.name || null,
      customer_email: paymentEntity.email || null,
      customer_phone: paymentEntity.contact || null
    }).select('id, access_token').single();

    if (orderError) throw orderError;

    // 4. Create Entitlements
    const entitlementsToCreate = PRODUCTS[productId].access.map((accessItem) => ({
      order_id: order.id,
      product_id: accessItem
    }));

    const { error: entitlementError } = await supabaseAdmin.from('entitlements').insert(entitlementsToCreate);
    
    if (entitlementError) throw entitlementError;

    console.log(`Successfully processed order for ${productId}`);
    return new Response(JSON.stringify({ success: true }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    const err = error as Error;
    console.error('Webhook error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { headers: corsHeaders, status: 500 });
  }
});
