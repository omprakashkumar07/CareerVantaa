import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  const steps = [
    { num: "01", title: "Choose your target role" },
    { num: "02", title: "Use the relevant system" },
    { num: "03", title: "Practice and improve" },
    { num: "04", title: "Apply what you learned to real opportunities" }
  ];

  return (
    <section id="how-it-works" className={`section ${styles.howSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>From Confused to <span className="text-gradient">Structured.</span></h2>
        </div>

        <div className={styles.grid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.stepCard}>
              <span className={styles.stepNum}>{step.num}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
