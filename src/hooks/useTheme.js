import { useCallback, useEffect, useRef, useState } from "react";
import {
  signalMathCompanion,
  THEME_CURTAIN_DURATION_MS,
  THEME_CURTAIN_PREP_MS,
  THEME_POWER_DURATION_MS,
  THEME_POWER_PREP_MS,
} from "../lib/mathCompanion";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  try {
    const stored = window.localStorage.getItem("portfolio-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Fall through to the system preference when storage is unavailable.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

function syncThemeDocument(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  try {
    window.localStorage.setItem("portfolio-theme", theme);
  } catch {
    // Theme still works when storage is unavailable.
  }
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#000000" : "#ffffff");
}

export function useTheme({ animate = true } = {}) {
  const [theme, setTheme] = useState(getInitialTheme);
  const [transition, setTransition] = useState(null);
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);
  const themeRef = useRef(theme);
  const requestTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const clearTimerRef = useRef(null);
  const transitionIdRef = useRef(0);
  const lastEffectRef = useRef(null);
  const effectRepeatRef = useRef(0);
  // Theme effects are paired by light-mode source. A light page created by
  // the curtain must close with the curtain; a light page created by power
  // may contract back through power. Initial/reloaded light pages default to
  // curtain so Super Saiyan never appears out of nowhere.
  const lightSourceEffectRef = useRef("curtain");
  const busyRef = useRef(false);

  const commitTheme = useCallback((nextTheme) => {
    themeRef.current = nextTheme;
    syncThemeDocument(nextTheme);
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    themeRef.current = theme;
    syncThemeDocument(theme);
  }, [theme]);

  const finishTransition = useCallback(() => {
    setTransition(null);
    setIsThemeTransitioning(false);
    busyRef.current = false;
  }, []);

  const beginCurtain = useCallback((targetTheme) => {
    const id = ++transitionIdRef.current;

    if (targetTheme === "dark") {
      setTransition({ id, effect: "curtain", direction: "closing" });
      transitionTimerRef.current = window.setTimeout(() => {
        commitTheme("dark");
        clearTimerRef.current = window.setTimeout(finishTransition, 34);
      }, THEME_CURTAIN_DURATION_MS);
      return;
    }

    setTransition({ id, effect: "curtain", direction: "opening" });
    window.requestAnimationFrame(() => {
      commitTheme("light");
    });
    transitionTimerRef.current = window.setTimeout(finishTransition, THEME_CURTAIN_DURATION_MS);
  }, [commitTheme, finishTransition]);

  const beginPower = useCallback((targetTheme) => {
    const id = ++transitionIdRef.current;
    setTransition({
      id,
      effect: "power",
      direction: targetTheme === "light" ? "opening" : "closing",
    });

    // The radial layer reaches its final state first. The actual theme is then
    // committed under identical pixels, so there is no flash at teardown.
    transitionTimerRef.current = window.setTimeout(() => {
      commitTheme(targetTheme);
      clearTimerRef.current = window.setTimeout(finishTransition, 34);
    }, THEME_POWER_DURATION_MS);
  }, [commitTheme, finishTransition]);

  const toggleTheme = useCallback(() => {
    if (busyRef.current) return;

    const targetTheme = themeRef.current === "dark" ? "light" : "dark";
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (!animate || reducedMotion) {
      if (targetTheme === "light") lightSourceEffectRef.current = "curtain";
      commitTheme(targetTheme);
      return;
    }

    let effect;
    if (targetTheme === "light") {
      // Randomness belongs only to the moment light is created. The inverse
      // transition must use the same physical source so the resident never
      // powers down from a curtain-created light state.
      // Power is an occasional discovery, not the default personality of the site.
      effect = Math.random() < 0.2 ? "power" : "curtain";
      if (effect === lastEffectRef.current && effectRepeatRef.current >= 2) {
        effect = effect === "power" ? "curtain" : "power";
      }
      if (effect === lastEffectRef.current) effectRepeatRef.current += 1;
      else {
        lastEffectRef.current = effect;
        effectRepeatRef.current = 1;
      }
      lightSourceEffectRef.current = effect;
    } else {
      effect = lightSourceEffectRef.current === "power" ? "power" : "curtain";
    }

    const prepDuration = effect === "power" ? THEME_POWER_PREP_MS : THEME_CURTAIN_PREP_MS;

    busyRef.current = true;
    setIsThemeTransitioning(true);
    signalMathCompanion("theme-transition", { effect, targetTheme });

    requestTimerRef.current = window.setTimeout(() => {
      requestTimerRef.current = null;
      if (effect === "power") beginPower(targetTheme);
      else beginCurtain(targetTheme);
    }, prepDuration);
  }, [animate, beginCurtain, beginPower, commitTheme]);

  useEffect(() => () => {
    if (requestTimerRef.current) window.clearTimeout(requestTimerRef.current);
    if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
  }, []);

  return {
    theme,
    toggleTheme,
    transition,
    isThemeTransitioning,
  };
}
