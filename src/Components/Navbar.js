import React from "react";

const links = [
  ["Experience", "#experience"],
  ["Case studies", "#case-studies"],
  ["Projects", "#projects"],
  ["Consulting", "#consulting"],
  ["Stack", "#skills"],
  ["About", "#about"],
];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("about");

  React.useEffect(() => {
    const sectionIds = links.map(([, href]) => href.slice(1));
    const updateActiveSection = () => {
      let current = "about";
      let closestTop = Number.NEGATIVE_INFINITY;
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        const top = section?.getBoundingClientRect().top;
        if (top !== undefined && top <= 130 && top > closestTop) {
          current = id;
          closestTop = top;
        }
      });
      setActiveSection(current);
    };
    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a className="brand" href="#about" aria-label="Pradeep Deivamani home">
          <span className="brand-mark">PD</span>
          <span>Pradeep <span className="brand-muted">Deivamani</span></span>
        </a>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="main-menu">
          {links.map(([label, href]) => <a key={href} href={href} aria-current={activeSection === href.slice(1) ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </div>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} aria-pressed={theme === "light"} title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
          <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
        </button>
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
