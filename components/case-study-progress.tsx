"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";

export type Chapter = { id: string; label: string };

/* Reading-progress header for case studies. On desktop it frames the floating
   name capsule (project left, chapter + progress right); on phones a slim chapter
   row sits under the capsule. A hairline fills as you read. */
export function CaseStudyProgress({ project, chapters }: { project: string; chapters: Chapter[] }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const [percent, setPercent] = useState(0);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => setPercent(Math.round(v * 100)));

  // Current chapter = the last one whose top has passed 35% of the viewport
  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = 0;
      chapters.forEach(({ id }, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      // At the very bottom, the last chapter is the one being read
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = chapters.length - 1;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [chapters]);

  const chapter = chapters[active];
  const count = `${String(active + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  return (
    <div
      className="fixed inset-x-0 top-0 z-40 border-b border-border bg-bg-base/85 pt-[68px] backdrop-blur-md md:pt-0"
      role="navigation"
      aria-label={`${project} case study progress`}
    >
      <div className="container-editorial flex h-10 items-center justify-between gap-4 text-[13px] md:h-[78px]">
        {/* Left: way back + project */}
        <div className="flex min-w-0 items-center gap-4 md:w-[calc(50%-150px)]">
          <Link
            href="/work"
            className="hidden shrink-0 text-text-secondary transition-colors duration-200 hover:text-text-primary md:inline"
          >
            ← Work
          </Link>
          <span className="hidden h-3 w-px bg-border md:block" aria-hidden="true" />
          <span className="truncate font-medium text-text-primary">{project}</span>
        </div>

        {/* Right: chapter + progress */}
        <div className="flex min-w-0 items-center justify-end gap-4 md:w-[calc(50%-150px)]">
          <button
            type="button"
            onClick={() => jump(chapters[Math.min(active + 1, chapters.length - 1)].id)}
            className="flex min-w-0 items-center gap-2 text-text-secondary transition-colors duration-200 hover:text-text-primary"
            aria-label={`Current section: ${chapter?.label}. Skip to next section`}
          >
            <span className="shrink-0 tabular-nums text-text-muted">{count}</span>
            <motion.span
              key={chapter?.id}
              className="truncate"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {chapter?.label}
            </motion.span>
          </button>
          <span className="w-9 shrink-0 text-right font-medium tabular-nums text-text-primary">{percent}%</span>
        </div>
      </div>

      {/* Progress line */}
      <div className="absolute inset-x-0 -bottom-px h-[2px]">
        <motion.div className="h-full origin-left bg-text-primary" style={{ scaleX: reduce ? scrollYProgress : bar }} />
      </div>
    </div>
  );
}

/* Strip a leading "01 · " style index so labels read cleanly in the header */
export function chapterLabel(label: string) {
  return label.replace(/^\s*\d+\s*·\s*/, "");
}
