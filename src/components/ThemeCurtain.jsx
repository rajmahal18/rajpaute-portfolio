import React from "react";
import { THEME_CURTAIN_DURATION_MS } from "../lib/mathCompanion";

export default function ThemeCurtain({ transition }) {
  if (!transition) return null;

  return (
    <div
      key={transition.id}
      className={`theme-curtain-layer theme-curtain-layer--${transition.direction}`}
      style={{ "--theme-curtain-duration": `${THEME_CURTAIN_DURATION_MS}ms` }}
      aria-hidden="true"
    >
      <div className="theme-curtain-sheet" />
    </div>
  );
}
