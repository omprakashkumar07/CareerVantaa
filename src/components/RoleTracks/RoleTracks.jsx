import { PAYMENT_LINKS } from '../../config';
import { useCheckout } from '../../context/CheckoutContext';
import styles from './RoleTracks.module.css';

export default function RoleTracks() {
  const { handleCheckoutClick } = useCheckout();

  const tracks = [
    {
      title: "SOFTWARE DEVELOPER",
      skills: ["Programming", "OOP", "DSA", "SQL", "APIs", "Debugging", "Projects"]
    },
    {
      title: "DATA ANALYST",
      skills: ["SQL", "Excel", "Data Cleaning", "Statistics", "Visualization", "Business Cases"]
    },
    {
      title: "QA / TESTING",
      skills: ["Testing", "Test Design", "Bugs", "API Testing", "SQL", "Automation"]
    },
    {
      title: "BUSINESS ANALYST",
      skills: ["Requirements", "Stakeholders", "User Stories", "Process Mapping", "Agile", "Cases"]
    }
  ];

  return (
    <section className={`section ${styles.rolesSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>Built Around Four <span className="text-gradient">Common Fresher Paths.</span></h2>
        </div>

        <div className={styles.grid}>
          {tracks.map((track, idx) => (
            <div key={idx} className={styles.roleCard}>
              <h3 className={styles.roleTitle}>{track.title}</h3>
              <div className={styles.skills}>
                {track.skills.map((skill, i) => (
                  <span key={i} style={{ margin: i === 0 ? '0 0.5rem 0 0' : '0 0.5rem' }}>
                    {skill} {i < track.skills.length - 1 && <span style={{ color: 'var(--text-muted)' }}>•</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Choose your role. Then prepare for the interview that role actually demands.</p>
          <a 
            href={PAYMENT_LINKS.launch || "#"} 
            onClick={(e) => handleCheckoutClick(e, PAYMENT_LINKS.launch)}
            className="btn btn-primary"
          >
            Get Career Launch Pack
          </a>
        </div>
      </div>
    </section>
  );
}
