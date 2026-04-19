import type { Variants } from "framer-motion";

/* ─── Easing ─────────────────────────────────────────────────── */
export const ease = {
  out:     [0.16, 1, 0.3, 1]   as [number, number, number, number],
  inOut:   [0.45, 0, 0.55, 1]  as [number, number, number, number],
  spring:  { type: "spring", stiffness: 80, damping: 20 },
} as const;

/* ─── Fade up — primary scroll reveal ───────────────────────── */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

/* ─── Fade in — simple opacity ───────────────────────────────── */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: ease.out },
  },
};

/* ─── Slide in from left ─────────────────────────────────────── */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

/* ─── Stagger container ──────────────────────────────────────── */
export const stagger = (delay = 0.08): Variants => ({
  hidden:  {},
  visible: {
    transition: { staggerChildren: delay, delayChildren: 0.1 },
  },
});

/* ─── Text reveal (line by line) ─────────────────────────────── */
export const textReveal: Variants = {
  hidden:  { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out },
  },
};

/* ─── Scale on hover ─────────────────────────────────────────── */
export const scaleHover = {
  whileHover: { scale: 1.015, transition: { duration: 0.3, ease: ease.out } },
  whileTap:   { scale: 0.99 },
};

/* ─── Line draw ──────────────────────────────────────────────── */
export const lineDraw: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: ease.out },
  },
};
