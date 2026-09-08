import { CheckCircle2, Settings } from 'lucide-react';
import styles from './ProductPreview.module.css';

export default function ProductPreview() {
  return (
    <section id="preview" className={`section ${styles.previewSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>Not just ebooks. <span className="text-gradient">Real Systems.</span></h2>
          <p>See exactly what you'll use to accelerate your job hunt.</p>
        </div>

        <div className={styles.grid}>
          
          {/* Resume System */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.dots}>
                <div className={styles.dot} style={{ background: '#ef4444' }}></div>
                <div className={styles.dot} style={{ background: '#eab308' }}></div>
                <div className={styles.dot} style={{ background: '#22c55e' }}></div>
              </div>
              <div className={styles.mockupTitle}>Resume Builder System</div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.resumeUI}>
                <div className={styles.resumeScore}>
                  <CheckCircle2 size={16} /> ATS Match: 92%
                </div>
                <div className={styles.resumeLine} style={{ width: '40%' }}></div>
                <div className={styles.resumeLine} style={{ width: '80%', background: 'rgba(255,255,255,0.05)' }}></div>
                <div className={styles.resumeLine} style={{ width: '70%', background: 'rgba(255,255,255,0.05)' }}></div>
                <div className={styles.resumeLine} style={{ width: '60%', background: 'rgba(255,255,255,0.05)' }}></div>
                <div className={styles.resumeLine} style={{ width: '90%', background: 'rgba(255,255,255,0.05)' }}></div>
              </div>
            </div>
          </div>

          {/* JD Analyzer */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.dots}>
                <div className={styles.dot} style={{ background: '#ef4444' }}></div>
                <div className={styles.dot} style={{ background: '#eab308' }}></div>
                <div className={styles.dot} style={{ background: '#22c55e' }}></div>
              </div>
              <div className={styles.mockupTitle}>JD Keyword Analyzer</div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.jdUI}>
                <div className={styles.jdBox}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Job Description</div>
                  <div className={styles.resumeLine} style={{ width: '100%', marginBottom: '0.5rem' }}></div>
                  <div className={styles.resumeLine} style={{ width: '80%', marginBottom: '0.5rem' }}></div>
                  <div className={styles.resumeLine} style={{ width: '60%' }}></div>
                </div>
                <div className={styles.jdBox}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Missing Keywords</div>
                  <span className={styles.jdTag}>React.js</span>
                  <span className={styles.jdTag}>Redux</span>
                  <span className={styles.jdTag}>TypeScript</span>
                </div>
              </div>
            </div>
          </div>

          {/* Job Tracker */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.dots}>
                <div className={styles.dot} style={{ background: '#ef4444' }}></div>
                <div className={styles.dot} style={{ background: '#eab308' }}></div>
                <div className={styles.dot} style={{ background: '#22c55e' }}></div>
              </div>
              <div className={styles.mockupTitle}>Application Tracker</div>
              <Settings size={14} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.trackerUI}>
                <div className={styles.trackerItem}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Frontend Engineer</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TechCorp India</div>
                  </div>
                  <div className={`${styles.trackerStatus} ${styles.statusInterview}`}>Interview</div>
                </div>
                <div className={styles.trackerItem}>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>React Developer</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>StartupX</div>
                  </div>
                  <div className={`${styles.trackerStatus} ${styles.statusApplied}`}>Applied</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Interview */}
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.dots}>
                <div className={styles.dot} style={{ background: '#ef4444' }}></div>
                <div className={styles.dot} style={{ background: '#eab308' }}></div>
                <div className={styles.dot} style={{ background: '#22c55e' }}></div>
              </div>
              <div className={styles.mockupTitle}>AI Mock Interview System</div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.chatUI}>
                <div className={`${styles.chatBubble} ${styles.chatBot}`}>
                  Explain the virtual DOM in React.
                </div>
                <div className={`${styles.chatBubble} ${styles.chatUser}`}>
                  It's a lightweight copy of the real DOM that allows React to do fast diffing...
                </div>
                <div className={styles.chatEval}>
                  <CheckCircle2 size={12} /> Strong Answer
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
