import React, { useState } from "react";
import { ArrowRightIcon } from "./Icons";
import SectionLabel from "./SectionLabel";
import { quickQuestions } from "../data/site";

export default function QuickQuestions() {
  const [activeId, setActiveId] = useState(null);
  const active = quickQuestions.find((item) => item.id === activeId) || null;

  return (
    <section className="about-section quick-questions-section" aria-labelledby="quick-questions-title">
      <div className="quick-questions-heading">
        <div>
          <SectionLabel>Quick questions</SectionLabel>
          <h2 id="quick-questions-title" className="quick-questions-title">A few things I’d probably tell you in person.</h2>
        </div>
        <span className="quick-questions-note">Pick one.</span>
      </div>

      <div className="quick-question-list">
        {quickQuestions.map((item) => {
          const expanded = activeId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`quick-question-button ${expanded ? "is-active" : ""}`}
              aria-expanded={expanded}
              onClick={() => setActiveId(expanded ? null : item.id)}
            >
              <span>{item.question}</span>
              <ArrowRightIcon size={14} />
            </button>
          );
        })}
      </div>

      <div className={`quick-answer ${active ? "is-visible" : ""}`} aria-live="polite">
        {active && (
          <>
            <SectionLabel>My answer</SectionLabel>
            <p>{active.answer}</p>
          </>
        )}
      </div>
    </section>
  );
}
