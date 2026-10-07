"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { BloomingPortrait } from "@/components/blooming-portrait";
import { TechStack } from "@/components/tech-stack";

const ALL_ART = [
  { src: "/art/art-1.jpg", title: "Studio works",         aspect: "16/9" },
  { src: "/art/art-2.jpg", title: "Acrylic on canvas",    aspect: "3/4"  },
  { src: "/art/art-3.jpg", title: "Soft current",         aspect: "4/3"  },
  { src: "/art/art-4.jpg", title: "Three canvases",       aspect: "4/3"  },
  { src: "/art/art-5.jpg", title: "Nocturne. Still.",     aspect: "1/1"  },
  { src: "/art/art-6.jpg", title: "Untitled. Becoming.",  aspect: "4/3"  },
  { src: "/art/art-7.jpg", title: "Verdure. Growth.",     aspect: "3/4"  },
  { src: "/art/art-8.jpg", title: "Deep water",           aspect: "4/3"  },
];

const ROW1 = ALL_ART.slice(0, 4);
const ROW2 = ALL_ART.slice(4);

export default function AboutPage() {
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setActiveIndex(i), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() =>
    setActiveIndex((i) => (i === null ? 0 : (i - 1 + ALL_ART.length) % ALL_ART.length)), []);
  const next = useCallback(() =>
    setActiveIndex((i) => (i === null ? 0 : (i + 1) % ALL_ART.length)), []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="container-editorial pt-28 pb-8">
        <p className="text-label mb-6 animate-fade-up">About me</p>
        <h1
          className="text-text-primary font-bold leading-none animate-fade-up animate-fade-up-1"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Martina Lanzi
        </h1>
      </div>

      <hr className="hairline" />

      {/* Bio section */}
      <div className="container-editorial pt-8 pb-16">
        <div className="grid gap-16 lg:grid-cols-[460px_1fr] lg:items-start">
          {/* Photo — the flowers are live layers (see BloomingPortrait) */}
          <BloomingPortrait className="mx-auto max-w-[460px] lg:mx-0" />

          {/* Text */}
          <div className="flex flex-col gap-10">
            <Reveal>
              <h2
                className="text-text-primary font-bold leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", letterSpacing: "-0.03em" }}
              >
                Product Designer & UX Strategist
              </h2>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="flex flex-col gap-4">
                <p className="text-text-secondary leading-relaxed">
                  I&apos;m a Product Designer who loves turning complex problems into
                  experiences that feel simple, thoughtful and intuitive. I work across
                  strategy, UX, visual design and design systems, always balancing what
                  users need with what makes sense for the product.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  I&apos;ve designed products across fintech, public safety, education and
                  more, collaborating closely with product and engineering teams from
                  early exploration to final execution.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  I&apos;m endlessly curious, always experimenting with new tools and ways
                  of working, and lately exploring how AI can help me move faster from
                  idea to prototype. For me, great design isn&apos;t just about making
                  things easier to use — it&apos;s about making technology feel more human.
                </p>
              </div>
            </Reveal>

            {/* Tech stack */}
            <Reveal delay={0.1}>
              <TechStack />
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.18}>
              <div className="flex flex-wrap gap-5 pt-2">
                <a
                  href="mailto:mar.lanzi96@gmail.com"
                  className="group flex items-center gap-3 text-sm font-semibold text-text-primary"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-bg-base transition-all duration-300"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  Get in touch
                </a>
                <a
                  href="https://www.linkedin.com/in/martinalanzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-muted hover:text-accent transition-colors duration-200 self-center"
                >
                  LinkedIn ↗
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Art section — marquee */}
      <div className="border-t border-border py-24">
        <Reveal>
          <div className="container-editorial mb-10 flex flex-col gap-3">
            <p className="text-label">Outside the screen</p>
            <h2
              className="text-text-primary font-bold"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.035em" }}
            >
              When I&apos;m not designing
            </h2>
            <p className="text-text-muted text-sm">
              Hover to pause · tap to explore
            </p>
          </div>
        </Reveal>

        {/* Marquee strips */}
        <div
          className={paused ? "marquee-paused" : ""}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Row 1 — scrolls left */}
          <div className="overflow-hidden mb-3">
            <div className="marquee-track flex gap-3 w-max">
              {[...ROW1, ...ROW1].map((piece, i) => (
                <button
                  key={i}
                  onClick={() => open(ALL_ART.indexOf(piece))}
                  className="shrink-0 overflow-hidden rounded-2xl bg-bg-raised focus:outline-none group"
                  style={{ height: 220, aspectRatio: piece.aspect }}
                  aria-label={`Open ${piece.title}`}
                >
                  <img
                    src={piece.src}
                    alt={piece.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="overflow-hidden">
            <div className="marquee-track-reverse flex gap-3 w-max">
              {[...ROW2, ...ROW2].map((piece, i) => (
                <button
                  key={i}
                  onClick={() => open(ALL_ART.indexOf(piece))}
                  className="shrink-0 overflow-hidden rounded-2xl bg-bg-raised focus:outline-none group"
                  style={{ height: 220, aspectRatio: piece.aspect }}
                  aria-label={`Open ${piece.title}`}
                >
                  <img
                    src={piece.src}
                    alt={piece.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          >
            {/* Blurred color-matched background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={ALL_ART[activeIndex].src}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover scale-110"
                style={{ filter: "blur(60px)" }}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Progress dashes */}
            <div className="relative z-10 flex gap-1.5 mb-6">
              {ALL_ART.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-8 bg-white" : "w-4 bg-white/35"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            {/* White card */}
            <motion.div
              className="relative z-10 bg-white rounded-3xl p-5 shadow-2xl"
              style={{ maxWidth: 520, width: "90vw" }}
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={ALL_ART[activeIndex].src}
                alt={ALL_ART[activeIndex].title}
                className="w-full rounded-xl object-contain"
                style={{ maxHeight: "55vh" }}
              />
            </motion.div>

            {/* Caption */}
            <div className="relative z-10 mt-5 text-center">
              <p className="text-white font-semibold text-sm">{ALL_ART[activeIndex].title}</p>
              <p className="text-white/50 text-xs mt-0.5">{activeIndex + 1} / {ALL_ART.length}</p>
            </div>

            {/* Prev arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Next arrow */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              ›
            </button>

            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors duration-200 backdrop-blur-sm text-lg"
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
