import { createContext, useContext, useState } from 'react';
import styles from './CheckoutToast.module.css';
import { Info, X, Loader2 } from 'lucide-react';
import { BACKEND_URL } from '../config';
import { PRODUCTS } from '../utils/products';
import { trackBeginCheckout, trackViewItem } from '../utils/analytics';

const CheckoutContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCheckout() {
  return useContext(CheckoutContext);
}

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export function CheckoutProvider({ children }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  const handleCheckoutClick = async (e, productId) => {
    e.preventDefault();
    if (!productId || productId.startsWith('#')) return;

    const product = PRODUCTS[productId];
    if (product) {
      trackViewItem(product);
      trackBeginCheckout(product);
    }

    setIsLoading(true);
    
    try {
      const res = await loadRazorpay();
      if (!res) {
        showToast("Razorpay SDK failed to load. Are you online?");
        setIsLoading(false);
        return;
      }

      // Create Order
      const dataRes = await fetch(`${BACKEND_URL}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      const data = await dataRes.json();

      if (!dataRes.ok) {
        showToast(data.error || "Failed to create order");
        setIsLoading(false);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "CareerVantaa",
        description: `Purchase ${productId}`,
        handler: function (response) {
          // Redirect to Success page with the verification data
          const query = new URLSearchParams({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          }).toString();
          
          window.location.href = `/payment-success?${query}`;
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        theme: {
          color: "#3b82f6"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        console.error(response.error);
        window.location.href = `/payment-failed`;
      });
      
      paymentObject.open();
    } catch (err) {
      console.error(err);
      showToast("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider value={{ handleCheckoutClick }}>
      {children}
      {isLoading && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 className="animate-spin" size={48} color="white" />
        </div>
      )}
      {toastVisible && (
        <div className={`${styles.toast} animate-fade-in`}>
          <div className={styles.toastContent}>
            <Info size={20} className={styles.icon} />
            <div>
              <h4>Notice</h4>
              <p>{toastMsg}</p>
            </div>
            <button className={styles.closeBtn} onClick={() => setToastVisible(false)}>
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </CheckoutContext.Provider>
  );
}

