import React, { useContext, useEffect, useRef } from "react";
import { LanguageContext } from "../i18n";
import ArrowIcon from "./ArrowIcon";

export default function ResumeMenu({ footer = false }) {
  const menuRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const isFrench = language === "fr";

  useEffect(() => {
    const closeMenu = () => {
      if (menuRef.current?.open) menuRef.current.open = false;
    };
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) closeMenu();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", closeMenu, true);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", closeMenu, true);
    };
  }, []);

  const closeAfterSelection = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <details ref={menuRef} className={`resume-menu${footer ? " resume-menu-footer" : ""}`}>
      <summary className={footer ? "" : "button button-quiet"}>
        {footer ? <>{isFrench ? "CV" : "Résumé"} <ArrowIcon /></> : (isFrench ? "Voir mon CV" : "View CV")}
        {!footer && <span aria-hidden="true">⌄</span>}
      </summary>
      <div className="resume-options">
        <a href="/Pradeep-Deivamani-CV.pdf" target="_blank" rel="noreferrer" onClick={closeAfterSelection}>
          <span>EN</span> {isFrench ? "Version anglaise (PDF)" : "English version (PDF)"}
        </a>
        <a href="/Pradeep-Deivamani-CV-FR.pdf" target="_blank" rel="noreferrer" lang="fr" onClick={closeAfterSelection}>
          <span>FR</span> {isFrench ? "Version française (PDF)" : "French version (PDF)"}
        </a>
      </div>
    </details>
  );
}
