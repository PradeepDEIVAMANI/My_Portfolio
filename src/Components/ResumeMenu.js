import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../i18n";
import ArrowIcon from "./ArrowIcon";
import CvPreviewModal from "./CvPreviewModal";

export default function ResumeMenu({ footer = false }) {
  const menuRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const isFrench = language === "fr";
  const [previewState, setPreviewState] = useState({ isOpen: false, url: "" });

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

  const openPreview = (e, url) => {
    e.preventDefault();
    if (menuRef.current) menuRef.current.open = false;
    setPreviewState({ isOpen: true, url });
  };

  return (
    <>
      <details ref={menuRef} className={`resume-menu${footer ? " resume-menu-footer" : ""}`}>
        <summary className={footer ? "" : "button button-quiet"}>
          {footer ? <>{isFrench ? "CV" : "Résumé"} <ArrowIcon /></> : (isFrench ? "Voir mon CV" : "View CV")}
          {!footer && <span aria-hidden="true">⌄</span>}
        </summary>
        <div className="resume-options">
          <button
            type="button"
            className="resume-option-btn"
            onClick={(e) => openPreview(e, "/Pradeep-Deivamani-CV.pdf")}
          >
            <span>EN</span> {isFrench ? "Aperçu anglais (In-App)" : "Quick preview (English)"}
          </button>
          <button
            type="button"
            className="resume-option-btn"
            lang="fr"
            onClick={(e) => openPreview(e, "/Pradeep-Deivamani-CV-FR.pdf")}
          >
            <span>FR</span> {isFrench ? "Aperçu français (In-App)" : "Quick preview (French)"}
          </button>
          <div className="resume-option-divider" />
          <a href="/Pradeep-Deivamani-CV.pdf" target="_blank" rel="noreferrer" download>
            <span>↓</span> {isFrench ? "Télécharger direct (EN)" : "Direct download (EN)"}
          </a>
          <a href="/Pradeep-Deivamani-CV-FR.pdf" target="_blank" rel="noreferrer" lang="fr" download>
            <span>↓</span> {isFrench ? "Télécharger direct (FR)" : "Direct download (FR)"}
          </a>
        </div>
      </details>

      <CvPreviewModal
        isOpen={previewState.isOpen}
        onClose={() => setPreviewState({ isOpen: false, url: "" })}
        cvUrl={previewState.url}
        isFrench={isFrench}
      />
    </>
  );
}
