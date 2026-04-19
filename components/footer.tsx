"use client";

import Link from "next/link";

const MARQUEE_ITEMS = [
  "Product Design",
  "Systems Thinking",
  "UX Strategy",
  "Information Architecture",
  "Design Leadership",
  "Interaction Design",
  "User Research",
  "Design Systems",
];

export function Footer() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <footer className="border-t border-border">
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-border py-3">
        <div className="marquee-track flex gap-10 whitespace-nowrap">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-10 text-xs text-text-muted tracking-widest uppercase"
            >
              {item}
              <span className="text-accent" aria-hidden="true">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Footer body */}
      <div className="container-editorial py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          {/* Left */}
          <div className="flex flex-col gap-4">
            <p className="text-label">Based in Buenos Aires · Open to global roles</p>
            <p className="display-md text-text-primary" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
              Let&apos;s make something<br />
              <span className="gradient-text">worth remembering.</span>
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href="mailto:martinalanzi@gmail.com"
              className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
            >
              martinalanzi@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/martinalanzi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <hr className="hairline my-10" />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Martina Lanzi. All rights reserved.
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex gap-5" role="list">
              {[
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs text-text-muted hover:text-text-secondary transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
