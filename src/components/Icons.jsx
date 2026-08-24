import React from "react";

const base = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.55,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = ({ size = 18, children, fill = "none" }) => (
  <svg {...base} width={size} height={size} fill={fill}>{children}</svg>
);

export function ArrowUpRightIcon({ size = 18 }) {
  return <Icon size={size}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Icon>;
}
export function ArrowLeftIcon({ size = 18 }) {
  return <Icon size={size}><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></Icon>;
}
export function ArrowRightIcon({ size = 18 }) {
  return <Icon size={size}><path d="m9 18 6-6-6-6" /><path d="M5 12h10" /></Icon>;
}
export function SunIcon({ size = 18 }) {
  return <Icon size={size}><circle cx="12" cy="12" r="3.5" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></Icon>;
}
export function MoonIcon({ size = 18 }) {
  return <Icon size={size}><path d="M20 15.2A8 8 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" /></Icon>;
}
export function WorkIcon({ size = 18 }) {
  return <Icon size={size}><rect x="3.5" y="6.5" width="17" height="12" rx="1.5" /><path d="M8.5 6.5V4.8h7V6.5M3.5 11.2h17" /></Icon>;
}
export function UserIcon({ size = 18 }) {
  return <Icon size={size}><circle cx="12" cy="8" r="3.2" /><path d="M5.5 19c.8-3.4 3.1-5.2 6.5-5.2s5.7 1.8 6.5 5.2" /></Icon>;
}
export function GitHubIcon({ size = 18 }) {
  return <Icon size={size} fill="currentColor"><path stroke="none" d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.46.08.63-.2.63-.44v-1.7c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.35-1.03-1.35-.84-.58.06-.57.06-.57.93.07 1.42.96 1.42.96.83 1.42 2.17 1.01 2.7.77.08-.6.32-1.01.59-1.24-2.05-.23-4.2-1.03-4.2-4.56 0-1.01.36-1.83.95-2.47-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.53.94A8.8 8.8 0 0 1 12 7.29c.78 0 1.55.11 2.28.31 1.76-1.19 2.53-.94 2.53-.94.5 1.27.19 2.21.09 2.44.59.64.95 1.46.95 2.47 0 3.54-2.16 4.33-4.21 4.56.33.29.63.85.63 1.72v2.41c0 .24.17.53.64.44A9.2 9.2 0 0 0 12 2.8Z" /></Icon>;
}
export function MailIcon({ size = 18 }) {
  return <Icon size={size}><rect x="3.5" y="5.5" width="17" height="13" rx="1.5" /><path d="m4.5 7 7.5 6 7.5-6" /></Icon>;
}
export function MapIcon({ size = 18 }) {
  return <Icon size={size}><path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" /><path d="M9 4v14M15 6v14" /></Icon>;
}
export function TrophyIcon({ size = 18 }) {
  return <Icon size={size}><path d="M8 4h8v4.5c0 3-1.5 5-4 5s-4-2-4-5V4Z" /><path d="M8 6H5.5v1.5c0 2 1.1 3.2 3 3.5M16 6h2.5v1.5c0 2-1.1 3.2-3 3.5M12 13.5V18M8.5 20h7" /></Icon>;
}
export function FileTextIcon({ size = 18 }) {
  return <Icon size={size}><path d="M6 3.5h8l4 4V20H6V3.5Z" /><path d="M14 3.5V8h4M9 12h6M9 15h6" /></Icon>;
}
export function CrossIcon({ size = 18 }) {
  return <Icon size={size}><path d="M9.5 4h5v5.5H20v5h-5.5V20h-5v-5.5H4v-5h5.5V4Z" /></Icon>;
}
export function BoxIcon({ size = 18 }) {
  return <Icon size={size}><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></Icon>;
}
export function UsersIcon({ size = 18 }) {
  return <Icon size={size}><circle cx="9" cy="8" r="2.7" /><circle cx="16.5" cy="9" r="2.1" /><path d="M3.8 18c.5-3 2.3-4.8 5.2-4.8 3 0 4.8 1.8 5.3 4.8M14.3 14.1c2.9-.2 4.7 1.1 5.4 3.9" /></Icon>;
}
export function WalletIcon({ size = 18 }) {
  return <Icon size={size}><path d="M4 6.5h14.5A1.5 1.5 0 0 1 20 8v10H5.5A1.5 1.5 0 0 1 4 16.5v-10Z" /><path d="M4 6.5 16 4v2.5M15.5 11.5H20" /></Icon>;
}
export function FolderIcon({ size = 18 }) {
  return <Icon size={size}><path d="M3.5 7h6l1.8 2H20.5v9.5h-17V7Z" /><path d="M3.5 7V5h6l1.8 2" /></Icon>;
}
export function BuildingIcon({ size = 18 }) {
  return <Icon size={size}><path d="M5 20V6l7-3 7 3v14M3 20h18" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M10 20v-4h4v4" /></Icon>;
}
export function GameIcon({ size = 18 }) {
  return <Icon size={size}><path d="M7.2 8h9.6c2.2 0 3.7 1.6 4 4.2l.4 3.4c.3 2.5-2.6 3.7-4.1 1.7l-1.4-1.8H8.3l-1.4 1.8c-1.5 2-4.4.8-4.1-1.7l.4-3.4C3.5 9.6 5 8 7.2 8Z" /><path d="M8 11v4M6 13h4M16.5 12h.01M18.5 14h.01" /></Icon>;
}
export function CodeIcon({ size = 18 }) {
  return <Icon size={size}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></Icon>;
}
export function GithubIcon({ size = 18 }) {
  return <Icon size={size}><path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5.1 0-1.1.4-2.1 1.1-2.8-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 3 1.1a10.3 10.3 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.4.2 2.4.1 2.7.7.7 1.1 1.7 1.1 2.8 0 4-2.4 4.8-4.7 5.1.4.3.7 1 .7 2v2.5c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z" /></Icon>;
}
export function FacebookIcon({ size = 18 }) {
  return <Icon size={size}><path d="M14.5 4h-2.2C10.5 4 10 5.2 10 6.8V9H7.8v3H10v8M10 12h4l.5-3H10" /></Icon>;
}
export function InstagramIcon({ size = 18 }) {
  return <Icon size={size}><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.2" /><path d="M16.8 7.2h.01" /></Icon>;
}
export function ResumeIcon({ size = 18 }) {
  return <Icon size={size}><path d="M6 3.5h8l4 4V20H6V3.5Z" /><path d="M14 3.5V8h4M9 12h6M9 15h4" /></Icon>;
}


export function CalculatorIcon({ size = 18, ...props }) {
  return (
    <Icon size={size} {...props}>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M8 7h8" />
      <path d="M8 11h2M14 11h2M8 15h2M14 15h2M8 18h2M14 18h2" />
    </Icon>
  );
}

export function RefreshIcon({ size = 18, ...props }) {
  return (
    <Icon size={size} {...props}>
      <path d="M20 7v5h-5" />
      <path d="M4 17v-5h5" />
      <path d="M6.1 9a7 7 0 0 1 11.7-2.6L20 9" />
      <path d="M17.9 15a7 7 0 0 1-11.7 2.6L4 15" />
    </Icon>
  );
}
