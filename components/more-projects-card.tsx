/* "More projects" cover for the hero carousel: a locked stack of AI case studies.
   Drawn in HTML/SVG so the type stays crisp; sized for the 300×380 carousel card. */

const INDIGO = "#4353f0";

function LockedStack() {
  return (
    <svg viewBox="0 0 260 200" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="mp-glow" cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#7b8cff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7b8cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mp-sheet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#dfe4ff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="mp-lock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9d1ff" />
          <stop offset="100%" stopColor="#8d9bff" />
        </linearGradient>
        <linearGradient id="mp-shackle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5a69f5" />
          <stop offset="100%" stopColor="#8796ff" />
        </linearGradient>
      </defs>
      <ellipse cx="140" cy="130" rx="125" ry="70" fill="url(#mp-glow)" />
      {/* Back sheets */}
      <rect x="128" y="22" width="104" height="122" rx="12" fill="url(#mp-sheet)" stroke="#ffffff" strokeWidth="1.5" transform="skewY(6)" />
      <rect x="98" y="34" width="104" height="122" rx="12" fill="url(#mp-sheet)" stroke="#ffffff" strokeWidth="1.5" transform="skewY(6)" />
      <rect x="114" y="54" width="60" height="5" rx="2.5" fill="#c8cff8" transform="skewY(6)" />
      <rect x="114" y="66" width="44" height="5" rx="2.5" fill="#d8ddfb" transform="skewY(6)" />
      {/* Front sheet with spark */}
      <rect x="54" y="52" width="110" height="112" rx="12" fill="url(#mp-sheet)" stroke="#ffffff" strokeWidth="1.5" transform="skewY(9)" />
      <path d="M90 104c3 13 7 17 20 20-13 3-17 7-20 20-3-13-7-17-20-20 13-3 17-7 20-20z" fill={INDIGO} transform="skewY(9)" />
      {/* Padlock */}
      <path d="M178 128v-14a17 17 0 0134 0v14" fill="none" stroke="url(#mp-shackle)" strokeWidth="8" strokeLinecap="round" />
      <rect x="166" y="124" width="58" height="50" rx="11" fill="#6f7ff7" />
      <rect x="163" y="120" width="58" height="50" rx="11" fill="url(#mp-lock)" />
      <circle cx="192" cy="140" r="6" fill="#3446e6" />
      <path d="M189 142h6l2 13h-10z" fill="#3446e6" />
    </svg>
  );
}

export function MoreProjectsCard({ active }: { active: boolean }) {
  return (
    <span className="absolute inset-0 flex flex-col overflow-hidden bg-[#f7f8fd] text-left">
      {/* Soft blobs */}
      <span
        className="pointer-events-none absolute -right-16 top-24 h-64 w-64 rounded-full bg-[#dfe5ff] opacity-80 blur-2xl"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute -left-10 bottom-10 h-40 w-56 rounded-full bg-[#e6eaff] opacity-90 blur-2xl"
        aria-hidden="true"
      />

      <span className="relative flex flex-col px-6 pt-6">
        <span className="w-fit rounded-[8px] bg-[#e3e7ff] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: INDIGO }}>
          More projects
        </span>
        <span className="mt-4 text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-[#0b1020]">
          More
          <br />
          <span style={{ color: INDIGO }}>100% AI</span>
          <br />
          projects
        </span>
        <span className="mt-3 max-w-[200px] text-[13px] leading-snug text-[#6b7287]">
          Additional case studies and prototypes available with password.
        </span>
      </span>

      <span className="pointer-events-none absolute -right-2 bottom-12 h-[150px] w-[200px]">
        <LockedStack />
      </span>

      <span className="relative mt-auto flex items-center justify-between px-6 pb-5">
        <span className="text-[15px] font-medium tracking-[-0.01em] text-[#0b1020]">Enter password</span>
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7eaff] transition-transform duration-300"
          style={{ color: INDIGO, transform: active ? "translateX(0)" : "translateX(-4px)" }}
          aria-hidden="true"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </span>
    </span>
  );
}
