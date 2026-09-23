"use client";

// /inventions — "View All" target for research papers. Each paper opens
// here with a short brief of what it actually claims; the full paper and
// PDF live on the DeepForge site.

import { papers, papersIndex } from "@/lib/data";
import { SubPageShell } from "@/components/SubPageShell";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/NeuButton";

export function InventionsPageClient() {
  return (
    <SubPageShell
      title="research papers"
      sub="inventions from the deepforge lab — in brief, here; in full, on deepforge."
    >
      <div className="dim-group">
        <div className="space-y-4">
          {papers.map((paper, i) => (
            <Reveal key={paper.title} delay={0.05 + i * 0.05}>
              <article className="dim-item group/item rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-white/[0.04] p-4 sm:p-5 transition-all duration-300 hover:border-black/20 dark:hover:border-white/10">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[15px] sm:text-base font-medium text-black/80 dark:text-white/80">
                      {paper.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-black/45 dark:text-white/40 leading-relaxed">
                      {paper.sub}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] text-black/30 dark:text-white/30 uppercase tracking-wide mt-1">
                    {paper.when}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-black/55 dark:text-white/50">
                  {paper.brief}
                </p>

                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <a
                    href={paper.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
                  >
                    read the paper
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={paper.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border text-[11px] font-medium h-5 px-2 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:border-black/25 dark:hover:border-white/25 transition-colors"
                  >
                    PDF
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.35}>
          <div className="flex justify-center mt-8">
            <a
              href={papersIndex}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
            >
              full publication archive on deepforge →
            </a>
          </div>
        </Reveal>
      </div>
    </SubPageShell>
  );
}
