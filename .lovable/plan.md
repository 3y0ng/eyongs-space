

## Make the Site More Interactive and Unique

Here are ideas ranked by wow-factor, all staying true to the terminal/CLI aesthetic.

---

### 1. Custom Cursor with Trail Effect
Replace the default cursor with a small terminal-green dot that leaves a fading trail as it moves. Subtle but immediately signals "this site is different." Pure CSS + a lightweight mouse-move listener.

**Files:** `src/components/CustomCursor.tsx` (new), `src/App.tsx`, `src/index.css`

---

### 2. Konami Code Easter Egg
Typing a secret key sequence (e.g. the classic Konami code, or something custom like "sudo") triggers a fun easter egg -- the whole page briefly flips to a retro green-on-black CRT scanline effect with a joke message like `> access granted. welcome, hacker.` Disappears after a few seconds. Memorable and shareable.

**Files:** `src/hooks/useKonamiCode.ts` (new), `src/components/EasterEgg.tsx` (new), `src/App.tsx`

---

### 3. Interactive Command Palette (Ctrl+K / Cmd+K)
A site-wide command palette that lets visitors navigate pages, jump to projects/essays, or trigger the easter egg -- all via keyboard. Feels like a real dev tool. Uses the existing `cmdk` library already in the project.

**Files:** `src/components/CommandPalette.tsx` (new), `src/App.tsx`

---

### 4. Magnetic Hover Effect on Project Cards
When hovering near a project card, it subtly tilts/shifts toward the cursor (like a magnetic pull), with a soft glow on the border. Makes the project list feel alive without being distracting.

**Files:** `src/components/ProjectCard.tsx` (update)

---

### 5. Parallax Scrolling on Section Headers
The `// projects` and `// essays` headers scroll at a slightly different speed than the content, creating a subtle depth effect. Lightweight, no library needed -- just a scroll listener adjusting `translateY`.

**Files:** `src/pages/Index.tsx` (update)

---

### 6. "Now Playing" Status in Footer
A small animated element in the footer that cycles through status messages like `compiling...`, `pushing to main...`, `debugging at 2am...` with a blinking dot. Adds personality and life to the bottom of every page.

**Files:** `src/components/Footer.tsx` (update)

---

### Summary
- **New files:** `CustomCursor.tsx`, `useKonamiCode.ts`, `EasterEgg.tsx`, `CommandPalette.tsx`
- **Modified:** `App.tsx`, `index.css`, `ProjectCard.tsx`, `Index.tsx`, `Footer.tsx`

All pure frontend, no libraries to install (cmdk is already available). Each feature is independent so you can pick and choose.

