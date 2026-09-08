import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo/Logo';

export default function Failed() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center' }}>
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} style={{ textDecoration: 'none' }}>
          <Logo />
        </a>
      </nav>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '1.5rem', padding: '3rem', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginBottom: '2rem' }}>
            <XCircle size={32} />
          </div>
          
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Payment wasn't completed.</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your order was not confirmed. You can try again.
          </p>

          <button onClick={() => navigate(-1)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Try Again <ArrowRight className="btnArrow" size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}
