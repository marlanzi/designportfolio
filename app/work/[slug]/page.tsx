"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";

/* ─── Types ────────────────────────────────────────────────────── */
type Project = {
  slug: string;
  index: string;
  company: string;
  name: string;
  tagline: string;
  year: string;
  role: string;
  scope: string;
  duration: string | null;
  image?: string | null;
  video?: string;
  mockups?: string[];
  features?: { label: string; heading: string; body: string; image: string }[];
  overview: string;
  sections: { label: string; heading: string; body: string }[];
  outcomes: { metric: string; label: string }[];
  nextSlug: string;
  nextName: string;
  articleLink?: string;
  illustrationImage?: string;
  themesGridImage?: string;
  rouletteImage?: string;
};

/* ─── Project data ─────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    slug: "tenor-caption",
    index: "01",
    company: "C+E Studio · Google",
    name: "Tenor Creator Experience",
    tagline: "Tenor had the scale. The creator tools hadn't kept pace. This was the redesign.",
    year: "2022–2023",
    role: "Sr. Product Designer",
    scope: "Creator Tools · Redesign · Feature Definition · Mobile UX",
    duration: "8 months",
    image: "/tenorcreation.png",
    overview:
      "Tenor is the world's largest GIF keyboard — billions of shares per year across every major platform. But the creator-facing product had fallen behind. The interface that content creators used to upload, caption, and publish GIFs was functional but unpolished: limited search, static text-only captions, opaque approval flows, and upload constraints that capped quality. This was a focused redesign effort with a clear mandate: uplevel every touchpoint of the creation experience to match the platform's scale and ambition.",
    sections: [
      {
        label: "The Problem",
        heading: "A product at scale, with a creator experience that hadn't scaled with it.",
        body: "The friction was specific and accumulated: cross-source searching was limited, editing capabilities were restricted, captions were static and text-only, upload sizes were constrained, and there was no visibility into the approval process. The result was a creator experience that asked more than it gave — one that had been extended over time without a cohesive UX layer holding it together.",
      },
      {
        label: "Redesign Scope",
        heading: "Audit the full journey before touching a single screen.",
        body: "Before wireframing anything, I mapped the end-to-end creator flow — from content discovery through upload, captioning, and publish — cataloguing every friction point, unclear state, and missed opportunity. The audit made clear that the problems weren't isolated bugs: they reflected a product that needed structural and surface-level attention simultaneously.",
      },
      {
        label: "Execution",
        heading: "Expressive captions, unified search, three coherent creation paths.",
        body: "The centrepiece of the redesign was replacing static text captions with Dynamic Text — bringing animated, expressive captioning to the platform using the same system powering Gboard and YouTube Create. I redesigned the content insertion panel with unified search across stickers, GIFs, clips, and memes, and restructured upload flows into three distinct paths — search-based, gallery-based, and text-only — each optimised for a different creator mode.",
      },
    ],
    outcomes: [
      { metric: "3", label: "Creator flow options designed (search, gallery, text-only)" },
      { metric: "0→1", label: "Dynamic Text captioning introduced to Tenor" },
      { metric: "1", label: "Unified search across all content sources" },
    ],
    nextSlug: "google-notes",
    nextName: "Notes by Google",
  },
  {
    slug: "google-notes",
    index: "02",
    company: "C+E Studio · Google",
    name: "Notes by Google",
    tagline: "A Search Labs experiment for sharing helpful perspectives — with a visual system built to make every note expressive by default.",
    year: "2023",
    role: "Sr. Product Designer",
    scope: "Interaction Design · Theming · Figma Plugin Dev",
    duration: "5 months",
    articleLink: "https://blog.google/products-and-platforms/products/search/notes-google-search-labs-experiment/",
    overview:
      "Notes is a Google Search Labs experiment that lets people share helpful tips and perspectives directly on Search results and web pages — customizable with visual note styles, stickers, and photos. The goal: surface the wisdom of real people alongside traditional results. My work at the Creative Content Studio was to design the theming system that made every note visually compelling by default, and to build the tooling that made theme creation, iteration, and handoff self-serve for both designers and engineers.",
    sections: [
      {
        label: "01 · Context",
        heading: "A new way to contribute to Search.",
        body: "Notes gives anyone the ability to share helpful tips and perspectives directly on Google Search results and web pages — experts and everyday users alike. For the Creative Content Studio, that created a clear design challenge: every note needed to look visually compelling out of the box, before any personalisation, across a corpus that would grow fast.",
      },
      {
        label: "02 · Mission",
        heading: "Themes that elevate the content without overshadowing it.",
        body: "CCS was tasked with creating a theme library wide enough to serve any creator's intent — from a skincare tip to a travel rec to a recipe note. The goal was visual diversity that still felt cohesive: a range of styles broad enough to feel personal, consistent enough to feel like a single product.",
      },
      {
        label: "03 · Core Principles",
        heading: "Effortless creation. Genuine expression.",
        body: "Two principles guided every design decision. Effortless: creating a visually engaging note should require just a few taps — no design skill needed. Expressive: themes should span a genuine range of styles and moods so that creators can find something that actually represents their content, not just a default they tolerate.",
      },
      {
        label: "04 · Development",
        heading: "A Figma plugin that made the system self-serve.",
        body: "The plugin features a unified structure that lets UX designers swap and update theme elements and create new themes independently. On the engineering side, it exports every theme as JSON — preserving every design detail with zero loss in translation. What had been a back-and-forth ticket workflow became a self-serve pipeline for both teams.",
      },
    ],
    outcomes: [
      { metric: "0→1", label: "Theming system for Google Search Notes" },
      { metric: "2", label: "Teams unblocked: UX designers + engineers via one plugin" },
      { metric: "100%", label: "Theme export fidelity via JSON — no detail lost in handoff" },
    ],
    nextSlug: "google-dynamic-text",
    nextName: "Dynamic Text",
  },
  {
    slug: "google-dynamic-text",
    index: "03",
    company: "C+E Studio · Google",
    name: "Dynamic Text",
    tagline: "Typed phrases turned into animated, expressive assets — shipped across Gboard and YouTube Create.",
    year: "2022–2024",
    role: "Sr. Product Designer",
    scope: "Content UX · Localization · Competitive Research · Feature Definition",
    duration: "2 years",
    video: "/dynamictext.mp4",
    image: null,
    mockups: [],
    overview:
      "Dynamic Text is a Creative Content Studio feature that transforms typed phrases into animated, expressive text assets. My work spanned two distinct surfaces — Gboard (the world's most-used mobile keyboard) and YouTube Create — each with different users, contexts, and technical constraints. The challenge was scaling a feature that needed to feel effortless across both.",
    sections: [
      {
        label: "Gboard",
        heading: "A feature with scale — and gaps to close.",
        body: "Dynamic Text on Gboard was already shipping, but with real problems: phrases in Spanish and Portuguese failed to activate, spacing and punctuation bugs broke expressions, and character limitations cut off longer phrases. I ran a structured Bug Bash — systematically identifying activation failures, layout breakdowns, and localization gaps — then designed fixes and specs for the Spanish and Portuguese expansion.",
      },
      {
        label: "YouTube Create",
        heading: "Designing the text effects library from scratch.",
        body: "YouTube Create had no organized text effects experience at all. I led competitive benchmarking across Lemon8, InStories, Canva, and CapCut to define the UX model. From that research, I designed the tab and pill navigation system for the text effects panel, proposed asset categories (Stylized, Expressive, Creative), introduced motion previews so users could evaluate animated assets in context, and added a Recent section for returning creators.",
      },
      {
        label: "Impact",
        heading: "Scale that made the numbers real.",
        body: "The work shipped across both surfaces with measurable results. Dynamic Text became one of the highest-performing content types in the CCS portfolio — driven by a combination of distribution breadth (Gboard's global install base), quality improvements (bug fixes + localization), and a more intuitive discovery experience on YouTube Create.",
      },
    ],
    outcomes: [
      { metric: "~3.5M", label: "Dynamic Text assets shared per day" },
      { metric: "78%", label: "Click-Through-Rate on integrated assets" },
      { metric: "1.2B", label: "Dynamic Text shares in 2023" },
    ],
    nextSlug: "santander",
    nextName: "Santander Digital Help Center",
  },
  {
    slug: "santander",
    index: "04",
    company: "Santander",
    name: "Digital Help Center",
    tagline: "Support was branch-first, by default. We changed that.",
    year: "2021",
    role: "UX Designer",
    scope: "Information Architecture · Web & Mobile · Stakeholder Workshops",
    duration: "6 months",
    image: "/project-2.avif",
    overview:
      "Santander's customer support model defaulted to branch visits and phone calls — even for simple queries that should have resolved themselves digitally. The goal was to design a help center that could absorb that volume: intuitive enough that customers wouldn't need to call, and structured enough that it could scale with Santander's product complexity.",
    sections: [
      {
        label: "The Problem",
        heading: "Support by exception — not by design.",
        body: "Santander's existing help content existed, but it wasn't structured to be found. Navigation was organized around internal product categories, not customer needs. Users called the branch not because they wanted to, but because the digital path to resolution was unclear. The call center was carrying the cost of a bad IA.",
      },
      {
        label: "Approach",
        heading: "Workshops before wireframes.",
        body: "I ran structured stakeholder workshops across product, compliance, and customer service teams to map the full taxonomy of customer queries. The output wasn't just a sitemap — it was a shared understanding of what customers actually needed to resolve, which had never been formally documented. That research became the IA foundation.",
      },
      {
        label: "Execution",
        heading: "Designed for Salesforce. Built to hand off.",
        body: "The help center was built within Salesforce's constraint set — which shaped the component architecture and content model significantly. I designed both web and mobile variants, maintaining visual consistency while accounting for the different contexts in which customers sought help. The handoff included a content governance framework so the center could stay accurate as products changed.",
      },
    ],
    outcomes: [
      { metric: "6.7%", label: "Reduction in contact ratio — 77,545 fewer contacts/month" },
      { metric: "0→1", label: "Digital help center designed from blank canvas" },
      { metric: "2", label: "Platforms covered: web and mobile" },
    ],
    nextSlug: "quentro",
    nextName: "Quentro Event Ticketing",
  },
  {
    slug: "quentro",
    index: "05",
    company: "Quentro",
    name: "Event Ticketing App",
    tagline: "Most users never made it past the first screen. We fixed that.",
    year: "2019",
    role: "UX Designer",
    scope: "Mobile UX · Onboarding · Usability Testing",
    duration: null,
    image: null,
    mockups: [
      "/quentro/screen.png",
      "/quentro/walk-1.png",
      "/quentro/walk-3.png",
      "/quentro/walk-4.png",
    ],
    features: [
      {
        label: "Store",
        heading: "All your tickets, right where you need them.",
        body: "When you buy tickets, select Quentro as the delivery method. Your tickets are credited instantly in the app, stored securely until the day of the event — no printing, no searching through email, no last-minute panic.",
        image: "/quentro/walk-1.png",
      },
      {
        label: "Transfer",
        heading: "Share tickets in seconds, not steps.",
        body: "The person who buys doesn't have to be the person who goes. With Quentro, transferring a ticket to any contact is a single tap — no printing, no forwarding PDFs, no meeting up in person just to hand off a barcode.",
        image: "/quentro/walk-3.png",
      },
      {
        label: "Notifications",
        heading: "No more day-of surprises.",
        body: "Changes happen. Quentro sends real-time updates when event details shift — door times, stage schedules, access gates. You always know before you go, so nothing catches you off guard at the venue.",
        image: "/quentro/walk-4.png",
      },
    ],
    overview:
      "Quentro is an event ticketing app for a generation that discovers events through social feeds, not search bars. The product had traction — but first-use abandonment was high, and the onboarding flow was losing users before they ever saw the value. We had to diagnose before we could fix.",
    sections: [
      {
        label: "The Problem",
        heading: "High intent, high abandonment.",
        body: "Users were installing Quentro — but leaving before completing their first action. Session recordings showed a pattern: confusion at onboarding, friction in the event discovery flow, and a gap between the app's promise (effortless ticketing) and the actual experience (too many steps, unclear value).",
      },
      {
        label: "Approach",
        heading: "Usability testing first. Solutions second.",
        body: "I ran moderated usability sessions with 8 users across the target demographic. The findings were specific: the onboarding asked too much before giving anything back, and the event cards didn't surface the right information at the right moment. Knowing exactly where users dropped out made the redesign precise rather than speculative.",
      },
      {
        label: "Execution",
        heading: "Rethinking the first 60 seconds.",
        body: "The redesign focused on two areas: a progressive onboarding flow that led with value (show events first, ask for preferences second), and a restructured event card that put price, distance, and date in the visual hierarchy users actually needed. The result reduced perceived friction without removing necessary steps.",
      },
    ],
    outcomes: [
      { metric: "↓", label: "First-use abandonment reduced post-redesign" },
      { metric: "8", label: "Moderated usability sessions conducted" },
      { metric: "2", label: "Core flows rebuilt: onboarding + event discovery" },
    ],
    nextSlug: "tenor-caption",
    nextName: "Tenor Creator Experience",
  },
];

/* ─── Page component ───────────────────────────────────────────── */
export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const nextProject = PROJECTS.find((p) => p.slug === project.nextSlug);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div className="container-editorial pt-36 pb-16">
        <div className="animate-fade-up">
          <p className="text-label mb-6">
            {project.company} · {project.year}
          </p>
        </div>
        <h1
          className="text-text-primary font-bold animate-fade-up animate-fade-up-1"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.94,
          }}
        >
          {project.name}
        </h1>
        <p
          className="mt-6 text-text-secondary animate-fade-up animate-fade-up-2"
          style={{ fontSize: "clamp(1rem, 2vw, 1.375rem)", maxWidth: "36rem", lineHeight: 1.5 }}
        >
          {project.tagline}
        </p>

        {/* Meta row */}
        <div
          className="mt-12 flex flex-wrap gap-8 animate-fade-up animate-fade-up-3"
        >
          {[
            { label: "Role", value: project.role },
            { label: "Scope", value: project.scope },
            { label: "Duration", value: project.duration },
          ].filter(({ value }) => value).map(({ label, value }) => (
            <div key={label}>
              <p className="text-label mb-1">{label}</p>
              <p className="text-sm text-text-secondary">{value}</p>
            </div>
          ))}
        </div>

        {/* ── Outcomes — above the fold ── */}
        {project.outcomes && project.outcomes.length > 0 && (
          <motion.div
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } } }}
            initial="hidden"
            animate="visible"
          >
            {project.outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }}
                className="border border-border rounded-xl px-6 py-5 bg-bg-surface"
              >
                <p
                  className="metric-text font-bold mb-1.5"
                  style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                >
                  {outcome.metric}
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">{outcome.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* ── Video hero ── */}
      {"video" in project && project.video && (
        <div className="container-editorial pb-8">
          <motion.div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "16/9" }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <video
              src={project.video as string}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      )}

      {/* ── Cover image ── */}
      {project.image && (
        <div className="container-editorial pb-12">
          <motion.div
            className="overflow-hidden rounded-2xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-auto block"
            />
          </motion.div>
        </div>
      )}

      {/* ── Mockup gallery ── */}
      {"mockups" in project && Array.isArray(project.mockups) && project.mockups.length > 0 && (
        <div className="container-editorial pb-16">
          <motion.div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${(project.mockups as string[]).length}, 1fr)` }}
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(project.mockups as string[]).map((src, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="overflow-hidden rounded-2xl bg-bg-surface flex items-end justify-center"
                style={{ aspectRatio: "9/16" }}
              >
                <img
                  src={src}
                  alt={`${project.name} screen ${i + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── Feature strips — alternating layout ── */}
      {"features" in project && Array.isArray((project as {features?: unknown[]}).features) && (
        <div className="container-editorial pb-24">
          <hr className="hairline mb-20" />
          <div className="flex flex-col gap-24">
            {((project as {features: {label: string; heading: string; body: string; image: string}[]}).features).map((feature, i) => (
              <Reveal key={i}>
                <div className={`grid grid-cols-1 gap-10 items-center lg:grid-cols-2 lg:gap-20 ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
                  {/* Screenshot */}
                  <motion.div
                    className="flex justify-center"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 24 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      className="overflow-hidden rounded-2xl shadow-xl"
                      style={{ maxWidth: 280, width: "100%" }}
                    >
                      <img
                        src={feature.image}
                        alt={feature.heading}
                        className="w-full object-contain"
                      />
                    </div>
                  </motion.div>
                  {/* Text */}
                  <div className="flex flex-col gap-5">
                    <p className="text-label">{feature.label}</p>
                    <h2
                      className="text-text-primary font-bold leading-tight"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
                    >
                      {feature.heading}
                    </h2>
                    <p className="text-text-secondary leading-relaxed" style={{ fontSize: "1.0625rem" }}>
                      {feature.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* ── Illustration image ── */}
      {"illustrationImage" in project && project.illustrationImage && (
        <div className="container-editorial pb-12">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={project.illustrationImage as string}
                alt={`${project.name} — context`}
                className="w-full h-auto block"
              />
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Overview ── */}
      <div className="container-editorial pb-24">
        <hr className="hairline mb-16" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-label pt-1">Overview</p>
          </Reveal>
          <Reveal>
            <p
              className="text-text-primary leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
            >
              {project.overview}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Sections ── */}
      <motion.div
        className="container-editorial pb-24 flex flex-col gap-24"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "200px 0px 0px 0px" }}
      >
        {project.sections.map((section, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2fr]"
          >
            <div>
              <p className="text-label mb-3">{section.label}</p>
              <h2
                className="text-text-primary font-bold leading-tight"
                style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
              >
                {section.heading}
              </h2>
            </div>
            <p className="text-text-secondary leading-relaxed" style={{ fontSize: "1.0625rem" }}>
              {section.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Themes grid ── */}
      {"themesGridImage" in project && project.themesGridImage && (
        <div className="container-editorial pb-16">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={project.themesGridImage as string}
                alt={`${project.name} — theme system`}
                className="w-full h-auto block"
              />
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Roulette image (rotating) ── */}
      {"rouletteImage" in project && project.rouletteImage && (
        <div className="container-editorial pb-16 flex justify-center">
          <motion.div
            style={{ width: "min(480px, 100%)", aspectRatio: "1/1" }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={project.rouletteImage as string}
              alt={`${project.name} — themes roulette`}
              className="w-full h-auto block"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      )}

      {/* ── Article link ── */}
      {"articleLink" in project && project.articleLink && (
        <div className="container-editorial pb-16">
          <hr className="hairline mb-10" />
          <Reveal>
            <div className="flex flex-wrap items-center gap-6">
              <p className="text-label shrink-0">Read more</p>
              <a
                href={project.articleLink as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-200"
              >
                How to try Notes: New Google Search Labs experiment →
              </a>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Next project ── */}
      {nextProject && (
        <div className="border-t border-border">
          <Link
            href={`/work/${project.nextSlug}`}
            className="group container-editorial flex items-center justify-between py-16 transition-colors duration-200"
            aria-label={`Next project: ${project.nextName}`}
          >
            <div>
              <p className="text-label mb-2">Next project</p>
              <p
                className="text-text-primary font-bold group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: "clamp(1.25rem, 3vw, 2.5rem)", letterSpacing: "-0.03em" }}
              >
                {project.nextName}
              </p>
            </div>
            <span
              className="text-2xl text-text-muted group-hover:text-accent group-hover:translate-x-2 transition-all duration-300"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}

