import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const RouterContext = createContext(null);
const SCROLL_PREFIX = "raj-paute-scroll:";

const createKey = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const normalizePath = (path) => path !== "/" ? String(path || "/").replace(/\/+$/, "") || "/" : "/";

function ensureHistoryKey() {
  const current = window.history.state || {};
  if (current.__portfolioKey) return current.__portfolioKey;
  const key = createKey();
  window.history.replaceState({ ...current, __portfolioKey: key }, "", window.location.href);
  return key;
}

function saveScrollForKey(key) {
  if (!key) return;
  try {
    window.sessionStorage.setItem(`${SCROLL_PREFIX}${key}`, String(window.scrollY || 0));
  } catch {
    // Scroll restoration must never block navigation.
  }
}

function restoreScrollForKey(key) {
  let target = 0;
  try {
    target = Number(window.sessionStorage.getItem(`${SCROLL_PREFIX}${key}`) || 0);
  } catch {
    target = 0;
  }

  target = Number.isFinite(target) ? target : 0;
  const restore = () => window.scrollTo({ top: target, left: 0, behavior: "auto" });
  let interrupted = false;
  const events = ["wheel", "touchstart", "pointerdown", "keydown"];
  const cleanup = () => events.forEach((name) => window.removeEventListener(name, interrupt));
  const interrupt = () => {
    interrupted = true;
    cleanup();
  };

  events.forEach((name) => window.addEventListener(name, interrupt, { passive: true, once: true }));
  requestAnimationFrame(() => requestAnimationFrame(restore));
  [140, 320, 700, 1200].forEach((delay, index, delays) => {
    window.setTimeout(() => {
      if (!interrupted && Math.abs(window.scrollY - target) > 8) restore();
      if (index === delays.length - 1) cleanup();
    }, delay);
  });
}

export function RouterProvider({ children }) {
  const [route, setRoute] = useState(() => ({
    path: normalizePath(window.location.pathname),
    key: ensureHistoryKey(),
  }));
  const routeRef = useRef(route);
  routeRef.current = route;

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    restoreScrollForKey(routeRef.current.key);

    const onPopState = (event) => {
      saveScrollForKey(routeRef.current.key);
      const key = event.state?.__portfolioKey || ensureHistoryKey();
      const next = { path: normalizePath(window.location.pathname), key };
      routeRef.current = next;
      setRoute(next);
      restoreScrollForKey(key);
    };

    const onBeforeUnload = () => saveScrollForKey(routeRef.current.key);
    window.addEventListener("popstate", onPopState);
    window.addEventListener("beforeunload", onBeforeUnload);
    window.addEventListener("pagehide", onBeforeUnload);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("pagehide", onBeforeUnload);
    };
  }, []);

  const navigate = (to, options = {}) => {
    if (!to || normalizePath(to) === routeRef.current.path) return;
    saveScrollForKey(routeRef.current.key);
    const key = createKey();
    const state = {
      ...(options.state || {}),
      __portfolioKey: key,
      __portfolioFrom: routeRef.current.path,
    };
    if (options.replace) window.history.replaceState(state, "", to);
    else window.history.pushState(state, "", to);
    const next = { path: normalizePath(window.location.pathname), key };
    routeRef.current = next;
    setRoute(next);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const goBack = (fallback = "/work") => {
    if (window.history.state?.__portfolioFrom) window.history.back();
    else navigate(fallback, { replace: true });
  };

  const value = { path: route.path, navigate, goBack };
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const value = useContext(RouterContext);
  if (!value) throw new Error("useRouter must be used inside RouterProvider");
  return value;
}

export function Link({ href, children, className, onClick, ...rest }) {
  const { navigate } = useRouter();
  const isInternal = href?.startsWith("/") && !href?.startsWith("//");

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || !isInternal) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
