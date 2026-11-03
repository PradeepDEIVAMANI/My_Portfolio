import React, { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../i18n";
import ArrowIcon from "./ArrowIcon";
import CvPreviewModal from "./CvPreviewModal";

export default function ResumeMenu({ footer = false }) {
  const menuRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const isFrench = language === "fr";
  const [previewState, setPreviewState] = useState({ isOpen: false, url: "" });
  const [openUpward, setOpenUpward] = useState(false);

  const handleToggle = () => {
    if (menuRef.current?.open && !footer) {
      const rect = menuRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      // If space below is constrained (< 220px) and space above is larger, flip upward
      setOpenUpward(spaceBelow < 220 && spaceAbove > spaceBelow);
    }
  };

  useEffect(() => {
    const closeMenu = () => {
      if (menuRef.current?.open) menuRef.current.open = false;
    };
    const handleOutsideClick = (event) => {
      // Only close if clicking completely outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target)) closeMenu();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    // Use 'click' instead of 'pointerdown' for outside-click so the
    // element's own click handler fires BEFORE the menu collapses.
    document.addEventListener("click", handleOutsideClick, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openPreview = (e, url) => {
    e.stopPropagation();
    e.preventDefault();
    if (menuRef.current) menuRef.current.open = false;
    setPreviewState({ isOpen: true, url });
  };

  const closeDropdown = (e) => {
    // Small delay so the browser has time to start the download before the
    // <details> element closes (which could cancel anchor navigation on some browsers).
    setTimeout(() => {
      if (menuRef.current) menuRef.current.open = false;
    }, 100);
  };

  const frenchOption = {
    code: "fr",
    badge: "FR",
    title: isFrench ? "Version Française" : "French Version",
    previewLabel: isFrench ? "Aperçu" : "Preview",
    downloadLabel: isFrench ? "Télécharger" : "Download",
    url: "/Pradeep-Deivamani-CV-FR.pdf",
    filename: "Pradeep-Deivamani-CV-FR.pdf"
  };

  const englishOption = {
    code: "en",
    badge: "EN",
    title: isFrench ? "Version Anglaise" : "English Version",
    previewLabel: isFrench ? "Aperçu" : "Preview",
    downloadLabel: isFrench ? "Télécharger" : "Download",
    url: "/Pradeep-Deivamani-CV.pdf",
    filename: "Pradeep-Deivamani-CV.pdf"
  };

  // Order with active site language first
  const options = isFrench ? [frenchOption, englishOption] : [englishOption, frenchOption];

  return (
    <>
      <details
        ref={menuRef}
        onToggle={handleToggle}
        className={`resume-menu${footer ? " resume-menu-footer" : ""}`}
      >
        <summary className={footer ? "" : "button button-quiet"}>
          {footer ? <>{isFrench ? "CV" : "Résumé"} <ArrowIcon /></> : (isFrench ? "Voir mon CV" : "View CV")}
          {!footer && <span aria-hidden="true">⌄</span>}
        </summary>
        <div className={`resume-options${openUpward ? " resume-options-up" : ""}`}>
          {options.map((opt, idx) => (
            <div key={opt.code} className="resume-lang-group">
              <div className="resume-lang-header">
                <span className="resume-lang-badge">{opt.badge}</span>
                <span className="resume-lang-title">{opt.title}</span>
              </div>
              <div className="resume-lang-actions">
                <button
                  type="button"
                  className="resume-action-btn"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => openPreview(e, opt.url)}
                  title={isFrench ? `Aperçu ${opt.badge}` : `Preview ${opt.badge}`}
                >
                  <span aria-hidden="true">👁</span> {opt.previewLabel}
                </button>
                <a
                  href={opt.url}
                  download={opt.filename}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-action-btn resume-action-download"
                  onClick={closeDropdown}
                  onPointerDown={(e) => e.stopPropagation()}
                  title={isFrench ? `Télécharger direct ${opt.badge}` : `Direct download ${opt.badge}`}
                >
                  <span aria-hidden="true">↓</span> {opt.downloadLabel}
                </a>
              </div>
              {idx < options.length - 1 && <div className="resume-option-divider" />}
            </div>
          ))}
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
