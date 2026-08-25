import React from "react";
import { getProjectBySlug, getProjectScreenshots } from "../data/projectMeta";
import { useRouter, Link } from "../lib/router";
import { usePageMeta } from "../lib/meta";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "../components/Icons";
import ProjectVisual from "../components/ProjectVisual";
import SectionLabel from "../components/SectionLabel";

function DetailList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="detail-list">
      {items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}
    </ul>
  );
}

function CaseSection({ label, children }) {
  if (!children) return null;
  return (
    <section className="case-section">
      <SectionLabel>{label}</SectionLabel>
      <div className="case-section-content">{children}</div>
    </section>
  );
}

export default function ProjectPage({ slug }) {
  const project = getProjectBySlug(slug);
  const { goBack } = useRouter();

  usePageMeta(
    project?.displayTitle || "Work",
    project?.description || "Project case study by Raj Paute."
  );

  if (!project) {
    return (
      <main className="page-main site-shell empty-page">
        <SectionLabel>Work</SectionLabel>
        <h1 className="page-title">Project not found.</h1>
        <Link href="/work" className="text-link">Back to work <ArrowRightIcon size={15} /></Link>
      </main>
    );
  }

  const screenshots = getProjectScreenshots(project);
  const caseStudy = project.caseStudy || {};
  const liveLink = project.link && project.link !== "#" ? project.link : caseStudy.links?.live && caseStudy.links.live !== "#" ? caseStudy.links.live : null;

  return (
    <main className="project-page site-shell">
      <button type="button" onClick={() => goBack("/work")} className="back-link">
        <ArrowLeftIcon size={16} /> Back
      </button>

      <header className="project-hero">
        <SectionLabel>Work</SectionLabel>
        <h1 className="project-title">{project.displayTitle}</h1>
        <div className="project-facts">
          <div>
            <span>Type</span>
            <strong>{project.workType || "Software project"}</strong>
          </div>
          <div>
            <span>Role</span>
            <strong>{project.role || "Full-stack developer"}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{project.statusLabel}</strong>
          </div>
          <div>
            <span>Tech stack</span>
            <strong>{project.stackSummary || project.tags?.join(", ") || "—"}</strong>
          </div>
        </div>
        {liveLink && (
          <a href={liveLink} target="_blank" rel="noreferrer" className="text-link project-live-link">
            View live site <ArrowUpRightIcon />
          </a>
        )}
      </header>

      <ProjectVisual project={project} eager className="project-hero-visual" />

      <div className="case-study-layout">
        <CaseSection label="Overview">
          <p className="lead-copy">{project.description}</p>
          {project.realWorld?.usageContext && <p>{project.realWorld.usageContext}</p>}
        </CaseSection>

        <CaseSection label="Challenge">
          <p>{caseStudy.problem || project.problemSolved}</p>
          <DetailList items={caseStudy.constraints} />
        </CaseSection>

        <CaseSection label="Approach">
          <p>{caseStudy.solution}</p>
          <DetailList items={caseStudy.highlights} />
        </CaseSection>

        {(caseStudy.technicalImplementation?.length || caseStudy.metrics?.length) ? (
          <CaseSection label="Build details">
            <DetailList items={caseStudy.technicalImplementation || caseStudy.metrics} />
            {caseStudy.technicalImplementation?.length && caseStudy.metrics?.length ? (
              <div className="metric-lines">
                {caseStudy.metrics.map((metric) => <span key={metric}>{metric}</span>)}
              </div>
            ) : null}
          </CaseSection>
        ) : null}

        {caseStudy.challengesAndDecisions?.length ? (
          <CaseSection label="Key decisions">
            <DetailList items={caseStudy.challengesAndDecisions} />
          </CaseSection>
        ) : null}

        {screenshots.length > 1 && (
          <section className="case-section screenshots-section">
            <SectionLabel>Screenshots</SectionLabel>
            <div className="screenshot-grid">
              {screenshots.map((src, index) => (
                <Link key={`${src}-${index}`} href={`/work/${project.slug}/screens/${index + 1}`} className="screenshot-link" aria-label={`Open screenshot ${index + 1} of ${project.displayTitle}`}>
                  <img src={src} alt="" loading="lazy" decoding="async" draggable="false" />
                  <span>{String(index + 1).padStart(2, "0")} <ArrowRightIcon size={14} /></span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {caseStudy.outcome ? (
          <CaseSection label="Outcome">
            <p>{caseStudy.outcome}</p>
          </CaseSection>
        ) : null}

        {caseStudy.whatIdImproveNext?.length ? (
          <CaseSection label="Next">
            <DetailList items={caseStudy.whatIdImproveNext} />
          </CaseSection>
        ) : null}
      </div>

      <div className="project-end-nav">
        <p className="project-end-note">If you made it this far, thanks for digging into the build.</p>
        <Link href="/work" className="text-link">View all work <ArrowRightIcon size={15} /></Link>
      </div>
    </main>
  );
}
