import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '2rem' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Last updated: 08 Aug 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7' }}>
            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Information We Collect</h2>
              <p>We only collect the information necessary to process your payment and deliver our digital products. This includes your name, email address, and phone number provided during checkout. Payment details are processed securely by our payment provider (Razorpay) and are not stored on our servers.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>2. How We Use Your Information</h2>
              <p>Your information is used strictly to:</p>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Deliver your purchased digital products.</li>
                <li>Send important updates related to your purchase.</li>
                <li>Respond to your customer support requests.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>3. Information Sharing</h2>
              <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you (such as payment gateways), so long as those parties agree to keep this information confidential.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>4. Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. All transactions are processed through a gateway provider and are not stored or processed on our servers.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>5. Contact Us</h2>
              <p>If there are any questions regarding this privacy policy, you may contact us at support@careervantaa.com.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
