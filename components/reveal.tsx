"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface RevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
}

export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Generous margin so elements animate in as soon as they enter the viewport
  const inView = useInView(ref, { once, margin: "200px 0px 0px 0px" });

  const v: Variants = {
    hidden: variants.hidden ?? { opacity: 0, y: 24 },
    visible: {
      ...(typeof variants.visible === "object" ? variants.visible : {}),
      transition: {
        ...(typeof variants.visible === "object" &&
        "transition" in variants.visible &&
        typeof variants.visible.transition === "object"
          ? (variants.visible.transition as object)
          : {}),
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={v}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}
