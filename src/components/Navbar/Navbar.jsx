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

  const handleCTAClick = (e, targetId) => {
    setIsMobileMenuOpen(false);
    scrollToSection(e, targetId);
    
    // Visually focus/highlight the target card
    setTimeout(() => {
      const targetCard = document.getElementById(targetId);
      if (targetCard) {
        targetCard.style.transition = 'all 0.3s ease';
        targetCard.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.5)';
        targetCard.style.borderColor = 'rgba(59, 130, 246, 0.8)';
        
        setTimeout(() => {
          targetCard.style.boxShadow = '';
          targetCard.style.borderColor = '';
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
          
          {/* Mobile CTAs inside menu */}
          <a 
            href="#pricing-accelerator" 
            onClick={(e) => handleCTAClick(e, 'pricing-accelerator')}
            className={`btn btn-primary ${styles.mobileCta}`}
            style={{ borderRadius: '999px' }}
          >
            <span className={styles.greenDot}></span> Offer 60% OFF <ArrowRight className="btnArrow" size={16} />
          </a>
          <a 
            href="#pricing-launch" 
            onClick={(e) => handleCTAClick(e, 'pricing-launch')}
            className={`btn btn-primary ${styles.mobileCta}`}
            style={{ borderRadius: '999px', marginTop: '10px' }}
          >
            <span className={styles.greenDot}></span> Offer 70% OFF <ArrowRight className="btnArrow" size={16} />
          </a>
        </div>

        <div className={styles.desktopCta} style={{ display: 'flex', gap: '10px' }}>
          <a 
            href="#pricing-accelerator" 
            onClick={(e) => handleCTAClick(e, 'pricing-accelerator')}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.2rem', minHeight: 'auto', borderRadius: '999px', fontSize: '0.9rem' }}
          >
            <span className={styles.greenDot}></span> Offer 60% OFF <ArrowRight className="btnArrow" size={16} />
          </a>
          <a 
            href="#pricing-launch" 
            onClick={(e) => handleCTAClick(e, 'pricing-launch')}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.2rem', minHeight: 'auto', borderRadius: '999px', fontSize: '0.9rem' }}
          >
            <span className={styles.greenDot}></span> Offer 70% OFF <ArrowRight className="btnArrow" size={16} />
          </a>
        </div>

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
