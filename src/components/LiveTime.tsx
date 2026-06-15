// Live time — client component. Shows the visitor's local time, updates every minute.
// Server renders an empty span to avoid hydration mismatch; the effect fills it in.

"use client";
import { useEffect, useState } from "react";

export function LiveTime() {
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = d.getHours().toString().padStart(2, "0");
      const mm = d.getMinutes().toString().padStart(2, "0");
      setNow(`${hh}:${mm}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {now ? now : "--:--"}
    </span>
  );
}
