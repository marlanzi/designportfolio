"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ease } from "@/lib/motion";

/* ─── Line-by-line mask reveal for display type ────────────────── */
type MaskLinesProps = {
  lines: React.ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: (i: number) => string;
  delay?: number;
  id?: string;
};

export function MaskLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  id,
}: MaskLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const reduce = useReducedMotion();

  return (
    <Tag ref={ref as React.Ref<never>} id={id} className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block overflow-hidden pb-[0.1em] -mb-[0.1em] ${lineClassName?.(i) ?? ""}`}>
            <motion.span
              className="block"
              initial={reduce ? false : { y: "108%" }}
              animate={inView || reduce ? { y: "0%" } : undefined}
              transition={{ duration: 0.9, ease: ease.out, delay: delay + i * 0.08 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
    </Tag>
  );
}

/* ─── Image mask reveal + gentle scroll parallax ───────────────── */
export function RevealVisual({
  children,
  className = "",
  parallax = 5,
}: {
  children: React.ReactNode;
  className?: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: "inset(12% 0% 0% 0%)", opacity: 0.4 }}
      animate={inView || reduce ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } : undefined}
      transition={{ duration: 1.1, ease: ease.out }}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${parallax + 1}%`,
          bottom: `-${parallax + 1}%`,
          y: reduce ? 0 : y,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
