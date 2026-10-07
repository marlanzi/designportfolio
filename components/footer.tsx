"use client";

import Link from "next/link";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-editorial pt-28 pb-10 lg:pt-40">
        {/* Closing statement */}
        <Link href="/contact" className="group block" aria-label="Get in touch — let's make it clearer">
          <p className="display-statement text-text-primary">
            Have a complex
            <br />
            product problem?
          </p>
          <p className="display-statement mt-2 text-text-muted transition-colors duration-500 group-hover:text-text-primary">
            Let&rsquo;s make it clearer.{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-500 group-hover:translate-x-3 motion-reduce:transition-none"
            >
              →
            </span>
          </p>
        </Link>

        <div className="mt-20 grid gap-10 border-t border-border pt-6 lg:mt-28 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <p className="text-label">Email</p>
            <a
              href="mailto:mar.lanzi96@gmail.com"
              className="w-fit border-b border-transparent text-xl font-medium tracking-[-0.02em] text-text-primary transition-colors duration-300 hover:border-current lg:text-2xl"
            >
              mar.lanzi96@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-3">
            <p className="text-label">Elsewhere</p>
            <a
              href="https://www.linkedin.com/in/martinalanzi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-text-secondary transition-colors duration-300 hover:text-text-primary"
            >
              LinkedIn ↗
            </a>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-3 lg:col-start-10">
            <p className="text-label">Availability</p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Available for selected freelance projects and product opportunities.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-border pt-6 text-sm lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-5">
            <span className="font-medium text-text-primary">Martina Lanzi</span>
            <span className="text-text-secondary">Product Designer</span>
            <span className="text-text-secondary">Buenos Aires · Worldwide</span>
          </div>
          <nav aria-label="Footer navigation" className="lg:col-span-4">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-text-secondary transition-colors duration-200 hover:text-text-primary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-text-muted lg:col-span-3 lg:text-right">© {new Date().getFullYear()} Martina Lanzi</p>
        </div>
      </div>
    </footer>
  );
}
