import React from "react";

const links = [
  ["Experience", "#experience"],
  ["Case studies", "#case-studies"],
  ["Projects", "#projects"],
  ["Consulting", "#consulting"],
  ["Stack", "#skills"],
  ["About", "#about"],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a className="brand" href="#about" aria-label="Pradeep Deivamani home">
          <span className="brand-mark">PD</span>
          <span>Pradeep <span className="brand-muted">Deivamani</span></span>
        </a>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="main-menu">
          {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </div>
        <a className="nav-cta" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </nav>
    </header>
  );
}
