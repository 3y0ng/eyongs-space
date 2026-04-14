

## Implement All Suggested Improvements

Five enhancements to make the site more interactive and polished.

---

### 1. Hero Typing Animation
**File:** `src/components/TypingHero.tsx` (new), `src/pages/Index.tsx`

Create a new component that renders the CLI hero block with a character-by-character typing effect on page load. Each line of the JSON object types out sequentially with a ~30ms per-character speed. The blinking cursor appears at the end after typing completes. Uses `useState` + `useEffect` with intervals -- no external libraries needed.

Replace the static CLI hero in `Index.tsx` with this component.

---

### 2. Scroll-Triggered Fade-In Animations
**File:** `src/hooks/useScrollReveal.ts` (new), `src/pages/Index.tsx`, `src/components/ProjectCard.tsx`

Create a custom hook wrapping `IntersectionObserver` that adds a CSS class when elements enter the viewport. Each section (projects, essays) and each project card / essay row fades and slides up as the user scrolls. Uses CSS transitions with `opacity` and `translateY` -- no animation library needed.

Apply to the projects section, essays section, and individual list items on the homepage.

---

### 3. Project Card Screenshot Thumbnails on Hover
**File:** `src/components/ProjectCard.tsx`

Projects already have `image` fields with imported screenshots. Enhance `ProjectCard` to show a small thumbnail preview on hover: a tooltip-style floating image that appears to the right or above the card on desktop. Uses CSS `group-hover` + absolute positioning. Falls back gracefully if no image exists.

---

### 4. About Page
**Files:** `src/pages/About.tsx` (new), `src/App.tsx`, `src/components/Navbar.tsx`

Create a minimal About page with:
- CLI-style header (`// about`)
- Short bio paragraph (placeholder text the user can edit)
- A "stats" block in the same terminal aesthetic as the homepage hero
- Links to LinkedIn/GitHub

Add `/about` route to `App.tsx` and an "About" link to the Navbar.

---

### 5. Essay Reading Progress Bar
**Files:** `src/components/ReadingProgress.tsx` (new), `src/pages/EssayDetail.tsx`

A thin fixed bar at the very top of the page (above the navbar) that fills left-to-right as the user scrolls through an essay. Uses a `scroll` event listener to calculate progress as `scrollY / (documentHeight - viewportHeight)`. Styled as a 2px tall bar in terminal-green. Only rendered on essay detail pages.

---

### Summary of files touched
- **New:** `TypingHero.tsx`, `useScrollReveal.ts`, `ReadingProgress.tsx`, `About.tsx`
- **Modified:** `Index.tsx`, `ProjectCard.tsx`, `EssayDetail.tsx`, `App.tsx`, `Navbar.tsx`

