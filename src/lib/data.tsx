// Content model — Bharath-style multi-page portfolio: home + /projects +
// /blogs + /inventions. Products carry REAL captured media (poster webp +
// hover mp4 recorded from the live sites). Copy stays short; links go to
// the real things.

export const profile = {
  name: "Sribatsha Dash",
  first: "Sribatsha",
  handle: "srivtx",
  bannerQuote: "ship what you wish existed.",
  tagline: ["btech '27", "goquant engineer", "freelance / ai engineer"],
  email: "crypticcc101@gmail.com",
  location: "Bhubaneswar, India",
};

export const socials = [
  { name: "GitHub", href: "https://github.com/srivtx", icon: "github" },
  { name: "X", href: "https://x.com/srivtx", icon: "x" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/srivtx/", icon: "linkedin" },
  { name: "Email", href: "mailto:crypticcc101@gmail.com", icon: "mail" },
] as const;

// LinkedIn-faithful timeline. Logos live in /public/logos.
export const experience = [
  {
    role: "Builder",
    org: "Turbin3",
    period: "Apr 2026 - Aug 2026 · 5 mos",
    logo: "/logos/turbin3.webp",
    points: [
      "Selected into the Turbin3 builder cohort — shipped Rust + Solana programs end-to-end.",
      "Built mycelium-grade tooling: comptime-checked programs, visibility over convenience.",
      "Went from zero to deploying audited on-chain code inside one cohort cycle.",
    ],
  },
  {
    role: "AI Engineer",
    org: "Upwork",
    period: "Feb 2026 - Aug 2026 · 7 mos · Part-time",
    logo: "/logos/upwork.webp",
    points: [
      "Freelance AI engineering for overseas clients — agents, pipelines, shipping product.",
      "Scoped, built and delivered projects solo: contract to deploy, no hand-holding.",
      "5-star repeat-client work across LLM apps and automation jobs.",
    ],
  },
  {
    role: "Student",
    org: "100xDevs",
    period: "Jan 2026 - Jul 2026 · 7 mos · Part-time",
    logo: "/logos/100xdevs.webp",
    points: [
      "Harkirat's cohort — fullstack + system design, the hard parts, not the tutorials.",
      "MLOps, distributed systems, and the discipline of finishing what you start.",
    ],
  },
  {
    role: "Backend Engineer",
    org: "GoQuant",
    period: "Oct 2025 - Jan 2026 · 4 mos",
    logo: "/logos/goquant.webp",
    points: [
      "Trading and market-data services: order execution, exchange integrations.",
      "Low-latency paths where a millisecond is a rounding error you still bill for.",
    ],
  },
];

// The three live products — with REAL captured media.
// poster: actual screenshot · video: screen-recorded scroll of the live app.
export type Product = {
  name: string;
  one: string;
  note: string;
  href: string;
  chips: string[];
  poster: string;
  video: string;
};

export const products: Product[] = [
  {
    name: "Deriva",
    one: "A super-app for learning algorithms — apps inside apps: derive, observe, pattern-match.",
    note: "one shell, many engines — the everything-app of algorithmics",
    href: "https://deriva.srivtx.xyz",
    chips: ["Next.js", "TypeScript", "Pyodide", "PWA"],
    poster: "/images/deriva.webp",
    video: "/videos/deriva.mp4",
  },
  {
    name: "DeepForge",
    one: "Forge ML skills from scratch. 5,730+ problems, real Python in the browser, no account, MIT.",
    note: "offline-first sync, verified corpus, zero signups",
    href: "https://deepforge.srivtx.xyz",
    chips: ["Next.js", "Python", "Supabase", "Offline-first"],
    poster: "/images/deepforge.webp",
    video: "/videos/deepforge.mp4",
  },
  {
    name: "Customs",
    one: "Checkout for AI agents — signed mandates, hash-chained ledger, live Razorpay rails.",
    note: "both sides of the agentic counter, on real payment rails",
    href: "https://customs.srivtx.xyz",
    chips: ["TypeScript", "Ed25519", "Razorpay", "Buildathon"],
    poster: "/images/customs.webp",
    video: "/videos/customs.mp4",
  },
];

// Open-source builds on the bench. Each carries a generated brand
// mark (public/logos/builds) so every row reads like a real tool.
export type Build = {
  name: string;
  one: string;
  href: string;
  chips: string[];
  logo: string; // brand mark, /logos/builds/*.webp
};

export const builds: Build[] = [
  {
    name: "nnn",
    one: "a team of agents on one laptop. local 7b, no api keys, no cloud.",
    href: "https://github.com/srivtx/nnn",
    chips: ["Rust", "llama.cpp", "MCP"],
    logo: "/logos/builds/nnn.webp",
  },
  {
    name: "sortie",
    one: "semantic debugger — reads a failed solana tx and says 'slippage exceeded', not 0x1771.",
    href: "https://github.com/srivtx/sortie",
    chips: ["TypeScript", "Solana", "MCP"],
    logo: "/logos/builds/sortie.webp",
  },
  {
    name: "mycelium",
    one: "solana programs in zig. comptime over runtime, visibility over convenience.",
    href: "https://github.com/srivtx/mycelium",
    chips: ["Zig", "Solana", "LLVM"],
    logo: "/logos/builds/mycelium.webp",
  },
  {
    name: "shader-labs",
    one: "modular shader library with a ⌘k palette. copy, paste, done.",
    href: "https://github.com/srivtx/shader-labs",
    chips: ["WebGL", "TypeScript"],
    logo: "/logos/builds/shader-labs.webp",
  },
  {
    name: "bionic-docs",
    one: "bionic reading for pdf + epub. no upload, no account, no remote code.",
    href: "https://github.com/srivtx/bionic-docs",
    chips: ["Extension", "On-device"],
    logo: "/logos/builds/bionic-docs.webp",
  },
  {
    name: "keepsake",
    one: "encrypted, portable ai memory. browser app, cli, and an mcp server.",
    href: "https://github.com/srivtx/keepsake",
    chips: ["Local-first", "Ed25519", "MCP"],
    logo: "/logos/builds/keepsake.webp",
  },
];

export const stack = [
  { icon: "typescript", label: "TypeScript" },
  { icon: "rust", label: "Rust" },
  { icon: "python", label: "Python" },
  { icon: "zig", label: "Zig" },
  { icon: "nextdotjs", label: "Next.js" },
  { icon: "react", label: "React" },
  { icon: "tailwindcss", label: "Tailwind" },
  { icon: "nodedotjs", label: "Node" },
  { icon: "postgresql", label: "Postgres" },
  { icon: "supabase", label: "Supabase" },
  { icon: "docker", label: "Docker" },
  { icon: "solana", label: "Solana" },
  { icon: "git", label: "Git" },
];

// Technical writing — DeepForge engineering notes + long-form X article.
export const posts = [
  {
    title: "I Built an AI Edge Node on a Nothing CMF Phone 1",
    meta: "article",
    when: "X",
    tags: ["edge", "android", "llm"],
    href: "https://x.com/srivtx/status/2032891308872958289",
  },
  {
    title: "Building a 150-trait avatar engine",
    meta: "9 min read",
    when: "Sep 13, 2026",
    tags: ["avatars", "svg", "service-worker"],
    href: "https://deepforge.srivtx.xyz/blog/building-a-150-trait-avatar-engine",
  },
  {
    title: "From one long page to 24 routes",
    meta: "10 min read",
    when: "Sep 13, 2026",
    tags: ["next.js", "performance", "design-system"],
    href: "https://deepforge.srivtx.xyz/blog/from-one-long-page-to-24-routes",
  },
  {
    title: "Offline-first sync with Supabase",
    meta: "11 min read",
    when: "Sep 6, 2026",
    tags: ["sync", "supabase", "offline-first"],
    href: "https://deepforge.srivtx.xyz/blog/offline-first-sync-with-supabase",
  },
  {
    title: "Verifying 5,050 problems with real Python",
    meta: "9 min read",
    when: "Aug 29, 2026",
    tags: ["verification", "python", "testing"],
    href: "https://deepforge.srivtx.xyz/blog/verifying-5050-problems-with-real-python",
  },
];

// Research papers — DeepForge publications. Briefs open on /inventions,
// full papers live on the DeepForge site.
export const papers = [
  {
    title: "REPROGPU",
    sub: "Cross-adapter bit-reproducible WebGPU kernels and a conformance harness",
    brief:
      "GPU results are not reproducible across vendors — the WGSL spec leaves rounding, reassociation and fusion unspecified. REPROGPU pins byte-identical SHA-256 outputs for a declared integer/fixed-point kernel subset via a 320-bit superaccumulator, Philox4x32-10 and integer SHA-256, with a cross-adapter conformance harness as the witness.",
    when: "2026-09-19",
    href: "https://deepforge.srivtx.xyz/inventions/reprogpu",
    pdf: "https://deepforge.srivtx.xyz/inventions/reprogpu/paper.pdf",
  },
  {
    title: "Refutation-Ledger Values",
    sub: "Auditable warrant accounting for contestable derived claims",
    brief:
      "Derived content — hints, explanations, difficulty labels — is consumed with positive evidence only: a passing check says nothing about what it would take to overturn it. This paper attaches auditable warrants to derived claims, so contestation has a ledger to answer to instead of a boolean.",
    when: "2026-09-18",
    href: "https://deepforge.srivtx.xyz/inventions/refutation-ledgers",
    pdf: "https://deepforge.srivtx.xyz/inventions/refutation-ledgers/paper.pdf",
  },
  {
    title: "KeyFuse",
    sub: "Falsification-first cache-key auditing with minimal collision witnesses",
    brief:
      "A build cache key describes the inputs a project declared, not the inputs the build actually read. KeyFuse detects undeclared reads — env vars, working-directory drift — with minimal collision witnesses and applies conservative key repair, turning cache trust into a falsifiable claim.",
    when: "2026-09-18",
    href: "https://deepforge.srivtx.xyz/inventions/keyfuse",
    pdf: "https://deepforge.srivtx.xyz/inventions/keyfuse/paper.pdf",
  },
  {
    title: "Behavioral Delta Ledger",
    sub: "Per-edit no-op detection on a hidden basis derived from an exercise's own tests",
    brief:
      "A learner's repeated Run on an auto-graded exercise usually leaves one bit — pass or fail — and no memory of the previous program. We define a per-edit behavioral signature: deterministic detection of which edits actually changed behavior, on a hidden basis derived from the exercise's own tests.",
    when: "2026-09-18",
    href: "https://deepforge.srivtx.xyz/inventions/behavioral-delta-ledger",
    pdf: "https://deepforge.srivtx.xyz/inventions/behavioral-delta-ledger/paper.pdf",
  },
  {
    title: "Alibi Distance",
    sub: "Measuring and closing the silent-failure aperture of a verified corpus",
    brief:
      "Auto-graded exercises ship a reference program and a handful of tests — a program can pass every shipped test and still be wrong. We define the alibi distance as the minimum number of hidden tests a wrong-but-passing program can be distinguished by, then close that aperture corpus-wide.",
    when: "2026-09-18",
    href: "https://deepforge.srivtx.xyz/inventions/alibi-distance",
    pdf: "https://deepforge.srivtx.xyz/inventions/alibi-distance/paper.pdf",
  },
  {
    title: "Ladder-Graded Spacing",
    sub: "Execution-aware scheduling for code practice",
    brief:
      "Spaced-repetition schedulers for coding practice see more than a pass or a fail: DeepForge observes how many test runs failed before the pass, which hint tier was revealed, and when the solve happened. Ladder-graded spacing turns those execution signals into a scheduling ladder that respects real difficulty.",
    when: "2026-09-18",
    href: "https://deepforge.srivtx.xyz/inventions/ladder-graded-spacing",
    pdf: "https://deepforge.srivtx.xyz/inventions/ladder-graded-spacing/paper.pdf",
  },
];

export const upstream = [
  {
    name: "Zed",
    what: "zettelkasten language server",
    state: "merged",
    pr: "#4337",
    url: "https://github.com/zed-industries/zed/pull/4337",
  },
  {
    name: "wevm/vocs",
    what: "tailwind hmr for mdx",
    state: "merged",
    pr: "#365",
    url: "https://github.com/wevm/vocs/pull/365",
  },
  {
    name: "wevm/vim",
    what: "user-op hash fix",
    state: "co-authored",
    pr: "—",
    url: "https://github.com/wevm/vim",
  },
];

export const moreOnGithub = "https://github.com/srivtx";
export const blogIndex = "https://deepforge.srivtx.xyz/blog";
export const papersIndex = "https://deepforge.srivtx.xyz/inventions";

// "Last played" — the one-track Spotify card, now on the official
// Spotify embed: signed-in listeners get the FULL song (the 30s ceiling
// is Spotify's policy for anonymous visitors, not a limitation we can
// engineer around), and the art streams clean from Spotify's own CDN.
export const lastPlayed = {
  label: "Last played",
  song: "cold/mess",
  artist: "Prateek Kuhad",
  trackUrl: "https://open.spotify.com/track/2AoWWiMelowkStJoqPMDed",
};

// "Now watching" — the other half of the status strip: what's on the
// screen this week, next to what was on the speakers.
export const nowWatching = {
  label: "now watching",
  show: "Rick and Morty",
  detail: "season 2",
  href: "https://www.imdb.com/title/tt2861424/",
};
