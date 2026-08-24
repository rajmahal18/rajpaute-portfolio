import React from "react";
import { featuredProjects } from "../data/projectMeta";
import { site } from "../data/site";
import ProjectTile from "../components/ProjectTile";
import MentalMathChallenge from "../components/MentalMathChallenge";
import SectionLabel from "../components/SectionLabel";
import { ArrowRightIcon, MailIcon, UserIcon, WorkIcon } from "../components/Icons";
import { Link } from "../lib/router";
import { usePageMeta } from "../lib/meta";

export default function HomePage() {
  usePageMeta(null, "Raj Paute — Software Engineer building full-stack systems for real operations.");

  return (
    <main>
      <section className="home-hero site-shell">
        <div className="hero-eyebrow-row">
          <div className="icon-label"><WorkIcon size={14} /><SectionLabel>Software Engineer</SectionLabel></div>
          <span className="hero-location">{site.location}</span>
        </div>

        <h1 className="hero-title">Raj Paute.<br /><span>I build systems for real work.</span></h1>

        <div className="hero-lower">
          <p>{site.intro}</p>
          <div className="hero-actions" aria-label="Primary actions">
            <Link href="/work" className="quiet-action"><WorkIcon size={15} /> Work</Link>
            <Link href="/about" className="quiet-action"><UserIcon size={15} /> About</Link>
          </div>
        </div>
      </section>

      <MentalMathChallenge />

      <section className="site-shell section-block selected-work-section" aria-labelledby="selected-work-title">
        <div className="section-heading-row">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 id="selected-work-title" className="sr-only">Selected work</h2>
            <p className="section-voice">These are the four I’d show first.</p>
          </div>
          <Link href="/work" className="text-link desktop-only">View all work <ArrowRightIcon size={14} /></Link>
        </div>

        <div className="project-list project-list--home">
          {featuredProjects.map((project, index) => <ProjectTile key={project.id} project={project} index={index} home />)}
        </div>

        <div className="mobile-only section-link-row">
          <Link href="/work" className="text-link">View all work <ArrowRightIcon size={14} /></Link>
        </div>
      </section>

      <section className="site-shell contact-cta">
        <div className="icon-label"><MailIcon size={14} /><SectionLabel>Contact</SectionLabel></div>
        <h2 className="contact-prompt">If something here made you curious, say hi.</h2>
        <a href={`mailto:${site.email}`} className="contact-message-action"><MailIcon size={15} /> Send me a message</a>
      </section>
    </main>
  );
}
