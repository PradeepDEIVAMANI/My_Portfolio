import React from "react";
import { withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";

const roles = [
  {
    company: "BNP Paribas · BCEF IT · Workflow",
    title: "Software Engineer Consultant",
    place: "Paris, France",
    date: "Dec 2024 — Present",
    skills: ["Java 17", "Spring Boot", "Spring Batch", "IBM MQ", "Kubernetes", "HashiCorp Vault", "IBM Cloud COS", "PostgreSQL", "Kibana", "CFT"],
    metrics: [
      ["2", "MQ orchestration services"],
      ["12", "batch applications"],
      ["~200k", "records processed daily"],
    ],
    points: [
      "Architected and deployed two resilient IBM MQ message orchestration services, handling asynchronous event streams with dead-letter queue (DLQ) poison-message recovery and atomic routing of TAR archives across distributed banking systems.",
      "Engineered and maintained 12 mission-critical Spring Batch applications processing ~200,000 records daily, including zero-loss chunk-based CSV ingestions from S3-compatible IBM Cloud Object Storage (COS) with fault-tolerant skip/retry policies.",
      "Engineered an automated in-memory PGP file decryption pipeline using Bouncy Castle and dynamic certificates sourced securely from HashiCorp Vault, eliminating disk exposure for sensitive customer data.",
      "Developed high-availability RESTful document microservices interfacing with COS buckets, orchestrating multi-part attachments, case metadata validation, on-the-fly compliance PDF generation, and event-driven MQ notifications.",
      "Built high-volume database-to-JSON and encrypted CSV data export pipelines via COS and CFT; containerized microservices and CronJobs on Kubernetes (OpenShift) with zero-downtime rolling deployments across DEV, INT, and QUA.",
      "Championed agile engineering best practices: facilitated technical specification workshops, led mob/pair programming on complex transactional bottlenecks, and enforced clean architecture and test-first engineering.",
      "Led production reliability and incident triage across staging and live environments: performed deep-dive root-cause analyses (RCA) using Kibana log analytics and Elasticsearch, driving down MTTR and resolving complex business-critical anomalies.",
    ],
  },
  {
    company: "BNP Paribas · BCEF IT · Workflow",
    title: "Software Engineering Intern",
    place: "Paris, France",
    date: "Mar 2024 — Sep 2024",
    skills: ["Java 17", "Spring Boot", "Spring Batch", "Spring Data JPA", "Hibernate", "PostgreSQL", "Docker", "Flyway", "JUnit 5", "Mockito"],
    metrics: [
      ["35%+", "query latency reduction"],
      ["85%+", "unit & integration coverage"],
      ["100%", "automated TDD pipelines"],
    ],
    points: [
      "Engineered core backend banking microservices using Java 17 and Spring Boot, modernizing legacy banking workflows and refactoring raw JDBC queries into optimized Spring Data JPA and Hibernate ORM layers with 35%+ query latency reduction.",
      "Established comprehensive automated test suites using Test-Driven Development (TDD) and BDD paradigms (JUnit 5, Mockito, Spring Boot Test), boosting regression test coverage across transactional flows to over 85%.",
      "Streamlined relational database migrations and multi-container local testing environments using PostgreSQL, Flyway, Docker, and Kubernetes manifests.",
    ],
  },
  {
    company: "Tata Consultancy Services",
    title: "Technical Engineer",
    place: "India",
    date: "Oct 2021 — Jul 2022",
    skills: ["Java", "Spring Framework", "SQL / RDBMS", "JUnit", "Mockito", "Clean Code", "Agile / Scrum"],
    metrics: [
      ["Enterprise", "Tier-1 banking platforms"],
      ["TDD", "Zero-defect delivery"],
      ["Java / SQL", "High-performance backend"],
    ],
    points: [
      "Engineered robust, thread-safe enterprise Java components and data access routines supporting high-traffic client platforms, adhering strictly to clean code and SOLID architectural principles.",
      "Designed and executed thorough unit and integration test suites using JUnit and Mockito, driving early defect detection and ensuring seamless promotion through user acceptance testing (UAT).",
      "Conducted rigorous code reviews, refactored monolithic procedural modules into modular object-oriented services, and resolved SQL execution bottlenecks to optimize system throughput.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="section-wrap section-block">
      <div className="section-heading">
        <div className="eyebrow">01 / EXPERIENCE</div>
        <h2>Engineering in <span className="accent-text">production.</span></h2>
        <p>Building and supporting software where reliability, security and thoughtful engineering matter.</p>
      </div>
      <div className="timeline">
        {roles.map((role) => (
          <article className="role-card" key={role.title + role.date}>
            <div className="role-date">{role.date}</div>
            <div className="role-main">
              <div className="role-top">
                <div>
                  <h3>{role.title}</h3>
                  <p className="role-company">{role.company} <span>· {role.place}</span></p>
                </div>
                <span className="role-mark"><ArrowIcon /></span>
              </div>
              {role.metrics && (
                <div className="role-metrics">
                  {role.metrics.map(([value, label]) => (
                    <div className="role-metric" key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              )}
              {role.skills && (
                <div className="role-skills">
                  {role.skills.map((skill) => (
                    <span className="role-skill-tag" key={skill}>{skill}</span>
                  ))}
                </div>
              )}
              <ul>
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default withTranslations(Experience);
