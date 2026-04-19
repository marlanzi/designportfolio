"use client";

import { useState } from "react";

type ProjectType = "0to1" | "rapid" | "design-system" | "redesign";

type Phase = {
  name: string;
  weeks: number;
  startWeek: number;
  color: string;
  category: "research" | "design" | "testing" | "systems" | "ship";
  detail: string;
  skipWhen: string;
};

const PROJECT_TYPES: { id: ProjectType; emoji: string; label: string }[] = [
  { id: "0to1", emoji: "🚀", label: "0→1 Product" },
  { id: "rapid", emoji: "⚡", label: "Rapid Prototype" },
  { id: "design-system", emoji: "🧱", label: "Design System" },
  { id: "redesign", emoji: "🔧", label: "Redesign" },
];

const PHASES: Phase[] = [
  {
    name: "Research",
    weeks: 2,
    startWeek: 1,
    color: "bg-blue-400",
    category: "research",
    detail:
      "User interviews, competitive analysis, and desk research to understand the problem space deeply.",
    skipWhen:
      "Rapid prototyping or when constraints are already well-understood from prior work.",
  },
  {
    name: "Discovery",
    weeks: 1,
    startWeek: 3,
    color: "bg-indigo-400",
    category: "research",
    detail:
      "Synthesis of research findings into insights, opportunity areas, and a clear problem statement.",
    skipWhen: "When the brief is already tightly scoped and research is minimal.",
  },
  {
    name: "Flows & IA",
    weeks: 1,
    startWeek: 4,
    color: "bg-violet-400",
    category: "design",
    detail:
      "Mapping user flows, information architecture, and key decision points before going visual.",
    skipWhen: "Simple single-screen features or iterative improvements.",
  },
  {
    name: "Wireframes",
    weeks: 1.5,
    startWeek: 5,
    color: "bg-purple-400",
    category: "design",
    detail:
      "Low-fidelity wireframes to validate layout and hierarchy with stakeholders quickly.",
    skipWhen: "Well-established design systems where patterns are reused.",
  },
  {
    name: "UI Design",
    weeks: 3,
    startWeek: 6.5,
    color: "bg-portfolio-accent",
    category: "design",
    detail:
      "High-fidelity screens, component design, and interactive prototypes for testing.",
    skipWhen: "Never skipped — always part of the process.",
  },
  {
    name: "User Testing",
    weeks: 1,
    startWeek: 9.5,
    color: "bg-emerald-400",
    category: "testing",
    detail:
      "Moderated usability sessions with 5–8 participants to validate assumptions and uncover pain points.",
    skipWhen: "Ultra-tight timelines — replaced with expert review or heuristic evaluation.",
  },
  {
    name: "Iterate",
    weeks: 1.5,
    startWeek: 10.5,
    color: "bg-teal-400",
    category: "design",
    detail:
      "Applying findings from testing, refining edge cases, and polishing interactions.",
    skipWhen: "Rarely skipped — even small iterations improve quality significantly.",
  },
  {
    name: "Dev Handoff",
    weeks: 1,
    startWeek: 11,
    color: "bg-orange-400",
    category: "systems",
    detail:
      "Annotated specs, component documentation, redlines, and developer Q&A sessions.",
    skipWhen: "When working in an embedded team with continuous delivery — handoff is ongoing.",
  },
  {
    name: "Ship",
    weeks: 0.5,
    startWeek: 12,
    color: "bg-red-400",
    category: "ship",
    detail:
      "Final QA pass, launch coordination, and tracking early metrics post-release.",
    skipWhen: "Never — shipping is the whole point.",
  },
];

const TOTAL_WEEKS = 12;

export function Process() {
  const [activePhase, setActivePhase] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<ProjectType>("0to1");

  const selectedPhase = PHASES.find((p) => p.name === activePhase);

  return (
    <section className="bg-white py-24" id="process">
      <div className="mx-auto max-w-6xl px-8">
        {/* Heading */}
        <div className="mb-4">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-portfolio-accent">
            How I work
          </p>
          <h2 className="font-bold text-4xl text-neutral-900">My process</h2>
        </div>
        <p className="mb-12 max-w-xl text-neutral-500 leading-relaxed">
          I don&#39;t believe in one-size-fits-all.{" "}
          <strong className="text-neutral-700">
            Every project gets the approach it needs.
          </strong>{" "}
          Sometimes deep research, sometimes shipping in a week.
        </p>

        {/* Project type selector */}
        <div className="mb-10">
          <p className="mb-4 text-sm font-medium text-neutral-500">
            What kind of project?
          </p>
          <div className="flex flex-wrap gap-3">
            {PROJECT_TYPES.map(({ id, emoji, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveType(id)}
                className={[
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  activeType === id
                    ? "border-portfolio-bg bg-portfolio-bg text-white"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-portfolio-bg hover:text-portfolio-bg",
                ].join(" ")}
              >
                <span aria-hidden="true">{emoji}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-500">
            Typical timeline
          </p>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
            ~{TOTAL_WEEKS} weeks
          </span>
        </div>

        {/* Week labels */}
        <div
          className="mb-1 grid text-[10px] font-medium text-neutral-400"
          style={{
            gridTemplateColumns: `repeat(${TOTAL_WEEKS}, 1fr)`,
          }}
        >
          {Array.from({ length: TOTAL_WEEKS }, (_, i) => (
            <span key={i} className="text-center">
              W{i + 1}
            </span>
          ))}
        </div>

        {/* Gantt bar */}
        <div
          className="relative mb-3 h-12 overflow-hidden rounded-xl bg-neutral-100"
        >
          {PHASES.map((phase) => {
            const left = ((phase.startWeek - 1) / TOTAL_WEEKS) * 100;
            const width = (phase.weeks / TOTAL_WEEKS) * 100;
            const isActive = activePhase === phase.name;
            return (
              <button
                key={phase.name}
                type="button"
                onClick={() =>
                  setActivePhase(isActive ? null : phase.name)
                }
                className={[
                  "absolute top-1 h-10 rounded-lg flex items-center justify-center px-2 text-[11px] font-semibold text-white transition-all hover:brightness-90",
                  phase.color,
                  isActive ? "ring-2 ring-offset-1 ring-neutral-900" : "",
                ].join(" ")}
                style={{ left: `${left}%`, width: `${width}%` }}
                title={phase.name}
              >
                <span className="truncate">{phase.name}</span>
              </button>
            );
          })}
        </div>

        <p className="mb-8 text-xs text-neutral-400">
          👆 Click any phase to learn when I use it, and when I skip it.
        </p>

        {/* Accordion panel */}
        {selectedPhase && (
          <div key={selectedPhase.name} className="panel-in rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-neutral-900 mb-2">
                  {selectedPhase.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-4">
                  {selectedPhase.detail}
                </p>
                <p className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-700">
                    When I skip it:
                  </span>{" "}
                  {selectedPhase.skipWhen}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActivePhase(null)}
                className="shrink-0 text-neutral-400 hover:text-neutral-700 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
