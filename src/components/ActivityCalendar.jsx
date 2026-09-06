import React, { useMemo, useRef, useState } from "react";

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

function dateFromISO(value) {
  return new Date(`${value}T00:00:00Z`);
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

function normalizedLevel(level) {
  if (Number.isFinite(Number(level))) {
    return Math.max(0, Math.min(4, Number(level)));
  }

  return {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }[level] ?? 0;
}

export default function ActivityCalendar({ weeks = [], ariaLabel, dayLabel }) {
  const [tooltip, setTooltip] = useState(null);
  const frameRef = useRef(null);
  const labels = useMemo(() => monthLabels(weeks), [weeks]);
  const weekCount = weeks.length;

  const showTooltip = (event, day) => {
    const frame = frameRef.current;
    if (!frame) return;
    const frameRect = frame.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();
    const rawX = cellRect.left - frameRect.left + (cellRect.width / 2);
    const safePadding = Math.min(92, Math.max(54, frameRect.width / 4));
    setTooltip({
      text: dayLabel(day),
      x: Math.max(safePadding, Math.min(frameRect.width - safePadding, rawX)),
      y: cellRect.top - frameRect.top,
    });
  };

  return (
    <div className="activity-calendar-frame" ref={frameRef} onMouseLeave={() => setTooltip(null)}>
      {tooltip && (
        <div
          className="activity-tooltip"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
          role="status"
        >
          {tooltip.text}
        </div>
      )}

      <div className="activity-calendar-scroll" onScroll={() => setTooltip(null)}>
        <div className="activity-calendar" style={{ "--activity-weeks": weekCount }}>
          <div className="activity-month-row" aria-hidden="true">
            <span className="activity-month-spacer" />
            <div className="activity-month-grid" style={{ gridTemplateColumns: `repeat(${weekCount}, var(--activity-cell))` }}>
              {labels.map((month) => (
                <span key={`${month.index}-${month.label}`} style={{ gridColumn: `${month.index + 1}` }}>{month.label}</span>
              ))}
            </div>
          </div>

          <div className="activity-calendar-body">
            <div className="activity-day-labels" aria-hidden="true">
              <span style={{ gridRow: 2 }}>Mon</span>
              <span style={{ gridRow: 4 }}>Wed</span>
              <span style={{ gridRow: 6 }}>Fri</span>
            </div>
            <div className="activity-weeks" style={{ gridTemplateColumns: `repeat(${weekCount}, var(--activity-cell))` }} aria-label={ariaLabel}>
              {weeks.map((week) => (
                <div className="activity-week" key={week.firstDay}>
                  {Array.from({ length: 7 }, (_, weekday) => {
                    const day = week.days.find((item) => item.weekday === weekday);
                    if (!day) return <span key={`${week.firstDay}-${weekday}`} className="activity-day activity-day--empty" aria-hidden="true" />;
                    const label = dayLabel(day);
                    return (
                      <button
                        type="button"
                        tabIndex={-1}
                        key={day.date}
                        className={`activity-day activity-day--${normalizedLevel(day.level)}`}
                        aria-label={label}
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

          <div className="activity-calendar-footer">
            <span>Less</span>
            <div className="activity-legend" aria-label="Activity intensity from less to more">
              {[0, 1, 2, 3, 4].map((level) => <span key={level} className={`activity-day activity-day--${level}`} />)}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
