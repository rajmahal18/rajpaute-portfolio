import React from "react";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ProjectPage from "./pages/ProjectPage";
import ScreenshotPage from "./pages/ScreenshotPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import OwnerMathPage from "./pages/OwnerMathPage";
import { ownerMentalMathRoute } from "./data/mentalMathConfig";
import { RouterProvider, useRouter } from "./lib/router";
import { useTheme } from "./hooks/useTheme";

function RouteView() {
  const { path } = useRouter();
  const { theme, toggleTheme } = useTheme();

  let page = <NotFoundPage />;

  if (path === "/") page = <HomePage />;
  else if (path === "/work") page = <WorkPage />;
  else if (path === "/about") page = <AboutPage />;
  else if (path === "/contact") page = <ContactPage />;
  else if (path === ownerMentalMathRoute) page = <OwnerMathPage />;
  else {
    const screenshotMatch = path.match(/^\/work\/([^/]+)\/screens\/(\d+)\/?$/);
    const projectMatch = path.match(/^\/work\/([^/]+)\/?$/);
    if (screenshotMatch) page = <ScreenshotPage slug={screenshotMatch[1]} index={screenshotMatch[2]} />;
    else if (projectMatch) page = <ProjectPage slug={projectMatch[1]} />;
  }

  return (
    <div className="app-shell">
      <SiteHeader theme={theme} toggleTheme={toggleTheme} />
      {page}
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <RouteView />
    </RouterProvider>
  );
}
