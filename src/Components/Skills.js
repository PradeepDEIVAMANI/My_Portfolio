import React from "react";
import { withTranslations } from "../i18n";
import { playClick } from "../utils/audio";

const groups = [
  {
    number: "01",
    category: "backend",
    title: "Backend & APIs",
    summary: "High-throughput microservices, hexagonal architectures, and transactional banking REST APIs.",
    core: ["Java 17", "Spring Boot", "Spring Data JPA", "REST APIs"],
    tools: ["Hibernate", "Hexagonal architecture", "Python", "Django", "FastAPI"],
  },
  {
    number: "02",
    category: "batch",
    title: "Batch & data exchange",
    summary: "Zero-loss chunk data ingestion, asynchronous MQ messaging, and distributed SQL persistence.",
    core: ["Spring Batch", "IBM MQ", "PostgreSQL", "IBM COS"],
    tools: ["Amazon S3 SDK", "CFT", "JSON", "CSV", "MySQL", "H2", "Flyway"],
  },
  {
    number: "03",
    category: "cloud",
    title: "Cloud & security",
    summary: "Container orchestration, automated CronJobs, in-memory PGP cryptography, and dynamic Vault secrets.",
    core: ["Kubernetes", "Docker", "HashiCorp Vault", "OpenPGP"],
    tools: ["CronJobs", "Bouncy Castle", "Argo CD", "GitLab CI/CD", "Jenkins", "SonarQube", "Terraform", "Ansible"],
  },
  {
    number: "04",
    category: "delivery",
    title: "Teamwork & delivery",
    summary: "Agile Scrum leadership, technical specification workshops, pair programming, and business alignment.",
    core: ["Agile", "Scrum", "Jira"],
    tools: ["Daily Scrum", "Sprint reviews", "Backlog refinement", "Specification workshops", "Pair programming", "Mob programming", "Business analyst collaboration"],
  },
  {
    number: "05",
    category: "testing",
    title: "Testing & quality",
    summary: "Test-Driven Development (TDD), automated regression safety, and high-coverage unit & integration test suites.",
    core: ["TDD", "JUnit 5", "Mockito"],
    tools: ["BDD", "Spring Boot Test", "Performance testing", "Code review"],
  },
  {
    number: "06",
    category: "observability",
    title: "Production & observability",
    summary: "Tier-3 incident response, distributed logging telemetry, SLA tracking, and root cause analysis (RCA).",
    core: ["Production support", "Kibana", "Elasticsearch"],
    tools: ["Incident response", "ServiceNow", "IBM Log Analysis", "Health Actuators"],
  },
  {
    number: "07",
    category: "frontend",
    title: "Frontend & interactive UI",
    summary: "Modern component-driven web interfaces, responsive state management, and real-time simulators.",
    core: ["React", "JavaScript", "HTML / CSS"],
    tools: ["Tailwind CSS", "Web Audio API", "Responsive Design", "State Management", "Component Architecture"],
  },
];

const categoryFilters = [
  { id: "all", label: "All Capabilities" },
  { id: "backend", label: "Backend & APIs" },
  { id: "batch", label: "Batch & Data" },
  { id: "cloud", label: "Cloud & Security" },
  { id: "testing", label: "Quality & Testing" },
  { id: "observability", label: "Observability" },
];

function Skills() {
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleFilter = (catId) => {
    playClick();
    setActiveCategory(catId);
  };

  const filteredGroups = groups.filter((g) => {
    const matchesCategory = activeCategory === "all" || g.category === activeCategory;
    if (!matchesCategory) return false;
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    const matchTitle = g.title.toLowerCase().includes(term);
    const matchSummary = g.summary.toLowerCase().includes(term);
    const matchCore = g.core.some((item) => item.toLowerCase().includes(term));
    const matchTools = g.tools.some((item) => item.toLowerCase().includes(term));
    return matchTitle || matchSummary || matchCore || matchTools;
  });

  return (
    <section id="skills" className="section-wrap section-block skills-section">
      <div className="section-heading">
        <div className="eyebrow">04 / TOOLKIT & ARCHITECTURE</div>
        <h2>Engineering stack & <span className="accent-text">lifecycle tools.</span></h2>
        <p>From high-throughput APIs and event-driven MQ brokers to zero-trust cryptography, Kubernetes orchestration, and production observability.</p>
      </div>

      {/* Interactive Filter & Search Bar */}
      <div className="skills-toolbar">
        <div className="skills-filter-tabs" role="tablist" aria-label="Skill categories">
          {categoryFilters.map((tab) => (
            <button
              key={tab.id}
              className={`skills-filter-tab${activeCategory === tab.id ? " is-active" : ""}`}
              onClick={() => handleFilter(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="skills-search-wrap">
          <input
            type="search"
            className="skills-search-input"
            placeholder="Filter technologies (e.g. Spring, MQ, Vault, K8s)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search technologies"
          />
          {searchTerm && (
            <button
              className="skills-search-clear"
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Modern Grid Cards */}
      <div className="skills-modern-grid">
        {filteredGroups.map((g, index) => {
          const isSpanningRow = (filteredGroups.length === 7 && index === 6) ||
            (filteredGroups.length > 2 && filteredGroups.length % 3 === 1 && index === filteredGroups.length - 1);
          return (
            <article className={`skill-card-modern${isSpanningRow ? " is-span-row" : ""}`} key={g.title}>
            <div className="skill-card-header">
              <span className="skill-card-badge">{g.number}</span>
              <div>
                <h3 className="skill-card-title">{g.title}</h3>
                <p className="skill-card-summary">{g.summary}</p>
              </div>
            </div>

            {/* Core Enterprise Architecture Tools */}
            <div className="skill-card-tier">
              <span className="skill-tier-label">CORE ENTERPRISE</span>
              <div className="skill-pills-row">
                {g.core.map((item) => (
                  <span className="skill-pill-core" key={item}>
                    <span className="skill-pill-dot" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Supporting Tools & Ecosystem */}
            <div className="skill-card-tier">
              <span className="skill-tier-label">ECOSYSTEM & PRACTICES</span>
              <div className="skill-pills-row">
                {g.tools.map((item) => (
                  <span className="skill-pill-tool" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </div>
    </section>
  );
}

export default withTranslations(Skills);
