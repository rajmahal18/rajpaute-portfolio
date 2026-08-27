import React from "react";
import {
  THEME_CURTAIN_DURATION_MS,
  THEME_POWER_DURATION_MS,
} from "../lib/mathCompanion";

export default function ThemeCurtain({ transition }) {
  if (!transition) return null;

  if (transition.effect === "power") {
    return (
      <div
        key={transition.id}
        className={`theme-power-layer theme-power-layer--${transition.direction}`}
        style={{ "--theme-power-duration": `${THEME_POWER_DURATION_MS}ms` }}
        aria-hidden="true"
      >
        <div className="theme-power-light" />
        <div className="theme-power-ring theme-power-ring--outer" />
        <div className="theme-power-ring theme-power-ring--inner" />
      </div>
    );
  }

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
