import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ArrowIcon from "./ArrowIcon";

export default function CvPreviewModal({ isOpen, onClose, cvUrl, isFrench: defaultIsFrench }) {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    if (cvUrl?.includes("-FR")) {
      setSelectedLang("fr");
    } else {
      setSelectedLang("en");
    }
  }, [cvUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isFr = selectedLang === "fr";
  const activeUrl = isFr ? "/Pradeep-Deivamani-CV-FR.pdf" : "/Pradeep-Deivamani-CV.pdf";
  const activeFilename = isFr ? "Pradeep-Deivamani-CV-FR.pdf" : "Pradeep-Deivamani-CV.pdf";

  return createPortal(
    <div className="cv-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cv-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="cv-modal-header">
          <div className="cv-modal-title">
            <span className="code-dot" />
            <strong>
              {isFr
                ? "Curriculum Vitæ (FR) — Pradeep Deivamani"
                : "Curriculum Vitae (EN) — Pradeep Deivamani"}
            </strong>
          </div>
          <div className="cv-modal-actions">
            <div className="cv-modal-lang-toggle" role="group" aria-label="CV Language Toggle">
              <button
                type="button"
                className={`cv-lang-btn ${!isFr ? "is-active" : ""}`}
                onClick={() => setSelectedLang("en")}
                aria-pressed={!isFr}
              >
                EN
              </button>
              <button
                type="button"
                className={`cv-lang-btn ${isFr ? "is-active" : ""}`}
                onClick={() => setSelectedLang("fr")}
                aria-pressed={isFr}
              >
                FR
              </button>
            </div>
            <a
              href={activeUrl}
              download={activeFilename}
              className="cv-action-download"
              target="_blank"
              rel="noreferrer"
            >
              {isFr ? "Télécharger (FR)" : "Download (EN)"} <ArrowIcon direction="down" />
            </a>
            <button
              className="cv-modal-close"
              type="button"
              onClick={onClose}
              aria-label="Close CV Preview"
            >
              ×
            </button>
          </div>
        </div>
        <div className="cv-modal-frame-wrap">
          <div className="cv-mobile-banner">
            <span>{isFr ? "Sur smartphone ?" : "On a mobile device?"}</span>
            <a href={activeUrl} target="_blank" rel="noreferrer">
              {isFr ? "Ouvrir en plein écran ↗" : "Open in full screen ↗"}
            </a>
          </div>
          <iframe
            src={`${activeUrl}#toolbar=1&navpanes=0`}
            title={isFr ? "Aperçu CV Pradeep Deivamani" : "Pradeep Deivamani CV Preview"}
            className="cv-modal-iframe"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
