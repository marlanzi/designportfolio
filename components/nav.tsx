"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { ease } from "@/lib/motion";

const LINKS: { href: string; label: string; locked?: boolean }[] = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/work/more", label: "AI Projects", locked: true },
];

/* Paths owned by a more specific link, so their parent doesn't also light up */
const isActive = (pathname: string, href: string) => {
  if (href === "/work" && pathname.startsWith("/work/more")) return false;
  return pathname === href || pathname.startsWith(href + "/");
};

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

/* Floating identity capsule — the site's only navigation */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click and Escape (links close it on click)
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 animate-[capsule-in_0.6s_cubic-bezier(0.16,1,0.3,1)_0.1s_both] motion-reduce:animate-none">
      <div ref={ref} className="pointer-events-auto relative">
        <div className="flex items-center gap-1 rounded-full border border-border bg-bg-elevated py-1.5 pl-1.5 pr-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_28px_-16px_rgba(0,0,0,0.18)]">
          <Link href="/" className="flex items-center gap-2.5 pr-3" aria-label="Martina Lanzi — Home">
            <span className="relative h-8 w-8 overflow-hidden rounded-full bg-bg-raised">
              <Image src="/martina.png" alt="" fill sizes="32px" className="object-cover" />
            </span>
            <span className="text-sm font-medium tracking-[-0.01em] text-text-primary">Martina Lanzi</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="capsule-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="group ml-6 flex h-8 w-10 items-center justify-center gap-[3px] rounded-full transition-colors duration-200 hover:bg-bg-raised"
          >
            <span className="h-[5px] w-[5px] rounded-full bg-text-primary" />
            <span className="h-[5px] w-[5px] rounded-full bg-text-muted transition-colors group-hover:bg-text-primary" />
            <span className="h-[5px] w-[5px] rounded-full bg-text-muted transition-colors group-hover:bg-text-primary" />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <div className="absolute inset-x-0 top-[calc(100%+8px)] flex justify-center">
              <motion.nav
                id="capsule-menu"
                aria-label="Main navigation"
                className="w-60 rounded-2xl border border-border bg-bg-elevated p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-20px_rgba(0,0,0,0.25)]"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.22, ease: ease.out }}
              >
                <ul role="list">
                  {LINKS.map(({ href, label, locked }) => {
                    const active = isActive(pathname, href);
                    const cls =
                      "flex items-center justify-between rounded-xl px-3 py-2.5 text-[15px] transition-colors duration-200 hover:bg-bg-raised " +
                      (active ? "text-text-primary font-medium" : "text-text-secondary hover:text-text-primary");
                    return (
                      <li key={label}>
                        <Link href={href} aria-current={active ? "page" : undefined} className={cls} onClick={() => setOpen(false)}>
                          <span className="flex items-center gap-2">
                            {label}
                            {locked && (
                              <span className="text-text-muted" title="Password protected">
                                <LockIcon />
                                <span className="sr-only">(password protected)</span>
                              </span>
                            )}
                          </span>
                          {active && <span className="h-1.5 w-1.5 rounded-full bg-text-primary" aria-hidden="true" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-1.5 flex items-center justify-between border-t border-border px-3 pb-1.5 pt-3">
                  <span className="text-[13px] text-text-secondary">Theme</span>
                  <ThemeToggle />
                </div>
              </motion.nav>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
