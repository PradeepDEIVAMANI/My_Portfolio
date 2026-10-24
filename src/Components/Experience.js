import React from "react";
import { withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";

const roles = [
  {
    company: "BNP Paribas · BCEF IT · Workflow", title: "Software Engineer Consultant", place: "Paris, France", date: "Dec 2024 — Present",
    metrics: [["2", "MQ orchestration services"], ["12", "batch applications"], ["~200k", "records processed daily"]],
    points: [
      "Developed two resilient orchestration services that consume messages from multiple MQ queues, apply business rules and route TAR archives to downstream teams and applications.",
      "Built and maintained 12 Spring Batch applications processing around 200,000 records per day, including secure CSV imports from IBM Cloud Object Storage (COS).",
      "Implemented PGP file decryption with Bouncy Castle and Vault-sourced certificates, business transformations, database persistence, and cloud-bucket archival.",
      "Developed COS document APIs and case-document workflows spanning attachments, metadata, REST operations, generated PDFs, MQ events, and archival.",
      "Created database-to-JSON and encrypted CSV exports through COS and CFT; deployed services and CronJobs to Kubernetes and supported production incidents across DEV, INT, and QUA.",
      "Worked in Scrum with daily stand-ups, sprint reviews, progress and integration meetings, weekly refinement, and specification workshops; used pair and mob programming to solve problems collaboratively.",
      "Partnered with business analysts and process experts to investigate bugs, clarify requirements, and deliver business-process improvements and corrections; tracked work and incidents in Jira and ServiceNow and analyzed logs in Kibana.",
    ],
  },
  {
    company: "BNP Paribas · BCEF IT · Workflow", title: "Software Engineering Intern", place: "Paris, France", date: "Mar 2024 — Sep 2024",
    points: ["Developed Java, Spring Boot and Spring Batch applications for banking workflows.", "Migrated JDBC queries to Spring Data JPA and Hibernate.", "Created automated tests using TDD, BDD, JUnit and Mockito; worked with PostgreSQL, H2, Flyway, Docker and Kubernetes."],
  },
  {
    company: "Tata Consultancy Services", title: "Technical Engineer", place: "India", date: "Oct 2021 — Jul 2022",
    points: ["Developed and tested Java applications using TDD, JUnit and Mockito.", "Improved code quality, maintainability and application reliability."],
  },
];

function Experience() {
  return (
    <section id="experience" className="section-wrap section-block">
      <div className="section-heading"><div className="eyebrow">01 / EXPERIENCE</div><h2>Engineering in <span className="accent-text">production.</span></h2><p>Building and supporting software where reliability, security and thoughtful engineering matter.</p></div>
      <div className="timeline">
        {roles.map((role) => <article className="role-card" key={role.title + role.date}>
          <div className="role-date">{role.date}</div>
          <div className="role-main"><div className="role-top"><div><h3>{role.title}</h3><p className="role-company">{role.company} <span>· {role.place}</span></p></div><span className="role-mark"><ArrowIcon /></span></div>
            {role.metrics && <div className="role-metrics">{role.metrics.map(([value, label]) => <div className="role-metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}
            <ul>{role.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </div>
        </article>)}
      </div>
    </section>
  );
}

export default withTranslations(Experience);
