import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET,
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }
};

export const PRODUCTS = {
  starter: {
    name: "Fresher Job Starter Pack",
    amount: 9900, // INR paise
    entitlements: ["starter"]
  },
  accelerator: {
    name: "Fresher Job Accelerator",
    amount: 29900,
    entitlements: ["starter", "accelerator"]
  },
  launch: {
    name: "Fresher Career Launch Pack",
    amount: 49900,
    entitlements: ["starter", "accelerator", "launch"]
  }
};
