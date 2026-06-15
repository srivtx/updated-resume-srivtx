// Three tiers of work. nnn is the feature. 5 are supporting. 14 more
// are linked out to GitHub, not displayed. The meta is honest asides.

export const meta = {
  name: "Sribatsha Dash",
  handle: "srivtx",
  email: "crypticcc101@gmail.com",
  location: "Bhubaneswar",
  status: "Available",
  date: "15 Jun 2026",
};

export const today =
  "Building nnn in the mornings. Lockr support tickets in the evenings. Sleep is a hypothesis, not a fact.";

export const bio = [
  "srivtx. Polymath, first-principles thinker, tinkers with hardware. He builds software the way other people build furniture: by hand, on a bench, with the joints visible. Most of his work sits at the seam between systems software and the interface — Rust binaries that serve markdown, Zig frameworks for Solana, language servers, agent loops, CSS preprocessors. The recurring question is the same one: ",
  { em: "what does this look like if i stop reaching for a framework?" },
];

export const contact = [
  { kind: "linkedin", label: "linkedin", href: "https://www.linkedin.com/in/sribatsha-dash-bb3327241/" },
  { kind: "x",        label: "x / srivtx", href: "https://x.com/srivtx" },
  { kind: "github",   label: "github / srivtx", href: "https://github.com/srivtx" },
  { kind: "email",    label: "crypticcc101@gmail.com", href: "mailto:crypticcc101@gmail.com" },
];
// Margin scrawls — short, hand, real thoughts. Not 10 of them. 4-5.
export const marginNotes: { id: string; text: string; kind: "todo" | "note" | "warn" | "q" | "lesson" }[] = [
  { id: "n1", kind: "note", text: "local models have been good enough for a while. the interface layer was missing." },
  { id: "n2", kind: "q",    text: "what does this look like if i stop reaching for a framework?" },
  { id: "n3", kind: "warn", text: "do NOT add another carousel." },
  { id: "n4", kind: "todo", text: "finish v2 of fear-greed. the v1 ingest was a crime scene." },
  { id: "n5", kind: "note", text: "lockr settled in 3 sec, $0.001 fee. upwork: 14 days, 20%." },
  { id: "n6", kind: "note", text: "comptime > runtime. visibility > convenience. (recurring thesis.)" },
  { id: "n7", kind: "lesson", text: "things i've broken: mycelium's seed derivation, the lockr PDA, two ledgers. each one took an afternoon to find." },
];

// The feature. One. The page is built around this.
export const feature = {
  kicker: "what i'm building now",
  name: "nnn",
  one: "A team of agents, on the laptop.",
  body: [
    "Five agents on one local model. Architect plans, developer writes, bugfixer runs the code, researcher reads the workspace, websearcher hits the docs. They pass a shared scratch directory back and forth.",
    "The point is not the agents. The point is that they run on a 7B Qwen, locally, with no API key and no cloud. The agents do not invent the architecture or pick the stack. They execute. The human still decides.",
  ],
  href: "https://github.com/srivtx/nnn",
};

// Supporting work — laid out as 2x2 blocks of cards.
// The 3 featured (lockr, tdc-matchmaker-2, snip) appear at the top
// of the first 2x2 block as a unit. The other 9 projects follow in
// 2x2 blocks below.
//
// Each card has a `todo` — an honest margin scrawl about what's still
// unfinished on the project. Real notebook voice.
export const supporting = [
  {
    name: "lockr",
    kicker: "shipped · live",
    one: "Escrow for Indian freelancers, fiat in, USDC out.",
    body:
      "Client pays by card or UPI. Dodo converts to USDC. Funds lock in a Solana PDA. The freelancer gets paid in about three seconds after the client approves a milestone. The 14-day Upwork hold dies here.",
    href: "https://lockr.srivtx.tech",
    featured: true,
    todo: "mainnet is research-grade. devnet only.",
  },
  {
    name: "tdc-matchmaker-2",
    kicker: "the redesign · shipped",
    one: "A matchmaker's CRM redesigned as a private-banking brief.",
    body:
      "Three-column compare canvas, AI-drafted composer where the AI's job is bounded to one sentence, a 10-dimension weighted matching engine. The matching logic is reused from v1; the design system, layout, and most components are new.",
    href: "https://tdc-matchmaker-2.vercel.app",
    featured: true,
    todo: "the AI composer is bounded to one sentence. the user has to write the rest.",
  },
  {
    name: "snip",
    kicker: "npm · bun · live",
    one: "Generate code snippets and social cards from the terminal.",
    body:
      "Bun-fast, runs locally, no API calls. Publishes as @srivtx/snip.",
    href: "https://github.com/srivtx/snip",
    featured: true,
    todo: "no SVG export yet. PNG only.",
  },
  {
    name: "img-to-3d",
    kicker: "current obsession",
    one: "A photo in, a 3D model out.",
    body:
      "FastAPI server runs InstantMesh to give you a coarse preview in 30 seconds, then refines the mesh in the background while you keep working.",
    sketch: "img-to-3d" as const,
    href: "https://github.com/srivtx/img-to-3d",
    todo: "the subdivision step is still a black box. hand-tuned thresholds.",
  },
  {
    name: "lsp-server",
    kicker: "rust + language tooling",
    one: "Lexer, parser, AST, analyzer, symbols, interpreter — each in its own Rust file.",
    body:
      "Built to learn how a language tool works end to end, not to ship an LSP. Same thesis as the Zed Zettelkasten work — language tooling is something I keep coming back to, sometimes from the editor side, sometimes from the parser side.",
    sketch: "lsp-server" as const,
    href: "https://github.com/srivtx/lsp-server",
    todo: "no real LSP yet. just a pipeline that runs locally.",
  },
  {
    name: "mycelium",
    kicker: "zig + solana",
    one: "A substrate for writing Solana programs in Zig.",
    body:
      "A comptime layer that knows the SBPFv3 ABI and stays out of the way at runtime. A full PDA vault — state, three instructions, every edge case — fits in under a hundred lines of Zig.",
    href: "https://github.com/srivtx/mycelium",
    todo: "v0.1.0. mainnet is research-grade, not audited.",
  },
  {
    name: "shader-labs",
    kicker: "webgl",
    one: "Drop-in WebGL shaders with a ⌘K palette.",
    body:
      "Six-plus shaders, single-file export, no build step. Designed to be copy-pasted into other people's projects, not adopted as a framework.",
    href: "https://github.com/srivtx/shader-labs",
    todo: "no audio-reactive shaders yet. and the export is single-file only.",
  },
  {
    name: "tomato-css",
    kicker: "npm · vite",
    one: "Write CSS like you think, get a stylesheet.",
    body:
      "A preprocessor that reads more like prose than utilities. `body: pad 4, bg cream` is the whole idea. Ships with a Vite plugin as @srivtx/tomato-css.",
    href: "https://github.com/srivtx/tomato-css",
    todo: "the @apply pattern still has rough edges. nesting is a work in progress.",
  },
  {
    name: "serve-md",
    kicker: "rust · cli",
    one: "`cd` into a folder, type one command, get a docs site.",
    body:
      "Faster docsify alternative. No mkdocs.yml, no config files. ~2MB Rust binary.",
    href: "https://github.com/srivtx/serve-md",
    todo: "no live-reload. you have to restart the binary.",
  },
  {
    name: "neuro-2e",
    kicker: "wip",
    one: "A planner for the kind of thinker who runs six threads at once.",
    body:
      "Holds state across contexts, surfaces the thread you lost, gets out of the way. Not a chatbot, not a productivity app.",
    href: "https://github.com/srivtx/neuro-2e",
    todo: "still on the persistence layer. nothing survives a restart.",
  },
];

// The other 14 are linked out to GitHub, not displayed.
export const moreOnGithub = "https://github.com/srivtx";

export const upstream = [
  {
    name: "Zed",
    what: "Zettelkasten language server",
    detail:
      "Built and merged a Zettelkasten language server into Zed. First-class LSP for plain-text note-taking in a modern editor.",
    state: "merged",
    pr: "#4337",
    url: "https://github.com/zed-industries/zed/pull/4337",
  },
  {
    name: "wevm/vim",
    what: "user-op hash fix",
    detail:
      "Patched the user-operation hash flow in wevm's Vim plugin. The kind of fix that only happens if you actually use the tool daily.",
    state: "co-authored",
    pr: "—",
    url: "https://github.com/wevm/vim",
  },
  {
    name: "wevm/vocs",
    what: "vite + tailwind hmr for mdx",
    detail:
      "Made Vocs hot-reload Tailwind classes inside MDX. Opened the issue, shipped the fix.",
    state: "merged",
    pr: "#365",
    url: "https://github.com/wevm/vocs/pull/365",
  },
];

// Practice — one handwritten line, not a tech-stack dump.
export const practiceLine =
  "Mostly TypeScript, Python, Rust. Zig and Go when the system asks for it.";

export const job = {
  role: "Backend Engineer",
  where: "GoQuant",
  period: "Oct 2025 — Jan 2026",
  detail:
    "trading + market-data services. order execution, exchange integrations, real-time flows. production debugging, architecture work.",
};

export const school = {
  where: "Siksha 'O' Anusandhan University",
  period: "2023 — 2027",
  detail: "b.tech, computer science & engineering.",
};
