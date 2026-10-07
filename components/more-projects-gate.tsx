"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordDialog } from "@/components/password-dialog";

/* Shown on /work/more without access: the password prompt, open by default */
export function MoreProjectsGate() {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  return (
    <div className="container-editorial flex min-h-[70vh] flex-col items-start justify-center gap-6 pt-32">
      <p className="text-label">More projects</p>
      <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1] tracking-[-0.045em] text-text-primary">
        This area is password protected.
      </h1>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-11 rounded-full bg-text-primary px-6 text-[14px] font-medium text-bg-base"
      >
        Enter password
      </button>
      <PasswordDialog open={open} onClose={() => setOpen(false)} onUnlocked={() => { setOpen(false); router.refresh(); }} />
    </div>
  );
}
