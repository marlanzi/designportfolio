"use client";

import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

const METRICS = [
  {
    value: "40+",
    label: "Dynamic text assets shipped to YouTube Create",
    context: "Google CCS · 2023",
  },
  {
    value: "5+",
    label: "Years designing for fintech, public safety, and consumer apps",
    context: "Cross-industry",
  },
  {
    value: "3",
    label: "Google product surfaces unified under one content system",
    context: "Tenor · Gboard · YouTube",
  },
  {
    value: "0→1",
    label: "Mobile products designed from first principles",
    context: "Quentro · Tenor CCS",
  },
];

export function HomepageMetrics() {
  return (
    <section className="bg-bg-surface py-32" aria-label="Impact metrics">
      <div className="container-editorial">
        <Reveal>
          <p className="text-label mb-16">Impact at a glance</p>
        </Reveal>

        <motion.dl
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "200px 0px 0px 0px" }}
          className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4"
        >
          {METRICS.map((m) => (
            <motion.div key={m.value} variants={fadeUp}>
              <dt>
                <span
                  className="gradient-text"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {m.value}
                </span>
              </dt>
              <dd className="mt-3 flex flex-col gap-1">
                <p className="text-sm text-text-secondary leading-snug">{m.label}</p>
                <p className="text-xs text-text-muted">{m.context}</p>
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
