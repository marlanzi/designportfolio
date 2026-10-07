"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { stagger, fadeUp } from "@/lib/motion";
import { UPCOMING_CASE_STUDIES } from "@/lib/projects";
import { UpcomingCaseStudy } from "@/components/upcoming-case-study";
import { QuentroCaseStudy } from "@/components/quentro-case-study";
import { CaseStudyProgress, chapterLabel } from "@/components/case-study-progress";
import {
  AtAGlance,
  CaseImage,
  GrowthStats,
  JourneyStrip,
  KpiCards,
  PhoneVideo,
  TestingScorecard,
  TrafficChart,
} from "@/components/case-figures";

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
  sections: {
    label: string;
    heading: string;
    body: string;
    points?: string[];
    figure?: React.ReactNode;
    /** Put the figure beside the text instead of below it */
    split?: boolean;
    /** One-line conclusion shown at the end of the section */
    takeaway?: string;
    /** Starts a new part of the story (e.g. Problem / Process / Outcome) */
    act?: { label: string; title: string };
  }[];
  /** Problem / what I did / why it matters, shown under the overview */
  glance?: { label: string; text: string }[];
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
        points: [
          "Google's research showed people want to know what others like them say about a page",
          "Notes sit alongside existing web content — a layer of human insight on top of results",
          "A \u201cNotes\u201d button below results in the Google app and on Discover articles opens what others have said",
        ],
        figure: (
          <CaseImage
            src="/notes/case/hero.webp"
            width={2200}
            height={916}
            alt="An illustration of a person holding a loaf of bread, surrounded by phone screens showing a camping article and a grid of colourful, themed notes"
            caption="Launch illustration for Notes in Search Labs. Image: Google."
          />
        ),
      },
      {
        label: "02 · Mission",
        heading: "Themes that elevate the content without overshadowing it.",
        body: "CCS was tasked with creating a theme library wide enough to serve any creator's intent — from a skincare tip to a travel rec to a recipe note. The goal was visual diversity that still felt cohesive: a range of styles broad enough to feel personal, consistent enough to feel like a single product.",
        split: true,
        figure: (
          <PhoneVideo
            src="/notes/case/browsing-notes.mp4"
            poster="/notes/case/browsing-notes-poster.webp"
            width={500}
            height={1042}
            label="Screen recording: someone scrolls an article about frosting, then reads a feed of visually themed notes about it"
            caption="Browsing notes on an article — each theme reads differently, the feed still reads as one product. Recording: Google."
          />
        ),
      },
      {
        label: "03 · Core Principles",
        heading: "Effortless creation. Genuine expression.",
        body: "Two principles guided every design decision. Effortless: creating a visually engaging note should require just a few taps — no design skill needed. Expressive: themes should span a genuine range of styles and moods so that creators can find something that actually represents their content, not just a default they tolerate.",
        split: true,
        points: [
          "Text, stickers and photos to build the note",
          "A choice of visual styles to make it feel like your own",
          "AI-generated images planned for the U.S. as a next step",
        ],
        figure: (
          <PhoneVideo
            src="/notes/case/creating-notes.mp4"
            poster="/notes/case/creating-notes-poster.webp"
            width={720}
            height={1500}
            label="Screen recording: someone writes a note on a baking article, then switches between visual styles and adds stickers before posting"
            caption="Creating a note — pick a style, add stickers or a photo, post. Recording: Google."
          />
        ),
      },
      {
        label: "04 · Development",
        heading: "A Figma plugin that made the system self-serve.",
        body: "The plugin features a unified structure that lets UX designers swap and update theme elements and create new themes independently. On the engineering side, it exports every theme as JSON — preserving every design detail with zero loss in translation. What had been a back-and-forth ticket workflow became a self-serve pipeline for both teams.",
      },
      {
        label: "05 · Launch",
        heading: "Live in Search Labs, built to learn.",
        body: "Notes launched on November 15, 2023 as an opt-in Search Labs experiment in the Google app on Android and iOS. Like every Labs experiment, the point was to test and learn what works before bringing it to a broader Search audience — with algorithmic protections and human moderation keeping notes safe, helpful and relevant.",
        points: [
          "English in the U.S.; Hindi and English in India",
          "Opt-in through Search Labs in the Google app",
          "Site-owner insights on notes explored as a follow-up",
        ],
      },
    ],
    outcomes: [
      { metric: "0→1", label: "Theming system for Google Search Notes" },
      { metric: "2", label: "Teams unblocked: UX designers + engineers via one plugin" },
      { metric: "100%", label: "Theme export fidelity via JSON — no detail lost in handoff" },
    ],
    nextSlug: "santander",
    nextName: "Santander Digital Help Center",
  },
  {
    slug: "santander",
    index: "04",
    company: "Santander",
    name: "Digital Help Center",
    tagline: "Support was branch-first, by default. We set out to change that.",
    year: "2021",
    role: "UX Designer",
    scope: "Discovery · Information Architecture · Workshops · User Testing · Salesforce",
    duration: "6 months",
    image: "/project-2.avif",
    overview:
      "Santander's Help Center had to move onto Salesforce. I used that integration as a chance to rethink how customers get help — because too many were calling or visiting a branch for things they could have solved on their own.",
    glance: [
      { label: "The problem", text: "Customers defaulted to calls and branch visits — even after trying to help themselves online." },
      { label: "What I did", text: "Research, a co-creation workshop, wireframes and user testing — from discovery to launch." },
      { label: "Why it matters", text: "An MVP of 80 articles grew into a Help Center with 1,000+ articles and 4M+ visits a quarter." },
    ],
    sections: [
      {
        act: { label: "Part 1 · The problem", title: "Help existed. People just couldn't get to it." },
        label: "01 · The challenge",
        heading: "Fewer contacts. More problems solved without them.",
        body: "Moving the Help Center onto Salesforce came with a business goal: fewer contacts across every channel, and more customers solving things on their own. The numbers showed how far off that was.",
        figure: (
          <KpiCards
            items={[
              {
                tag: "KPI · Target",
                value: "6.7%",
                title: "Minimise contactability",
                text: "Reduce the contact ratio in contact centers and branches — 77,545 fewer contacts a month.",
                baseline: "Baseline: 1,181,131 contacts a month (2020)",
              },
              {
                tag: "KPI · Starting point",
                value: "55.6%",
                title: "Reduce failed self-management",
                text: "of people who booked a branch appointment online had already tried to solve it themselves.",
                baseline: "Baseline: 76% self-management contacts a month (2020)",
              },
            ]}
          />
        ),
        takeaway: "More than half the people who booked a branch visit had already tried — and failed — to solve it online.",
      },
      {
        label: "02 · Research",
        split: true,
        heading: "What customers do, and what the traffic says.",
        body: "I interviewed customers who had used the Help Center at least twice, benchmarked Mercado Libre and Despegar, and analysed a year of Help Center traffic.",
        points: [
          "Contact details topped the traffic all year — people were looking for a way out, not an answer",
          "Scheduling a branch visit fell from 4th to 13th; starting a claim climbed from 16th to 10th",
          "The best help centers lead with one question and a search bar, then a few task-based categories",
        ],
        figure: <TrafficChart />,
      },
      {
        act: { label: "Part 2 · The process", title: "From findings to a shared direction." },
        label: "03 · Direction",
        heading: "Mapping the journey with the whole team.",
        body: "I facilitated a co-creation workshop with Business, Product, Engineering and UX. Together we mapped where the journey broke, prioritised content, named the product and agreed on the main flow — within Salesforce's technical limits.",
        figure: (
          <div className="flex flex-col gap-4">
            <p className="text-label">The customer journey</p>
            <JourneyStrip
              src="/santander/case/journey.png"
              width={1774}
              height={440}
              alt="Illustrated customer journey: a customer with a question, the Help Center, being routed to phone, branch, chat or email, getting lost in articles, the impact on contacts and operations, and finally a clear answer"
              steps={[
                { title: "A simple question", text: "Book a branch visit, find a document.", share: 330 },
                { title: "The Help Center", text: "Search and categories — but answers are scattered.", share: 290 },
                { title: "Routed out", text: "Phone, branch, chat or email.", share: 300 },
                { title: "Lost in articles", text: "Long content, still unsure what to do.", share: 300 },
                { title: "The business side", text: "Contact volume, operations and teams.", share: 260 },
                { title: "Clarity", text: "The answer — without having to call.", share: 270 },
              ]}
            />
          </div>
        ),
        takeaway: "The gap wasn't missing content — it was the path between a question and its answer.",
      },
      {
        label: "04 · Design",
        heading: "Search first, then the shortest path to an answer.",
        body: "I sketched the experience in low fidelity and iterated with the same group. Every page opens with one question and a search bar, then the most-consulted categories, with every other topic one tap away. Search surfaces self-service actions before articles, so people can act instead of just reading.",
        figure: (
          <CaseImage
            src="/santander/case/wireframes-help-center.png"
            width={1774}
            height={887}
            alt="Two grayscale wireframes of the Help Center: the home with a search bar, most-consulted categories and other categories; and a category page for Cuentas y Tarjetas with a side menu, featured articles and more articles"
            caption="Home and category page — search first, the most-consulted categories up top, every other category one tap away."
          />
        ),
      },
      {
        act: { label: "Part 3 · The outcome", title: "Validated, launched — and still growing." },
        label: "05 · Testing",
        heading: "Five customers, one end-to-end flow.",
        body: "I tested the MVP with five customers, including an A/B test on the product's name.",
        figure: (
          <TestingScorecard
            passed={[
              { text: "Found the entry point" },
              { text: "Navigated the IA without friction" },
              { text: "Completed the flow end to end", score: 5 },
            ]}
            learned={[
              { text: "Keep the name “Help Center” (A/B test)" },
              { text: "Expect to schedule a branch visit from it", score: 5 },
            ]}
          />
        ),
        takeaway: "Every participant found the entry point and finished the flow — and all five wanted to book branch visits from it.",
      },
      {
        label: "06 · Launch",
        heading: "Employees first, then customers.",
        body: "The new Help Center launched to Santander's own employees first — to catch pain points, fix inconsistencies with Flame (Santander's design system) and bring in flows other squads had already automated. It also checks back on a customer's last query.",
      },
      {
        label: "07 · Three years later",
        heading: "From an 80-article test to a product the bank runs on.",
        body: "The MVP started small: 80 informational articles, with support routed by customer type and query. It worked — and showed we were on the right track. Three years and many challenges later, the Help Center lives across the bank's digital channels. Most recently, we launched a Help Center Backoffice: an internal tool to create, edit and retire content, with request inboxes for every area of the bank — so the product can sustain itself over time.",
        figure: (
          <GrowthStats
            from={{ value: "80", label: "informational articles" }}
            to={{ value: "1,000+", label: "articles" }}
            stats={[
              { value: "140", label: "self-service flows" },
              { value: "4M+", label: "visits every quarter" },
            ]}
            channels={["Mobile app", "Online Banking · Personal", "Online Banking · Business", "Public website"]}
          />
        ),
        takeaway: "The key isn't creating something — it's making it work, and making sure it gets used.",
      },
    ],
    outcomes: [
      { metric: "1,000+", label: "Help Center articles — grown from an 80-article MVP" },
      { metric: "140", label: "Self-service flows" },
      { metric: "4M+", label: "Visits every quarter" },
    ],
    nextSlug: "quentro",
    nextName: "Quentro Ticket Activation",
  },
  {
    /* Rendered by <QuentroCaseStudy />; this entry keeps it in the next-project chain */
    slug: "quentro",
    index: "05",
    company: "Quentro",
    name: "Quentro Ticket Activation",
    tagline: "Simplifying ticket activation without compromising security.",
    year: "2019",
    role: "Product Designer",
    scope: "User Research · Customer Journey · UX Design · Service Design",
    duration: null,
    overview:
      "Research revealed that the problem wasn't a single interaction — it was the accumulation of friction across the entire ticket activation journey.",
    sections: [],
    outcomes: [],
    nextSlug: "google-notes",
    nextName: "Notes by Google",
  },
];

/* ─── Page component ───────────────────────────────────────────── */
/* Chapter opener for a part of the story: its number, title and the sections inside it */
function ActOpener({ sections, index }: { sections: Project["sections"]; index: number }) {
  const act = sections[index].act!;
  const actNumber = sections.slice(0, index + 1).filter((section) => section.act).length;
  const actCount = sections.filter((section) => section.act).length;
  const nextAct = sections.findIndex((section, j) => j > index && section.act);
  const inside = sections.slice(index, nextAct === -1 ? undefined : nextAct);
  const firstNumber = index + 1;

  return (
    <div className="mb-16 grid grid-cols-1 gap-8 rounded-[20px] border border-border bg-bg-raised px-6 py-8 text-text-primary sm:px-10 sm:py-12 lg:mb-20 lg:grid-cols-[1fr_2fr] lg:items-end lg:gap-8">
      <div className="flex flex-col gap-2">
        <span className="font-medium leading-none tracking-[-0.05em] text-[clamp(3.5rem,7vw,6rem)] text-text-muted tabular-nums">
          {String(actNumber).padStart(2, "0")}
        </span>
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
          Part {actNumber} of {actCount} · {act.label.replace(/^Part \d+ · /, "")}
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <h2
          className="max-w-[22ch] font-medium leading-[1.05] tracking-[-0.035em]"
          style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.75rem)" }}
        >
          {act.title}
        </h2>
        <ol className="flex flex-wrap gap-2" role="list">
          {inside.map((section, k) => (
            <li key={section.label}>
              <a
                href={`#case-section-${index + k}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-base px-3 py-1.5 text-[13px] text-text-secondary transition-colors duration-200 hover:border-text-muted hover:text-text-primary"
              >
                <span className="tabular-nums text-text-muted">{String(firstNumber + k).padStart(2, "0")}</span>
                {chapterLabel(section.label)}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* Body text + optional points for a case study section */
function sectionBody(section: Project["sections"][number]) {
  return (
    <div className="max-w-[64ch]">
      <p className="text-text-secondary leading-relaxed" style={{ fontSize: "1.0625rem" }}>
        {section.body}
      </p>
      {section.points && (
        <ul className="mt-6 border-t border-border" role="list">
          {section.points.map((point) => (
            <li key={point} className="flex gap-3 border-b border-border py-3 text-[15px] leading-relaxed text-text-primary">
              <span className="text-text-muted" aria-hidden="true">—</span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const upcoming = UPCOMING_CASE_STUDIES.find((p) => p.slug === slug);
  if (upcoming) return <UpcomingCaseStudy project={upcoming} />;

  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const nextProject = PROJECTS.find((p) => p.slug === project.nextSlug);

  if (project.slug === "quentro") {
    return <QuentroCaseStudy nextSlug={nextProject?.slug} nextName={nextProject ? project.nextName : undefined} />;
  }

  const chapters = [
    { id: "case-intro", label: "Introduction" },
    { id: "case-overview", label: "Overview" },
    ...project.sections.map((section, i) => ({ id: `case-section-${i}`, label: chapterLabel(section.label) })),
    ...(nextProject ? [{ id: "case-next", label: "Next project" }] : []),
  ];

  return (
    <div className="min-h-screen">
      <CaseStudyProgress project={project.name} chapters={chapters} />

      {/* ── Hero ── */}
      <div id="case-intro" className="container-editorial scroll-mt-32 pt-40 pb-16 md:pt-36">
        <div className="animate-fade-up">
          <p className="text-label mb-6">
            {project.company} · {project.year}
          </p>
        </div>
        <h1
          className="text-text-primary font-medium animate-fade-up animate-fade-up-1"
          style={{
            fontSize: "clamp(2.5rem, 5.6vw, 5.5rem)",
            letterSpacing: "-0.05em",
            lineHeight: 0.98,
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
                  className="gradient-text font-medium mb-1.5"
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
                      className="text-text-primary font-medium leading-tight"
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

      {/* ── Process pills (case studies without a story map) ── */}
      {!project.sections.some((section) => section.act) && (
        <div className="container-editorial pb-16">
          <hr className="hairline mb-10" />
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-label shrink-0">Process</p>
              <div className="flex flex-wrap items-center gap-2">
                {project.sections.map((section, i) => (
                  <span key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-text-muted text-xs" aria-hidden="true">→</span>}
                    <span className="text-xs px-3 py-1.5 rounded-full border border-border text-text-secondary">
                      {section.label}
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Overview ── */}
      <div id="case-overview" className="container-editorial scroll-mt-32 pb-24">
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

      {/* ── At a glance + story map ── */}
      {project.glance && (
        <div className="container-editorial flex flex-col gap-6 pb-32">
          <Reveal>
            <AtAGlance items={project.glance} />
          </Reveal>
        </div>
      )}

      {/* ── Sections ── */}
      <div className="container-editorial flex flex-col pb-24">
        {project.sections.map((section, i) => (
          <div key={i}>
            {section.act && (
              <Reveal className={i === 0 ? "" : "pt-24 lg:pt-32"}>
                <ActOpener sections={project.sections} index={i} />
              </Reveal>
            )}
            <motion.section
              id={`case-section-${i}`}
              aria-labelledby={`case-section-${i}-title`}
              className={`scroll-mt-32 ${
                section.act || i === 0 ? "" : "mt-16 border-t border-border pt-16 lg:mt-20 lg:pt-20"
              }`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            >
              <div
                className={`grid grid-cols-1 gap-6 lg:gap-8 ${
                  section.split ? "lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-14" : "lg:grid-cols-[1fr_2fr]"
                }`}
              >
                <div className={section.split ? "flex flex-col gap-6" : undefined}>
                  <div>
                    <p className="text-label mb-3">{section.label}</p>
                  <h3
                    id={`case-section-${i}-title`}
                    className="text-text-primary font-medium leading-tight"
                    style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", letterSpacing: "-0.03em" }}
                  >
                    {section.heading}
                  </h3>
                  </div>
                  {section.split && sectionBody(section)}
                </div>
                {section.split ? (
                  section.figure
                ) : (
                  sectionBody(section)
                )}
              </div>
              {!section.split && section.figure && <div className="mt-10 lg:mt-12">{section.figure}</div>}
              {section.takeaway && (
                <div className="mt-10 grid grid-cols-1 gap-3 lg:mt-12 lg:grid-cols-[1fr_2fr] lg:gap-8">
                  <p className="text-label pt-1.5">Takeaway</p>
                  <p
                    className="max-w-[44ch] border-l-2 border-text-primary pl-5 font-medium leading-snug tracking-[-0.02em] text-text-primary"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.625rem)" }}
                  >
                    {section.takeaway}
                  </p>
                </div>
              )}
            </motion.section>
          </div>
        ))}
      </div>

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
                Try Notes, a new experiment in Search Labs — Google Blog, Nov 2023 →
              </a>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── Next project ── */}
      {nextProject && (
        <div id="case-next" className="border-t border-border">
          <Link
            href={`/work/${project.nextSlug}`}
            className="group container-editorial flex items-center justify-between py-16 transition-colors duration-200"
            aria-label={`Next project: ${project.nextName}`}
          >
            <div>
              <p className="text-label mb-2">Next project</p>
              <p
                className="text-text-primary font-medium group-hover:text-accent transition-colors duration-300"
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

