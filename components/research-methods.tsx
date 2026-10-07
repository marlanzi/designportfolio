"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ease } from "@/lib/motion";

/* Discovery methods — Observe, Listen, Measure — with illustrations drawn as SVG
   on one shared 320×220 grid and one stroke weight, so the three read as a set.
   Colours come from the theme tokens, so they hold up in light and dark. */

const INK = "var(--text-primary)";
const MUTED = "var(--text-muted)";
const SURFACE = "var(--bg-elevated)";
const ACCENT = "var(--quentro)";
const SOFT = "var(--quentro-soft)";
/* Strokes don't scale with the drawing, so every line renders at the same crisp
   width whatever the column size */
const LINE = {
  stroke: INK,
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};
const THIN = { ...LINE, stroke: MUTED, strokeWidth: 1.25 };

/* Soft backdrop shared by all three scenes */
function Backdrop() {
  return (
    <path
      d="M38 150c-14-46 18-92 74-104 40-9 62 8 96 2 46-8 86 10 92 52 7 46-22 86-78 94-40 6-66-6-102-2-42 4-70-4-82-42z"
      fill={SOFT}
    />
  );
}

/* A small standing figure for the queue */
function Figure({ x, base, s = 1 }: { x: number; base: number; s?: number }) {
  const h = (v: number) => base - v * s;
  return (
    <g {...THIN} fill={SURFACE}>
      <circle cx={x} cy={h(56)} r={6.5 * s} />
      <path d={`M${x - 9 * s} ${h(24)}V${h(38)}c0-6 4-9 ${9 * s}-9s${9 * s} 3 ${9 * s} 9V${h(24)}z`} />
      <path d={`M${x - 4 * s} ${h(24)}L${x - 5 * s} ${base}M${x + 4 * s} ${h(24)}L${x + 5 * s} ${base}`} fill="none" />
    </g>
  );
}

/* 01 · Observe — watching someone use Quentro on the way in, without guidance */
function ObserveArt() {
  return (
    <svg viewBox="0 0 320 220" className="h-auto w-full" aria-hidden="true">
      <Backdrop />
      {/* Ground */}
      <path d="M24 196h272" {...THIN} fill="none" />
      {/* Venue gate */}
      <g {...LINE} fill={SURFACE}>
        <rect x="160" y="74" width="11" height="122" rx="2" />
        <rect x="263" y="74" width="11" height="122" rx="2" />
        <rect x="152" y="62" width="130" height="14" rx="3" />
        <rect x="197" y="38" width="40" height="24" rx="4" />
      </g>
      <path d="M212 44l9 6-9 6 3-6z" fill={ACCENT} />
      {/* Queue going through the gate */}
      <Figure x={196} base={196} s={0.95} />
      <Figure x={220} base={196} s={0.9} />
      <Figure x={244} base={196} s={0.95} />
      {/* Person observed, from behind, phone in hand */}
      <g {...LINE}>
        <path d="M42 196v-38c0-26 16-38 38-38s38 12 38 38v38" fill={SURFACE} />
        <path d="M56 140c-6 10-8 26-6 56M104 140c6 10 8 26 6 56" fill="none" />
        <rect x="46" y="150" width="22" height="30" rx="6" fill={SURFACE} />
        {/* Head from behind: all hair, with a bun */}
        <circle cx="80" cy="92" r="18" fill={INK} />
        <circle cx="80" cy="66" r="7" fill={INK} />
        <path d="M110 146c8-4 14-12 18-22" fill="none" />
      </g>
      <g transform="rotate(14 132 112)">
        <rect x="124" y="96" width="17" height="30" rx="4" fill={INK} />
        <rect x="127" y="100" width="11" height="20" rx="2" fill={ACCENT} />
      </g>
      <path d="M150 96l6-5M152 106l8-1M147 86l3-7" {...LINE} stroke={ACCENT} fill="none" />
      {/* Observation frame */}
      <path
        d="M32 70V58h12M128 58h12v12M32 176v12h12M128 188h12v-12"
        {...LINE}
        stroke={ACCENT}
        fill="none"
        transform="translate(-4 0)"
      />
    </svg>
  );
}

/* 02 · Listen — support cases and interviews */
function ListenArt() {
  return (
    <svg viewBox="0 0 320 220" className="h-auto w-full" aria-hidden="true">
      <Backdrop />
      {/* Person behind the laptop */}
      <g {...LINE}>
        <path d="M108 180v-22c0-24 22-34 52-34s52 10 52 34v22" fill={SURFACE} />
        <circle cx="160" cy="92" r="21" fill={SURFACE} />
        <path d="M139 92c0-14 9-23 21-23s21 9 21 23c-5-7-12-10-21-10s-16 3-21 10z" fill={INK} />
        <circle cx="160" cy="62" r="8" fill={INK} />
        <circle cx="152" cy="96" r="5" fill="none" />
        <circle cx="168" cy="96" r="5" fill="none" />
        <path d="M157 96h6M155 106c3 2 7 2 10 0" fill="none" />
      </g>
      {/* Laptop, seen from the back */}
      <g {...LINE} fill={SURFACE}>
        <path d="M116 134h88l-6 46h-76z" />
      </g>
      <circle cx="160" cy="157" r="3.5" fill={MUTED} />
      <path d="M70 180h180" {...LINE} fill="none" />
      {/* Speech bubbles */}
      <g {...LINE} stroke={ACCENT} fill={SURFACE}>
        <path d="M58 44h34a6 6 0 016 6v20a6 6 0 01-6 6H80l-8 8v-8H58a6 6 0 01-6-6V50a6 6 0 016-6z" />
      </g>
      <text x="75" y="67" textAnchor="middle" fontSize="20" fontWeight="700" fill={ACCENT} fontFamily="inherit">
        ?
      </text>
      <g {...THIN} fill={SURFACE}>
        <path d="M52 104h30a6 6 0 016 6v12a6 6 0 01-6 6h-4l-6 6v-6H52a6 6 0 01-6-6v-12a6 6 0 016-6z" />
      </g>
      <g fill={INK}>
        <circle cx="58" cy="116" r="2.2" />
        <circle cx="67" cy="116" r="2.2" />
        <circle cx="76" cy="116" r="2.2" />
      </g>
      <path d="M222 38h40a7 7 0 017 7v14a7 7 0 01-7 7h-26l-8 7v-7h-6a7 7 0 01-7-7V45a7 7 0 017-7z" {...THIN} strokeDasharray="3 4" fill="none" />
      <path d="M220 82h48a8 8 0 018 8v16a8 8 0 01-8 8h-30l-10 9v-9h-8a8 8 0 01-8-8V90a8 8 0 018-8z" fill={ACCENT} />
      <path d="M228 100c4-8 9-8 10 0s6 8 10 0 6-8 10 0" fill="none" stroke={SURFACE} strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
    </svg>
  );
}

/* 03 · Measure — surveys */
function MeasureArt() {
  const reduce = useReducedMotion();
  const grow: Variants = {
    hidden: { scaleY: reduce ? 1 : 0 },
    visible: (i: number) => ({ scaleY: 1, transition: { duration: 0.7, ease: ease.out, delay: 0.3 + i * 0.12 } }),
  };
  const pop: Variants = {
    hidden: { scale: reduce ? 1 : 0 },
    visible: (i: number) => ({ scale: 1, transition: { type: "spring", stiffness: 380, damping: 18, delay: 0.7 + i * 0.15 } }),
  };
  const bars = [
    { x: 62, h: 38, o: 0.35 },
    { x: 88, h: 64, o: 0.65 },
    { x: 114, h: 94, o: 1 },
  ];
  return (
    <motion.svg
      viewBox="0 0 320 220"
      className="h-auto w-full"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <Backdrop />
      {/* Results card */}
      <rect x="40" y="46" width="156" height="146" rx="14" fill={SURFACE} {...THIN} />
      <path d="M56 172h120" {...THIN} fill="none" />
      {bars.map((b, i) => (
        <motion.rect
          key={b.x}
          x={b.x}
          y={172 - b.h}
          width="18"
          height={b.h}
          rx="3"
          fill={ACCENT}
          fillOpacity={b.o}
          custom={i}
          variants={grow}
          style={{ transformBox: "fill-box", originY: 1 }}
        />
      ))}
      <circle cx="160" cy="80" r="17" fill={ACCENT} fillOpacity="0.22" />
      <path d="M160 80V63a17 17 0 0116.2 22.2z" fill={ACCENT} />
      <path d="M144 114h32M144 128h26M144 142h30" {...THIN} fill="none" />
      {/* Survey card */}
      <rect x="208" y="70" width="84" height="98" rx="14" fill={SURFACE} {...THIN} />
      <g {...LINE} stroke={ACCENT} fill="none">
        <circle cx="228" cy="90" r="4.5" />
        <path d="M220 101c1-5 4-7 8-7s7 2 8 7" />
      </g>
      {[118, 144].map((y, i) => (
        <motion.g key={y} custom={i} variants={pop} style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}>
          <circle cx="228" cy={y} r="8" fill={ACCENT} />
          <path d={`M224 ${y}l3 3 5-6`} fill="none" stroke={SURFACE} strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>
      ))}
      <path d="M244 92h34M244 118h34M244 144h28" {...THIN} fill="none" />
    </motion.svg>
  );
}

const METHODS = [
  {
    verb: "Observe",
    method: "Ethnography",
    text: "People using Quentro in context, without guidance.",
    Art: ObserveArt,
  },
  {
    verb: "Listen",
    method: "Support cases + interviews",
    text: "The pain points that repeated most in support and interviews.",
    Art: ListenArt,
  },
  {
    verb: "Measure",
    method: "Surveys",
    text: "Surveys of online shoppers and Quentro users.",
    Art: MeasureArt,
  },
];

const step: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.out } },
};

export function ResearchMethods() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6 lg:gap-8"
      role="list"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {METHODS.map(({ verb, method, text, Art }, i) => (
        <Fragment key={verb}>
          {i > 0 && (
            <motion.span variants={step} className="hidden self-center pt-16 text-text-muted md:block" aria-hidden="true">
              <svg viewBox="0 0 40 12" className="h-3 w-10">
                <path d="M2 6h35M31 1l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          )}
          <motion.div variants={step} role="listitem" className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-quentro-soft text-[15px] font-semibold tabular-nums text-quentro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[1.25rem] font-semibold leading-none tracking-[-0.02em] text-text-primary">{verb}</h3>
                <p className="text-[11px] font-semibold uppercase leading-none tracking-[0.16em] text-text-muted">{method}</p>
              </div>
            </div>
            <Art />
            <p className="max-w-[32ch] text-[14px] leading-relaxed text-text-secondary">{text}</p>
          </motion.div>
        </Fragment>
      ))}
    </motion.div>
  );
}
