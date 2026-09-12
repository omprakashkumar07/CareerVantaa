import { ArrowRight, FileText, Search, Send, MessageSquare, Briefcase, CheckCircle2, Zap } from 'lucide-react';

import { scrollToSection } from '../../utils/scroll';
import styles from './Hero.module.css';

export default function Hero() {
  const flowSteps = [
    { text: "ROLE", desc: "Select target", icon: <Search size={20} /> },
    { text: "RESUME", desc: "Optimize ATS", icon: <FileText size={20} /> },
    { text: "JD", desc: "Analyze keywords", icon: <FileText size={20} />, active: true },
    { text: "APPLICATION", desc: "Tailor profile", icon: <Send size={20} /> },
    { text: "OUTREACH", desc: "Network direct", icon: <MessageSquare size={20} /> },
    { text: "INTERVIEW", desc: "Practice & defend", icon: <MessageSquare size={20} /> },
    { text: "OFFER", desc: "Evaluate & accept", icon: <Briefcase size={20} /> },
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.topMarqueeContainer}>
        <div className={styles.topMarqueeContent}>
          <span>⚡ Limited-Time Offers <span className={styles.dot}>•</span> Save 50% on Starter Pack</span>
          <span className={styles.dot}>•</span>
          <span>🚀 Save 60% on Fresher Job Accelerator</span>
          <span className={styles.dot}>•</span>
          <span>🎯 Save 70% on Fresher Career Launch Pack</span>
          <span className={styles.dot}>•</span>
          <span>💼 Built for BTech • BCA • MCA • CS/IT Freshers</span>
          <span className={styles.dot}>•</span>
          <span>📄 Resume • JD Analysis • Applications • Interviews</span>
          <span className={styles.dot}>•</span>
          <span>🔥 Practical Career Systems for Freshers</span>
          <span className={styles.dot}>•</span>
          <span>⏳ Limited-Time Career Offers Available</span>
          <span className={styles.dot}>•</span>
          
          <span aria-hidden="true">⚡ Limited-Time Offers <span className={styles.dot}>•</span> Save 50% on Starter Pack</span>
          <span aria-hidden="true" className={styles.dot}>•</span>
          <span aria-hidden="true">🚀 Save 60% on Fresher Job Accelerator</span>
          <span aria-hidden="true" className={styles.dot}>•</span>
          <span aria-hidden="true">🎯 Save 70% on Fresher Career Launch Pack</span>
          <span aria-hidden="true" className={styles.dot}>•</span>
          <span aria-hidden="true">💼 Built for BTech • BCA • MCA • CS/IT Freshers</span>
          <span aria-hidden="true" className={styles.dot}>•</span>
          <span aria-hidden="true">📄 Resume • JD Analysis • Applications • Interviews</span>
          <span aria-hidden="true" className={styles.dot}>•</span>
          <span aria-hidden="true">🔥 Practical Career Systems for Freshers</span>
          <span aria-hidden="true" className={styles.dot}>•</span>
          <span aria-hidden="true">⏳ Limited-Time Career Offers Available</span>
        </div>
      </div>
      <div className={`container ${styles.heroContainer}`}>
        <div className={`${styles.content} animate-fade-in`}>
          <div className={styles.eyebrow}>
            <span className={styles.greenDot}></span>
            CAREERVANTAA <span style={{ margin: '0 0.5rem', opacity: 0.5 }}>|</span> CAREER SYSTEMS FOR FRESHERS
          </div>
          <h1 className={styles.title}>
            Stop Applying<br />
            Randomly.<br />
            Start Following a<br />
            <span className="text-gradient">Career System.</span>
          </h1>
          <p className={styles.subtitle}>
            Practical tools and powerfull systems for Engineering Students/B.tech/M.tech/BCA/MCA freshers — from role selection and resume improvement to interviews and offers.
          </p>
          <div className={styles.actions}>
            <a href="#products" onClick={(e) => scrollToSection(e, 'products')} className="btn btn-primary" style={{ borderRadius: '999px' }}>
              Explore the Career Systems <ArrowRight className="btnArrow" size={18} />
            </a>
            <a href="#preview" onClick={(e) => scrollToSection(e, 'preview')} className={`btn btn-secondary ${styles.secondaryBtn}`} style={{ borderRadius: '999px' }}>
              See What's Inside <ArrowRight className="btnArrow" size={18} />
            </a>
          </div>
          <p className={styles.disclaimer}>
            99% job guarantees. Just practical systems you can actually use.
          </p>
        </div>

        <div className={`${styles.visual} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          <div className={styles.systemUI}>
            {/* Floating UI Elements */}
            <div className={`${styles.floatingBadge} ${styles.badgeTop}`}>
              <CheckCircle2 size={14} color="var(--accent-secondary)" /> Role Fit: 57%
            </div>
            <div className={`${styles.floatingBadge} ${styles.badgeMid}`}>
              <Zap size={14} color="var(--accent-primary)" /> JD Match Detected
            </div>
            <div className={`${styles.floatingBadge} ${styles.badgeBottom}`}>
              <FileText size={14} color="#a855f7" /> Skill Gap: 43%
            </div>

            <div className={styles.nodes}>
              {flowSteps.map((step, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <div className={`${styles.node} ${step.active ? styles.active : ''}`}>
                    <div className={styles.nodeIcon}>
                      {step.icon}
                    </div>
                    <div className={styles.nodeContent}>
                      <div className={styles.nodeTitle}>{step.text}</div>
                      <div className={styles.nodeDesc}>{step.desc}</div>
                    </div>
                  </div>
                  {index < flowSteps.length - 1 && <div className={styles.connectionLine}></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
