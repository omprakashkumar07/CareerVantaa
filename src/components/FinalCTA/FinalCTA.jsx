import { ArrowRight } from 'lucide-react';
import { PAYMENT_LINKS } from '../../config';
import { useCheckout } from '../../context/CheckoutContext';
import { scrollToSection } from '../../utils/scroll';
import styles from './FinalCTA.module.css';

export default function FinalCTA() {
  const { handleCheckoutClick } = useCheckout();

  return (
    <section className={styles.ctaSection}>
      <div className={`container ${styles.content}`}>
        <h2 className={styles.title}>
          Your Job Search Doesn't Need More Random Effort.<br />
          <span className="text-gradient">It Needs a Better System.</span>
        </h2>
        <p className={styles.subtitle}>
          Start with the foundation or use the complete CareerVantaa system to move from role selection to interview readiness.
        </p>
        
        <div className={styles.actions}>
          <a 
            href={PAYMENT_LINKS.accelerator || "#"} 
            onClick={(e) => handleCheckoutClick(e, PAYMENT_LINKS.accelerator)}
            className="btn btn-primary"
          >
            Start Building a Better Job Search <ArrowRight className="btnArrow" size={18} />
          </a>
          <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="btn btn-secondary">
            Explore All Products <ArrowRight className="btnArrow" size={18} />
          </a>
        </div>
        
        <p className={styles.reassurance}>
          Practical systems. No job guarantees. No hype.
        </p>
      </div>
    </section>
  );
}
