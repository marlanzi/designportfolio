"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/motion";

/* Password prompt for the private "More projects" area. The password is checked
   by /api/more-projects, which sets an httpOnly cookie on success. */
export function PasswordDialog({
  open,
  onClose,
  onUnlocked,
}: {
  open: boolean;
  onClose: () => void;
  onUnlocked: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocus = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement;
    setPassword("");
    setError("");
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      (returnFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/more-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onUnlocked();
      } else {
        setError("That password isn’t right. Try again.");
        inputRef.current?.select();
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  // Portal to <body>: the dialog is opened from inside transformed containers
  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
            aria-label="Close"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pw-title"
            aria-describedby="pw-desc"
            className="relative w-full max-w-[400px] rounded-[20px] border border-border bg-bg-elevated p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)] sm:p-8"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: ease.out }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-raised hover:text-text-primary"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e7eaff] text-[#4353f0]" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
            </span>
            <h2 id="pw-title" className="mt-5 text-[1.375rem] font-medium tracking-[-0.025em] text-text-primary">
              More projects
            </h2>
            <p id="pw-desc" className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">
              Enter the password to see additional AI case studies and prototypes.
            </p>

            <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
              <label htmlFor="pw-input" className="sr-only">
                Password
              </label>
              <input
                ref={inputRef}
                id="pw-input"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Password"
                aria-invalid={!!error}
                aria-describedby={error ? "pw-error" : undefined}
                className={`h-11 rounded-[12px] border bg-bg-base px-4 text-[15px] text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-text-primary ${
                  error ? "border-red-500" : "border-border"
                }`}
              />
              <p id="pw-error" role="alert" className="min-h-[1.25rem] text-[13px] text-red-600">
                {error}
              </p>
              <button
                type="submit"
                disabled={!password || busy}
                className="h-11 rounded-full bg-text-primary text-[14px] font-medium text-bg-base transition-opacity disabled:opacity-40"
              >
                {busy ? "Checking…" : "Unlock"}
              </button>
            </form>

            <p className="mt-5 text-center text-[13px] text-text-secondary">
              Don&apos;t have it?{" "}
              <a
                href="mailto:mar.lanzi96@gmail.com?subject=Portfolio%20access%20request"
                className="font-medium text-text-primary underline underline-offset-4"
              >
                Request access
              </a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
