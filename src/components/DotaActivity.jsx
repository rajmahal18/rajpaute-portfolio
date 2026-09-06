import React, { useEffect, useState } from "react";
import ActivityCalendar from "./ActivityCalendar";
import { ArrowUpRightIcon } from "./Icons";
import SectionLabel from "./SectionLabel";

const TOOLTIP_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function dateFromISO(value) {
  return new Date(`${value}T00:00:00Z`);
}

function matchLabel(day) {
  const count = Number(day?.count) || 0;
  const date = TOOLTIP_DATE_FORMATTER.format(dateFromISO(day.date));
  return `${count} match${count === 1 ? "" : "es"} on ${date}`;
}

export default function DotaActivity() {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let cancelled = false;
    fetch("/api/dota/activity", { headers: { Accept: "application/json" } })
      .then(async (response) => {
        const payload = await response.json().catch(() => null);
        if (!response.ok || !payload?.weeks) throw new Error(payload?.error || "Unavailable");
        return payload;
      })
      .then((data) => { if (!cancelled) setState({ status: "ready", data }); })
      .catch(() => { if (!cancelled) setState({ status: "unavailable", data: null }); });
    return () => { cancelled = true; };
  }, []);

  const profileHref = state.data?.accountId
    ? `https://www.opendota.com/players/${state.data.accountId}`
    : "https://www.opendota.com/";

  const heading = (
    <div className="section-heading-row section-heading-row--compact">
      <div className="icon-label"><span className="dota-activity-icon" aria-hidden="true" /><SectionLabel>Dota 2 activity</SectionLabel></div>
      {state.status === "ready" && (
        <a href={profileHref} target="_blank" rel="noreferrer" className="icon-text-link">
          View OpenDota <ArrowUpRightIcon size={13} />
        </a>
      )}
    </div>
  );

  if (state.status === "loading") {
    return (
      <section className="about-section activity-section dota-activity-section">
        {heading}
        <div className="activity-state">Loading match activity…</div>
      </section>
    );
  }

  if (state.status !== "ready") {
    return (
      <section className="about-section activity-section dota-activity-section">
        {heading}
        <div className="activity-state">Live Dota 2 activity is unavailable right now.</div>
      </section>
    );
  }

  const { totalMatches, weeks } = state.data;

  return (
    <section className="about-section activity-section dota-activity-section">
      {heading}
      <p className="activity-count">
        {totalMatches} match{totalMatches === 1 ? "" : "es"} in the last year
      </p>
      <p className="activity-voice">Same familiar grid, except each square is a day I played Dota.</p>
      <ActivityCalendar
        weeks={weeks}
        ariaLabel="Dota 2 match activity calendar for the last year"
        dayLabel={matchLabel}
      />
    </section>
  );
}
