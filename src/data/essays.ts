export interface Essay {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
}

export const essays: Essay[] = [
  {
    id: "building-in-public",
    title: "Why I Build in Public",
    excerpt: "Transparency isn't just a buzzword — it's the fastest feedback loop you'll ever find.",
    date: "Mar 2026",
    readTime: "5 min",
    content: `There's something terrifying about sharing your work before it's ready. Every instinct screams to wait, to polish, to perfect. But I've learned that the messy middle is where the magic happens.\n\nWhen I started sharing my process openly — the failures, the pivots, the 2am breakthroughs — something unexpected happened. People didn't judge. They helped. They offered perspectives I'd never considered, connections I couldn't have made alone.\n\nBuilding in public isn't about performance. It's about creating a surface area for serendipity. The more you share, the more the universe can conspire in your favor.\n\nThe fear never fully goes away. But now I see it as a compass — if something feels scary to share, it's probably worth sharing.`,
  },
  {
    id: "against-hustle-culture",
    title: "Against Hustle Culture (From a Workaholic)",
    excerpt: "I worked 80-hour weeks for three years. Here's what I learned about sustainable building.",
    date: "Feb 2026",
    readTime: "7 min",
    content: `I used to wear my exhaustion like a badge of honor. "I'll sleep when I'm dead" was my actual mantra. Looking back, I wasn't building — I was performing.\n\nThe turning point came when I shipped a feature at 3am that I had to completely rewrite the next morning. The math was clear: my best two hours of focused work produced more than eight hours of zombie coding.\n\nSustainable pace isn't about working less. It's about respecting the biological reality of creativity. Your brain needs downtime to make connections, to wander, to stumble onto solutions you'd never find through brute force.\n\nNow I protect my mornings like sacred ground. I take walks without podcasts. I let myself be bored. And paradoxically, I ship more than I ever did during my hustle era.`,
  },
  {
    id: "taste-in-product",
    title: "Taste Is the Most Underrated Skill in Product",
    excerpt: "You can teach someone to code. You can't easily teach them to care about the details.",
    date: "Jan 2026",
    readTime: "4 min",
    content: `Everyone talks about product-market fit. Nobody talks about product-taste fit — the alignment between what you build and the invisible standard of quality you hold in your head.\n\nTaste isn't about making things pretty. It's about knowing when something feels wrong, even if you can't articulate why. It's the difference between a product that works and a product that feels alive.\n\nI've seen technically brilliant products fail because they had no soul. And I've seen simple tools succeed because every interaction felt considered, intentional, human.\n\nYou develop taste by being a voracious consumer of great work — not just in your industry, but everywhere. Architecture, typography, cooking, music. Taste is pattern recognition across domains.`,
  },
];
