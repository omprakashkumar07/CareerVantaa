import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { PAYMENT_LINKS } from '../../config';
import { useCheckout } from '../../context/CheckoutContext';
import { scrollToSection } from '../../utils/scroll';
import { trackViewProducts } from '../../utils/analytics';
import { useEffect, useState } from 'react';
import styles from './Products.module.css';

export default function Products() {
  const { handleCheckoutClick, loadingProductId, loadingText } = useCheckout();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    trackViewProducts();
  }, []);

  const getCardClass = (baseClass, cardId) => {
    if (!expandedId) return baseClass;
    if (expandedId === cardId) return `${baseClass} ${styles.expanded}`;
    return `${baseClass} ${styles.dimmed}`;
  };

  return (
    <section id="products" className={`section ${styles.productsSection}`}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrowPill}>CHOOSE YOUR PATH</div>
          <h2>Invest in Your Career. Start Today.</h2>
          <p>Pick the pack that matches where you are in your journey.</p>
        </div>

        <div className={styles.grid}>
          {/* Starter Pack */}
          <div id="pricing-starter" className={getCardClass(styles.pricingCard, 'starter')} onClick={(e) => { scrollToSection(e, 'pricing-starter'); setExpandedId(expandedId === 'starter' ? null : 'starter'); }}>
            <div className={styles.badgeContainer}>
              <span className="badge badge-blue">START</span>
            </div>
            <div className={styles.price}>₹99</div>
            <h3 className={styles.productName}>Fresher Job Starter Pack</h3>
            <p className={styles.description}>Build the foundation for a smarter job application.</p>

            <div className={styles.featureList}>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Resume System</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> ATS Resume Templates</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> JD Keyword Analyzer</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Resume-JD Gap Analyzer</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Resume Tailoring System</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Recruiter Outreach Templates</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Job Application Tracker</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Quick Interview Prep</div>
            </div>

            <div className={styles.btnContainer} onClick={(e) => e.stopPropagation()}>
              <a
                href={PAYMENT_LINKS.starter || "#"}
                onClick={(e) => {
                  if (loadingProductId === PAYMENT_LINKS.starter) { e.preventDefault(); return; }
                  handleCheckoutClick(e, PAYMENT_LINKS.starter);
                }}
                className={`btn btn-secondary ${loadingProductId === PAYMENT_LINKS.starter ? 'disabled' : ''}`}
                style={{ width: '100%', justifyContent: 'center', pointerEvents: loadingProductId === PAYMENT_LINKS.starter ? 'none' : 'auto' }}
              >
                {loadingProductId === PAYMENT_LINKS.starter ? (
                  <><Loader2 className="animate-spin" size={18} style={{marginRight: '8px'}} /> {loadingText}</>
                ) : (
                  <>Start With the Foundation — ₹99 <ArrowRight className="btnArrow" size={18} /></>
                )}
              </a>
              <span className={styles.smallText}>Start with the essentials</span>
            </div>
          </div>

          {/* Accelerator Pack */}
          <div id="pricing-accelerator" className={getCardClass(`${styles.pricingCard} ${styles.popularCard}`, 'accelerator')} onClick={(e) => { scrollToSection(e, 'pricing-accelerator'); setExpandedId(expandedId === 'accelerator' ? null : 'accelerator'); }}>
            <div className={styles.badgeContainer}>
              <span className="badge badge-gold">MOST POPULAR</span>
            </div>
            <div className={styles.price}>₹299</div>
            <h3 className={styles.productName}>Fresher Job Accelerator ⭐</h3>
            <p className={styles.description}>Turn every relevant job opportunity into a smarter application.</p>

            <div className={styles.featureList}>
              <div className={styles.groupHighlight}>
                <div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Everything in Starter Pack, PLUS:
              </div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Complete Job Application Workflow</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> AI Interview System</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Project Interview System</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> LinkedIn + Naukri Optimization</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Referral System</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> 30-Day Job Hunt System</div>
            </div>

            <div className={styles.btnContainer} onClick={(e) => e.stopPropagation()}>
              <div className={styles.smallText} style={{ marginBottom: '0.5rem', color: '#fcd34d', fontWeight: '600', letterSpacing: '0.05em' }}>RECOMMENDED FOR ACTIVE JOB SEEKERS</div>
              <a
                href={PAYMENT_LINKS.accelerator || "#"}
                onClick={(e) => {
                  if (loadingProductId === PAYMENT_LINKS.accelerator) { e.preventDefault(); return; }
                  handleCheckoutClick(e, PAYMENT_LINKS.accelerator);
                }}
                className={`btn btn-primary ${loadingProductId === PAYMENT_LINKS.accelerator ? 'disabled' : ''}`}
                style={{ width: '100%', justifyContent: 'center', minHeight: '56px', fontSize: '1.1rem', pointerEvents: loadingProductId === PAYMENT_LINKS.accelerator ? 'none' : 'auto' }}
              >
                {loadingProductId === PAYMENT_LINKS.accelerator ? (
                  <><Loader2 className="animate-spin" size={20} style={{marginRight: '8px'}} /> {loadingText}</>
                ) : (
                  <>Build My Job Search System — ₹299 <ArrowRight className="btnArrow" size={20} /></>
                )}
              </a>
              <span className={styles.smallText} style={{ marginTop: '0.5rem' }}>Everything in Starter + the complete application & job-hunt workflow.</span>
              <span className={styles.smallText} style={{ marginTop: '0.25rem', opacity: '0.7' }}>Practical systems</span>
            </div>
          </div>

          {/* Career Launch Pack */}
          <div id="pricing-launch" className={getCardClass(`${styles.pricingCard} ${styles.premiumCard}`, 'launch')} onClick={(e) => { scrollToSection(e, 'pricing-launch'); setExpandedId(expandedId === 'launch' ? null : 'launch'); }}>
            <div className={styles.badgeContainer}>
              <span className="badge badge-purple">COMPLETE SYSTEM</span>
            </div>
            <div className={styles.price}>₹499</div>
            <h3 className={styles.productName}>Fresher Career Launch Pack 👑</h3>
            <p className={styles.description}>Prepare, apply and interview with a complete career launch system.</p>

            <div className={styles.featureList}>
              <div className={styles.groupHighlight}>
                <div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Everything in Starter + Accelerator, PLUS:
              </div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Career Role Selection System</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Role-Specific Interview Mastery</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> AI Mock Interview System</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Project Defense & Resume Deep Dive</div>
              <div className={styles.feature}><div className={styles.iconBox}><Check size={14} className={styles.featureIcon} strokeWidth={3} /></div> Final Interview & Offer System</div>
            </div>

            <div className={styles.btnContainer} onClick={(e) => e.stopPropagation()}>
              <a
                href={PAYMENT_LINKS.launch || "#"}
                onClick={(e) => {
                  if (loadingProductId === PAYMENT_LINKS.launch) { e.preventDefault(); return; }
                  handleCheckoutClick(e, PAYMENT_LINKS.launch);
                }}
                className={`btn btn-primary ${loadingProductId === PAYMENT_LINKS.launch ? 'disabled' : ''}`}
                style={{ width: '100%', justifyContent: 'center', background: '#3b0764', borderColor: '#581c87', pointerEvents: loadingProductId === PAYMENT_LINKS.launch ? 'none' : 'auto' }}
              >
                {loadingProductId === PAYMENT_LINKS.launch ? (
                  <><Loader2 className="animate-spin" size={18} style={{marginRight: '8px'}} /> {loadingText}</>
                ) : (
                  <>Launch My Career System — ₹499 <ArrowRight className="btnArrow" size={18} /></>
                )}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
