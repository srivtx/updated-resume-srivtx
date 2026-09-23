"use client";

// Sun/moon toggle, hand-drawn. No library — a class flip on <html> plus
// localStorage, with the initial state set inline in layout.tsx so there
// is no flash of the wrong theme.

import { useEffect, useState } from "react";

export function ThemeToggle() {
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
      className="h-7 w-7 flex items-center justify-center rounded-full text-ink-mute hover:text-ink hover:bg-ink/[0.06] transition-colors"
    >
      <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden>
        {dark ? (
          // moon — a circle with a bite taken out
          <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
        ) : (
          // sun — circle + rays
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
          </>
        )}
      </svg>
    </button>
  );
}
