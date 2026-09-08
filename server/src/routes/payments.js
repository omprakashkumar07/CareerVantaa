import express from 'express';
import crypto from 'crypto';
import { razorpay } from '../razorpay.js';
import { supabase } from '../services/supabase.js';
import { config, PRODUCTS } from '../config.js';

export const paymentsRouter = express.Router();

// POST /api/create-order
paymentsRouter.post('/create-order', async (req, res) => {
  try {
    const { productId } = req.body;

    const product = PRODUCTS[productId];
    if (!product) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // 1. Create Razorpay order
    const options = {
      amount: product.amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    };
    const rzpOrder = await razorpay.orders.create(options);

    // 2. Generate internal order record safely with random access token
    let order;
    let attempts = 0;
    
    while (attempts < 3) {
      const accessToken = crypto.randomUUID();
      const { data, error } = await supabase
        .from('orders')
        .insert({
          razorpay_order_id: rzpOrder.id,
          product_id: productId,
          product_name: product.name,
          amount: product.amount,
          currency: "INR",
          status: 'created',
          access_token: accessToken
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          attempts++;
          continue;
        }
        console.error("Supabase insert error:", error);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      order = data;
      break;
    }

    if (!order) {
      return res.status(500).json({ error: 'Failed to create order securely' });
    }

    // 3. Return checkout parameters
    return res.json({
      orderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      keyId: config.razorpay.keyId,
    });
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

// POST /api/verify-payment
paymentsRouter.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment parameters' });
    }

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.keySecret)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // 2. Retrieve internal order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .single();

    if (orderError || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status === 'paid') {
      // Idempotency: Already processed
      return res.json({
        verified: true,
        purchasedProduct: order.product_id,
        entitlements: PRODUCTS[order.product_id]?.entitlements || [],
        accessToken: order.access_token,
        amount: order.amount
      });
    }

    // 3. Mark order as paid
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        razorpay_payment_id: razorpay_payment_id,
      })
      .eq('id', order.id);

    if (updateError) {
      console.error("Order update error:", updateError);
      return res.status(500).json({ error: 'Failed to update order status' });
    }

    // 4. Create Entitlements
    const productConfig = PRODUCTS[order.product_id];
    if (productConfig && productConfig.entitlements) {
      const entitlementsToInsert = productConfig.entitlements.map(entId => ({
        order_id: order.id,
        product_id: entId
      }));

      // Ignore duplicates if they somehow exist
      const { error: entError } = await supabase
        .from('entitlements')
        .insert(entitlementsToInsert);
        
      if (entError) {
        console.error("Entitlement insert error:", entError);
        // We do not fail the request here, but log it for manual intervention or retry
      }
    }

    return res.json({
      verified: true,
      purchasedProduct: order.product_id,
      entitlements: productConfig ? productConfig.entitlements : [],
      accessToken: order.access_token,
      amount: order.amount
    });
  } catch (err) {
    console.error("Verify payment error:", err);
    return res.status(500).json({ error: 'Verification failed' });
  }
});
