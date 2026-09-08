import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function Refund() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '2rem' }}>Cancellation & Refund Policy</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Last updated: 08 Aug 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7' }}>
            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Digital Product Nature</h2>
              <p>All products sold on CareerVantaa are instantly downloadable digital goods (PDFs, templates, guides, prompt libraries). Due to the nature of digital information, once a product is accessed or downloaded, it cannot be "returned."</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>2. Refund Eligibility</h2>
              <p>As a general policy, we do not offer refunds on digital products once the purchase is completed and access has been granted. Please review all product descriptions carefully before making a purchase.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>3. Exceptional Circumstances</h2>
              <p>We may, at our sole discretion, grant a refund or replacement if you encounter technical issues that prevent you from downloading the product and our support team is unable to resolve the issue within 48 hours of you contacting us.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>4. Contact for Support</h2>
              <p>If you face any issues accessing your purchased files, please contact us at support@careervantaa.com with your Order ID, and we will ensure you receive the files you paid for.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
