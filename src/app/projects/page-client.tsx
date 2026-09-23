"use client";

// /projects — "View All" target for the home page. Every product with its
// real captured media, the open-source bench as honest rows, and merged
// upstream work. The cat patrols.

import { products, builds, upstream, moreOnGithub } from "@/lib/data";
import { SubPageShell } from "@/components/SubPageShell";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/NeuButton";

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
        {/* small gradient swatch */}
        <span
          className={`shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-gradient-to-br ${b.tone} ring-1 ring-black/10 dark:ring-white/10`}
        />
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
      title="proof of work"
      sub="the products, live and recorded — hover a card to watch it run."
    >
      {/* live products — real screenshots + real recordings */}
      <div className="dim-group">
        <Reveal>
          <p className="text-[11px] uppercase tracking-widest text-black/30 dark:text-white/30 mb-3">
            live products
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:gap-3 sm:grid-cols-2">
          <Reveal className="sm:col-span-2" delay={0.05}>
            <ProductCard p={products[0]} featured />
          </Reveal>
          {products.slice(1).map((p, i) => (
            <Reveal key={p.name} delay={0.1 + i * 0.05}>
              <ProductCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* open-source bench */}
      <div className="mt-10 dim-group">
        <Reveal>
          <p className="text-[11px] uppercase tracking-widest text-black/30 dark:text-white/30 mb-1">
            open source
          </p>
          <p className="text-xs text-black/35 dark:text-white/30 mb-3">
            tools that started as itch-scratches and ended up useful to other people
          </p>
        </Reveal>
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
      <div className="mt-10">
        <Reveal>
          <p className="text-[11px] uppercase tracking-widest text-black/30 dark:text-white/30 mb-3">
            merged upstream
          </p>
        </Reveal>
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
