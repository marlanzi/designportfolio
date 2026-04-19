"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp } from "@/lib/motion";

const LINKS = [
  {
    label: "Email",
    value: "mar.lanzi96@gmail.com",
    href: "mailto:mar.lanzi96@gmail.com",
    note: "Best for project inquiries",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/martinalanzi",
    href: "https://www.linkedin.com/in/martinalanzi",
    note: "Connect professionally",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="container-editorial pt-28 pb-0">
        <p className="text-label mb-4 animate-fade-up">Get in touch</p>
        <h1
          className="text-text-primary font-bold leading-none animate-fade-up animate-fade-up-1"
          style={{ fontSize: "clamp(3rem, 7vw, 7rem)", letterSpacing: "-0.04em" }}
        >
          Let&apos;s talk.
        </h1>
        <p className="mt-5 max-w-md text-text-secondary leading-relaxed animate-fade-up animate-fade-up-2">
          I&apos;m currently open to part-time roles and select freelance
          engagements. If you&apos;re building something worth caring about,
          I&apos;d love to hear about it.
        </p>
      </div>

      <div className="container-editorial pt-10 pb-16">
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
        >
          {LINKS.map((link) => (
            <motion.div key={link.label} variants={fadeUp}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between border-t border-border py-7 transition-colors duration-300 hover:border-accent/30"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-label">{link.label}</p>
                  <p
                    className="font-bold text-text-primary group-hover:text-accent transition-colors duration-300"
                    style={{ fontSize: "clamp(1.125rem, 2vw, 1.75rem)", letterSpacing: "-0.025em" }}
                  >
                    {link.value}
                  </p>
                  <p className="text-xs text-text-muted">{link.note}</p>
                </div>
                <span
                  className="text-2xl text-text-muted group-hover:text-accent group-hover:translate-x-2 transition-all duration-300"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </motion.div>
          ))}

          <motion.div variants={fadeUp}>
            <div className="border-t border-border pt-8 flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
              <p className="text-sm text-text-secondary">
                Currently available · Based in Buenos Aires · Open to remote globally
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
