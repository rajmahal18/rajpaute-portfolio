import React from "react";
import { getProjectBySlug, getProjectScreenshots } from "../data/projectMeta";
import { Link, useRouter } from "../lib/router";
import { usePageMeta } from "../lib/meta";
import { ArrowLeftIcon, ArrowRightIcon } from "../components/Icons";
import SectionLabel from "../components/SectionLabel";

export default function ScreenshotPage({ slug, index }) {
  const project = getProjectBySlug(slug);
  const screenshots = getProjectScreenshots(project);
  const currentIndex = Math.min(Math.max(Number(index || 1) - 1, 0), Math.max(screenshots.length - 1, 0));
  const src = screenshots[currentIndex];
  const caption = project?.screenshotCaptions?.[currentIndex];
  const { goBack } = useRouter();

  usePageMeta(project ? `${project.displayTitle} — Screenshot ${currentIndex + 1}` : "Screenshot", "Project screenshot by Raj Paute.");

  if (!project || !src) {
    return (
      <main className="page-main site-shell empty-page">
        <h1 className="page-title">Screenshot not found.</h1>
        <Link href="/work" className="text-link">Back to work</Link>
      </main>
    );
  }

  const previous = currentIndex > 0 ? currentIndex : null;
  const next = currentIndex < screenshots.length - 1 ? currentIndex + 2 : null;

  return (
    <main className="screenshot-page site-shell">
      <button type="button" onClick={() => goBack(`/work/${project.slug}`)} className="back-link">
        <ArrowLeftIcon size={16} /> Back
      </button>
      <div className="screenshot-heading">
        <div>
          <SectionLabel>Screenshots</SectionLabel>
          <h1>{project.displayTitle}</h1>
        </div>
        <span>{currentIndex + 1} / {screenshots.length}</span>
      </div>
      <figure className="screenshot-figure">
        <div className="screenshot-stage">
          <img src={src} alt={`${project.displayTitle} screenshot ${currentIndex + 1}`} draggable="false" />
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
      <nav className="screenshot-nav" aria-label="Screenshot navigation">
        {previous ? (
          <Link href={`/work/${project.slug}/screens/${previous}`} className="text-link"><ArrowLeftIcon size={15} /> Previous</Link>
        ) : <span />}
        {next ? (
          <Link href={`/work/${project.slug}/screens/${next}`} className="text-link">Next <ArrowRightIcon size={15} /></Link>
        ) : <span />}
      </nav>
    </main>
  );
}
