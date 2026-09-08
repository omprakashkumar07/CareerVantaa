import { ArrowRight } from 'lucide-react';
import { PAYMENT_LINKS } from '../../config';
import { useCheckout } from '../../context/CheckoutContext';
import styles from './PremiumSection.module.css';

export default function PremiumSection() {
  const { handleCheckoutClick } = useCheckout();

  const modules = [
    { num: "01", title: "Career Role Selection System" },
    { num: "02", title: "Role-Specific Interview Mastery" },
    { num: "03", title: "AI Mock Interview System" },
    { num: "04", title: "Project Defense & Resume Deep Dive" },
    { num: "05", title: "Final Interview & Offer System" }
  ];

  const steps = ["SELECT", "MASTER", "PRACTICE", "DEFEND", "LAUNCH"];

  return (
    <section className={`section ${styles.premiumSection}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2>Getting an Interview Is Not the <span className="text-gradient">Finish Line.</span></h2>
          <div className={styles.subtitle} style={{ marginBottom: '2rem' }}>
            <p><strong>Hidden problems after the application:</strong></p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem', color: '#94a3b8' }}>
              <li style={{ marginBottom: '0.5rem' }}>"Which role should I target?"</li>
              <li style={{ marginBottom: '0.5rem' }}>"What questions will I actually face?"</li>
              <li style={{ marginBottom: '0.5rem' }}>"Can I defend everything on my resume?"</li>
              <li style={{ marginBottom: '0.5rem' }}>"Can I explain my project under pressure?"</li>
              <li style={{ marginBottom: '0.5rem' }}>"What happens in the final HR/manager round?"</li>
              <li>"How should I evaluate an offer?"</li>
            </ul>
          </div>
        </div>

        <div className={styles.modules}>
          {modules.map((mod, idx) => (
            <div key={idx} className={styles.moduleItem}>
              <span className={styles.moduleNum}>{mod.num}</span>
              <span className={styles.moduleTitle}>{mod.title}</span>
            </div>
          ))}
        </div>

        <div className={styles.progression}>
          {steps.map((step, idx) => (
            <span key={idx} className={styles.progressionItem}>
              <span>{step}</span>
              {idx < steps.length - 1 && <span className={styles.arrow}>→</span>}
            </span>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <a 
            href={PAYMENT_LINKS.launch || "#"} 
            onClick={(e) => handleCheckoutClick(e, PAYMENT_LINKS.launch)}
            className="btn btn-primary"
          >
            Launch My Career System — ₹499 <ArrowRight className="btnArrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
