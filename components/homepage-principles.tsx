"use client";

import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    number: "I",
    title: "Start with the system, not the screen",
    body: "A beautiful screen inside a broken flow is still broken. I map the whole before I design the part.",
  },
  {
    number: "II",
    title: "Ambiguity is a design material",
    body: "The best work I've done started with an unclear brief. Turning fog into focus is half the job.",
  },
  {
    number: "III",
    title: "Trust is earned at every interaction",
    body: "Users don't read. They feel. Every micro-decision either builds or erodes confidence.",
  },
];

export function HomepagePrinciples() {
  return (
    <section className="bg-bg-surface py-32" aria-label="Design principles">
      <div className="container-editorial">
        <hr className="hairline mb-16" />

        <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
          {/* Label */}
          <Reveal>
            <div className="flex flex-col gap-6">
              <p className="text-label">How I think</p>
              <h2
                className="text-text-primary font-bold leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
              >
                Design<br />principles
              </h2>
              <Link
                href="/process"
                className="mt-4 text-sm text-text-muted hover:text-accent transition-colors duration-200 self-start"
              >
                See full process →
              </Link>
            </div>
          </Reveal>

          {/* Principles */}
          <motion.ol
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "200px 0px 0px 0px" }}
            className="flex flex-col gap-10"
            role="list"
          >
            {PRINCIPLES.map((p) => (
              <motion.li key={p.number} variants={fadeUp} className="flex gap-8">
                <span
                  className="shrink-0 font-bold text-text-muted"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.06em", marginTop: "4px" }}
                  aria-hidden="true"
                >
                  {p.number}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-text-primary leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{p.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
