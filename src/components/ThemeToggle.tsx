"use client";

// Theme toggle — sits in the hero social row like the reference site, and
// flips the theme with a CIRCULAR REVEAL: the new theme expands out of the
// button via the View Transitions API (clip-path circle). Browsers without
// it fall back to the plain class flip. Initial state is set inline in
// layout so there is no flash.

import { useEffect, useState } from "react";
import { SLAB } from "@/components/NeuButton";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const apply = (next: boolean) => {
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — ignore */
    }
  };

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = !dark;

    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => {
        ready: Promise<void>;
      };
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      apply(next);
      return;
    }

    // circle origin = the button itself, so the new theme pours out of it
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const end = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      apply(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${end}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "switch to light" : "switch to dark"}
      title={dark ? "lights on" : "lights off"}
      type="button"
      className={`touch-manipulation active:opacity-75 flex items-center justify-center w-8 h-8 shrink-0 ${className}`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className={SLAB}>
        <div className="p-0 flex items-center justify-center w-8 h-8 rounded-full text-black/75 dark:text-white/80">
          <svg
            viewBox="0 0 24 24"
            width={15}
            height={15}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            aria-hidden
          >
            {dark ? (
              <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
              </>
            )}
          </svg>
        </div>
      </div>
    </button>
  );
}
