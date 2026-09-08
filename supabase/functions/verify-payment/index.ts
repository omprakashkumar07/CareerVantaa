import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { razorpay_payment_id } = await req.json();

    if (!razorpay_payment_id) {
      return new Response(JSON.stringify({ error: 'Missing payment ID' }), { headers: corsHeaders, status: 400 });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('id, status, access_token, product_id, product_name, razorpay_order_id, amount')
      .eq('razorpay_payment_id', razorpay_payment_id)
      .single();

    if (error || !order) {
      // Payment might not be processed by webhook yet
      return new Response(JSON.stringify({ status: 'pending' }), { headers: corsHeaders, status: 200 });
    }

    if (order.status !== 'paid') {
      return new Response(JSON.stringify({ status: order.status }), { headers: corsHeaders, status: 200 });
    }

    // Fetch entitlements
    const { data: entitlements } = await supabaseAdmin
      .from('entitlements')
      .select('product_id')
      .eq('order_id', order.id);

    return new Response(JSON.stringify({
      status: 'paid',
      access_token: order.access_token,
      order: {
        product_id: order.product_id,
        product_name: order.product_name,
        razorpay_order_id: order.razorpay_order_id || order.id, // Fallback if no Razorpay order ID exists for links
        amount: order.amount,
        entitlements: entitlements?.map((e: { product_id: string }) => e.product_id) || []
      }
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    const err = error as Error;
    console.error('Verify payment error:', err.message);
    return new Response(JSON.stringify({ error: err.message }), { headers: corsHeaders, status: 500 });
  }
});
