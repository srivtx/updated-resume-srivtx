"use client";

// /projects — "Work" in the header. Every product with its drawn cover,
// the open-source bench as honest rows, and merged upstream work.

import { products, builds, upstream, moreOnGithub } from "@/lib/data";
import { SubPageShell } from "@/components/SubPageShell";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/NeuButton";
import { BuildLogo } from "@/components/BuildLogos";
import { SectionHead } from "@/components/Site";

function BuildRow({ b }: { b: (typeof builds)[number] }) {
  return (
    <a
      href={b.href}
      target="_blank"
      rel="noopener noreferrer"
      className="dim-item group/item block w-full touch-manipulation"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div className="flex items-center gap-3 sm:gap-4 py-4 sm:py-5 border-b border-neutral-200 dark:border-neutral-800">
        {/* project mark — pastel tile + dark glyph in light, tone tile +
            light glyph in dark: visible in BOTH themes */}
        <span
          className={`shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-gradient-to-br ${b.toneLight} dark:bg-gradient-to-br ${b.tone} ring-1 ring-black/10 dark:ring-white/10 flex items-center justify-center text-black/70 dark:text-white/95 shadow-sm transition-transform duration-300 group-hover/item:scale-110`}
        >
          <BuildLogo name={b.name} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm sm:text-[15px] font-medium text-black/80 dark:text-white/80 truncate">
            {b.name}
          </h3>
          <p className="mt-0.5 text-xs text-black/45 dark:text-white/35 leading-relaxed line-clamp-2">
            {b.one}
          </p>
        </div>
        <span className="shrink-0 text-black/25 group-hover/item:text-black dark:text-white/25 dark:group-hover/item:text-white transition-colors">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

export function ProjectsPageClient() {
  return (
    <SubPageShell
      title="Work"
      sub="everything I've shipped, all live. hover a cover to see what each one does."
    >
      {/* live products — drawn covers */}
      <div className="dim-group">
        <SectionHead title="Products" sub="live and free to use" />
        <div className="grid grid-cols-1 gap-y-9 sm:gap-x-6 sm:gap-y-10 sm:grid-cols-2">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={0.05 + i * 0.05}>
              <ProductCard p={p} detail />
            </Reveal>
          ))}
        </div>
      </div>

      {/* open-source bench */}
      <div id="open-source" className="mt-16 dim-group scroll-mt-20">
        <SectionHead title="Open source" sub="tools that started as itch-scratches and ended up useful to other people" />
        <Reveal delay={0.05}>
          <div className="group">
            {builds.map((b) => (
              <BuildRow key={b.name} b={b} />
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex justify-center mt-6">
            <a
              href={moreOnGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
            >
              everything else lives on github →
            </a>
          </div>
        </Reveal>
      </div>

      {/* merged upstream */}
      <div className="mt-16">
        <SectionHead title="Merged upstream" sub="fixes accepted into other people's projects" />
        <Reveal delay={0.05}>
          <ul>
            {upstream.map((u) => (
              <li
                key={u.name}
                className="py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-baseline justify-between gap-4"
              >
                <a
                  href={u.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors min-w-0"
                >
                  <span className="font-medium">{u.name}</span>
                  <span className="text-black/40 dark:text-white/40"> — {u.what}</span>
                </a>
                <span className="text-[10px] uppercase tracking-wide text-black/40 dark:text-white/40 whitespace-nowrap flex items-center gap-1.5 shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {u.state} {u.pr}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SubPageShell>
  );
}
