"use client";

// Scroll reveal — sections rise 20px and settle over 500ms, once.
// The content is in the page from the first byte and only the motion
// waits for scripts: the hidden starting pose applies only once the
// <html> has its "js" class (set in the head before paint), so search
// engines, readers without scripts and slow phones always get the text.

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -30px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
