"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MotionConfig, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { CaseStudyProgress } from "@/components/case-study-progress";
import { MaskLines } from "@/components/editorial";
import { Reveal } from "@/components/reveal";
import { ease } from "@/lib/motion";
import { TearTicket } from "@/components/tear-ticket";
import { ResearchMethods } from "@/components/research-methods";

/* Quentro case study — a research-led story about first-time ticket activation.
   Every fact, label and figure here comes from the original Quentro research
   board (journey map, pain points, survey, stakeholder map, redesigned touchpoints).
   Diagrams are rebuilt from that material so they follow the site theme. */

/* ─── Source data ──────────────────────────────────────────────── */

/* Original customer journey, before the redesign. Feelings are the emotions
   recorded for each phase on the journey map. */
const JOURNEY: { step: string; es: string; channel: string; feeling: string; code?: string }[] = [
  { step: "Choosing Quentro", es: "Elección Quentro", channel: "Web", feeling: "Uncertainty about the unknown" },
  { step: "Ticketing-site email", es: "Email ticketera", channel: "Email", feeling: "Surprise, bewilderment" },
  { step: "Phone number request", es: "Pedido celular", channel: "Web", feeling: "Disoriented: am I done? How do I continue?" },
  { step: "Verification code", es: "Código 1", channel: "Web", feeling: "Uncertainty, feeling scammed", code: "Code 01" },
  { step: "SMS with download link", es: "Recibo SMS", channel: "SMS", feeling: "Guided, but anxious" },
  { step: "Email with a second code", es: "Email código 2", channel: "Email", feeling: "Disoriented: unintuitive instructions", code: "Code 02" },
  { step: "Download the app", es: "Descargar app", channel: "App store", feeling: "Anxiety, desperation" },
  { step: "Activate the tickets", es: "Activar", channel: "App", feeling: "Distrust, fear of the unknown" },
];

/* Pain points from the research, grouped into themes */
const FRICTION = [
  {
    theme: "Cognitive friction",
    words: [
      "Confusion",
      "Disorientation",
      "Uncertainty",
      "Complexity",
    ],
    insight: "Users weren't always sure what they needed to do next.",
  },
  {
    theme: "Emotional friction",
    words: [
      "Frustration",
      "Fear",
      "Anxiety",
      "Chaos",
    ],
    insight:
      "Uncertainty becomes particularly problematic when the product controls access to an event the customer has already paid for.",
  },
  {
    theme: "Operational friction",
    words: [
      "Tedious process",
      "Disorder",
      "Loss / disappearance",
      "Theft",
    ],
    insight: "The experience had to balance ease of access with the security requirements of digital ticketing.",
  },
];

/* Redesigned journey: the activation told as one story in five steps */
const GUIDED = [
  { step: "Go to the ticketing site", es: "Ingresá a la web de la ticketera" },
  { step: "Send the tickets to your phone", es: "Envialos a tu celular", ref: "A" },
  { step: "Download the app", es: "Descargá la app", ref: "B" },
  { step: "Receive them in the app", es: "Recibilos en la app", ref: "C" },
  { step: "Get in by showing your ticket", es: "Ingresá mostrando tu ticket en Quentro", ref: "D" },
];

const PRINCIPLES = [
  {
    title: "Guide, don't expose complexity",
    text: "Technical requirements shouldn't require users to understand the system behind them.",
    answers: "Lack of cohesion between touchpoints · Scarce usage information",
  },
  {
    title: "One clear next action",
    text: "Every step should make the next action obvious.",
    answers: "Lack of hierarchy in the emails",
  },
  {
    title: "Build confidence",
    text: "Users should understand where their ticket is, what is happening and what remains before activation.",
    answers: "Absence of empathy",
  },
];

const CHAPTERS = [
  { id: "q-intro", label: "Introduction" },
  { id: "q-product", label: "The product" },
  { id: "q-challenge", label: "The challenge" },
  { id: "q-discovery", label: "Discovery" },
  { id: "q-journey", label: "The original journey" },
  { id: "q-friction", label: "What users experienced" },
  { id: "q-insight", label: "Key insight" },
  { id: "q-opportunity", label: "Design opportunity" },
  { id: "q-solution", label: "Solution" },
  { id: "q-reflection", label: "Reflection" },
];

/* ─── Small shared pieces ──────────────────────────────────────── */

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

function SectionHead({
  index,
  label,
  title,
  id,
  children,
}: {
  index: string;
  label: string;
  title: React.ReactNode[];
  id: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-3">
        <p className="text-label pt-2">
          <span className="tabular-nums text-quentro">{index}</span>
          <span className="mx-2 text-text-muted" aria-hidden="true">—</span>
          {label}
        </p>
      </Reveal>
      <div className="flex flex-col gap-8 lg:col-span-9">
        <MaskLines
          as="h2"
          id={id}
          className="max-w-[22ch] font-medium leading-[1.02] tracking-[-0.04em] text-text-primary text-[clamp(2rem,4.4vw,4rem)]"
          lines={title}
        />
        {children}
      </div>
    </div>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex max-w-[60ch] flex-col gap-4 text-[1.0625rem] leading-relaxed text-text-secondary ${className}`}>
      {children}
    </div>
  );
}

function Section({
  id,
  children,
  className = "",
  bordered = true,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 ${className}`}>
      <div className={`container-editorial py-24 lg:py-36 ${bordered ? "border-t border-border" : ""}`}>{children}</div>
    </section>
  );
}

/* Quentro chevron mark */
function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M6 3l10 9-10 9 4-9z" fill="currentColor" />
    </svg>
  );
}

/* ─── Dynamic ticket — the code regenerates every 15 seconds ───── */
const PERIOD = 15;
const GRID = 15;

function pattern(seed: number) {
  // Small deterministic PRNG so server and client render the same first frame
  let s = seed * 9301 + 49297;
  return Array.from({ length: GRID * GRID }, () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280 > 0.52;
  });
}

/* Live code + countdown, paused off-screen and for reduced motion */
function useRegeneratingCode(ref: React.RefObject<HTMLElement | null>) {
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [seed, setSeed] = useState(1);
  const [left, setLeft] = useState(PERIOD);

  useEffect(() => {
    if (reduce || !inView) return;
    const t = setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          setSeed((n) => n + 1);
          return PERIOD;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [reduce, inView]);

  return { seed, left, reduce };
}

// Corner finder squares: outer ring, gap, solid centre, like a QR code
function corner(r: number, c: number) {
  const rr = r < 6 ? r : r > GRID - 7 ? GRID - 1 - r : -1;
  const cc = c < 6 ? c : c > GRID - 7 ? GRID - 1 - c : -1;
  if (rr < 0 || cc < 0 || (r > GRID - 7 && c > GRID - 7)) return null;
  if (rr === 5 || cc === 5) return false; // quiet gap
  return Math.min(rr, cc, 4 - rr, 4 - cc) !== 1;
}

function QrCode({ seed, reduce }: { seed: number; reduce: boolean | null }) {
  return (
    <div className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-[1px] rounded-[8px] bg-white p-2.5">
      {pattern(seed).map((on, i) => {
        const r = Math.floor(i / GRID);
        const c = i % GRID;
        const f = corner(r, c);
        const fixed = f !== null;
        return (
          <motion.span
            key={`${seed}-${i}`}
            className={`aspect-square rounded-[1px] ${(fixed ? f : on) ? "bg-[#111]" : "bg-transparent"}`}
            initial={reduce || fixed ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: c * 0.012 }}
          />
        );
      })}
    </div>
  );
}

/* The Quentro ticket, as a tear-off ticket: the face carries the live code,
   the stub carries the gate and seat from the product's ticket screen. */
const TICKET_ACCENT = "#3fe0c8";

function QuentroTicket() {
  const ref = useRef<HTMLDivElement>(null);
  const { seed, left, reduce } = useRegeneratingCode(ref);
  const [admitted, setAdmitted] = useState(false);
  const R = 13;
  const C = 2 * Math.PI * R;

  return (
    <div ref={ref} className="mx-auto flex w-full max-w-[460px] flex-col items-center gap-6">
      <p className="sr-only">
        A Quentro dynamic ticket. Its code regenerates every 15 seconds and works without an internet connection.
      </p>
      <TearTicket
        orientation="horizontal"
        width={460}
        height={250}
        stubSize={150}
        radius={16}
        holes={12}
        holeSize={6}
        notch={3}
        roughness={0}
        tearAngle={30}
        stretch={30}
        resistance={0.45}
        rotate={4}
        tilt
        tiltMax={9}
        tiltReach={260}
        parallax={6}
        perspective={1000}
        background="#27272a"
        color="#f5f5f5"
        border
        borderWidth={1}
        recenter
        stubLabel="Tear off the ticket stub"
        onTear={() => {
          setAdmitted(true);
          setTimeout(() => setAdmitted(false), 1800);
        }}
        stub={
          <div className="flex h-full flex-col justify-between p-5 pl-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: TICKET_ACCENT }}>
              Admit one
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.12em] text-white/50">Acceso</span>
              <span className="text-[20px] font-semibold leading-none tracking-[-0.02em]">Puerta 23</span>
              <span className="mt-1 text-[12px] text-white/70">Puertas 16:00 hs</span>
            </div>
            <span className="text-[11px] leading-snug text-white/60">
              Platea Alta
              <br />
              Fila H · Asiento 22
            </span>
          </div>
        }
      >
        <div className="flex h-full flex-col justify-between p-5" aria-hidden="true">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold">
              <span style={{ color: TICKET_ACCENT }}>
                <Chevron className="h-4 w-4" />
              </span>
              Quentro
            </span>
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-white/50">Dynamic ticket</span>
          </div>
          <div className="flex items-end gap-4">
            <div className="w-[118px] shrink-0">
              <QrCode seed={seed} reduce={reduce} />
            </div>
            <div className="flex flex-col gap-2 pb-1">
              <svg viewBox="0 0 32 32" className="h-8 w-8 -rotate-90" style={{ color: TICKET_ACCENT }}>
                <circle cx="16" cy="16" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
                <circle
                  cx="16"
                  cy="16"
                  r={R}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={reduce ? 0 : C * (1 - left / PERIOD)}
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <span className="text-[13px] font-medium tabular-nums">{reduce ? "Every 15s" : `New code in ${left}s`}</span>
              <span className="text-[11px] leading-snug text-white/60">Works without data or internet</span>
            </div>
          </div>
        </div>
      </TearTicket>
      <p className="text-[13px] text-text-secondary" aria-live="polite">
        {admitted ? <span className="text-quentro">Admitted.</span> : "Drag the stub to tear it."}
      </p>
    </div>
  );
}

/* ─── 02 · Two-sided product ecosystem ─────────────────────────── */
function Side({ who, points, align }: { who: string; points: string[]; align: "left" | "right" }) {
  return (
    <motion.div
      variants={item}
      className={`flex flex-col gap-4 text-center ${align === "left" ? "xl:text-right" : "xl:text-left"}`}
    >
      <p className="text-label"><span className="text-text-primary">{who}</span></p>
      <ul className="flex flex-col gap-2" role="list">
        {points.map((p) => (
          <li key={p} className="text-[clamp(1.125rem,1.6vw,1.5rem)] font-medium leading-snug tracking-[-0.02em] text-text-primary">
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Link2({ vertical = false }: { vertical?: boolean }) {
  return (
    <motion.div variants={item} className="flex items-center justify-center text-quentro" aria-hidden="true">
      {vertical ? (
        <svg viewBox="0 0 12 48" className="h-12 w-3">
          <path d="M6 2v44M2 6l4-4 4 4M2 42l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      ) : (
        <svg viewBox="0 0 96 12" className="h-3 w-16">
          <path d="M2 6h92M6 2L2 6l4 4M90 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )}
    </motion.div>
  );
}

function ProductEcosystem() {
  const attendee = ["Tickets in digital format", "Delivered to your phone", "Secure entry"];
  const producer = ["Lower logistics costs", "Less physical structure", "Digital ticketing at massive events"];
  return (
    <motion.div
      className="grid grid-cols-1 items-center gap-6 xl:grid-cols-[1fr_auto_minmax(0,460px)_auto_1fr] xl:gap-6"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      <Side who="Attendee" points={attendee} align="left" />
      <div className="xl:hidden"><Link2 vertical /></div>
      <div className="hidden xl:block"><Link2 /></div>
      <motion.div variants={item} className="py-4">
        <QuentroTicket />
      </motion.div>
      <div className="xl:hidden"><Link2 vertical /></div>
      <div className="hidden xl:block"><Link2 /></div>
      <Side who="Event producer" points={producer} align="right" />
    </motion.div>
  );
}

/* Survey results from the first large-scale event (measures the MVP, before the redesign) */
function SurveyFigures() {
  const stats = [
    { value: "97.5%", label: "were using Quentro for the first time", key: true },
    { value: "95%+", label: "found the app easy to use" },
    { value: "9.6", label: "average experience rating" },
    { value: "79.5%", label: "promoters (scored 9–10)" },
  ];
  return (
    <div className="flex flex-col gap-10">
      <Reveal>
        <p className="text-label">Survey · First large-scale event · 171 responses</p>
        <p className="mt-4 max-w-[24ch] text-[clamp(1.75rem,3.4vw,3rem)] font-medium leading-[1.05] tracking-[-0.04em] text-text-primary">
          <span className="text-quentro tabular-nums">3,500</span> people entered FMS Internacional with Quentro.
        </p>
      </Reveal>
      <motion.dl
        className="grid grid-cols-2 border-t border-border md:grid-cols-4"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {stats.map((s) => (
          <motion.div key={s.value} variants={item} className="flex flex-col-reverse gap-2 border-b border-border py-6 pr-6">
            <dt className="text-[13px] leading-snug text-text-secondary">{s.label}</dt>
            <dd
              className={`text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-none tracking-[-0.04em] tabular-nums ${
                s.key ? "text-quentro" : "text-text-primary"
              }`}
            >
              {s.value}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
      <Reveal>
        <p className="max-w-[52ch] border-l-2 border-quentro pl-5 text-[clamp(1.125rem,1.6vw,1.375rem)] font-medium leading-snug tracking-[-0.02em] text-text-primary">
          Almost everyone was a first-time user, so the first-time experience
          <em className="not-italic text-quentro"> was </em>
          the experience.
        </p>
      </Reveal>
    </div>
  );
}

/* ─── 05 · Original journey ────────────────────────────────────── */
function OriginalJourney() {
  return (
    <figure className="flex flex-col gap-6">
      <motion.ol
        className="grid grid-cols-1 lg:grid-cols-8"
        role="list"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      >
        {JOURNEY.map((j, i) => {
          const next = JOURNEY[i + 1];
          const switches = next && next.channel !== j.channel;
          return (
            <motion.li key={j.step} variants={item} className="flex gap-4 lg:flex-col lg:gap-0">
              {/* Node + connector: vertical on phones, horizontal from lg */}
              <div className="flex flex-col items-center lg:h-6 lg:flex-row" aria-hidden="true">
                <span
                  className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2 lg:mt-0 ${
                    j.code ? "border-quentro bg-quentro" : "border-text-primary bg-bg-base"
                  }`}
                />
                {next && (
                  <span
                    className={`my-1.5 w-0 flex-1 border-l lg:mx-2 lg:my-0 lg:h-0 lg:w-auto lg:border-l-0 lg:border-t ${
                      switches ? "border-dashed border-text-muted" : "border-text-primary"
                    }`}
                  />
                )}
              </div>
              <div className="flex flex-col gap-1.5 pb-8 lg:pb-0 lg:pr-4 lg:pt-5">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")} · {j.channel}
                  </span>
                  {j.code && (
                    <span className="rounded-full border border-quentro px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-quentro">
                      {j.code}
                    </span>
                  )}
                </span>
                <span className="text-[15px] font-medium leading-snug tracking-[-0.01em] text-text-primary">{j.step}</span>
                <span className="text-[12px] text-text-muted" lang="es">
                  {j.es}
                </span>
                {/* Friction marker — appears after the step */}
                <motion.span
                  className="mt-2 flex gap-2 text-[13px] italic leading-snug text-text-secondary"
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out, delay: 0.35 } },
                  }}
                >
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rotate-45 bg-text-secondary not-italic" aria-hidden="true" />
                  {j.feeling}
                </motion.span>
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
      <figcaption className="flex flex-col gap-2 border-t border-border pt-5 text-[13px] text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <span>Rebuilt from my original journey map. Feelings are the emotions recorded at each phase.</span>
        <span className="flex items-center gap-4 text-text-muted" aria-hidden="true">
          <span className="flex items-center gap-2">
            <span className="w-6 border-t border-text-primary" /> Same channel
          </span>
          <span className="flex items-center gap-2">
            <span className="w-6 border-t border-dashed border-text-muted" /> Channel switch
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ─── 06 · Friction themes ─────────────────────────────────────── */
function FrictionThemes() {
  return (
    <motion.div
      className="grid grid-cols-1 border-t border-border md:grid-cols-3"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
    >
      {FRICTION.map((f, i) => (
        <motion.div
          key={f.theme}
          variants={item}
          className={`flex flex-col gap-8 py-10 md:px-8 md:py-12 ${i === 0 ? "md:pl-0" : "border-t border-border md:border-l md:border-t-0"} ${
            i === FRICTION.length - 1 ? "md:pr-0" : ""
          }`}
        >
          <p className="text-label"><span className="text-text-primary">{f.theme}</span></p>
          <ul className="flex flex-col gap-1" role="list">
            {f.words.map((word) => (
              <li
                key={word}
                className="text-[clamp(1.5rem,2.4vw,2.125rem)] font-medium leading-tight tracking-[-0.035em] text-text-primary"
              >
                {word}
              </li>
            ))}
          </ul>
          <p className="mt-auto max-w-[36ch] border-t border-border pt-5 text-[15px] leading-relaxed text-text-secondary">{f.insight}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── 09 · Fragmented → guided ─────────────────────────────────── */
function FragmentedToGuided() {
  const before = JOURNEY.slice(1).map((j) => j.step);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const shown = inView || !!reduce;

  return (
    <div ref={ref} className="flex flex-col gap-16">
      {/* Before */}
      <div className="flex flex-col gap-5">
        <p className="text-label">Before · Fragmented activation</p>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-3" role="list">
          {before.map((s, i) => (
            <motion.li
              key={s}
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={shown ? { opacity: 1 } : undefined}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              {i > 0 && (
                <svg viewBox="0 0 28 10" className="h-2.5 w-7 text-text-muted" aria-hidden="true">
                  <path d="M1 5h9M18 5h9M12 9l4-8" fill="none" stroke="currentColor" strokeWidth="1.25" />
                </svg>
              )}
              <span className="text-[15px] text-text-secondary">{s}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Direction */}
      <motion.div
        className="grid grid-cols-1 gap-3 border-y border-border py-8 md:grid-cols-[14rem_1fr] md:gap-10"
        initial={{ opacity: 0 }}
        animate={shown ? { opacity: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-label pt-1"><span className="text-quentro">Design direction</span></p>
        <p className="text-[clamp(1.375rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-text-primary">
          Guide users through one continuous activation journey.
        </p>
      </motion.div>

      {/* After */}
      <div className="flex flex-col gap-6">
        <p className="text-label">After · One guided journey</p>
        <ol className="relative grid grid-cols-1 gap-0 md:grid-cols-5" role="list">
          {/* Continuous line, drawn after the fragmented row */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[6px] top-2 bottom-[3.75rem] w-[2px] origin-top bg-quentro md:bottom-auto md:left-0 md:right-[calc(20%-7px)] md:top-[6px] md:h-[2px] md:w-auto md:origin-left"
            initial={{ scale: 0 }}
            animate={shown ? { scale: 1 } : undefined}
            transition={{ duration: 1.2, ease: ease.out, delay: 0.9 }}
          />
          {GUIDED.map((g, i) => (
            <motion.li
              key={g.step}
              className="relative grid grid-cols-[1.5rem_1fr] gap-x-4 pb-8 last:pb-0 md:block md:pb-0 md:pr-6"
              initial={{ opacity: 0, y: 10 }}
              animate={shown ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: ease.out, delay: 1 + i * 0.12 }}
            >
              <span className="relative z-10 mt-0.5 block h-3.5 w-3.5 rounded-full bg-quentro ring-4 ring-bg-base md:mt-0" aria-hidden="true" />
              <div className="flex flex-col gap-1.5 md:mt-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted tabular-nums">
                  Step {i + 1}
                  {g.ref && <span className="ml-2 text-quentro">→ {g.ref}</span>}
                </span>
                <span className="text-[17px] font-medium leading-snug tracking-[-0.015em] text-text-primary">{g.step}</span>
                <span className="text-[12px] text-text-muted" lang="es">
                  {g.es}
                </span>
              </div>
            </motion.li>
          ))}
        </ol>
        <p className="text-[13px] text-text-secondary">
          The five-step flow is from the original redesign (“Guiar al usuario con claridad”). Letters link to the touchpoints below.
        </p>
      </div>
    </div>
  );
}

/* ─── 10 · Redesigned touchpoints, rebuilt from the original screens ─ */
const BRAND = "#0b9c88";

function WebHandoffScreen() {
  return (
    <div
      role="img"
      aria-label="Redesigned ticketing-site screen. Title: ¿A qué número enviamos tus tickets? A three-step tracker shows Tickets comprados, Envialos a tu móvil, Recibilos en Quentro. Below: a country selector set to +54 Argentina, a phone number field with a format example, an Enviar tickets button, and a link: ¿Qué es Quentro y cómo funciona?"
      className="overflow-hidden rounded-[14px] border border-border bg-white text-[#1c1c1c] shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)]"
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-[#eee] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#e2e2e2]" />
          <span className="h-2 w-2 rounded-full bg-[#e2e2e2]" />
          <span className="h-2 w-2 rounded-full bg-[#e2e2e2]" />
        </div>
        <div className="h-5 sm:h-7" style={{ background: BRAND }} />
        <div className="mx-auto flex max-w-[420px] flex-col gap-5 px-5 py-7 sm:py-9">
          <p className="text-center text-[15px] font-medium sm:text-[17px]">¿A qué número enviamos tus tickets?</p>
          {/* Tracker */}
          <div className="relative grid grid-cols-3 text-center">
            <span className="absolute left-[16.6%] right-[16.6%] top-[5px] h-px bg-[#cfcfcf]" />
            {["Tickets comprados", "Envialos a tu móvil", "Recibilos en Quentro"].map((t, i) => (
              <div key={t} className="relative flex flex-col items-center gap-2">
                <span
                  className="h-[11px] w-[11px] rounded-full border-2"
                  style={{ borderColor: i === 0 ? "#555" : "#9a9a9a", background: i === 0 ? "#555" : "#fff" }}
                />
                <span className={`text-[10px] leading-tight sm:text-[11px] ${i === 1 ? "font-semibold text-[#1c1c1c]" : "text-[#8a8a8a]"}`}>
                  {t}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-[4px] border border-[#d6d6d6] px-3 py-2 text-[12px]">
            <span className="font-semibold">+54 Argentina</span>
            <span className="font-semibold" style={{ color: BRAND }}>cambiar</span>
          </div>
          <div className="-mt-2 flex flex-col gap-1.5">
            <div className="rounded-[4px] border border-[#555] px-3 py-2 text-[12px] tracking-[0.1em] text-[#777]">(––) (––) (–––) (–––)</div>
            <span className="text-[10px] text-[#777]">Ej: 011 15 XXXX XXXX</span>
          </div>
          <div className="rounded-[4px] py-2.5 text-center text-[13px] font-semibold text-white" style={{ background: BRAND }}>
            Enviar tickets
          </div>
          <span className="text-center text-[11px] underline underline-offset-2 text-[#666]">¿Qué es Quentro y cómo funciona?</span>
        </div>
      </div>
    </div>
  );
}

function PhoneScreen({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="mx-auto w-full max-w-[220px] overflow-hidden rounded-[26px] border-[6px] border-[#1c1c1c] bg-white text-[#1c1c1c] shadow-[0_30px_60px_-35px_rgba(0,0,0,0.45)]"
    >
      <div aria-hidden="true" className="flex aspect-[9/17] flex-col">
        <div className="flex justify-between px-4 pt-2.5 text-[9px] text-[#777]">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        <div className="flex flex-1 flex-col items-center px-5 pb-4 pt-4">{children}</div>
        <div className="flex justify-around border-t border-[#eee] bg-[#fafafa] py-2.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-3 w-3 rounded-[3px] border border-[#999]" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ValidateScreen() {
  return (
    <PhoneScreen label="Redesigned app screen, first of three onboarding steps. Title: Validá tu cuenta. One button: Escanear DNI.">
      <div className="flex gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND }} />
        <span className="h-1.5 w-1.5 rounded-full border border-[#bbb]" />
        <span className="h-1.5 w-1.5 rounded-full border border-[#bbb]" />
      </div>
      <svg viewBox="0 0 120 100" className="mt-8 w-[70%]">
        <rect x="42" y="14" width="38" height="66" rx="6" fill="none" stroke={BRAND} strokeWidth="2.5" transform="rotate(14 61 47)" />
        <circle cx="30" cy="62" r="18" fill={BRAND} />
        <rect x="21" y="56" width="18" height="12" rx="2" fill="none" stroke="#fff" strokeWidth="1.8" />
        <circle cx="92" cy="28" r="16" fill={BRAND} />
        <circle cx="92" cy="24" r="5" fill="none" stroke="#fff" strokeWidth="1.8" />
        <path d="M84 37c2-6 14-6 16 0" fill="none" stroke="#fff" strokeWidth="1.8" />
      </svg>
      <p className="mt-6 text-center text-[18px] font-extrabold leading-none tracking-[-0.01em]" style={{ color: BRAND }}>
        VALIDÁ
        <span className="block text-[11px] tracking-[0.02em]">TU CUENTA</span>
      </p>
      <span
        className="mt-auto whitespace-nowrap rounded-full border-2 px-3 py-1.5 text-[8px] font-bold tracking-[0.06em] sm:px-4 sm:text-[10px]"
        style={{ borderColor: BRAND, color: BRAND }}
      >
        ESCANEAR DNI
      </span>
    </PhoneScreen>
  );
}

function ActivateScreen() {
  return (
    <PhoneScreen label="Redesigned app screen. A ticket with a lock icon, one primary button: Activa tus entradas, and below it a link: ¿Cómo activo mis entradas?">
      <svg viewBox="0 0 120 90" className="mt-12 w-[62%]">
        <path
          d="M18 30l58-16 6 20a9 9 0 000 18l6 20-58 16-6-20a9 9 0 000-18z"
          fill="none"
          stroke={BRAND}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="74" cy="58" r="16" fill={BRAND} />
        <rect x="67" y="57" width="14" height="10" rx="2" fill="#fff" />
        <path d="M70 57v-3a4 4 0 018 0v3" fill="none" stroke="#fff" strokeWidth="1.8" />
      </svg>
      <span className="mt-auto whitespace-nowrap rounded-full px-3 py-2 text-[8px] font-bold tracking-[0.04em] text-white sm:px-4 sm:text-[10px]" style={{ background: BRAND }}>
        ACTIVA TUS ENTRADAS
      </span>
      <span className="mt-3 whitespace-nowrap text-[8px] underline sm:text-[9.5px] underline-offset-2" style={{ color: BRAND }}>
        ¿Cómo activo mis entradas?
      </span>
    </PhoneScreen>
  );
}

function Decision({
  letter,
  title,
  problem,
  decision,
  benefit,
  visual,
  reverse = false,
  wide = false,
}: {
  letter: string;
  title: string;
  problem: React.ReactNode;
  decision: React.ReactNode;
  benefit: React.ReactNode;
  visual: React.ReactNode;
  reverse?: boolean;
  /** Visual spans the full width, with the reasoning in a row beneath */
  wide?: boolean;
}) {
  const rows = [
    { label: "Problem", sub: "What research identified", text: problem },
    { label: "Design decision", sub: "What changed", text: decision },
    { label: "User benefit", sub: "Why it reduces friction", text: benefit },
  ];
  const heading = (
    <Reveal>
      <p className="text-label">
        <span className="text-quentro">Touchpoint {letter}</span>
      </p>
      <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2.125rem)] font-medium leading-[1.08] tracking-[-0.035em] text-text-primary">
        {title}
      </h3>
    </Reveal>
  );

  if (wide) {
    return (
      <article className="flex flex-col gap-10 lg:gap-14">
        <Reveal>
          <div className="rounded-[20px] bg-bg-surface p-4 sm:p-8 lg:p-10">{visual}</div>
        </Reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">{heading}</div>
          <motion.ol
            className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-8"
            role="list"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          >
            {rows.map((r, i) => (
              <motion.li key={r.label} variants={item} className="flex flex-col gap-2 border-t border-border pt-4">
                <span className={`h-2.5 w-2.5 rounded-full ${i === 2 ? "bg-quentro" : "border border-text-muted"}`} aria-hidden="true" />
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-primary">{r.label}</p>
                <p className="text-[15px] leading-relaxed text-text-secondary">{r.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </article>
    );
  }

  return (
    <article className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <Reveal className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
        <div className="rounded-[20px] bg-bg-surface p-4 sm:p-10 lg:p-12">{visual}</div>
      </Reveal>
      <div className={`flex flex-col gap-8 lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        {heading}
        <motion.ol
          className="flex flex-col"
          role="list"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          {rows.map((r, i) => (
            <motion.li key={r.label} variants={item} className="grid grid-cols-[1.5rem_1fr] gap-x-4">
              <div className="flex flex-col items-center" aria-hidden="true">
                <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${i === 2 ? "bg-quentro" : "border border-text-muted"}`} />
                {i < rows.length - 1 && <span className="w-px flex-1 bg-border" />}
              </div>
              <div className="pb-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-primary">
                  {r.label} <span className="font-normal normal-case tracking-normal text-text-muted">· {r.sub}</span>
                </p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">{r.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </article>
  );
}

function FinalScreens() {
  const shots = [
    { src: "/quentro/screen.png", w: 1393, h: 1346, alt: "Mis tickets: upcoming events grouped by month, each showing the number of tickets, date and venue", bg: "bg-black", fit: "object-top" },
    { src: "/quentro/walk-1.png", w: 1125, h: 1125, alt: "A ticket in the app: QR code with access gate, door time, start time, sector, row and seat", bg: "bg-black", fit: "object-center" },
    { src: "/quentro/walk-4.png", w: 1125, h: 1125, alt: "A Quentro notification telling the user that the opening time of a music festival has changed", bg: "bg-white", fit: "object-center" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {shots.map((s) => (
        <div key={s.src} className={`relative aspect-square overflow-hidden rounded-[14px] ${s.bg}`}>
          <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1520px) 460px, (min-width: 640px) 30vw, 90vw" className={`object-cover ${s.fit}`} />
        </div>
      ))}
    </div>
  );
}

/* ─── Hero visual ─────────────────────────────────────────────────
   Bleeds to the screen edge (right edge on desktop, both edges on phones; the
   negative margins mirror .container-editorial's padding) so the
   cover's photo meets the edge instead of looking cropped. Reveals from the edge
   on load, then drifts gently as the page scrolls. */
function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "5%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -1.5]);

  return (
    <motion.div
      ref={ref}
      className="relative -mx-[clamp(1.25rem,4.5vw,4.5rem)] overflow-hidden bg-[#eef1f6] lg:col-span-5 lg:ml-0 lg:-mr-[calc(clamp(1.25rem,4.5vw,4.5rem)_+_max(0px,(100vw_-_1520px)/2))] lg:rounded-l-[20px]"
      initial={reduce ? false : { clipPath: "inset(0% 0% 0% 100%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.2, ease: ease.out, delay: 0.2 }}
    >
      <motion.div
        initial={reduce ? false : { scale: 1.18, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: ease.out, delay: 0.2 }}
      >
        <motion.div style={reduce ? { scale: 1.08 } : { y, rotate, scale: 1.08 }} className="origin-center">
          <Image
            src="/quentro/cover.png"
            alt="Two Quentro app screens: the Mis tickets list of upcoming events, and a ticket with its QR code, access gate and seat"
            width={1115}
            height={1411}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-auto w-full"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export function QuentroCaseStudy({ nextSlug, nextName }: { nextSlug?: string; nextName?: string }) {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    ({
      initial: reduce ? false : { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: ease.out, delay },
    }) as const;


  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <CaseStudyProgress project="Quentro" chapters={CHAPTERS} />

        {/* ── 01 · Hero ── */}
        <section id="q-intro" aria-labelledby="q-intro-title" className="scroll-mt-32 overflow-x-clip">
          <div className="container-editorial pt-40 pb-20 lg:pb-28">
            <motion.div {...fade(0)}>
              <Link
                href="/work"
                className="text-[13px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
              >
                ← All work
              </Link>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
              <div className="flex flex-col lg:col-span-7">
                <motion.p {...fade(0.05)} className="text-label">
                  <span className="text-text-primary">Quentro</span> · Product design · User research
                </motion.p>
                <MaskLines
                  as="h1"
                  id="q-intro-title"
                  delay={0.1}
                  className="mt-6 font-medium leading-[0.98] tracking-[-0.05em] text-text-primary text-[clamp(2.5rem,5.6vw,5.5rem)]"
                  lines={["Simplifying ticket", "activation without", <span key="s" className="text-quentro">compromising security</span>]}
                />
                <motion.div {...fade(0.3)} className="mt-8 flex max-w-[56ch] flex-col gap-4 text-[1.0625rem] leading-relaxed text-text-secondary">
                  <p>
                    Quentro is a smart digital ticketing service for large-scale events. Its tickets regenerate every 15
                    seconds and work without mobile data or internet.
                  </p>
                  <p className="text-text-primary">
                    Research showed a different challenge: first-time users struggled to receive and activate them.
                  </p>
                </motion.div>
              </div>

              <HeroVisual />
            </div>

            {/* Metadata — restrained, editorial */}
            <motion.dl {...fade(0.4)} className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3 lg:mt-20">
              {[
                { label: "Role", value: "Product Designer" },
                { label: "Focus", value: "User Research · Customer Journey · UX Design · Service Design" },
                { label: "Context", value: "Quentro, launched by the startup Crowder · 2019" },
              ].map((m) => (
                <div key={m.label} className="flex flex-col gap-2">
                  <dt className="text-label">{m.label}</dt>
                  <dd className="max-w-[34ch] text-[15px] leading-snug text-text-primary">{m.value}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </section>

        {/* ── 02 · The product ── */}
        <Section id="q-product">
          <SectionHead index="02" label="The product" id="q-product-title" title={["Digital tickets built", "for high-scale events"]}>
            <Body>
              <p>Secure tickets for massive events, where a traditional digital ticket isn&apos;t viable.</p>
            </Body>
          </SectionHead>
          <div className="mt-20 lg:mt-28">
            <ProductEcosystem />
          </div>
        </Section>

        {/* ── 03 · The challenge ── */}
        <Section id="q-challenge">
          <p className="text-label">
            <span className="tabular-nums text-quentro">03</span>
            <span className="mx-2 text-text-muted" aria-hidden="true">—</span>The challenge
          </p>
          <MaskLines
            as="h2"
            id="q-challenge-title"
            className="mt-8 max-w-[18ch] display-statement text-text-primary"
            lines={["Getting the ticket wasn’t the problem.", <span key="a" className="text-quentro">Activating it was.</span>]}
          />
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-5 lg:col-start-1">
              <Body>
                <p>Activating a ticket for the first time meant moving across channels, codes and touchpoints.</p>
                <p className="text-text-primary">Each step had a purpose. Together, they created friction.</p>
              </Body>
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
              <figure className="border-l-2 border-quentro pl-6 lg:pl-8">
                <figcaption className="text-label">The design question</figcaption>
                <blockquote className="mt-4 text-[clamp(1.375rem,2.4vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em] text-text-primary">
                  How might we reduce friction during first-time activation without compromising the security of the
                  ticketing system?
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </Section>

        {/* ── 04 · Discovery ── */}
        <Section id="q-discovery">
          <SectionHead index="04" label="Discovery" id="q-discovery-title" title={["Understanding", "first-time users"]}>
            <Body>
              <p>
                <span className="text-text-primary">How do we understand the users of an MVP?</span> Three methods, to see
                both what people did and what they reported.
              </p>
            </Body>
          </SectionHead>
          <div className="mt-16 lg:mt-20">
            <ResearchMethods />
          </div>
          <div className="mt-20 lg:mt-28">
            <SurveyFigures />
          </div>
        </Section>

        {/* ── 05 · The original journey ── */}
        <Section id="q-journey">
          <SectionHead index="05" label="The original journey" id="q-journey-title" title={["One activation.", "Too many touchpoints."]}>
            <Body>
              <p>Eight phases across web, email, SMS and the app, with two verification codes.</p>
            </Body>
          </SectionHead>
          <div className="mt-20 lg:mt-24">
            <OriginalJourney />
          </div>
        </Section>

        {/* ── 06 · What users were experiencing ── */}
        <Section id="q-friction">
          <SectionHead
            index="06"
            label="What users experienced"
            id="q-friction-title"
            title={["The friction wasn’t isolated", "to one screen"]}
          >
            <Body>
              <p>Research pain points, in three groups.</p>
            </Body>
          </SectionHead>
          <div className="mt-16 lg:mt-20">
            <FrictionThemes />
          </div>
        </Section>

        {/* ── 07 · Key insight (full-bleed) ── */}
        <section id="q-insight" aria-labelledby="q-insight-title" className="scroll-mt-32 bg-text-primary text-bg-base">
          <div className="container-editorial py-28 lg:py-44">
            <Reveal>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] opacity-60">
                <span className="tabular-nums">07</span> — Key insight
              </p>
            </Reveal>
            <MaskLines
              as="h2"
              id="q-insight-title"
              className="mt-8 max-w-[20ch] display-title"
              lines={["The problem wasn’t one interaction.", <span key="b" className="opacity-60">It was the accumulation of friction across the entire activation journey.</span>]}
            />
            <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
              <Reveal className="lg:col-span-5">
                <p className="text-[1.0625rem] leading-relaxed opacity-80">
                  Each step made sense to the system. Users experienced them as one task, and the switching between
                  channels and codes broke their mental model.
                </p>
              </Reveal>
              <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
                <div className="flex flex-col gap-3 border-t border-current/20 pt-6">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] opacity-60">From the research</p>
                  <p className="text-[clamp(1.25rem,2vw,1.625rem)] font-medium leading-snug tracking-[-0.025em]">
                    First use of Quentro: two codes in one flow. The biggest source of friction, and the reason for the
                    redesign.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 08 · The design opportunity ── */}
        <Section id="q-opportunity" bordered={false}>
          <SectionHead
            index="08"
            label="The design opportunity"
            id="q-opportunity-title"
            title={["Security shouldn’t come", "at the cost of clarity."]}
          >
            <Body>
              <p>
                Security was core to Quentro, and some steps had to stay: merging the two code emails into one wasn&apos;t
                possible.
              </p>
              <p className="text-text-primary">So the goal was to reduce perceived complexity, not security.</p>
            </Body>
          </SectionHead>
          <motion.ol
            className="mt-20 grid grid-cols-1 border-t border-border lg:mt-24 lg:grid-cols-3"
            role="list"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          >
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p.title}
                variants={item}
                className={`flex flex-col gap-6 py-10 lg:px-8 lg:py-12 ${i === 0 ? "lg:pl-0" : "border-t border-border lg:border-l lg:border-t-0"} ${
                  i === PRINCIPLES.length - 1 ? "lg:pr-0" : ""
                }`}
              >
                <span className="text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em] text-quentro tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="max-w-[16ch] text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium leading-[1.08] tracking-[-0.03em] text-text-primary">
                  {p.title}
                </h3>
                <p className="max-w-[36ch] text-[15px] leading-relaxed text-text-secondary">{p.text}</p>
                <p className="mt-auto border-t border-border pt-4 text-[12px] leading-relaxed text-text-muted">
                  <span className="font-semibold uppercase tracking-[0.12em]">Responds to</span> · {p.answers}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </Section>

        {/* ── 09 · Solution: from fragmented to guided, then the touchpoints ── */}
        <Section id="q-solution">
          <SectionHead index="09" label="Solution" id="q-solution-title" title={["From disconnected interactions", "to one guided journey"]}>
            <Body>
              <p>The activation retold as one story, then each touchpoint redesigned around the next action.</p>
            </Body>
          </SectionHead>
          <div className="mt-20 lg:mt-24">
            <FragmentedToGuided />
          </div>
          <p className="mt-24 text-[13px] text-text-secondary lg:mt-32">
            Screens rebuilt from the original redesign, in Spanish as in the product.
          </p>
          <div className="mt-10 flex flex-col gap-24 lg:mt-12 lg:gap-36">
            <Decision
              letter="A"
              title="Show where the tickets are going"
              problem="At the phone-number step, people were disoriented: am I done? How do I continue?"
              decision="The ask became “¿A qué número enviamos tus tickets?”, with a three-step tracker, a format example and a “how it works” link."
              benefit="People see why they're asked, where they are and what comes next."
              visual={<WebHandoffScreen />}
            />
            <Decision
              reverse
              letter="B · C"
              title="Make security a step, and activation one action"
              problem="Out-of-context codes felt suspicious; at activation, people felt distrust and fear of the unknown."
              decision="Validation became a named step (“Validá tu cuenta”) with one action. Activation is one button, with “¿Cómo activo mis entradas?” below."
              benefit="Security reads as part of the product, and the next action is always obvious."
              visual={
                <div className="grid grid-cols-2 gap-3 sm:gap-8">
                  <ValidateScreen />
                  <ActivateScreen />
                </div>
              }
            />
            <Decision
              wide
              letter="D"
              title="Keep confidence after activation"
              problem="Loss and theft were recurring fears, and event-day touchpoints were an open opportunity."
              decision="Tickets live in one place by date; each shows gate, doors and start time, and changes arrive as notifications."
              benefit="Users can check their tickets are there and know what to expect."
              visual={<FinalScreens />}
            />
          </div>
        </Section>

        {/* ── 10 · Reflection ── */}
        <Section id="q-reflection">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-3">
              <p className="text-label pt-2">
                <span className="tabular-nums text-quentro">10</span>
                <span className="mx-2 text-text-muted" aria-hidden="true">—</span>What I learned
              </p>
            </Reveal>
            <div className="flex flex-col gap-10 lg:col-span-9">
              <MaskLines
                as="h2"
                id="q-reflection-title"
                className="max-w-[22ch] font-medium leading-[1.04] tracking-[-0.04em] text-text-primary text-[clamp(1.875rem,3.8vw,3.5rem)]"
                lines={["Simplifying an experience doesn’t always mean simplifying the system behind it."]}
              />
              <Reveal>
                <Body>
                  <p>
                    Quentro taught me to look past single screens to friction across a whole service journey. The job
                    wasn&apos;t removing security, but sparing users the complexity behind it.
                  </p>
                </Body>
              </Reveal>
            </div>
          </div>
          <MaskLines
            as="p"
            className="mt-24 display-statement text-text-primary lg:mt-36"
            lines={["Complex system.", <span key="c" className="text-quentro">Simple experience.</span>]}
          />
        </Section>

        {/* ── Next project ── */}
        {nextSlug && nextName && (
          <div id="q-next" className="border-t border-border">
            <Link
              href={`/work/${nextSlug}`}
              className="group container-editorial flex items-center justify-between py-16 transition-colors duration-200"
              aria-label={`Next project: ${nextName}`}
            >
              <div>
                <p className="text-label mb-2">Next project</p>
                <p
                  className="font-medium text-text-primary transition-colors duration-300 group-hover:text-accent"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
                >
                  {nextName}
                </p>
              </div>
              <span
                className="text-2xl text-text-muted transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
