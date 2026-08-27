export const MATH_COMPANION_EVENT = "raj-paute:math-companion";

// Theme choreography is deliberately unhurried. Curtain mode keeps the
// existing physical shutter action. Power mode leaves the companion in place,
// builds a restrained aura, then uses the figure as the radial light source.
export const THEME_CURTAIN_PREP_MS = 700;
export const THEME_CURTAIN_DURATION_MS = 1000;
export const THEME_CURTAIN_EDGE_HOLD_MS = 560;
export const THEME_CURTAIN_RETURN_MS = 760;

export const THEME_POWER_PREP_MS = 620;
export const THEME_POWER_DURATION_MS = 1080;
export const THEME_POWER_RECOVERY_MS = 500;

export function signalMathCompanion(type, detail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(MATH_COMPANION_EVENT, {
    detail: { type, ...detail },
  }));
}
