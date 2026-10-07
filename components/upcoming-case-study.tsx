"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MaskLines } from "@/components/editorial";
import { ease } from "@/lib/motion";
import { PROJECT_COVERS, type UpcomingCaseStudy as Upcoming } from "@/lib/projects";
import { CaseStudyProgress } from "@/components/case-study-progress";

/* Empty state for a case study that's still being written:
   the project's cover and scope, an honest "in progress" note, and a way forward. */
export function UpcomingCaseStudy({ project }: { project: Upcoming }) {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    ({
      initial: reduce ? false : { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: ease.out, delay },
    }) as const;

  const others = PROJECT_COVERS.filter((p) => p.title !== project.company).slice(0, 3);

  return (
    <div className="min-h-screen">
      <CaseStudyProgress
        project={project.company}
        chapters={[
          { id: "case-intro", label: "Introduction" },
          { id: "case-status", label: "In progress" },
          ...(others.length > 0 ? [{ id: "case-more", label: "More work" }] : []),
        ]}
      />

      <section id="case-intro" className="container-editorial scroll-mt-32 pt-40 lg:pt-40">
        <motion.div {...fade(0)}>
          <Link
            href="/work"
            className="text-[13px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
          >
            ← All work
          </Link>
        </motion.div>

        <motion.p {...fade(0.05)} className="text-label mt-10 text-text-primary">
          {project.company} <span className="text-text-secondary">· {project.context}</span>
        </motion.p>
        <MaskLines
          as="h1"
          delay={0.1}
          className="mt-5 max-w-5xl font-medium leading-[0.98] tracking-[-0.045em] text-text-primary text-[clamp(2.5rem,5vw,4.75rem)]"
          lines={[project.title]}
        />
        <motion.p {...fade(0.3)} className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
          {project.summary}
        </motion.p>

        <div id="case-status" className="mt-14 grid scroll-mt-32 gap-10 border-t border-border pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-8 lg:pt-14">
          {/* Cover */}
          <motion.div {...fade(0.35)} className="lg:col-span-5">
            <div
              className="relative mx-auto aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[16px] lg:mx-0"
              style={{ background: project.coverBackground }}
            >
              <Image
                src={project.cover}
                alt={`${project.company} — product screens`}
                fill
                preload
                sizes="(min-width: 1024px) 460px, 92vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Empty state */}
          <motion.div {...fade(0.45)} className="flex flex-col lg:col-span-6 lg:col-start-7">
            <div className="rounded-[16px] border border-dashed border-border bg-bg-elevated p-7 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-[12px] font-medium text-text-secondary">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e0a43a] opacity-60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#e0a43a]" />
                </span>
                Case study in progress
              </span>

              <h2 className="mt-6 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-tight tracking-[-0.03em] text-text-primary">
                I&rsquo;m writing this one up.
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-text-secondary">
                The full story — the research, the structure and the decisions behind it — is on its
                way. Until it&rsquo;s published, I&rsquo;m happy to walk you through the project on a call.
              </p>

              <div className="mt-8">
                <p className="text-label">What it will cover</p>
                <ul className="mt-3 border-t border-border" role="list">
                  {project.covers.map((item) => (
                    <li key={item} className="flex gap-3 border-b border-border py-3 text-[15px] text-text-primary">
                      <span className="text-text-muted" aria-hidden="true">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] text-text-muted">{project.disciplines.join(" · ")}</p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-[15px] font-medium text-bg-base transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none"
                >
                  Request a walkthrough
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
                <Link
                  href="/#work"
                  className="text-[15px] font-medium text-text-secondary transition-colors duration-200 hover:text-text-primary"
                >
                  Explore other work
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other projects */}
      {others.length > 0 && (
        <section id="case-more" className="container-editorial scroll-mt-32 pb-28 pt-28 lg:pb-36 lg:pt-36" aria-labelledby="other-projects">
          <div className="flex items-baseline justify-between gap-6 border-t border-border pt-5">
            <h2 id="other-projects" className="text-label text-text-primary">
              Meanwhile, explore
            </h2>
            <Link href="/work" className="text-label hover:text-text-primary">
              All work →
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3" role="list">
            {others.map((p) => (
              <li key={p.title}>
                <Link
                  href={p.href}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary"
                  style={{ background: p.background }}
                  aria-label={`${p.title} — ${p.category}`}
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 640px) 30vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                  />
                  <span className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-5 left-5 flex flex-col gap-1 text-white">
                    <span className="text-[19px] font-medium leading-none tracking-[-0.03em]">{p.title}</span>
                    <span className="text-[12px] text-white/75">{p.category}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
