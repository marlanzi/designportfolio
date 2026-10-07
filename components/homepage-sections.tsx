"use client";

import Link from "next/link";
import Image from "next/image";
import { MaskLines, RevealVisual } from "@/components/editorial";
import { Reveal } from "@/components/reveal";

const mutedSecond = (i: number) => (i === 1 ? "text-text-muted" : "text-text-primary");

/* ─── Personal statement ───────────────────────────────────────── */
export function HomepageStatement() {
  return (
    <section className="container-editorial py-32 lg:py-52" aria-labelledby="statement">
      <MaskLines
        id="statement"
        as="h2"
        className="display-statement"
        lines={["Complexity doesn’t need", "to feel complicated."]}
        lineClassName={mutedSecond}
      />
      <Reveal className="mt-12 grid lg:mt-16 lg:grid-cols-12">
        <p className="text-lg leading-relaxed text-text-secondary lg:col-span-5 lg:col-start-7 lg:text-xl">
          I work on products where users, workflows and systems intersect — finding the structure
          underneath complexity and turning it into experiences that feel obvious.
        </p>
      </Reveal>
    </section>
  );
}

export function AllWorkLink() {
  return (
    <div className="container-editorial pt-28 lg:pt-40">
      <Link
        href="/work"
        className="group flex items-baseline justify-between gap-6 border-y border-border py-8 text-text-primary"
      >
        <span className="font-medium tracking-[-0.035em] text-[clamp(1.75rem,3.4vw,3.25rem)]">All work</span>
        <span className="text-sm text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
          Google · Santander · Quentro and more{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

/* ─── How I think ──────────────────────────────────────────────── */
const STEPS = [
  { name: "Understand", detail: "Research" },
  { name: "Structure", detail: "Systems + IA" },
  { name: "Design", detail: "UX + UI" },
  { name: "Prototype", detail: "Interaction + AI + Code" },
  { name: "Validate", detail: "Users + Product" },
];

export function HowIThink() {
  return (
    <section className="container-editorial py-32 lg:py-48" aria-labelledby="how-i-think">
      <div className="grid gap-8 lg:grid-cols-12">
        <p className="text-label lg:col-span-2 lg:pt-4">How I think</p>
        <div className="lg:col-span-10">
          <MaskLines
            id="how-i-think"
            as="h2"
            className="display-statement"
            lines={["Designing beyond", "the interface."]}
            lineClassName={mutedSecond}
          />
          <Reveal>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-text-secondary">
              I move between research, systems thinking, interaction design and prototyping to
              understand not only what an interface should look like, but how the product should work.
            </p>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <ol className="mt-20 grid border-t border-border lg:mt-28 lg:grid-cols-5" role="list">
          {STEPS.map((step, i) => (
            <li
              key={step.name}
              className="flex flex-col gap-2 border-b border-border py-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-label">{String(i + 1).padStart(2, "0")}</span>
                <span className={i < STEPS.length - 1 ? "text-text-muted" : "invisible"} aria-hidden="true">
                  <span className="lg:hidden">↓</span>
                  <span className="hidden lg:inline">→</span>
                </span>
              </div>
              <p className="mt-4 text-2xl font-medium tracking-[-0.03em] text-text-primary lg:mt-10 lg:text-[1.75rem]">
                {step.name}
              </p>
              <p className="text-sm text-text-secondary">{step.detail}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

/* ─── Design × code ────────────────────────────────────────────── */
export function DesignEngineering() {
  return (
    <section className="container-editorial pb-32 lg:pb-48" aria-labelledby="design-code">
      <Reveal>
        <div className="grid gap-8 border-t border-border pt-6 lg:grid-cols-12">
          <p className="text-label lg:col-span-2">Design × Code</p>
          <h2
            id="design-code"
            className="font-medium leading-[1.04] tracking-[-0.035em] text-text-primary text-[clamp(1.75rem,3vw,2.875rem)] lg:col-span-7"
          >
            Increasingly working at the intersection of design and code.
          </h2>
          <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-10">
            <p className="leading-relaxed text-text-secondary">
              Using AI-assisted development, coded prototypes and design systems to explore ideas faster
              and bring design closer to production.
            </p>
            <ul className="border-t border-border" role="list">
              {["Figma", "VS Code", "Storybook", "AI-assisted development", "Prototyping"].map((tool) => (
                <li key={tool} className="border-b border-border py-2 text-sm text-text-secondary">
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── About preview ────────────────────────────────────────────── */
export function AboutPreview() {
  return (
    <section className="container-editorial pb-32 lg:pb-48" aria-labelledby="about-preview">
      <div className="grid gap-10 border-t border-border pt-6 lg:grid-cols-12">
        <p className="text-label lg:col-span-2">About</p>
        <div className="max-w-xs lg:col-span-3 lg:max-w-none">
          <RevealVisual parallax={3} className="aspect-[4/5] bg-bg-raised">
            <Image
              src="/martina.png"
              alt="Illustrated portrait of Martina Lanzi"
              fill
              sizes="(min-width: 1024px) 22vw, 320px"
              className="object-cover"
            />
          </RevealVisual>
        </div>
        <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
          <MaskLines
            id="about-preview"
            as="h2"
            className="font-medium leading-[0.98] tracking-[-0.045em] text-[clamp(2.25rem,4.6vw,4.75rem)]"
            lines={["Industrial designer", "turned digital", "problem solver."]}
            lineClassName={(i) => (i === 2 ? "text-text-muted" : "text-text-primary")}
          />
          <Reveal>
            <p className="max-w-lg text-lg leading-relaxed text-text-secondary">
              Studying Industrial Design taught me to think in systems, constraints and people — how
              things work, not only how they look. I bring the same lens to digital products.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-medium text-text-primary"
            >
              More about me <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
