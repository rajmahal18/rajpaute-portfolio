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

function DeepDiveGroup({ label, children }) {
  if (!children) return null;
  return (
    <section className="deep-dive-group">
      <h3>{label}</h3>
      {children}
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
  const screenshotCaptions = Array.isArray(project.screenshotCaptions) ? project.screenshotCaptions : [];
  const caseStudy = project.caseStudy || {};
  const liveLink = project.link && project.link !== "#" ? project.link : caseStudy.links?.live && caseStudy.links.live !== "#" ? caseStudy.links.live : null;
  const constraints = caseStudy.constraints || [];
  const highlights = caseStudy.highlights || [];
  const visibleConstraints = constraints.slice(0, 3);
  const visibleHighlights = highlights.slice(0, 4);
  const additionalConstraints = constraints.slice(3);
  const additionalHighlights = highlights.slice(4);
  const hasDeepDive = Boolean(
    additionalConstraints.length
    || additionalHighlights.length
    || caseStudy.technicalImplementation?.length
    || caseStudy.metrics?.length
    || caseStudy.challengesAndDecisions?.length
    || caseStudy.whatIdImproveNext?.length
  );

  const quickRead = [
    { label: "Problem", value: project.problemSolved || project.description },
    { label: "Context", value: project.realWorld?.usedIn },
    { label: "Used by", value: project.realWorld?.usedBy },
    { label: "Proof", value: project.proofLine },
  ].filter((item) => item.value);

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

      {quickRead.length > 0 && (
        <section className="project-quick-read" aria-labelledby="quick-read-title">
          <div className="project-quick-read-heading">
            <SectionLabel>Quick read</SectionLabel>
            <h2 id="quick-read-title" className="sr-only">Project quick read</h2>
            <p>What matters before the implementation details.</p>
          </div>
          <div className="project-quick-read-grid">
            {quickRead.map((item) => (
              <div key={item.label} className="project-quick-read-item">
                <span>{item.label}</span>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <figure className="project-hero-media">
        <ProjectVisual project={project} eager className="project-hero-visual" />
        {project.heroCaption && <figcaption>{project.heroCaption}</figcaption>}
      </figure>

      <div className="case-study-layout">
        <CaseSection label="Overview">
          <p className="lead-copy">{project.description}</p>
          {project.realWorld?.usageContext && <p>{project.realWorld.usageContext}</p>}
        </CaseSection>

        <CaseSection label="Challenge">
          <p>{caseStudy.problem || project.problemSolved}</p>
          <DetailList items={visibleConstraints} />
        </CaseSection>

        <CaseSection label="Approach">
          <p>{caseStudy.solution}</p>
          <DetailList items={visibleHighlights} />
        </CaseSection>

        {screenshots.length > 1 && (
          <section className="case-section screenshots-section">
            <SectionLabel>Proof</SectionLabel>
            <div className="screenshot-grid">
              {screenshots.map((src, index) => (
                <Link key={`${src}-${index}`} href={`/work/${project.slug}/screens/${index + 1}`} className="screenshot-link" aria-label={`Open screenshot ${index + 1} of ${project.displayTitle}`}>
                  <img src={src} alt="" loading="lazy" decoding="async" draggable="false" />
                  <span className="screenshot-caption-row">
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <span>{screenshotCaptions[index] || "Project interface"}</span>
                    <ArrowRightIcon size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {caseStudy.outcome ? (
          <CaseSection label="Outcome">
            <p className="lead-copy outcome-copy">{caseStudy.outcome}</p>
          </CaseSection>
        ) : null}

        {hasDeepDive && (
          <details className="case-deep-dive">
            <summary>
              <span>Engineering deep dive</span>
              <small>Implementation, decisions, metrics, and next steps</small>
            </summary>
            <div className="case-deep-dive-content">
              {additionalConstraints.length ? (
                <DeepDiveGroup label="Additional constraints">
                  <DetailList items={additionalConstraints} />
                </DeepDiveGroup>
              ) : null}

              {additionalHighlights.length ? (
                <DeepDiveGroup label="Additional capabilities">
                  <DetailList items={additionalHighlights} />
                </DeepDiveGroup>
              ) : null}

              {caseStudy.technicalImplementation?.length ? (
                <DeepDiveGroup label="Implementation">
                  <DetailList items={caseStudy.technicalImplementation} />
                </DeepDiveGroup>
              ) : null}

              {caseStudy.metrics?.length ? (
                <DeepDiveGroup label="Build footprint">
                  <div className="metric-lines">
                    {caseStudy.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                  </div>
                </DeepDiveGroup>
              ) : null}

              {caseStudy.challengesAndDecisions?.length ? (
                <DeepDiveGroup label="Key decisions">
                  <DetailList items={caseStudy.challengesAndDecisions} />
                </DeepDiveGroup>
              ) : null}

              {caseStudy.whatIdImproveNext?.length ? (
                <DeepDiveGroup label="Next">
                  <DetailList items={caseStudy.whatIdImproveNext} />
                </DeepDiveGroup>
              ) : null}
            </div>
          </details>
        )}
      </div>

      <div className="project-end-nav">
        <p className="project-end-note">If you made it this far, thanks for digging into the build.</p>
        <Link href="/work" className="text-link">View all work <ArrowRightIcon size={15} /></Link>
      </div>
    </main>
  );
}
