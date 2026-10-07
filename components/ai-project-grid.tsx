"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MaskLines } from "@/components/editorial";
import { ease } from "@/lib/motion";
import { AI_PROJECTS, type AiProject } from "@/lib/ai-projects";

/* Cover for the design-system project: design tokens and components, side by side */
function DesignSystemCover() {
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#eef3f8" />
      {/* Token swatches */}
      <g>
        {["#0b2f5b", "#1f5fa8", "#5b93d6", "#a9c8ee"].map((c, i) => (
          <rect key={c} x={48 + i * 62} y="70" width="50" height="50" rx="12" fill={c} />
        ))}
        <rect x="48" y="138" width="90" height="8" rx="4" fill="#9fb3c9" />
        <rect x="48" y="154" width="60" height="8" rx="4" fill="#c4d2e1" />
      </g>
      {/* Component tile */}
      <rect x="48" y="190" width="304" height="200" rx="20" fill="#ffffff" />
      <rect x="72" y="214" width="120" height="12" rx="6" fill="#0b2f5b" />
      <rect x="72" y="236" width="180" height="8" rx="4" fill="#c4d2e1" />
      <rect x="72" y="268" width="256" height="40" rx="10" fill="#f3f6fa" stroke="#d4dfeb" />
      <rect x="86" y="284" width="90" height="8" rx="4" fill="#9fb3c9" />
      <rect x="72" y="324" width="112" height="42" rx="21" fill="#1f5fa8" />
      <rect x="96" y="341" width="64" height="8" rx="4" fill="#ffffff" />
      <rect x="196" y="324" width="112" height="42" rx="21" fill="none" stroke="#1f5fa8" strokeWidth="2" />
      <rect x="220" y="341" width="64" height="8" rx="4" fill="#1f5fa8" />
      {/* Storybook-style mark */}
      <g transform="translate(300 40)">
        <rect width="52" height="60" rx="8" fill="#ff4785" />
        <path d="M16 22c0-5 4-8 10-8s9 3 10 7l-6 1c-1-2-2-3-4-3s-3 1-3 2c0 4 14 2 14 11 0 5-4 9-11 9s-11-4-11-9l6-1c0 3 2 4 5 4s4-1 4-3c0-4-14-2-14-10z" fill="#fff" />
      </g>
    </svg>
  );
}

/* Cover for the banking prototype: a client dashboard sketch */
function BankingCover() {
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#0f2a24" />
      <circle cx="330" cy="70" r="140" fill="#1d4a3f" opacity="0.6" />
      {/* Balance card */}
      <rect x="48" y="64" width="304" height="150" rx="22" fill="#d9f2e6" />
      <rect x="72" y="92" width="80" height="9" rx="4.5" fill="#5f8f7f" />
      <rect x="72" y="116" width="170" height="26" rx="8" fill="#0f2a24" />
      <rect x="72" y="176" width="44" height="8" rx="4" fill="#5f8f7f" />
      <rect x="128" y="176" width="44" height="8" rx="4" fill="#5f8f7f" />
      <circle cx="318" cy="98" r="14" fill="#0f2a24" opacity="0.15" />
      {/* Chart */}
      <rect x="48" y="234" width="304" height="120" rx="22" fill="#163a32" />
      <path d="M72 326c30-8 44-40 74-36s42 24 70 14 40-52 70-56 34 10 42 12" fill="none" stroke="#7fe0b4" strokeWidth="3" strokeLinecap="round" />
      {/* Transactions */}
      {[374, 418].map((y) => (
        <g key={y}>
          <rect x="48" y={y} width="304" height="34" rx="12" fill="#163a32" />
          <circle cx="70" cy={y + 17} r="9" fill="#2c5e51" />
          <rect x="88" y={y + 13} width="110" height="8" rx="4" fill="#5f8f7f" />
          <rect x="292" y={y + 13} width="44" height="8" rx="4" fill="#7fe0b4" />
        </g>
      ))}
    </svg>
  );
}

/* Cover for Escrituras: deed operations tracked from documents to signing */
function DeedsCover() {
  const ops = [
    { y: 214, progress: 0.5, tag: "#7aa2ff", tagW: 70 },
    { y: 300, progress: 0.75, tag: "#f5c46b", tagW: 58 },
    { y: 386, progress: 1, tag: "#6fe0b0", tagW: 64 },
  ];
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#0e1a3a" />
      <circle cx="70" cy="40" r="150" fill="#1b2d63" opacity="0.6" />
      {/* Stats row */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={48 + i * 104} y="64" width="96" height="112" rx="18" fill={i === 0 ? "#dbe5ff" : "#172a5c"} />
          <rect x={64 + i * 104} y="84" width="40" height="7" rx="3.5" fill={i === 0 ? "#6d82c0" : "#4a5f9e"} />
          <rect x={64 + i * 104} y="104" width={i === 0 ? 34 : 22} height="24" rx="6" fill={i === 0 ? "#0e1a3a" : "#c9d6ff"} />
          <rect x={64 + i * 104} y="146" width="58" height="6" rx="3" fill={i === 0 ? "#9fb0e0" : "#33498a"} />
        </g>
      ))}
      {/* Operation cards */}
      {ops.map(({ y, progress, tag, tagW }) => (
        <g key={y}>
          <rect x="48" y={y} width="304" height="72" rx="16" fill="#172a5c" />
          <rect x="68" y={y + 16} width="120" height="8" rx="4" fill="#c9d6ff" />
          <rect x={332 - tagW} y={y + 12} width={tagW} height="16" rx="8" fill={tag} fillOpacity="0.2" />
          <rect x={340 - tagW} y={y + 18} width={tagW - 16} height="4" rx="2" fill={tag} />
          <rect x="68" y={y + 44} width="264" height="6" rx="3" fill="#24397a" />
          <rect x="68" y={y + 44} width={264 * progress} height="6" rx="3" fill={tag} />
        </g>
      ))}
    </svg>
  );
}

/* Cover for the coffee table study: an isometric walnut frame under a glass top */
function TableCover() {
  // Isometric projection helpers (x along width, y along depth, z up)
  const P = (x: number, y: number, z: number) => `${200 + (x - y) * 0.87},${300 + (x + y) * 0.5 - z}`;
  const W = 130, D = 80, H = 60, leg = 8;
  const box = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, top: string, left: string, right: string) => (
    <g>
      <polygon points={[P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)].join(" ")} fill={left} />
      <polygon points={[P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)].join(" ")} fill={right} />
      <polygon points={[P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)].join(" ")} fill={top} />
    </g>
  );
  const walnut = ["#8a5a3b", "#6b4329", "#5a3721"] as const;
  return (
    <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#efe9e1" />
      <ellipse cx="200" cy="372" rx="150" ry="40" fill="#dcd2c5" />
      {/* Legs */}
      {[[-W / 2, -D / 2], [W / 2 - leg, -D / 2], [-W / 2, D / 2 - leg], [W / 2 - leg, D / 2 - leg]].map(([x, y]) =>
        <g key={`${x},${y}`}>{box(x, y, 0, x + leg, y + leg, H, ...walnut)}</g>,
      )}
      {/* Grid frame ("grilla") under the glass */}
      {box(-W / 2, -D / 2, H - 8, W / 2, -D / 2 + 6, H, ...walnut)}
      {box(-W / 2, D / 2 - 6, H - 8, W / 2, D / 2, H, ...walnut)}
      {[-W / 2, -W / 6, W / 6 - 4, W / 2 - 6].map((x) => <g key={x}>{box(x, -D / 2, H - 8, x + 6, D / 2, H, ...walnut)}</g>)}
      {/* Glass top */}
      <polygon
        points={[P(-W / 2 - 4, -D / 2 - 4, H + 4), P(W / 2 + 4, -D / 2 - 4, H + 4), P(W / 2 + 4, D / 2 + 4, H + 4), P(-W / 2 - 4, D / 2 + 4, H + 4)].join(" ")}
        fill="#cfe3e6"
        fillOpacity="0.45"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      <path d={`M${P(-W / 2 + 10, -D / 2, H + 4)}L${P(-W / 2 + 40, -D / 2 + 30, H + 4)}`} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      {/* Dimension note */}
      <text x="48" y="80" fontSize="13" fill="#8a7a68" fontFamily="ui-monospace, monospace" letterSpacing="1">1300 × 800 × 400 mm</text>
    </svg>
  );
}

function PasswordChip({ password }: { password: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the password is visible anyway */
    }
  };
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated py-1 pl-3 pr-1 text-[13px] text-text-secondary">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 018 0v3" />
      </svg>
      Password <code className="font-mono text-text-primary">{password}</code>
      <button
        type="button"
        onClick={copy}
        className="rounded-full px-2.5 py-0.5 text-[12px] font-medium text-text-primary transition-colors hover:bg-bg-raised"
        aria-label={`Copy password ${password}`}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Password copied" : ""}
      </span>
    </span>
  );
}

function ProjectCard({ project, i }: { project: AiProject; i: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.li
      className="flex flex-col gap-5"
      initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: ease.out, delay: (i % 2) * 0.1 }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[4/5] overflow-hidden rounded-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary"
        style={{ background: project.background }}
        aria-label={`${project.title} — ${project.category} (opens in a new tab)`}
      >
        <span className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none">
          {project.cover.kind === "design-system" && <DesignSystemCover />}
          {project.cover.kind === "banking" && <BankingCover />}
          {project.cover.kind === "table" && <TableCover />}
          {project.cover.kind === "deeds" && <DeedsCover />}
          {project.cover.kind === "image" && (
            <Image
              src={project.cover.src}
              alt=""
              fill
              sizes="(min-width: 1100px) 520px, (min-width: 640px) 46vw, 92vw"
              className="object-cover object-top"
            />
          )}
        </span>
        <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
        <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white lg:inset-x-6 lg:bottom-6">
          <span className="flex flex-col gap-1">
            <span className="text-[22px] font-medium leading-none tracking-[-0.03em] lg:text-[24px]">{project.title}</span>
            <span className="text-[13px] text-white/75">{project.category}</span>
          </span>
          <span className="translate-y-1 text-[13px] font-medium opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            Visit site ↗
          </span>
        </span>
      </a>
      <div className="flex flex-col items-start gap-3 px-1">
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-text-secondary">{project.summary}</p>
        {project.password && <PasswordChip password={project.password} />}
      </div>
    </motion.li>
  );
}

/* The private gallery: same layout as the Work grid, cards link out to live sites */
export function AiProjectGrid() {
  const reduce = useReducedMotion();
  return (
    <section className="relative" aria-labelledby="ai-grid-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="container-editorial h-full">
          <div className="h-full border-x border-border" />
        </div>
      </div>

      <div className="container-editorial relative flex flex-col items-center pb-20 pt-36 text-center lg:pb-24 lg:pt-44">
        <p className="text-label mb-6">More projects · Private</p>
        <MaskLines
          id="ai-grid-title"
          as="h1"
          className="font-medium leading-[0.97] tracking-[-0.048em] text-[clamp(2.75rem,5.4vw,5.25rem)]"
          lines={["100% AI", "projects"]}
          lineClassName={(i) => (i === 0 ? "text-text-primary" : "text-text-muted")}
        />
        <motion.p
          className="mt-8 max-w-[52ch] text-[17px] text-text-secondary"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.25 }}
        >
          Live sites and prototypes, built with AI from idea to working product.
        </motion.p>
      </div>

      <div className="relative border-t border-border">
        <div className="container-editorial py-16 lg:py-20">
          <ul
            className={`mx-auto grid gap-10 sm:gap-6 ${AI_PROJECTS.length > 1 ? "max-w-[1040px] sm:grid-cols-2" : "max-w-[520px]"}`}
            role="list"
          >
            {AI_PROJECTS.map((project, i) => (
              <ProjectCard key={project.url} project={project} i={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
