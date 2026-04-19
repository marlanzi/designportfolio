"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";

/* ─── Data ─────────────────────────────────────────────────────── */
const EXPERIENCE = [
  {
    id: "dualboot",
    company: "Dualboot Partners",
    role: "Sr. Product Designer",
    period: "Dec 2024 — Present",
    current: true,
    logo: "/logos/dualboot.png" as string | null,
    logoBg: "bg-white",
    logoClass: "bg-blue-500/15 text-blue-400",
    description:
      "Designed and evolved a multi-product LMS ecosystem used by public safety organizations, balancing complex workflows with intuitive UX.",
    highlights: [
      "Owned information architecture and navigation unification efforts across training, policy, reporting, and admin experiences",
      "Drove research initiatives (open/closed card sorting, admin and end-user studies) to validate mental models and reduce cognitive load",
    ],
  },
  {
    id: "google",
    company: "Google · via Blink",
    role: "Sr. Product Designer",
    period: "May 2022 — Mar 2024",
    current: false,
    logo: "/logos/google.svg" as string | null,
    logoBg: "bg-white",
    logoClass: "bg-blue-500/15 text-blue-400",
    description:
      "Partnered with developers to align design decisions with technical constraints and scalability needs.",
    highlights: [
      "Integrated creative products into ecosystems like Gboard, YouTube and Tenor — tracked metrics and drove adoption proposals",
      "Collaborated closely with the MCF team on shared cross-product initiatives",
    ],
  },
  {
    id: "santander",
    company: "Santander Tecnología",
    role: "Ssr. Product Designer",
    period: "Sep 2020 — May 2022",
    current: false,
    logo: "/logos/santander.png" as string | null,
    logoBg: "bg-white",
    logoClass: "bg-red-500/15 text-red-400",
    description:
      "Designed a Help Center from scratch aligning product strategy with business OKRs and KPIs.",
    highlights: [
      "Collaborated with stakeholders to ensure strategic alignment",
      "Reduced contact ratio by 6.7% — equivalent to 77,545 fewer contacts/month",
    ],
  },
  {
    id: "crowder",
    company: "Crowder",
    role: "Jr. UX Designer",
    period: "Jun 2019 — Jul 2020",
    current: false,
    logo: "/logos/quentro.svg" as string | null,
    logoBg: "bg-[#0d1f2d]",
    logoClass: "bg-green-500/15 text-green-400",
    description:
      "User research to understand behavior and bring insights to design discussions.",
    highlights: [
      "Shared actionable user insights and demonstrated impact through flow changes",
    ],
  },
];

const EDUCATION = [
  { institution: "Universidad de Buenos Aires", degree: "Bachelor · Industrial Design", period: "2014 — 2018" },
  { institution: "MIT x PRO", degree: "Designing AI Products", period: "2023" },
  { institution: "Digital House", degree: "UX Design", period: "2019" },
  { institution: "UXER School", degree: "Design Research", period: "2020" },
];

const CERTIFICATIONS = [
  { name: "Designing and Building AI Products and Services", issuer: "MIT", year: "2023" },
  { name: "Behavioral Design", issuer: "Universidad de San Andrés", year: "2022" },
  { name: "Design Center LATAM", issuer: "Globant", year: "2020" },
  { name: "Discovery Pro", issuer: "Shiftseven", year: "2020" },
  { name: "Design Research Online", issuer: "UXER School", year: "2020" },
  { name: "Design Sprint Training", issuer: "Saltolab", year: "2020" },
  { name: "Figma MCP and Cursor Workshop", issuer: "Memorisely", year: "2025" },
];

const SKILLS = [
  { category: "Design", items: ["Product Design", "UX Research", "Design Systems", "Information Architecture", "Interaction Design", "Prototyping", "Usability Testing"] },
  { category: "Methods", items: ["Stakeholder Workshops", "Co-creation", "Competitive Analysis", "SWOT", "User Interviews", "Flow Mapping"] },
  { category: "Tools", items: ["Figma", "FigJam", "Maze", "Notion", "Jira", "Miro", "Zeplin"] },
  { category: "Domains", items: ["Fintech", "Consumer Apps", "Enterprise SaaS", "Public Safety", "Education"] },
];

/* ─── Motion variants ───────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const summaryVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Page ──────────────────────────────────────────────────────── */
export default function ExperiencePage() {
  const [openId, setOpenId] = useState<string | null>("dualboot");

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <div className="container-editorial pt-28 pb-8">
        <div className="flex items-start justify-between gap-6 flex-wrap animate-fade-up">
          <div>
            <p className="text-label mb-4">Background</p>
            <h1
              className="text-text-primary font-bold leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
            >
              Experience
            </h1>
            <p className="mt-3 text-text-secondary text-sm">
              Where I&apos;ve been and what I&apos;ve learned along the way
            </p>
          </div>
          <a
            href="/Martina Lanzi -  Dec 2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-full text-sm text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200 shrink-0 self-end"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            View Resume
          </a>
        </div>
      </div>

      <hr className="hairline" />

      {/* ── Side-by-side layout ── */}
      <div className="container-editorial pt-8 pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">

          {/* ── LEFT: Quick Summary ── */}
          <motion.div
            variants={summaryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:sticky lg:top-8 flex flex-col gap-6"
          >
            {/* Card */}
            <div className="bg-bg-raised border-t-2 border-t-accent border border-border rounded-2xl p-8">
              <p className="text-label mb-5">Quick Summary</p>
              <p
                className="text-text-primary font-bold leading-snug mb-6"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.6rem)", letterSpacing: "-0.025em" }}
              >
                6 years designing products people rely on — from startups to Google.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                I&apos;ve been designing digital products for over 6 years — from early-stage startups to global platforms at Google. Every position pushed me to think differently about how people interact with technology.
              </p>
              <p className="text-text-secondary text-sm leading-relaxed">
                Today I focus on systems that scale: research-informed, IA-grounded, and shipped with care. I work across the full product cycle and care deeply about the people using what I build.
              </p>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "6", label: "Years experience" },
                { value: "+4", label: "Industries" },
                { value: "+10", label: "Products shipped" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-bg-surface border border-border rounded-xl p-4 text-center">
                  <p className="gradient-text font-bold text-xl leading-none mb-1">{value}</p>
                  <p className="text-text-muted text-xs">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Timeline ── */}
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-0 top-3 bottom-3 w-px bg-border" />

            <div className="flex flex-col gap-3">
              {EXPERIENCE.map((job, i) => (
                <motion.div
                  key={job.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="relative"
                >
                  {/* Pulsing ring — only for current open job */}
                  {job.current && openId === job.id && (
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute w-2.5 h-2.5 rounded-full bg-accent"
                      style={{ top: 44, left: -37 }}
                    />
                  )}
                  {/* Dot — accent when selected/open, muted otherwise */}
                  <motion.div
                    animate={{
                      backgroundColor: openId === job.id ? "var(--accent)" : "var(--border)",
                      scale: openId === job.id ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute w-2.5 h-2.5 rounded-full ring-2 ring-bg-base"
                    style={{ top: 44, left: -37 }}
                  />

                  {/* Card with hover lift */}
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="bg-bg-surface border border-border rounded-2xl overflow-hidden"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
                  >
                    <button
                      onClick={() => setOpenId(openId === job.id ? null : job.id)}
                      className="w-full text-left p-5 flex items-center gap-4 hover:bg-bg-raised transition-colors duration-150"
                      aria-expanded={openId === job.id}
                    >
                      {/* Logo */}
                      {job.logo ? (
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 border border-border/40 ${job.logoBg}`}>
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${job.logoClass}`}>
                          {job.company[0]}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-text-primary text-sm">{job.company}</span>
                          {job.current && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-soft text-accent font-medium">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-secondary mt-0.5">{job.role}</p>
                        <p className="text-xs text-text-muted mt-0.5">{job.period}</p>
                      </div>

                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="text-text-muted shrink-0"
                        animate={{ rotate: openId === job.id ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </motion.svg>
                    </button>

                    <AnimatePresence initial={false}>
                      {openId === job.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                            opacity: { duration: 0.2 },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-6 pt-4 border-t border-border">
                            <p className="text-text-secondary text-sm leading-relaxed mb-4">
                              {job.description}
                            </p>
                            <ul className="flex flex-col gap-2">
                              {job.highlights.map((h, hi) => (
                                <motion.li
                                  key={h}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: hi * 0.05 + 0.1, duration: 0.25, ease: "easeOut" }}
                                  className="flex items-start gap-2 text-xs text-text-muted"
                                >
                                  <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">◆</span>
                                  {h}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="hairline" />

      {/* ── Skills ── */}
      <div className="bg-bg-surface py-20">
        <div className="container-editorial">
          <Reveal><p className="text-label mb-12">Capabilities</p></Reveal>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {SKILLS.map((group) => (
              <Reveal key={group.category}>
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-semibold text-text-primary">{group.category}</p>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="text-sm text-text-secondary">{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <hr className="hairline" />

      {/* ── Education ── */}
      <div className="container-editorial py-20">
        <Reveal><p className="text-label mb-12">Education</p></Reveal>
        <div className="flex flex-col">
          {EDUCATION.map((edu) => (
            <Reveal key={edu.institution}>
              <div className="flex flex-col gap-1 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{edu.institution}</p>
                  <p className="text-sm text-text-secondary">{edu.degree}</p>
                </div>
                <p className="text-label">{edu.period}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <hr className="hairline" />

      {/* ── Certifications ── */}
      <div className="container-editorial py-20">
        <Reveal><p className="text-label mb-12">Certifications & courses</p></Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <Reveal key={cert.name}>
              <div className="border border-border rounded-xl p-5 flex flex-col gap-2">
                <p className="text-sm font-semibold text-text-primary leading-snug">{cert.name}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <p className="text-xs text-accent">{cert.issuer}</p>
                  <p className="text-label">{cert.year}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Languages ── */}
      <div className="bg-bg-surface border-t border-border py-16">
        <div className="container-editorial">
          <Reveal><p className="text-label mb-8">Languages</p></Reveal>
          <div className="flex gap-12">
            <Reveal>
              <div>
                <p className="text-sm font-semibold text-text-primary">Spanish</p>
                <p className="text-xs text-text-muted">Bilingual / Native</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <p className="text-sm font-semibold text-text-primary">English</p>
                <p className="text-xs text-text-muted">Professional working proficiency</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
