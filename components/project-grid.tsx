"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MaskLines } from "@/components/editorial";
import { ease } from "@/lib/motion";
import { PROJECT_COVERS, type ProjectCover } from "@/lib/projects";

/* Work grid: projects laid out as large cover cards. Used on the homepage
   (below the hero) and as the Work page itself. */
export function ProjectGrid({
  items = PROJECT_COVERS,
  as = "h2",
  subtitle = "Complex products, made clearer.",
  topSpacing = "pt-28 lg:pt-36",
}: {
  items?: ProjectCover[];
  as?: "h1" | "h2";
  subtitle?: string;
  topSpacing?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section id="work" className="relative" aria-labelledby="project-grid-title">
      {/* Grid boundaries continue from the hero */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="container-editorial h-full">
          <div className="h-full border-x border-border" />
        </div>
      </div>

      <div className={`container-editorial relative flex flex-col items-center pb-20 text-center lg:pb-24 ${topSpacing}`}>
        <MaskLines
          id="project-grid-title"
          as={as}
          className="font-medium leading-[0.97] tracking-[-0.048em] text-[clamp(2.75rem,5.4vw,5.25rem)]"
          lines={["Selected", "work"]}
          lineClassName={(i) => (i === 0 ? "text-text-primary" : "text-text-muted")}
        />
        <motion.p
          className="mt-8 text-[17px] text-text-secondary"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.25 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="relative border-t border-border">
        <div className="container-editorial py-16 lg:py-20">
          <ul className="mx-auto grid max-w-[1040px] gap-6 sm:grid-cols-2" role="list">
            {items.map((project, i) => (
              <motion.li
                key={project.title}
                initial={reduce ? false : { opacity: 0, y: 40, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.8, ease: ease.out, delay: (i % 2) * 0.1 }}
              >
                <Link
                  href={project.href}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[16px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary"
                  style={{ background: project.background }}
                  aria-label={`${project.title} — ${project.category}`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    sizes="(min-width: 1100px) 520px, (min-width: 640px) 46vw, 92vw"
                    unoptimized={project.unoptimized}
                    className={`${project.fit === "contain" ? "object-contain p-[10%] pb-[22%]" : "object-cover"} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none`}
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/50 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white lg:inset-x-6 lg:bottom-6">
                    <span className="flex flex-col gap-1">
                      <span className="text-[22px] font-medium leading-none tracking-[-0.03em] lg:text-[24px]">
                        {project.title}
                      </span>
                      <span className="text-[13px] text-white/75">{project.category}</span>
                    </span>
                    <span className="translate-y-1 text-[13px] font-medium opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      View project ↗
                    </span>
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
