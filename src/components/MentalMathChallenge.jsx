import React, { useEffect, useMemo, useRef, useState } from "react";
import { CalculatorIcon, RefreshIcon } from "./Icons";
import SectionLabel from "./SectionLabel";
import MathText from "./MathText";
import { signalMathCompanion } from "../lib/mathCompanion";
import {
  getMentalMathAnswerLabel,
  getMentalMathQuestionById,
  mentalMathQuestions,
  parseMentalMathAnswer,
} from "../data/mentalMathQuestions";

const SESSION_KEY = "raj-paute-mental-math:v1";
const QUESTION_IDS = mentalMathQuestions.map((question) => question.id);

const formatSeconds = (milliseconds) => `${(milliseconds / 1000).toFixed(2)}s`;

function comparisonCopy(visitorMs, rajMs) {
  if (!Number.isFinite(rajMs)) return "I haven’t benchmarked this one yet.";
  const difference = visitorMs - rajMs;
  if (Math.abs(difference) < 10) return "That was basically a tie.";
  if (difference < 0) return `Okay, you got me by ${formatSeconds(Math.abs(difference))}.`;
  return `I had this one by ${formatSeconds(difference)}.`;
}

function shuffledIds(excludeFirstId = null) {
  const ids = [...QUESTION_IDS];
  for (let index = ids.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]];
  }
  if (excludeFirstId && ids.length > 1 && ids[0] === excludeFirstId) {
    const replacementIndex = ids.findIndex((id) => id !== excludeFirstId);
    [ids[0], ids[replacementIndex]] = [ids[replacementIndex], ids[0]];
  }
  return ids;
}

function freshSession(excludeFirstId = null) {
  const ids = shuffledIds(excludeFirstId);
  return {
    currentId: ids[0],
    remainingIds: ids.slice(1),
    phase: "idle",
    result: null,
  };
}

function loadSession() {
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(SESSION_KEY) || "null");
    const question = getMentalMathQuestionById(parsed?.currentId);
    if (!question) return freshSession();

    const validIds = new Set(QUESTION_IDS);
    const remainingIds = Array.isArray(parsed.remainingIds)
      ? parsed.remainingIds.filter((id) => validIds.has(id) && id !== question.id)
      : [];

    if (parsed.phase === "result" && parsed.result && Number.isFinite(Number(parsed.result.elapsedMs))) {
      return {
        currentId: question.id,
        remainingIds,
        phase: "result",
        result: {
          correct: Boolean(parsed.result.correct),
          elapsedMs: Number(parsed.result.elapsedMs),
          numeric: Number(parsed.result.numeric),
        },
      };
    }

    if (parsed.phase === "active" || parsed.phase === "interrupted") {
      return { currentId: question.id, remainingIds, phase: "interrupted", result: null };
    }

    return { currentId: question.id, remainingIds, phase: "idle", result: null };
  } catch {
    return freshSession();
  }
}

export default function MentalMathChallenge() {
  const [benchmarks, setBenchmarks] = useState({});
  const [session, setSession] = useState(loadSession);
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);
  const startedAtRef = useRef(null);

  const question = useMemo(
    () => getMentalMathQuestionById(session.currentId) || mentalMathQuestions[0],
    [session.currentId]
  );

  useEffect(() => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // The challenge still works when session storage is unavailable.
    }
  }, [session]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/math/benchmarks", { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (cancelled || !payload?.benchmarks) return;
        setBenchmarks(payload.benchmarks);
      })
      .catch(() => {
        // The challenge remains fully usable before the optional benchmark backend is configured.
      });
    return () => { cancelled = true; };
  }, []);

  const benchmarkMs = useMemo(() => {
    const value = Number(benchmarks[question.id]);
    return Number.isFinite(value) && value > 0 ? value : null;
  }, [benchmarks, question.id]);

  const begin = () => {
    setAnswer("");
    setSession((current) => ({ ...current, phase: "active", result: null }));
    startedAtRef.current = performance.now();
    signalMathCompanion("mental-start", { questionId: question.id, category: question.category });
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const submit = (event) => {
    event.preventDefault();
    if (session.phase !== "active") return;
    const numeric = parseMentalMathAnswer(answer);
    if (numeric === null) {
      inputRef.current?.focus();
      return;
    }
    const elapsedMs = Math.max(1, Math.round(performance.now() - startedAtRef.current));
    const correct = Math.abs(numeric - question.answer) < 1e-9;
    setSession((current) => ({
      ...current,
      phase: "result",
      result: { correct, elapsedMs, numeric },
    }));
    signalMathCompanion("mental-result", {
      correct,
      questionId: question.id,
      category: question.category,
    });
  };

  const another = () => {
    setAnswer("");
    setSession((current) => {
      let queue = [...current.remainingIds];
      if (!queue.length) queue = shuffledIds(current.currentId);
      const nextId = queue.shift();
      return {
        currentId: nextId,
        remainingIds: queue,
        phase: "active",
        result: null,
      };
    });
    startedAtRef.current = performance.now();
    signalMathCompanion("mental-next");
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  const result = session.result;

  return (
    <section className="site-shell mental-math-section" aria-labelledby="mental-math-title">
      <div className="mental-math-heading">
        <div className="icon-label"><CalculatorIcon size={14} /><SectionLabel>Mental math</SectionLabel></div>
        <span className="mental-math-note">I do these for fun. No calculator.</span>
      </div>


      {session.phase === "idle" && (
        <div className="mental-math-idle">
          <p id="mental-math-title">Mental math, you vs me.</p>
          <button type="button" className="mental-math-start" data-math-action="mental-start" onClick={begin}>Give me one</button>
        </div>
      )}

      {session.phase !== "idle" && (
        <div className="mental-math-active" aria-live="polite">
          <div className="mental-math-question-wrap">
            <span className="mental-math-category">{question.category}</span>
            <p id="mental-math-title" className="mental-math-question"><MathText text={question.prompt} /></p>
          </div>

          {session.phase === "active" && (
            <form className="mental-math-form" onSubmit={submit}>
              <label htmlFor="mental-math-answer" className="sr-only">Your answer</label>
              <input
                ref={inputRef}
                id="mental-math-answer"
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Answer"
                className="mental-math-input"
              />
              <button type="submit" className="mental-math-check" data-math-action="mental-check">Check</button>
            </form>
          )}

          {session.phase === "interrupted" && (
            <div className="mental-math-result mental-math-result--interrupted">
              <p className="mental-math-result-note">You left mid-attempt, so I threw out the time.</p>
              <button type="button" className="mental-math-another" data-math-action="mental-next" onClick={another}>
                <RefreshIcon size={14} /> Give me another
              </button>
            </div>
          )}

          {session.phase === "result" && result && (
            <div className="mental-math-result">
              <div className="mental-math-scoreline">
                <strong>{result.correct ? "Correct" : "Not quite"} · {formatSeconds(result.elapsedMs)}</strong>
                {benchmarkMs && <span>Me · {formatSeconds(benchmarkMs)}</span>}
              </div>
              <p className="mental-math-result-note">
                {result.correct
                  ? comparisonCopy(result.elapsedMs, benchmarkMs)
                  : "Not this one. Your first answer still counts for the timed attempt."}
              </p>

              <div className="mental-math-explanation">
                <div className="mental-math-explanation-row">
                  <SectionLabel>Answer</SectionLabel>
                  <p>{getMentalMathAnswerLabel(question)}</p>
                </div>
                <div className="mental-math-explanation-row mental-math-explanation-row--solution">
                  <SectionLabel>Mental route</SectionLabel>
                  <p><MathText text={question.solution} /></p>
                </div>
              </div>

              <button type="button" className="mental-math-another" data-math-action="mental-next" onClick={another}>
                <RefreshIcon size={14} /> Another one
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
