"use client";

import { motion } from "framer-motion";
import { TECH_STACK } from "@/lib/tech-stack";
import { ease } from "@/lib/motion";

/* "My tech stack" — brand marks in soft square tiles */
export function TechStack() {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[1.375rem] font-medium tracking-[-0.025em] text-text-primary">My tech stack</h3>
      <motion.ul
        className="flex flex-wrap gap-2.5 sm:gap-3"
        role="list"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {TECH_STACK.map((tool) => (
          <motion.li
            key={tool.name}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
            }}
          >
            <motion.div
              className="group relative flex h-16 w-16 items-center justify-center rounded-[16px] border border-border bg-bg-elevated text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-12px_rgba(0,0,0,0.18)] sm:h-[72px] sm:w-[72px] sm:rounded-[18px]"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              title={tool.name}
            >
              <svg viewBox={tool.viewBox} className="h-6 w-6 sm:h-7 sm:w-7" role="img" aria-label={tool.name}>
                <path d={tool.d} fill="currentColor" fillRule={tool.evenOdd ? "evenodd" : undefined} clipRule={tool.evenOdd ? "evenodd" : undefined} />
              </svg>
              <span
                className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-text-primary px-2.5 py-1 text-[11px] font-medium text-bg-base opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                aria-hidden="true"
              >
                {tool.name}
              </span>
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
