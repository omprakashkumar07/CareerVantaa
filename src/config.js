// Keeping the name PAYMENT_LINKS to avoid unnecessary frontend refactoring,
// but these now map directly to the backend product IDs.
export const PAYMENT_LINKS = {
  starter: "starter",
  accelerator: "accelerator",
  launch: "launch"
};

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';
