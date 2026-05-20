## Goal

Restyle the site to feel modern and visually impactful using the chosen "High-density command center" direction: a bento-grid layout, frosted-glass surfaces, a single teal accent (#2dd4bf) over a near-black base, Space Grotesk headings + DM Sans body, with JetBrains Mono preserved for terminal/CLI blocks. Keep all existing content, routing, the typing CLI hero, Mikey/easter eggs, and the newsletter backend untouched.

## Scope

In:
- Global design tokens (colors, fonts, glass utility classes)
- Home page (`src/pages/Index.tsx`) restructured as bento grid
- Navbar and Footer restyled to match
- `TypingHero` and `ProjectCard` visual polish (no logic changes)
- Projects, Essays, About, EssayDetail pages get matching surface treatment (cards become glass tiles, accent color updated)

Out:
- No copy rewrites beyond what the prototype shows; project/essay data stays as-is
- No changes to Mikey, BoneRain, CommandPalette, EasterEgg behavior
- No backend/auth/data changes

## Design tokens

`src/index.css`:
- Keep dark base. Update tokens (HSL):
  - `--background: 0 0% 2%` (near-black #050505)
  - `--card: 240 5% 8%` with alpha applied via utility (glass)
  - `--accent` / new `--teal: 172 66% 50%` (#2dd4bf)
  - `--terminal-green` retired in favor of teal; alias `--terminal-green` to the teal value so existing usages don't break visually
  - Borders: `--border: 0 0% 100% / 0.06` (via class, not raw token)
- Add Google Fonts: Space Grotesk + DM Sans (keep JetBrains Mono).
- Body font becomes DM Sans; headings become Space Grotesk; `font-mono` reserved for CLI/terminal/labels.
- Add utility classes: `.glass` (bg-zinc-900/30, backdrop-blur-xl, border border-white/5, rounded-2xl), `.glass-hover` (hover:border-teal/30, soft shadow).

`tailwind.config.ts`:
- `fontFamily.sans` -> DM Sans; `fontFamily.display` -> Space Grotesk; `fontFamily.mono` stays JetBrains Mono.
- Add `colors.teal` mapped to `hsl(var(--teal))` (keep tailwind's default teal too).

## Home page bento

```text
+----------------------------------------------------+
| nav  ~/eyong $ ready_         home projects essays |
+--------------------------------+-------------------+
| CLI Hero (typing)  col-span-8  | Status   col-4    |
|                                | 0 to 1 mode       |
|                                | latency / uptime  |
+----------------------------+---+-------------------+
| Projects     col-span-7    | Essays    col-span-5  |
+----------------------------+-----------------------+
| Newsletter (full width, soft gradient tile)        |
+----------------------------------------------------+
| footer meta (last commit / credits)                |
+----------------------------------------------------+
```

- Each tile uses the `.glass` surface.
- Project tags `[active]` / `[shipped]` styled as teal-outlined chips (active) and zinc-outlined (shipped).
- Essays show date stamp in mono small caps + title; preserve existing essay data + links.
- Newsletter tile keeps current Supabase submit logic but restyled to match prototype (input + Subscribe button).

## Component changes

- `src/components/Navbar.tsx`: glass nav bar, replace prompt-only brand with `~/eyong $ ready_` + pulsing teal dot; nav links uppercase tracked.
- `src/components/Footer.tsx`: keep newsletter logic; restyle to mono-meta footer beneath the Newsletter bento tile (LinkedIn/GitHub only, never Twitter).
- `src/components/TypingHero.tsx`: keep typing animation; wrap container in a glass tile styled like the hero block; teal cursor.
- `src/components/ProjectCard.tsx`: tighten to the row style from the prototype (title + status chip + one-line description); preserve link behavior.
- `src/pages/Index.tsx`: rebuild as bento grid wiring above components, project/essay data from existing data files.
- `src/pages/Projects.tsx`, `Essays.tsx`, `About.tsx`, `EssayDetail.tsx`: minimal pass: wrap content in glass containers, swap green for teal, apply Space Grotesk for headings.

## Content rules preserved

- Memory rules respected: no em-dashes (use semicolons), no Twitter, JetBrains Mono only in technical UI, dark theme, authentic tone.
- All actual project + essay data sourced from `src/data/projects.ts` and `src/data/essays.ts` unchanged.

## Validation

- Visual diff via screenshot after build to confirm bento layout, teal accent, glass surfaces, typography, and CLI hero still render.
- Click through Projects / Essays / About to confirm no regressions or broken styles.
- Newsletter submit still posts to Supabase.

## Memory update

After implementing, update `mem://style/visual-direction` to record the new "command center bento + teal accent + glassmorphism" direction and supersede the prior "monochrome green terminal" language; keep core rules about JetBrains Mono being reserved for technical UI.
