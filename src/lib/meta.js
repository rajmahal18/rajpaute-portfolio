import { useEffect } from "react";

function setMeta(selector, attribute, value) {
  const node = document.querySelector(selector);
  if (node && value) node.setAttribute(attribute, value);
}

export function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Raj Paute` : "Raj Paute — Software Engineer";
    const resolvedDescription = description || "Software engineer building systems for real operations.";

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", resolvedDescription);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", resolvedDescription);
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", resolvedDescription);
  }, [title, description]);
}
