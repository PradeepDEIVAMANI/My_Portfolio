import React from "react";
import { createPortal } from "react-dom";
import ArrowIcon from "./ArrowIcon";
import { withTranslations } from "../i18n";
import { playClick, playKeypress, playSuccess, playChime } from "../utils/audio";

const initialSubsystems = [
  {
    name: "spring-batch-etl-pipeline",
    status: "UP",
    latency: "24ms",
    detail: "Spring Batch 5 · Chunk(5) isolation · PostgreSQL HikariCP",
    url: "https://pradeepdeivamani.github.io/Spring-Batch-Application/"
  },
  {
    name: "banking-core-ledger",
    status: "UP",
    latency: "18ms",
    detail: "Double-Entry Ledger · ACID Concurrency · Multi-Role RBAC",
    url: "https://pradeepdeivamani.github.io/javaProject/"
  },
  {
    name: "fullstack-id-extractor",
    status: "UP",
    latency: "31ms",
    detail: "YOLOv8 & OpenCV · Dynamic Edge Cropper · In-Browser Privacy",
    url: "https://pradeepdeivamani.github.io/FullStack--ID-Extractor/"
  },
  {
    name: "mobile-ocr-search-intent",
    status: "UP",
    latency: "22ms",
    detail: "Android 14 API 33 · Tesseract OCR · Intent.ACTION_WEB_SEARCH",
    url: "https://pradeepdeivamani.github.io/Development-of-Android-application/"
  },
  {
    name: "minimax-game-ai-agent",
    status: "UP",
    latency: "12ms",
    detail: "Zero-Sum Minimax Tree · Adversarial Search · Web Audio",
    url: "https://pradeepdeivamani.github.io/tic-toc-toe/"
  },
  {
    name: "library-cloud-platform",
    status: "UP",
    latency: "45ms",
    detail: "Spring Boot 3 REST API on Render + Vercel React CDN",
    url: "https://library-appication.vercel.app/home"
  },
];

const cliHelp = `Available terminal commands:
  help              - List all available diagnostic commands
  projects          - List all 6 live enterprise systems
  projects [cat]    - Filter by: 'java', 'python', 'mobile', 'cloud'
  ping              - Measure live simulated round-trip latency to all deployments
  stats             - Display engineering metrics (records/day, repos, test coverage)
  architecture      - Overview of system designs and architectural archetypes
  whoami            - Display engineer profile & focus areas
  skills            - Dump core backend & DevOps tech stack
  experience        - Show enterprise production track record (BNP Paribas, TCS)
  contact           - Output contact channels and schedule link
  clear             - Clear terminal screen`;

function SystemTelemetryModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = React.useState("actuator");
  const [subsystems, setSubsystems] = React.useState(initialSubsystems);
  const [isPinging, setIsPinging] = React.useState(false);
  const [terminalHistory, setTerminalHistory] = React.useState([
    { type: "system", text: "Connected to pradeep-portfolio-core v2026.2 [Spring Boot 3.x / OpenJDK 21]" },
    { type: "system", text: "Global Shortcut Active: Press 'Ctrl + K' or 'Cmd + K' anywhere to open this terminal." },
    { type: "system", text: "Type 'help' to see diagnostic commands or 'projects' to review live systems." },
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
    playChime();
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

  function runDiagnosticsPing() {
    playClick();
    setIsPinging(true);
    setTimeout(() => {
      setSubsystems(prev => prev.map(s => ({
        ...s,
        latency: `${Math.floor(Math.random() * 25) + 12}ms`,
        status: "UP"
      })));
      setIsPinging(false);
      playSuccess();
    }, 700);
  }

  function handleCommandSubmit(e) {
    e.preventDefault();
    const raw = commandInput.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();
    playClick();

    const newHistory = [...terminalHistory, { type: "user", text: `$ ${raw}` }];

    if (cmd === "help") {
      newHistory.push({ type: "output", text: cliHelp });
    } else if (cmd === "projects" || cmd.startsWith("projects ")) {
      const arg = cmd.replace("projects", "").trim();
      let list = [
        "1. [JAVA] Spring Batch CSV Data Pipeline  -> https://pradeepdeivamani.github.io/Spring-Batch-Application/",
        "2. [JAVA] Enterprise Banking Core System   -> https://pradeepdeivamani.github.io/javaProject/",
        "3. [PYTHON] FullStack ID Data Extractor    -> https://pradeepdeivamani.github.io/FullStack--ID-Extractor/",
        "4. [ANDROID] Semantic Mobile OCR App      -> https://pradeepdeivamani.github.io/Development-of-Android-application/",
        "5. [AI/GAME] Tic-Tac-Toe Minimax AI       -> https://pradeepdeivamani.github.io/tic-toc-toe/",
        "6. [SPRING/CLOUD] Luv 2 Read Library      -> https://library-appication.vercel.app/home"
      ];
      if (arg === "java") {
        list = list.filter(item => item.includes("[JAVA]") || item.includes("[SPRING"));
      } else if (arg === "python") {
        list = list.filter(item => item.includes("[PYTHON]") || item.includes("[AI/GAME]"));
      } else if (arg === "mobile") {
        list = list.filter(item => item.includes("[ANDROID]"));
      }
      newHistory.push({ type: "output", text: `ACTIVE ENTERPRISE DEPLOYMENTS (${list.length}):\n` + list.join("\n") });
    } else if (cmd === "ping" || cmd === "ping all") {
      newHistory.push({
        type: "output",
        text: "PINGING ALL 6 PRODUCTION HOSTS...\n" +
          "  [200 OK] pradeepdeivamani.github.io/Spring-Batch-Application/ [21ms]\n" +
          "  [200 OK] pradeepdeivamani.github.io/javaProject/ [18ms]\n" +
          "  [200 OK] pradeepdeivamani.github.io/FullStack--ID-Extractor/ [29ms]\n" +
          "  [200 OK] pradeepdeivamani.github.io/Development-of-Android-application/ [22ms]\n" +
          "  [200 OK] pradeepdeivamani.github.io/tic-toc-toe/ [14ms]\n" +
          "  [200 OK] library-appication.vercel.app/home [41ms]\n" +
          "RESULT: 6/6 UP, 0 packet loss, avg latency: 24.1ms"
      });
      playSuccess();
    } else if (cmd === "stats") {
      newHistory.push({
        type: "output",
        text: "ENGINEERING METRICS:\n" +
          "  Daily Batch Records:     ~200,000 records / day (BNP Paribas)\n" +
          "  Enterprise Microservices: 12 Spring Batch jobs + 2 IBM MQ coordinators\n" +
          "  Live Cloud Deployments:   6 independent platforms\n" +
          "  CI/CD Automation:         100% (GitLab CI / GitHub Actions / Docker)\n" +
          "  Code Test Coverage:       85%+ (JUnit 5, Mockito, PyTest)"
      });
    } else if (cmd === "architecture") {
      newHistory.push({
        type: "output",
        text: "SYSTEM DESIGN ARCHETYPES:\n" +
          "  - Chunk-based Batch ETL (FlatFileItemReader -> CompositeProcessor -> JpaWriter)\n" +
          "  - Double-Entry ACID Core Ledger with Row-Level Locks & Concurrency Guards\n" +
          "  - Edge-Inference Computer Vision (Cropper.js -> OpenCV Binarization -> Tesseract)\n" +
          "  - Android Intent System Dispatcher (ACTION_WEB_SEARCH with graceful URI fallback)\n" +
          "  - Game-Tree State Space Search (Minimax O(b^d) with terminal leaf evaluation)\n" +
          "Tip: Click '📐 Architecture Spec' on any project card for visual diagrams!"
      });
    } else if (cmd === "whoami") {
      newHistory.push({
        type: "output",
        text: "Pradeep Deivamani — Software Engineer & Backend Consultant based in Paris, France.\nSpecialized in resilient distributed architectures, Spring Boot & Batch pipelines, high-concurrency ledger systems, and automated DevOps delivery.",
      });
    } else if (cmd === "skills") {
      newHistory.push({
        type: "output",
        text: "LANGUAGES: Java 17/21, Python, JavaScript/TypeScript, SQL, C++\nFRAMEWORKS: Spring Boot 3, Spring Batch 5, Spring Data JPA, Hibernate, React\nDEVOPS & CLOUD: Docker, Kubernetes, Argo CD, Jenkins, GitLab CI/CD, HashiCorp Vault\nMESSAGING & DB: IBM MQ, Kafka, PostgreSQL, MySQL, Redis, S3 / IBM COS\nTESTING: JUnit 5, Mockito, TDD, BDD / Gherkin, Postman",
      });
    } else if (cmd === "experience") {
      newHistory.push({
        type: "output",
        text: "[2024-Present] Software Engineer Consultant @ BNP Paribas (Paris)\n  - 12 Spring Batch apps processing ~200,000 records daily\n  - 2 MQ orchestration microservices with automated failover\n[2024] Software Engineering Intern @ BNP Paribas\n[2021-2022] Technical Engineer @ Tata Consultancy Services",
      });
    } else if (cmd === "contact") {
      newHistory.push({
        type: "output",
        text: "Email: pradeepdeivamani03@gmail.com\nLinkedIn: https://linkedin.com/in/pradeep-deivamani\nLocation: Paris, France (Europe/Paris timezone)\nConsulting Schedule: Available via the calendar booking form in the portfolio footer.",
      });
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setCommandInput("");
      return;
    } else {
      newHistory.push({
        type: "error",
        text: `Command not found: '${raw}'. Type 'help' to see valid commands.`,
      });
    }

    setTerminalHistory(newHistory);
    setCommandInput("");
  }

  return createPortal(
    <div className="telemetry-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="System Telemetry and Diagnostics">
      <div className="telemetry-modal" onClick={(e) => e.stopPropagation()}>
        <div className="telemetry-header">
          <div className="telemetry-title">
            <span className="telemetry-pulse-dot" />
            <h3>ENGINEERING TELEMETRY & DIAGNOSTICS</h3>
          </div>
          <div className="telemetry-tabs">
            <button
              type="button"
              className={`telemetry-tab ${activeTab === "actuator" ? "is-active" : ""}`}
              onClick={() => { playClick(); setActiveTab("actuator"); }}
            >
              /actuator/health
            </button>
            <button
              type="button"
              className={`telemetry-tab ${activeTab === "terminal" ? "is-active" : ""}`}
              onClick={() => { playClick(); setActiveTab("terminal"); }}
            >
              &gt;_ Terminal (CLI)
            </button>
          </div>
          <button className="telemetry-close" type="button" onClick={() => { playClick(); onClose(); }} aria-label="Close dialog">×</button>
        </div>

        <div className="telemetry-body">
          {activeTab === "actuator" ? (
            <div className="actuator-view">
              <div className="actuator-overview-grid">
                <div className="actuator-stat-card">
                  <span className="actuator-label">LIVE DEPLOYMENTS</span>
                  <div className="actuator-status-up">
                    <span className="status-indicator-dot" />
                    <strong>6 / 6 OPERATIONAL</strong>
                  </div>
                </div>
                <div className="actuator-stat-card">
                  <span className="actuator-label">DAILY THROUGHPUT</span>
                  <strong>~200k records/day</strong>
                </div>
                <div className="actuator-stat-card">
                  <span className="actuator-label">SERVICE UPTIME</span>
                  <strong>99.98%</strong>
                </div>
                <div className="actuator-stat-card">
                  <span className="actuator-label">RUNTIME PROFILE</span>
                  <strong>Java 17/21 · K8s Prod</strong>
                </div>
              </div>

              <div className="actuator-subsystems">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <span className="subsystems-heading">LIVE ENDPOINT HEALTH CHECKS</span>
                  <button
                    type="button"
                    className="telemetry-ping-btn"
                    onClick={runDiagnosticsPing}
                    disabled={isPinging}
                  >
                    {isPinging ? "Pinging..." : "⚡ Ping All Endpoints"}
                  </button>
                </div>
                <div className="subsystems-list">
                  {subsystems.map((item) => (
                    <div className="subsystem-row" key={item.name}>
                      <div className="subsystem-name-cell">
                        <span className="subsystem-dot" />
                        <code>{item.name}</code>
                      </div>
                      <span className="subsystem-latency">{item.latency}</span>
                      <span className="subsystem-detail">{item.detail}</span>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="subsystem-badge-up"
                        title="Open live deployment"
                        onClick={playClick}
                      >
                        {item.status} ↗
                      </a>
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
                  onChange={(e) => {
                    playKeypress();
                    setCommandInput(e.target.value);
                  }}
                  placeholder="type command (help, projects, ping, stats, architecture, whoami, clear)..."
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

export default withTranslations(SystemTelemetryModal);
