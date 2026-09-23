"use client";

// The wandering agent — srivtx's answer to the oneko cat. A tiny
// hand-drawn bot that patrols the bottom edge of the page, leaving a
// faint pencil trail. Click it and it scurries. Structure: outer div
// owns the horizontal lap (linear, flips direction on complete), inner
// div owns the vertical bob, the svg owns the wobble — separate layers
// so the infinite loops never block the lap completion callback.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function WanderingAgent() {
  const [dir, setDir] = useState<1 | -1>(1);
  const [scurry, setScurry] = useState(false);
  const [width, setWidth] = useState(1200);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const lap = scurry ? 9 : 38; // seconds per crossing
  const from = dir === 1 ? -50 : width + 50;
  const to = dir === 1 ? width + 50 : -50;

  const poke = () => {
    setScurry(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setScurry(false), 4000);
  };

  return (
    <div
      className="fixed bottom-3 left-0 z-20 cursor-pointer"
      onClick={poke}
      title="one of the nnn agents, out for a walk"
      aria-hidden
    >
      <motion.div
        style={{ x: from }}
        animate={{ x: to }}
        transition={{ duration: lap, ease: "linear" }}
        onAnimationComplete={() => setDir((d) => (d === 1 ? -1 : 1))}
      >
        <motion.div
          animate={{ y: [0, -2, 0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.svg
            viewBox="0 0 34 26"
            width={34}
            height={26}
            className="text-ink-mute"
            style={{ scaleX: dir }}
            animate={{ rotate: [0, 1.5, -1.5, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* body */}
            <circle cx="17" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
            {/* eyes */}
            <circle cx="14.5" cy="10" r="1" fill="currentColor" />
            <circle cx="19.5" cy="10" r="1" fill="currentColor" />
            {/* antenna */}
            <path d="M17 4 L17 1.5 M15.5 1.5 L18.5 1.5" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" />
            {/* legs */}
            <path d="M13 17.5 L12 23" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M21 17.5 L22 23" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
            {/* pencil trail behind */}
            <path
              d={dir === 1 ? "M0 11 Q 5 9, 9 11" : "M34 11 Q 29 9, 25 11"}
              stroke="currentColor"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
