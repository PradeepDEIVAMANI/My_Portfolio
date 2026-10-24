import React from "react";

const paths = {
  northeast: "M4 12 12 4M6 4h6v6",
  southeast: "M4 4 12 12M6 12h6V6",
  down: "M8 3v10m-4-4 4 4 4-4",
  branch: "M4 4v4a4 4 0 0 0 4 4h4m-3-3 3 3-3 3",
};

export default function ArrowIcon({ direction = "northeast", className = "" }) {
  return <svg className={`arrow-icon ${className}`.trim()} viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"><path d={paths[direction] || paths.northeast} /></svg>;
}
