import React from "react";
import { Link } from "../lib/router";
import { ArrowRightIcon } from "../components/Icons";
import { usePageMeta } from "../lib/meta";
import SectionLabel from "../components/SectionLabel";

export default function NotFoundPage() {
  usePageMeta("Not found", "Page not found.");
  return (
    <main className="page-main site-shell empty-page">
      <SectionLabel>404</SectionLabel>
      <h1 className="page-title">Nothing here.</h1>
      <Link href="/" className="text-link">Go home <ArrowRightIcon size={15} /></Link>
    </main>
  );
}
