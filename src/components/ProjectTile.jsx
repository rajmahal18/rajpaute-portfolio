import React from "react";
import { Link } from "../lib/router";
import {
  ArrowRightIcon,
  BoxIcon,
  BuildingIcon,
  CodeIcon,
  CrossIcon,
  FileTextIcon,
  FolderIcon,
  GameIcon,
  MapIcon,
  TrophyIcon,
  UsersIcon,
  WalletIcon,
} from "./Icons";

function ProjectIcon({ project, size = 18 }) {
  const props = { size };
  switch (project.id) {
    case 13: return <MapIcon {...props} />;
    case 14: return <TrophyIcon {...props} />;
    case 2: return <FileTextIcon {...props} />;
    case 11: return <CrossIcon {...props} />;
    case 8: return <GameIcon {...props} />;
    case 1:
    case 3: return <BoxIcon {...props} />;
    case 9: return <UsersIcon {...props} />;
    case 4:
    case 5:
    case 6: return <WalletIcon {...props} />;
    case 10: return <BuildingIcon {...props} />;
    case 12: return <FolderIcon {...props} />;
    default: return <CodeIcon {...props} />;
  }
}

export default function ProjectTile({ project, index = 0, compact = false, home = false }) {
  const number = String(index + 1).padStart(2, "0");
  const className = home ? "project-row project-row--home" : compact ? "project-row project-row--compact" : "project-row project-row--featured";

  return (
    <article className={className}>
      <Link href={`/work/${project.slug}`} className="project-row-link" aria-label={`View ${project.displayTitle}`}>
        <span className="project-glyph" aria-hidden="true"><ProjectIcon project={project} size={home ? 19 : 18} /></span>
        <div className="project-row-copy">
          <span className="project-index" aria-hidden="true">{number}</span>
          <h3>{project.displayTitle}</h3>
        </div>
        {!home && <span className="project-row-status">{project.statusLabel}</span>}
        <span className="project-row-arrow" aria-hidden="true"><ArrowRightIcon size={15} /></span>
      </Link>
    </article>
  );
}
