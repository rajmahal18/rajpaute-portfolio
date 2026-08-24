import React from "react";
import { site } from "../data/site";
import { FacebookIcon, GithubIcon, InstagramIcon, MailIcon, MapIcon, ResumeIcon } from "../components/Icons";
import SectionLabel from "../components/SectionLabel";
import { usePageMeta } from "../lib/meta";

const socialIcons = { GitHub: GithubIcon, Facebook: FacebookIcon, Instagram: InstagramIcon };

export default function ContactPage() {
  usePageMeta("Contact", "Contact Raj Paute for software engineering, systems, and automation work.");

  return (
    <main className="page-main site-shell contact-page">
      <section className="contact-page-hero">
        <div className="icon-label"><MailIcon size={14} /><SectionLabel>Contact</SectionLabel></div>
        <h1 className="page-title contact-page-title">If something here made you curious, say hi.</h1>
        <p className="contact-page-note">Email is the easiest way to reach me. I read everything myself.</p>
        <a href={`mailto:${site.email}`} className="contact-message-action contact-message-action--page"><MailIcon size={15} /> Send me a message</a>
      </section>

      <section className="contact-links-section" aria-label="Contact details">
        <div className="contact-detail-row contact-detail-row--static">
          <span className="contact-detail-icon"><MapIcon size={17} /></span>
          <span>Based in</span>
          <p>{site.location}</p>
        </div>
        {site.socials.map((social) => {
          const SocialIcon = socialIcons[social.label] || GithubIcon;
          return (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="contact-detail-row contact-detail-row--link">
              <span className="contact-detail-icon"><SocialIcon size={17} /></span>
              <span>{social.label}</span>
              <p>View profile</p>
            </a>
          );
        })}
        <a href={site.resume} target="_blank" rel="noreferrer" className="contact-detail-row contact-detail-row--link">
          <span className="contact-detail-icon"><ResumeIcon size={17} /></span>
          <span>Resume</span>
          <p>Open PDF</p>
        </a>
      </section>
    </main>
  );
}
