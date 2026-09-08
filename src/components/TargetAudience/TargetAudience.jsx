import { X } from 'lucide-react';
import { PAYMENT_LINKS } from '../../config';
import { useCheckout } from '../../context/CheckoutContext';
import styles from './TargetAudience.module.css';

export default function TargetAudience() {
  const { handleCheckoutClick } = useCheckout();
  const isFor = [
    "Final-year students",
    "0–1 YOE freshers",
    "CS/IT graduates",
    "Candidates actively applying for entry-level roles"
  ];

  const notFor = [
    "Experienced professionals looking for senior-level career strategy",
    "Candidates looking for guaranteed placement",
    "People expecting someone else to apply for jobs on their behalf",
    "Candidates looking for a single magic resume template"
  ];

  return (
    <section className={`section ${styles.audienceSection}`}>
      <div className={`container ${styles.grid}`}>
        {/* Who It's For */}
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Built For Candidates at the <span className="text-gradient">Starting Line.</span></h2>
          </div>
          <div className={styles.cardsGrid}>
            {isFor.map((item, idx) => (
              <div key={idx} className={styles.card}>{item}</div>
            ))}
          </div>
          <p className={styles.subText}>Not sure where to start? <a href={PAYMENT_LINKS.starter || "#"} onClick={(e) => handleCheckoutClick(e, PAYMENT_LINKS.starter)} className="text-accent" style={{ textDecoration: 'underline' }}>Start with the ₹99 Starter Pack.</a></p>
        </div>

        {/* Who It's Not For */}
        <div>
          <div className={styles.header}>
            <h2 className={styles.title}>Who It's <span style={{ color: "#ef4444" }}>Not</span> For.</h2>
          </div>
          <ul className={styles.notForList}>
            {notFor.map((item, idx) => (
              <li key={idx}>
                <X size={24} className={styles.xIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
