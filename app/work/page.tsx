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
    outcome: "Redesigned creator flow with Dynamic Text captioning, universal search, and 3 upload paths.",
    year: "2022–2023",
    tags: ["Creator Tools", "Feature Definition", "Mobile UX", "Wireframing"],
    accent: "#00b4d8",
  },
  {
    slug: "google-notes",
    index: "02",
    company: "C+E Studio · Google",
    name: "Notes by Google",
    tagline: "Turned a creative production gap into a system — removing the designer from the middle.",
    outcome: "Figma plugin put CCS assets directly in the hands of iOS and AGA engineers.",
    year: "2023",
    tags: ["Plugin Dev", "Theming", "Cross-team Collab", "Interaction Design"],
    accent: "#7c4dff",
  },
  {
    slug: "google-dynamic-text",
    index: "03",
    company: "C+E Studio · Google",
    name: "Dynamic Text",
    tagline: "Typed phrases turned into animated, expressive assets — shipped across Gboard and YouTube Create.",
    outcome: "~3.5M assets shared per day. 78% CTR. 1.2B Dynamic Text shares in 2023.",
    year: "2022–2024",
    tags: ["Gboard", "YouTube Create", "Content UX", "Localization", "Competitive Research"],
    accent: "#4285f4",
  },
  {
    slug: "santander",
    index: "04",
    company: "Santander",
    name: "Digital Help Center",
    tagline: "Santander's support model was branch-first, by default. We changed that.",
    outcome: "6.7% reduction in contact ratio — 77,545 fewer contacts/month.",
    year: "2021",
    tags: ["Information Architecture", "Web & Mobile", "Salesforce", "Stakeholder Workshops"],
    accent: "#ec0000",
  },
  {
    slug: "quentro",
    index: "05",
    company: "Quentro",
    name: "Event Ticketing App",
    tagline: "Most users never made it past the first screen. We diagnosed and rebuilt from there.",
    outcome: "Reduced first-use abandonment. Rebuilt onboarding and ticket discovery flow.",
    year: "2019",
    tags: ["Mobile UX", "Onboarding", "Usability Testing", "Conversion"],
    accent: "#00e5ff",
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
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3rem_1fr_1fr_auto]">
                  {/* Index */}
                  <span className="text-label pt-1 hidden lg:block" aria-hidden="true">
                    {project.index}
                  </span>

                  {/* Name + company */}
                  <div>
                    <p className="text-xs text-text-muted mb-2">{project.company} · {project.year}</p>
                    <h2
                      className="font-bold text-text-primary group-hover:text-accent transition-colors duration-300 leading-tight"
                      style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)", letterSpacing: "-0.025em" }}
                    >
                      {project.name}
                    </h2>
                  </div>

                  {/* Tagline + outcome */}
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {project.tagline}
                    </p>
                    <p className="text-xs text-accent leading-relaxed">
                      ↳ {project.outcome}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-start justify-end pt-1">
                    <span
                      className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2 lg:ml-[calc(3rem+1.5rem)]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full border border-border text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
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
