import givemapScreenshot from "@/assets/givemap-screenshot.png";
import curiloScreenshot from "@/assets/curilo-screenshot.png";
import leeEducationScreenshot from "@/assets/lee-education-screenshot.png";
import pyreelScreenshot from "@/assets/pyreel-screenshot.png";
import grandpaSiteScreenshot from "@/assets/grandpa-site-screenshot.png";

export type ProjectStatus = "Active" | "Shipped" | "Exploring";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  color: string;
  link: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "pyreel",
    title: "Pyreel",
    tagline: "Agentic marketing orchestration",
    description: "A dual-platform agentic orchestration layer for marketing. Built using FastAPI and Celery, it automates end-to-end campaign execution from research to video asset generation.",
    status: "Active",
    color: "hsl(var(--primary))",
    link: "https://pyreel.com",
    image: pyreelScreenshot,
  },
  {
    id: "curilo",
    title: "Curilo",
    tagline: "Instant feedback loops for English writing",
    description: "An automated English writing platform that solves the \"feedback lag\" in traditional tutoring. Built to productize a tutoring business, using LLMs to create instant feedback loops and dynamic lesson plans based on student-specific skill gaps.",
    status: "Active",
    color: "hsl(var(--primary))",
    link: "https://curilo.ai",
    image: curiloScreenshot,
  },
  {
    id: "lee-education",
    title: "Lee Education",
    tagline: "Tutoring business scaled to four locations",
    description: "Built a tutoring business from a living room as a college freshman to support family, scaling to 6-figure revenue and four brick-and-mortar locations within three years. Now passed on to a younger brother to carry forward.",
    status: "Shipped",
    color: "hsl(var(--secondary))",
    link: "https://lee.education",
    image: leeEducationScreenshot,
  },
  {
    id: "grandpa-site",
    title: "Grandpa site",
    tagline: "A little site I made for my grandpa",
    description: "An accessible web portal built for my grandfather, an 80-year-old Mandarin/Hokkien speaker in Singapore. Combines news with text-to-speech, a TV interface with curated channels, games, and weather — designed to prioritize simplicity over technical complexity.",
    status: "Shipped",
    color: "hsl(var(--secondary))",
    link: "https://3y0ng.github.io/grandpa-sg-site/",
    image: grandpaSiteScreenshot,
  },
  {
    id: "givemap",
    title: "GiveMap",
    tagline: "Gamified effective altruism",
    description: "An experimental UI for effective altruism. Designed as a gamified \"spy mission\" to increase donor engagement, a deep-dive into using agentic coding tools to build complex, non-standard web interfaces.",
    status: "Exploring",
    color: "hsl(var(--accent))",
    link: "https://givemap.quest",
    image: givemapScreenshot,
  },
];
