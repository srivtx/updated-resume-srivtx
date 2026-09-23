"use client";

// Sun/moon toggle — same mechanism (class flip on <html> + localStorage,
// initial state set inline in layout so there is no flash), restyled
// to the neutral palette.

import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — ignore */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "switch to light" : "switch to dark"}
      title={dark ? "lights on" : "lights off"}
      className={`h-7 w-7 flex items-center justify-center rounded-full text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.06] dark:hover:bg-white/10 transition-colors ${className}`}
    >
      <svg viewBox="0 0 24 24" width={15} height={15} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden>
        {dark ? (
          <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
          </>
        )}
      </svg>
    </button>
  );
}
