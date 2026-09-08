import { FileText, Rocket, Mountain } from 'lucide-react';
import styles from './ProductBox.module.css';

export default function ProductBox({ tier, title }) {
  let boxClass = styles.starter;
  let IconComponent = FileText;
  
  if (tier === 'accelerator') {
    boxClass = styles.accelerator;
    IconComponent = Rocket;
  } else if (tier === 'launch') {
    boxClass = styles.launch;
    IconComponent = Mountain;
  }

  return (
    <div className={styles.scene}>
      <div className={`${styles.box} ${boxClass}`}>
        
        {/* Front Face */}
        <div className={styles.faceFront}>
          <div className={styles.glowOverlay}></div>
          <div className={styles.content}>
            <div className={styles.topSection}>
              <div className={styles.logoWrapper}>
                <div className={styles.logoMark}>
                   <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logoIcon}>
                    <path d="M4 10L16 26L28 6" stroke="url(#gradientV2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <defs>
                      <linearGradient id="gradientV2" x1="4" y1="10" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#3b82f6" />
                        <stop offset="1" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className={styles.logoText}>Career<span style={{color: 'var(--accent-primary)'}}>Vantaa</span></span>
                </div>
              </div>
            </div>
            
            <div className={styles.middleSection}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.iconWrapper}>
                <IconComponent size={64} strokeWidth={1.5} className={styles.productIcon} />
              </div>
            </div>
            
            <div className={styles.bottomSection}>
              <div className={styles.decorativeLines}>
                <div className={styles.line}></div>
                <div className={styles.line} style={{ width: '80%' }}></div>
                <div className={styles.line} style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Spine/Side Face */}
        <div className={styles.faceLeft}>
          <div className={styles.spineContent}>
            <span className={styles.spineText}>{title}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
