"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function LoginForm() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/work";

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/work-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: value }),
    });

    if (res.ok) {
      window.location.href = from;
    } else {
      setError(true);
      setLoading(false);
      setValue("");
      inputRef.current?.focus();
    }
  }

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-label mb-6">Selected Work</p>
      <h1
        className="text-text-primary font-bold mb-3"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
      >
        Password required
      </h1>
      <p className="text-text-secondary text-sm leading-relaxed mb-10">
        This section is private. Enter the password to continue.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          ref={inputRef}
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          placeholder="Enter password"
          className="w-full bg-transparent border border-border rounded-xl px-5 py-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors duration-200"
          autoComplete="current-password"
        />

        {error && (
          <motion.p
            className="text-xs text-destructive"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Incorrect password. Try again.
          </motion.p>
        )}

        <button
          type="submit"
          disabled={!value || loading}
          className="w-full rounded-xl bg-accent text-bg-base font-semibold text-sm py-4 hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying…" : "Enter"}
        </button>
      </form>
    </motion.div>
  );
}

export default function WorkLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
