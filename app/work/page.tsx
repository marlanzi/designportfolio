"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";

const PROJECTS = [
  {
    slug: "tenor-caption",
    index: "01",
    company: "C+E Studio · Google",
    name: "Tenor Creator Experience",
    tagline: "The world's largest GIF keyboard — and its creator tools were holding it back.",
    stat: "0→1",
    statLabel: "Dynamic Text captioning introduced to Tenor",
    year: "2022–2023",
    role: "Sr. Product Designer",
    tags: ["Creator Tools", "Feature Definition", "Mobile UX", "Wireframing"],
  },
  {
    slug: "google-notes",
    index: "02",
    company: "C+E Studio · Google",
    name: "Notes by Google",
    tagline: "Turned a creative production gap into a system — removing the designer from the middle.",
    stat: "100%",
    statLabel: "Theme export fidelity via JSON — no detail lost in handoff",
    year: "2023",
    role: "Sr. Product Designer",
    tags: ["Plugin Dev", "Theming", "Cross-team Collab", "Interaction Design"],
  },
  {
    slug: "google-dynamic-text",
    index: "03",
    company: "C+E Studio · Google",
    name: "Dynamic Text",
    tagline: "Typed phrases turned into animated, expressive assets — shipped across Gboard and YouTube Create.",
    stat: "1.2B",
    statLabel: "Dynamic Text shares in 2023 · 78% CTR",
    year: "2022–2024",
    role: "Sr. Product Designer",
    tags: ["Gboard", "YouTube Create", "Content UX", "Localization", "Competitive Research"],
  },
  {
    slug: "santander",
    index: "04",
    company: "Santander",
    name: "Digital Help Center",
    tagline: "Santander's support model was branch-first, by default. We changed that.",
    stat: "6.7%",
    statLabel: "Reduction in contact ratio — 77,545 fewer contacts/month",
    year: "2021",
    role: "UX Designer",
    tags: ["Information Architecture", "Web & Mobile", "Salesforce", "Stakeholder Workshops"],
  },
  {
    slug: "quentro",
    index: "05",
    company: "Quentro",
    name: "Event Ticketing App",
    tagline: "Most users never made it past the first screen. We diagnosed and rebuilt from there.",
    stat: "8",
    statLabel: "Moderated usability sessions → rebuilt onboarding & discovery",
    year: "2019",
    role: "UX Designer",
    tags: ["Mobile UX", "Onboarding", "Usability Testing", "Conversion"],
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="container-editorial pt-36 pb-20">
        <p className="text-label mb-6 animate-fade-up">Selected work — 2021–2024</p>
        <h1
          className="text-text-primary font-bold leading-none animate-fade-up animate-fade-up-1"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Projects I&apos;ve shaped
        </h1>
        <p className="mt-8 max-w-lg text-text-secondary leading-relaxed animate-fade-up animate-fade-up-2">
          From 0→1 mobile to enterprise-scale systems — each project demanded
          a different kind of thinking.
        </p>
      </div>

      <hr className="hairline" />

      {/* Project list */}
      <div className="container-editorial">
        <ol className="flex flex-col" role="list">
          {PROJECTS.map((project, i) => (
            <li
              key={project.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group block border-b border-border py-10 transition-colors duration-200"
                aria-label={`${project.company} — ${project.name}`}
              >
                {/* Top row: index + content + stat + arrow */}
                <div className="flex items-start gap-6">
                  {/* Index */}
                  <span className="text-label pt-1 hidden lg:block shrink-0 w-12" aria-hidden="true">
                    {project.index}
                  </span>

                  {/* Name + company + tagline + tags */}
                  <div className="flex-1 min-w-0 flex flex-col gap-3">
                    <div>
                      <p className="text-xs text-text-muted mb-2">{project.company} · {project.role} · {project.year}</p>
                      <h2
                        className="font-bold text-text-primary group-hover:text-accent transition-colors duration-300 leading-tight"
                        style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", letterSpacing: "-0.025em" }}
                      >
                        {project.name}
                      </h2>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-lg">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full border border-border text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden lg:flex items-start pt-1 shrink-0">
                    <span
                      className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Bottom CTA */}
      <div className="container-editorial py-24">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-text-primary font-bold"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
            >
              Want to see what&apos;s inside?
            </p>
            <Link
              href="/contact"
              className="text-sm text-text-muted hover:text-accent transition-colors duration-200 shrink-0"
            >
              Get in touch →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
