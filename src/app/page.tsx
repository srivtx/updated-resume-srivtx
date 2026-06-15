// One page. One feature. A grid of supporting work. The meta.
// Three visual registers, in that order. Margin scrawls on the right.

import { meta, bio, contact, marginNotes, feature, supporting, moreOnGithub, upstream, practiceLine, job, school } from "@/lib/data";
import { LiveTime } from "@/components/LiveTime";
import { NnnSketch, NnnRoughSketch, ImgTo3DSketch, LspSketch } from "@/components/Sketch";
import { Doodle } from "@/components/Doodle";
import { ProjectArt } from "@/components/ProjectArt";

// One supporting-work card. Same shape for all 10. Diagram optional.

type SupportingCardData = {
  name: string;
  kicker: string;
  one: string;
  body: string;
  href: string;
  sketch?: "img-to-3d" | "lsp-server";
  featured?: boolean;
  todo?: string;
};

function SupportingCard({ c }: { c: SupportingCardData }) {
  const isFeatured = c.featured === true;
  const hasDiagram = c.sketch === "img-to-3d" || c.sketch === "lsp-server";
  return (
    <article
      className={
        "relative col-span-12 sm:col-span-6 border border-rule-soft bg-paper-soft p-5 sm:p-6 pr-16 hover:border-graphite transition-colors " +
        (isFeatured ? "sm:py-8" : "")
      }
    >
      <Doodle name={c.name} />
      <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-2">
        ↳ {c.kicker}
      </p>
      {isFeatured && (
        <p className="font-serif text-[15px] text-sepia -mt-1 mb-2 italic">
          live · in the world
        </p>
      )}
      <h3 className="font-serif text-[24px] sm:text-[26px] leading-[1.05] tracking-tightest text-ink">
        <a href={c.href} target="_blank" rel="noreferrer" className="hover:text-graphite">
          {c.name}
          <span className="text-ink-faint">.</span>
        </a>
      </h3>
      <p className="mt-1.5 font-serif italic text-[14.5px] text-ink-soft leading-snug">
        {c.one}
      </p>
      <p className="mt-3 font-serif text-[13.5px] leading-[1.65] text-ink-soft text-pretty">
        {c.body}
      </p>
      {!hasDiagram && <ProjectArt name={c.name} />}
      {c.sketch === "img-to-3d" && <ImgTo3DSketch />}
      {c.sketch === "lsp-server" && <LspSketch />}
    </article>
  );
}

// The sticky margin column. Scrawled notes on top, reach at the bottom.
// Two clean, well-spaced sections numbered like a real book.
// Subtle, intentional, generous breathing room.

function MarginColumn() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-8 pt-2">
        <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3">
          ↳ margin
        </p>
        {/* The notes — subtle, lighter weight, intentional marginalia */}
        <ul className="space-y-3">
          {marginNotes.map((n) => (
            <li
              key={n.id}
              className={`font-serif text-[14px] leading-[1.4] opacity-75 ${
                n.kind === "warn"
                  ? "text-rust"
                  : n.kind === "todo"
                    ? "text-sepia"
                    : n.kind === "q"
                      ? "text-graphite"
                      : n.kind === "lesson"
                        ? "text-ink"
                        : "text-ink-soft"
              }`}
            >
              {n.kind === "todo" && "□ "}
              {n.kind === "warn" && "⚠ "}
              {n.kind === "q" && "? "}
              {n.kind === "lesson" && "△ "}
              {n.text}
            </li>
          ))}
        </ul>

        {/* Reduced vertical breathing room between sections — keeps
            reach in view alongside the rest of the page. */}
        <hr className="my-6 border-rule-soft" />

        <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3 mt-1">
          ↳ reach
        </p>
        <ul className="space-y-1.5">
          {contact.map((c) => (
            <li key={c.kind}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                className="font-serif text-[16.5px] text-ink hover:text-graphite link-underline"
              >
                {c.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default function Page() {
  return (
    <main className="relative mx-auto max-w-page px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 pb-24">
      <div className="flex items-baseline justify-between font-serif text-[20px] text-ink-soft mb-10">
        <span>{meta.date}</span>
        <span className="font-mono text-[11px] text-ink-mute tabular-nums">
          <LiveTime /> · in your window
        </span>
      </div>

      <div className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-x-14">
        {/* ====== LEFT — the page proper ====== */}
        <div className="min-w-0">

          {/* HERO */}
          <header>
            <h1 className="font-serif font-normal text-ink leading-[0.95] tracking-[-0.02em]">
              <span className="block text-[clamp(64px,12vw,128px)]">
                Sribatsha
              </span>
              <span className="block text-[clamp(64px,12vw,128px)] italic text-ink-soft pl-[0.18em]">
                Dash<span className="text-ink-faint">.</span>
              </span>
            </h1>

            <p className="mt-7 font-serif text-[22px] sm:text-[26px] text-ink-soft leading-[1.3] max-w-[36ch]">
              Today:{" "}
              <span className="pencil-double-underline">
                Building nnn in the mornings. Lockr support tickets in the evenings. Sleep is a hypothesis, not a fact.
              </span>
            </p>

            <p className="mt-10 font-serif text-[17px] leading-[1.8] text-ink-soft text-pretty max-w-[65ch] dropcap">
              {bio.map((seg, i) =>
                typeof seg === "string" ? (
                  <span key={i}>{seg}</span>
                ) : seg.em ? (
                  <em key={i} className="font-serif">{seg.em}</em>
                ) : null
              )}
            </p>
          </header>

          {/* A page break — like a fresh page in the lab journal.
              Fills the gap between the bio and the feature with a
              hand-drawn horizontal rule + a small dated annotation.
              Same drawing language as the rest of the page. */}
          <div className="mt-16 sm:mt-20 mb-2">
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 200 6"
                className="flex-1 h-1.5 text-ink-mute"
                aria-hidden
              >
                <path
                  d="M 2 3 C 30 1 70 2 110 3 C 140 4 170 4 198 3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.8}
                  strokeLinecap="round"
                  strokeDasharray="0"
                />
              </svg>
              <span className="font-mono text-[9px] uppercase tracking-broad text-ink-faint">
                ↳ on the bench · mon 15 jun
              </span>
            </div>
          </div>

          {/* THE FEATURE — nnn, full width, the loudest thing */}
          <section className="mt-10 sm:mt-12">
            <article className="relative bg-paper-soft border border-rule p-6 sm:p-8 pr-20">
              <Doodle name="nnn" />
              <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-2">
                ↳ {feature.kicker}
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
              <div className="mt-6 space-y-4 font-serif text-[15.5px] leading-[1.75] text-ink-soft max-w-[60ch] text-pretty">
                {feature.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {/* Diagram on the left, a real margin scrawl on the right. Fills the card. */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 md:gap-10 items-start">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3">
                    ↳ the loop
                  </p>
                  <NnnSketch />
                </div>
                <aside className="md:pl-6 md:border-l md:border-rule-soft md:pt-0 pt-2">
                  <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-3">
                    ↳ on disk
                  </p>
                  <NnnRoughSketch />
                  <p className="mt-4 font-serif text-[17px] text-ink-soft leading-snug">
                    the agents share a scratch directory. they pass files, not messages. read the readme on github for what each one actually does.
                  </p>
                </aside>
              </div>

              <p className="mt-6 font-serif text-[18px]">
                <a
                  href={feature.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  github.com/srivtx/nnn ↗
                </a>
              </p>
            </article>
          </section>

          {/* SUPPORTING WORK — one coherent 2-col grid. Same visual system. */}
          <section className="mt-20 sm:mt-24">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-4">
              ↳ more on the bench
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4">
              {supporting.map((c) => (
                <SupportingCard key={c.name} c={c} />
              ))}
            </div>
            <p className="mt-6 font-serif text-[19px] text-ink-soft">
              + a dozen more repos on{" "}
              <a href={moreOnGithub} target="_blank" rel="noreferrer" className="link-underline">
                github / srivtx
              </a>
              .
            </p>
          </section>

          {/* UPSTREAM — the things that got merged into other people's codebases */}
          <section className="mt-20 sm:mt-24">
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
                      className="font-serif text-[18px] sm:text-[20px] text-ink link-underline"
                    >
                      {u.name}
                      <span className="text-ink-faint">.</span>
                    </a>
                    <span className="ml-2 font-serif text-[17px] text-ink-soft">
                      {u.what}
                    </span>
                    <p className="mt-1 font-serif text-[13.5px] text-ink-soft leading-[1.55] max-w-[60ch]">
                      {u.detail}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wide2 text-mute self-start pt-1.5 whitespace-nowrap flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--moss)" }} />
                    {u.state} <span className="text-ink-faint">{u.pr}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* PRACTICE — one handwritten line */}
          <section className="mt-12 sm:mt-14">
            <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute mb-1.5">
              ↳ practice
            </p>
            <p className="font-serif text-[20px] text-ink leading-[1.3]">
              {practiceLine}
            </p>
          </section>

          {/* JOB + SCHOOL */}
          <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
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

          {/* FOOTER — a real closing gesture. Hand-drawn date + sigil. */}
          <div className="mt-24 pt-8 border-t border-rule">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-broad text-ink-mute">
                  ↳ signed
                </p>
                <p className="mt-1 font-serif text-[20px] text-ink-soft">
                  sribatsha dash, bhubaneswar
                </p>
                <p className="mt-0.5 font-serif text-[15px] text-ink-faint italic">
                  hand-built · <span className="not-italic font-mono text-[10px] tracking-wide2 uppercase">next.js</span> · caveat · instrument serif · inter · jb mono
                </p>
              </div>
              <div className="text-right">
                {/* Page-closing signature. A small hand-drawn cursive
                    monogram in the same wobble language as the page
                    doodles — same stroke weight (1.3), same wobble
                    function, same current color. Reads as 'S' and 'D'
                    connected in a single flowing gesture, with a
                    trailing flourish that arcs to the right. Not a
                    font — drawn with the page's hand. */}
                <svg
                  viewBox="0 0 200 70"
                  width={140}
                  height={49}
                  className="text-ink ml-auto"
                  role="img"
                  aria-label="S.D. — hand-drawn signature"
                  style={{ transform: "rotate(-3deg)" }}
                >
                  {/* the monogram — connected S, dot, D, all in one
                      flowing hand-drawn gesture with the page's wobble.
                      ~1.3px stroke, no fill, with the same hand-drawn
                      character as every other line on the page. */}
                  <path
                    d="M 30 38
                       C 24 38 18 32 22 24
                       C 26 18 38 18 44 24
                       C 48 30 44 38 36 40
                       C 42 38 50 36 56 32
                       C 60 28 60 22 56 20
                       C 52 18 48 22 48 28
                       C 50 36 60 42 70 40
                       C 80 38 86 32 86 24
                       C 86 18 80 14 74 18
                       C 78 18 84 22 90 24
                       C 98 28 106 28 112 24
                       C 118 20 124 18 130 20
                       C 138 22 144 30 144 38
                       C 144 46 138 50 132 48
                       C 126 46 122 40 124 32
                       C 126 26 132 24 138 28
                       C 144 32 150 38 156 42
                       C 162 46 168 46 170 42"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* a small period at the end of the flourish — like a
                      real signature's terminal dot */}
                  <circle cx={172} cy={42} r={1.3} fill="currentColor" />
                </svg>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-broad text-ink-faint">
                  sribatsha dash · mon 15 jun 26
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====== MIDDLE — hand-drawn illustration absolutely positioned
            in the gap between the bio and the right margin. Doesn't
            affect the layout of the supporting work below. Only visible
            on wide viewports where there's room. */}
        <div
          className="hidden xl:block absolute pointer-events-none"
          style={{ left: "calc(50% + 60px)", top: "60px" }}
        >
          <svg
            viewBox="0 0 200 200"
            width={200}
            height={200}
            className="text-ink opacity-80"
            role="img"
            aria-label="Hand-drawn 3D coordinate frame with a curve through it"
          >
            {/* the 3D coordinate frame — three axes meeting at the origin */}
            <path
              d="M 100 130
                 L 100 24
                 M 100 130
                 L 178 168
                 M 100 130
                 L 22 168"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.3}
              strokeLinecap="round"
            />
            {/* small arrowheads at the ends of the axes */}
            <path d="M 100 24 L 96 32 M 100 24 L 104 32" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
            <path d="M 178 168 L 170 165 M 178 168 L 174 175" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
            <path d="M 22 168 L 28 165 M 22 168 L 26 159" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />
            {/* axis labels */}
            <text x="98" y="18" fontFamily="var(--font-hand), 'Caveat', cursive" fontSize="18" fontStyle="italic" fill="currentColor">y</text>
            <text x="184" y="170" fontFamily="var(--font-hand), 'Caveat', cursive" fontSize="18" fontStyle="italic" fill="currentColor">x</text>
            <text x="6" y="174" fontFamily="var(--font-hand), 'Caveat', cursive" fontSize="18" fontStyle="italic" fill="currentColor">z</text>
            {/* a hand-drawn curve threading through the space */}
            <path
              d="M 36 142
                 C 50 116 70 96 90 80
                 C 108 66 130 60 144 70
                 C 158 80 162 100 158 122
                 C 152 142 138 152 124 152"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.3}
              strokeLinecap="round"
            />
            {/* a few dots on the curve, like data points */}
            <circle cx="40" cy="138" r="2.2" fill="currentColor" />
            <circle cx="78" cy="92" r="2.2" fill="currentColor" />
            <circle cx="124" cy="62" r="2.2" fill="currentColor" />
            <circle cx="160" cy="100" r="2.2" fill="currentColor" />
            <circle cx="140" cy="148" r="2.2" fill="currentColor" />
            {/* a small annotation arrow with a hand-written label */}
            <path
              d="M 124 80
                 C 138 70 152 60 166 50"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
            />
            <text
              x="172"
              y="48"
              fontFamily="var(--font-hand), 'Caveat', cursive"
              fontSize="16"
              fill="currentColor"
              fontStyle="italic"
            >
              f(x)?
            </text>
            {/* origin marker — a small dot where the three axes meet */}
            <circle cx="100" cy="130" r="2" fill="currentColor" />
            {/* a faint ellipse at the base of the frame, suggesting
                a ground plane — gives the frame a 3D feel */}
            <ellipse
              cx="100"
              cy="170"
              rx="78"
              ry="10"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              opacity={0.4}
              strokeDasharray="0"
            />
          </svg>
        </div>

        {/* ====== RIGHT — sticky margin ====== */}
        <MarginColumn />
      </div>
      </div>
    </main>
  );
}
