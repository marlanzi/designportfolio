"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-4 w-8" aria-hidden="true" />;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-6 w-11 items-center rounded-full border border-border bg-bg-raised transition-colors duration-300 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
    >
      {/* Track icons */}
      <span
        className="absolute left-1 text-[9px] transition-opacity duration-200"
        style={{ opacity: isDark ? 0 : 1 }}
        aria-hidden="true"
      >
        ☀
      </span>
      <span
        className="absolute right-1 text-[9px] transition-opacity duration-200"
        style={{ opacity: isDark ? 1 : 0 }}
        aria-hidden="true"
      >
        ☽
      </span>

      {/* Thumb */}
      <span
        className="absolute h-4 w-4 rounded-full bg-accent transition-all duration-300"
        style={{ left: isDark ? "calc(100% - 1.25rem)" : "0.25rem" }}
        aria-hidden="true"
      />
    </button>
  );
}
