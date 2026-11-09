```
 ░█░█░█░
 ███░███        srivtx.xyz
 ██░░░██        the home of Sribatsha Dash
 ░██░██░
 █░░█░░█        understand systems in detail,
 ██░█░██        build things with what you learn,
 ░█████░        write about the frontier.
```

# srivtx.xyz

A personal site that behaves like a small instrument. Every product has a
drawn cover whose pixel mark does what the product does. Essays get their
own figures, drawn in code. And the light switch is a tulip.

**[www.srivtx.xyz](https://www.srivtx.xyz)**

## What lives here

| page | what |
| --- | --- |
| `/` | the index: who, writing, work, experience, and what's on lately |
| `/projects` | **Work**: Tulip Labs, Morphotype, Bionic Page, Deriva, DeepForge, Customs |
| `/writing` | **Writing**: essays, with figures that answer the reader |
| `/blogs` | **Notes**: engineering notes from building the products |
| `/inventions` | **Papers**: research from the DeepForge lab, in brief |

Also: an RSS feed at `/writing/rss.xml`, drawn share cards, and a sitemap.

## The tulip

The button in the corner is the Tulip Labs pixel tulip. It closes at night
and opens by day, as real tulips do.

Pressing it doesn't flip a class. It turns the page over, cell by 8px cell,
through the View Transitions API. The order follows a loop: two rounds of
**garden**, then one each of **year**, **read** and **sky**. After that the
same mix comes back in a shuffled order. A round is a night and the morning
after.

- **garden**: pixel tulips sprout in petal colours and grow until they cover the page
- **year**: the real GitHub year paints the page in contribution greens, busiest day first
- **read**: a sky-blue highlighter reads the words on screen, line by line
- **sky**: twilight, stars, a shooting star; by morning, a pixel sun

Every frame of the mask is drawn ahead of time as a single reel, so nothing
flickers. If someone prefers reduced motion, the theme simply switches.
Add `?variants` to any page to pin one effect.

## Run it

```bash
npm install
npm run dev        # http://localhost:3200
```

Next 14 (app router) · Tailwind · Instrument Serif, Newsreader, Space Grotesk, JetBrains Mono.

## Where things are

```
src/components/themeReveal.ts   the tulip's reveals (one function per effect)
src/components/Covers.tsx       the product covers and their 7×7 marks
src/components/essay/           essay figures
src/lib/writing.ts              the essays
src/lib/data.tsx                products, experience, notes, papers
```

---

<sub>ship what you wish existed.</sub>
