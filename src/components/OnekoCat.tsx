"use client";

// oneko — the classic desktop cat, the same sprite Bharath's site runs.
// Chases the cursor, idles, sleeps, scratches the walls. Written with a
// single rAF loop and refs (his state version re-renders every frame —
// this one never re-renders at all).

import { useEffect, useRef } from "react";

type Pos = { x: number; y: number };

const SPRITES: Record<string, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
  scratchWallN: [[0, 0], [0, -1]],
  scratchWallS: [[-7, -1], [-6, -2]],
  scratchWallE: [[-2, -2], [-2, -3]],
  scratchWallW: [[-4, 0], [-4, -1]],
  tired: [[-3, -2]],
  sleeping: [[-2, 0], [-2, -1]],
  N: [[-1, -2], [-1, -3]],
  NE: [[0, -2], [0, -3]],
  E: [[-3, 0], [-3, -1]],
  SE: [[-5, -1], [-5, -2]],
  S: [[-6, -3], [-7, -2]],
  SW: [[-5, -3], [-6, -1]],
  W: [[-4, -2], [-4, -3]],
  NW: [[-1, 0], [-1, -1]],
};

const SPEED = 10;

export default function OnekoCat() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let neko: Pos = { x: 32, y: 32 };
    let mouse: Pos = { x: 0, y: 0 };
    let frame = 0;
    let idleTime = 0;
    let idleAnim: string | null = null;
    let idleFrame = 0;
    let last = 0;
    let raf = 0;

    const setSprite = (name: string, f: number) => {
      const set = SPRITES[name];
      const s = set[f % set.length];
      el.style.backgroundPosition = `${s[0] * 32}px ${s[1] * 32}px`;
    };

    const resetIdle = () => {
      idleAnim = null;
      idleFrame = 0;
    };

    const handleIdle = () => {
      idleTime++;
      if (idleTime > 10 && Math.random() * 200 < 1 && !idleAnim) {
        const opts = ["sleeping", "scratchSelf"];
        if (neko.x < 32) opts.push("scratchWallW");
        if (neko.y < 32) opts.push("scratchWallN");
        if (neko.x > window.innerWidth - 32) opts.push("scratchWallE");
        if (neko.y > window.innerHeight - 32) opts.push("scratchWallS");
        idleAnim = opts[Math.floor(Math.random() * opts.length)];
      }
      switch (idleAnim) {
        case "sleeping":
          if (idleFrame < 8) { setSprite("tired", 0); break; }
          setSprite("sleeping", Math.floor(idleFrame / 4));
          if (idleFrame > 192) resetIdle();
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnim, idleFrame);
          if (idleFrame > 9) resetIdle();
          break;
        default:
          setSprite("idle", 0);
      }
      idleFrame++;
    };

    const tick = () => {
      frame++;
      const dx = neko.x - mouse.x;
      const dy = neko.y - mouse.y;
      const dist = Math.hypot(dx, dy);

      if (dist < SPEED || dist < 48) {
        handleIdle();
        return;
      }
      resetIdle();
      if (idleTime > 1) {
        setSprite("alert", 0);
        idleTime = Math.max(idleTime - 1, 0);
        return;
      }

      let dir = "";
      if (dy / dist > 0.5) dir += "N";
      if (dy / dist < -0.5) dir += "S";
      if (dx / dist > 0.5) dir += "W";
      if (dx / dist < -0.5) dir += "E";
      setSprite(dir, frame);

      neko = {
        x: Math.min(Math.max(16, neko.x - (dx / dist) * SPEED), window.innerWidth - 16),
        y: Math.min(Math.max(16, neko.y - (dy / dist) * SPEED), window.innerHeight - 16),
      };
      el.style.left = `${neko.x - 16}px`;
      el.style.top = `${neko.y - 16}px`;
    };

    const loop = (t: number) => {
      if (!last) last = t;
      if (t - last > 100) {
        last = t;
        tick();
      }
      raf = requestAnimationFrame(loop);
    };

    const onMouse = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        position: "fixed",
        pointerEvents: "none",
        imageRendering: "pixelated",
        left: 16,
        top: 16,
        zIndex: 2147483647,
        backgroundImage: "url(/oneko.gif)",
      }}
    />
  );
}
