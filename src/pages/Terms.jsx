import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function Terms() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 style={{ marginBottom: '2rem' }}>Terms & Conditions</h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Last updated: 08 Aug 2026</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: '1.7' }}>
            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>1. Acceptance of Terms</h2>
              <p>By accessing and using CareerVantaa.com, you accept and agree to be bound by the terms and provision of this agreement. Our digital products and career systems are intended solely to provide educational resources and frameworks.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>2. Digital Products</h2>
              <p>CareerVantaa provides digital content such as templates, frameworks, and guides. We do not provide employment, recruiting services, or job guarantees. Outcomes depend entirely on the user's execution, effort, and external market factors.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>3. Intellectual Property</h2>
              <p>All content, systems, templates, and materials provided by CareerVantaa are protected by copyright. Your purchase grants you a single-user license for personal use. You may not distribute, resell, or share these materials.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>4. AI Tools Disclaimer</h2>
              <p>Certain products include prompts designed to be used with third-party AI tools (like ChatGPT). You are responsible for obtaining access to these tools and reviewing any AI-generated output for accuracy before using it in your job applications.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>5. Limitation of Liability</h2>
              <p>CareerVantaa shall not be liable for any direct, indirect, incidental, consequential or exemplary damages resulting from the use or inability to use our products or systems.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
