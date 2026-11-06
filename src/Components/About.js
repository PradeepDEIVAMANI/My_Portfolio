import React from "react";
import ArrowIcon from "./ArrowIcon";
import { withTranslations } from "../i18n";
import ResumeMenu from "./ResumeMenu";
import { playClick } from "../utils/audio";

function About({ onOpenTelemetry }) {
  const signalItems = [
    "DISTRIBUTED SYSTEMS",
    "EVENT-DRIVEN ARCHITECTURE",
    "~200K RECORDS / DAY",
    "SPRING BATCH 5 & JAVA 17",
    "6 LIVE CLOUD DEPLOYMENTS",
    "SECURE CLOUD PIPELINES",
    "KUBERNETES DELIVERY"
  ];

  return (
    <>
    <section id="about" className="hero section-wrap">
      <div className="hero-copy">
        <div className="hero-top-badges">
          <div className="eyebrow">
            <span className="status-dot" /> SOFTWARE ENGINEER · PARIS, FRANCE
          </div>
          <button
            type="button"
            className="hero-telemetry-badge"
            onClick={() => {
              playClick();
              if (onOpenTelemetry) onOpenTelemetry();
            }}
            title="Open Live Cloud Health Checks"
          >
            <span className="telemetry-live-dot" />
            <span>6 / 6 Live Demos Operational</span>
            <span className="badge-arrow">&rarr;</span>
          </button>
        </div>

        <h1>I build reliable<br />software for the<br /><span className="accent-text">real world.</span></h1>
        
        <p className="hero-lead">
          I’m Pradeep, a software engineer building dependable, high-scale enterprise systems—from resilient event-driven architectures and high-volume batch data pipelines to secure cloud microservices and Kubernetes operations.
        </p>

        {/* Real-time Production Metric Highlights */}
        <div className="hero-metrics-strip">
          <div className="hero-metric-box">
            <span className="metric-num">~200k</span>
            <span className="metric-desc">Daily Batch Records (BNP Paribas)</span>
          </div>
          <div className="hero-metric-box">
            <span className="metric-num">6 / 6</span>
            <span className="metric-desc">Live Cloud Deployments (Active)</span>
          </div>
          <div className="hero-metric-box">
            <span className="metric-num">12+</span>
            <span className="metric-desc">Spring Batch & Cloud Services</span>
          </div>
          <div className="hero-metric-box">
            <span className="metric-num">100%</span>
            <span className="metric-desc">Automated CI/CD Delivery</span>
          </div>
        </div>

        <div className="hero-actions">
          <a className="button button-primary" href="#projects" onClick={playClick}>
            Explore Live Projects <ArrowIcon direction="down" />
          </a>
          <ResumeMenu />
          <button
            type="button"
            className="button button-secondary hero-terminal-btn"
            onClick={() => {
              playClick();
              if (onOpenTelemetry) onOpenTelemetry();
            }}
          >
            <span className="terminal-btn-icon">&gt;_</span>
            <span>Terminal (Ctrl+K)</span>
          </button>
        </div>

        <div className="hero-meta">
          <span>DISTRIBUTED SYSTEMS · SPRING BOOT & BATCH · KUBERNETES DEVOPS</span>
          <span>AVAILABLE FOR A CONVERSATION</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="portrait-frame"><img src="/pradeep-headshot-lenses.jpeg" alt="Pradeep Deivamani in a suit" /></div>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="code-card">
          <span className="code-dot" />
          <span>shipping reliable systems</span>
          <strong>build(); // 6 live demos</strong>
        </div>
        <div className="hero-index">01 <span>/ 08</span></div>
      </div>
    </section>

    <div className="signal-strip" role="region" aria-label="Core engineering experience">
      <div className="signal-track">
        <div className="signal-set">{signalItems.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="signal-set" aria-hidden="true">{signalItems.map((item) => <span key={item}>{item}</span>)}</div>
      </div>
    </div>
    </>
  );
}

export default withTranslations(About);
