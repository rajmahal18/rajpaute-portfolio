import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ROUTE_INTENT_EVENT, useRouter } from "../lib/router";
import { playCurtainSwish, playSoftLanding, unlockCompanionAudio } from "../lib/companionAudio";
import {
  MATH_COMPANION_EVENT,
  THEME_CURTAIN_DURATION_MS,
  THEME_CURTAIN_EDGE_HOLD_MS,
  THEME_CURTAIN_PREP_MS,
  THEME_CURTAIN_RETURN_MS,
  THEME_POWER_DURATION_MS,
  THEME_POWER_PREP_MS,
  THEME_POWER_RECOVERY_MS,
} from "../lib/mathCompanion";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (from, to, t) => from + (to - from) * t;
const easeOutCubic = (t) => 1 - ((1 - t) ** 3);
const easeInOutCubic = (t) => (t < 0.5
  ? 4 * t * t * t
  : 1 - (((-2 * t + 2) ** 3) / 2));

const TRAIL_MARKS = ["·", "+", "×", "π", "∠", "−"];
const PORTAL_SCALE = 1.25;
const IDLE_RELAX_MS = 3600;
const IDLE_MEDITATE_MS = 8200;
const DRAG_THRESHOLD_PX = 6;

const THEME_ACTIONS = new Set([
  "theme-stand",
  "leap-up",
  "drop-bottom",
  "curtain-down",
  "curtain-up",
  "edge-bottom",
  "edge-top",
  "rejoin-bottom",
  "leap-down",
  "power-up",
  "power-burst",
  "power-recover",
]);

const PORTAL_ACTIONS = new Set(["portal-stand", "portal-open", "portal-enter", "portal-exit"]);

const isThemeChoreography = (action) => THEME_ACTIONS.has(action);
const isPortalChoreography = (action) => PORTAL_ACTIONS.has(action);

const GAIT_PROFILES = {
  // Angles are authored for a figure facing right. The entire SVG mirrors when
  // facing left, so one gait model stays physically consistent both ways.
  walk: { stanceShare: 0.62, forward: 22, backward: -17, knee: 27, cycleDistance: 50, bob: 1.05, lean: 0.75, arm: 0.76, speedBase: 100 },
  brisk: { stanceShare: 0.56, forward: 26, backward: -21, knee: 33, cycleDistance: 55, bob: 1.45, lean: 1.25, arm: 0.83, speedBase: 165 },
  run: { stanceShare: 0.42, forward: -31, backward: 25, knee: 61, cycleDistance: 66, bob: 2.65, lean: 7.8, arm: 0.57, speedBase: 260 },
  sprint: { stanceShare: 0.34, forward: -37, backward: 30, knee: 74, cycleDistance: 76, bob: 3.2, lean: 11.2, arm: 0.5, speedBase: 420 },
};

function gaitLegPose(progress, mode = "walk") {
  const profile = GAIT_PROFILES[mode] || GAIT_PROFILES.walk;
  const normalized = ((progress % 1) + 1) % 1;

  if (normalized < profile.stanceShare) {
    const t = normalized / profile.stanceShare;
    const eased = t * t * (3 - 2 * t);
    const angle = lerp(profile.forward, profile.backward, eased);
    const fast = mode === "run" || mode === "sprint";
    return {
      angle,
      knee: mode === "sprint" ? 7 : mode === "run" ? 5 : 1.5,
      foot: fast ? clamp(-angle * 0.62, -18, 18) : -angle * 0.9,
      airborne: false,
    };
  }

  const t = (normalized - profile.stanceShare) / (1 - profile.stanceShare);
  const eased = easeInOutCubic(t);
  const angle = lerp(profile.backward, profile.forward, eased);
  const knee = Math.sin(Math.PI * t) * profile.knee;
  const fast = mode === "run" || mode === "sprint";
  return {
    angle,
    knee,
    // Keep the ankle controlled during the fast recovery phase. Huge
    // compensating foot rotations were a major reason the old run looked like
    // a slide; preserve the already-approved walk/brisk foot behavior.
    foot: fast ? clamp(-(angle * 0.5 + knee * 0.16), -24, 24) : -(angle + knee * 0.52),
    airborne: true,
  };
}

function gaitArmPose(shoulderAngle, progress, mode = "walk", intensity = 1, side = 1) {
  const normalized = ((progress % 1) + 1) % 1;
  const pulse = Math.abs(Math.sin(normalized * Math.PI * 2));
  const fast = mode === "run" || mode === "sprint";
  const baseFlex = mode === "sprint" ? 76 : mode === "run" ? 66 : mode === "brisk" ? 19 : 11;
  const extraFlex = mode === "sprint" ? 9 : mode === "run" ? 12 : mode === "brisk" ? 7 : 5;
  const bend = (baseFlex + pulse * extraFlex + Math.min(fast ? 6 : 8, Math.abs(shoulderAngle) * (fast ? 0.1 : 0.14))) * intensity;

  // Mirrored elbow signs are essential at running speeds on the two-sided SVG
  // skeleton. Keep the subtler approved walk/brisk behavior unchanged.
  const elbow = fast ? bend * side : bend;
  const wrist = fast
    ? -bend * 0.16 * side + Math.sin(normalized * Math.PI * 2) * 1.8 * intensity
    : -bend * 0.24 + Math.sin(normalized * Math.PI * 2) * 2.2 * intensity;

  return { shoulder: shoulderAngle, elbow, wrist };
}

function resolveGaitMode(speed, progressGap, currentMode) {
  if (currentMode === "sprint" && (speed > 300 || progressGap > 0.13)) return "sprint";
  if (currentMode === "run" && (speed > 160 || progressGap > 0.06)) {
    if (speed > 350 || progressGap > 0.18) return "sprint";
    return "run";
  }
  if (currentMode === "brisk" && (speed > 78 || progressGap > 0.018)) {
    if (speed > 350 || progressGap > 0.18) return "sprint";
    if (speed > 210 || progressGap > 0.085) return "run";
    return "brisk";
  }
  if (currentMode === "walk" && (speed > 16 || progressGap > 0.003)) {
    if (speed > 350 || progressGap > 0.18) return "sprint";
    if (speed > 210 || progressGap > 0.085) return "run";
    if (speed > 100 || progressGap > 0.028) return "brisk";
    return "walk";
  }

  if (speed > 350 || progressGap > 0.18) return "sprint";
  if (speed > 210 || progressGap > 0.085) return "run";
  if (speed > 100 || progressGap > 0.028) return "brisk";
  if (speed > 20 || progressGap > 0.004) return "walk";
  return "idle";
}

const SPAWN_DECK = [
  { kind: "text", value: "+" },
  { kind: "triangle" },
  { kind: "text", value: "×" },
  { kind: "circle" },
  { kind: "text", value: "√" },
  { kind: "square" },
  { kind: "text", value: "÷" },
  { kind: "angle" },
  { kind: "text", value: "π" },
  { kind: "text", value: "e" },
  { kind: "text", value: "i" },
  { kind: "vector" },
  { kind: "text", value: "=" },
  { kind: "text", value: "−" },
];

const LOCAL_OFFSETS = [
  { x: -58, y: -62, rotate: -18 },
  { x: 44, y: -76, rotate: 22 },
  { x: -72, y: -28, rotate: 16 },
  { x: 58, y: -38, rotate: -20 },
  { x: -34, y: -88, rotate: 24 },
  { x: 30, y: -58, rotate: -24 },
];

function viewportMetrics() {
  if (typeof window === "undefined") {
    return {
      width: 1440,
      height: 900,
      compact: false,
      stageWidth: 84,
      stageHeight: 110,
      trackLeft: 26,
      trackRight: 1414,
      trackY: 884,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const compact = width <= 720;
  const stageWidth = compact ? 62 : 84;
  const stageHeight = compact ? 82 : 110;
  const trackInset = compact ? 14 : clamp(width * 0.02, 18, 30);
  const trackBottom = compact ? 12 : 16;

  return {
    width,
    height,
    compact,
    stageWidth,
    stageHeight,
    trackLeft: trackInset,
    trackRight: width - trackInset,
    trackY: height - trackBottom,
  };
}

function scrollProgress() {
  if (typeof document === "undefined") return 0;
  const root = document.documentElement;
  const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);
  if (maxScroll <= 1) return 0;
  return clamp((window.scrollY || 0) / maxScroll, 0, 1);
}

function stageCoordinates(progress, metrics = viewportMetrics()) {
  const trackWidth = Math.max(1, metrics.trackRight - metrics.trackLeft);
  const footX = metrics.trackLeft + progress * trackWidth;
  const footOffsetY = metrics.stageHeight * (130 / 154);

  return {
    x: footX - metrics.stageWidth * 0.5,
    y: metrics.trackY - footOffsetY,
  };
}

function quadraticPoint(from, control, to, t) {
  const inverse = 1 - t;
  return {
    x: inverse * inverse * from.x + 2 * inverse * t * control.x + t * t * to.x,
    y: inverse * inverse * from.y + 2 * inverse * t * control.y + t * t * to.y,
  };
}

function figureNode(kind) {
  if (kind === "triangle") {
    return <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M14 3 25 24H3Z" /></svg>;
  }
  if (kind === "circle") {
    return <svg viewBox="0 0 28 28" aria-hidden="true"><circle cx="14" cy="14" r="10" /></svg>;
  }
  if (kind === "square") {
    return <svg viewBox="0 0 28 28" aria-hidden="true"><rect x="5" y="5" width="18" height="18" /></svg>;
  }
  if (kind === "angle") {
    return <svg viewBox="0 0 28 28" aria-hidden="true"><path d="M5 22 14 7 24 22" /><path d="M10.5 22a6 6 0 0 1 3.2-5.3" /></svg>;
  }
  if (kind === "vector") {
    return <svg viewBox="0 0 34 28" aria-hidden="true"><path d="M4 14h24" /><path d="m22 8 6 6-6 6" /></svg>;
  }
  return null;
}

export default function MathCompanion() {
  const { path } = useRouter();
  const layerRef = useRef(null);
  const stageRef = useRef(null);
  const spawnTimersRef = useRef(new Map());
  const actionTimersRef = useRef([]);
  const restTimerRef = useRef(null);
  const meditateTimerRef = useRef(null);
  const motionRafRef = useRef(0);
  const actionMotionRafRef = useRef(0);
  const lastFrameRef = useRef(0);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const currentXRef = useRef(0);
  const currentYRef = useRef(0);
  const velocityXRef = useRef(0);
  const gaitPhaseRef = useRef(0);
  const trailContactRef = useRef(-1);
  const lastTrailAtRef = useRef(0);
  const trailIdRef = useRef(0);
  const trailTimersRef = useRef(new Map());
  const speedRef = useRef(null);
  const lastSpeedPaintRef = useRef(0);
  const facingRef = useRef(1);
  const actionRef = useRef("idle");
  const movementModeRef = useRef("idle");
  const meditatingRef = useRef(false);
  const poweredRef = useRef(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const spawnIndexRef = useRef(0);
  const spawnIdRef = useRef(0);
  const portalIdRef = useRef(0);
  const idleScheduledRef = useRef(false);
  const dragRef = useRef({
    pointerId: null,
    candidate: false,
    active: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    lastX: 0,
    lastY: 0,
    lastAt: 0,
    velocityX: 0,
    velocityY: 0,
  });
  const suppressClickRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [movementMode, setMovementMode] = useState("idle");
  const [resting, setResting] = useState(false);
  const [meditating, setMeditating] = useState(false);
  const [action, setAction] = useState("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [spawns, setSpawns] = useState([]);
  const [trails, setTrails] = useState([]);
  const [portal, setPortal] = useState(null);
  const [powered, setPowered] = useState(false);

  const clearActionTimers = useCallback(() => {
    actionTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    actionTimersRef.current = [];
  }, []);

  const setActionState = useCallback((nextAction) => {
    actionRef.current = nextAction;
    setAction(nextAction);
  }, []);

  const setMovementState = useCallback((nextMode) => {
    if (movementModeRef.current === nextMode) return;
    movementModeRef.current = nextMode;
    setMovementMode(nextMode);
  }, []);

  const clearIdleTimers = useCallback(() => {
    window.clearTimeout(restTimerRef.current);
    window.clearTimeout(meditateTimerRef.current);
    restTimerRef.current = null;
    meditateTimerRef.current = null;
    idleScheduledRef.current = false;
  }, []);

  const setPoweredState = useCallback((nextPowered) => {
    const next = Boolean(nextPowered);
    poweredRef.current = next;
    setPowered(next);

    if (next) {
      clearIdleTimers();
      meditatingRef.current = false;
      setMeditating(false);
      setResting(false);
    }
  }, [clearIdleTimers]);

  const scheduleRest = useCallback(() => {
    if (idleScheduledRef.current || meditatingRef.current || poweredRef.current) return;
    if (actionRef.current !== "idle" || movementModeRef.current !== "idle") return;

    idleScheduledRef.current = true;
    restTimerRef.current = window.setTimeout(() => {
      if (actionRef.current === "idle" && movementModeRef.current === "idle" && !dragRef.current.active) {
        setResting(true);
      }
    }, IDLE_RELAX_MS);
    meditateTimerRef.current = window.setTimeout(() => {
      idleScheduledRef.current = false;
      restTimerRef.current = null;
      meditateTimerRef.current = null;
      if (actionRef.current === "idle" && movementModeRef.current === "idle" && !dragRef.current.active) {
        setResting(false);
        meditatingRef.current = true;
        setMeditating(true);
      }
    }, IDLE_MEDITATE_MS);
  }, []);

  const resetGaitPose = useCallback(() => {
    const node = stageRef.current;
    if (!node) return;
    node.style.setProperty("--companion-gait-y", "0px");
    node.style.setProperty("--companion-gait-rotate", "0deg");
    node.style.setProperty("--companion-arm-left", "0deg");
    node.style.setProperty("--companion-arm-right", "0deg");
    node.style.setProperty("--companion-elbow-left", "0deg");
    node.style.setProperty("--companion-elbow-right", "0deg");
    node.style.setProperty("--companion-wrist-left", "0deg");
    node.style.setProperty("--companion-wrist-right", "0deg");
    node.style.setProperty("--companion-spine-bend", "0deg");
    node.style.setProperty("--companion-head-counter", "0deg");
    node.style.setProperty("--companion-leg-left", "0deg");
    node.style.setProperty("--companion-leg-right", "0deg");
    node.style.setProperty("--companion-knee-left", "0deg");
    node.style.setProperty("--companion-knee-right", "0deg");
    node.style.setProperty("--companion-foot-left", "0deg");
    node.style.setProperty("--companion-foot-right", "0deg");
  }, []);

  const setStagePosition = useCallback((x, y) => {
    const node = stageRef.current;
    if (!node) return;
    const metrics = viewportMetrics();
    const minX = -metrics.stageWidth * 0.5 + metrics.trackLeft;
    const maxX = metrics.width - metrics.stageWidth * 0.5 - (metrics.width - metrics.trackRight);
    const nextX = clamp(x, minX, maxX);
    const nextY = clamp(y, 0, Math.max(0, metrics.height - metrics.stageHeight));

    currentXRef.current = nextX;
    currentYRef.current = nextY;
    node.style.setProperty("--companion-x", `${nextX.toFixed(2)}px`);
    node.style.setProperty("--companion-y", `${nextY.toFixed(2)}px`);

    // Theme power mode uses the companion's live body position as its light
    // origin. Keep the source coordinates independent of page content so the
    // radial transition follows the resident wherever the viewer has scrolled.
    const sourceX = nextX + metrics.stageWidth * 0.5;
    const sourceY = nextY + metrics.stageHeight * 0.43;
    document.documentElement.style.setProperty("--theme-source-x", `${sourceX.toFixed(2)}px`);
    document.documentElement.style.setProperty("--theme-source-y", `${sourceY.toFixed(2)}px`);
  }, []);

  const hideSpeedReadout = useCallback(() => {
    const node = speedRef.current;
    if (!node) return;
    node.classList.remove("is-visible");
  }, []);

  const paintSpeedReadout = useCallback((velocity, now) => {
    const node = speedRef.current;
    if (!node) return;
    const speed = Math.abs(velocity);

    if (speed < 24 || actionRef.current !== "idle") {
      node.classList.remove("is-visible");
      return;
    }

    if (now - lastSpeedPaintRef.current < 70) return;
    lastSpeedPaintRef.current = now;
    const sign = velocity < 0 ? "−" : "+";
    node.textContent = `v = ${sign}${(speed / 140).toFixed(2)} u/s`;
    node.classList.add("is-visible");
    const metrics = viewportMetrics();
    node.dataset.side = currentXRef.current < metrics.width * 0.5 ? "right" : "left";
  }, []);

  const removeTrail = useCallback((id) => {
    setTrails((current) => current.filter((trail) => trail.id !== id));
    const timer = trailTimersRef.current.get(id);
    if (timer) window.clearTimeout(timer);
    trailTimersRef.current.delete(id);
  }, []);

  const addTrailMark = useCallback((x, y, speed, now, gait = "walk") => {
    const minGap = speed > 180 ? 105 : 145;
    if (now - lastTrailAtRef.current < minGap) return;
    lastTrailAtRef.current = now;

    const id = ++trailIdRef.current;
    const symbol = TRAIL_MARKS[(id - 1) % TRAIL_MARKS.length];
    const duration = speed > 180 ? 360 : 420;
    const mark = {
      id,
      symbol,
      x,
      y,
      rotate: ((id * 37) % 34) - 17,
      duration,
      gait,
    };

    setTrails((current) => [...current.slice(-3), mark]);
    const timer = window.setTimeout(() => removeTrail(id), duration + 80);
    trailTimersRef.current.set(id, timer);
  }, [removeTrail]);

  const cancelActionMotion = useCallback(() => {
    if (!actionMotionRafRef.current) return;
    window.cancelAnimationFrame(actionMotionRafRef.current);
    actionMotionRafRef.current = 0;
  }, []);

  const animateStageTo = useCallback(({
    x = currentXRef.current,
    y = currentYRef.current,
    duration,
    easing = easeInOutCubic,
    arcX = 0,
    arcY = 0,
    onComplete,
  }) => {
    cancelActionMotion();
    const fromX = currentXRef.current;
    const fromY = currentYRef.current;
    const startedAt = performance.now();

    const frame = (now) => {
      const raw = clamp((now - startedAt) / Math.max(1, duration), 0, 1);
      const eased = easing(raw);
      const arc = Math.sin(Math.PI * raw);
      const nextX = lerp(fromX, x, eased) + arc * arcX;
      const nextY = lerp(fromY, y, eased) - arc * arcY;
      setStagePosition(nextX, nextY);

      if (raw < 1) {
        actionMotionRafRef.current = window.requestAnimationFrame(frame);
        return;
      }

      actionMotionRafRef.current = 0;
      setStagePosition(x, y);
      onComplete?.();
    };

    actionMotionRafRef.current = window.requestAnimationFrame(frame);
  }, [cancelActionMotion, setStagePosition]);

  const updateTrackTarget = useCallback((snap = false) => {
    const metrics = viewportMetrics();
    const progress = scrollProgress();
    const next = stageCoordinates(progress, metrics);
    targetXRef.current = next.x;
    targetYRef.current = next.y;

    if (snap) {
      velocityXRef.current = 0;
      gaitPhaseRef.current = 0;
      setStagePosition(next.x, next.y);
      resetGaitPose();
      setMovementState("idle");
    }
  }, [resetGaitPose, setMovementState, setStagePosition]);

  const lookAt = useCallback((clientX, clientY, strength = 1) => {
    const node = stageRef.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    const cx = bounds.left + bounds.width * 0.5;
    const cy = bounds.top + bounds.height * 0.36;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const length = Math.max(1, Math.hypot(dx, dy));
    const proximity = clamp(1 - (length - 80) / 540, 0.18, 1);
    const finalStrength = strength * proximity;
    const normalizedX = dx / length;
    const normalizedY = dy / length;

    node.style.setProperty("--companion-look-x", `${(normalizedX * 3 * finalStrength).toFixed(2)}px`);
    node.style.setProperty("--companion-look-y", `${(normalizedY * 2.3 * finalStrength).toFixed(2)}px`);
    node.style.setProperty("--companion-lean", `${clamp(normalizedX * 2 * finalStrength, -2, 2).toFixed(2)}deg`);
  }, []);

  const relaxLook = useCallback(() => {
    const node = stageRef.current;
    if (!node) return;
    node.style.setProperty("--companion-look-x", "0px");
    node.style.setProperty("--companion-look-y", "0px");
    node.style.setProperty("--companion-lean", "0deg");
  }, []);

  const setFacing = useCallback((direction) => {
    const next = direction < 0 ? -1 : 1;
    if (facingRef.current === next) return;
    facingRef.current = next;
    stageRef.current?.style.setProperty("--companion-facing", String(next));
  }, []);

  const faceToward = useCallback((clientX) => {
    const node = stageRef.current;
    if (!node) return;
    const bounds = node.getBoundingClientRect();
    setFacing(clientX < bounds.left + bounds.width / 2 ? -1 : 1);
  }, [setFacing]);

  const runMotionFrame = useCallback(function animateMotion(now) {
    motionRafRef.current = 0;
    if (reducedMotion || actionRef.current !== "idle") return;

    const node = stageRef.current;
    if (!node) return;

    const previousTime = lastFrameRef.current || now;
    const dt = clamp((now - previousTime) / 1000, 1 / 240, 1 / 30);
    lastFrameRef.current = now;

    const current = currentXRef.current;
    const target = targetXRef.current;
    const distance = target - current;
    let velocity = velocityXRef.current;

    // Slightly softer spring than the previous pass. It still catches up after
    // a large scroll jump, but the body has enough time to show actual steps.
    const stiffness = 38;
    const damping = 13.8;
    const acceleration = distance * stiffness - velocity * damping;
    velocity += acceleration * dt;
    velocity = clamp(velocity, -520, 520);
    let nextX = current + velocity * dt;

    if (Math.abs(distance) < 0.18 && Math.abs(velocity) < 1.8) {
      nextX = target;
      velocity = 0;
    }

    const yDistance = targetYRef.current - currentYRef.current;
    const yBlend = 1 - Math.exp(-10 * dt);
    const nextY = Math.abs(yDistance) < 0.12
      ? targetYRef.current
      : currentYRef.current + yDistance * yBlend;

    velocityXRef.current = velocity;
    setStagePosition(nextX, nextY);

    const speed = Math.abs(velocity);
    paintSpeedReadout(velocity, now);
    const metrics = viewportMetrics();
    const progressGap = Math.abs(target - nextX) / Math.max(1, metrics.trackRight - metrics.trackLeft);
    const nextMode = resolveGaitMode(speed, progressGap, movementModeRef.current);

    if (nextMode !== "idle") {
      setResting(false);
      if (meditatingRef.current) {
        meditatingRef.current = false;
        setMeditating(false);
      }
      clearIdleTimers();
      if (Math.abs(velocity) > 7) setFacing(velocity < 0 ? -1 : 1);

      const profile = GAIT_PROFILES[nextMode] || GAIT_PROFILES.walk;
      const travelled = Math.abs(nextX - current);
      gaitPhaseRef.current += travelled / profile.cycleDistance;
      const cycle = gaitPhaseRef.current % 1;
      const left = gaitLegPose(cycle, nextMode);
      const right = gaitLegPose((cycle + 0.5) % 1, nextMode);
      const minimumIntensity = nextMode === "sprint" ? 0.82 : nextMode === "run" ? 0.72 : nextMode === "brisk" ? 0.62 : 0.5;
      const intensity = clamp(speed / profile.speedBase, minimumIntensity, 1.06);

      const bobPhase = Math.sin(cycle * Math.PI * 2);
      const bob = -Math.abs(Math.sin(cycle * Math.PI * 4)) * profile.bob * intensity;
      const drivePulse = Math.sin(cycle * Math.PI * 2);
      const bodyRotate = profile.lean * intensity + drivePulse * (nextMode === "sprint" ? 0.75 : nextMode === "run" ? 0.52 : 0.24);
      // Opposite arm / leg pairing with reduced shoulder travel at speed. The
      // elbow bend, not a windmilling shoulder, now carries the running pose.
      const rawArmLeft = -right.angle * profile.arm * intensity;
      const rawArmRight = -left.angle * profile.arm * intensity;
      const armLeft = gaitArmPose(rawArmLeft, (cycle + 0.5) % 1, nextMode, intensity, -1);
      const armRight = gaitArmPose(rawArmRight, cycle, nextMode, intensity, 1);
      const spineBend = drivePulse * (nextMode === "sprint" ? 1.55 : nextMode === "run" ? 1.1 : nextMode === "brisk" ? 0.62 : 0.34) * intensity;
      const headCounter = -(bodyRotate * 0.36 + spineBend * 0.64);

      node.style.setProperty("--companion-gait-y", `${bob.toFixed(2)}px`);
      node.style.setProperty("--companion-gait-rotate", `${bodyRotate.toFixed(2)}deg`);
      node.style.setProperty("--companion-spine-bend", `${spineBend.toFixed(2)}deg`);
      node.style.setProperty("--companion-head-counter", `${headCounter.toFixed(2)}deg`);
      node.style.setProperty("--companion-leg-left", `${(left.angle * intensity).toFixed(2)}deg`);
      node.style.setProperty("--companion-leg-right", `${(right.angle * intensity).toFixed(2)}deg`);
      node.style.setProperty("--companion-knee-left", `${(left.knee * intensity).toFixed(2)}deg`);
      node.style.setProperty("--companion-knee-right", `${(right.knee * intensity).toFixed(2)}deg`);
      node.style.setProperty("--companion-foot-left", `${(left.foot * intensity).toFixed(2)}deg`);
      node.style.setProperty("--companion-foot-right", `${(right.foot * intensity).toFixed(2)}deg`);
      node.style.setProperty("--companion-arm-left", `${armLeft.shoulder.toFixed(2)}deg`);
      node.style.setProperty("--companion-arm-right", `${armRight.shoulder.toFixed(2)}deg`);
      node.style.setProperty("--companion-elbow-left", `${armLeft.elbow.toFixed(2)}deg`);
      node.style.setProperty("--companion-elbow-right", `${armRight.elbow.toFixed(2)}deg`);
      node.style.setProperty("--companion-wrist-left", `${armLeft.wrist.toFixed(2)}deg`);
      node.style.setProperty("--companion-wrist-right", `${armRight.wrist.toFixed(2)}deg`);

      const contact = Math.floor(gaitPhaseRef.current * 2);
      if (contact !== trailContactRef.current && speed > 48) {
        trailContactRef.current = contact;
        const footY = nextY + metrics.stageHeight * (130 / 154) + 1;
        const footSide = contact % 2 === 0 ? -1 : 1;
        const footX = nextX + metrics.stageWidth * 0.5 + footSide * metrics.stageWidth * 0.055;
        addTrailMark(footX, footY, speed, now, nextMode);
      }
    } else {
      resetGaitPose();
      hideSpeedReadout();
    }

    setMovementState(nextMode);

    if (velocity !== 0 || Math.abs(target - nextX) >= 0.18 || Math.abs(targetYRef.current - nextY) >= 0.12) {
      motionRafRef.current = window.requestAnimationFrame(animateMotion);
    } else {
      lastFrameRef.current = 0;
      hideSpeedReadout();
      scheduleRest();
    }
  }, [
    addTrailMark,
    clearIdleTimers,
    hideSpeedReadout,
    paintSpeedReadout,
    reducedMotion,
    resetGaitPose,
    scheduleRest,
    setFacing,
    setMovementState,
    setStagePosition,
  ]);

  const startMotionLoop = useCallback(() => {
    if (reducedMotion || actionRef.current !== "idle" || motionRafRef.current || dragRef.current.active) return;

    const needsMotion = Math.abs(targetXRef.current - currentXRef.current) >= 0.18
      || Math.abs(targetYRef.current - currentYRef.current) >= 0.12
      || Math.abs(velocityXRef.current) >= 1.8;

    // ResizeObserver and route layout settling can fire repeatedly even when the
    // resident has nowhere to go. Do not restart the idle clock for those
    // no-op updates; this keeps the same idle timing on every public route.
    if (!needsMotion) {
      scheduleRest();
      return;
    }

    clearIdleTimers();
    setResting(false);
    relaxLook();

    if (meditatingRef.current) {
      meditatingRef.current = false;
      setMeditating(false);
      setActionState("standing-up");
      const standTimer = window.setTimeout(() => {
        setActionState("idle");
        lastFrameRef.current = 0;
        motionRafRef.current = window.requestAnimationFrame(runMotionFrame);
      }, 360);
      actionTimersRef.current.push(standTimer);
      return;
    }

    lastFrameRef.current = 0;
    motionRafRef.current = window.requestAnimationFrame(runMotionFrame);
  }, [clearIdleTimers, reducedMotion, relaxLook, runMotionFrame, scheduleRest, setActionState]);

  const setTemporaryAction = useCallback((nextAction, duration = 760) => {
    clearActionTimers();
    cancelActionMotion();
    if (motionRafRef.current) {
      window.cancelAnimationFrame(motionRafRef.current);
      motionRafRef.current = 0;
    }
    velocityXRef.current = 0;
    hideSpeedReadout();
    clearIdleTimers();
    const wasMeditating = meditatingRef.current;
    meditatingRef.current = false;
    setMeditating(false);
    setResting(false);
    setMovementState("idle");
    resetGaitPose();

    const beginAction = () => {
      setActionState(nextAction);
      const finishTimer = window.setTimeout(() => {
        setActionState("idle");
        relaxLook();
        startMotionLoop();
        scheduleRest();
      }, duration);
      actionTimersRef.current.push(finishTimer);
    };

    if (wasMeditating) {
      setActionState("standing-up");
      const standTimer = window.setTimeout(beginAction, 340);
      actionTimersRef.current.push(standTimer);
    } else {
      beginAction();
    }
    return wasMeditating ? 340 : 0;
  }, [
    cancelActionMotion,
    clearActionTimers,
    clearIdleTimers,
    hideSpeedReadout,
    relaxLook,
    resetGaitPose,
    scheduleRest,
    setActionState,
    setMovementState,
    startMotionLoop,
  ]);

  const removeSpawn = useCallback((id) => {
    setSpawns((current) => current.filter((spawn) => spawn.id !== id));
    const timer = spawnTimersRef.current.get(id);
    if (timer) window.clearTimeout(timer);
    spawnTimersRef.current.delete(id);
  }, []);

  const addSpawn = useCallback(({
    item,
    fromX,
    fromY,
    toX,
    toY,
    rotate = 0,
    spin = null,
    duration = 1000,
    projectile = false,
    arcHeight,
  }) => {
    const id = ++spawnIdRef.current;
    const from = { x: fromX, y: fromY };
    const to = { x: toX, y: toY };
    const resolvedSpin = spin ?? rotate;
    const resolvedArc = arcHeight ?? (projectile ? clamp(Math.hypot(toX - fromX, toY - fromY) * 0.14, 44, 92) : 24);
    const control = {
      x: fromX + (toX - fromX) * 0.5,
      y: Math.min(fromY, toY) - resolvedArc,
    };
    const q1 = quadraticPoint(from, control, to, 0.25);
    const mid = quadraticPoint(from, control, to, 0.5);
    const q3 = quadraticPoint(from, control, to, 0.75);

    const spawn = {
      id,
      item,
      fromX,
      fromY,
      q1X: q1.x,
      q1Y: q1.y,
      midX: mid.x,
      midY: mid.y,
      q3X: q3.x,
      q3Y: q3.y,
      toX,
      toY,
      rotate,
      spin: resolvedSpin,
      duration,
      projectile,
    };

    setSpawns((current) => [...current.slice(-5), spawn]);
    const timer = window.setTimeout(() => removeSpawn(id), duration + 180);
    spawnTimersRef.current.set(id, timer);
    return id;
  }, [removeSpawn]);

  const handPoint = useCallback((release = false) => {
    const node = stageRef.current;
    if (!node) {
      return { x: currentXRef.current + 72, y: currentYRef.current + 68 };
    }
    const bounds = node.getBoundingClientRect();
    const facing = facingRef.current;
    // Match the articulated wrist rather than the old one-piece arm endpoint.
    const localX = release ? (facing > 0 ? 0.74 : 0.26) : (facing > 0 ? 0.71 : 0.29);
    return {
      x: bounds.left + bounds.width * localX,
      y: bounds.top + bounds.height * (release ? 0.49 : 0.52),
    };
  }, []);



  const startThemeCurtainAction = useCallback((targetTheme) => {
    if (reducedMotion) return;

    // Curtain mode explicitly returns the resident to the ordinary state.
    // This prevents a power aura from leaking across randomly selected theme effects.
    setPoweredState(false);
    unlockCompanionAudio();
    clearActionTimers();
    cancelActionMotion();
    if (motionRafRef.current) {
      window.cancelAnimationFrame(motionRafRef.current);
      motionRafRef.current = 0;
    }
    velocityXRef.current = 0;
    hideSpeedReadout();
    clearIdleTimers();
    const wasMeditating = meditatingRef.current || actionRef.current === "standing-up";
    meditatingRef.current = false;
    setMeditating(false);
    setResting(false);
    setMovementState("idle");
    resetGaitPose();
    relaxLook();

    const closing = targetTheme === "dark";
    const metrics = viewportMetrics();
    const topY = 4;
    const bottomY = Math.max(0, metrics.height - metrics.stageHeight - 4);
    const prepTargetY = closing ? topY : bottomY;
    const standDuration = wasMeditating ? 280 : 0;
    const travelDuration = Math.max(320, THEME_CURTAIN_PREP_MS - standDuration);

    const beginReach = () => {
      stageRef.current?.style.setProperty("--companion-leap-duration", `${travelDuration}ms`);
      setActionState(closing ? "leap-up" : "drop-bottom");
      animateStageTo({
        x: currentXRef.current,
        y: prepTargetY,
        duration: travelDuration,
        easing: closing ? easeOutCubic : easeInOutCubic,
        arcX: closing ? facingRef.current * 7 : facingRef.current * 3,
        arcY: closing ? 12 : 4,
      });
    };

    if (wasMeditating) {
      setActionState("theme-stand");
      const standTimer = window.setTimeout(beginReach, standDuration);
      actionTimersRef.current.push(standTimer);
    } else {
      beginReach();
    }

    const pullTimer = window.setTimeout(() => {
      const liveMetrics = viewportMetrics();
      const liveTopY = 4;
      const liveBottomY = Math.max(0, liveMetrics.height - liveMetrics.stageHeight - 4);
      playCurtainSwish(closing ? "closing" : "opening");
      setActionState(closing ? "curtain-down" : "curtain-up");
      animateStageTo({
        x: currentXRef.current,
        y: closing ? liveBottomY : liveTopY,
        duration: THEME_CURTAIN_DURATION_MS,
        easing: easeInOutCubic,
      });
    }, THEME_CURTAIN_PREP_MS);
    actionTimersRef.current.push(pullTimer);

    const edgeTimer = window.setTimeout(() => {
      playSoftLanding();
      setActionState(closing ? "edge-bottom" : "edge-top");
    }, THEME_CURTAIN_PREP_MS + THEME_CURTAIN_DURATION_MS);
    actionTimersRef.current.push(edgeTimer);

    const rejoinTimer = window.setTimeout(() => {
      const trackY = targetYRef.current;
      setActionState(closing ? "rejoin-bottom" : "leap-down");
      animateStageTo({
        x: currentXRef.current,
        y: trackY,
        duration: closing ? Math.min(360, THEME_CURTAIN_RETURN_MS) : THEME_CURTAIN_RETURN_MS,
        easing: easeInOutCubic,
        arcX: closing ? 0 : facingRef.current * 8,
        arcY: closing ? 0 : 8,
        onComplete: () => {
          playSoftLanding();
          setActionState("idle");
          resetGaitPose();
          startMotionLoop();
          scheduleRest();
        },
      });
    }, THEME_CURTAIN_PREP_MS + THEME_CURTAIN_DURATION_MS + THEME_CURTAIN_EDGE_HOLD_MS);
    actionTimersRef.current.push(rejoinTimer);
  }, [
    animateStageTo,
    cancelActionMotion,
    clearActionTimers,
    clearIdleTimers,
    hideSpeedReadout,
    reducedMotion,
    relaxLook,
    resetGaitPose,
    scheduleRest,
    setActionState,
    setMovementState,
    setPoweredState,
    startMotionLoop,
  ]);

  const startThemePowerAction = useCallback((targetTheme) => {
    if (reducedMotion) return;

    unlockCompanionAudio();
    clearActionTimers();
    cancelActionMotion();
    if (motionRafRef.current) {
      window.cancelAnimationFrame(motionRafRef.current);
      motionRafRef.current = 0;
    }
    velocityXRef.current = 0;
    hideSpeedReadout();
    clearIdleTimers();

    // Power is asymmetric by design. Dark -> light creates the powered state.
    // Light -> dark is only allowed to use this path when that powered state
    // already exists, so keep the aura alive through the contraction and clear
    // it only at recovery. Curtain-created light never reaches this branch.
    const activatingPower = targetTheme === "light";
    if (activatingPower) setPoweredState(false);

    const wasMeditating = meditatingRef.current || actionRef.current === "standing-up";
    meditatingRef.current = false;
    setMeditating(false);
    setResting(false);
    setMovementState("idle");
    resetGaitPose();
    relaxLook();

    const standDuration = wasMeditating ? 280 : 0;
    const powerStartDelay = standDuration;
    const burstDelay = Math.max(THEME_POWER_PREP_MS, powerStartDelay + 260);
    const recoverDelay = burstDelay + THEME_POWER_DURATION_MS;
    const finishDelay = recoverDelay + THEME_POWER_RECOVERY_MS;

    if (wasMeditating) setActionState("theme-stand");
    else setActionState("power-up");

    if (powerStartDelay) {
      const powerTimer = window.setTimeout(() => setActionState("power-up"), powerStartDelay);
      actionTimersRef.current.push(powerTimer);
    }

    const burstTimer = window.setTimeout(() => {
      setActionState("power-burst");
      stageRef.current?.style.setProperty(
        "--companion-power-direction",
        targetTheme === "light" ? "1" : "-1",
      );
    }, burstDelay);
    actionTimersRef.current.push(burstTimer);

    const recoverTimer = window.setTimeout(() => {
      setPoweredState(activatingPower);
      setActionState("power-recover");
    }, recoverDelay);
    actionTimersRef.current.push(recoverTimer);

    const finishTimer = window.setTimeout(() => {
      setActionState("idle");
      resetGaitPose();
      startMotionLoop();
      if (!poweredRef.current) scheduleRest();
    }, finishDelay);
    actionTimersRef.current.push(finishTimer);
  }, [
    cancelActionMotion,
    clearActionTimers,
    clearIdleTimers,
    hideSpeedReadout,
    reducedMotion,
    relaxLook,
    resetGaitPose,
    scheduleRest,
    setActionState,
    setMovementState,
    setPoweredState,
    startMotionLoop,
  ]);

  const startPortalNavigation = useCallback((detail) => {
    const commit = detail?.commit;
    if (reducedMotion || typeof commit !== "function") return false;
    if (isThemeChoreography(actionRef.current) || isPortalChoreography(actionRef.current)) return false;

    clearActionTimers();
    cancelActionMotion();
    if (motionRafRef.current) {
      window.cancelAnimationFrame(motionRafRef.current);
      motionRafRef.current = 0;
    }
    velocityXRef.current = 0;
    hideSpeedReadout();
    clearIdleTimers();
    const wasMeditating = meditatingRef.current || actionRef.current === "standing-up";
    meditatingRef.current = false;
    setMeditating(false);
    setResting(false);
    setMovementState("idle");
    resetGaitPose();
    relaxLook();

    const metrics = viewportMetrics();
    const requestedFacing = facingRef.current;
    const portalWidth = (metrics.compact ? 114 : 156) * PORTAL_SCALE;
    const portalHeight = (metrics.compact ? 150 : 213) * PORTAL_SCALE;
    const stageCenterX = currentXRef.current + metrics.stageWidth * 0.5;
    const minPortalX = portalWidth * 0.55 + 4;
    const maxPortalX = metrics.width - portalWidth * 0.55 - 4;

    // First place the door in front of the current facing direction. Near a
    // viewport edge that requested side can become physically impossible once
    // the portal is clamped. In that case the resident turns toward the actual
    // visible door instead of walking away from it. This removes the notorious
    // far-left/far-right non-entry bug without changing the portal art.
    const desiredPortalX = stageCenterX + requestedFacing * metrics.stageWidth * 0.78;
    const portalX = clamp(desiredPortalX, minPortalX, maxPortalX);
    const portalDelta = portalX - stageCenterX;
    const entryDirection = Math.abs(portalDelta) > metrics.stageWidth * 0.16
      ? (portalDelta < 0 ? -1 : 1)
      : requestedFacing;
    setFacing(entryDirection);

    const companionFootOffsetY = metrics.stageHeight * (130 / 154);
    const sharedFloorY = currentYRef.current + companionFootOffsetY;
    const portalY = sharedFloorY - portalHeight * 0.5;
    const portalStageY = sharedFloorY - companionFootOffsetY;
    const portalCenterStageX = portalX - metrics.stageWidth * 0.5;

    // The final stage center must cross the portal center, not merely approach
    // it. This target is derived from the *actual clamped portal position* and
    // actual entry direction, so it remains correct at the viewport edges.
    const entryDepth = clamp(portalWidth * 0.28, metrics.stageWidth * 0.48, metrics.stageWidth * 0.68);
    const insideX = portalCenterStageX + entryDirection * entryDepth;
    const exitX = clamp(
      portalCenterStageX + entryDirection * (portalWidth * 0.72 + metrics.stageWidth * 0.18),
      -metrics.stageWidth * 0.5 + metrics.trackLeft,
      metrics.width - metrics.stageWidth * 0.5 - (metrics.width - metrics.trackRight),
    );

    const id = ++portalIdRef.current;
    setPortal({ id, x: portalX, y: portalY, facing: entryDirection, phase: "opening" });

    const prepDelay = wasMeditating ? 340 : 220;
    if (wasMeditating) setActionState("portal-stand");
    else setActionState("portal-open");

    const enterTimer = window.setTimeout(() => {
      setActionState("portal-enter");
      setPortal((current) => current?.id === id ? { ...current, phase: "open" } : current);
      animateStageTo({
        x: insideX,
        y: portalStageY,
        duration: 500,
        easing: easeInOutCubic,
        arcY: 2,
        onComplete: () => {
          // Commit only after the body has actually crossed the doorway. Timer-
          // based commits raced the final X frame and caused intermittent visual
          // misses, especially when the portal had been clamped near an edge.
          setStagePosition(insideX, portalStageY);
          setPortal((current) => current?.id === id ? { ...current, phase: "traversed" } : current);
          commit();

          const handoffTimer = window.setTimeout(() => {
            setActionState("portal-exit");
            animateStageTo({
              x: exitX,
              y: portalStageY,
              duration: 430,
              easing: easeOutCubic,
              onComplete: () => {
                setPortal((current) => current?.id === id ? { ...current, phase: "closing" } : current);
                const closeTimer = window.setTimeout(() => {
                  setPortal((current) => current?.id === id ? null : current);
                  setActionState("idle");
                  updateTrackTarget(false);
                  startMotionLoop();
                  scheduleRest();
                }, 220);
                actionTimersRef.current.push(closeTimer);
              },
            });
          }, 86);
          actionTimersRef.current.push(handoffTimer);
        },
      });
    }, prepDelay);
    actionTimersRef.current.push(enterTimer);
    return true;
  }, [
    animateStageTo,
    cancelActionMotion,
    clearActionTimers,
    clearIdleTimers,
    hideSpeedReadout,
    reducedMotion,
    relaxLook,
    resetGaitPose,
    scheduleRest,
    setActionState,
    setFacing,
    setMovementState,
    setStagePosition,
    startMotionLoop,
    updateTrackTarget,
  ]);

  const summonNext = useCallback(() => {
    if (reducedMotion) return;
    const item = SPAWN_DECK[spawnIndexRef.current % SPAWN_DECK.length];
    const offset = LOCAL_OFFSETS[spawnIndexRef.current % LOCAL_OFFSETS.length];
    spawnIndexRef.current += 1;
    setFacing(offset.x < 0 ? -1 : 1);
    const wakeDelay = setTemporaryAction("summoning", 760);
    const spawnNow = () => {
      const from = handPoint();
      addSpawn({
        item,
        fromX: from.x,
        fromY: from.y,
        toX: from.x + offset.x,
        toY: from.y + offset.y,
        rotate: offset.rotate,
        spin: offset.rotate * 1.8,
        duration: 980,
      });
    };
    if (wakeDelay) {
      const timer = window.setTimeout(spawnNow, wakeDelay + 70);
      actionTimersRef.current.push(timer);
    } else {
      spawnNow();
    }
  }, [addSpawn, handPoint, reducedMotion, setFacing, setTemporaryAction]);

  const projectileTo = useCallback((target, item, actionName = "pointing", options = {}) => {
    if (reducedMotion || !target) return;

    const {
      releaseDelay = 90,
      duration = 480,
      actionDuration = Math.max(720, releaseDelay + duration + 180),
      spin = null,
      arcHeight,
    } = options;

    const initialRect = target.getBoundingClientRect();
    const initialX = initialRect.left + initialRect.width / 2;
    const initialY = initialRect.top + initialRect.height / 2;
    faceToward(initialX);
    lookAt(initialX, initialY, 1);
    const wakeDelay = setTemporaryAction(actionName, actionDuration);

    const releaseTimer = window.setTimeout(() => {
      if (!target.isConnected) return;
      const rect = target.getBoundingClientRect();
      const destination = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      const from = handPoint(true);
      const direction = destination.x < from.x ? -1 : 1;
      const resolvedSpin = spin ?? direction * (480 + Math.floor(Math.random() * 220));

      addSpawn({
        item,
        fromX: from.x,
        fromY: from.y,
        toX: destination.x,
        toY: destination.y,
        rotate: direction * 12,
        spin: resolvedSpin,
        duration,
        projectile: true,
        arcHeight,
      });
    }, wakeDelay + releaseDelay);
    actionTimersRef.current.push(releaseTimer);

    const impactTimer = window.setTimeout(() => {
      if (!target.isConnected) return;
      target.classList.remove("math-companion-ui-hit");
      // Force a fresh pulse even when the same control is hit twice in quick succession.
      void target.offsetWidth;
      target.classList.add("math-companion-ui-hit");
      window.setTimeout(() => target.classList.remove("math-companion-ui-hit"), 430);
    }, wakeDelay + releaseDelay + duration - 20);
    actionTimersRef.current.push(impactTimer);
  }, [addSpawn, faceToward, handPoint, lookAt, reducedMotion, setTemporaryAction]);

  const beginDrag = useCallback((event) => {
    const drag = dragRef.current;
    if (drag.active) return;

    drag.active = true;
    clearActionTimers();
    cancelActionMotion();
    if (motionRafRef.current) {
      window.cancelAnimationFrame(motionRafRef.current);
      motionRafRef.current = 0;
    }
    velocityXRef.current = 0;
    hideSpeedReadout();
    clearIdleTimers();
    meditatingRef.current = false;
    setMeditating(false);
    setResting(false);
    setMovementState("idle");
    resetGaitPose();
    relaxLook();
    setActionState("dragging");
    suppressClickRef.current = true;
    if (event.clientX !== drag.lastX) setFacing(event.clientX < drag.lastX ? -1 : 1);
  }, [
    cancelActionMotion,
    clearActionTimers,
    clearIdleTimers,
    hideSpeedReadout,
    relaxLook,
    resetGaitPose,
    setActionState,
    setFacing,
    setMovementState,
  ]);

  const handleCompanionPointerDown = useCallback((event) => {
    event.stopPropagation();
    if (reducedMotion || actionRef.current !== "idle" || isThemeChoreography(actionRef.current) || isPortalChoreography(actionRef.current)) return;

    const drag = dragRef.current;
    drag.pointerId = event.pointerId;
    drag.candidate = true;
    drag.active = false;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    drag.offsetX = event.clientX - currentXRef.current;
    drag.offsetY = event.clientY - currentYRef.current;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastAt = performance.now();
    drag.velocityX = 0;
    drag.velocityY = 0;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }, [reducedMotion]);

  const handleCompanionPointerMove = useCallback((event) => {
    const drag = dragRef.current;
    if (!drag.candidate || drag.pointerId !== event.pointerId) return;

    const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
    if (!drag.active && distance < DRAG_THRESHOLD_PX) return;
    if (!drag.active) beginDrag(event);

    if (event.cancelable) event.preventDefault();
    const now = performance.now();
    const dt = Math.max(8, now - drag.lastAt) / 1000;
    drag.velocityX = clamp((event.clientX - drag.lastX) / dt, -900, 900);
    drag.velocityY = clamp((event.clientY - drag.lastY) / dt, -900, 900);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastAt = now;

    setStagePosition(event.clientX - drag.offsetX, event.clientY - drag.offsetY);
    if (Math.abs(drag.velocityX) > 14) setFacing(drag.velocityX < 0 ? -1 : 1);

    const node = stageRef.current;
    if (node) {
      node.style.setProperty("--companion-drag-tilt", `${clamp(drag.velocityX / 90, -8, 8).toFixed(2)}deg`);
      node.style.setProperty("--companion-drag-lag", `${clamp(drag.velocityY / 170, -4, 4).toFixed(2)}px`);
      node.style.setProperty("--companion-drag-sway", `${clamp(-drag.velocityX / 55, -15, 15).toFixed(2)}deg`);
    }
  }, [beginDrag, setFacing, setStagePosition]);

  const finishDrag = useCallback((event) => {
    const drag = dragRef.current;
    if (!drag.candidate || drag.pointerId !== event.pointerId) return;

    drag.candidate = false;
    try { event.currentTarget.releasePointerCapture?.(event.pointerId); } catch { /* pointer capture may already be gone */ }

    if (!drag.active) {
      drag.pointerId = null;
      return;
    }

    drag.active = false;
    drag.pointerId = null;
    const node = stageRef.current;
    setActionState("drag-release");

    const inertiaX = currentXRef.current + clamp(drag.velocityX * 0.045, -32, 32);
    const inertiaY = currentYRef.current + clamp(drag.velocityY * 0.025, -18, 18);

    animateStageTo({
      x: inertiaX,
      y: inertiaY,
      duration: 180,
      easing: easeOutCubic,
      arcY: drag.velocityY < -120 ? 4 : 0,
      onComplete: () => {
        const floorY = targetYRef.current;
        const settleDistance = Math.abs(floorY - currentYRef.current);
        animateStageTo({
          x: currentXRef.current,
          y: floorY,
          duration: clamp(240 + settleDistance * 1.7, 260, 620),
          easing: easeInOutCubic,
          arcY: settleDistance < 18 ? 1.5 : 0,
          onComplete: () => {
            node?.style.setProperty("--companion-drag-tilt", "0deg");
            node?.style.setProperty("--companion-drag-lag", "0px");
            node?.style.setProperty("--companion-drag-sway", "0deg");
            setActionState("idle");
            updateTrackTarget(false);
            startMotionLoop();
            scheduleRest();
          },
        });
      },
    });

    window.setTimeout(() => { suppressClickRef.current = false; }, 0);
  }, [animateStageTo, scheduleRest, setActionState, startMotionLoop, updateTrackTarget]);

  const handleCompanionClick = useCallback(() => {
    if (suppressClickRef.current) return;
    summonNext();
  }, [summonNext]);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(Boolean(media?.matches));
    sync();
    media?.addEventListener?.("change", sync);
    return () => media?.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    updateTrackTarget(true);
    const entranceTimer = window.setTimeout(() => setReady(true), 120);
    scheduleRest();

    const onResize = () => {
      updateTrackTarget(reducedMotion);
      if (!reducedMotion) startMotionLoop();
    };

    const observer = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
        updateTrackTarget(reducedMotion);
        if (!reducedMotion) startMotionLoop();
      })
      : null;
    observer?.observe(document.documentElement);

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.clearTimeout(entranceTimer);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [reducedMotion, scheduleRest, startMotionLoop, updateTrackTarget]);

  useEffect(() => {
    const onScroll = () => {
      setResting(false);
      clearIdleTimers();
      updateTrackTarget(reducedMotion);
      if (!reducedMotion) startMotionLoop();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [clearIdleTimers, reducedMotion, startMotionLoop, updateTrackTarget]);

  useEffect(() => {
    const timers = [0, 90, 280].map((delay) => window.setTimeout(() => {
      updateTrackTarget(reducedMotion && delay === 0);
      if (!reducedMotion) startMotionLoop();
    }, delay));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [path, reducedMotion, startMotionLoop, updateTrackTarget]);

  useEffect(() => {
    if (!reducedMotion) return;
    clearActionTimers();
    cancelActionMotion();
    hideSpeedReadout();
    setTrails([]);
    if (motionRafRef.current) {
      window.cancelAnimationFrame(motionRafRef.current);
      motionRafRef.current = 0;
    }
    setActionState("idle");
    setMovementState("idle");
    meditatingRef.current = false;
    setMeditating(false);
    setResting(false);
    setPortal(null);
    setPoweredState(false);
    resetGaitPose();
    updateTrackTarget(true);
  }, [
    cancelActionMotion,
    clearActionTimers,
    hideSpeedReadout,
    reducedMotion,
    resetGaitPose,
    setActionState,
    setMovementState,
    setPoweredState,
    updateTrackTarget,
  ]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let pointerRaf = 0;

    const onPointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (pointerRaf) return;
      pointerRaf = window.requestAnimationFrame(() => {
        pointerRaf = 0;
        if (actionRef.current !== "idle" || movementModeRef.current !== "idle") return;
        lookAt(pointerRef.current.x, pointerRef.current.y, 0.78);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (pointerRaf) window.cancelAnimationFrame(pointerRaf);
    };
  }, [lookAt, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const onPress = (event) => {
      const target = event.target instanceof Element
        ? event.target.closest("button, a, [role='button']")
        : null;
      if (!target || target.closest("[data-math-companion-self]")) return;

      const actionType = target.getAttribute("data-math-action") || "generic";
      const isInternalAnchor = target.matches("a[href^='/']:not([href^='//'])");
      const isRouteControl = actionType === "nav" || isInternalAnchor || target.classList.contains("back-link");

      // Navigation deliberately preserves the figure's pre-click facing. The π door
      // must spawn in front of wherever the companion was already looking, not turn
      // toward the clicked link/button first.
      if (isRouteControl) return;

      // The viewer never waits for the companion. While a choreography is running,
      // later clicks continue normally but do not cancel the current animation.
      // Theme is the one high-priority action allowed to pre-empt a smaller reaction.
      if (actionRef.current !== "idle" && actionType !== "theme") return;

      if (actionType === "theme") {
        // useTheme chooses the transition mode and signals the companion with
        // the exact same choice. Do not start a second choreography here.
        return;
      }

      const rect = target.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      faceToward(targetX);
      lookAt(targetX, rect.top + rect.height / 2, 1);
      if (actionType === "mental-start") {
        projectileTo(target, { kind: "text", value: "√" }, "pointing", { releaseDelay: 90, duration: 460 });
        return;
      }
      if (actionType === "mental-check") {
        projectileTo(target, { kind: "text", value: "=" }, "pointing", { releaseDelay: 80, duration: 440 });
        return;
      }
      if (actionType === "mental-next") {
        setTemporaryAction("pointing", 560);
        return;
      }
      if (target.matches("button")) setTemporaryAction("pointing", 520);
    };

    document.addEventListener("click", onPress, true);
    return () => document.removeEventListener("click", onPress, true);
  }, [faceToward, lookAt, projectileTo, reducedMotion, setTemporaryAction]);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const onRouteIntent = (event) => {
      if (typeof event.detail?.commit !== "function") return;
      if (isThemeChoreography(actionRef.current) || isPortalChoreography(actionRef.current)) return;
      const claimed = startPortalNavigation(event.detail);
      if (claimed) event.preventDefault();
    };

    window.addEventListener(ROUTE_INTENT_EVENT, onRouteIntent);
    return () => window.removeEventListener(ROUTE_INTENT_EVENT, onRouteIntent);
  }, [reducedMotion, startPortalNavigation]);

  useEffect(() => {
    const onCompanionSignal = (event) => {
      if (reducedMotion) return;
      const type = event.detail?.type;
      if (type === "theme-transition") {
        const targetTheme = event.detail?.targetTheme;
        const effect = event.detail?.effect;
        if (targetTheme !== "light" && targetTheme !== "dark") return;
        if (effect === "power") startThemePowerAction(targetTheme);
        else startThemeCurtainAction(targetTheme);
        return;
      }
      if (isThemeChoreography(actionRef.current)) return;
      if (type === "mental-result") {
        const correct = Boolean(event.detail?.correct);
        const wakeDelay = setTemporaryAction(correct ? "correct" : "wrong", correct ? 980 : 760);
        const spawnResult = () => {
          const from = handPoint();
          addSpawn({
            item: { kind: "text", value: correct ? "=" : "≠" },
            fromX: from.x,
            fromY: from.y,
            toX: from.x + (correct ? -34 : 38),
            toY: from.y - 66,
            rotate: correct ? -8 : 14,
            spin: correct ? -70 : 90,
            duration: 920,
          });
        };
        if (wakeDelay) {
          const timer = window.setTimeout(spawnResult, wakeDelay + 90);
          actionTimersRef.current.push(timer);
        } else {
          spawnResult();
        }
      } else if (type === "mental-start") {
        setTemporaryAction("thinking", 820);
      } else if (type === "mental-next") {
        setTemporaryAction("thinking", 620);
      }
    };

    window.addEventListener(MATH_COMPANION_EVENT, onCompanionSignal);
    return () => window.removeEventListener(MATH_COMPANION_EVENT, onCompanionSignal);
  }, [addSpawn, handPoint, reducedMotion, setTemporaryAction, startThemeCurtainAction, startThemePowerAction]);

  useEffect(() => () => {
    clearActionTimers();
    cancelActionMotion();
    window.clearTimeout(restTimerRef.current);
    window.clearTimeout(meditateTimerRef.current);
    if (motionRafRef.current) window.cancelAnimationFrame(motionRafRef.current);
    motionRafRef.current = 0;
    spawnTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    spawnTimersRef.current.clear();
    trailTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    trailTimersRef.current.clear();
    dragRef.current.candidate = false;
    dragRef.current.active = false;
    idleScheduledRef.current = false;
  }, [cancelActionMotion, clearActionTimers]);

  const modeClass = useMemo(() => {
    if (action !== "idle") return `is-${action}`;
    if (movementMode === "sprint") return "is-sprinting";
    if (movementMode === "run") return "is-running";
    if (movementMode === "brisk") return "is-brisk-walking";
    if (movementMode === "walk") return "is-walking";
    if (powered) return "is-powered-idle";
    if (meditating) return "is-meditating";
    if (resting) return "is-resting";
    return "is-idle";
  }, [action, meditating, movementMode, powered, resting]);

  return (
    <div
      ref={layerRef}
      className={`math-companion-layer ${ready ? "is-ready" : ""} ${reducedMotion ? "is-reduced" : ""}`}
    >
      {portal && (
        <div
          className={`math-companion-portal is-${portal.phase}`}
          style={{
            "--portal-x": `${portal.x}px`,
            "--portal-y": `${portal.y}px`,
            "--portal-facing": portal.facing,
          }}
          aria-hidden="true"
        >
          <span className="math-companion-portal-symbol">π</span>
          <span className="math-companion-portal-slit" />
        </div>
      )}
      <div
        ref={stageRef}
        className={`math-companion-stage ${modeClass} ${powered ? "is-powered" : ""}`}
        style={{
          "--companion-prep-duration": `${THEME_CURTAIN_PREP_MS}ms`,
          "--companion-curtain-duration": `${THEME_CURTAIN_DURATION_MS}ms`,
          "--companion-return-duration": `${THEME_CURTAIN_RETURN_MS}ms`,
          "--companion-power-prep-duration": `${THEME_POWER_PREP_MS}ms`,
          "--companion-power-duration": `${THEME_POWER_DURATION_MS}ms`,
          "--companion-power-recovery-duration": `${THEME_POWER_RECOVERY_MS}ms`,
        }}
      >
        <button
          type="button"
          className="math-companion-hitbox"
          data-math-companion-self
          onPointerDown={handleCompanionPointerDown}
          onPointerMove={handleCompanionPointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onClick={handleCompanionClick}
          aria-label="Make the math figure create a symbol"
          title={reducedMotion ? undefined : "Try me"}
          disabled={reducedMotion}
        >
          <svg className="math-companion-svg" viewBox="0 0 120 154" focusable="false" aria-hidden="true">
            <g className="math-companion-aura" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path className="math-companion-aura-contour math-companion-aura-contour--outer" d="M60 143C45 143 32 137 26 126C18 112 22 98 30 84C26 74 31 64 40 54C42 43 49 31 55 18C58 29 60 35 61 42C66 31 70 20 72 10C77 30 88 41 84 57C94 69 100 84 96 99C103 114 95 132 80 139C73 142 67 143 60 143Z" />
              <path className="math-companion-aura-contour math-companion-aura-contour--mid" d="M60 137C47 137 37 131 33 122C27 109 33 98 39 88C36 79 41 70 48 62C49 53 55 44 59 34C62 44 63 50 63 56C68 48 72 40 74 31C78 47 85 58 82 69C89 79 92 91 88 102C92 114 84 129 72 134C68 136 64 137 60 137Z" />
              <path className="math-companion-aura-contour math-companion-aura-contour--inner" d="M60 131C50 131 43 126 41 118C38 107 44 99 49 91C47 84 51 77 56 71C57 64 60 57 62 50C65 60 65 66 64 71C69 66 72 60 74 54C76 66 81 75 78 84C83 92 84 101 81 109C83 119 75 129 66 130C64 131 62 131 60 131Z" />
              <g className="math-companion-aura-flares">
                <path className="math-companion-aura-flare math-companion-aura-flare--left" d="M34 126C28 113 34 102 39 93C44 84 41 75 46 65" />
                <path className="math-companion-aura-flare math-companion-aura-flare--center" d="M51 133C47 120 52 111 56 102C60 92 57 81 61 69" />
                <path className="math-companion-aura-flare math-companion-aura-flare--right" d="M76 129C84 117 80 106 77 97C73 88 78 77 81 67" />
                <path className="math-companion-aura-flare math-companion-aura-flare--crown" d="M60 80C55 68 61 58 65 48C68 39 68 29 71 19" />
              </g>
              <circle className="math-companion-aura-core" cx="60" cy="77" r="7.5" />
            </g>
            <g className="math-companion-figure" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round">
              <g className="math-companion-body">
                <g className="math-companion-upper-body">
                  <g className="math-companion-head-wrap">
                    <circle className="math-companion-head" cx="60" cy="36" r="10.5" />
                  </g>
                  <path className="math-companion-neck" d="M60 46.5Q60.2 49.2 60 52" />
                  <path className="math-companion-shoulders" d="M52.5 59Q60 56.2 67.5 59" />
                  <path className="math-companion-torso" d="M60 51C59.1 62.5 60.9 75.5 60 88" />
                  <g className="math-companion-arm math-companion-arm-left">
                    <path className="math-companion-upper-arm" d="M52.5 59Q48.6 65.2 45 72" />
                    <g className="math-companion-forearm math-companion-forearm-left">
                      <path d="M45 72Q41.2 78.4 38 84" />
                      <g className="math-companion-hand math-companion-hand-left">
                        <path d="M38 84Q36.6 86 35 87.5" />
                      </g>
                    </g>
                  </g>
                  <g className="math-companion-arm math-companion-arm-right">
                    <path className="math-companion-upper-arm" d="M67.5 59Q72.2 64.8 75 70.5" />
                    <g className="math-companion-forearm math-companion-forearm-right">
                      <path d="M75 70.5Q79.3 75 83 79" />
                      <g className="math-companion-hand math-companion-hand-right">
                        <path d="M83 79Q84.8 80.4 86.2 82" />
                      </g>
                    </g>
                  </g>
                  <line className="math-companion-curtain-handle" x1="47" y1="47" x2="73" y2="47" />
                </g>
                <path className="math-companion-pelvis" d="M55 88Q60 90.2 65 88" />
                <g className="math-companion-leg math-companion-leg-left">
                  <path className="math-companion-thigh" d="M56 88Q55.2 98 55 109" />
                  <g className="math-companion-shin math-companion-shin-left">
                    <path d="M55 109Q55 120 56 130" />
                    <g className="math-companion-foot math-companion-foot-left">
                      <path d="M56 130Q61.4 130.2 67 130" />
                    </g>
                  </g>
                </g>
                <g className="math-companion-leg math-companion-leg-right">
                  <path className="math-companion-thigh" d="M64 88Q64.8 98 65 109" />
                  <g className="math-companion-shin math-companion-shin-right">
                    <path d="M65 109Q65 120 64 130" />
                    <g className="math-companion-foot math-companion-foot-right">
                      <path d="M64 130Q69.5 130.1 75 130" />
                    </g>
                  </g>
                </g>
              </g>
            </g>

            <g className="math-companion-hand-cue" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
              <circle cx="88" cy="72" r="6" />
              <path d="M88 68v8M84 72h8" />
            </g>
          </svg>
        </button>
        <span ref={speedRef} className="math-companion-speed" aria-hidden="true" />
      </div>

      <div className="math-companion-trail-layer" aria-hidden="true">
        {trails.map((trail) => (
          <span
            key={trail.id}
            className={`math-companion-trail-mark is-${trail.gait}`}
            style={{
              "--trail-x": `${trail.x}px`,
              "--trail-y": `${trail.y}px`,
              "--trail-rotate": `${trail.rotate}deg`,
              "--trail-duration": `${trail.duration}ms`,
            }}
          >
            {trail.symbol}
          </span>
        ))}
      </div>

      <div className="math-companion-spawn-layer" aria-hidden="true">
        {spawns.map((spawn) => (
          <span
            key={spawn.id}
            className={`math-companion-spawn ${spawn.projectile ? "is-projectile" : "is-local"} math-companion-spawn--${spawn.item.kind}`}
            style={{
              "--spawn-from-x": `${spawn.fromX}px`,
              "--spawn-from-y": `${spawn.fromY}px`,
              "--spawn-q1-x": `${spawn.q1X}px`,
              "--spawn-q1-y": `${spawn.q1Y}px`,
              "--spawn-mid-x": `${spawn.midX}px`,
              "--spawn-mid-y": `${spawn.midY}px`,
              "--spawn-q3-x": `${spawn.q3X}px`,
              "--spawn-q3-y": `${spawn.q3Y}px`,
              "--spawn-to-x": `${spawn.toX}px`,
              "--spawn-to-y": `${spawn.toY}px`,
              "--spawn-quarter-rotate": `${spawn.spin * 0.25}deg`,
              "--spawn-mid-rotate": `${spawn.spin * 0.5}deg`,
              "--spawn-three-quarter-rotate": `${spawn.spin * 0.75}deg`,
              "--spawn-rotate": `${spawn.spin}deg`,
              "--spawn-duration": `${spawn.duration}ms`,
            }}
          >
            {spawn.item.kind === "text" ? spawn.item.value : figureNode(spawn.item.kind)}
          </span>
        ))}
      </div>
    </div>
  );
}
