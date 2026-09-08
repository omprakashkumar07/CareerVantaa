import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1.5rem' }}>Contact Us</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
            We're here to help with any questions or technical issues regarding your purchase.
          </p>
          
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '3rem 2rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Email Support</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>For the fastest response, please include your Order ID if you are contacting us about a recent purchase.</p>
            
            <a 
              href="mailto:support@careervantaa.com" 
              className="btn btn-primary"
              style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}
            >
              support@careervantaa.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
