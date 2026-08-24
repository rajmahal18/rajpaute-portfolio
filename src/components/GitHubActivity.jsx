import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";
import SectionLabel from "./SectionLabel";
import { site } from "../data/site";

const LEVEL_CLASS = {
  NONE: "github-day--0",
  FIRST_QUARTILE: "github-day--1",
  SECOND_QUARTILE: "github-day--2",
  THIRD_QUARTILE: "github-day--3",
  FOURTH_QUARTILE: "github-day--4",
};

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const TOOLTIP_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function dateFromISO(value) {
  return new Date(`${value}T00:00:00Z`);
}

function contributionLabel(day) {
  const count = Number(day?.count) || 0;
  const date = TOOLTIP_DATE_FORMATTER.format(dateFromISO(day.date));
  return `${count} contribution${count === 1 ? "" : "s"} on ${date}`;
}

function monthLabels(weeks) {
  let previousKey = null;
  return weeks.map((week, index) => {
    const date = dateFromISO(week.firstDay);
    const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    if (key === previousKey) return null;
    previousKey = key;
    return { index, label: MONTH_FORMATTER.format(date) };
  }).filter(Boolean);
}

export default function GitHubActivity() {
  const [state, setState] = useState({ status: "loading", data: null });
  const [tooltip, setTooltip] = useState(null);
  const frameRef = useRef(null);
  const githubHref = site.socials.find((social) => social.label === "GitHub")?.href || `https://github.com/${site.githubUsername}`;

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github/contributions", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const payload = await response.json().catch(() => null);
        if (!response.ok || !payload?.weeks) throw new Error(payload?.error || "Unavailable");
        return payload;
      })
      .then((data) => { if (!cancelled) setState({ status: "ready", data }); })
      .catch(() => { if (!cancelled) setState({ status: "unavailable", data: null }); });
    return () => { cancelled = true; };
  }, []);

  const labels = useMemo(() => monthLabels(state.data?.weeks || []), [state.data]);

  const showTooltip = (event, day) => {
    const frame = frameRef.current;
    if (!frame) return;
    const frameRect = frame.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();
    const rawX = cellRect.left - frameRect.left + (cellRect.width / 2);
    const safePadding = Math.min(92, Math.max(54, frameRect.width / 4));
    setTooltip({
      text: contributionLabel(day),
      x: Math.max(safePadding, Math.min(frameRect.width - safePadding, rawX)),
      y: cellRect.top - frameRect.top,
    });
  };

  const heading = (
    <div className="section-heading-row section-heading-row--compact">
      <div className="icon-label"><GitHubIcon size={14} /><SectionLabel>GitHub activity</SectionLabel></div>
      <a href={githubHref} target="_blank" rel="noreferrer" className="icon-text-link">
        View GitHub <ArrowUpRightIcon size={13} />
      </a>
    </div>
  );

  if (state.status === "loading") {
    return (
      <section className="about-section github-activity-section">
        {heading}
        <div className="github-activity-state">Loading contribution activity…</div>
      </section>
    );
  }

  if (state.status !== "ready") {
    return (
      <section className="about-section github-activity-section">
        {heading}
        <div className="github-activity-state">Live contribution activity is unavailable right now.</div>
      </section>
    );
  }

  const { totalContributions, weeks } = state.data;
  const weekCount = weeks.length;

  return (
    <section className="about-section github-activity-section">
      {heading}
      <p className="github-contribution-count">
        {totalContributions} contribution{totalContributions === 1 ? "" : "s"} in the last year
      </p>
      <p className="github-voice">This is usually what I’m tinkering with when I’m not deep inside a project.</p>

      <div className="github-calendar-frame" ref={frameRef} onMouseLeave={() => setTooltip(null)}>
        {tooltip && (
          <div
            className="github-tooltip"
            style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
            role="status"
          >
            {tooltip.text}
          </div>
        )}

        <div className="github-calendar-scroll" onScroll={() => setTooltip(null)}>
          <div className="github-calendar" style={{ "--github-weeks": weekCount }}>
            <div className="github-month-row" aria-hidden="true">
              <span className="github-month-spacer" />
              <div className="github-month-grid" style={{ gridTemplateColumns: `repeat(${weekCount}, var(--github-cell))` }}>
                {labels.map((month) => (
                  <span key={`${month.index}-${month.label}`} style={{ gridColumn: `${month.index + 1}` }}>{month.label}</span>
                ))}
              </div>
            </div>

            <div className="github-calendar-body">
              <div className="github-day-labels" aria-hidden="true">
                <span style={{ gridRow: 2 }}>Mon</span>
                <span style={{ gridRow: 4 }}>Wed</span>
                <span style={{ gridRow: 6 }}>Fri</span>
              </div>
              <div className="github-weeks" style={{ gridTemplateColumns: `repeat(${weekCount}, var(--github-cell))` }} aria-label="GitHub contribution calendar for the last year">
                {weeks.map((week) => (
                  <div className="github-week" key={week.firstDay}>
                    {Array.from({ length: 7 }, (_, weekday) => {
                      const day = week.days.find((item) => item.weekday === weekday);
                      if (!day) return <span key={`${week.firstDay}-${weekday}`} className="github-day github-day--empty" aria-hidden="true" />;
                      return (
                        <button
                          type="button"
                          tabIndex={-1}
                          key={day.date}
                          className={`github-day ${LEVEL_CLASS[day.level] || "github-day--0"}`}
                          aria-label={contributionLabel(day)}
                          onMouseEnter={(event) => showTooltip(event, day)}
                          onFocus={(event) => showTooltip(event, day)}
                          onPointerDown={(event) => showTooltip(event, day)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="github-calendar-footer">
              <span>Less</span>
              <div className="github-legend" aria-label="Contribution intensity from less to more">
                {[0, 1, 2, 3, 4].map((level) => <span key={level} className={`github-day github-day--${level}`} />)}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
