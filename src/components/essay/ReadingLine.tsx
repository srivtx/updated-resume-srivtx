"use client";

// A hairline in the essay's ink across the top of the screen that draws
// itself as you read, from the first word to the signature.

import { useEffect, useRef } from "react";

export function ReadingLine() {
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const body = line.current?.closest("article")?.querySelector<HTMLElement>(".essay-body");
    if (!body || !line.current) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = body.getBoundingClientRect();
      const read = (window.innerHeight * 0.6 - r.top) / r.height;
      line.current!.style.transform = `scaleX(${Math.min(1, Math.max(0, read))})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span
      ref={line}
      aria-hidden
      className="fixed top-0 left-0 right-0 z-40 h-[2px] origin-left pointer-events-none"
      style={{ background: "var(--ink)", transform: "scaleX(0)" }}
    />
  );
}
