"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN  = [0.7, 0, 0.84, 0] as const;

const PHRASES = [
  "a product designer.",
  "a problem solver.",
  "a design engineer.",
];

/* ── Mask-reveal for static line ── */
const lineReveal = {
  hidden: { y: "108%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { delay: 0.1 + i * 0.13, duration: 0.85, ease: EASE_OUT },
  }),
};

export function HomepageHero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  /* ── Phrase cycling ── */
  const [index, setIndex]     = useState(0);
  const [started, setStarted] = useState(false);

  // Wait for entrance animation to settle, then cycle
  useEffect(() => {
    const delay = setTimeout(() => setStarted(true), 2800);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(
      () => setIndex(i => (i + 1) % PHRASES.length),
      2800
    );
    return () => clearInterval(id);
  }, [started]);

  return (
    <section
      ref={containerRef}
      className="gradient-section relative min-h-screen flex flex-col justify-end overflow-hidden"
      aria-label="Introduction"
    >
      {/* Atmospheric grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Blob 1 — warm orange, bottom-left */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.10, 0.18, 0.10], scale: [1, 1.04, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 8% 92%, #FF5924 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      {/* Blob 2 — pink-magenta, top-right */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.07, 0.13, 0.07], scale: [1, 1.06, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 90% 10%, #C850C0 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Blob 3 — violet, center-right */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.05, 0.10, 0.05], scale: [1, 1.03, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 4.5 }}
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 75% 70%, #6D60BC 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Top meta row */}
      <motion.div
        className="container-editorial absolute top-0 left-0 right-0 flex items-center justify-between pt-28"
        style={{ y, opacity }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.05 }}
      >
        <span className="text-label">Product Designer · Buenos Aires</span>
        <span className="text-label">Available for new work</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="container-editorial pb-16 pt-40"
        style={{ y }}
        initial="hidden"
        animate="visible"
      >
        {/* ── Line 1 — static name, mask reveal ── */}
        <div className="overflow-hidden" style={{ paddingBottom: "16px", paddingTop: "8px" }}>
          <motion.p
            custom={0}
            variants={lineReveal}
            className="display-xl text-text-primary"
          >
            I&apos;m Martina Lanzi,
          </motion.p>
        </div>

        {/* ── Line 2 — cycling phrase ── */}
        <div className="overflow-hidden" style={{ paddingBottom: "32px", paddingTop: "8px" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="display-xl gradient-text"
              initial={{ y: "108%" }}
              animate={{ y: "0%" }}
              exit={{
                y: "-108%",
                transition: { duration: 0.38, ease: EASE_IN },
              }}
              transition={
                index === 0 && !started
                  ? { duration: 0.85, ease: EASE_OUT, delay: 0.23 }
                  : { duration: 0.55, ease: EASE_OUT }
              }
            >
              {PHRASES[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Hairline rule */}
        <motion.div
          className="h-px bg-border origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.9, ease: EASE_OUT }}
          aria-hidden="true"
        />

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-wrap items-center gap-5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.65, ease: EASE_OUT }}
        >
          <Link
            href="/work"
            className="group flex items-center gap-3 text-sm font-semibold text-text-primary"
          >
            <motion.span
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-bg-base transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              aria-hidden="true"
            >
              →
            </motion.span>
            View selected work
          </Link>
          <Link
            href="/contact"
            className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
          >
            Get in touch
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="container-editorial pb-8 flex items-center gap-3"
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <motion.div
          className="h-8 w-px bg-border origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.3, duration: 1.0, ease: EASE_OUT }}
          aria-hidden="true"
        />
        <span className="text-label">Scroll</span>
      </motion.div>
    </section>
  );
}
