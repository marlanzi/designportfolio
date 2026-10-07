/* Projects in the password-protected "More projects" area. Each links out to a
   live site; `password` is that site's own access password, shown to visitors
   who already unlocked this area. */
export type AiProject = {
  title: string;
  category: string;
  summary: string;
  url: string;
  password?: string;
  cover: { kind: "image"; src: string } | { kind: "design-system" } | { kind: "banking" } | { kind: "table" } | { kind: "deeds" };
  background: string;
};

export const AI_PROJECTS: AiProject[] = [
  {
    title: "Notary Public System",
    category: "Product design · Legal-tech",
    summary:
      "A platform for notary offices in Argentina to follow every property deed from first document to signing, with each operation's progress, blockers and next action at a glance.",
    url: "https://escribania-nine.vercel.app/",
    cover: { kind: "deeds" },
    background: "#0e1a3a",
  },
  {
    title: "Mesa Grilla",
    category: "Personal exploration · Industrial design",
    summary:
      "A walnut and glass coffee table (1300 × 800 × 400 mm), explored as an interactive 3D model with plan, elevations and an exploded view of the joinery.",
    url: "https://claude.ai/artifact/4858RYFAJy5qUf7bFifpad",
    cover: { kind: "table" },
    background: "#efe9e1",
  },
  {
    title: "Dingo Blu",
    category: "First AI workflow · Banking",
    summary: "My first experience designing with an AI workflow, taking a banking product from idea to a working prototype.",
    url: "https://bankingmarlanzi.netlify.app/client",
    cover: { kind: "banking" },
    background: "#0f2a24",
  },
  {
    title: "Lexipol Design System",
    category: "Design system · Storybook",
    summary:
      "Migrating our design system into Storybook, so design and engineering share one living component language instead of two.",
    url: "https://design-system-claude.vercel.app/",
    password: "Lexipol123",
    cover: { kind: "design-system" },
    background: "#eef3f8",
  },
];
