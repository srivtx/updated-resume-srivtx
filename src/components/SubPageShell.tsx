"use client";

// Sub-page shell — the bharathships.me sub-page skeleton: ruled margin
// strips, a nav pill (home + section links + theme toggle), the oneko
// cat, italic serif page title, content, and a small footer.

import Link from "next/link";
import type { ReactNode } from "react";
import OnekoCat from "@/components/OnekoCat";
import { ThemeToggle } from "@/components/ThemeToggle";

function NavPill() {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-0.5 p-0.5 bg-black/5 dark:bg-white/10 rounded-full h-[32px]">
        <Link
          href="/"
          aria-label="Home"
          title="Home"
          className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[15px] w-[15px]" aria-hidden>
            <path d="M3 10.5 12 3l9 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <Link
          href="/projects"
          aria-label="Projects"
          title="Projects"
          className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[14px] w-[14px]" aria-hidden>
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
        </Link>
        <Link
          href="/blogs"
          aria-label="Blogs"
          title="Blogs"
          className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[13px] w-[13px]" aria-hidden>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </Link>
        <Link
          href="/inventions"
          aria-label="Papers"
          title="Research papers"
          className="w-7 h-7 hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 rounded-full flex items-center justify-center text-black/75 dark:text-white/80"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-[13px] w-[13px]" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M9 13h6M9 17h6" />
          </svg>
        </Link>
      </div>
      <div className="rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-sm">
        <ThemeToggle className="m-0.5" />
      </div>
    </div>
  );
}

export function SubPageShell({
  title,
  sub,
  children,
  wide = false,
}: {
  title: string;
  sub: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen transition-colors duration-300 relative">
      <OnekoCat />
      <div className="relative mx-auto max-w-4xl">
        {/* ruled margin strips */}
        <div className="absolute left-0 w-[60px] h-full overflow-hidden hidden sm:block" style={{ top: 0 }}>
          <div
            className="absolute dark:opacity-[0.04] opacity-[0.06] inset-0 w-[60px] h-full border dark:border-[#eee] border-[#000]/70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)",
            }}
          />
        </div>
        <div className="absolute right-0 w-[60px] h-full overflow-hidden hidden sm:block" style={{ top: 0 }}>
          <div
            className="absolute dark:opacity-[0.04] opacity-[0.06] inset-0 w-[60px] h-full border dark:border-[#eee] border-[#000]/70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)",
            }}
          />
        </div>

        <div className={`mx-auto ${wide ? "" : "sm:w-[calc(100%-120px)]"} w-full max-w-4xl sm:px-0`}>
          <div className="text-base">
            <div className="sm:px-12 py-2">
              <div className="px-4 mb-4 sm:mb-6 pt-4 sm:pt-6">
                <div className="mb-4 sm:mb-6">
                  <NavPill />
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif italic font-medium mb-4 text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {title}
                </h1>
                <p className="text-lg text-neutral-500 dark:text-neutral-400 tracking-wide">
                  {sub}
                </p>
              </div>
            </div>

            <div className="sm:px-12 py-2">
              <div className="px-4">{children}</div>
            </div>

            <div className="pb-20 sm:pb-24">
              <div className="sm:px-12 px-4 mt-6">
                <p className="text-xs text-black/30 dark:text-white/30">
                  sribatsha dash · srivtx · the cat is watching your cursor
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
