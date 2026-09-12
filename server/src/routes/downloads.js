import express from 'express';
import { supabase } from '../services/supabase.js';

export const downloadsRouter = express.Router();

export const PRODUCT_FILES = {
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

    if (order.status !== 'paid' && order.status !== 'claimed') {
      console.error('DOWNLOAD_ORDER_NOT_VALID', { status: order.status });
      return res.status(403).json({ error: 'Order not valid for download' });
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

    // 4. Mark order as claimed (if it was just 'paid')
    if (order.status === 'paid') {
      await supabase
        .from('orders')
        .update({ status: 'claimed' })
        .eq('id', order.id);
    }

    // 5. Return the signed URL
    return res.json({ success: true, downloadUrl: data.signedUrl });
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/download/email/:accessToken
downloadsRouter.get('/email/:accessToken', async (req, res) => {
  try {
    const { accessToken } = req.params;

    if (!accessToken) {
      return res.status(400).send('Missing access token');
    }

    // 1. Verify access token maps to a valid order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, status, product_id')
      .eq('access_token', accessToken)
      .single();

    if (orderError || !order) {
      return res.status(401).send('Invalid link.');
    }

    // 2. Check claim state
    if (order.status === 'claimed') {
      return res.status(403).send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px; color: #334155;">
          <h2>Link Already Used</h2>
          <p>This download link has already been used.</p>
          <p>If you need to download your files again, please contact <strong>support@careervantaa.com</strong>.</p>
        </div>
      `);
    }

    if (order.status !== 'paid') {
      return res.status(403).send('Order is not in a valid state for download.');
    }

    // 3. Generate short-lived signed URL for the primary product
    const filePath = PRODUCT_FILES[order.product_id];
    if (!filePath) {
      return res.status(400).send('Invalid product configuration.');
    }

    const { data: urlData, error: urlError } = await supabase
      .storage
      .from('careervantaa-products')
      .createSignedUrl(filePath, 300); // 300 seconds (5 minutes)

    if (urlError || !urlData?.signedUrl) {
      console.error('EMAIL_SIGNED_URL_FAILED', urlError);
      return res.status(500).send('Failed to generate secure download link.');
    }

    // 4. Mark order as claimed
    await supabase
      .from('orders')
      .update({ status: 'claimed' })
      .eq('id', order.id);

    // 5. Redirect user to the actual file
    return res.redirect(302, urlData.signedUrl);

  } catch (err) {
    console.error("Email download error:", err);
    return res.status(500).send('Internal server error');
  }
});
