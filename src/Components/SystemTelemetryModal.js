import React from "react";
import { createPortal } from "react-dom";
import ArrowIcon from "./ArrowIcon";

const subsystemHealth = [
  { name: "vault-secrets-engine", status: "UP", latency: "14ms", detail: "Vault dynamic token valid · Zero-trust policy" },
  { name: "ibm-cos-s3-gateway", status: "UP", latency: "28ms", detail: "Multipart chunk streaming enabled · TLS 1.3" },
  { name: "ibm-mq-queue-manager", status: "UP", latency: "9ms", detail: "Active consumers: 2 · DLQ count: 0" },
  { name: "postgresql-primary", status: "UP", latency: "4ms", detail: "HikariCP pool: 10 connections · ACID active" },
  { name: "k8s-batch-cronjobs", status: "UP", latency: "N/A", detail: "Next scheduled execution: 02:00 CET" },
];

const cliHelp = `Available commands:
  help        - List all available terminal commands
  whoami      - Display profile overview
  skills      - Dump core backend & DevOps tech stack
  experience  - Show enterprise production track record
  contact     - Output contact email and scheduling link
  clear       - Clear terminal output`;

export default function SystemTelemetryModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = React.useState("actuator");
  const [terminalHistory, setTerminalHistory] = React.useState([
    { type: "system", text: "Connected to pradeep-portfolio-core v2026.1 [Spring Boot 3.x / OpenJDK 21]" },
    { type: "system", text: "Type 'help' for a list of diagnostic commands." },
  ]);
  const [commandInput, setCommandInput] = React.useState("");
  const terminalBottomRef = React.useRef(null);

  React.useEffect(() => {
    if (activeTab === "terminal" && isOpen) {
      terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, activeTab, isOpen]);

  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleCommandSubmit(e) {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, { type: "user", text: `$ ${commandInput}` }];

    switch (cmd) {
      case "help":
        newHistory.push({ type: "output", text: cliHelp });
        break;
      case "whoami":
        newHistory.push({
          type: "output",
          text: "Pradeep Deivamani — Software Engineer & Consultant based in Paris, France.\nSpecialized in resilient distributed systems, high-volume data pipelines, MQ orchestration, and cloud architecture.",
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          text: "LANGUAGES: Java 17/21, Python, JavaScript, SQL\nFRAMEWORKS: Spring Boot, Spring Batch, Spring Data JPA, Hibernate, FastAPI\nINFRA & DEVOPS: Docker, Kubernetes, Argo CD, GitLab CI/CD, Jenkins, HashiCorp Vault\nMESSAGING & STORAGE: IBM MQ, PostgreSQL, MySQL, IBM COS / S3\nTESTING: JUnit 5, Mockito, TDD, BDD",
        });
        break;
      case "experience":
        newHistory.push({
          type: "output",
          text: "[2024-Present] Software Engineer Consultant @ BNP Paribas (Paris)\n  - 12 Spring Batch apps processing ~200,000 records daily\n  - 2 MQ orchestration microservices with automated failover\n[2024] Software Engineering Intern @ BNP Paribas\n[2021-2022] Technical Engineer @ Tata Consultancy Services",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          text: "Email: pradeepdeivamani03@gmail.com\nLocation: Paris, France (Europe/Paris)\nSchedule: Use the interactive calendar form at #contact",
        });
        break;
      case "clear":
        setTerminalHistory([]);
        setCommandInput("");
        return;
      default:
        newHistory.push({
          type: "error",
          text: `Command not found: '${cmd}'. Type 'help' to see valid commands.`,
        });
        break;
    }

    setTerminalHistory(newHistory);
    setCommandInput("");
  }

  return createPortal(
    <div className="telemetry-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="telemetry-modal" onClick={(e) => e.stopPropagation()}>
        <div className="telemetry-header">
          <div className="telemetry-title">
            <span className="telemetry-pulse-dot" />
            <h3>ENGINEERING TELEMETRY & HEALTH</h3>
          </div>
          <div className="telemetry-tabs">
            <button
              type="button"
              className={`telemetry-tab ${activeTab === "actuator" ? "is-active" : ""}`}
              onClick={() => setActiveTab("actuator")}
            >
              /actuator/health
            </button>
            <button
              type="button"
              className={`telemetry-tab ${activeTab === "terminal" ? "is-active" : ""}`}
              onClick={() => setActiveTab("terminal")}
            >
              &gt;_ Terminal
            </button>
          </div>
          <button className="telemetry-close" type="button" onClick={onClose} aria-label="Close dialog">×</button>
        </div>

        <div className="telemetry-body">
          {activeTab === "actuator" ? (
            <div className="actuator-view">
              <div className="actuator-overview-grid">
                <div className="actuator-stat-card">
                  <span className="actuator-label">OVERALL STATUS</span>
                  <div className="actuator-status-up">
                    <span className="status-indicator-dot" />
                    <strong>UP (HTTP 200)</strong>
                  </div>
                </div>
                <div className="actuator-stat-card">
                  <span className="actuator-label">DAILY THROUGHPUT</span>
                  <strong>~200k records/day</strong>
                </div>
                <div className="actuator-stat-card">
                  <span className="actuator-label">SYSTEM UPTIME</span>
                  <strong>99.98%</strong>
                </div>
                <div className="actuator-stat-card">
                  <span className="actuator-label">RUNTIME PROFILE</span>
                  <strong>OpenJDK 21 · K8s Prod</strong>
                </div>
              </div>

              <div className="actuator-subsystems">
                <span className="subsystems-heading">SUBSYSTEM HEALTH CHECKS</span>
                <div className="subsystems-list">
                  {subsystemHealth.map((item) => (
                    <div className="subsystem-row" key={item.name}>
                      <div className="subsystem-name-cell">
                        <span className="subsystem-dot" />
                        <code>{item.name}</code>
                      </div>
                      <span className="subsystem-latency">{item.latency}</span>
                      <span className="subsystem-detail">{item.detail}</span>
                      <span className="subsystem-badge-up">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="terminal-view">
              <div className="terminal-screen">
                {terminalHistory.map((line, i) => (
                  <pre key={i} className={`terminal-line terminal-${line.type}`}>
                    {line.text}
                  </pre>
                ))}
                <div ref={terminalBottomRef} />
              </div>
              <form className="terminal-input-bar" onSubmit={handleCommandSubmit}>
                <span className="terminal-prompt">visitor@pradeep:~$</span>
                <input
                  type="text"
                  value={commandInput}
                  onChange={(e) => setCommandInput(e.target.value)}
                  placeholder="type command (help, whoami, skills, experience, contact, clear)..."
                  autoFocus
                />
                <button type="submit" className="terminal-submit-btn">Run <ArrowIcon /></button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
