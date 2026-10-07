"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export type DepthItem = {
  image?: string;
  alt: string;
  /** Small caption shown on the card */
  title?: string;
  category?: string;
  href?: string;
  /** CSS object-position for the portrait crop */
  position?: string;
  /** Zoom into the crop, anchored at `position` */
  zoom?: number;
  background?: string;
  unoptimized?: boolean;
  /** Typographic cover for projects without screens */
  cover?: { lines: string[]; ink: string };
  /** Fully custom card face; receives whether the card is in front */
  render?: (active: boolean) => React.ReactNode;
};

type DepthCarouselProps = {
  items: DepthItem[];
  /** Z distance between cards (px) */
  depth?: number;
  /** Horizontal offset between cards (px) */
  spread?: number;
  /** Rotation of the cards behind the active one (deg) */
  tilt?: number;
  tiltDirection?: "left" | "right";
  perspective?: number;
  /** Cards visible including the active one */
  visibleCards?: number;
  /** Tint added per step back (0–1) */
  falloff?: number;
  /** Blur (px) of the farthest visible card */
  blur?: number;
  autoplay?: boolean;
  loop?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  /** Transition duration (ms) */
  duration?: number;
  /** GSAP-style easing name */
  ease?: string;
  autoplayDelay?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  /** Called when a visible card is clicked */
  onOpen?: (item: DepthItem) => void;
};

const SIDE_BUTTON = 48;
const SIDE_GAP = 16;

function SideButton({
  side,
  onClick,
  disabled,
  floating,
}: {
  side: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  /** Overlay the deck's edge instead of sitting beside it (narrow screens) */
  floating?: boolean;
}) {
  const size = floating ? 40 : SIDE_BUTTON;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "prev" ? "Previous project" : "Next project"}
      className={`${floating ? `absolute top-1/2 z-[60] -translate-y-1/2 ${side === "prev" ? "left-1" : "right-1"}` : ""} flex shrink-0 items-center justify-center rounded-full border border-border bg-bg-elevated text-text-primary shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-[background-color,transform,border-color] duration-200 hover:scale-105 hover:border-text-muted hover:bg-bg-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary disabled:pointer-events-none disabled:opacity-40`}
      style={{ width: size, height: size }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={side === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}

const EASES: Record<string, string> = {
  "power1.out": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  "power2.out": "cubic-bezier(0.215, 0.61, 0.355, 1)",
  "power3.out": "cubic-bezier(0.165, 0.84, 0.44, 1)",
  "power4.out": "cubic-bezier(0.23, 1, 0.32, 1)",
  "expo.out": "cubic-bezier(0.19, 1, 0.22, 1)",
};

export function DepthCarousel({
  items,
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = "right",
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  autoplay = false,
  loop = true,
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = "#05060a",
  duration = 700,
  ease = "power3.out",
  autoplayDelay = 3200,
  showControls = true,
  showIndicators = true,
  onOpen,
}: DepthCarouselProps) {
  const reduce = useReducedMotion();
  const n = items.length;
  const [active, setActive] = useState(0);
  const [scale, setScale] = useState(1);
  const [compact, setCompact] = useState(false);
  const [hovering, setHovering] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const swiped = useRef(false);

  const dir = tiltDirection === "right" ? 1 : -1;
  const stackWidth = cardWidth + (visibleCards - 1) * spread;
  const transition = reduce
    ? "none"
    : `transform ${duration}ms ${EASES[ease] ?? EASES["power3.out"]}, opacity ${duration}ms ease, filter ${duration}ms ease`;

  const go = useCallback(
    (next: number) => {
      setActive((current) => {
        const target = loop ? ((next % n) + n) % n : Math.max(0, Math.min(n - 1, next));
        return target === current ? current : target;
      });
    },
    [loop, n],
  );

  // Fit the stack into narrow containers instead of overflowing
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const floating = showControls && width < 560;
      const controls = showControls && !floating ? 2 * (SIDE_BUTTON + SIDE_GAP) : 0;
      setCompact(floating);
      setScale(Math.min(1, (width - controls - 8) / stackWidth));
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [stackWidth, showControls]);

  useEffect(() => {
    if (!autoplay || reduce || hovering) return;
    const id = setInterval(() => go(active + 1), autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, reduce, hovering, autoplayDelay, active, go]);

  // Offset of each card from the active one: 0 = front, 1… = behind, -1 = just left the stack
  const offsetOf = (i: number) => {
    let k = i - active;
    if (loop) {
      k = ((k % n) + n) % n;
      if (k === n - 1 && n > visibleCards) k = -1;
    }
    return k;
  };

  const styleFor = (k: number): React.CSSProperties => {
    if (k < 0) {
      // Leaving: slide out toward the viewer and fade
      return {
        transform: `translate3d(${-dir * spread * 1.6}px, 0, ${depth * 0.35}px) rotateY(0deg)`,
        opacity: 0,
        filter: "blur(0px)",
        zIndex: n + 1,
        pointerEvents: "none",
      };
    }
    const hidden = k >= visibleCards;
    const step = Math.min(k, visibleCards);
    return {
      transform: `translate3d(${dir * step * spread}px, 0, ${-step * depth}px) rotateY(${k === 0 ? 0 : -dir * tilt}deg)`,
      opacity: hidden ? 0 : 1,
      filter: `blur(${visibleCards > 1 ? ((step / (visibleCards - 1)) * blur).toFixed(2) : 0}px)`,
      zIndex: n - k,
      pointerEvents: hidden ? "none" : "auto",
    };
  };

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 flex flex-col items-center justify-center gap-8 outline-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected projects"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      {/* Stage, flanked by the controls */}
      <div className="relative flex items-center" style={{ gap: compact ? 0 : SIDE_GAP }}>
        {showControls && <SideButton side="prev" floating={compact} onClick={() => go(active - 1)} disabled={!loop && active === 0} />}
        <div
          className="relative"
          style={{ width: stackWidth * scale, height: cardHeight * scale, perspective: `${perspective}px` }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, id: e.pointerId };
            swiped.current = false;
          }}
          onPointerUp={(e) => {
            const start = drag.current;
            drag.current = null;
            if (!start || start.id !== e.pointerId) return;
            const dx = e.clientX - start.x;
            if (Math.abs(dx) > 40) {
              swiped.current = true;
              go(active + (dx < 0 ? 1 : -1) * dir);
            }
          }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: stackWidth, height: cardHeight, transform: `scale(${scale})`, transformStyle: "preserve-3d" }}
          >
            {items.map((item, i) => {
              const k = offsetOf(i);
              const isActive = k === 0;
              const tintAlpha = k > 0 ? Math.min(0.85, k * falloff) : 0;
              return (
                <button
                  key={i}
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`Open ${item.alt}`}
                  onClick={() => {
                    if (swiped.current) {
                      swiped.current = false;
                      return;
                    }
                    // Any visible card opens its project directly
                    if (k >= 0) onOpen?.(item);
                  }}
                  className="absolute top-0 block overflow-hidden text-left shadow-[0_1px_2px_rgba(0,0,0,0.08),0_30px_60px_-30px_rgba(0,0,0,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-primary"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    [dir === 1 ? "left" : "right"]: 0,
                    borderRadius: radius,
                    background: item.background ?? "#1c1c1c",
                    transformOrigin: dir === 1 ? "left center" : "right center",
                    transition,
                    cursor: k >= 0 ? "pointer" : "default",
                    ...styleFor(k),
                  }}
                >
                  {item.render?.(isActive)}
                  {item.image && (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      draggable={false}
                      unoptimized={item.unoptimized}
                      preload={i === 0}
                      sizes={`${cardWidth * 2}px`}
                      className="object-cover"
                      style={{
                        objectPosition: item.position,
                        transform: item.zoom ? `scale(${item.zoom})` : undefined,
                        transformOrigin: item.position,
                      }}
                    />
                  )}
                  {item.cover && (
                    <span
                      className="absolute left-6 top-6 text-[64px] font-medium leading-[0.86] tracking-[-0.06em]"
                      style={{ color: item.cover.ink }}
                    >
                      {item.cover.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </span>
                  )}
                  {(item.title || item.category) && (
                    <>
                      <span
                        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/60 to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                        <span className="flex flex-col">
                          <span className="text-[17px] font-medium tracking-[-0.02em]">{item.title}</span>
                          <span className="text-[12px] text-white/70">{item.category}</span>
                        </span>
                        <span
                          className="text-[12px] font-medium transition-opacity duration-300"
                          style={{ opacity: isActive ? 1 : 0 }}
                        >
                          View ↗
                        </span>
                      </span>
                    </>
                  )}
                  {/* Depth tint */}
                  <span
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{ background: tint, opacity: tintAlpha, transition: reduce ? "none" : `opacity ${duration}ms ease` }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {showControls && <SideButton side="next" floating={compact} onClick={() => go(active + 1)} disabled={!loop && active === n - 1} />}
      </div>

      {showIndicators && (
        <div className="flex items-center">
            <div className="flex items-center gap-2" role="tablist" aria-label="Choose project">
              {items.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={item.alt}
                  onClick={() => go(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 22 : 6,
                    background: i === active ? "var(--text-primary)" : "var(--text-muted)",
                    opacity: i === active ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {items[active]?.alt}, {active + 1} of {n}
      </p>
    </div>
  );
}
