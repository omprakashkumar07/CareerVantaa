import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from '../Logo/Logo';
import { scrollToSection } from '../../utils/scroll';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    setIsMobileMenuOpen(false);
    scrollToSection(e, targetId);
  };

  const handleCTAClick = (e) => {
    setIsMobileMenuOpen(false);
    scrollToSection(e, 'pricing-starter');
    
    // Visually focus/highlight the starter pack
    setTimeout(() => {
      const starterCard = document.getElementById('pricing-starter');
      if (starterCard) {
        starterCard.style.transition = 'all 0.3s ease';
        starterCard.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
        starterCard.style.borderColor = 'rgba(59, 130, 246, 0.8)';
        
        setTimeout(() => {
          starterCard.style.boxShadow = '';
          starterCard.style.borderColor = '';
        }, 1500);
      }
    }, 500); // Wait for scroll
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <a href="#top" onClick={(e) => handleNavClick(e, 'top')} style={{ textDecoration: 'none' }}>
          <Logo />
        </a>
        
        <div className={`${styles.navLinks} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <a href="#products" onClick={(e) => handleNavClick(e, 'products')}>Products</a>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')}>How It Works</a>
          <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
          
          {/* Mobile CTA inside menu */}
          <a 
            href="#pricing-starter" 
            onClick={handleCTAClick}
            className={`btn btn-primary ${styles.mobileCta}`}
            style={{ borderRadius: '999px' }}
          >
            <span className={styles.greenDot}></span> Start With ₹99 <ArrowRight className="btnArrow" size={16} />
          </a>
        </div>

        <a 
          href="#pricing-starter" 
          onClick={handleCTAClick}
          className={`btn btn-primary ${styles.desktopCta}`}
          style={{ padding: '0.6rem 1.2rem', minHeight: 'auto', borderRadius: '999px', fontSize: '0.9rem' }}
        >
          <span className={styles.greenDot}></span> Start With ₹99 <ArrowRight className="btnArrow" size={16} />
        </a>

        <button 
          className={styles.menuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
