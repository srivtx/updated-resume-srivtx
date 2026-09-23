"use client";

// /blogs — "View All" target for the technical writing section. Long-form
// X article + the DeepForge engineering notes, each row linking straight
// to the real post.

import { posts, blogIndex } from "@/lib/data";
import { SubPageShell } from "@/components/SubPageShell";
import { Reveal } from "@/components/Reveal";
import { ArrowUpRight } from "@/components/NeuButton";

export function BlogsPageClient() {
  return (
    <SubPageShell
      title="technical blogs"
      sub="engineering notes from building the products — the how, not the hype."
    >
      <div className="dim-group">
        <div className="group">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={0.05 + i * 0.05}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dim-item group/item block w-full touch-manipulation"
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                <article>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 py-5 sm:py-6 border-b border-neutral-200 dark:border-neutral-800">
                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-[15px] leading-6 sm:leading-7 text-black/80 dark:text-white/80 font-medium">
                        {post.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px]">
                        <span className="text-black/35 dark:text-white/30">{post.when}</span>
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className="text-black/35 dark:text-white/30 before:content-['#']"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                        {post.meta}
                      </span>
                      <span className="text-black/25 group-hover/item:text-black dark:text-white/25 dark:group-hover/item:text-white transition-colors">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="flex justify-center mt-8">
            <a
              href={blogIndex}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
            >
              the full engineering archive lives on deepforge →
            </a>
          </div>
        </Reveal>
      </div>
    </SubPageShell>
  );
}
