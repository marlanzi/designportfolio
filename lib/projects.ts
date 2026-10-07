/* Designed project covers (15:19 portrait), shared by the hero carousel and the homepage grid. */
export type ProjectCover = {
  image: string;
  alt: string;
  title: string;
  category: string;
  href: string;
  background: string;
  /** "contain" shows a whole screen (e.g. a phone) instead of filling the card */
  fit?: "cover" | "contain";
  unoptimized?: boolean;
};

export const PROJECT_COVERS: ProjectCover[] = [
  {
    image: "/quentro/cover.png",
    alt: "Quentro — digital ticketing app",
    title: "Quentro",
    category: "Research · Ticket activation",
    href: "/work/quentro",
    background: "#eef1f6",
  },
  {
    image: "/lexipol/cover.png",
    alt: "Lexipol — Enterprise learning platform",
    title: "Lexipol",
    category: "Enterprise SaaS",
    // Case study in progress — the page shows an upcoming state
    href: "/work/lexipol",
    background: "#eef3f8",
  },
  {
    image: "/santander/cover.png",
    alt: "Santander — Digital Help Center",
    title: "Santander",
    category: "Fintech · Help Center",
    href: "/work/santander",
    background: "#eef3f8",
  },
  {
    image: "/notes/cover.png",
    alt: "Notes by Google — theming system",
    title: "Notes by Google",
    category: "Google · Search Labs",
    href: "/work/google-notes",
    background: "#efedf8",
  },
];

/* Every project on the Work page */
export const ALL_PROJECTS: ProjectCover[] = [...PROJECT_COVERS];

/* Case studies that are still being written. Their /work/[slug] page shows an
   "in progress" state instead of a 404 until the full write-up exists. */
export type UpcomingCaseStudy = {
  slug: string;
  company: string;
  context: string;
  title: string;
  summary: string;
  cover: string;
  coverBackground: string;
  /** What the finished case study will cover — real scope only */
  covers: string[];
  disciplines: string[];
};

export const UPCOMING_CASE_STUDIES: UpcomingCaseStudy[] = [
  {
    slug: "lexipol",
    company: "Lexipol",
    context: "Enterprise SaaS · Public safety learning",
    title: "Designing clarity across a complex learning ecosystem",
    summary:
      "Unifying navigation, training workflows and product patterns across an enterprise platform serving administrators and end users.",
    cover: "/lexipol/cover.png",
    coverBackground: "#eef3f8",
    covers: [
      "Navigation unification across training, policy, reporting and admin",
      "Open and closed card sorting to validate mental models",
      "Admin and end-user studies",
      "A shared design system across products",
    ],
    disciplines: ["Research", "IA", "Product Design", "Design Systems"],
  },
];
