import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LanguageContext } from "../i18n";
import ArrowIcon from "./ArrowIcon";
import CvPreviewModal from "./CvPreviewModal";

// Dropdown rendered as a portal so it escapes any parent stacking context
// (hero-copy z-index:1, signal-strip, etc.) and always floats on top.
function DropdownPortal({ anchorRef, isOpen, onClose, children, footer }) {
  const [pos, setPos] = useState({ top: 0, left: 0, openUp: false });
  const dropRef = useRef(null);

  // Reposition whenever the dropdown opens or window resizes
  useEffect(() => {
    if (!isOpen || !anchorRef.current) return;

    const place = () => {
      const r = anchorRef.current.getBoundingClientRect();
      const dropH = dropRef.current ? dropRef.current.offsetHeight : 220;
      const spaceBelow = window.innerHeight - r.bottom;
      const openUp = footer || (spaceBelow < dropH + 16 && r.top > dropH + 16);

      if (footer) {
        // Footer: open upward, align to right edge of anchor
        setPos({
          top: r.top - dropH - 9,
          left: r.right - 300, // 300 ≈ dropdown width; clamped below
          openUp: true,
        });
      } else {
        setPos({
          top: openUp ? r.top - dropH - 9 : r.bottom + 9,
          left: r.left,
          openUp,
        });
      }
    };

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [isOpen, anchorRef, footer]);

  if (!isOpen) return null;

  // Clamp left so dropdown never goes off the right edge
  const safeLeft = Math.min(pos.left, window.innerWidth - 312);

  return createPortal(
    <div
      ref={dropRef}
      className="resume-options"
      style={{ position: "fixed", top: pos.top, left: Math.max(8, safeLeft), zIndex: 9000 }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body
  );
}

export default function ResumeMenu({ footer = false }) {
  const triggerRef = useRef(null);
  const { language } = useContext(LanguageContext);
  const isFrench = language === "fr";
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewState, setPreviewState] = useState({ isOpen: false, url: "" });

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const closeKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    // Slight delay so the toggle click itself doesn't immediately close
    const t = setTimeout(() => {
      document.addEventListener("pointerdown", close);
      document.addEventListener("keydown", closeKey);
    }, 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", closeKey);
    };
  }, [menuOpen]);

  // Close on scroll (so the floating dropdown doesn't drift)
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", close, true);
  }, [menuOpen]);

  const toggleMenu = useCallback((e) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
  }, []);

  const openPreview = useCallback((e, url) => {
    e.stopPropagation();
    e.preventDefault();
    setMenuOpen(false);
    setPreviewState({ isOpen: true, url });
  }, []);

  const closeDropdown = useCallback(() => {
    setTimeout(() => setMenuOpen(false), 80);
  }, []);

  const frenchOption = {
    code: "fr",
    badge: "FR",
    title: isFrench ? "Version Française" : "French Version",
    previewLabel: isFrench ? "Aperçu" : "Preview",
    downloadLabel: isFrench ? "Télécharger" : "Download",
    url: "/Pradeep-Deivamani-CV-FR.pdf",
    filename: "Pradeep-Deivamani-CV-FR.pdf",
  };

  const englishOption = {
    code: "en",
    badge: "EN",
    title: isFrench ? "Version Anglaise" : "English Version",
    previewLabel: isFrench ? "Aperçu" : "Preview",
    downloadLabel: isFrench ? "Télécharger" : "Download",
    url: "/Pradeep-Deivamani-CV.pdf",
    filename: "Pradeep-Deivamani-CV.pdf",
  };

  const options = isFrench ? [frenchOption, englishOption] : [englishOption, frenchOption];

  return (
    <>
      {/* Trigger button — NOT a <details> anymore, just a button */}
      <div
        ref={triggerRef}
        className={`resume-menu${footer ? " resume-menu-footer" : ""}${menuOpen ? " resume-menu-open" : ""}`}
        style={{ position: "relative", display: "inline-flex" }}
      >
        <button
          type="button"
          className={footer ? "resume-footer-trigger" : "button button-quiet"}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={toggleMenu}
        >
          {footer
            ? <>{isFrench ? "CV" : "Résumé"} <ArrowIcon /></>
            : (isFrench ? "Voir mon CV" : "View CV")}
          {!footer && <span aria-hidden="true" className={`resume-caret${menuOpen ? " open" : ""}`}>⌄</span>}
        </button>

        <DropdownPortal anchorRef={triggerRef} isOpen={menuOpen} onClose={() => setMenuOpen(false)} footer={footer}>
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
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={closeDropdown}
                  title={isFrench ? `Télécharger ${opt.badge}` : `Download ${opt.badge}`}
                >
                  <span aria-hidden="true">↓</span> {opt.downloadLabel}
                </a>
              </div>
              {idx < options.length - 1 && <div className="resume-option-divider" />}
            </div>
          ))}
        </DropdownPortal>
      </div>

      <CvPreviewModal
        isOpen={previewState.isOpen}
        onClose={() => setPreviewState({ isOpen: false, url: "" })}
        cvUrl={previewState.url}
        isFrench={isFrench}
      />
    </>
  );
}
