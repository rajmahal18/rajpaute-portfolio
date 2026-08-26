export const MATH_COMPANION_EVENT = "raj-paute:math-companion";

// Theme choreography is deliberately unhurried. The companion visibly reaches
// the shutter edge first, travels with the sheet, lingers, then rejoins the
// scroll-driven world without taking control away from the viewer.
export const THEME_CURTAIN_PREP_MS = 700;
export const THEME_CURTAIN_DURATION_MS = 1000;
export const THEME_CURTAIN_EDGE_HOLD_MS = 560;
export const THEME_CURTAIN_RETURN_MS = 760;

export function signalMathCompanion(type, detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(MATH_COMPANION_EVENT, {
    detail: { type, ...detail },
  }));
}
