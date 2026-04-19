import Link from "next/link";

type Project = {
  slug: string;
  company: string;
  name: string;
  description: string;
  tags: string[];
  coverBg: string;
  coverAccent: string;
  coverLabel: string;
  year: string;
};

const FEATURED_PROJECTS: Project[] = [
  {
    slug: "google-ccs",
    company: "Google",
    name: "Creative Content Studio",
    description:
      "Three surfaces, one content system. Designed the asset architecture connecting Tenor, Gboard, and YouTube Create — then shipped 40+ dynamic text assets to YouTube Create.",
    tags: ["Multi-surface UX", "Design Systems", "Figma Plugin"],
    coverBg: "from-[#1a1a2e] to-[#16213e]",
    coverAccent: "#4285f4",
    coverLabel: "Google",
    year: "2023",
  },
  {
    slug: "quentro",
    company: "Quentro",
    name: "Event Ticketing App",
    description:
      "Users were dropping off before the first screen. Diagnosed early abandonment through research, rebuilt the onboarding and ticket discovery flow to move the conversion needle.",
    tags: ["Mobile UX", "Onboarding", "Usability Testing"],
    coverBg: "from-[#071a2e] to-[#040e1a]",
    coverAccent: "#00e5ff",
    coverLabel: "Quentro",
    year: "2022",
  },
  {
    slug: "santander",
    company: "Santander",
    name: "Help Center",
    description:
      "Santander's support model was branch-first, by default. Designed the digital help center from scratch — restructuring the IA around real customer tasks to reduce branch dependency.",
    tags: ["Information Architecture", "Web & Mobile", "Search UX"],
    coverBg: "from-[#6b0000] to-[#3d0000]",
    coverAccent: "#ec0000",
    coverLabel: "Santander",
    year: "2021",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg">
      {/* Cover */}
      <div
        className={`bg-gradient-to-br ${project.coverBg} relative flex h-48 items-center justify-center overflow-hidden`}
      >
        <div
          className="absolute rounded-full opacity-10"
          style={{
            width: 200,
            height: 200,
            background: project.coverAccent,
            right: -40,
            bottom: -40,
          }}
        />
        <span
          className="relative z-10 font-bold text-3xl tracking-tight"
          style={{ color: project.coverAccent }}
        >
          {project.coverLabel}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            {project.company}
          </p>
          <span className="text-xs text-neutral-400">{project.year}</span>
        </div>
        <h3 className="font-bold text-xl text-neutral-900">{project.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-neutral-500">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/work/${project.slug}`}
          className="mt-2 block w-full rounded-xl bg-portfolio-bg py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Peek inside →
        </Link>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section className="bg-neutral-50 py-24" id="work">
      <div className="mx-auto max-w-6xl px-8">
        {/* Heading */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-portfolio-accent">
              Selected work
            </p>
            <h2 className="font-bold text-4xl text-neutral-900">
              Projects I&#39;ve shaped
            </h2>
          </div>
          <Link
            href="/work"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-portfolio-bg hover:text-portfolio-bg"
          >
            View all work →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700"
          >
            View all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
