import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";
import { PRODUCTS } from "../_shared/config.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { accessToken, product } = await req.json();

    if (!accessToken || !product) {
      return new Response(JSON.stringify({ success: false, error: 'Missing access token or product' }), { headers: corsHeaders, status: 400 });
    }

    if (!PRODUCTS[product]) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid product requested' }), { headers: corsHeaders, status: 400 });
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 1. Verify access token
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('id, status')
      .eq('access_token', accessToken)
      .single();

    if (orderError || !order) {
      return new Response(JSON.stringify({ success: false, error: 'Access denied' }), { headers: corsHeaders, status: 401 });
    }

    if (order.status !== 'paid') {
      return new Response(JSON.stringify({ success: false, error: 'Order is not paid' }), { headers: corsHeaders, status: 403 });
    }

    // 2. Check entitlement
    const { data: entitlement, error: entError } = await supabaseAdmin
      .from('entitlements')
      .select('id')
      .eq('order_id', order.id)
      .eq('product_id', product)
      .single();

    if (entError || !entitlement) {
      return new Response(JSON.stringify({ success: false, error: 'Not entitled to this product' }), { headers: corsHeaders, status: 403 });
    }

    // 3. Generate Signed URL
    const storagePath = PRODUCTS[product].storagePath;
    
    // 5 minutes expiry
    const { data: signedUrlData, error: storageError } = await supabaseAdmin
      .storage
      .from('careervantaa-products')
      .createSignedUrl(storagePath, 300);

    if (storageError || !signedUrlData) {
      console.error('Storage error:', storageError);
      return new Response(JSON.stringify({ success: false, error: 'Could not generate download link' }), { headers: corsHeaders, status: 500 });
    }

    return new Response(JSON.stringify({
      success: true,
      downloadUrl: signedUrlData.signedUrl
    }), { headers: corsHeaders, status: 200 });

  } catch (error) {
    const err = error as Error;
    console.error('Download error:', err.message);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error' }), { headers: corsHeaders, status: 500 });
  }
});
