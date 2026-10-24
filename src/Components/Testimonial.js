import React from "react";
import { withTranslations } from "../i18n";

const certifications = [
  { name: "Professional Certificate in Applied DevOps", issuer: "IBM", detail: "Git · Jenkins · Docker · Kubernetes · OpenShift · IBM Cloud" },
  { name: "Data Structures and Backend in Java", issuer: "Coursera", detail: "Java programming and backend development" },
  { name: "Frontend Development with React", issuer: "Coursera", detail: "HTML · CSS · JavaScript · React" },
];

function Testimonials() {
  return <section id="testimonials" className="section-wrap section-block cert-section">
    <div className="section-heading section-heading-row"><div><div className="eyebrow">06 / CONTINUOUS LEARNING</div><h2>Certifications & <span className="accent-text">growth.</span></h2></div><p>Learning that supports the work I do every day.</p></div>
    <div className="cert-grid">{certifications.map((cert, index) => <article className="cert-card" key={cert.name}><span className="cert-index">0{index + 1}</span><div><span className="project-type">{cert.issuer}</span><h3>{cert.name}</h3><p>{cert.detail}</p></div><span className="cert-check" aria-label="Certification">✓</span></article>)}</div>
  </section>;
}

export default withTranslations(Testimonials);
