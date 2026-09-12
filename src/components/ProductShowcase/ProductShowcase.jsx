import styles from './ProductShowcase.module.css';
import ProductBox from '../ProductBox/ProductBox';

export default function ProductShowcase() {
  const scrollToPricing = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      el.classList.add('highlight-focus');
      setTimeout(() => el.classList.remove('highlight-focus'), 1500);
    }
  };

  return (
    <section id="showcase" className={`section ${styles.showcaseSection}`}>
      <div className="container">
        
        {/* Large container wrapping all 3 products */}
        <div className={`${styles.showcaseContainer} animate-fade-in`}>
          
          <div className={styles.showcaseGrid}>
            
            {/* Starter Pack */}
            <div className={`${styles.showcaseItem} ${styles.orderStarter}`}>
              <div className={styles.boxGraphic}>
                <ProductBox tier="starter" title="Fresher Job Starter Pack" />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.badgeWrap}>
                  <span className={`${styles.badge} ${styles.badgeBlue}`}>START</span>
                </div>
                <div className={styles.price}>50% OFF</div>
                <h3 className={styles.title}>Fresher Job<br/>Starter Pack</h3>
                <p className={styles.subtitle}>Build the foundation for a smarter job application.</p>
                <button 
                  className={styles.viewDetailsBtn}
                  onClick={() => scrollToPricing('pricing-starter')}
                >
                  Claim Offer →
                </button>
              </div>
            </div>

            {/* Accelerator (Most Popular) */}
            <div className={`${styles.showcaseItem} ${styles.orderAccelerator} ${styles.itemPopular}`}>
              <div className={styles.popularBadgeFloat}>MOST POPULAR</div>
              <div className={styles.glowBg}></div>
              
              <div className={styles.boxGraphic}>
                <ProductBox tier="accelerator" title="Fresher Job Accelerator" />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.badgeWrap} style={{visibility: 'hidden'}}>
                  <span className={styles.badge}>SPACE</span>
                </div>
                <div className={styles.price}>60% OFF</div>
                <h3 className={styles.title}>Fresher Job<br/>Accelerator <span className={styles.star}>⭐</span></h3>
                <p className={styles.subtitle}>Turn every relevant <span className={styles.underline}>job opportunity into</span> a smarter application.</p>
                <button 
                  className={`${styles.viewDetailsBtn} ${styles.btnPrimary}`}
                  onClick={() => scrollToPricing('pricing-accelerator')}
                >
                  Claim Offer →
                </button>
              </div>
            </div>

            {/* Launch Pack */}
            <div className={`${styles.showcaseItem} ${styles.orderLaunch}`}>
              <div className={styles.boxGraphic}>
                <ProductBox tier="launch" title="Fresher Career Launch Pack" />
              </div>
              <div className={styles.itemDetails}>
                <div className={styles.badgeWrap}>
                  <span className={`${styles.badge} ${styles.badgePurple}`}>COMPLETE SYSTEM</span>
                </div>
                <div className={styles.price}>70% OFF</div>
                <h3 className={styles.title}>Fresher Career<br/>Launch Pack <span className={styles.crown}>👑</span></h3>
                <p className={styles.subtitle}>Your complete career launch system from role selection to offer.</p>
                <button 
                  className={styles.viewDetailsBtn}
                  onClick={() => scrollToPricing('pricing-launch')}
                >
                  Claim Offer →
                </button>
              </div>
            </div>

          </div>
          
          <div className={styles.trustFooter}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>⟠</span> Same Proven System
            </div>
            <span className={styles.divider}>|</span>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🎯</span> Designed for Indian Freshers
            </div>
            <span className={styles.divider}>|</span>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>⚡</span> Practical & Actionable
            </div>
            <span className={styles.divider}>|</span>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>🛡️</span> One Career Journey
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
