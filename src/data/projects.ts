export type ProjectStatus = "Active" | "Shipped" | "Exploring";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  color: string;
  link: string;
}

export const projects: Project[] = [
  {
    id: "finflow",
    title: "FinFlow",
    tagline: "Rethinking personal finance for Gen Z",
    description: "A mobile-first app that makes budgeting feel like a game, not a chore. Built with behavioral psychology principles to help young people build lasting financial habits.",
    status: "Active",
    color: "hsl(var(--primary))",
    link: "#",
  },
  {
    id: "commons",
    title: "Commons",
    tagline: "Community spaces, reimagined",
    description: "A platform connecting neighborhoods through shared spaces and resources. Think Airbnb meets your local community center.",
    status: "Shipped",
    color: "hsl(var(--secondary))",
    link: "#",
  },
  {
    id: "murmur",
    title: "Murmur",
    tagline: "AI-powered journaling companion",
    description: "An intelligent journaling app that listens, learns, and gently nudges you toward self-awareness. Privacy-first, always.",
    status: "Exploring",
    color: "hsl(var(--accent))",
    link: "#",
  },
  {
    id: "wavelength",
    title: "Wavelength",
    tagline: "Async voice for distributed teams",
    description: "Drop-in voice memos for your team. No meetings, no Slack walls of text. Just human voices, organized beautifully.",
    status: "Active",
    color: "hsl(var(--primary))",
    link: "#",
  },
];
