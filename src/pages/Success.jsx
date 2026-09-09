import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Loader2, Download, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo/Logo';
import { BACKEND_URL } from '../config';
import { PRODUCTS } from '../utils/products';
import { trackPurchase } from '../utils/analytics';

// PRODUCTS_MAP is replaced by PRODUCTS from utils/products

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('razorpay_payment_id');
  const orderId = searchParams.get('razorpay_order_id');
  const signature = searchParams.get('razorpay_signature');
  
  const [status, setStatus] = useState(paymentId && orderId && signature ? 'verifying' : 'invalid');
  const [orderData, setOrderData] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  
  const [downloading, setDownloading] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const pollCount = useRef(0);
  const purchaseTracked = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!paymentId || !orderId || !signature) return;

    let timeoutId;
    const verifyPayment = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/payments/verify-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            razorpay_signature: signature
          })
        });
        
        const data = await res.json();
        
        if (res.ok && data.verified) {
          setAccessToken(data.accessToken);
          setOrderData({
            razorpay_order_id: orderId,
            amount: data.amount,
            entitlements: data.entitlements
          });
          if (!purchaseTracked.current) {
            purchaseTracked.current = true;
            // Track purchase for each product in the order (usually 1)
            data.entitlements.forEach(productId => {
              const product = PRODUCTS[productId];
              if (product) {
                trackPurchase(orderId, product);
              }
            });
          }

          setStatus('verified');
          return;
        }

        setStatus('failed');
      } catch (err) {
        console.error("Verification error", err);
        pollCount.current += 1;
        if (pollCount.current > 3) {
          setStatus('timeout');
          return;
        }
        timeoutId = setTimeout(verifyPayment, 3000);
      }
    };

    verifyPayment();

    return () => clearTimeout(timeoutId);
  }, [paymentId, orderId, signature, searchParams]);

  const handleDownload = async (productId) => {
    if (downloading) return;
    setDownloading(productId);
    setErrorMsg(null);

    try {
      const res = await fetch(`${BACKEND_URL}/download/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken })
      });
      
      const data = await res.json();
      
      if (data.success && data.downloadUrl) {
        // Trigger download
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Backend returned error:", data.error);
        setErrorMsg(`Download failed: ${data.error || "Unknown error"}. Please refresh and try again.`);
      }
    } catch (err) {
      console.error("Download error", err);
      setErrorMsg("Failed to initiate download. Please try again.");
    } finally {
      setTimeout(() => setDownloading(null), 2000); // Reset button state after brief delay
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none' }}>
          <Logo />
        </a>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1.5rem', padding: '3rem', maxWidth: '600px', width: '100%' }}>
          
          {status === 'invalid' && (
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No Payment Data</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                We couldn't find your payment details. Make sure you use the link provided after checkout.
              </p>
              <button onClick={() => navigate('/')} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Return to Homepage
              </button>
            </div>
          )}

          {status === 'verifying' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', marginBottom: '2rem' }}>
                <Loader2 size={32} className="animate-spin" />
              </div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Payment received. We're verifying your payment...</h1>
              <p style={{ color: 'var(--text-muted)' }}>
                Please do not close this page. This usually takes just a few seconds.
              </p>
            </div>
          )}

          {status === 'timeout' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', marginBottom: '2rem' }}>
                <AlertCircle size={32} />
              </div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Verification Pending</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Your payment was received and is being verified. Please refresh this page in a moment.
              </p>
              <button onClick={() => window.location.reload()} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Refresh Page
              </button>
            </div>
          )}

          {status === 'failed' && (
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Payment Failed</h1>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Your payment was marked as failed or cancelled.
              </p>
              <button onClick={() => navigate('/')} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Return to Homepage
              </button>
            </div>
          )}

          {status === 'verified' && orderData && (
            <div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', marginBottom: '1rem' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Payment Successful ✓</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  Your payment has been verified.
                </p>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                  <span style={{ fontFamily: 'monospace' }}>{orderData.razorpay_order_id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Amount Paid:</span>
                  <span>₹{orderData.amount / 100}</span>
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Your Products</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {orderData.entitlements.map(product => (
                  <div key={product} style={{ background: 'var(--bg-deep)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ fontWeight: '500' }}>{PRODUCTS[product]?.name || product}</div>
                    <button 
                      onClick={() => handleDownload(product)}
                      disabled={downloading === product}
                      className="btn btn-primary" 
                      style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                    >
                      {downloading === product ? (
                        <>Preparing your download... <Loader2 className="animate-spin" size={18} style={{ marginLeft: '0.5rem' }} /></>
                      ) : (
                        <>[ Download {product === 'starter' ? 'Starter Pack' : product === 'accelerator' ? 'Job Accelerator' : 'Career Launch Pack'} ] <Download size={18} style={{ marginLeft: '0.5rem' }} /></>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {errorMsg && (
                <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
                  {errorMsg}
                </div>
              )}

            </div>
          )}
        </div>
      </main>
    </div>
  );
}
