import React from "react";
import { LanguageContext, withTranslations } from "../i18n";
import ArrowIcon from "./ArrowIcon";
import SystemTelemetryModal from "./SystemTelemetryModal";
import { playClick } from "../utils/audio";

const links = [
  ["Experience", "#experience"],
  ["Case studies", "#case-studies"],
  ["Projects", "#projects"],
  ["Consulting", "#consulting"],
  ["Stack", "#skills"],
  ["About", "#about"],
];

function Navbar({ theme, onToggleTheme, telemetryOpen, setTelemetryOpen }) {
  const { language, setLanguage } = React.useContext(LanguageContext);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("about");
  const [localTelemetry, setLocalTelemetry] = React.useState(false);

  const isTelemetryOpen = telemetryOpen !== undefined ? telemetryOpen : localTelemetry;
  const handleOpenTelemetry = () => {
    playClick();
    if (setTelemetryOpen) setTelemetryOpen(true);
    else setLocalTelemetry(true);
  };
  const handleCloseTelemetry = () => {
    if (setTelemetryOpen) setTelemetryOpen(false);
    else setLocalTelemetry(false);
  };

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
    <>
      <header className="site-header">
        <nav className="nav-wrap" aria-label="Main navigation">
          <a className="brand" href="#about" aria-label="Pradeep Deivamani home" onClick={playClick}>
            <span className="brand-mark">PD</span>
            <span>Pradeep <span className="brand-muted">Deivamani</span></span>
          </a>
          <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="main-menu">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={activeSection === href.slice(1) ? "location" : undefined}
                onClick={() => {
                  playClick();
                  setMenuOpen(false);
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="nav-controls">
            {/* System Telemetry Live Pill */}
            <button
              className="telemetry-pill-btn"
              type="button"
              onClick={handleOpenTelemetry}
              title="System Telemetry & Health (/actuator/health)"
              aria-label="Open System Telemetry and Health"
            >
              <span className="telemetry-live-dot" />
              <span className="telemetry-pill-text">SYS: UP</span>
            </button>

            {/* Theme Toggle */}
            <button
              className="theme-toggle"
              type="button"
              onClick={() => {
                playClick();
                if (onToggleTheme) onToggleTheme();
              }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              aria-pressed={theme === "light"}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <span aria-hidden="true">{theme === "dark" ? "☼" : "☾"}</span>
            </button>

            <div className="language-switch" role="group" aria-label="Language">
              <button
                type="button"
                lang="en"
                aria-pressed={language === "en"}
                onClick={() => {
                  playClick();
                  setLanguage("en");
                }}
              >
                EN
              </button>
              <span aria-hidden="true" />
              <button
                type="button"
                lang="fr"
                aria-pressed={language === "fr"}
                onClick={() => {
                  playClick();
                  setLanguage("fr");
                }}
              >
                FR
              </button>
            </div>

            <a className="nav-cta" href="#contact" onClick={playClick}>
              <span>Let’s talk</span>
              <ArrowIcon />
            </a>

            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="main-menu"
              onClick={() => {
                playClick();
                setMenuOpen((open) => !open);
              }}
            >
              <span /><span />
            </button>
          </div>
        </nav>
      </header>

      {/* Render modal if controlled locally */}
      {telemetryOpen === undefined && (
        <SystemTelemetryModal isOpen={isTelemetryOpen} onClose={handleCloseTelemetry} />
      )}
    </>
  );
}

const TranslatedNavbar = withTranslations(Navbar);
export default TranslatedNavbar;
