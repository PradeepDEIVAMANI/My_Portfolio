import React from "react";
import { withTranslations } from "../i18n";
import { projects } from "../data";
import ArrowIcon from "./ArrowIcon";

const projectDetails = [
  { type: "JAVA · BATCH PROCESSING", stack: ["Java 17", "Spring Batch", "Spring Data JPA", "JUnit 5", "HikariCP"], symbol: "{ job }" },
  { type: "BACKEND · CORE BANKING", stack: ["Java", "Spring Boot", "Spring Data JPA", "PostgreSQL", "TDD"], symbol: "{ api }" },
  { type: "CV · DOCUMENT EXTRACTION", stack: ["Python", "YOLOv8", "OpenCV", "React", "FastAPI"], symbol: "[ cv ]" },
  { type: "MOBILE · ANDROID OCR", stack: ["Android", "Java", "OCR", "REST APIs"], symbol: "//" },
  { type: "FRONTEND · E-COMMERCE", stack: ["React", "JavaScript", "Tailwind CSS", "REST"], symbol: "{ ui }" },
  { type: "PYTHON · COMPUTER VISION", stack: ["Python", "OpenCV", "Machine Learning"], symbol: "⌘" },
  { type: "GAME THEORY · AI · MINIMAX", stack: ["Python", "Tkinter", "JavaScript", "HTML/CSS", "Minimax", "Web Audio API"], symbol: "✕ ○" },
];

function Projects() {
  return (
    <section id="projects" className="section-wrap section-block">
      <div className="section-heading section-heading-row">
        <div>
          <div className="eyebrow">03 / INDEPENDENT PROJECTS</div>
          <h2>Built hands-on, <span className="accent-text">shared openly.</span></h2>
        </div>
        <p>Featured repositories showcasing backend pipelines, core banking architectures, computer vision, and mobile engineering.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => {
          const detail = projectDetails[index] || { type: project.subtitle.toUpperCase(), stack: [project.subtitle], symbol: "{ }" };
          return (
            <article className="project-card" key={project.title}>
              <div className="project-art">
                <span className="project-number">/{String(index + 1).padStart(2, "0")}</span>
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
                <div style={{display:"flex", gap:"12px", flexWrap:"wrap", alignItems:"center"}}>
                  <a className="project-source-link" href={project.link} target="_blank" rel="noreferrer">
                    Explore source code <ArrowIcon />
                  </a>
                  {project.playLink && (
                    <a className="project-source-link" href={project.playLink} target="_blank" rel="noreferrer"
                       style={{background:"linear-gradient(135deg,#6c63ff,#48cfad)", color:"#fff", borderColor:"transparent", padding:"6px 14px", borderRadius:"6px", fontWeight:"600"}}>
                      ▶ Play Game
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default withTranslations(Projects);
