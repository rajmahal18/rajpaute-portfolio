import { useCallback, useEffect, useRef, useState } from "react";
import {
  THEME_CURTAIN_DURATION_MS,
  THEME_CURTAIN_PREP_MS,
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
  const curtainTimerRef = useRef(null);
  const clearTimerRef = useRef(null);
  const transitionIdRef = useRef(0);
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
      setTransition({ id, direction: "closing" });
      curtainTimerRef.current = window.setTimeout(() => {
        commitTheme("dark");
        clearTimerRef.current = window.setTimeout(finishTransition, 34);
      }, THEME_CURTAIN_DURATION_MS);
      return;
    }

    setTransition({ id, direction: "opening" });
    window.requestAnimationFrame(() => {
      commitTheme("light");
    });
    curtainTimerRef.current = window.setTimeout(finishTransition, THEME_CURTAIN_DURATION_MS);
  }, [commitTheme, finishTransition]);

  const toggleTheme = useCallback(() => {
    if (busyRef.current) return;

    const targetTheme = themeRef.current === "dark" ? "light" : "dark";
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (!animate || reducedMotion) {
      commitTheme(targetTheme);
      return;
    }

    busyRef.current = true;
    setIsThemeTransitioning(true);
    requestTimerRef.current = window.setTimeout(() => {
      requestTimerRef.current = null;
      beginCurtain(targetTheme);
    }, THEME_CURTAIN_PREP_MS);
  }, [animate, beginCurtain, commitTheme]);

  useEffect(() => () => {
    if (requestTimerRef.current) window.clearTimeout(requestTimerRef.current);
    if (curtainTimerRef.current) window.clearTimeout(curtainTimerRef.current);
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
  }, []);

  return {
    theme,
    toggleTheme,
    transition,
    isThemeTransitioning,
  };
}
