import React from "react";
import { Link, useRouter } from "../lib/router";
import { MailIcon, MoonIcon, SunIcon, UserIcon, WorkIcon } from "./Icons";

const navItems = [
  { label: "Work", href: "/work", Icon: WorkIcon },
  { label: "About", href: "/about", Icon: UserIcon },
  { label: "Contact", href: "/contact", Icon: MailIcon },
];

export default function SiteHeader({ theme, toggleTheme }) {
  const { path } = useRouter();

  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link href="/" className="wordmark" aria-label="Raj Paute home">RAJ PAUTE</Link>
        <nav className="header-nav" aria-label="Primary navigation">
          {navItems.map(({ label, href, Icon }) => {
            const active = path === href || (href === "/work" && path.startsWith("/work/"));
            return (
              <Link key={href} href={href} className={`nav-link ${active ? "is-active" : ""}`} aria-current={active ? "page" : undefined}>
                <Icon size={14} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <button type="button" className="icon-button theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          {theme === "dark" ? <SunIcon size={17} /> : <MoonIcon size={17} />}
        </button>
      </div>
    </header>
  );
}
