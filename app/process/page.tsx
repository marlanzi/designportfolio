"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";

type ProjectType = "0to1" | "rapid" | "design-system" | "redesign";

const PROJECT_TYPES: { id: ProjectType; label: string; note: string }[] = [
  { id: "0to1",          label: "0→1 Product",    note: "Full research through ship" },
  { id: "rapid",         label: "Rapid Prototype", note: "Compressed timeline, focused brief" },
  { id: "design-system", label: "Design System",   note: "Component-first, token-led" },
  { id: "redesign",      label: "Redesign",        note: "Audit, prioritize, iterate" },
];

const PHASES = [
  {
    name: "Research",
    weeks: 2,
    startWeek: 1,
    detail: "User interviews, competitive analysis, and desk research to understand the problem space deeply.",
    skipWhen: "Rapid prototyping or when constraints are already well-understood.",
    color: "#4285f4",
  },
  {
    name: "Discovery",
    weeks: 1,
    startWeek: 3,
    detail: "Synthesis of research findings into insights, opportunity areas, and a clear problem statement.",
    skipWhen: "When the brief is already tightly scoped.",
    color: "#7c4dff",
  },
  {
    name: "Flows & IA",
    weeks: 1,
    startWeek: 4,
    detail: "Mapping user flows, information architecture, and key decision points before going visual.",
    skipWhen: "Simple single-screen features or iterative improvements.",
    color: "#9c27b0",
  },
  {
    name: "Wireframes",
    weeks: 1.5,
    startWeek: 5,
    detail: "Low-fidelity wireframes to validate layout and hierarchy with stakeholders quickly.",
    skipWhen: "Well-established design systems where patterns are reused.",
    color: "#673ab7",
  },
  {
    name: "UI Design",
    weeks: 3,
    startWeek: 6.5,
    detail: "High-fidelity screens, component design, and interactive prototypes for testing.",
    skipWhen: "Never skipped — always part of the process.",
    color: "#d4a257",
  },
  {
    name: "User Testing",
    weeks: 1,
    startWeek: 9.5,
    detail: "Moderated usability sessions with 5–8 participants to validate assumptions and uncover pain points.",
    skipWhen: "Ultra-tight timelines — replaced with expert review.",
    color: "#2e7d52",
  },
  {
    name: "Iterate",
    weeks: 1.5,
    startWeek: 10.5,
    detail: "Applying findings from testing, refining edge cases, and polishing interactions.",
    skipWhen: "Rarely skipped — even small iterations improve quality significantly.",
    color: "#00897b",
  },
  {
    name: "Dev Handoff",
    weeks: 1,
    startWeek: 11,
    detail: "Annotated specs, component documentation, redlines, and developer Q&A sessions.",
    skipWhen: "Embedded teams with continuous delivery — handoff is ongoing.",
    color: "#e65100",
  },
  {
    name: "Ship",
    weeks: 0.5,
    startWeek: 12,
    detail: "Final QA pass, launch coordination, and tracking early metrics post-release.",
    skipWhen: "Never — shipping is the whole point.",
    color: "#c62828",
  },
];

const TOTAL_WEEKS = 12;

export default function ProcessPage() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<ProjectType>("0to1");
  const selectedPhase = PHASES.find((p) => p.name === activePhase);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="container-editorial pt-36 pb-20">
        <p className="text-label mb-6 animate-fade-up">How I work</p>
        <h1
          className="text-text-primary font-bold leading-none animate-fade-up animate-fade-up-1"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          My process
        </h1>
        <p className="mt-8 max-w-md text-text-secondary leading-relaxed animate-fade-up animate-fade-up-2">
          I don&apos;t believe in one-size-fits-all.{" "}
          <strong className="text-text-primary font-semibold">
            Every project gets the approach it needs.
          </strong>{" "}
          Sometimes deep research, sometimes shipping in a week.
        </p>
      </div>

      <hr className="hairline" />

      {/* Timeline section */}
      <div className="container-editorial py-20">
        {/* Project type selector */}
        <Reveal>
          <div className="mb-12">
            <p className="text-label mb-5">What kind of project?</p>
            <div className="flex flex-wrap gap-3">
              {PROJECT_TYPES.map(({ id, label, note }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveType(id)}
                  className={[
                    "flex flex-col gap-0.5 rounded-xl border px-5 py-3 text-left transition-all duration-200",
                    activeType === id
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border text-text-secondary hover:border-text-muted hover:text-text-primary",
                  ].join(" ")}
                >
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-xs opacity-70">{note}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-label">Typical timeline</p>
            <span className="text-label">~{TOTAL_WEEKS} weeks</span>
          </div>

          {/* Week labels */}
          <div
            className="mb-2 grid text-[10px] text-text-muted font-medium"
            style={{ gridTemplateColumns: `repeat(${TOTAL_WEEKS}, 1fr)` }}
          >
            {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
              <span key={i} className="text-center">W{i + 1}</span>
            ))}
          </div>

          {/* Gantt */}
          <div className="relative h-12 overflow-hidden rounded-lg bg-bg-raised">
            {PHASES.map((phase) => {
              const left = ((phase.startWeek - 1) / TOTAL_WEEKS) * 100;
              const width = (phase.weeks / TOTAL_WEEKS) * 100;
              const isActive = activePhase === phase.name;
              return (
                <button
                  key={phase.name}
                  type="button"
                  onClick={() => setActivePhase(isActive ? null : phase.name)}
                  className="absolute top-1 h-10 rounded-md flex items-center justify-center px-2 text-[11px] font-semibold text-white transition-all hover:brightness-110"
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    backgroundColor: phase.color,
                    outline: isActive ? `2px solid ${phase.color}` : "none",
                    outlineOffset: "2px",
                  }}
                  title={phase.name}
                  aria-pressed={isActive}
                >
                  <span className="truncate">{phase.name}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-text-muted">
            Click any phase to learn when I use it, and when I skip it.
          </p>
        </Reveal>

        {/* Phase detail panel */}
        <AnimatePresence mode="wait">
          {selectedPhase && (
            <motion.div
              key={selectedPhase.name}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 rounded-xl border border-border bg-bg-surface p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ backgroundColor: selectedPhase.color }}
                      aria-hidden="true"
                    />
                    <h3 className="font-semibold text-text-primary">
                      {selectedPhase.name}
                    </h3>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{selectedPhase.detail}</p>
                  <p className="text-sm text-text-muted">
                    <span className="font-semibold text-text-secondary">When I skip it: </span>
                    {selectedPhase.skipWhen}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePhase(null)}
                  className="shrink-0 text-text-muted hover:text-text-primary transition-colors text-lg"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Principles */}
      <div className="bg-bg-surface border-y border-border py-20">
        <div className="container-editorial">
          <Reveal>
            <p className="text-label mb-16">Design principles</p>
          </Reveal>

          <motion.ol
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "200px 0px 0px 0px" }}
            className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
          >
            {[
              {
                n: "I",
                title: "Start with the system, not the screen",
                body: "A beautiful screen inside a broken flow is still broken. I map the whole before I design the part.",
              },
              {
                n: "II",
                title: "Ambiguity is a design material",
                body: "The best work I've done started with an unclear brief. Turning fog into focus is half the job.",
              },
              {
                n: "III",
                title: "Trust is earned at every interaction",
                body: "Users don't read. They feel. Every micro-decision either builds or erodes confidence.",
              },
              {
                n: "IV",
                title: "Shipping beats perfection",
                body: "Design decisions have a half-life. Get work in front of real users early, then iterate from evidence.",
              },
              {
                n: "V",
                title: "Constraints are creative fuel",
                body: "A tight brief, a small team, a legacy codebase — limits clarify what matters. I work with them, not against them.",
              },
              {
                n: "VI",
                title: "Collaboration is part of the craft",
                body: "The best design decisions I've made weren't made alone. Engineers and PMs see things designers miss.",
              },
            ].map((p) => (
              <motion.li key={p.n} variants={fadeUp} className="flex flex-col gap-3">
                <span className="text-label">{p.n}</span>
                <h3 className="font-semibold text-text-primary leading-tight">{p.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </div>
  );
}
