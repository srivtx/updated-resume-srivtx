// Writing — essays that live here, in the owner's own words.
// Copyedited at the owner's request (spelling, grammar, punctuation,
// paragraph breaks); voice, ideas and order are theirs. ==like this== marks
// a phrase the author highlighted in the original.

export type Block =
  | { kind: "p"; text: string }
  | { kind: "figure"; id: FigureId };

export type FigureId = "reduction" | "two-directions" | "gap" | "lateral";

export type Essay = {
  slug: string;
  title: string;
  date: string; // ISO day
  dek: string;
  // one plain word for what it is about (thinking, frontier, civilisation…)
  topic: string;
  original?: string;
  signature?: string;
  blocks: Block[];
};

export const essays: Essay[] = [
  {
    slug: "the-state-of-reduction",
    title: "the state of reduction",
    date: "2026-11-09",
    dek: "what we lose when we keep only what we can measure, and what is left for humans once ai does the pattern matching.",
    topic: "thinking",
    original: "https://app.notion.com/p/the-state-of-reduction-412095ce6be88064aaa5f5da65b0b9b3",
    signature: "sribatsha dash …",
    blocks: [
      { kind: "p", text: "There are many states of reduction we face and accept in real life. We reduce many forms of information to categorize things. We accept the reduction of forms and attributes in many things, so that we only care about what we need to do. We only need certain parameters that we measure, and based on them we count things as they are. How weird is it to accept that all students in a college are equal, when they all have different capabilities? But we choose only the metric we care about. We decide based on certain predefined conditions that we are good at measuring, and we don’t care about the other side of the equation that other people face. This can only be called sheer ignorance." },
      { kind: "figure", id: "reduction" },
      { kind: "p", text: "With the emergence of AI, particularly frontier models, most of the sheer pattern matching and boring tasks just require many, many steps with no internal meaning altogether, and AI has reduced the value of that localized pattern matching to a ==theoretical minimum==." },
      { kind: "p", text: "That forced me to question intelligence itself. What do we mean by it? How can we measure it? Vaguely, people thought that knowing or matching patterns means someone is intelligent, or has high intelligence. Some people say there are certain types of pattern recognition, such as emotional, textual (concepts or abstract ideas), or visual pattern recognition, and more. We can list many." },
      { kind: "p", text: "But there is one more question we can ask: why intelligence? What is intelligence for? Yeah, we know: to navigate life, right? Meaning, to become a high-leverage person who can do things with a high probability of winning, whom society will treat well with money and status. That’s what it’s for (vaguely), right? Or we can steer in one more direction: curiosity, right?" },
      { kind: "p", text: "See how I am writing this: while writing, I am thinking. With the emergence of AI, they can do things — I mean certain boring things that take time for humans — easily, right? So what will be left for humans? That is the question I care about. What is left for humans?" },
      { kind: "p", text: "Here is what I believe will happen with the emergence of AI. Humans will care less about what they can do; now they can focus more on what they cannot do. Which is a good thing in general: it means there will be a new era of research and development. Provided that companies do hire the right people, and don’t fire them just because cheap AI can do it five times faster. It depends on the people who are steering this wheel. Otherwise, what we’ll see is that maybe they can now do their tasks cheaply and easily." },
      { kind: "p", text: "There are two directions we can go in from here." },
      { kind: "figure", id: "two-directions" },
      { kind: "p", text: "The first direction is that companies will hire only agent-management engineers, and we’ll see a loss of jobs on a large scale. Because, of course, if we maximize the outcome from the data that is already available, it’s more than enough to model all of the repetitive tasks. So there will be far fewer tasks available for normal people. What will happen is that their incomes will deplete, they’ll reduce their spending, and eventually it won’t be good for the economy. And then they’ll pay each other more and more, and these corporations will become so big that they’ll control most things, and most of the money, right? And no one knows what happens then, which is scary." },
      { kind: "p", text: "The second direction is that companies will hire more, to invest in new scientific things, theories and experiments, where people will create new improvements and breakthroughs, making new inventions possible and further accelerating products and economic activity, right?" },
      { kind: "p", text: "But for that to happen, people need a new type of change. The current corporate and education systems don’t reward the people who will be finding these new things; they are too rigid. The whole system focuses on steps and methods more than on questioning the steps and methods. Why does a certain method exist? Why was the method even created? What are we trying to achieve? The goal is the necessary thing, and that’s imagination. Most people don’t understand the new era we are going towards: it is the era of experimentation, of doing things differently, observing and ideating — provided the whole world goes in the second direction." },
      { kind: "p", text: "The direction the world will take will be influenced by politics, geopolitics, big corporations, and organizations that are rigid and don’t want to change any more. The change is inevitable; which way it goes depends on the people handling the biggest change in the technology itself." },
      { kind: "p", text: "Nothing in our lifetime has forced humans to ask so hard about their own usefulness. It’s hard to be useful for most average humans anyway, but with the advent of AI, most things will be enhanced. So the gap in capability between people will shrink for common, repetitive tasks, and here they can apply the same state of reduction to all humans." },
      { kind: "figure", id: "gap" },
      { kind: "p", text: "But there is not much data on how it will change the course of human cognition, because the more people adopt AI, the more they’ll use it to morph their skills into the top tier of some subject. But there is one small thing I can notice: this will allow people with more lateral and divergent thinking to be more productive than before. They can now connect more ideas and simulations, and spot patterns, which they are good at. They’ll be the kind of people who are most useful." },
      { kind: "figure", id: "lateral" },
      { kind: "p", text: "But what about the non-divergent thinkers? What will they do? My most probable guess is that with the advent of AI, neurotypicals will work in a state of harmony, in more coordination-based fields, if they don’t adapt otherwise." },
      { kind: "p", text: "One more thing is about software: it’s not about the programming language or pure core software any more. The people who have the most compute will most probably do the most experiments, and then they will keep the results to themselves and not publish them. That’s their new moat. Most software companies will become hardware companies; they’ll build hardware to elevate their software, not vice versa. And most research labs will produce their own science if they invest big, and this will be their moat. So for the people navigating this field right now, it is a mess of many things happening all at once." },
    ],
  },
];

export function wordCount(e: Essay) {
  return e.blocks.reduce(
    (n, b) => (b.kind === "p" ? n + b.text.replace(/==/g, "").split(/\s+/).filter(Boolean).length : n),
    0,
  );
}

export function readingTime(e: Essay) {
  return `${Math.max(1, Math.round(wordCount(e) / 200))} min read`;
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}

export function getEssay(slug: string) {
  return essays.find((e) => e.slug === slug);
}
