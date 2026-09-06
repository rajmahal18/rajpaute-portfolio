import React, { useEffect, useState } from "react";
import ActivityCalendar from "./ActivityCalendar";
import { ArrowUpRightIcon, GitHubIcon } from "./Icons";
import SectionLabel from "./SectionLabel";
import { site } from "../data/site";

const TOOLTIP_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function dateFromISO(value) {
  return new Date(`${value}T00:00:00Z`);
}

function contributionLabel(day) {
  const count = Number(day?.count) || 0;
  const date = TOOLTIP_DATE_FORMATTER.format(dateFromISO(day.date));
  return `${count} contribution${count === 1 ? "" : "s"} on ${date}`;
}

export default function GitHubActivity() {
  const [state, setState] = useState({ status: "loading", data: null });
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
      <section className="about-section activity-section github-activity-section">
        {heading}
        <div className="activity-state">Loading contribution activity…</div>
      </section>
    );
  }

  if (state.status !== "ready") {
    return (
      <section className="about-section activity-section github-activity-section">
        {heading}
        <div className="activity-state">Live contribution activity is unavailable right now.</div>
      </section>
    );
  }

  const { totalContributions, weeks } = state.data;

  return (
    <section className="about-section activity-section github-activity-section">
      {heading}
      <p className="activity-count">
        {totalContributions} contribution{totalContributions === 1 ? "" : "s"} in the last year
      </p>
      <p className="activity-voice">This is usually what I’m tinkering with when I’m not deep inside a project.</p>
      <ActivityCalendar
        weeks={weeks}
        ariaLabel="GitHub contribution calendar for the last year"
        dayLabel={contributionLabel}
      />
    </section>
  );
}
