import express from 'express';
import { supabase } from '../services/supabase.js';

export const downloadsRouter = express.Router();

const PRODUCT_FILES = {
  starter: "starter/Fresher_Job_Starter_Pack.zip",
  accelerator: "accelerator/Fresher_Job_Accelerator_Pack.zip",
  launch: "launch/Fresher_Career_Launch_Pack.zip"
};

// POST /api/download/:productId
downloadsRouter.post('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const { accessToken } = req.body;

    if (!productId || !accessToken) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    const filePath = PRODUCT_FILES[productId];
    if (!filePath) {
      return res.status(400).json({ error: 'Invalid product' });
    }

    // 1. Verify access token maps to a valid order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status')
      .eq('access_token', accessToken)
      .single();

    if (orderError || !order) {
      return res.status(401).json({ error: 'Invalid access token' });
    }

    if (order.status !== 'paid') {
      return res.status(403).json({ error: 'Order not paid' });
    }

    // 2. Verify entitlement
    const { data: entitlement, error: entError } = await supabase
      .from('entitlements')
      .select('id')
      .eq('order_id', order.id)
      .eq('product_id', productId)
      .single();

    if (entError || !entitlement) {
      return res.status(403).json({ error: 'Not entitled to this product' });
    }

    // 3. Generate signed URL (valid for 5 minutes / 300 seconds)
    const { data, error: urlError } = await supabase
      .storage
      .from('careervantaa-products')
      .createSignedUrl(filePath, 300);

    if (urlError || !data?.signedUrl) {
      console.error("Signed URL error:", urlError);
      return res.status(500).json({ error: 'Failed to generate download link' });
    }

    // 4. Return the signed URL
    return res.json({ success: true, downloadUrl: data.signedUrl });
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
