import React, { useEffect, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function MathPresence({ phase = "idle", correct = null, questionId = "" }) {
  const sceneRef = useRef(null);
  const solveTimerRef = useRef(null);
  const [entered, setEntered] = useState(false);
  const [aware, setAware] = useState(false);
  const [solving, setSolving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(Boolean(media?.matches));
    sync();
    media?.addEventListener?.("change", sync);
    return () => media?.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return undefined;
    }

    const node = sceneRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setEntered(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => () => window.clearTimeout(solveTimerRef.current), []);

  // A new question is the character's cue to reset toward the problem instead of
  // carrying a click interaction into the timed attempt.
  useEffect(() => {
    setSolving(false);
  }, [questionId, phase]);

  const movePresence = (event) => {
    if (reducedMotion || !sceneRef.current) return;
    const bounds = sceneRef.current.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const normalizedX = clamp(((event.clientX - bounds.left) / bounds.width) * 2 - 1, -1, 1);
    const normalizedY = clamp(((event.clientY - bounds.top) / bounds.height) * 2 - 1, -1, 1);
    const node = sceneRef.current;

    node.style.setProperty("--presence-head-x", `${(normalizedX * 3.2).toFixed(2)}px`);
    node.style.setProperty("--presence-head-y", `${(normalizedY * 2.2).toFixed(2)}px`);
    node.style.setProperty("--presence-lean", `${(normalizedX * 2.4).toFixed(2)}deg`);
    node.style.setProperty("--presence-near-x", `${(normalizedX * 7).toFixed(2)}px`);
    node.style.setProperty("--presence-near-y", `${(normalizedY * 5).toFixed(2)}px`);
    node.style.setProperty("--presence-far-x", `${(normalizedX * -4).toFixed(2)}px`);
    node.style.setProperty("--presence-far-y", `${(normalizedY * -3).toFixed(2)}px`);
  };

  const resetPointer = () => {
    setAware(false);
    const node = sceneRef.current;
    if (!node) return;
    node.style.setProperty("--presence-head-x", "0px");
    node.style.setProperty("--presence-head-y", "0px");
    node.style.setProperty("--presence-lean", "0deg");
    node.style.setProperty("--presence-near-x", "0px");
    node.style.setProperty("--presence-near-y", "0px");
    node.style.setProperty("--presence-far-x", "0px");
    node.style.setProperty("--presence-far-y", "0px");
  };

  const playSolve = () => {
    if (reducedMotion || solving) return;
    window.clearTimeout(solveTimerRef.current);
    setSolving(true);
    solveTimerRef.current = window.setTimeout(() => setSolving(false), 2250);
  };

  const phaseClass = phase === "result"
    ? correct ? "is-correct" : "is-wrong"
    : phase === "active" ? "is-thinking"
      : phase === "interrupted" ? "is-interrupted"
        : "is-idle";

  return (
    <div
      ref={sceneRef}
      className={`math-presence ${entered ? "is-entered" : ""} ${aware ? "is-aware" : ""} ${solving ? "is-solving" : ""} ${phaseClass}`}
      onPointerEnter={() => setAware(true)}
      onPointerMove={movePresence}
      onPointerLeave={resetPointer}
      onPointerDown={playSolve}
      aria-hidden="true"
    >
      <svg className="math-presence-svg" viewBox="0 0 280 220" aria-hidden="true" focusable="false">
        <g className="presence-scaffold" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path className="presence-ground presence-draw" pathLength="1" d="M18 184.5 H262" />
          <path className="presence-radical presence-draw" pathLength="1" d="M24 153 L34 164 L48 126 H88" />
          <path className="presence-angle presence-draw" pathLength="1" d="M208 145 L246 145 L246 107 Z" />
          <circle className="presence-orbit presence-draw" pathLength="1" cx="224" cy="58" r="27" />
        </g>

        <g className="presence-math presence-math--far" aria-hidden="true">
          <text className="presence-symbol presence-symbol--pi" x="216" y="66">π</text>
          <text className="presence-symbol presence-symbol--four" x="43" y="119">4</text>
          <text className="presence-symbol presence-symbol--seven" x="70" y="105">7</text>
          <text className="presence-symbol presence-symbol--times" x="177" y="116">×</text>
        </g>

        <g className="presence-figure" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <g className="presence-body">
            <circle className="presence-head" cx="132" cy="75" r="13" />
            <path className="presence-torso presence-draw" pathLength="1" d="M132 88 L132 132" />
            <path className="presence-arm presence-arm--left presence-draw" pathLength="1" d="M132 101 L108 117 L96 107" />
            <path className="presence-arm presence-arm--right presence-draw" pathLength="1" d="M132 101 L158 110 L173 99" />
            <path className="presence-leg presence-leg--left presence-draw" pathLength="1" d="M132 132 L111 158 L101 184" />
            <path className="presence-leg presence-leg--right presence-draw" pathLength="1" d="M132 132 L151 158 L165 184" />
          </g>
        </g>

        <g className="presence-math presence-math--near" aria-hidden="true">
          <circle className="presence-token-ring" cx="177" cy="99" r="10" fill="var(--paper)" stroke="currentColor" strokeWidth="1" />
          <text className="presence-token-plus" x="177" y="104">+</text>
        </g>

        <g className="presence-equation" aria-hidden="true">
          <text className="presence-equation-part presence-equation-part--a" x="68" y="44">3</text>
          <text className="presence-equation-part presence-equation-part--op" x="96" y="44">×</text>
          <text className="presence-equation-part presence-equation-part--b" x="124" y="44">4</text>
          <text className="presence-equation-part presence-equation-part--eq" x="154" y="44">=</text>
          <text className="presence-equation-part presence-equation-part--answer" x="182" y="44">12</text>
          <path className="presence-equation-underline" pathLength="1" d="M65 51 H213" fill="none" stroke="currentColor" strokeWidth="1" />
        </g>

        <g className="presence-result-mark" aria-hidden="true" fill="none" stroke="currentColor" strokeLinecap="round">
          <path className="presence-result-line" pathLength="1" d="M193 167 C210 153 228 153 246 167" />
          <circle className="presence-result-dot" cx="219" cy="155" r="3" fill="currentColor" stroke="none" />
        </g>
      </svg>
    </div>
  );
}
