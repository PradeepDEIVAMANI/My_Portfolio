import React from "react";

const education = [
  { degree: "Master’s in Software Engineering and Digital Transformation", school: "ESIGELEC", place: "Saint-Étienne-du-Rouvray, France", date: "Sep 2022 — Sep 2024", note: "Specialisation in Java development, DevOps and cloud computing." },
  { degree: "Bachelor of Technology", school: "Sri Manakula Vinayagar Engineering College", place: "Puducherry, India", date: "Aug 2017 — Aug 2021", note: "Graduated with distinction." },
];

export default function Education() {
  return <section id="education" className="section-wrap section-block education-section">
    <div className="section-heading"><div className="eyebrow">05 / EDUCATION</div><h2>Built on a strong <span className="accent-text">foundation.</span></h2></div>
    <div className="education-grid">{education.map((item) => <article className="education-card" key={item.degree}><div className="role-date">{item.date}</div><h3>{item.degree}</h3><p className="role-company">{item.school}</p><p className="education-place">{item.place}</p><p className="education-note">{item.note}</p></article>)}</div>
    <div className="languages"><span className="eyebrow">LANGUAGES</span><span>English <i>Fluent</i></span><span>French <i>B1</i></span><span>Tamil <i>Native</i></span></div>
    <div className="publication"><span className="publication-icon">✳</span><div><span className="project-type">RESEARCH · MAR 2023</span><h3>IEEE Software Engineering and Artificial Intelligence Conference</h3><p>Published research related to computer vision, semantic mobile services and data extraction from textual images.</p></div></div>
  </section>;
}
