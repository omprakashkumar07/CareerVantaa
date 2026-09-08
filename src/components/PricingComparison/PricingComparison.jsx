import { Check, Minus } from 'lucide-react';
import styles from './PricingComparison.module.css';

export default function PricingComparison() {
  const features = [
    { name: "ATS Resume Templates", tiers: [true, true, true] },
    { name: "JD Keyword Analyzer", tiers: [true, true, true] },
    { name: "Recruiter Outreach Templates", tiers: [true, true, true] },
    { name: "Job Application Tracker", tiers: [true, true, true] },
    { name: "Quick Interview Prep", tiers: [true, true, true] },
    { name: "AI Interview System", tiers: [false, true, true] },
    { name: "Project Defense Strategy", tiers: [false, true, true] },
    { name: "LinkedIn + Naukri Optimization", tiers: [false, true, true] },
    { name: "30-Day Job Hunt System", tiers: [false, true, true] },
    { name: "Role-Specific Interview Mastery", tiers: [false, false, true] },
    { name: "AI Mock Interview System", tiers: [false, false, true] },
    { name: "Final Interview & Offer System", tiers: [false, false, true] },
  ];

  const renderIcon = (included) => {
    return included ? <Check size={20} className={styles.checkIcon} /> : <Minus size={20} className={styles.minusIcon} />;
  };

  return (
    <section className={`section ${styles.comparisonSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>Why Most Active Job Seekers <span className="text-gradient">Start Here</span></h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            <strong>₹99</strong> gives the foundation. 
            <strong>₹299</strong> adds the execution system. 
            <strong>₹499</strong> adds the deeper interview + career launch layer.
          </p>
        </div>

        {/* Desktop Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Features</th>
                <th>Fresher Job Starter Pack (₹99)</th>
                <th className={styles.highlightCol}>Fresher Job Accelerator ⭐ (₹299)</th>
                <th>Fresher Career Launch Pack 👑 (₹499)</th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr key={i}>
                  <td>{f.name}</td>
                  <td>{renderIcon(f.tiers[0])}</td>
                  <td className={styles.highlightCol}>{renderIcon(f.tiers[1])}</td>
                  <td>{renderIcon(f.tiers[2])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.mobileCards}>
          {[
            { title: "Fresher Job Starter Pack (₹99)", tierIdx: 0, color: "var(--text-primary)" },
            { title: "Fresher Job Accelerator ⭐ (₹299)", tierIdx: 1, color: "#60a5fa" },
            { title: "Fresher Career Launch Pack 👑 (₹499)", tierIdx: 2, color: "#a78bfa" }
          ].map((pack, pIdx) => (
            <div key={pIdx} className={styles.mobileCard}>
              <div className={styles.mobileCardTitle} style={{ color: pack.color }}>{pack.title}</div>
              {features.filter(f => f.tiers[pack.tierIdx]).map((f, i) => (
                <div key={i} className={styles.mobileFeature}>
                  <Check size={16} className={styles.checkIcon} style={{ marginRight: '0.75rem', flexShrink: 0 }} />
                  <span>{f.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
