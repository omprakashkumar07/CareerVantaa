import express from 'express';
import { supabase } from '../services/supabase.js';

export const downloadsRouter = express.Router();

const PRODUCT_FILES = {
  starter: "starter/Fresher Job Starter Pack.zip",
  accelerator: "accelerator/Fresher Job Accelerator.zip",
  launch: "launch/Fresher Career Launch Pack.zip"
};

// POST /api/download/:productId
downloadsRouter.post('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { accessToken } = req.body;

    if (!productId || !accessToken) {
      console.error('DOWNLOAD_AUTH_TOKEN_MISSING');
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const filePath = PRODUCT_FILES[productId];
    if (!filePath) {
      console.error('DOWNLOAD_PRODUCT_NOT_AUTHORIZED', { productId });
      return res.status(400).json({ error: 'Invalid product' });
    }

    // 1. Verify access token maps to a valid order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status')
      .eq('access_token', accessToken)
      .single();

    if (orderError || !order) {
      console.error('DOWNLOAD_ORDER_NOT_FOUND', { accessToken, orderError });
      return res.status(401).json({ error: 'Invalid access token' });
    }

    if (order.status !== 'paid') {
      console.error('DOWNLOAD_ORDER_NOT_PAID', { status: order.status });
      return res.status(403).json({ error: 'Order not paid' });
    }

    // 2. Verify entitlement
    const { data: entitlements, error: entError } = await supabase
      .from('entitlements')
      .select('id')
      .eq('order_id', order.id)
      .eq('product_id', productId)
      .limit(1);

    if (entError || !entitlements || entitlements.length === 0) {
      console.error('DOWNLOAD_ENTITLEMENT_MISSING', { orderId: order.id, productId, entError });
      return res.status(403).json({ error: 'Not entitled to this product' });
    }

    // 3. Generate signed URL (valid for 5 minutes / 300 seconds)
    const { data, error: urlError } = await supabase
      .storage
      .from('careervantaa-products')
      .createSignedUrl(filePath, 300);

    if (urlError || !data?.signedUrl) {
      console.error('DOWNLOAD_SIGNED_URL_FAILED', urlError);
      const safeMsg = urlError ? urlError.message : "No signed URL returned";
      return res.status(500).json({ error: `DOWNLOAD_SIGNED_URL_FAILED: ${safeMsg}` });
    }

    // 4. Return the signed URL
    return res.json({ success: true, downloadUrl: data.signedUrl });
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
