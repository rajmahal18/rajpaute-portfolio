import React from "react";
import { site } from "../data/site";
import { Link } from "../lib/router";
import { FacebookIcon, GithubIcon, InstagramIcon, MailIcon } from "./Icons";

const socialIcons = { GitHub: GithubIcon, Facebook: FacebookIcon, Instagram: InstagramIcon };

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell footer-grid">
        <div>
          <Link href="/" className="wordmark footer-wordmark">RAJ PAUTE</Link>
          <p className="footer-note">© 2026 Raj Paute</p>
        </div>
        <div className="footer-icon-links" aria-label="Contact and social links">
          <a href={`mailto:${site.email}`} className="footer-icon-link" aria-label="Email Raj Paute" title="Email"><MailIcon size={17} /></a>
          {site.socials.map((social) => {
            const SocialIcon = socialIcons[social.label] || GithubIcon;
            return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="footer-icon-link" aria-label={social.label} title={social.label}><SocialIcon size={17} /></a>;
          })}
        </div>
      </div>
    </footer>
  );
}
