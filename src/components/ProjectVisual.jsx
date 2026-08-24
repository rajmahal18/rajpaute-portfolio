import React from "react";

const initials = (title) =>
  String(title || "Project")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export default function ProjectVisual({ project, eager = false, className = "" }) {
  if (project.screenshot) {
    return (
      <div className={`project-visual ${className}`}>
        <img
          src={project.screenshot}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
        />
      </div>
    );
  }

  return (
    <div className={`project-visual project-visual--fallback ${className}`} aria-hidden="true">
      <span>{initials(project.displayTitle)}</span>
    </div>
  );
}
