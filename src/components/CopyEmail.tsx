"use client";

// One-click copy of the email — small delight next to the mail button.
// Shows a check + "copied" for a beat, then reverts.

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/NeuButton";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // clipboard api blocked — try the legacy path
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* give up quietly */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      onClick={copy}
      type="button"
      title={copied ? "copied" : `copy ${email}`}
      aria-label={copied ? "email copied" : "copy email address"}
      className="touch-manipulation active:opacity-75 inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-[#212121] text-xs font-mono text-black/55 dark:text-white/55 hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-colors"
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5 text-emerald-500" />
          <span className="tracking-tight">copied</span>
        </>
      ) : (
        <>
          <CopyIcon className="h-3.5 w-3.5" />
          <span className="tracking-tight hidden sm:inline">{email}</span>
          <span className="sm:hidden">copy</span>
        </>
      )}
    </button>
  );
}
