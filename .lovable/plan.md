
# Personal Website for a Founder

## Pages & Structure

### 1. Home / Landing
- Bold hero with your name and a short tagline (e.g. "Building things that matter")
- Custom cursor that reacts to hover states (dot that grows/morphs on interactive elements)
- Scroll-triggered animations: elements fade/slide in as you scroll
- A rotating/animated marquee strip with keywords about you
- Quick preview cards linking to Projects and Essays sections

### 2. Projects Page
- Grid of project cards with rich hover effects (tilt, color shift, reveal description)
- Each card shows: project name, one-line description, status badge (Active / Shipped / Exploring), and a link
- Clicking a card opens a detail view with more info, images placeholder, and external links
- Animated page transition (fade + slide) when navigating here

### 3. Essays Page
- Clean editorial layout — list of essays with title, date, and a short excerpt
- Hover reveals a subtle color accent or underline animation
- Clicking opens a full essay page with beautiful typography (large readable text, proper spacing)
- Placeholder essays with lorem-style content

### 4. About / Contact Section
- Brief bio section on the home page or as a standalone section
- Newsletter signup form (email input + subscribe button, stored locally for now — can wire to a backend later)
- Social links with playful hover animations

## Design & Interactions
- **Color palette**: Bold primary accent (electric blue or vibrant coral) against off-white/cream backgrounds with dark text
- **Typography**: Mix of a display/serif font for headings and clean sans-serif for body
- **Custom cursor**: Small dot that scales up on hover over interactive elements
- **Page transitions**: Smooth fade + slide animations between routes using framer-motion
- **Micro-interactions**: Cards tilt on hover, buttons have spring animations, scroll-triggered reveals
- **Dark/light feel**: Light mode by default with bold accent pops

## Tech Approach
- React + Tailwind + Framer Motion for animations
- React Router for page transitions
- All content as placeholder data (easy to swap later)
- Fully responsive (mobile-friendly)
