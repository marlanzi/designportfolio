"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";

const PROJECTS = [
  {
    slug: "google-ccs",
    index: "01",
    company: "Google",
    name: "Creative Content Studio",
    tagline: "Three surfaces. One content system.",
    year: "2023",
    tags: ["Multi-surface UX", "Design Systems", "Content Ops"],
    image: "/project-1.avif",
  },
  {
    slug: "google-notes",
    index: "02",
    company: "Google",
    name: "Notes by Google",
    tagline: "Turned a production gap into a system — and removed the designer from the middle.",
    year: "2023",
    tags: ["Figma Plugin Dev", "Theming", "Cross-team Collab"],
    image: "/project-2.avif",
  },
  {
    slug: "santander",
    index: "03",
    company: "Santander",
    name: "Digital Help Center",
    tagline: "Santander's support was branch-first, by default. We changed that.",
    year: "2021",
    tags: ["Information Architecture", "Salesforce", "Stakeholder Workshops"],
    image: "/project-3.avif",
  },
  {
    slug: "quentro",
    index: "04",
    company: "Quentro",
    name: "Event Ticketing App",
    tagline: "Most users never made it past the first screen. We fixed that.",
    year: "2022",
    tags: ["Mobile UX", "Onboarding", "Usability Testing"],
    image: null,
  },
];

export function HomepageFeaturedWork() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="container-editorial py-32 relative"
      aria-label="Selected work"
      onMouseMove={handleMouseMove}
    >
      {/* Floating image preview */}
      {hoveredSlug && (
        <motion.div
          className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
          style={{
            width: 280,
            height: 180,
            left: mousePos.x + 24,
            top: mousePos.y - 90,
          }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {PROJECTS.find(p => p.slug === hoveredSlug)?.image && (
            <Image
              src={PROJECTS.find(p => p.slug === hoveredSlug)!.image!}
              alt=""
              fill
              sizes="280px"
              className="object-cover"
            />
          )}
        </motion.div>
      )}

      <hr className="hairline mb-16" />

      <Reveal>
        <div className="flex items-end justify-between mb-16 gap-8">
          <p className="text-label">Selected work</p>
          <Link
            href="/work"
            className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
          >
            View all →
          </Link>
        </div>
      </Reveal>

      <motion.ol
        variants={stagger(0.07)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "200px 0px 0px 0px" }}
        className="flex flex-col"
        role="list"
      >
        {PROJECTS.map((project) => (
          <motion.li key={project.slug} variants={fadeUp}>
            <Link
              href={`/work/${project.slug}`}
              className="group block border-t border-border py-8 transition-all duration-200 hover:border-accent/20"
              aria-label={`${project.company} — ${project.name}`}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-6 sm:items-center">
                <span className="text-label mt-1" style={{ minWidth: "2rem" }} aria-hidden="true">
                  {project.index}
                </span>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                  <div>
                    <p className="text-xs text-text-muted mb-1">{project.company}</p>
                    <h3 className="text-xl font-semibold text-text-primary leading-tight group-hover:text-accent transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <span className="hidden sm:block text-label">{project.year}</span>
                  <span
                    className="text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </div>
              </div>

              <div className="mt-4 ml-[calc(2rem+1.5rem)] flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full border border-border text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ol>

      <hr className="hairline" />
    </section>
  );
}
