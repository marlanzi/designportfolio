"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

/* Visual building blocks for case studies — real project imagery plus
   small diagrams rebuilt from project data, so they follow the site theme. */

/* ─── Image figure ─────────────────────────────────────────────── */
export function CaseImage({
  src,
  width,
  height,
  alt,
  caption,
  tone = "raised",
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  tone?: "raised" | "dark";
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div
        className={`overflow-hidden rounded-[16px] border border-border p-3 sm:p-5 ${
          tone === "dark" ? "bg-[#1c1c1c]" : "bg-bg-raised"
        }`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 1280px) 1200px, 94vw"
          className="h-auto w-full rounded-[10px]"
        />
      </div>
      {caption && <figcaption className="text-[13px] text-text-secondary">{caption}</figcaption>}
    </figure>
  );
}

export function ImagePair({ children }: { children: React.ReactNode }) {
  return <div className="grid items-start gap-6 md:grid-cols-2">{children}</div>;
}

/* ─── Phone recording ──────────────────────────────────────────── */
export function PhoneVideo({
  src,
  poster,
  width,
  height,
  label,
  caption,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Describes the recording for screen readers */
  label: string;
  caption?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex justify-center overflow-hidden rounded-[16px] border border-border bg-bg-raised p-5 sm:p-8">
        <video
          src={src}
          poster={poster}
          width={width}
          height={height}
          aria-label={label}
          autoPlay={!reduce}
          controls={!!reduce}
          loop
          muted
          playsInline
          preload="metadata"
          className="h-auto w-full max-w-[300px]"
        />
      </div>
      {caption && <figcaption className="text-[13px] text-text-secondary">{caption}</figcaption>}
    </figure>
  );
}

/* ─── At a glance ──────────────────────────────────────────────── */
export function AtAGlance({ items }: { items: { label: string; text: string }[] }) {
  return (
    <div className="grid overflow-hidden rounded-[16px] border border-border md:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`flex flex-col gap-3 bg-bg-elevated p-6 lg:p-8 ${
            i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""
          }`}
        >
          <span className="text-label">{item.label}</span>
          <p className="text-[17px] leading-snug tracking-[-0.01em] text-text-primary">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── KPI cards ────────────────────────────────────────────────── */
export function KpiCards({
  items,
}: {
  items: { tag: string; value: string; title: string; text: string; baseline: string }[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((kpi) => (
        <div key={kpi.title} className="flex flex-col rounded-[16px] border border-border bg-bg-elevated p-6 lg:p-8">
          <span className="w-fit rounded-full border border-border px-2.5 py-0.5 text-[12px] text-text-secondary">{kpi.tag}</span>
          <span className="mt-6 font-medium leading-none tracking-[-0.05em] text-[#EC0000] text-[clamp(3rem,6vw,4.5rem)]">
            {kpi.value}
          </span>
          <span className="mt-4 text-[17px] font-medium tracking-[-0.01em] text-text-primary">{kpi.title}</span>
          <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{kpi.text}</p>
          <p className="mt-auto border-t border-border pt-4 text-[13px] text-text-muted">{kpi.baseline}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Help Center traffic: article ranking over a year ─────────── */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Santander red ramp, solid lines only. The two insight lines are the
// strongest and thickest; context lines sit lighter and thinner.
const TRAFFIC: { label: string; color: string; weight: number; ranks: number[] }[] = [
  { label: "Useful phone numbers", color: "#f4b1b1", weight: 2, ranks: [2, 3, 2, 2, 2, 2, 2, 2, 3, 2, 3, 4] },
  { label: "SúperLínea", color: "#e98282", weight: 2, ranks: [8, 6, 3, 3, 4, 3, 5, 4, 5, 6, 8, 7] },
  { label: "Attention channels", color: "#c24a4a", weight: 2, ranks: [6, 5, 5, 7, 6, 8, 8, 6, 6, 8, 7, 6] },
  { label: "How do I schedule a branch visit?", color: "#EC0000", weight: 3.25, ranks: [4, 4, 11, 8, 7, 6, 7, 5, 10, 9, 11, 13] },
  { label: "How can I start a claim?", color: "var(--chart-maroon)", weight: 3.25, ranks: [16, 12, 14, 14, 14, 15, 13, 13, 12, 13, 12, 10] },
];

export function TrafficChart() {
  const reduce = useReducedMotion();
  const W = 640;
  const H = 380;
  const pad = { l: 40, r: 18, t: 22, b: 36 };
  const x = (i: number) => pad.l + (i * (W - pad.l - pad.r)) / (MONTHS.length - 1);
  const y = (rank: number) => pad.t + ((rank - 1) * (H - pad.t - pad.b)) / 15;

  return (
    <figure className="traffic-chart flex flex-col gap-3">
      <div className="rounded-[16px] border border-border bg-bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
          {TRAFFIC.map((s) => (
            <span key={s.label} className="flex items-center gap-2 text-[13px] text-text-secondary">
              <span
                className="w-5 rounded-full"
                style={{ height: s.weight > 2 ? 4 : 2.5, background: s.color }}
                aria-hidden="true"
              />
              {s.label}
            </span>
          ))}
        </div>
        <div className="-mx-1 overflow-x-auto px-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Ranking of five Help Center articles across the year. Contact information stays near the top; scheduling a branch visit drops from 4th to 13th; starting a claim rises from 16th to 10th."
          >
            {[1, 4, 8, 12, 16].map((r) => (
              <g key={r}>
                <line x1={pad.l} x2={W - pad.r} y1={y(r)} y2={y(r)} stroke="var(--border)" strokeWidth="1" />
                <text x={pad.l - 12} y={y(r) + 4} textAnchor="end" fontSize="13" fill="var(--text-muted)">
                  #{r}
                </text>
              </g>
            ))}
            {MONTHS.map((m, i) => (
              <text key={m} x={x(i)} y={H - 10} textAnchor="middle" fontSize="13" fill="var(--text-muted)">
                {m}
              </text>
            ))}
            {TRAFFIC.map((s, si) => (
              <g key={s.label}>
                <motion.polyline
                  points={s.ranks.map((r, i) => `${x(i)},${y(r)}`).join(" ")}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.weight}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                  transition={{ duration: 1.4, ease: ease.out, delay: si * 0.12 }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
      <figcaption className="text-[13px] text-text-secondary">
        Help Center articles by monthly ranking (#1 = most visited). Rebuilt from a year of traffic data.
      </figcaption>
    </figure>
  );
}

/* ─── Testing scorecard ────────────────────────────────────────── */
type Finding = { text: string; score?: number };

function ScoreDots({ score }: { score: number }) {
  return (
    <span className="flex gap-1" aria-label={`${score} of 5 users`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`h-2.5 w-2.5 rounded-full ${i < score ? "bg-current" : "bg-border"}`} />
      ))}
    </span>
  );
}

function FindingColumn({ title, tone, items }: { title: string; tone: string; items: Finding[] }) {
  return (
    <div className="flex flex-col rounded-[16px] border border-border bg-bg-elevated p-6 lg:p-8">
      <span className="flex items-center gap-2 text-[13px] font-medium" style={{ color: tone }}>
        <span className="h-2 w-2 rounded-full" style={{ background: tone }} aria-hidden="true" />
        {title}
      </span>
      <ul className="mt-5 flex flex-col" role="list">
        {items.map((item) => (
          <li
            key={item.text}
            className="flex items-center justify-between gap-6 border-t border-border py-4 text-[15px] leading-snug text-text-primary"
          >
            {item.text}
            {item.score !== undefined && (
              <span className="shrink-0" style={{ color: tone }}>
                <ScoreDots score={item.score} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TestingScorecard({ passed, learned }: { passed: Finding[]; learned: Finding[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FindingColumn title="Validated" tone="#22a06b" items={passed} />
      <FindingColumn title="Learned" tone="#e5484d" items={learned} />
    </div>
  );
}

/* ─── Customer journey strip ───────────────────────────────────── */
export type JourneyStep = { title: string; text: string; /** relative width of this moment in the drawing */ share: number };

export function JourneyStrip({
  src,
  width,
  height,
  alt,
  steps,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  steps: JourneyStep[];
}) {
  const columns = steps.map((s) => `${s.share}fr`).join(" ");
  return (
    <figure className="overflow-hidden rounded-[16px] border border-border bg-white">
      {/* Scrolls sideways on narrow screens so the drawing stays legible */}
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <div className="min-w-[880px] px-4 pb-6 pt-8 sm:px-6">
          <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1280px) 1240px, 900px" className="h-auto w-full" />
          <ol className="mt-6 grid gap-4 border-t border-black/10 pt-5" style={{ gridTemplateColumns: columns }} role="list">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-1 pr-2">
                <span className="text-[11px] font-semibold tabular-nums tracking-[0.12em] text-[#8a8a8a]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] font-medium leading-snug text-[#181818]">{step.title}</span>
                <span className="text-[13px] leading-snug text-[#555555]">{step.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </figure>
  );
}

/* ─── Growth: where the product started vs. where it is now ────── */
export function GrowthStats({
  from,
  to,
  stats,
  channels,
}: {
  from: { value: string; label: string };
  to: { value: string; label: string };
  stats: { value: string; label: string }[];
  channels: string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1.4fr] md:items-stretch">
        <div className="flex flex-col justify-between gap-6 rounded-[16px] border border-border bg-bg-raised p-6 lg:p-8">
          <span className="text-label">MVP</span>
          <div>
            <span className="block font-medium leading-none tracking-[-0.05em] text-text-muted text-[clamp(2.75rem,5vw,4rem)]">
              {from.value}
            </span>
            <span className="mt-2 block text-[15px] text-text-secondary">{from.label}</span>
          </div>
        </div>
        <span className="hidden items-center text-2xl text-text-muted md:flex" aria-hidden="true">→</span>
        <div className="flex flex-col justify-between gap-6 rounded-[16px] border border-border bg-bg-elevated p-6 lg:p-8">
          <span className="text-label text-text-primary">Three years later</span>
          <div>
            <span className="block font-medium leading-none tracking-[-0.05em] text-[#EC0000] text-[clamp(3.5rem,7vw,5.5rem)]">
              {to.value}
            </span>
            <span className="mt-2 block text-[15px] text-text-secondary">{to.label}</span>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[16px] border border-border bg-bg-elevated p-6 lg:p-8">
            <span className="block font-medium leading-none tracking-[-0.04em] text-text-primary text-[clamp(2.25rem,4vw,3rem)]">
              {stat.value}
            </span>
            <span className="mt-2 block text-[15px] text-text-secondary">{stat.label}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded-[16px] border border-border bg-bg-elevated p-5 lg:px-8">
        <span className="text-label mr-2">Live in</span>
        {channels.map((channel) => (
          <span key={channel} className="rounded-full border border-border px-3 py-1 text-[13px] text-text-primary">
            {channel}
          </span>
        ))}
      </div>
    </div>
  );
}
