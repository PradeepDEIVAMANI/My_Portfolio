import React from "react";
import { withTranslations } from "../i18n";
import { projects } from "../data";
import ArrowIcon from "./ArrowIcon";
import ArchitectureModal from "./ArchitectureModal";
import { playClick } from "../utils/audio";

const projectDetails = [
  {
    type: "JAVA · BATCH PROCESSING",
    category: "java",
    stack: ["Java 17", "Spring Batch", "Spring Data JPA", "JUnit 5", "HikariCP"],
    symbol: "{ job }"
  },
  {
    type: "BACKEND · CORE BANKING",
    category: "java",
    stack: ["Java", "Swing", "JDBC", "MySQL", "ACID Ledger", "RBAC"],
    symbol: "{ api }"
  },
  {
    type: "CV · DOCUMENT EXTRACTION",
    category: "python",
    stack: ["Python", "YOLOv8", "OpenCV", "React", "FastAPI"],
    symbol: "[ cv ]"
  },
  {
    type: "MOBILE · ANDROID OCR",
    category: "mobile",
    stack: ["Android", "Java", "OCR", "REST APIs"],
    symbol: "//"
  },
  {
    type: "GAME THEORY · AI · MINIMAX",
    category: "python",
    stack: ["Python", "Tkinter", "JavaScript", "HTML/CSS", "Minimax", "Web Audio API"],
    symbol: "✕ ○"
  },
  {
    type: "FULL-STACK · CLOUD PLATFORM",
    category: "cloud",
    stack: ["Spring Boot 3", "React", "TypeScript", "Docker", "Render", "Vercel"],
    symbol: "{ lib }"
  },
];

const FILTERS = [
  { id: "all", label: "All Systems", count: 6 },
  { id: "java", label: "☕ Java & Spring", count: 3 },
  { id: "python", label: "🧠 Python & AI", count: 2 },
  { id: "mobile", label: "📱 Mobile Engineering", count: 1 },
  { id: "cloud", label: "☁️ Cloud & DevOps", count: 2 },
];

function Projects() {
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [selectedArchProject, setSelectedArchProject] = React.useState(null);

  function handleFilterClick(id) {
    playClick();
    setActiveFilter(id);
  }

  function handleOpenArch(project) {
    playClick();
    setSelectedArchProject(project);
  }

  const filteredProjects = projects.filter((project, index) => {
    if (activeFilter === "all") return true;
    const detail = projectDetails[index];
    if (!detail) return true;
    if (activeFilter === "java") {
      return detail.category === "java" || detail.stack.some(s => s.toLowerCase().includes("spring") || s.toLowerCase().includes("java"));
    }
    if (activeFilter === "cloud") {
      return detail.category === "cloud" || detail.stack.some(s => s.includes("Docker") || s.includes("Render") || s.includes("Vercel") || s.includes("Batch"));
    }
    return detail.category === activeFilter;
  });

  return (
    <section id="projects" className="section-wrap section-block">
      <div className="section-heading section-heading-row">
        <div>
          <div className="eyebrow">03 / INDEPENDENT PROJECTS</div>
          <h2>Built hands-on, <span className="accent-text">shared openly.</span></h2>
        </div>
        <p>Featured repositories showcasing backend pipelines, core banking architectures, computer vision, and mobile engineering.</p>
      </div>

      {/* Dynamic Filter Chips */}
      <div className="project-filter-bar" role="tablist" aria-label="Project categories">
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={isActive}
              className={`project-filter-chip${isActive ? " is-active" : ""}`}
              onClick={() => handleFilterClick(f.id)}
            >
              <span>{f.label}</span>
              <span className="filter-count">
                {f.id === "all" ? projects.length : f.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="project-grid">
        {filteredProjects.map((project) => {
          const originalIndex = projects.findIndex(p => p.title === project.title);
          const detail = projectDetails[originalIndex] || { type: project.subtitle.toUpperCase(), stack: [project.subtitle], symbol: "{ }" };
          return (
            <article className="project-card" key={project.title}>
              <div className="project-art">
                <span className="project-number">/{String(originalIndex + 1).padStart(2, "0")}</span>
                <span className="project-symbol">{detail.symbol}</span>
                <span className="project-line" />
              </div>
              <div className="project-body">
                <div className="project-type">{detail.type}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {detail.stack.map((item) => (
                    <span className="tag" key={item}>{item}</span>
                  ))}
                </div>
                
                {/* Action Buttons Row */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", marginTop: "14px" }}>
                  <button
                    type="button"
                    className="project-arch-btn"
                    onClick={() => handleOpenArch(project)}
                    title="View Architectural Spec and System Design Flowchart"
                  >
                    📐 Architecture Spec
                  </button>
                  <a className="project-source-link" href={project.link} target="_blank" rel="noreferrer" onClick={playClick}>
                    Source Code <ArrowIcon />
                  </a>
                  {project.liveLink && (
                    <a
                      className="project-source-link"
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClick}
                      style={{
                        background: "linear-gradient(135deg,#6c63ff,#48cfad)",
                        color: "#fff",
                        borderColor: "transparent",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontWeight: "600"
                      }}
                    >
                      {project.liveLabel || "🚀 Live Demo"}
                    </a>
                  )}
                  {project.playLink && (
                    <a
                      className="project-source-link"
                      href={project.playLink}
                      target="_blank"
                      rel="noreferrer"
                      onClick={playClick}
                      style={{
                        background: "linear-gradient(135deg,#6c63ff,#48cfad)",
                        color: "#fff",
                        borderColor: "transparent",
                        padding: "6px 14px",
                        borderRadius: "6px",
                        fontWeight: "600"
                      }}
                    >
                      ▶ Play Game
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Architecture Spec Modal */}
      <ArchitectureModal
        project={selectedArchProject}
        isOpen={Boolean(selectedArchProject)}
        onClose={() => setSelectedArchProject(null)}
      />
    </section>
  );
}

export default withTranslations(Projects);
