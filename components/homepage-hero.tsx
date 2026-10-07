"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";
import { useRouter } from "next/navigation";
import { DepthCarousel, type DepthItem } from "@/components/depth-carousel";
import { PROJECT_COVERS } from "@/lib/projects";
import { useState } from "react";
import { MoreProjectsCard } from "@/components/more-projects-card";
import { PasswordDialog } from "@/components/password-dialog";

/* ─── Choreography (seconds) ───────────────────────────────────── */
const T = {
  grid: 0,
  availability: 0.2,
  lines: 0.28,
  lineStep: 0.1,
  copy: 0.62,
  cta: 0.72,
  cards: 0.35,
  strip: 1.1,
};

/* ─── Project carousel — the same covers as the grid below ───── */
/* …plus a locked card for the password-protected AI projects */
const MORE_PROJECTS_HREF = "/work/more";
const PROJECTS: DepthItem[] = [
  ...PROJECT_COVERS,
  {
    alt: "More projects: AI case studies and prototypes, password protected",
    href: MORE_PROJECTS_HREF,
    background: "#f7f8fd",
    render: (active) => <MoreProjectsCard active={active} />,
  },
];

/* ─── Credibility strip ────────────────────────────────────────── */
const LOGOS = [
  { name: "Google", src: "/logos/google-wordmark.svg", w: 272, h: 92, height: 26 },
  { name: "Blink", src: "/logos/blink.svg", w: 88, h: 31, height: 24 },
  { name: "Santander", src: "/logos/santander-wordmark.svg", w: 238, h: 42, height: 21 },
  { name: "Lexipol", src: "/logos/lexipol.svg", w: 242, h: 49, height: 22 },
  { name: "Crowder", src: "/logos/crowder.svg", w: 738, h: 168, height: 22 },
  { name: "Dualboot Partners", src: "/logos/dualboot-partners.svg", w: 158, h: 40, height: 32 },
];

function LogoCarousel() {
  // Two copies so the -50% loop is seamless
  const items = [...LOGOS, ...LOGOS];
  return (
    <div
      className="logo-carousel relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label="Selected experience: Google, Blink, Santander, Lexipol, Crowder, Dualboot Partners"
      role="img"
    >
      <ul className="marquee-track flex w-max items-center" style={{ animationDuration: "32s" }} role="list">
        {items.map((logo, i) => (
          <li key={i} className="flex shrink-0 items-center pr-16 lg:pr-20" aria-hidden="true">
            <Image
              src={logo.src}
              alt=""
              width={logo.w}
              height={logo.h}
              unoptimized
              className="logo-mono w-auto"
              style={{ height: logo.height }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────── */
const HEADLINE = [
  { text: "Turning complex", tone: "text-text-primary" },
  { text: "products into", tone: "text-text-primary" },
  { text: "clear, scalable", tone: "text-text-muted" },
  { text: "experiences.", tone: "text-text-muted" },
];

export function HomepageHero() {
  const reduce = useReducedMotion();
  const router = useRouter();

  const [askPassword, setAskPassword] = useState(false);
  const openProject = (item: DepthItem) => {
    if (!item.href) return;
    if (item.href === MORE_PROJECTS_HREF) {
      setAskPassword(true);
      return;
    }
    if (item.href.startsWith("#")) {
      document.querySelector(item.href)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    } else {
      router.push(item.href);
    }
  };
  const fade = (delay: number, y = 14) =>
    ({
      initial: reduce ? false : { opacity: 0, y },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: ease.out, delay },
    }) as const;

  return (
    <section
      className="relative flex min-h-[100svh] flex-col"
      aria-label="Introduction"
    >
      {/* Background grid — fine graph-paper lines, fading out toward the edges */}
      <motion.div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: ease.out, delay: T.grid }}
      />

      {/* Structural grid boundaries */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="container-editorial h-full">
          <motion.div
            className="h-full origin-top border-x border-border"
            initial={reduce ? false : { scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: ease.out, delay: T.grid }}
          />
        </div>
      </div>

      <div className="container-editorial relative grid flex-1 grid-cols-[minmax(0,1fr)] items-center gap-12 pb-12 pt-28 md:gap-16 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-32">
        {/* Copy column (~48%) */}
        <div className="flex min-w-0 flex-col items-start gap-8 lg:col-span-6 lg:pl-6">
          <motion.span
            {...fade(T.availability, 8)}
            className="inline-flex items-center gap-2.5 rounded-full bg-bg-elevated px-3.5 py-1.5 text-[13px] font-medium text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.05),0_0_0_1px_var(--border)]"
          >
            <span
              className="h-2 w-2 rounded-full bg-[#34a853] shadow-[0_0_0_3px_rgba(52,168,83,0.18),0_0_8px_rgba(52,168,83,0.55)]"
              aria-hidden="true"
            />
            Available for opportunities
          </motion.span>

          <h1 className="font-medium leading-[0.97] tracking-[-0.048em] text-[clamp(2.75rem,5.4vw,5.25rem)]">
            {HEADLINE.map((line, i) => (
              <span key={line.text} className="-mb-[0.06em] block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${line.tone}`}
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, ease: ease.out, delay: T.lines + i * T.lineStep }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...fade(T.copy)}
            className="max-w-[460px] text-[19px] leading-[1.4] tracking-[-0.01em] text-text-secondary"
          >
            <span className="font-medium text-text-primary">
              I research, structure and design complex digital products
            </span>{" "}
            — working across systems thinking, UX, UI and increasingly code.
          </motion.p>

          <motion.div {...fade(T.cta, 10)} className="flex flex-wrap items-center gap-6">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-text-primary py-1.5 pl-1.5 pr-5 text-[15px] font-medium text-bg-base shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_8px_20px_-12px_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2),0_14px_28px_-12px_rgba(0,0,0,0.55)] motion-reduce:transition-none"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20">
                <Image src="/martina.png" alt="" fill sizes="36px" className="object-cover" />
              </span>
              Explore my work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
            </a>
          </motion.div>
        </div>

        {/* Visual column (~52%) */}
        <motion.div
          className="relative h-[340px] min-w-0 sm:h-[500px] lg:col-span-6"
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: ease.out, delay: T.cards }}
        >
          <DepthCarousel
            items={PROJECTS}
            depth={220}
            spread={90}
            tilt={22}
            tiltDirection="right"
            perspective={1400}
            visibleCards={4}
            falloff={0.2}
            blur={6}
            autoplay={false}
            loop
            cardWidth={300}
            cardHeight={380}
            radius={18}
            tint="#05060a"
            duration={700}
            ease="power3.out"
            autoplayDelay={3200}
            showControls
            showIndicators
            onOpen={openProject}
          />
          <PasswordDialog
            open={askPassword}
            onClose={() => setAskPassword(false)}
            onUnlocked={() => {
              setAskPassword(false);
              router.push(MORE_PROJECTS_HREF);
            }}
          />
        </motion.div>
      </div>

      {/* Credibility strip */}
      <motion.div
        className="relative border-t border-border"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: ease.out, delay: T.strip }}
      >
        <div className="container-editorial">
          <div className="grid items-center gap-6 py-7 sm:grid-cols-12 lg:py-8">
            <div className="flex flex-col sm:col-span-3 lg:pl-6">
              <span className="text-[22px] font-medium leading-none tracking-[-0.03em] text-text-primary">6 years</span>
              <span className="mt-1.5 text-[13px] text-text-secondary">Product Design</span>
            </div>
            <div className="min-w-0 sm:col-span-9 lg:pr-6">
              <LogoCarousel />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
