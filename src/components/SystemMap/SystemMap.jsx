import styles from './SystemMap.module.css';

export default function SystemMap() {
  const badSteps = [
    "Apply to everything",
    "Same resume everywhere",
    "Random interview questions",
    "Weak understanding of JD requirements",
    "Struggle to explain projects",
    "Unclear final-round strategy"
  ];

  const goodSteps = [
    "Choose a target role",
    "Analyze the JD",
    "Identify skill gaps",
    "Tailor the application",
    "Reach out strategically",
    "Practice relevant interviews",
    "Defend resume + projects",
    "Handle final rounds",
    "Evaluate the offer"
  ];

  return (
    <section className={`section ${styles.systemSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>FROM RANDOM JOB SEARCH → <span className="text-gradient">STRUCTURED CAREER SYSTEM</span></h2>
        </div>

        <div className={styles.comparisonGrid}>
          {/* Left Side */}
          <div className={`${styles.comparisonCard} ${styles.badSide}`}>
            <h3 className={styles.sideTitle}>WITHOUT A SYSTEM</h3>
            <ul className={styles.list}>
              {badSteps.map((step, idx) => (
                <li key={idx} className={styles.badItem}>
                  <span className={styles.iconX}>✕</span> {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className={`${styles.comparisonCard} ${styles.goodSide}`}>
            <h3 className={styles.sideTitle}>WITH CAREERVANTAA</h3>
            <ul className={styles.list}>
              {goodSteps.map((step, idx) => (
                <li key={idx} className={styles.goodItem}>
                  <span className={styles.iconCheck}>✓</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
