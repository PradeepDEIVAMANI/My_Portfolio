import React from "react";
import { withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";

const education = [
  { degree: "Master’s in Software Engineering and Digital Transformation", school: "ESIGELEC", place: "Saint-Étienne-du-Rouvray, France", date: "Sep 2022 — Sep 2024", note: "Specialisation in Java development, DevOps and cloud computing." },
  { degree: "Bachelor of Technology", school: "Sri Manakula Vinayagar Engineering College", place: "Puducherry, India", date: "Aug 2017 — Aug 2021", note: "Graduated with distinction." },
];

function Education() {
  return <section id="education" className="section-wrap section-block education-section">
    <div className="section-heading"><div className="eyebrow">05 / EDUCATION</div><h2>Built on a strong <span className="accent-text">foundation.</span></h2></div>
    <div className="education-grid">{education.map((item) => <article className="education-card" key={item.degree}><div className="role-date">{item.date}</div><h3>{item.degree}</h3><p className="role-company">{item.school}</p><p className="education-place">{item.place}</p><p className="education-note">{item.note}</p></article>)}</div>
    <div className="languages"><span className="eyebrow">LANGUAGES</span><span>English <i>Fluent</i></span><span>French <i>B1</i></span><span>Tamil <i>Native</i></span></div>
    <article className="publication">
      <span className="publication-icon" aria-hidden="true">✳</span>
      <div className="publication-content">
        <span className="project-type">IEEE CONFERENCE PAPER · 2024</span>
        <h3>Semantic User-Centered Mobile Services and Data Collection from Textual Images</h3>
        <p><strong>Co-author:</strong> Pradeep Deivamani</p>
        <p>Published in the 2024 IEEE 4th International Conference on Software Engineering and Artificial Intelligence (SEAI), Xiamen, China. Research on semantic mobile services and extracting information from textual images.</p>
        <a className="publication-link" href="https://ieeexplore.ieee.org/document/10674372" target="_blank" rel="noreferrer">View paper on IEEE Xplore <ArrowIcon /></a>
      </div>
    </article>
  </section>;
}

export default withTranslations(Education);
