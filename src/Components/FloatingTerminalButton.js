import React from "react";
import { playClick } from "../utils/audio";

export default function FloatingTerminalButton({ onOpenTerminal }) {
  React.useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        playClick();
        onOpenTerminal();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenTerminal]);

  return (
    <button
      className="floating-terminal-btn"
      type="button"
      onClick={() => {
        playClick();
        onOpenTerminal();
      }}
      title="Open Developer Terminal (Ctrl + K)"
      aria-label="Open Developer Terminal and System Telemetry"
    >
      <span className="terminal-live-dot" />
      <span className="terminal-btn-icon">&gt;_</span>
      <span className="terminal-btn-label">CLI</span>
      <kbd className="terminal-kbd">Ctrl+K</kbd>
    </button>
  );
}
