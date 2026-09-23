// srivtx — rebuilt on the bharathships.me skeleton, then pushed
// further: same ruled margins, same serif italic voice, same tactile
// buttons — plus live product previews, papers, and blogs.

import Image from "next/image";
import {
  profile,
  socials,
  experience,
  products,
  builds,
  posts,
  papers,
  upstream,
} from "@/lib/data";
import {
  NeuIconLink,
  NeuButton,
  GithubIcon,
  XIcon,
  MailIcon,
  ArrowUpRight,
} from "@/components/NeuButton";
import { Experience } from "@/components/ExpItem";
import { ProductPreview, BuildPreview } from "@/components/AppPreview";
import { Reveal } from "@/components/Reveal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GitHubStats } from "@/components/GitHubStats";
import { Contributions } from "@/components/Contributions";
import { StackMarquee } from "@/components/StackMarquee";
import { WanderingAgent } from "@/components/WanderingAgent";

/* ---------- small building blocks ---------- */

function Rule() {
  return (
    <Reveal>
      <div className="border-b border-dashed border-black/[0.06] dark:border-white/[0.06] mt-4" />
    </Reveal>
  );
}

function Section({
  title,
  sub,
  children,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <div className="sm:px-12 py-2">
        <div className="px-4 mb-4 sm:mb-6 mt-4 sm:mt-6">
          <h2 className="text-base sm:text-xl opacity-70 font-serif">{title}</h2>
          {sub && <p className="opacity-20 text-sm sm:text-base mt-1">{sub}</p>}
        </div>
        <div className="px-4">{children}</div>
      </div>
    </Reveal>
  );
}

const CHIP =
  "inline-flex items-center rounded-md border text-[11px] font-medium h-5 px-2 " +
  "border-black/10 dark:border-white/10 text-black/50 dark:text-white/50";

/* ---------- hero ---------- */

function Hero() {
  return (
    <>
      {/* banner */}
      <Reveal>
        <div className="w-full mb-2 relative">
          <div className="relative" style={{ height: "auto" }}>
            <Image
              alt="pixel landscape banner"
              src="/pixel-banner.png"
              width={1344}
              height={768}
              priority
              className="w-full h-[180px] sm:h-[280px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <p className="text-white text-base sm:text-xl italic font-serif text-center drop-shadow-[0_1px_6px_rgba(0,0,0,0.55)]">
                {profile.bannerQuote}
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* pfp + theme toggle */}
      <Reveal delay={0.05}>
        <div className="flex-col -mt-10">
          <div className="flex items-center justify-between mb-4 sm:ml-8 ml-4 sm:mr-8 mr-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 relative z-10 rounded-full overflow-hidden shrink-0 ring-2 ring-white dark:ring-zinc-900">
              <Image
                alt={profile.name}
                src="/pfp.jpg"
                fill
                priority
                sizes="112px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* name, tagline, socials */}
      <Reveal delay={0.1}>
        <div className="text-left sm:flex sm:justify-between sm:items-center w-full sm:px-8 px-4 flex-col sm:flex-row">
          <div className="px-0">
            <h1 className="font-serif italic text-2xl sm:text-4xl tracking-[0.01em] font-medium mb-0">
              {profile.first} Dash
            </h1>
            <p className="opacity-40 text-xs sm:text-sm">
              {profile.tagline.join(" • ")}
            </p>
          </div>
          <div className="flex justify-start gap-1 sm:gap-2 mt-3 sm:mt-0 px-0">
            {socials.map((s) => (
              <NeuIconLink key={s.name} href={s.href} label={s.name}>
                {s.icon === "github" && <GithubIcon className="h-4 w-4" />}
                {s.icon === "x" && <XIcon className="h-4 w-4" />}
                {s.icon === "mail" && <MailIcon className="h-4 w-4" />}
              </NeuIconLink>
            ))}
          </div>
        </div>
      </Reveal>

      {/* live github numbers */}
      <Reveal delay={0.15}>
        <div className="sm:px-8 px-4">
          <GitHubStats />
        </div>
      </Reveal>
    </>
  );
}

/* ---------- product cards ---------- */

function FeaturedProductCard() {
  const p = products[0]; // deriva — the super app
  return (
    <div className="dim-item block w-full">
      <div className="flex flex-col sm:flex-row w-full h-full p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.01] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        <div className="sm:w-[58%]">
          <ProductPreview kind={p.preview} aspect="wide" />
        </div>
        <div className="flex-1 px-3 py-3 sm:pl-4 flex flex-col justify-center gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={p.href}
              className="inline-flex w-fit max-w-full text-left text-[17px] leading-snug text-black/80 dark:text-white/80 font-medium hover:text-black dark:hover:text-white transition-colors"
            >
              <span className="truncate font-medium">{p.name}</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live site for ${p.name}`}
              href={p.href}
              className="shrink-0 mt-0.5 inline-flex rounded-full text-black/30 hover:text-black dark:text-white/30 dark:hover:text-white transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs leading-relaxed text-black/50 dark:text-white/30 max-w-[52ch]">
            {p.one}
          </p>
          <p className="text-[11px] text-black/35 dark:text-white/25 leading-relaxed">
            apps inside apps — learn, observe and pattern-match in one shell.
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {p.chips.map((c) => (
              <span key={c} className={CHIP}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ p }: { p: (typeof products)[number] }) {
  return (
    <div className="dim-item block w-full">
      <div className="flex flex-col w-full h-full p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        <ProductPreview kind={p.preview} />
        <div className="w-full px-2 pt-2 pb-1 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={p.href}
              className="inline-flex w-fit max-w-full text-left text-[15px] leading-snug text-black/80 dark:text-white/80 font-medium hover:text-black dark:hover:text-white transition-colors"
            >
              <span className="truncate font-medium">{p.name}</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live site for ${p.name}`}
              href={p.href}
              className="shrink-0 mt-0.5 inline-flex rounded-full text-black/30 hover:text-black dark:text-white/30 dark:hover:text-white transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs leading-relaxed text-black/50 dark:text-white/30">
            {p.one}
          </p>
          <div className="flex flex-wrap gap-1 pt-1 pb-1">
            {p.chips.map((c) => (
              <span key={c} className={CHIP}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- open-source build cards ---------- */

function BuildCard({ b }: { b: (typeof builds)[number] }) {
  return (
    <div className="dim-item block w-full">
      <div className="flex flex-col w-full h-full p-1 bg-white dark:bg-white/10 border border-black/10 dark:border-white/5 rounded-[10px] transition-all duration-300 ease-out hover:border-black/20 dark:hover:border-white/10 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20">
        <BuildPreview tone={b.tone} glyph={b.glyph} />
        <div className="w-full px-2 pt-2 pb-1 flex flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={b.href}
              className="inline-flex w-fit max-w-full text-left text-[15px] leading-snug text-black/80 dark:text-white/80 font-medium hover:text-black dark:hover:text-white transition-colors"
            >
              <span className="truncate font-medium">{b.name}</span>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open repository for ${b.name}`}
              href={b.href}
              className="shrink-0 mt-0.5 inline-flex rounded-full text-black/30 hover:text-black dark:text-white/30 dark:hover:text-white transition-colors"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <p className="text-xs leading-relaxed text-black/50 dark:text-white/30">
            {b.one}
          </p>
          <div className="flex flex-wrap gap-1 pt-1 pb-1">
            {b.chips.map((c) => (
              <span key={c} className={CHIP}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- the page ---------- */

export default function Page() {
  return (
    <>
      <WanderingAgent />
      <div className="relative z-10">
        <div className="min-h-screen transition-colors duration-300 relative">
          <div className="relative mx-auto max-w-4xl">
            {/* the ruled margin strips */}
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

            {/* fixed theme toggle */}
            <div className="fixed top-3 right-3 z-40 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-sm">
              <ThemeToggle className="m-0.5" />
            </div>

            <div className="mx-auto sm:w-[calc(100%-120px)] w-full max-w-4xl sm:px-0">
              <Hero />

              <Rule />

              {/* ====== EXPERIENCE ====== */}
              <Section title="Professional Experience">
                <Experience items={experience} />
              </Section>

              <Rule />

              {/* ====== PRODUCTS ====== */}
              <Section title="Proof of Work" sub="products people actually use">
                <div className="grid grid-cols-1 gap-4 sm:gap-3 sm:grid-cols-2 dim-group">
                  <FeaturedProductCard />
                  {products.slice(1).map((p) => (
                    <ProductCard key={p.name} p={p} />
                  ))}
                </div>
              </Section>

              <Rule />

              {/* ====== OPEN SOURCE ====== */}
              <Section title="Open Source" sub="more builds on the bench">
                <div className="grid grid-cols-1 gap-4 sm:gap-3 sm:grid-cols-2 dim-group">
                  {builds.map((b) => (
                    <BuildCard key={b.name} b={b} />
                  ))}
                </div>

                {/* merged upstream */}
                <div className="mt-8">
                  <p className="text-[11px] uppercase tracking-widest text-black/30 dark:text-white/30 mb-2">
                    merged upstream
                  </p>
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
                </div>
              </Section>

              <Rule />

              {/* ====== CONTRIBUTIONS ====== */}
              <Reveal>
                <div className="sm:px-12 py-2">
                  <div className="px-4 mt-4 sm:mt-6">
                    <Contributions />
                  </div>
                </div>
              </Reveal>

              <Rule />

              {/* ====== STACK ====== */}
              <Section title="Stack I use" sub="Technologies I work with">
                <StackMarquee />
              </Section>

              <Rule />

              {/* ====== TECHNICAL BLOGS ====== */}
              <Section title="Technical Blogs" sub="engineering notes from building the products">
                <div className="space-y-0 dim-group">
                  {posts.map((post) => (
                    <a
                      key={post.title}
                      href={post.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dim-item block w-full"
                    >
                      <article>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 py-5 sm:py-6 border-b border-neutral-200 dark:border-neutral-800">
                          <h3 className="text-sm sm:text-[15px] leading-6 sm:leading-7 text-black/80 dark:text-white/80 font-medium">
                            {post.title}
                          </h3>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wide shrink-0">
                            {post.meta}
                          </span>
                        </div>
                      </article>
                    </a>
                  ))}
                </div>
                <div className="flex justify-center mt-6 sm:mt-8 mb-2">
                  <NeuButton href="https://deepforge.srivtx.xyz/blog" external>
                    <span>View All</span>
                    <span>→</span>
                  </NeuButton>
                </div>
              </Section>

              <Rule />

              {/* ====== RESEARCH PAPERS ====== */}
              <Section title="Research Papers" sub="inventions from the DeepForge lab">
                <div className="space-y-0 dim-group">
                  {papers.map((paper) => (
                    <a
                      key={paper.title}
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dim-item block w-full"
                    >
                      <article>
                        <div className="flex items-center justify-between gap-4 py-5 sm:py-6 border-b border-neutral-200 dark:border-neutral-800">
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-[15px] leading-6 text-black/80 dark:text-white/80 font-medium">
                              {paper.title}
                            </h3>
                            <p className="mt-0.5 text-xs text-black/40 dark:text-white/35 leading-relaxed">
                              {paper.sub}
                            </p>
                          </div>
                          <span className={`${CHIP} shrink-0`}>PDF</span>
                        </div>
                      </article>
                    </a>
                  ))}
                </div>
                <div className="flex justify-center mt-6 sm:mt-8 mb-2">
                  <NeuButton href="https://deepforge.srivtx.xyz/inventions" external>
                    <span>View All</span>
                    <span>→</span>
                  </NeuButton>
                </div>
              </Section>

              <Rule />

              {/* ====== CTA ====== */}
              <Reveal>
                <div className="px-4 sm:px-12">
                  <div className="mt-4 sm:mt-6 pb-6 sm:pb-8 flex flex-col items-center w-full">
                    <p className="text-neutral-600 dark:text-neutral-400 font-serif italic text-base sm:text-xl mb-4 text-center">
                      If you&rsquo;ve read this far, you might be interested in what I build.
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="group inline-flex touch-manipulation active:opacity-75"
                      style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                      <div className="relative flex w-max items-center justify-center overflow-hidden rounded-2xl border [box-shadow:0_4px_10px_-4px_rgba(15,23,42,0.15)] bg-neutral-50 border-neutral-200 after:border-neutral-100 after:border-t-[2px] after:border-b-[2px] after:border-b-neutral-300 dark:bg-[#212121] dark:border-black/50 dark:after:border-[#2A2A2A] dark:after:border-b-black/50 after:absolute after:inset-0 after:rounded-2xl after:border-r-0 after:content-[''] transition-all duration-150 ease-out hover:[&>div]:translate-y-[1px] hover:after:border-b-0 hover:after:border-t-neutral-300 hover:after:[box-shadow:0_3px_10px_0_rgba(15,23,42,0.12)_inset] dark:hover:after:border-t-black/50 dark:hover:after:[box-shadow:0_5px_15px_0_#00000070_inset]">
                        <div className="flex items-center justify-center p-0 px-5 py-2.5 text-sm sm:text-base text-neutral-800 dark:text-white/90">
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shrink-0 relative">
                              <Image src="/pfp.jpg" alt="Profile" fill sizes="28px" className="object-cover" />
                            </div>
                            <span className="whitespace-nowrap">write to me</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </Reveal>

              <Rule />

              {/* ====== CONNECT + FOOTER ====== */}
              <Reveal>
                <div className="mt-4 sm:mt-6">
                  <div className="sm:px-12 px-4 pb-20 sm:pb-24">
                    <div className="text-center sm:text-left w-full">
                      <div className="mb-4 sm:mb-6">
                        <h2 className="font-serif text-lg sm:text-xl font-medium mb-2 opacity-70">
                          Let&rsquo;s connect
                        </h2>
                        <p className="opacity-20 text-md sm:text-lg">Find me on these platforms</p>
                      </div>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4">
                        <NeuButton href="https://github.com/srivtx" external className="inline-flex">
                          <GithubIcon className="h-4 w-4" />
                          <span className="hidden sm:inline text-sm font-medium">GitHub</span>
                        </NeuButton>
                        <NeuButton href="https://x.com/srivtx" external className="inline-flex">
                          <XIcon className="h-4 w-4" />
                          <span className="hidden sm:inline text-sm font-medium">X</span>
                        </NeuButton>
                        <NeuButton href="https://deepforge.srivtx.xyz" external className="inline-flex">
                          <span className="text-sm font-medium">DeepForge</span>
                        </NeuButton>
                        <NeuButton href="https://deriva.srivtx.xyz" external className="inline-flex">
                          <span className="text-sm font-medium">Deriva</span>
                        </NeuButton>
                      </div>

                      <div className="mt-10 sm:mt-14 text-center sm:text-left">
                        <p className="text-xs text-black/30 dark:text-white/30">
                          sribatsha dash · srivtx · {profile.location} · 2026
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
