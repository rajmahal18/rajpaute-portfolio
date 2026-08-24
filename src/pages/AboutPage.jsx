import React from "react";
import { credentials, site, stackGroups, timeline } from "../data/site";
import { usePageMeta } from "../lib/meta";
import SectionLabel from "../components/SectionLabel";
import GitHubActivity from "../components/GitHubActivity";
import QuickQuestions from "../components/QuickQuestions";
import { ArrowUpRightIcon, ResumeIcon, UserIcon } from "../components/Icons";

export default function AboutPage() {
  usePageMeta("About", "About Raj Paute — Software Engineer and licensed Electronics Engineer.");

  return (
    <main className="page-main site-shell about-page">
      <section className="page-intro about-intro">
        <div>
          <div className="icon-label"><UserIcon size={14} /><SectionLabel>About</SectionLabel></div>
          <h1 className="page-title">I build around how people actually work.</h1>
        </div>
        <div className="about-lead-column">
          <p className="about-lead">{site.about}</p>
          <div className="about-current-learning">
            <SectionLabel>Currently learning</SectionLabel>
            <p>{site.currentLearning}</p>
          </div>
        </div>
      </section>

      <section className="about-profile-grid">
        <div className="portrait-frame"><img src="/profile-light.png" alt="Raj Paute" loading="eager" decoding="async" /></div>
        <div className="about-principles">
          <SectionLabel>How I work</SectionLabel>
          <p className="about-statement">Start with the workflow, not the interface.</p>
          <p className="about-statement">Keep the architecture understandable enough to maintain under pressure.</p>
          <p className="about-statement">Care about what happens after deployment, not just the handoff.</p>
        </div>
      </section>

      <QuickQuestions />

      <section className="about-section">
        <SectionLabel>Work & education</SectionLabel>
        <div className="timeline-list">
          {timeline.map((item) => (
            <article key={`${item.year}-${item.title}`} className="timeline-row">
              <time>{item.year}</time>
              <div><h2>{item.title}</h2><span>{item.subtitle}</span><p>{item.body}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-section">
        <SectionLabel>Tech stack</SectionLabel>
        <div className="stack-list">
          {stackGroups.map((group) => <div key={group.label} className="stack-row"><span>{group.label}</span><p>{group.items.join(" · ")}</p></div>)}
        </div>
      </section>

      <GitHubActivity />

      <section className="about-section">
        <div className="section-heading-row section-heading-row--compact">
          <SectionLabel>Credentials</SectionLabel>
          <a href={site.resume} target="_blank" rel="noreferrer" className="icon-text-link desktop-only"><ResumeIcon size={15} /> Resume <ArrowUpRightIcon size={13} /></a>
        </div>
        <div className="credential-list">
          {credentials.map((credential) => {
            const content = <><span>{credential.title}</span><small>{credential.issuer}</small></>;
            return credential.href ? (
              <a key={credential.title} href={credential.href} target="_blank" rel="noreferrer" className="credential-row"><div>{content}</div></a>
            ) : (
              <div key={credential.title} className="credential-row credential-row--static"><div>{content}</div></div>
            );
          })}
        </div>
        <div className="mobile-only section-link-row">
          <a href={site.resume} target="_blank" rel="noreferrer" className="icon-text-link"><ResumeIcon size={15} /> Resume <ArrowUpRightIcon size={13} /></a>
        </div>
      </section>
    </main>
  );
}
