import styles from './TrustStrip.module.css';

export default function TrustStrip() {
  const steps = [
    "ROLE SELECTION",
    "RESUME",
    "JOB SEARCH",
    "APPLICATION",
    "OUTREACH",
    "INTERVIEW",
    "PROJECT DEFENSE",
    "OFFER"
  ];

  return (
    <div className={styles.trustStrip}>
      <p className={styles.text}>Built around the actual fresher job-search journey.</p>
      <div className={styles.marquee}>
        <div className={styles.marqueeContent}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.item}>
              {step}
              {idx < steps.length - 1 && <span className={styles.dot}></span>}
            </div>
          ))}
        </div>
        {/* Duplicate for infinite scroll effect */}
        <div className={styles.marqueeContent} aria-hidden="true">
          {steps.map((step, idx) => (
            <div key={`dup-${idx}`} className={styles.item}>
              {step}
              {idx < steps.length - 1 && <span className={styles.dot}></span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
