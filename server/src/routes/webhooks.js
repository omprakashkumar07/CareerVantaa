import express from 'express';
import crypto from 'crypto';
import { config, PRODUCTS } from '../config.js';
import { supabase } from '../services/supabase.js';
import { Resend } from 'resend';
import { PRODUCT_FILES } from './downloads.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const webhooksRouter = express.Router();

// The raw body is required for webhook signature verification.
// We must parse it as raw JSON buffer.
webhooksRouter.post('/razorpay', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.body; // Buffer because of express.raw

    if (!signature) {
      return res.status(400).send('No signature');
    }

    const expectedSignature = crypto
      .createHmac('sha256', config.razorpay.webhookSecret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      return res.status(400).send('Invalid signature');
    }

    const payload = JSON.parse(rawBody.toString());
    const eventType = payload.event;
    const eventId = req.headers['x-razorpay-event-id'] || payload.payload?.payment?.entity?.id || Date.now().toString();

    // 1. Idempotency Check
    const { data: existingEvent } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('event_id', eventId)
      .single();

    if (existingEvent) {
      return res.status(200).send('Already processed');
    }

    // 2. Insert event to prevent concurrent processing
    const { error: insertError } = await supabase
      .from('webhook_events')
      .insert({
        event_id: eventId,
        event_type: eventType,
        payload: payload
      });
      
    if (insertError) {
      // If uniqueness constraint failed, it's already processed
      if (insertError.code === '23505') {
        return res.status(200).send('Already processed');
      }
      throw insertError;
    }

    // 3. Process the event
    if (eventType === 'order.paid' || eventType === 'payment.captured') {
      const paymentEntity = payload.payload.payment.entity;
      const razorpay_order_id = paymentEntity.order_id;
      const razorpay_payment_id = paymentEntity.id;

      // Ensure the order is marked paid and payment ID is recorded
      if (razorpay_order_id) {
        const { data: orderToUpdate } = await supabase
          .from('orders')
          .select('id, product_id, status')
          .eq('razorpay_order_id', razorpay_order_id)
          .single();

        if (orderToUpdate && orderToUpdate.status !== 'paid') {
          // Mark paid
          await supabase
            .from('orders')
            .update({
              status: 'paid',
              razorpay_payment_id: razorpay_payment_id
            })
            .eq('id', orderToUpdate.id);
            
          // Create entitlements
          const productConfig = PRODUCTS[orderToUpdate.product_id];
          if (productConfig && productConfig.entitlements) {
            const entitlementsToInsert = productConfig.entitlements.map(entId => ({
              order_id: orderToUpdate.id,
              product_id: entId
            }));

            // Ignore duplicates if they somehow exist
            await supabase
              .from('entitlements')
              .insert(entitlementsToInsert);
          }

          // Send Email Fallback
          try {
            const customerEmail = paymentEntity.email;
            const productId = orderToUpdate.product_id;
            const filePath = PRODUCT_FILES[productId];

            if (customerEmail && filePath) {
              const { data: signedData, error: urlError } = await supabase
                .storage
                .from('careervantaa-products')
                .createSignedUrl(filePath, 7 * 24 * 60 * 60); // 7 days expiry

              if (!urlError && signedData?.signedUrl) {
                const productName = productConfig?.name || productId;
                await resend.emails.send({
                  from: 'CareerVantaa <noreply@careervantaa.com>',
                  to: customerEmail,
                  subject: `Your Download Link: ${productName}`,
                  text: `Thank you for your purchase!\n\nOrder ID: ${razorpay_order_id}\nProduct: ${productName}\n\nYou can download your files using the link below (valid for 7 days):\n\n${signedData.signedUrl}\n\nIf you have any issues, contact us at support@careervantaa.com.\n\nThanks,\nCareerVantaa Team`
                });
              } else {
                console.error(`Email Fallback: Failed to generate signed URL for order ${razorpay_order_id}`, urlError);
              }
            } else {
              console.error(`Email Fallback: Missing email or filePath for order ${razorpay_order_id}`);
            }
          } catch (emailErr) {
            console.error(`Email Fallback: Send failed for order ${razorpay_order_id}:`, emailErr);
          }
        }
      }
    }

    return res.status(200).send('OK');
  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(500).send('Webhook error');
  }
});
