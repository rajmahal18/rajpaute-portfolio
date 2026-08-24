import { projects } from "./projects.js";

export const FEATURED_PROJECT_IDS = [13, 14, 2, 11];

const overrides = {
  13: {
    title: "Cotabato Pickleball",
    slug: "cotabato-pickleball",
  },
  14: {
    title: "MPW Dink & Dash 2026",
    slug: "mpw-dink-and-dash-2026",
  },
  2: {
    title: "MPW Document Tracking System",
    slug: "mpw-document-tracking-system",
  },
  11: {
    title: "OCM The Clinic EMR and Inventory System",
    slug: "ocm-the-clinic-emr-and-inventory-system",
  },
};

const statusLabels = {
  LIVE: "Live",
  LIVE_REBUILT: "Live",
  DEPLOYED_INTERNAL: "In use",
  IN_USE: "In use",
  IN_PROGRESS: "In progress",
  CONCEPT: "Concept",
};

export const slugify = (value) =>
  String(value || "project")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const normalizeProject = (project) => {
  const override = overrides[project.id] || {};
  const title = override.title || project.title;
  return {
    ...project,
    displayTitle: title,
    slug: override.slug || slugify(title),
    statusLabel: statusLabels[project.status] || project.currentStatus || "Project",
    featuredRank: FEATURED_PROJECT_IDS.indexOf(project.id),
  };
};

export const allProjects = projects
  .map(normalizeProject)
  .sort((a, b) => {
    const aFeatured = FEATURED_PROJECT_IDS.includes(a.id);
    const bFeatured = FEATURED_PROJECT_IDS.includes(b.id);
    if (aFeatured && bFeatured) return a.featuredRank - b.featuredRank;
    if (aFeatured) return -1;
    if (bFeatured) return 1;
    if ((b.projectPriority || 0) !== (a.projectPriority || 0)) {
      return (b.projectPriority || 0) - (a.projectPriority || 0);
    }
    return a.displayTitle.localeCompare(b.displayTitle);
  });

export const featuredProjects = FEATURED_PROJECT_IDS
  .map((id) => allProjects.find((project) => project.id === id))
  .filter(Boolean);

export const getProjectBySlug = (slug) => allProjects.find((project) => project.slug === slug);

export const getProjectScreenshots = (project) => {
  if (!project) return [];
  const screenshots = Array.isArray(project.screenshots) ? project.screenshots.filter(Boolean) : [];
  if (screenshots.length) return screenshots;
  return project.screenshot ? [project.screenshot] : [];
};
