import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionLabel from "../components/SectionLabel";
import { CalculatorIcon, RefreshIcon } from "../components/Icons";
import MathText from "../components/MathText";
import { getMentalMathAnswerLabel, getRandomMentalMathQuestion, mentalMathQuestions, parseMentalMathAnswer } from "../data/mentalMathQuestions";
import { usePageMeta } from "../lib/meta";

const formatSeconds = (milliseconds) => `${(milliseconds / 1000).toFixed(2)}s`;

async function jsonRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", Accept: "application/json", ...(options.headers || {}) },
    credentials: "same-origin",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "Request failed.");
  return payload;
}

export default function OwnerMathPage() {
  usePageMeta("Benchmark Lab", "Private mental-math benchmark mode.");
  const [authState, setAuthState] = useState("checking");
  const [login, setLogin] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [benchmarks, setBenchmarks] = useState({});
  const [question, setQuestion] = useState(() => getRandomMentalMathQuestion());
  const [phase, setPhase] = useState("idle");
  const [answer, setAnswer] = useState("");
  const [attempt, setAttempt] = useState(null);
  const [saving, setSaving] = useState(false);
  const startedAtRef = useRef(null);
  const inputRef = useRef(null);

  const refreshBenchmarks = async () => {
    const payload = await jsonRequest(`/api/math/benchmarks?owner=${Date.now()}`);
    setBenchmarks(payload.benchmarks || {});
    return payload.benchmarks || {};
  };

  useEffect(() => {
    let cancelled = false;
    jsonRequest("/api/math/owner/session")
      .then(async (payload) => {
        if (cancelled) return;
        if (!payload.authenticated) {
          setAuthState("signed-out");
          return;
        }
        setAuthState("signed-in");
        try { await refreshBenchmarks(); } catch { /* private UI remains usable */ }
      })
      .catch(() => { if (!cancelled) setAuthState("signed-out"); });
    return () => { cancelled = true; };
  }, []);

  const benchmarkCount = Object.keys(benchmarks).length;
  const existingBenchmark = useMemo(() => {
    const value = Number(benchmarks[question.id]);
    return Number.isFinite(value) && value > 0 ? value : null;
  }, [benchmarks, question.id]);

  const chooseNext = (currentBenchmarks = benchmarks) => {
    const unbenchmarked = mentalMathQuestions.filter((item) => !currentBenchmarks[item.id] && item.id !== question.id);
    const next = unbenchmarked.length
      ? unbenchmarked[Math.floor(Math.random() * unbenchmarked.length)]
      : getRandomMentalMathQuestion({ excludeId: question.id });
    setQuestion(next);
    setAnswer("");
    setAttempt(null);
    setPhase("idle");
    setMessage("");
    startedAtRef.current = null;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage("");
    try {
      await jsonRequest("/api/math/owner/login", { method: "POST", body: JSON.stringify(login) });
      setLogin({ username: "", password: "" });
      setAuthState("signed-in");
      await refreshBenchmarks();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const logout = async () => {
    try { await jsonRequest("/api/math/owner/logout", { method: "POST", body: "{}" }); } catch { /* local state still clears */ }
    setAuthState("signed-out");
    setBenchmarks({});
    setPhase("idle");
  };

  const begin = () => {
    setAnswer("");
    setAttempt(null);
    setMessage("");
    setPhase("active");
    startedAtRef.current = performance.now();
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const submit = (event) => {
    event.preventDefault();
    const numeric = parseMentalMathAnswer(answer);
    if (numeric === null) return inputRef.current?.focus();
    const elapsedMs = Math.max(1, Math.round(performance.now() - startedAtRef.current));
    const correct = Math.abs(numeric - question.answer) < 1e-9;
    setAttempt({ elapsedMs, correct });
    setPhase("result");
  };

  const retrySame = () => begin();

  const saveBenchmark = async () => {
    if (!attempt?.correct || saving) return;
    setSaving(true);
    setMessage("");
    try {
      await jsonRequest("/api/math/owner/benchmark", {
        method: "POST",
        body: JSON.stringify({ questionId: question.id, benchmarkMs: attempt.elapsedMs }),
      });
      const nextBenchmarks = await refreshBenchmarks();
      setMessage(`Saved ${formatSeconds(attempt.elapsedMs)}.`);
      window.setTimeout(() => chooseNext(nextBenchmarks), 450);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (authState === "checking") {
    return <main className="page-main site-shell owner-math-page"><SectionLabel>Benchmark lab</SectionLabel><p className="owner-math-muted">Checking session…</p></main>;
  }

  if (authState === "signed-out") {
    return (
      <main className="page-main site-shell owner-math-page">
        <div className="icon-label"><CalculatorIcon size={14} /><SectionLabel>Benchmark lab</SectionLabel></div>
        <h1 className="owner-math-title">Owner access.</h1>
        <form className="owner-login-form" onSubmit={handleLogin}>
          <label>Username<input value={login.username} onChange={(event) => setLogin((value) => ({ ...value, username: event.target.value }))} autoComplete="username" /></label>
          <label>Password<input type="password" value={login.password} onChange={(event) => setLogin((value) => ({ ...value, password: event.target.value }))} autoComplete="current-password" /></label>
          <button type="submit">Sign in</button>
        </form>
        {message && <p className="owner-math-message" role="status">{message}</p>}
      </main>
    );
  }

  return (
    <main className="page-main site-shell owner-math-page">
      <div className="owner-math-topline">
        <div className="icon-label"><CalculatorIcon size={14} /><SectionLabel>Benchmark lab</SectionLabel></div>
        <button type="button" className="owner-text-button" onClick={logout}>Sign out</button>
      </div>

      <div className="owner-math-progress">
        <span>{benchmarkCount} / {mentalMathQuestions.length} benchmarked</span>
        {existingBenchmark && <span>Current · {formatSeconds(existingBenchmark)}</span>}
      </div>

      <section className="owner-benchmark-stage">
        {phase === "idle" && (
          <div>
            <span className="mental-math-category">{question.category}</span>
            <p className="owner-question-hidden">Question is hidden until the timer starts.</p>
            <button type="button" className="mental-math-start" onClick={begin}>Start benchmark</button>
          </div>
        )}

        {phase !== "idle" && (
          <>
            <span className="mental-math-category">{question.category}</span>
            <p className="mental-math-question owner-math-question"><MathText text={question.prompt} /></p>
          </>
        )}

        {phase === "active" && (
          <form className="mental-math-form" onSubmit={submit}>
            <label htmlFor="owner-math-answer" className="sr-only">Answer</label>
            <input ref={inputRef} id="owner-math-answer" className="mental-math-input" inputMode="decimal" autoComplete="off" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Answer" />
            <button type="submit" className="mental-math-check">Check</button>
          </form>
        )}

        {phase === "result" && attempt && (
          <div className="owner-result-actions">
            <p><strong>{attempt.correct ? "Correct" : "Not quite"} · {formatSeconds(attempt.elapsedMs)}</strong></p>
            <div className="owner-math-solution">
              <span>Answer · {getMentalMathAnswerLabel(question)}</span>
              <p><MathText text={question.solution} /></p>
            </div>
            <div>
              {attempt.correct && <button type="button" onClick={saveBenchmark} disabled={saving}>{saving ? "Saving…" : "Save benchmark"}</button>}
              <button type="button" onClick={retrySame}><RefreshIcon size={14} /> Try again</button>
              <button type="button" onClick={() => chooseNext()}>Next question</button>
            </div>
          </div>
        )}
      </section>
      {message && <p className="owner-math-message" role="status">{message}</p>}
    </main>
  );
}
