import React from "react";
import { allProjects, FEATURED_PROJECT_IDS } from "../data/projectMeta";
import ProjectTile from "../components/ProjectTile";
import SectionLabel from "../components/SectionLabel";
import { WorkIcon } from "../components/Icons";
import { usePageMeta } from "../lib/meta";

export default function WorkPage() {
  usePageMeta("Work", "Selected systems and products built by Raj Paute.");
  const selected = allProjects.filter((project) => FEATURED_PROJECT_IDS.includes(project.id));
  const archive = allProjects.filter((project) => !FEATURED_PROJECT_IDS.includes(project.id));

  return (
    <main className="page-main site-shell work-page">
      <section className="page-intro work-intro">
        <div className="icon-label"><WorkIcon size={14} /><SectionLabel>Work</SectionLabel></div>
        <h1 className="page-title">Work.</h1>
        <p className="page-voice">Four systems that best show how I work. The rest is here if you want to keep digging.</p>
      </section>

      <section className="work-section" aria-labelledby="selected-work-heading">
        <h2 id="selected-work-heading" className="sr-only">Selected work</h2>
        <div className="section-heading-row section-heading-row--compact"><SectionLabel>Selected work</SectionLabel></div>
        <div className="project-list">
          {selected.map((project, index) => <ProjectTile key={project.id} project={project} index={index} />)}
        </div>
      </section>

      <section className="work-section work-section--archive" aria-labelledby="archive-heading">
        <div className="section-heading-row section-heading-row--compact"><SectionLabel>More work</SectionLabel></div>
        <h2 id="archive-heading" className="sr-only">More work</h2>
        <div className="project-list project-list--archive">
          {archive.map((project, index) => <ProjectTile key={project.id} project={project} index={index + selected.length} compact />)}
        </div>
      </section>
    </main>
  );
}
