import React from "react";
import { createPortal } from "react-dom";
import ArrowIcon from "./ArrowIcon";
import { playClick, playChime } from "../utils/audio";

const ARCHITECTURES = {
  "Spring Batch CSV Data Pipeline": {
    archetype: "Enterprise Chunk-Oriented Batch ETL & Fault-Tolerant Ingestion",
    diagram: `
+--------------------+      +-------------------------+      +-------------------------+
|   FlatFileItem     | ---> |    CompositeItem        | ---> |     JpaItemWriter       |
|      Reader        |      |      Processor          |      |   (Batch Insert / Hikari)|
| (Buffered Stream)  |      | (Regex + Transform)     |      |  READ_COMMITTED Tx      |
+--------------------+      +-------------------------+      +-------------------------+
          |                                                               |
          v                                                               v
  [SkipPolicy Listener]                                         [PostgreSQL / H2 DB]
  FlatFileParseException ---> Dead Letter Queue / Log           Atomic Commit / Rollback
`,
    decisions: [
      {
        topic: "Chunk vs Tasklet Architecture",
        decision: "Configured chunk size of 5 items with isolated transaction boundary.",
        rationale: "Prevents OutOfMemory errors on large CSVs (100k+ rows) while maintaining atomic rollback per chunk."
      },
      {
        topic: "Fault-Tolerant Skip Policy",
        decision: "Injected SkipPolicy targeting FlatFileParseException and NumberFormatException.",
        rationale: "Malformed records are logged to dead-letter audit tables without halting the processing of valid transactions."
      },
      {
        topic: "Connection Pool Tuning",
        decision: "HikariCP pool sized to 10 connections with 30s max lifetime.",
        rationale: "Minimizes connection churn and eliminates connection starvation during heavy parallel batch writes."
      }
    ],
    metrics: { throughput: "~2,500 rec/sec", faultTolerance: "Zero-data loss skip", isolation: "READ_COMMITTED" }
  },

  "Enterprise Banking Core System": {
    archetype: "Double-Entry ACID Core Ledger & Role-Based Access Control",
    diagram: `
[ Front-Office Staff ]       [ Branch Manager ]            [ ATM Customer Client ]
          |                           |                              |
          v                           v                              v
+----------------------------------------------------------------------------------+
|                     RBAC Security Guard & Session Validator                      |
+----------------------------------------------------------------------------------+
                                      |
                                      v
+----------------------------------------------------------------------------------+
|            Transactional Banking Engine (Double-Entry Bookkeeping)               |
|            - Atomic Transfers (Credit Source, Debit Destination)                 |
|            - Running-Balance Verification & Concurrency Locks                    |
+----------------------------------------------------------------------------------+
                                      |
                                      v
+----------------------------------------------------------------------------------+
|                        Persistent ACID SQL Datastore                             |
+----------------------------------------------------------------------------------+
`,
    decisions: [
      {
        topic: "Atomic Double-Entry Bookkeeping",
        decision: "Synchronized wire transfer operations wrapped in strict SQL transaction blocks.",
        rationale: "Guarantees zero fractional balance discrepancies between source and target accounts upon system crash."
      },
      {
        topic: "Multi-Role RBAC Partitioning",
        decision: "Enforced privilege separation across Customer, Teller, and Branch Manager roles.",
        rationale: "Ensures managerial approvals for large liquidity actions and isolates sensitive customer balance reads."
      },
      {
        topic: "Audit Trail & Ledger Integrity",
        decision: "Immutable transaction journal with auto-incremented audit sequences.",
        rationale: "Enables instant reconciliation and forensic tracing of all cash inflows, debits, and transfers."
      }
    ],
    metrics: { consistency: "ACID Guaranteed", rbacRoles: "3 Dedicated Tiers", audit: "100% Immutable Journal" }
  },

  "FullStack ID Data Extractor & Biometrics": {
    archetype: "Client-Edge Computer Vision & Document Inference Pipeline",
    diagram: `
+------------------+         +----------------------+         +---------------------+
|  Document Image  | ------> |  Edge Canvas Pre-op  | ------> | Aspect Ratio & Edge |
|  (User Upload)   |         | (Cropper.js Extents) |         | Gradient Validation |
+------------------+         +----------------------+         +---------------------+
                                                                         |
                                                                         v
+----------------------+     +----------------------+         +---------------------+
| Extracted Identity   | <-- | Tesseract / Heuristic| <------ | Passes Verification |
| Card Fields (JSON)   |     | Field Extraction     |         | (Reject Non-IDs)    |
+----------------------+     +----------------------+         +---------------------+
`,
    decisions: [
      {
        topic: "Client-Side Document Verification",
        decision: "Added real-time edge density and aspect ratio validator before OCR execution.",
        rationale: "Immediately rejects random photos/non-document uploads to avoid false-positive processing overhead."
      },
      {
        topic: "Interactive Canvas Cropper",
        decision: "Integrated dynamic Cropper.js engine allowing drag/resize selection.",
        rationale: "Enables users to isolate MRZ zones and facial regions for clean pixel extraction."
      },
      {
        topic: "Dual-Engine OCR Extraction",
        decision: "Tesseract.js OCR with regex-based MRZ and standard identity card field parsers.",
        rationale: "Extracts document numbers, surnames, birth dates, and expiration dates with high precision."
      }
    ],
    metrics: { latency: "<400ms edge crop", validation: "Dynamic edge filter", privacy: "100% In-Browser Privacy" }
  },

  "Semantic Mobile OCR & Android Application": {
    archetype: "Native Mobile Camera OCR & Intent-Driven Search Dispatcher",
    diagram: `
+--------------------+        +---------------------+        +--------------------+
|  CameraX Viewfinder| -----> | Image Thresholding  | -----> | Tesseract In-Proc  |
|  Surface Provider  |        | & Glyph Extraction  |        | Character Engine   |
+--------------------+        +---------------------+        +--------------------+
                                                                        |
                                                                        v
+--------------------+        +---------------------+        +--------------------+
| Fallback Browser   | <----- | ActivityNotFound?   | <----- | Intent.ACTION_     |
| Intent.ACTION_VIEW |        | Exception Guard     |        | WEB_SEARCH (QUERY) |
+--------------------+        +---------------------+        +--------------------+
`,
    decisions: [
      {
        topic: "Intent-Driven Search Dispatch",
        decision: "Dispatches Intent.ACTION_WEB_SEARCH with SearchManager.QUERY parameter.",
        rationale: "Leverages the Android OS search assistant, avoiding heavy in-app browser memory footprint."
      },
      {
        topic: "Fault-Tolerant Intent Fallback",
        decision: "Catches ActivityNotFoundException and invokes Intent.ACTION_VIEW with URL query.",
        rationale: "Ensures the search works reliably on custom ROMs or devices without Google Play Services."
      },
      {
        topic: "Camera & Worker Thread Isolation",
        decision: "Decouples OCR frame processing from Android UI Main Thread.",
        rationale: "Maintains 60 FPS viewport rendering while background threads tokenize text."
      }
    ],
    metrics: { targetSdk: "Android 14 (API 33)", intent: "ACTION_WEB_SEARCH", fallback: "100% Resilient View" }
  },

  "Tic-Tac-Toe: Minimax AI": {
    archetype: "Zero-Sum Game Theory & Adversarial State-Space Search",
    diagram: `
           [ Root Board State ]
                /        \\
      [ AI Move: MAX ]   [ Human Move: MIN ]
          /      \\           /       \\
      Score: +10   Score: 0   Score: -10   ...
          \\______   |   ______/
                 v  v  v
      [ Optimal Move Selection (Terminal State Leaf) ]
`,
    decisions: [
      {
        topic: "Recursive Minimax Search",
        decision: "Exhaustive game-tree evaluation scoring terminal states (+10 win, -10 loss, 0 draw).",
        rationale: "Mathematically guarantees unbeatable gameplay—the AI cannot lose against any human strategy."
      },
      {
        topic: "Dual Architecture (Desktop + Web)",
        decision: "Python Tkinter desktop GUI paired with a reactive HTML5 Web Audio simulator.",
        rationale: "Allows local desktop execution alongside frictionless one-click web browser gameplay."
      },
      {
        topic: "Web Audio Synthesizer",
        decision: "Generated real-time procedural audio chimes using HTML5 Web Audio API oscillators.",
        rationale: "Provides tactile feedback without external mp3 downloads or network dependencies."
      }
    ],
    metrics: { complexity: "O(b^d) Full Tree Search", winRate: "0% Player Win (Mathematically Unbeatable)" }
  },

  "Luv 2 Read — Full-Stack Library Platform": {
    archetype: "Cloud-Native Full-Stack Microservices & PostgreSQL Persistence",
    diagram: `
+--------------------+        +--------------------+        +--------------------+
| React & TypeScript | -----> | Spring Boot 3      | -----> | PostgreSQL 15      |
| Client (Vercel CDN)|        | REST API (Render)  |        | Relational DB      |
+--------------------+        +--------------------+        +--------------------+
         ^                             |                              |
         |                             v                              v
   [JWT Bearer]            [Spring Data JPA Repos]          [Connection Pooling]
   Stateless Auth          Pagination & Filter Queries      HikariCP Managed
`,
    decisions: [
      {
        topic: "Stateless Cloud Architecture",
        decision: "Separated frontend (Vercel) from backend REST API (Render Cloud).",
        rationale: "Enables independent scaling, rapid CI/CD deployments, and high edge caching performance."
      },
      {
        topic: "Spring Data JPA & Hibernate",
        decision: "Engineered entity relationships with pagination and lazy loading for catalog queries.",
        rationale: "Minimizes SQL payload sizes and eliminates N+1 query overhead during book searches."
      },
      {
        topic: "Containerized Portability",
        decision: "Packaged backend with multi-stage Docker build files.",
        rationale: "Ensures reproducible environments from local development to production cloud deployment."
      }
    ],
    metrics: { stack: "Spring Boot 3 + React + TS", hosting: "Vercel + Render", database: "PostgreSQL 15" }
  }
};

export default function ArchitectureModal({ project, isOpen, onClose }) {
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

  if (!isOpen || !project) return null;

  const arch = ARCHITECTURES[project.title] || {
    archetype: "Enterprise Software System",
    diagram: `[ Client ] ---> [ Application Service ] ---> [ Persistence Layer ]`,
    decisions: [
      { topic: "Architecture", decision: "Layered enterprise architecture.", rationale: "Ensures modular separation of concerns." }
    ],
    metrics: { status: "Production Grade" }
  };

  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Architecture Specification">
      <div className="modal-shell arch-modal-shell" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="arch-badge">SYSTEM ARCHITECTURE SPECIFICATION</span>
            <h2 className="modal-title">{project.title}</h2>
            <div className="arch-archetype">{arch.archetype}</div>
          </div>
          <button className="modal-close" onClick={() => { playClick(); onClose(); }} aria-label="Close Architecture Modal">&times;</button>
        </div>

        <div className="modal-body arch-modal-body">
          {/* Key Metrics Bar */}
          <div className="arch-metrics-bar">
            {Object.entries(arch.metrics).map(([k, v]) => (
              <div className="arch-metric-card" key={k}>
                <span className="metric-label">{k.toUpperCase()}</span>
                <span className="metric-value">{v}</span>
              </div>
            ))}
          </div>

          {/* ASCII Architecture Flowchart */}
          <div className="arch-section">
            <h3 className="arch-section-title">Dataflow & Component Pipeline</h3>
            <pre className="arch-diagram-box"><code>{arch.diagram.trim()}</code></pre>
          </div>

          {/* Key Engineering Decisions */}
          <div className="arch-section">
            <h3 className="arch-section-title">Architectural Trade-offs & Decisions</h3>
            <div className="arch-decisions-grid">
              {arch.decisions.map((d, idx) => (
                <div className="arch-decision-item" key={idx}>
                  <div className="decision-header">
                    <span className="decision-num">0{idx + 1}</span>
                    <span className="decision-topic">{d.topic}</span>
                  </div>
                  <div className="decision-body">
                    <div className="decision-statement"><strong>Decision:</strong> {d.decision}</div>
                    <div className="decision-rationale"><strong>Rationale:</strong> {d.rationale}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Actions */}
          <div className="arch-actions-bar">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="arch-action-btn primary"
                onClick={playClick}
              >
                <span>{project.liveLabel || "🚀 Launch Live Deployment"}</span>
                <ArrowIcon />
              </a>
            )}
            {project.playLink && (
              <a
                href={project.playLink}
                target="_blank"
                rel="noreferrer"
                className="arch-action-btn primary"
                onClick={playClick}
              >
                <span>▶ Play Game Live</span>
                <ArrowIcon />
              </a>
            )}
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="arch-action-btn secondary"
              onClick={playClick}
            >
              <span>Explore GitHub Repository</span>
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
