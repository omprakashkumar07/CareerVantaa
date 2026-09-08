import { Link2, Wrench, Target } from 'lucide-react';
import styles from './WhyCareerVantaa.module.css';

export default function WhyCareerVantaa() {
  const props = [
    {
      icon: <Link2 size={28} />,
      title: "01 — CONNECTED",
      desc: "Every system fits into the next step of the job search."
    },
    {
      icon: <Wrench size={28} />,
      title: "02 — PRACTICAL",
      desc: "Templates, workflows, prompts, trackers and frameworks — not just theory."
    },
    {
      icon: <Target size={28} />,
      title: "03 — BUILT FOR FRESHERS",
      desc: "Designed around the problems faced by candidates with limited professional experience."
    }
  ];

  return (
    <section className={`section ${styles.whySection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>You're Not Buying Another PDF.<br />
          <span className="text-gradient">You're Buying a Repeatable Job-Search System.</span></h2>
        </div>

        <div className={styles.grid}>
          {props.map((prop, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconWrapper}>
                {prop.icon}
              </div>
              <h3 className={styles.title}>{prop.title}</h3>
              <p className={styles.desc}>{prop.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.statement}>
          <span className="text-gradient">Generic resources:</span><br />
          Read → forget → search again<br /><br />
          <span className="text-gradient">CareerVantaa:</span><br />
          Choose → analyze → build → apply → practice → improve → repeat
        </div>
      </div>
    </section>
  );
}
