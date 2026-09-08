import Razorpay from 'razorpay';
import { config } from './config.js';

if (!config.razorpay.keyId || !config.razorpay.keySecret) {
  throw new Error("Missing Razorpay credentials");
}

export const razorpay = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret,
});
