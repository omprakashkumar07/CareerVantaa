import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

export default function FAQ() {
  const faqs = [
    {
      q: "Which product should I buy?",
      a: "₹99 is the foundation. ₹299 is the recommended option for active job seekers. ₹499 is the complete system for candidates who want role selection through final interview and offer preparation."
    },
    {
      q: "Is this only for engineering students?",
      a: "It is primarily designed for BTech/BCA/MCA CS/IT freshers and 0–1 YOE candidates."
    },
    {
      q: "Do I need ChatGPT or another AI tool?",
      a: "Some systems include AI prompts. You need access to a compatible AI assistant to use those AI-powered workflows."
    },
    {
      q: "Are jobs or interviews guaranteed?",
      a: "No. CareerVantaa provides tools, frameworks and systems. Hiring outcomes depend on the candidate, employer, market and other factors."
    },
    {
      q: "Can I use these systems for different roles?",
      a: "The core systems are broadly useful, while the ₹499 pack includes dedicated preparation for Software Developer, Data Analyst, QA/Testing and Business Analyst tracks."
    },
    {
      q: "Is this a course?",
      a: "No. It is a practical digital-product system containing guides, templates, workflows, prompts, trackers and preparation frameworks."
    },
    {
      q: "Do I need previous experience?",
      a: "No. The products are designed specifically for final-year students and 0–1 YOE candidates."
    },
    {
      q: "Can I use the AI prompts more than once?",
      a: "Yes. You can reuse the prompts with different resumes, job descriptions and interview sessions."
    }
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className={`section ${styles.faqSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2>Frequently Asked <span className="text-gradient">Questions.</span></h2>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`${styles.faqItem} ${openIdx === idx ? styles.active : ''}`}>
              <button 
                className={styles.questionBtn} 
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span>{faq.q}</span>
                <ChevronDown size={20} className={styles.icon} />
              </button>
              {openIdx === idx && (
                <div id={`faq-answer-${idx}`} className={styles.answer} role="region">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
