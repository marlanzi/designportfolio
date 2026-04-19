"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKS = [
  { href: "/work",       label: "Work" },
  { href: "/about",      label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact",    label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-base">
      <motion.div
        className="absolute inset-x-0 bottom-0 h-px bg-border"
        style={{ opacity: borderOpacity }}
      />
      <div className="container-editorial flex items-center justify-between py-5">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-text-primary hover:text-accent transition-colors duration-200"
          aria-label="Martina Lanzi — Home"
        >
          Martina Lanzi
        </Link>

        <div className="flex items-center gap-7">
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-7" role="list">
            {LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "text-sm transition-colors duration-200 relative pb-1",
                      active
                        ? "text-accent"
                        : "text-text-secondary hover:text-text-primary",
                    ].join(" ")}
                  >
                    {label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
