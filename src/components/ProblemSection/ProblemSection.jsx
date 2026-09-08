import styles from './ProblemSection.module.css';

export default function ProblemSection() {
  const problems = [
    {
      num: "01",
      title: "APPLYING EVERYWHERE",
      desc: "More applications don't automatically mean better applications."
    },
    {
      num: "02",
      title: "ONE RESUME FOR EVERYTHING",
      desc: "A resume written for every role often becomes relevant to none."
    },
    {
      num: "03",
      title: "RANDOM INTERVIEW PREP",
      desc: "Collecting questions is different from preparing for the interview you'll actually face."
    },
    {
      num: "04",
      title: "RESUME & PROJECT DEFENSE",
      desc: "If something is on your resume, be ready to explain how, why and what you actually did."
    },
    {
      num: "05",
      title: "FINAL-ROUND UNCERTAINTY",
      desc: "Getting close to an offer still requires decisions around the final round, salary and the offer itself."
    }
  ];

  return (
    <section className={`section ${styles.problemsSection}`}>
      <div className="container">
        <div className={`text-center ${styles.header}`}>
          <h2 className={styles.title}>
            Most Freshers Don't Have an Effort Problem.<br />
            <span className="text-gradient">They Have a System Problem.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {problems.map((prob, idx) => (
            <div key={idx} className={styles.problemCard}>
              <span className={styles.cardNumber}>{prob.num}</span>
              <h3 className={styles.cardTitle}>{prob.title}</h3>
              <p className={styles.cardDesc}>{prob.desc}</p>
            </div>
          ))}
        </div>

        <div className={styles.transition}>
          CareerVantaa connects these steps into one system.
        </div>
      </div>
    </section>
  );
}
