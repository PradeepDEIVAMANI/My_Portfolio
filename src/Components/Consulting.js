import React from "react";
import { withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";

const focusAreas = [
  { number: "01", title: "Java & Spring services", text: "Backend APIs and business services designed for clear interfaces, maintainability, and dependable operations.", tags: ["Java", "Spring Boot", "REST"] },
  { number: "02", title: "Messaging & integration", text: "Connect applications with MQ, define robust file and message flows, and handle downstream hand-offs with care.", tags: ["IBM MQ", "Integration", "Resilience"] },
  { number: "03", title: "Batch & secure file workflows", text: "Build scheduled data pipelines for cloud files, encryption, validation, database processing, and archiving.", tags: ["Spring Batch", "COS / S3", "PGP"] },
  { number: "04", title: "Kubernetes delivery & support", text: "Package and deploy services and scheduled jobs, then help diagnose performance and production issues.", tags: ["Kubernetes", "CI/CD", "Observability"] },
];

function Consulting() {
  return (
    <section id="consulting" className="section-wrap section-block consulting-section">
      <div className="section-heading section-heading-row">
        <div><div className="eyebrow">07 / CONSULTING FOCUS</div><h2>Engineering support for <span className="accent-text">real workflows.</span></h2></div>
        <p>Practical backend and integration experience for teams building secure, data-heavy systems.</p>
      </div>
      <div className="consulting-grid">
        {focusAreas.map((area) => (
          <article className="consulting-card" key={area.number}>
            <div className="consulting-card-top"><span>/{area.number}</span><span><ArrowIcon /></span></div>
            <h3>{area.title}</h3>
            <p>{area.text}</p>
            <div className="tag-list">{area.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
      <div className="consulting-cta"><p>Have a backend, integration, or data-processing challenge?</p><a className="button button-primary" href="#contact">Let’s discuss it <ArrowIcon /></a></div>
    </section>
  );
}

export default withTranslations(Consulting);
