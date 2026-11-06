import React from "react";
import { withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";

const education = [
  {
    degree: "Master of Science in Software Engineering & Digital Transformation",
    school: "ESIGELEC Graduate School of Engineering",
    place: "Rouen & Paris, France",
    date: "Sep 2022 — Sep 2024",
    note: "Specialisation in Distributed Cloud Systems, Enterprise Java, and DevOps Automation.",
    summary: "Rigorous curriculum focused on scalable distributed architectures, cloud-native deployments, advanced enterprise Java/Spring ecosystems, and software security. Completed Master's research capstone on computer vision & mobile OCR architectures.",
    pillars: [
      "Distributed Systems",
      "Cloud Architecture",
      "Enterprise Java & Spring",
      "Kubernetes & Docker",
      "DevOps & CI/CD",
      "Software Security & Cryptography",
    ],
  },
  {
    degree: "Bachelor of Technology in Information Technology",
    school: "Sri Manakula Vinayagar Engineering College",
    place: "Puducherry, India",
    date: "Aug 2017 — Aug 2021",
    note: "Graduated with First Class with Distinction (Honors).",
    summary: "Solid computer science and software engineering foundation with intensive coursework in algorithmic problem solving, relational database management systems (RDBMS), object-oriented programming, and operating systems.",
    pillars: [
      "Algorithms & Data Structures",
      "Relational Databases (SQL)",
      "Object-Oriented Design (OOP)",
      "Operating Systems",
      "Computer Networks",
      "Full-Stack Web Engineering",
    ],
  },
];

function Education() {
  return (
    <section id="education" className="section-wrap section-block education-section">
      <div className="section-heading">
        <div className="eyebrow">05 / ACADEMIC FOUNDATIONS & RESEARCH</div>
        <h2>Academic excellence & <span className="accent-text">research.</span></h2>
        <p>Rigorous computer science foundations, distributed systems specialisation, and peer-reviewed IEEE research.</p>
      </div>

      <div className="education-grid">
        {education.map((item) => (
          <article className="education-card" key={item.degree}>
            <div className="role-date">{item.date}</div>
            <h3>{item.degree}</h3>
            <p className="role-company">{item.school}</p>
            <p className="education-place">{item.place}</p>
            <p className="education-note">{item.note}</p>
            <p className="education-summary">{item.summary}</p>
            <div className="education-pillars">
              {item.pillars.map((pillar) => (
                <span className="education-pillar-tag" key={pillar}>{pillar}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="languages">
        <span className="eyebrow">LANGUAGES</span>
        <span>English <i>Fluent · Professional</i></span>
        <span>French <i>Professional Working (B1)</i></span>
        <span>Tamil <i>Native</i></span>
      </div>

      <article className="publication">
        <span className="publication-icon" aria-hidden="true">✳</span>
        <div className="publication-content">
          <span className="project-type">PEER-REVIEWED RESEARCH · IEEE XPLORE · 2024</span>
          <h3>Semantic User-Centered Mobile Services and Data Collection from Textual Images</h3>
          <p><strong>Co-author:</strong> Pradeep Deivamani</p>
          <p>
            Published in the <strong>2024 IEEE 4th International Conference on Software Engineering and Artificial Intelligence (SEAI)</strong>, Xiamen, China.
            Engineered an on-device OCR pipeline and semantic parsing architecture for automated document extraction, eliminating manual verification overhead in mobile-first applications.
          </p>
          <div className="publication-links">
            <a className="publication-link" href="https://ieeexplore.ieee.org/document/10674372" target="_blank" rel="noreferrer">
              View paper on IEEE Xplore <ArrowIcon />
            </a>
            <a className="publication-link" href="https://pradeepdeivamani.github.io/Development-of-Android-application/" target="_blank" rel="noreferrer">
              Live Android Simulator <ArrowIcon />
            </a>
            <a className="publication-link" href="https://github.com/PradeepDEIVAMANI/Development-of-Android-application" target="_blank" rel="noreferrer">
              GitHub Source <ArrowIcon />
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}

export default withTranslations(Education);
