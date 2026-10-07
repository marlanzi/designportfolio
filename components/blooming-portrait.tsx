"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { BLOOMS, PORTRAIT_SIZE, type Bloom } from "@/lib/about-blooms";

/* The About portrait with living flowers. The photo and foliage are one base
   image; each hand-drawn blossom is its own layer on top, cut from the same
   artwork so at rest it reads as the original. The blossoms open in from the
   centre, then sway on their own rhythms — hibiscus nod slowly from the stem,
   yellow sprigs flutter — and drift a little with the pointer for depth. */

const pct = (v: number) => `${(v / PORTRAIT_SIZE) * 100}%`;

// Small deterministic variation per blossom, so rhythms never line up
const vary = (i: number, salt: number) => {
  const s = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

function Blossom({ bloom, i, px, py }: { bloom: Bloom; i: number; px: ReturnType<typeof useSpring>; py: ReturnType<typeof useSpring> }) {
  const reduce = useReducedMotion();
  const hibiscus = bloom.kind === "hibiscus";
  const depth = hibiscus ? 1 : 0.6;
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);

  // Open in from the centre of the portrait outward
  const cx = bloom.x + bloom.w / 2 - PORTRAIT_SIZE / 2;
  const cy = bloom.y + bloom.h / 2 - PORTRAIT_SIZE / 2;
  const delay = 0.35 + (Math.hypot(cx, cy) / PORTRAIT_SIZE) * 0.9 + vary(i, 1) * 0.15;

  const amp = hibiscus ? 1.6 + vary(i, 2) * 1.2 : 3 + vary(i, 3) * 3;
  const dir = vary(i, 4) > 0.5 ? 1 : -1;
  const duration = hibiscus ? 5.5 + vary(i, 5) * 2.5 : 3.4 + vary(i, 6) * 1.8;

  return (
    <motion.div
      className="absolute"
      style={{ left: pct(bloom.x), top: pct(bloom.y), width: pct(bloom.w), x, y }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.55 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reduce
          ? { duration: 0.4, delay: 0.2 }
          : { delay, opacity: { duration: 0.35, delay }, scale: { type: "spring", stiffness: 160, damping: 13, delay } }
      }
    >
      <motion.div
        style={{ transformOrigin: hibiscus ? "50% 85%" : "50% 100%" }}
        animate={
          reduce
            ? undefined
            : {
                rotate: [0, amp * dir, -amp * 0.55 * dir, 0],
                y: hibiscus ? [0, -1.5, 0.5, 0] : [0, -2, 0, 0],
              }
        }
        transition={reduce ? undefined : { duration, repeat: Infinity, ease: "easeInOut", delay: delay + 0.6 }}
      >
        <Image
          src={bloom.src}
          alt=""
          width={bloom.w}
          height={bloom.h}
          unoptimized
          draggable={false}
          className="block h-auto w-full select-none"
        />
      </motion.div>
    </motion.div>
  );
}

export function BloomingPortrait({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 16 });
  const py = useSpring(my, { stiffness: 60, damping: 16 });

  // Blossoms sit "in front", so they drift slightly against the pointer
  useEffect(() => {
    if (reduce) return;
    const move = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      const inside = Math.abs(dx) < 0.9 && Math.abs(dy) < 0.9;
      mx.set(inside ? -dx * 8 : 0);
      my.set(inside ? -dy * 8 : 0);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, mx, my]);

  return (
    <div ref={ref} className={`relative aspect-square w-full ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src="/about/portrait-v2.webp"
          alt="Martina Lanzi by a lake, holding a mate and wearing a tote bag that reads “Mucho amor”, framed by hand-drawn hibiscus and yellow flowers"
          fill
          priority
          sizes="(min-width: 1024px) 460px, 92vw"
          className="select-none object-contain"
          draggable={false}
        />
      </motion.div>
      <div className="absolute inset-0" aria-hidden="true">
        {BLOOMS.map((bloom, i) => (
          <Blossom key={bloom.src} bloom={bloom} i={i} px={px} py={py} />
        ))}
      </div>
    </div>
  );
}
