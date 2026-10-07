"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

/* A ticket whose perforated stub can be torn off. Drag the stub away from the
   seam (or press Enter on it): it stretches against some resistance, tears once
   pulled far enough, falls away and — with `recenter` — clips back on.
   The ticket also tilts toward the pointer, with the main face in gentle parallax.
   Notches and perforation holes are real cut-outs (CSS masks), so the page shows
   through them in either theme. */

type TearTicketProps = {
  /** Main-face image; omit it to fill the face with `children` instead */
  image?: string;
  imageAlt?: string;
  /** Content of the tear-off stub */
  stub: React.ReactNode;
  /** Label over the image, or the whole main face when there's no image */
  children?: React.ReactNode;
  /** horizontal: stub on the right. vertical: stub at the bottom */
  orientation?: "horizontal" | "vertical";
  /** Darken the bottom of the image so a label stays legible */
  scrim?: boolean;
  imageRadius?: number;
  onTear?: () => void;
  width?: number;
  height?: number;
  stubSize?: number;
  radius?: number;
  /** Perforation holes along the seam */
  holes?: number;
  holeSize?: number;
  /** Notch radius at each end of the seam, in units of 3px */
  notch?: number;
  /** Reserved for a jagged seam; 0 keeps it clean */
  roughness?: number;
  /** Maximum rotation of the stub while it's being pulled, in degrees */
  tearAngle?: number;
  /** How far the stub stretches (px, after resistance) before it tears */
  stretch?: number;
  /** 0 = follows the pointer freely, 1 = barely moves */
  resistance?: number;
  /** Resting rotation of the whole ticket, in degrees */
  rotate?: number;
  tilt?: boolean;
  tiltMax?: number;
  /** Pointer distance (px from the centre) within which the ticket tilts */
  tiltReach?: number;
  /** Parallax travel of the main face, in px */
  parallax?: number;
  perspective?: number;
  background?: string;
  color?: string;
  border?: boolean;
  borderWidth?: number;
  borderColor?: string;
  /** Clip a torn stub back on after a moment */
  recenter?: boolean;
  /** Accessible name for the stub control */
  stubLabel?: string;
  className?: string;
};

/* Mask that cuts end notches and a row of half-holes along one edge of a piece */
function seamMask(edge: "left" | "right" | "top" | "bottom", notchR: number, holeR: number, pitch: number) {
  const cut = (r: number, at: string) => `radial-gradient(circle at ${at}, transparent ${r}px, #000 ${r + 0.5}px)`;
  const ends =
    edge === "right"
      ? ["100% 0", "100% 100%"]
      : edge === "left"
        ? ["0 0", "0 100%"]
        : edge === "bottom"
          ? ["0 100%", "100% 100%"]
          : ["0 0", "100% 0"];
  const holeAt = { left: "0 50%", right: "100% 50%", top: "50% 0", bottom: "50% 100%" }[edge];
  const vertical = edge === "left" || edge === "right";
  const layers = [cut(notchR, ends[0]), cut(notchR, ends[1]), cut(holeR, holeAt)].join(", ");
  return {
    WebkitMaskImage: layers,
    maskImage: layers,
    WebkitMaskSize: `100% 100%, 100% 100%, ${vertical ? `100% ${pitch}px` : `${pitch}px 100%`}`,
    maskSize: `100% 100%, 100% 100%, ${vertical ? `100% ${pitch}px` : `${pitch}px 100%`}`,
    WebkitMaskRepeat: `no-repeat, no-repeat, ${vertical ? "repeat-y" : "repeat-x"}`,
    maskRepeat: `no-repeat, no-repeat, ${vertical ? "repeat-y" : "repeat-x"}`,
    WebkitMaskComposite: "source-in",
    maskComposite: "intersect",
  } as React.CSSProperties;
}

export function TearTicket({
  image,
  imageAlt = "",
  stub,
  children,
  orientation = "horizontal",
  scrim = false,
  imageRadius = 8,
  onTear,
  width = 460,
  height = 250,
  stubSize = 150,
  radius = 16,
  holes = 12,
  holeSize = 6,
  notch = 3,
  tearAngle = 30,
  stretch = 30,
  resistance = 0.45,
  rotate = 0,
  tilt = true,
  tiltMax = 9,
  tiltReach = 260,
  parallax = 6,
  perspective = 1000,
  background = "#27272a",
  color = "#f5f5f5",
  border = false,
  borderWidth = 1,
  borderColor = "rgba(255,255,255,0.12)",
  recenter = false,
  stubLabel = "Tear off the stub",
  className = "",
}: TearTicketProps) {
  const reduce = useReducedMotion();
  const horizontal = orientation === "horizontal";
  const wrapRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [torn, setTorn] = useState(false);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Fit: scale the ticket down when its container is narrower ── */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  /* ── Tilt toward the pointer ── */
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const px = useTransform(ry, (v) => (-v / (tiltMax || 1)) * parallax);
  const py = useTransform(rx, (v) => (v / (tiltMax || 1)) * parallax);

  useEffect(() => {
    if (!tilt || reduce) return;
    const move = (e: PointerEvent) => {
      const el = ticketRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) > tiltReach) {
        rx.set(0);
        ry.set(0);
        return;
      }
      ry.set((dx / tiltReach) * tiltMax);
      rx.set((-dy / tiltReach) * tiltMax);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [tilt, reduce, tiltReach, tiltMax, rx, ry]);

  /* ── Stub tearing ── */
  const sx = useMotionValue(0);
  const sy = useMotionValue(0);
  const sr = useMotionValue(0);
  const so = useMotionValue(1);

  const settle = useCallback(() => {
    const t = { type: "spring", stiffness: 420, damping: 26 } as const;
    animate(sx, 0, t);
    animate(sy, 0, t);
    animate(sr, 0, t);
  }, [sx, sy, sr]);

  const tear = useCallback(
    (direction = 1) => {
      if (torn) return;
      setTorn(true);
      drag.current = null;
      onTear?.();
      const d = reduce ? 0.2 : 0.75;
      const ease = [0.55, 0, 0.75, 0.2] as const;
      animate(sx, horizontal ? 70 : 30 * direction, { duration: d, ease });
      animate(sy, horizontal ? 200 : 160, { duration: d, ease });
      animate(sr, tearAngle * 2.4 * direction, { duration: d, ease });
      animate(so, 0, { duration: d, ease: "easeIn" });
      if (recenter) {
        timer.current = setTimeout(() => {
          sx.set(0);
          sy.set(0);
          sr.set(0);
          animate(so, 1, { duration: 0.45 });
          setTorn(false);
        }, 1800);
      }
    },
    [torn, onTear, reduce, horizontal, tearAngle, recenter, sx, sy, sr, so],
  );

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (torn) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || torn) return;
    const free = 1 - resistance;
    const dx = (e.clientX - drag.current.x) * free;
    const dy = (e.clientY - drag.current.y) * free;
    const pull = Math.hypot(dx, dy);
    const dir = (horizontal ? dy : dx) < 0 ? -1 : 1;
    const progress = Math.min(pull / stretch, 1);
    sx.set(dx * 0.5);
    sy.set(dy * 0.5);
    sr.set(tearAngle * progress * dir);
    if (pull >= stretch) tear(dir);
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    if (!torn) settle();
  };

  /* ── Geometry ── */
  const notchR = notch * 3;
  const holeR = holeSize / 2;
  const seamLength = horizontal ? height : width;
  const pitch = seamLength / holes;
  const mainSize = (horizontal ? width : height) - stubSize;
  const edge = (side: "main" | "stub") =>
    horizontal ? (side === "main" ? "right" : "left") : side === "main" ? "bottom" : "top";
  const cornerRadius = (side: "main" | "stub") => {
    const r = `${radius}px`;
    if (horizontal) return side === "main" ? `${r} 0 0 ${r}` : `0 ${r} ${r} 0`;
    return side === "main" ? `${r} ${r} 0 0` : `0 0 ${r} ${r}`;
  };
  const pieceBorder = (side: "main" | "stub"): React.CSSProperties => {
    if (!border) return {};
    const b = `${borderWidth}px solid ${borderColor}`;
    const seam = edge(side);
    return {
      borderTop: seam === "top" ? "none" : b,
      borderBottom: seam === "bottom" ? "none" : b,
      borderLeft: seam === "left" ? "none" : b,
      borderRight: seam === "right" ? "none" : b,
    };
  };

  return (
    <div ref={wrapRef} className={`w-full ${className}`} style={{ height: height * scale }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", perspective }}>
        <motion.div
          ref={ticketRef}
          className="relative flex h-full w-full"
          style={{
            flexDirection: horizontal ? "row" : "column",
            rotate,
            rotateX: rx,
            rotateY: ry,
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.28))",
            color,
          }}
        >
          {/* Main face */}
          <div
            className="relative overflow-hidden"
            style={{
              [horizontal ? "width" : "height"]: mainSize,
              [horizontal ? "height" : "width"]: "100%",
              background,
              borderRadius: cornerRadius("main"),
              ...pieceBorder("main"),
              ...seamMask(edge("main"), notchR, holeR, pitch),
            }}
          >
            <motion.div className="absolute inset-0" style={{ x: px, y: py }}>
              {image ? (
                <div className="absolute inset-3 overflow-hidden" style={{ borderRadius: imageRadius }}>
                  <Image src={image} alt={imageAlt} fill sizes={`${mainSize}px`} className="object-cover" />
                  {scrim && <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />}
                  {children && <div className="absolute inset-x-4 bottom-4">{children}</div>}
                </div>
              ) : (
                children
              )}
            </motion.div>
          </div>

          {/* Stub — the tear-off control */}
          <motion.div
            role="button"
            tabIndex={torn ? -1 : 0}
            aria-label={stubLabel}
            aria-disabled={torn}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                tear(1);
              }
            }}
            className="relative cursor-grab touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-current active:cursor-grabbing"
            style={{
              [horizontal ? "width" : "height"]: stubSize,
              [horizontal ? "height" : "width"]: "100%",
              background,
              borderRadius: cornerRadius("stub"),
              ...pieceBorder("stub"),
              ...seamMask(edge("stub"), notchR, holeR, pitch),
              x: sx,
              y: sy,
              rotate: sr,
              opacity: so,
              transformOrigin: horizontal ? "0% 0%" : "0% 0%",
            }}
          >
            {stub}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
