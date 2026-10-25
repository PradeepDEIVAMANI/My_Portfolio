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
    architecture: {
      summary: "End-to-end zero-trust automated batch pipeline processing ~200k daily banking records.",
      steps: [
        {
          id: "storage",
          label: "IBM Cloud Storage",
          sub: "COS / S3 API",
          badge: "Source",
          protocol: "S3 API · TLS 1.3",
          description: "CronJob triggers ingestion. Daily encrypted CSV archives retrieved via S3-compatible COS SDK with stream buffers."
        },
        {
          id: "security",
          label: "Vault & PGP Engine",
          sub: "Bouncy Castle · Vault",
          badge: "Security",
          protocol: "Dynamic Secrets",
          description: "Decryption certificates fetched dynamically from HashiCorp Vault; file decrypted in memory without touching disk."
        },
        {
          id: "batch",
          label: "Spring Batch Pipeline",
          sub: "Chunk Processing",
          badge: "Compute",
          protocol: "FaultTolerant Step",
          description: "Chunk-based processing (ItemReader -> ItemProcessor -> ItemWriter) with skip/retry policies and schema validation."
        },
        {
          id: "database",
          label: "PostgreSQL Cluster",
          sub: "Spring Data JPA",
          badge: "Persistence",
          protocol: "ACID · HikariCP",
          description: "Transactional batch writes with rollback safety and automatic reconciliation against ledger balances."
        },
        {
          id: "archive",
          label: "Cloud Archival Bucket",
          sub: "COS Lifecycle Bucket",
          badge: "Audit",
          protocol: "SHA-256 Audit",
          description: "Source CSV archived into an immutable audit bucket with execution status and cryptographic hashes."
        }
      ]
    }
  },
  {
    number: "02",
    label: "MESSAGING & INTEGRATION",
    title: "Resilient MQ orchestration",
    challenge: "Multiple upstream applications need business rules applied to incoming messages and archive files routed to the correct downstream destination.",
    approach: "Developed two orchestration services that consume MQ queues, apply business logic, and route TAR archives to other teams and applications. Supported production operations by examining logs, queue and manager health, and blocked messages.",
    outcome: "Two services coordinate file and message flows across multiple applications; production incidents are investigated across DEV, INT, and QUA environments.",
    stack: ["Java", "Spring", "IBM MQ", "Business workflows", "Production support"],
    architecture: {
      summary: "High-throughput asynchronous message broker orchestration with poison-message dead lettering.",
      steps: [
        {
          id: "producers",
          label: "Upstream Systems",
          sub: "Heterogeneous Apps",
          badge: "Producer",
          protocol: "JMS Headers",
          description: "Banking applications submit real-time event messages referencing TAR archive payloads and workflow identifiers."
        },
        {
          id: "mq",
          label: "IBM MQ Cluster",
          sub: "Queue Managers",
          badge: "Broker",
          protocol: "Persistent Queues",
          description: "Clustered queue managers guarantee at-least-once message delivery with isolated Dead Letter Queues (DLQ)."
        },
        {
          id: "orchestrator",
          label: "Spring Boot Orchestrator",
          sub: "2 Microservices",
          badge: "Orchestrator",
          protocol: "Concurrent Listeners",
          description: "Validates incoming payload schemas, enforces business routing rules, and extracts TAR contents securely."
        },
        {
          id: "routing",
          label: "Downstream Dispatch",
          sub: "Target Teams & Services",
          badge: "Consumer",
          protocol: "Safe Hand-Off",
          description: "Dispatches validated archives to respective processing teams with delivery receipts and transaction confirmations."
        },
        {
          id: "observability",
          label: "Kibana & Log Analytics",
          sub: "Elasticsearch · Alerting",
          badge: "Telemetry",
          protocol: "Queue Health Metrics",
          description: "Continuous telemetry tracking queue depths, consumer lag, and automated alerts for blocked messages across environments."
        }
      ]
    }
  },
  {
    number: "03",
    label: "DOCUMENT API & ARCHIVING",
    title: "Case documents from API to archive",
    challenge: "Case workflows need document content, attachments, and metadata to move between APIs, storage, and downstream systems.",
    approach: "Built an API to retrieve COS documents, attachments, and metadata; support document create, update, and delete operations; and publish messages to MQ. Related batch workflows retrieve case information, generate attestation follow-up PDFs, and coordinate document archiving.",
    outcome: "Case information and supporting documents move through a connected API, batch, and MQ workflow, with the generated document archived alongside its related information.",
    stack: ["Java", "REST APIs", "COS", "IBM MQ", "PDF generation", "Spring Batch"],
    architecture: {
      summary: "Unified document lifecycle integrating synchronous REST operations, automated batch PDF generation, and MQ event distribution.",
      steps: [
        {
          id: "clients",
          label: "Case Management Apps",
          sub: "REST Clients / Portal",
          badge: "Client",
          protocol: "HTTPS / REST",
          description: "Case workers and internal banking platforms initiate document uploads, status queries, and metadata updates."
        },
        {
          id: "api",
          label: "Spring REST Document API",
          sub: "Document Microservice",
          badge: "Gateway",
          protocol: "Multipart Streaming",
          description: "Handles CRUD operations, validates file headers & MIME types, and orchestrates attachment metadata."
        },
        {
          id: "storage",
          label: "IBM Cloud Object Storage",
          sub: "Secure COS Repository",
          badge: "Storage",
          protocol: "Signed URL Access",
          description: "Stores binary attachments with versioning, immutable audit metadata, and encryption at rest."
        },
        {
          id: "pdf",
          label: "Batch PDF Engine",
          sub: "Spring Batch Worker",
          badge: "Generation",
          protocol: "Scheduled Worker",
          description: "Retrieves case facts from the database and compiles formal compliance attestation PDF documents."
        },
        {
          id: "events",
          label: "IBM MQ Event Broadcast",
          sub: "Event Notification",
          badge: "Integration",
          protocol: "Pub/Sub Topics",
          description: "Broadcasts document state transitions and archive completion notices to downstream banking workflows."
        }
      ]
    }
  },
];

function ArchitectureDiagram({ architecture }) {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const activeStep = architecture.steps[activeStepIndex] || architecture.steps[0];

  return (
    <div className="arch-diagram-wrapper">
      <div className="arch-summary-bar">
        <span className="arch-summary-label">SYSTEM ARCHITECTURE</span>
        <p className="arch-summary-text">{architecture.summary}</p>
      </div>

      <div className="arch-pipeline" role="list">
        {architecture.steps.map((step, idx) => {
          const isSelected = idx === activeStepIndex;
          return (
            <React.Fragment key={step.id}>
              <button
                type="button"
                className={`arch-node ${isSelected ? "is-selected" : ""}`}
                onClick={() => setActiveStepIndex(idx)}
                aria-pressed={isSelected}
              >
                <div className="arch-node-top">
                  <span className="arch-node-num">0{idx + 1}</span>
                  <span className="arch-node-badge">{step.badge}</span>
                </div>
                <strong className="arch-node-title">{step.label}</strong>
                <span className="arch-node-sub">{step.sub}</span>
                <span className="arch-node-protocol">{step.protocol}</span>
              </button>
              {idx < architecture.steps.length - 1 && (
                <div className="arch-flow-connector" aria-hidden="true">
                  <span className="arch-flow-line" />
                  <span className="arch-flow-arrow">›</span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="arch-inspector">
        <div className="arch-inspector-header">
          <div className="arch-inspector-title">
            <span className="arch-inspector-step">NODE 0{activeStepIndex + 1}</span>
            <h4>{activeStep.label} <small>({activeStep.sub})</small></h4>
          </div>
          <span className="arch-protocol-tag">{activeStep.protocol}</span>
        </div>
        <p className="arch-inspector-desc">{activeStep.description}</p>
      </div>
    </div>
  );
}

function CaseStudies() {
  const [activeViews, setActiveViews] = React.useState({
    "01": "architecture",
    "02": "architecture",
    "03": "architecture",
  });

  function toggleView(num, view) {
    setActiveViews((prev) => ({ ...prev, [num]: view }));
  }

  return (
    <section id="case-studies" className="section-wrap section-block case-studies-section">
      <div className="section-heading section-heading-row">
        <div>
          <div className="eyebrow">02 / PRODUCTION CASE STUDIES</div>
          <h2>Complex systems, <span className="accent-text">made dependable.</span></h2>
        </div>
        <p>Anonymized enterprise integration, data pipeline, and document workflows built and supported in production.</p>
      </div>

      <div className="case-study-list">
        {caseStudies.map((study) => {
          const currentView = activeViews[study.number] || "architecture";
          return (
            <article className="case-study-card" key={study.number}>
              <div className="case-study-rail">
                <span>/{study.number}</span>
                <i><ArrowIcon direction="southeast" /></i>
              </div>

              <div className="case-study-content">
                <div className="case-study-header-row">
                  <div>
                    <div className="project-type">{study.label}</div>
                    <h3>{study.title}</h3>
                  </div>

                  <div className="case-study-tabs" role="tablist">
                    <button
                      type="button"
                      className={`case-study-tab ${currentView === "architecture" ? "is-active" : ""}`}
                      onClick={() => toggleView(study.number, "architecture")}
                    >
                      <span className="tab-dot" />
                      Architecture & Flow
                    </button>
                    <button
                      type="button"
                      className={`case-study-tab ${currentView === "overview" ? "is-active" : ""}`}
                      onClick={() => toggleView(study.number, "overview")}
                    >
                      Overview & Outcomes
                    </button>
                  </div>
                </div>

                {currentView === "architecture" ? (
                  <ArchitectureDiagram architecture={study.architecture} />
                ) : (
                  <>
                    <div className="case-study-details">
                      <div>
                        <h4>Challenge</h4>
                        <p>{study.challenge}</p>
                      </div>
                      <div>
                        <h4>Approach</h4>
                        <p>{study.approach}</p>
                      </div>
                    </div>
                    <p className="case-study-outcome">
                      <strong>Outcome</strong>
                      <span>{study.outcome}</span>
                    </p>
                  </>
                )}

                <div className="tag-list">
                  {study.stack.map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <p className="case-study-note">Descriptions and architecture flows are generalized to respect employer and client confidentiality.</p>
    </section>
  );
}

export default withTranslations(CaseStudies);
