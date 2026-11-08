// Writing — essays that live here, in the owner's own words.
// Text is reproduced faithfully from the original; only obvious typos are
// fixed (see the commit that added each post). ==like this== marks a phrase
// the author highlighted in the original.

export type Block =
  | { kind: "p"; text: string }
  | { kind: "figure"; id: FigureId };

export type FigureId = "reduction" | "two-directions" | "gap" | "lateral";

export type Essay = {
  slug: string;
  title: string;
  date: string; // ISO day
  dek: string;
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
    original: "https://app.notion.com/p/the-state-of-reduction-412095ce6be88064aaa5f5da65b0b9b3",
    signature: "sribatsha dash ….",
    blocks: [
      { kind: "p", text: "there are many state of reduction we face and accept in real sense of life. such as we accept that we reduce many forms of information to categorize things such as we accept the reduction of forms and attribute in many things to only care about what we need to do right we only need certain parameters that we measure and based on it we count things as they are how weird is that to accept that all students of college are equal and all have different capabilities but we choose the metric only we care about that we decide based on certain predefined conditions that we are good at measuring and not caring about the other side of the equation that other people face. this is just pure sheer ignorance to be called. With the emergence of ai particularly frontier models most of the sheer pattern matching and boring tasks which requires just very very more of the steps with no internal meaning all together ai has reduced that value of localized pattern matching to ==theoretical minimum==" },
      { kind: "figure", id: "reduction" },
      { kind: "p", text: "that forced me to question about intelligence itself. what do we mean by it. how can we measure it. Vaguely people thought that knowing or matching patterns means someone is intelligent, or has high intelligence and some people call there are certain type of pattern recognition such as emotional, text i.e concept or abstract ideology, or visual pattern recognition and more. We can list many. But there is one more question that we can ask that is why intelligence what is for intelligence about. Yeah we know to navigate life right. Means what become a high leverage person who can do things with a high probable chances of win and society will treat them good with money and status that’s its for (vaguely) right. Or we can steer in one more direction that’s curiosity right." },
      { kind: "p", text: "see how i am writing this while writing i am thinking. In the emergence of ai where they can do things i mean certain boring things that take time for humans but they can do the boring things easily right. So what’ll be left for humans that is the question that i care for. what is left for humans. What i believe’ll happen with the emergence of ai. Humans will care about less about what they can do but more things now they can focus on what they cannot do. Which is a good thing in general that means there’ll be a new era of research and development. Providing that companies does hire the right people and don’t fire them just because the cheap ai can do it 5 times faster. It depends upon the people who are steering this wheels. Otherwise what we’ll see is a may be they can do their task now cheaply and easily. there are two directions we can go on from here." },
      { kind: "figure", id: "two-directions" },
      { kind: "p", text: "The first direction is companies will hire only the agent management engineers where we’ll see a loss of jobs on a large scale because of course if we maximize on the outcome on the data that is already available it’s more than enough to model all of the repetitive tasks so there will be very and very less tasks available for the normal people, so what will happen is their incomes will deplete and they’ll reduce the spending and then eventually it’ll be not good for the economy. And then they’ll pay each other more and more and these corporations’ll become so big that they’ll control most of the things and money right. And no one knows what happens then, because that’s scary." },
      { kind: "p", text: "The second direction is companies will hire more for the investment in new scientific things or theories and experiments where people’ll create new improvement or breakthrough to it, thus making new inventions possible and further accelerating more products and more economic activity right. But for that to happen people need a new type of change. The current corporate and the education system doesn’t reward the people who’ll be finding these new things they are too rigid. the whole system forces on steps and methods more than questioning the steps and methods right. Why certain method exist why the method even created, what we are trying to achieve. The goal is the necessary thing and that’s imagination. The new era that we are going towards most people doesn’t understand this is the era of experimentation, doing things differently, observing and ideating, provided the whole world goes in the second direction." },
      { kind: "p", text: "The nature of the direction the world’ll take will be influenced by politics, geopolitics, big large corporations, and organizations which are rigid and doesn’t want to change more. The change is inevitable how the direction’ll go depends upon the people handling the biggest change in the technology itself." },
      { kind: "p", text: "Nothing in the life time, has forced humans to ask this question too hard about their own usefulness. It’s hard to be useful for most of the average humans anyway but with the advent of most of the things will be enhanced. So the gap of capability will reduce between people to people for common repetitive tasks and here they can apply the same the state of reduction to all the humans." },
      { kind: "figure", id: "gap" },
      { kind: "p", text: "But there is not much data on how it’ll change the course human cognition, because more of this people adopt ai, the more they’ll use it morph their skills of a top tier of some subject. But there is a small thing i can notice this’ll allow people who have more lateral thinking and divergent thinking to be more productive as before. They can connect more ideas and simulations now and spot patterns which they are good at. They’ll be one of the kind who are most useful. But what about the non divergent thinkers what they’ll do. Most probable guess is with the advent of ai neurotypicals will work in a state of harmony and more coordination fields if they don’t adapt otherwise." },
      { kind: "figure", id: "lateral" },
      { kind: "p", text: "One more thing is about software, it’s not about the programming language or pure core software any more. People who have the most compute they will most probably do the most experiments and then they will keep the results to themselves and don’t publish the results. That’s their new moat. Most software companies will become hardware companies and then they’ll become hardware to elevate that software not vice versa. And most research labs will produce their own science if they invest big and this will be their moat. So for the people who are navigating this field right now is a mess of many things happening all at once right." },
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
