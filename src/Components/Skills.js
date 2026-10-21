import React from "react";

const groups = [
  ["01", "Backend & APIs", ["Java", "Spring Boot", "Spring Data JPA", "Hibernate", "REST APIs", "Hexagonal architecture", "Python", "Django", "FastAPI"]],
  ["02", "Batch & data exchange", ["Spring Batch", "IBM MQ", "IBM COS", "Amazon S3 SDK", "CFT", "JSON", "CSV", "PostgreSQL", "MySQL", "H2", "Flyway"]],
  ["03", "Cloud & security", ["Docker", "Kubernetes", "CronJobs", "Argo CD", "GitLab CI/CD", "Jenkins", "SonarQube", "OpenPGP", "Bouncy Castle", "HashiCorp Vault", "Terraform", "Ansible"]],
  ["04", "Teamwork & delivery", ["Agile", "Scrum", "Jira", "Daily Scrum", "Sprint reviews", "Backlog refinement", "Specification workshops", "Pair programming", "Mob programming", "Business analyst collaboration"]],
  ["05", "Testing & quality", ["JUnit", "Mockito", "TDD", "BDD", "Performance testing", "Code review"]],
  ["06", "Production & observability", ["Production support", "Incident response", "ServiceNow", "Kibana", "Elasticsearch", "IBM Log Analysis"]],
  ["07", "Frontend", ["React", "JavaScript", "HTML", "CSS", "Tailwind CSS"]],
];

export default function Skills() {
  return <section id="skills" className="section-wrap section-block skills-section">
    <div className="section-heading"><div className="eyebrow">04 / TOOLKIT</div><h2>Tools for the <span className="accent-text">whole lifecycle.</span></h2><p>From APIs and secure file exchange to testing, Kubernetes delivery and production support.</p></div>
    <div className="skills-grid">{groups.map(([number, title, items]) => <article className="skill-group" key={title}><div className="skill-heading"><span>{number}</span><h3>{title}</h3></div><div className="tag-list">{items.map((item) => <span className="tag" key={item}>{item}</span>)}</div></article>)}</div>
  </section>;
}
