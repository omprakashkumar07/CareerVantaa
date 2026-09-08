import { createContext, useContext, useState } from 'react';
import styles from './CheckoutToast.module.css';
import { Info, X } from 'lucide-react';

const CheckoutContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCheckout() {
  return useContext(CheckoutContext);
}

export function CheckoutProvider({ children }) {
  const [toastVisible, setToastVisible] = useState(false);

  const handleCheckoutClick = (e, url) => {
    if (!url || url.startsWith('#')) {
      e.preventDefault();
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }
  };

  return (
    <CheckoutContext.Provider value={{ handleCheckoutClick }}>
      {children}
      {toastVisible && (
        <div className={`${styles.toast} animate-fade-in`}>
          <div className={styles.toastContent}>
            <Info size={20} className={styles.icon} />
            <div>
              <h4>Payment link is not configured yet.</h4>
              <p>Check back later or contact support.</p>
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
