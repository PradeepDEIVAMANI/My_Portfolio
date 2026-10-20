import React from "react";
import { projects } from "../data";

const projectDetails = [
  { type: "FRONTEND · E-COMMERCE", stack: ["React", "JavaScript", "CSS"], symbol: "{ ui }" },
  { type: "BACKEND · JAVA", stack: ["Java", "Spring Boot", "SQL"], symbol: "{ api }" },
  { type: "PYTHON · COMPUTER VISION", stack: ["Python", "Machine learning", "OpenCV"], symbol: "⌘" },
  { type: "ANDROID · MOBILE", stack: ["Android", "Java", "OCR"], symbol: "//" },
  { type: "JAVA · BATCH PROCESSING", stack: ["Java 17", "Spring Batch", "Spring Data JPA", "JUnit"], symbol: "{ job }" },
  { type: "REACT · COMPUTER VISION", stack: ["React", "Python", "YOLOv8", "OpenCV"], symbol: "[ cv ]" },
];

export default function Projects() {
  return (
    <section id="projects" className="section-wrap section-block">
      <div className="section-heading section-heading-row"><div><div className="eyebrow">03 / INDEPENDENT PROJECTS</div><h2>Built hands-on, <span className="accent-text">shared openly.</span></h2></div><p>Personal projects with source code available on GitHub. Production case studies are presented separately.</p></div>
      <div className="project-grid">{projects.map((project, index) => {
        const detail = projectDetails[index] || { type: project.subtitle.toUpperCase(), stack: [project.subtitle], symbol: "{ }" };
        return <article className="project-card" key={project.title}>
          <div className="project-art"><span className="project-number">/{String(index + 1).padStart(2, "0")}</span><span className="project-symbol">{detail.symbol}</span><span className="project-line" /></div>
          <div className="project-body"><div className="project-type">{detail.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{detail.stack.map((item) => <span className="tag" key={item}>{item}</span>)}</div><a className="project-source-link" href={project.link} target="_blank" rel="noreferrer">Explore source code <span aria-hidden="true">↗</span></a></div>
        </article>;
      })}</div>
    </section>
  );
}
