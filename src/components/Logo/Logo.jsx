import styles from './Logo.module.css';

export default function Logo({ className = '' }) {
  return (
    <div className={`${styles.logoContainer} ${className}`}>
      <svg className={styles.logoSvg} viewBox="0 0 42 34" width="42" height="34" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="v-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <mask id="c-mask">
            <rect width="100%" height="100%" fill="white" />
            <path d="M 16 6 L 26 28 L 36 6" stroke="black" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </mask>
        </defs>
        
        <path 
          d="M 28 6 C 10 6, 4 12, 4 17 C 4 22, 10 26, 24 26" 
          stroke="white" 
          strokeWidth="6.5" 
          strokeLinecap="round" 
          fill="none" 
          mask="url(#c-mask)" 
        />
        
        <path 
          d="M 16 6 L 26 28 L 36 6" 
          stroke="url(#v-grad)" 
          strokeWidth="6.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          fill="none" 
        />
      </svg>
      <span className={styles.logoText}>
        <span className={styles.textWhite}>Career</span>
        <span className={styles.textBlue}>Vantaa</span>
      </span>
    </div>
  );
}
