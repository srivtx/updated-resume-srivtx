// Lab journal 2.0 — same notebook soul, rebuilt like a modern portfolio:
// sticky nav pill, dark mode, live GitHub numbers, contribution heatmap,
// stack ticker, scroll reveals, and one wandering agent. Copy stays
// short. Every line earns its place.

import { meta, today, bio, contact, feature, supporting, moreOnGithub, upstream, practiceLine, job, school } from "@/lib/data";
import { Doodle } from "@/components/Doodle";
import { Logo } from "@/components/Logo";
import { ChaosBackground } from "@/components/ChaosBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Reveal } from "@/components/Reveal";
import { GitHubStats } from "@/components/GitHubStats";
import { Contributions } from "@/components/Contributions";
import { StackMarquee } from "@/components/StackMarquee";
import { WanderingAgent } from "@/components/WanderingAgent";

const NAV = [
  { label: "bench", href: "#bench" },
  { label: "work", href: "#work" },
  { label: "graph", href: "#graph" },
  { label: "contact", href: "#contact" },
];

type SupportingCardData = {
  name: string;
  kicker: string;
  one: string;
  href: string;
};

function SupportingCard({ c }: { c: SupportingCardData }) {
  return (
    <article className="group relative col-span-12 sm:col-span-6 border border-rule-soft bg-paper/40 backdrop-blur-md p-5 sm:p-6 pr-16 hover:border-ink-mute hover:-translate-y-0.5 transition-all">
      <Doodle name={c.name} />
      <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-2">
        {c.kicker}
      </p>
      <h3 className="font-serif text-[24px] leading-[1.05] tracking-tightest text-ink">
        <a href={c.href} target="_blank" rel="noreferrer" className="hover:text-graphite">
          {c.name}
          <span className="text-ink-faint">.</span>
        </a>
      </h3>
      <p className="mt-1.5 font-serif italic text-[14.5px] text-ink-soft leading-snug">
        {c.one}
      </p>
      <span className="absolute bottom-4 right-4 font-mono text-[12px] text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
        ↗
      </span>
    </article>
  );
}

export default function Page() {
  return (
    <>
      <ChaosBackground />
      <WanderingAgent />
      <main className="relative mx-auto max-w-[980px] px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 pb-24">
        {/* ====== NAV PILL ====== */}
        <nav className="sticky top-3 z-30 -mx-2 sm:-mx-4 mb-14 sm:mb-16 flex justify-center">
          <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-rule-soft bg-paper/70 backdrop-blur-md px-2 sm:px-3 py-1.5 shadow-[0_1px_8px_rgb(var(--ink)/0.04)]">
            <a href="/" aria-label="Sribatsha Dash — home" className="group h-7 w-7 flex items-center justify-center rounded-full hover:bg-ink/[0.06] transition-colors">
              <Logo className="text-ink group-hover:text-graphite transition-colors" size={22} />
            </a>
            <span className="w-px h-4 bg-rule-soft" aria-hidden />
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-[10px] uppercase tracking-wide2 text-ink-mute hover:text-ink px-2 py-1 rounded-full hover:bg-ink/[0.06] transition-colors"
              >
                {n.label}
              </a>
            ))}
            <span className="w-px h-4 bg-rule-soft" aria-hidden />
            <ThemeToggle />
          </div>
        </nav>

        {/* ====== HERO ====== */}
        <header className="pb-14">
          <h1 className="flex flex-col font-normal text-ink leading-[0.95]">
            <span className="block font-display font-extrabold text-[clamp(32px,5vw,56px)] uppercase tracking-[0.04em]">
              Sribatsha
            </span>
            <span className="block font-display font-extrabold text-[clamp(32px,5vw,56px)] uppercase text-ink-soft tracking-[0.04em]">
              Dash<span className="text-ink-faint">.</span>
            </span>
          </h1>

          <p className="mt-6 font-serif text-[17px] sm:text-[19px] text-ink-soft leading-[1.4] max-w-[46ch]">
            Today:{" "}
            <span className="pencil-double-underline">{today}</span>
          </p>

          <p className="mt-8 font-serif text-[17px] leading-[1.7] text-ink-soft text-pretty max-w-[52ch]">
            {bio.map((seg, i) =>
              typeof seg === "string" ? (
                <span key={i}>{seg}</span>
              ) : seg.em ? (
                <em key={i} className="font-serif">{seg.em}</em>
              ) : null
            )}
          </p>

          <GitHubStats />
        </header>

        {/* ====== PAGE BREAK ====== */}
        <div id="bench" className="mt-16 sm:mt-20 mb-12 scroll-mt-24">
          <div className="flex items-center gap-4">
            <svg viewBox="0 0 200 6" preserveAspectRatio="none" className="flex-1 h-1.5 text-ink-mute" aria-hidden>
              <path d="M 2 3 C 30 1 70 2 110 3 C 140 4 170 4 198 3" fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[9px] uppercase tracking-broad text-ink-faint">
              ↳ on the bench · {meta.date.toLowerCase()}
            </span>
            <svg viewBox="0 0 200 6" preserveAspectRatio="none" className="flex-1 h-1.5 text-ink-mute" aria-hidden>
              <path d="M 2 3 C 30 1 70 2 110 3 C 140 4 170 4 198 3" fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* ====== FEATURE ====== */}
        <Reveal>
          <section>
            <article className="relative bg-paper/40 backdrop-blur-md border border-rule p-6 sm:p-8 pr-20">
              <Doodle name="customs" />
              <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-2">
                ↳ {feature.kicker} · live
              </p>
              <h2 className="font-serif text-[44px] sm:text-[60px] leading-[0.95] tracking-tightest text-ink">
                <a href={feature.href} target="_blank" rel="noreferrer" className="hover:text-graphite">
                  {feature.name}
                  <span className="text-ink-faint">.</span>
                </a>
              </h2>
              <p className="mt-3 font-serif italic text-[19px] sm:text-[21px] text-ink-soft leading-snug">
                {feature.one}
              </p>
              <p className="mt-4 font-serif text-[15.5px] leading-[1.65] text-ink-soft text-pretty max-w-[58ch]">
                {feature.body}
              </p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-wide2 text-ink-mute flex flex-wrap gap-x-3 gap-y-1.5">
                {feature.facts.map((f) => (
                  <span key={f} className="border border-rule-soft px-2 py-1 bg-paper/50">{f}</span>
                ))}
              </p>

              <p className="mt-7 font-serif text-[18px]">
                <a
                  href={feature.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink hover:text-graphite border-b border-rule hover:border-ink-mute transition-colors"
                >
                  customs.srivtx.xyz ↗
                </a>
              </p>
            </article>
          </section>
        </Reveal>

        {/* ====== SUPPORTING WORK ====== */}
        <Reveal>
          <section id="work" className="mt-14 sm:mt-16 scroll-mt-24">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-4">
              ↳ also on the bench
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
              {supporting.map((c) => (
                <SupportingCard key={c.name} c={c} />
              ))}
            </div>
            <p className="mt-6 font-serif text-[17px] text-ink-soft">
              + the rest on{" "}
              <a href={moreOnGithub} target="_blank" rel="noreferrer" className="text-ink hover:text-graphite border-b border-rule hover:border-ink-mute transition-colors">
                github / srivtx
              </a>
              .
            </p>
          </section>
        </Reveal>

        {/* ====== CONTRIBUTION GRAPH ====== */}
        <Reveal>
          <section id="graph" className="mt-14 sm:mt-16 scroll-mt-24">
            <div className="mb-4">
              <svg viewBox="0 0 200 6" preserveAspectRatio="none" className="w-full h-1.5 text-ink-mute mb-4" aria-hidden>
                <path d="M 2 3 C 30 1 70 2 110 3 C 140 4 170 4 198 3" fill="none" stroke="currentColor" strokeWidth={0.8} strokeLinecap="round" />
              </svg>
            </div>
            <Contributions />
          </section>
        </Reveal>

        {/* ====== STACK TICKER ====== */}
        <Reveal>
          <section className="mt-14 sm:mt-16">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3">
              ↳ the stack
            </p>
            <StackMarquee />
            <p className="mt-3 font-serif text-[20px] text-ink leading-[1.3]">
              {practiceLine}
            </p>
          </section>
        </Reveal>

        {/* ====== UPSTREAM ====== */}
        <Reveal>
          <section className="mt-14 sm:mt-16">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-4">
              ↳ merged upstream
            </p>
            <ul className="space-y-0">
              {upstream.map((u) => (
                <li
                  key={u.name}
                  className="py-3.5 border-b border-rule-soft grid grid-cols-[1fr_auto] gap-4 items-baseline"
                >
                  <div className="min-w-0">
                    <a
                      href={u.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-[18px] sm:text-[20px] text-ink hover:text-graphite"
                    >
                      {u.name}
                      <span className="text-ink-faint">.</span>
                    </a>
                    <span className="ml-2 font-serif text-[15px] text-ink-soft italic">
                      {u.what}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide2 text-ink-mute self-start pt-1.5 whitespace-nowrap flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-moss" />
                    {u.state} <span className="text-ink-faint">{u.pr}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* ====== JOB / SCHOOL ====== */}
        <Reveal>
          <section className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-1">
                ↳ the job
              </p>
              <p className="font-serif text-[15px] text-ink">
                {job.role}, <span className="italic">{job.where.toLowerCase()}</span>{" "}
                <span className="text-ink-mute font-mono text-[12px]">· {job.period}</span>
              </p>
              <p className="mt-1.5 font-serif text-[13px] text-ink-soft max-w-[48ch] leading-[1.55]">
                {job.detail}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-1">
                ↳ the school
              </p>
              <p className="font-serif text-[15px] text-ink">
                {school.where}{" "}
                <span className="text-ink-mute font-mono text-[12px]">· {school.period}</span>
              </p>
              <p className="mt-1.5 font-serif text-[13px] text-ink-soft max-w-[48ch] leading-[1.55]">
                {school.detail}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ====== CONTACT CTA ====== */}
        <Reveal>
          <section id="contact" className="mt-16 sm:mt-20 scroll-mt-24">
            <div className="border border-rule bg-paper/40 backdrop-blur-md p-6 sm:p-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3">
                ↳ let&apos;s build
              </p>
              <p className="font-serif italic text-[24px] sm:text-[28px] text-ink leading-snug">
                got a hard problem at the seam of systems and interfaces?
              </p>
              <p className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href={`mailto:${meta.email}`}
                  className="font-serif text-[17px] text-ink hover:text-graphite border border-rule-soft hover:border-ink-mute bg-paper/60 px-5 py-2.5 transition-colors"
                >
                  write to me ↗
                </a>
                {contact.slice(0, 3).map((c) => (
                  <a
                    key={c.kind}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="font-mono text-[11px] uppercase tracking-wide2 text-ink-mute hover:text-ink self-center px-2 transition-colors"
                  >
                    {c.kind}
                  </a>
                ))}
              </p>
            </div>
          </section>
        </Reveal>

        {/* ====== FOOTER ====== */}
        <footer className="mt-16 pt-8 border-t border-rule">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute">
                ↳ signed
              </p>
              <p className="mt-1 font-serif text-[20px] text-ink-soft">
                sribatsha dash, bhubaneswar
              </p>
            </div>
            <div className="text-right">
              <svg
                viewBox="0 0 200 70"
                width={140}
                height={49}
                className="text-ink ml-auto"
                role="img"
                aria-label="S.D. — hand-drawn signature"
                style={{ transform: "rotate(-3deg)" }}
              >
                <path
                  d="M 30 38 C 24 38 18 32 22 24 C 26 18 38 18 44 24 C 48 30 44 38 36 40 C 42 38 50 36 56 32 C 60 28 60 22 56 20 C 52 18 48 22 48 28 C 50 36 60 42 70 40 C 80 38 86 32 86 24 C 86 18 80 14 74 18 C 78 18 84 22 90 24 C 98 28 106 28 112 24 C 118 20 124 18 130 20 C 138 22 144 30 144 38 C 144 46 138 50 132 48 C 126 46 122 40 124 32 C 126 26 132 24 138 28 C 144 32 150 38 156 42 C 162 46 168 46 170 42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx={172} cy={42} r={1.3} fill="currentColor" />
              </svg>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-broad text-ink-faint">
                sribatsha dash · {meta.date.toLowerCase()}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
