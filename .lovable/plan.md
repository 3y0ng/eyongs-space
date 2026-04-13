

## Add Playful, Technical Personality to the Site

The site is clean and minimal right now. The goal is to inject personality and signal technicality without losing the clean aesthetic. Here's the plan:

### 1. CLI-style hero on the homepage

Replace the current serif hero with a terminal-inspired intro. Monospaced font, blinking cursor, typed-out feel (but not a slow typewriter animation, just the aesthetic).

```text
> eyong.status()
{
  role: "founder & builder",
  building: ["pyreel.ai", "curilo.ai"],
  previously: "tutoring @ 4 locations, property @ 19"
}
```

Uses a dark card with green/amber accent text, monospace font, and a blinking cursor after the last line. The original tagline stays below in normal text.

### 2. Navbar name as a prompt

Change "E-Yong Lee" in the navbar to `~/eyong $` or `eyong@web:~$` styled in monospace, giving the whole site a subtle CLI frame.

### 3. Section labels as CLI comments

Change the "PROJECTS" and "ESSAYS" section headers from uppercase labels to CLI-style comments:

```text
// projects
// essays
```

Rendered in monospace, muted green, lowercase.

### 4. Project status badges as terminal tags

Instead of plain text status ("Active", "Shipped", "Exploring"), render them as inline code-style badges:

```text
[active]  [shipped]  [exploring]
```

Monospace, lowercase, with subtle color coding (green for active, muted for shipped, amber for exploring).

### 5. Footer "last deployed" line

Add a small monospace line at the bottom of the footer:

```text
last commit: 2026-04-13 · built with mass amounts of mass-produced caffeine
```

### Files to edit

- `src/index.css` -- add monospace font import (JetBrains Mono or similar), `.font-mono` utility
- `tailwind.config.ts` -- add `mono` font family
- `src/pages/Index.tsx` -- CLI hero block, CLI-style section labels
- `src/components/Navbar.tsx` -- prompt-style name
- `src/components/ProjectCard.tsx` -- terminal-style status badges
- `src/components/Footer.tsx` -- "last deployed" line

