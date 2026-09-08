import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import { scrollToSection } from '../../utils/scroll';
import styles from './Footer.module.css';

export default function Footer() {
  const handleNavClick = (e, id) => {
    scrollToSection(e, id);
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <a href="#top" onClick={(e) => handleNavClick(e, 'top')} style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
            <Logo />
          </a>
          <p className={styles.tagline}>
            Practical career systems for freshers.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4>Navigation</h4>
            <Link to="/#products" onClick={(e) => handleNavClick(e, 'products')}>Products</Link>
            <Link to="/#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>How It Works</Link>
            <Link to="/#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</Link>
            <Link to="/contact">Contact</Link>
          </div>
          
          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/refund-policy">Refund Policy</Link>
          </div>
        </div>
      </div>
      
      <div className={`container ${styles.bottom}`}>
        <p>© 2026 CareerVantaa. All rights reserved.</p>
      </div>
    </footer>
  );
}
