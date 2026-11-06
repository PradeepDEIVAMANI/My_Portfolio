import React from "react";
import { isSoundEnabled, toggleSound } from "../utils/audio";

export default function SoundToggle() {
  const [enabled, setEnabled] = React.useState(isSoundEnabled);

  function handleToggle() {
    const next = toggleSound();
    setEnabled(next);
  }

  return (
    <button
      className="sound-toggle-btn"
      type="button"
      onClick={handleToggle}
      title={enabled ? "Sound effects enabled (click to mute)" : "Sound effects muted (click to enable)"}
      aria-label={enabled ? "Mute audio haptics" : "Enable audio haptics"}
    >
      <span className="sound-icon" aria-hidden="true">
        {enabled ? "🔊" : "🔇"}
      </span>
      <span className="sound-text">{enabled ? "SFX" : "MUTED"}</span>
    </button>
  );
}
