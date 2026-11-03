import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import ArrowIcon from "./ArrowIcon";

export default function CvPreviewModal({ isOpen, onClose, cvUrl, isFrench }) {
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

  return createPortal(
    <div className="cv-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cv-modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="cv-modal-header">
          <div className="cv-modal-title">
            <span className="code-dot" />
            <strong>{isFrench ? "Curriculum Vitæ — Pradeep Deivamani" : "Curriculum Vitae — Pradeep Deivamani"}</strong>
          </div>
          <div className="cv-modal-actions">
            <a href={cvUrl} download className="cv-action-download" target="_blank" rel="noreferrer">
              {isFrench ? "Télécharger" : "Download PDF"} <ArrowIcon direction="down" />
            </a>
            <button className="cv-modal-close" type="button" onClick={onClose} aria-label="Close CV Preview">×</button>
          </div>
        </div>
        <div className="cv-modal-frame-wrap">
          <div className="cv-mobile-banner">
            <span>{isFrench ? "Sur smartphone ?" : "On a mobile device?"}</span>
            <a href={cvUrl} target="_blank" rel="noreferrer">
              {isFrench ? "Ouvrir en plein écran ↗" : "Open in full screen ↗"}
            </a>
          </div>
          <iframe
            src={`${cvUrl}#toolbar=1&navpanes=0`}
            title="Pradeep Deivamani CV Preview"
            className="cv-modal-iframe"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
