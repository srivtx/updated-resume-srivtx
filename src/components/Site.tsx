"use client";

// The one frame every page sits in: ruled margin strips, a sticky header
// with the four places named in words (the current one underlined and
// marked for screen readers), a skip link, the content, and a footer that
// repeats the map plus the ways to reach me. The cat patrols all of it.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import OnekoCat from "@/components/OnekoCat";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CopyEmail } from "@/components/CopyEmail";
import { profile, socials } from "@/lib/data";
import { COL } from "@/lib/layout";

export const NAV = [
  { href: "/projects", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/blogs", label: "Notes" },
  { href: "/inventions", label: "Papers" },
] as const;

function isCurrent(path: string, href: string) {
  return path === href || path.startsWith(href + "/");
}


function Strip({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute ${side === "left" ? "left-0" : "right-0"} top-0 w-[60px] h-full overflow-hidden hidden sm:block`} aria-hidden>
      <div
        className="absolute dark:opacity-[0.04] opacity-[0.06] inset-0 w-[60px] h-full border dark:border-[#eee] border-[#000]/70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 2px, currentColor 2px, currentColor 3px, transparent 3px, transparent 6px)",
        }}
      />
    </div>
  );
}

function SiteHeader() {
  const path = usePathname() || "/";
  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-md border-b border-black/[0.07] dark:border-white/[0.08]">
      <div className={`${COL} flex h-14 items-center justify-between gap-3`}>
        <Link
          href="/"
          aria-label="Sribatsha Dash — home"
          aria-current={path === "/" ? "page" : undefined}
          className="flex items-center gap-2.5 rounded-full text-black/85 dark:text-white/85 hover:text-black dark:hover:text-white transition-colors"
        >
          <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10">
            <Image src="/pfp.jpg" alt="" fill sizes="28px" className="object-cover" />
          </span>
          <span className="hidden sm:inline text-[14px] font-medium tracking-[-0.005em]">sribatsha dash</span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-5">
          <nav aria-label="Main">
            <ul className="flex items-center gap-4 sm:gap-6 text-[13.5px] sm:text-[14px]">
              {NAV.map((n) => {
                const on = isCurrent(path, n.href);
                return (
                  <li key={n.href} className="relative flex h-14 items-center">
                    <Link
                      href={n.href}
                      aria-current={on ? "page" : undefined}
                      className={`transition-colors ${
                        on
                          ? "text-black dark:text-white font-medium"
                          : "text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                      }`}
                    >
                      {n.label}
                    </Link>
                    {on && <span aria-hidden className="absolute left-0 right-0 -bottom-px h-[2px] bg-black dark:bg-white" />}
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  const label = "font-mono text-[11px] text-black/35 dark:text-white/35 mb-3";
  const link =
    "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors";
  return (
    <footer className={`${COL} mt-6 border-t border-black/[0.07] dark:border-white/[0.08] pt-8 pb-20 sm:pb-24`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-8 text-[13.5px]">
        <div>
          <p className={label}>on this site</p>
          <ul className="space-y-2">
            <li>
              <Link href="/" className={link}>
                Home
              </Link>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={link}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={label}>elsewhere</p>
          <ul className="space-y-2">
            {socials
              .filter((s) => s.icon !== "mail")
              .map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={link}>
                    {s.name} <span aria-hidden className="text-black/30 dark:text-white/30">↗</span>
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <p className={label}>write to me</p>
          <CopyEmail email={profile.email} />
          <a href={`mailto:${profile.email}`} className={`${link} mt-3 block`}>
            open in mail <span aria-hidden className="text-black/30 dark:text-white/30">↗</span>
          </a>
        </div>
      </div>
      <p className="mt-10 text-xs text-black/30 dark:text-white/30">
        sribatsha dash · srivtx · {profile.location} · 2026 · the cat is watching your cursor
      </p>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <OnekoCat />
      <div className="relative z-10 min-h-screen transition-colors duration-300">
        <div className="relative mx-auto max-w-4xl">
          <Strip side="left" />
          <Strip side="right" />
          <div className="mx-auto sm:w-[calc(100%-120px)] w-full">
            <SiteHeader />
            <main id="content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
          </div>
        </div>
      </div>
    </>
  );
}

// A section heading: plain words, a quiet sub-line, and — when there is
// more — a link to the full page in the same row.
export function SectionHead({
  title,
  sub,
  href,
  more,
  as: H = "h2",
}: {
  title: string;
  sub?: string;
  href?: string;
  more?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-5 sm:mb-6 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <H className="text-[15px] sm:text-base font-medium tracking-[-0.005em] text-black/85 dark:text-white/85">{title}</H>
        {sub && <p className="mt-1 text-[13px] text-black/45 dark:text-white/40">{sub}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group/more shrink-0 inline-flex items-center gap-2 pb-0.5 font-mono text-[11.5px] text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white transition-colors"
        >
          {more}
          <span className="sarrow" aria-hidden />
        </Link>
      )}
    </div>
  );
}
