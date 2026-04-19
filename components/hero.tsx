"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const PHOTO =
  "https://www.figma.com/api/mcp/asset/c1be0b10-9758-4246-b6ca-dd866ed0e0e4";
const BLOB_TL =
  "https://www.figma.com/api/mcp/asset/2ea15e1a-ce66-4d49-abfe-f4d07f77b4d5";
const BLOB_BR =
  "https://www.figma.com/api/mcp/asset/0ddde798-351e-4f1e-bc63-25ec2f8efe44";

const ROLES = ["a product designer", "a systems thinker", "a storyteller"];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [animClass, setAnimClass] = useState("role-in");

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass("role-out");
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setAnimClass("role-in");
      }, 220);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden bg-portfolio-bg">

      {/* Decorative blob — top left (mirrors Figma: rotate-165, bleeds off top-left) */}
      <div
        className="pointer-events-none absolute z-0 flex items-center justify-center"
        style={{
          top: "-37.6%",
          right: "58.22%",
          bottom: "43.3%",
          left: "-28.61%",
        }}
        aria-hidden="true"
      >
        <div
          className="flex-none"
          style={{
            width: 842,
            height: 774,
            transform: "rotate(165deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BLOB_TL} alt="" className="block size-full" />
        </div>
      </div>

      {/* Decorative blob — bottom right (mirrors Figma: rotate-[-136.64deg], bleeds off bottom-right) */}
      <div
        className="pointer-events-none absolute z-0 flex items-center justify-center"
        style={{
          top: "40.22%",
          right: "-30.42%",
          bottom: "-44.91%",
          left: "55.99%",
        }}
        aria-hidden="true"
      >
        <div
          className="flex-none"
          style={{
            width: 757,
            height: 760,
            transform: "rotate(-136.64deg)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BLOB_BR} alt="" className="block size-full" />
        </div>
      </div>

      {/* Photo — left half */}
      <div className="relative z-10 flex w-1/2 items-center justify-center px-10">
        <div
          className="relative w-full overflow-hidden rounded-[43px] shadow-2xl"
          style={{ aspectRatio: "330 / 430", maxWidth: 420 }}
        >
          <Image
            src={PHOTO}
            alt="Martina Lanzi"
            fill
            sizes="(max-width: 768px) 50vw, 420px"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* Text content — right half */}
      <div className="relative z-10 flex w-1/2 flex-col items-start justify-center pr-12">
        <h1
          className="font-bold leading-tight text-white"
          style={{ fontSize: "clamp(32px, 4.4vw, 64px)", letterSpacing: "-0.03em" }}
        >
          I&#39;m Martina Lanzi
        </h1>

        {/* Animated role */}
        <div style={{ height: "clamp(40px, 5.5vw, 80px)", overflow: "hidden" }}>
          <p
            key={roleIndex}
            className={`font-bold leading-tight text-portfolio-accent ${animClass}`}
            style={{
              fontSize: "clamp(32px, 4.4vw, 64px)",
              letterSpacing: "-0.03em",
            }}
          >
            {ROLES[roleIndex]}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8">
          <Link
            href="/work"
            className="relative flex items-center justify-center overflow-hidden rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            style={{ fontSize: "clamp(14px, 1.25vw, 18px)" }}
          >
            {/* Left accent bar (from Figma) */}
            <span
              className="absolute left-0 top-0 bottom-0 bg-white"
              style={{ width: 4 }}
              aria-hidden="true"
            />
            Dive into my projects
          </Link>
        </div>
      </div>
    </section>
  );
}
