import React from "react";
import { withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";

const caseStudies = [
  {
    number: "01",
    label: "HIGH-VOLUME DATA PIPELINE",
    title: "Secure cloud ingestion at production scale",
    challenge: "Operational data arrives as files in cloud object storage and must be processed securely, consistently, and on a daily schedule.",
    approach: "Built and maintained Spring Batch jobs to retrieve CSV files through the S3-compatible COS API, decrypt them with PGP and Bouncy Castle using certificates and secrets from Vault, apply business rules, persist results, and archive source files to a separate bucket.",
    outcome: "A portfolio of 12 batch applications handles around 200,000 records per day.",
    stack: ["Java", "Spring Batch", "COS / S3 API", "PGP", "Bouncy Castle", "Vault"],
  },
  {
    number: "02",
    label: "MESSAGING & INTEGRATION",
    title: "Resilient MQ orchestration",
    challenge: "Multiple upstream applications need business rules applied to incoming messages and archive files routed to the correct downstream destination.",
    approach: "Developed two orchestration services that consume MQ queues, apply business logic, and route TAR archives to other teams and applications. Supported production operations by examining logs, queue and manager health, and blocked messages.",
    outcome: "Two services coordinate file and message flows across multiple applications; production incidents are investigated across DEV, INT, and QUA environments.",
    stack: ["Java", "Spring", "IBM MQ", "Business workflows", "Production support"],
  },
  {
    number: "03",
    label: "DOCUMENT API & ARCHIVING",
    title: "Case documents from API to archive",
    challenge: "Case workflows need document content, attachments, and metadata to move between APIs, storage, and downstream systems.",
    approach: "Built an API to retrieve COS documents, attachments, and metadata; support document create, update, and delete operations; and publish messages to MQ. Related batch workflows retrieve case information, generate attestation follow-up PDFs, and coordinate document archiving.",
    outcome: "Case information and supporting documents move through a connected API, batch, and MQ workflow, with the generated document archived alongside its related information.",
    stack: ["Java", "REST APIs", "COS", "IBM MQ", "PDF generation", "Spring Batch"],
  },
];

function CaseStudies() {
  return (
    <section id="case-studies" className="section-wrap section-block case-studies-section">
      <div className="section-heading section-heading-row">
        <div><div className="eyebrow">02 / PRODUCTION CASE STUDIES</div><h2>Complex systems, <span className="accent-text">made dependable.</span></h2></div>
        <p>Anonymized examples of the integration, data, and document workflows I’ve built and supported.</p>
      </div>
      <div className="case-study-list">
        {caseStudies.map((study) => (
          <article className="case-study-card" key={study.number}>
            <div className="case-study-rail"><span>/{study.number}</span><i><ArrowIcon direction="southeast" /></i></div>
            <div className="case-study-content">
              <div className="project-type">{study.label}</div>
              <h3>{study.title}</h3>
              <div className="case-study-details">
                <div><h4>Challenge</h4><p>{study.challenge}</p></div>
                <div><h4>Approach</h4><p>{study.approach}</p></div>
              </div>
              <p className="case-study-outcome"><strong>Outcome</strong><span>{study.outcome}</span></p>
              <div className="tag-list">{study.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      <p className="case-study-note">Descriptions are generalized to respect employer and client confidentiality.</p>
    </section>
  );
}

export default withTranslations(CaseStudies);
