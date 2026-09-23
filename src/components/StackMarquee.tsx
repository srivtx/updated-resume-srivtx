// The stack marquee — his icon-card ticker: grayscale logos drifting
// left with soft fade edges, pausing on hover. 55s a lap.

import type { CSSProperties } from "react";

const TOOLS = [
  { icon: "typescript", label: "TypeScript" },
  { icon: "rust", label: "Rust" },
  { icon: "python", label: "Python" },
  { icon: "zig", label: "Zig" },
  { icon: "nextdotjs", label: "Next.js" },
  { icon: "react", label: "React" },
  { icon: "tailwindcss", label: "Tailwind" },
  { icon: "nodedotjs", label: "Node" },
  { icon: "bun", label: "Bun" },
  { icon: "postgresql", label: "Postgres" },
  { icon: "supabase", label: "Supabase" },
  { icon: "docker", label: "Docker" },
  { icon: "solana", label: "Solana" },
  { icon: "git", label: "Git" },
];

function IconCard({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-3 min-w-[84px] sm:min-w-[92px] group cursor-default">
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 mb-1.5 sm:mb-2 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/tech-icons/${icon}.svg`}
          alt={label}
          width={40}
          height={40}
          className="w-full h-full object-contain text-zinc-600 dark:text-zinc-300 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 dark:invert"
        />
      </div>
      <span className="text-[10px] sm:text-xs text-center font-medium text-gray-700 dark:text-gray-300 leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {label}
      </span>
    </div>
  );
}

export function StackMarquee() {
  const row = [...TOOLS, ...TOOLS];
  return (
    <div className="relative marquee-paused overflow-hidden select-none py-1">
      <div
        className="marquee-track flex w-max"
        style={{ "--marquee-duration": "55s" } as CSSProperties}
      >
        {row.map((t, i) => (
          <IconCard key={i} icon={t.icon} label={t.label} />
        ))}
      </div>
      {/* soft fade edges, his touch */}
      <div className="pointer-events-none absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-white dark:from-zinc-900 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-white dark:from-zinc-900 to-transparent z-10" />
    </div>
  );
}
