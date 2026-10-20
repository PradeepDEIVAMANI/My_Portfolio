import React from "react";

export default function About() {
  const signalItems = ["JAVA + SPRING", "MQ ORCHESTRATION", "~200K RECORDS / DAY", "SECURE COS WORKFLOWS", "KUBERNETES DELIVERY"];

  return (
    <>
    <section id="about" className="hero section-wrap">
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER · PARIS, FRANCE</div>
        <h1>I build reliable<br />software for the<br /><span className="accent-text">real world.</span></h1>
        <p className="hero-lead">I’m Pradeep, a Java engineer building secure enterprise banking systems—from MQ orchestration and high-volume batch processing to cloud file exchange and Kubernetes operations.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#experience">Explore my work <span aria-hidden="true">↓</span></a>
          <a className="button button-quiet" href="/Pradeep-Deivamani-CV.pdf" target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-meta"><span>JAVA DEVELOPER · DEVOPS · CLOUD ARCHITECTURE</span><span>AVAILABLE FOR A CONVERSATION</span></div>
      </div>
      <div className="hero-visual">
        <div className="portrait-frame"><img src="/pradeep-headshot-lenses.jpeg" alt="Pradeep Deivamani in a suit" /></div>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="code-card"><span className="code-dot" /><span>shipping reliable systems</span><strong>build();</strong></div>
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
