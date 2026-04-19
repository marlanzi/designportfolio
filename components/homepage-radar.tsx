"use client";

import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

const INTERESTS = [
  {
    area: "AI-native UX",
    note: "Designing for probabilistic outputs — where user trust is the hardest constraint.",
  },
  {
    area: "Design operations",
    note: "The systems behind design systems: how teams ship at quality, at speed.",
  },
  {
    area: "Onboarding as product strategy",
    note: "First impressions compound. Most products still treat them as an afterthought.",
  },
  {
    area: "Typography as UX",
    note: "Hierarchy isn't decoration — it's the first interaction a user has with information.",
  },
  {
    area: "Cross-surface coherence",
    note: "Making the same product feel right across mobile, web, and embedded surfaces.",
  },
];

export function HomepageRadar() {
  return (
    <section className="container-editorial py-32" aria-label="Current interests">
      <hr className="hairline mb-16" />

      <div className="grid gap-16 lg:grid-cols-[1fr_2fr]">
        {/* Label col */}
        <Reveal>
          <div className="flex flex-col gap-4">
            <p className="text-label">Design radar</p>
            <h2
              className="text-text-primary font-bold"
              style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
            >
              What I&apos;m<br />thinking about
            </h2>
          </div>
        </Reveal>

        {/* Interests list */}
        <motion.ul
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "200px 0px 0px 0px" }}
          className="flex flex-col"
          role="list"
        >
          {INTERESTS.map((item, i) => (
            <motion.li
              key={item.area}
              variants={fadeUp}
              className="group flex items-start gap-6 border-t border-border py-6 last:border-b"
            >
              <span className="text-label mt-1 shrink-0" style={{ minWidth: "1.5rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                  {item.area}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">{item.note}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
