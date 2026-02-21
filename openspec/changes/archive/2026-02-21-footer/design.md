## Context

The landing page (`src/app/page.tsx`) currently renders a Navbar (via root layout) and a single hero section. There is no footer. The page uses a green/gray color palette with gradient accents (`from-[#34558b]` to `[#b5c7b0]`/`[#2a4a36]`). The Navbar (`src/components/Navbar.tsx`) provides navigation links: Home, Features, Testimonial, Blogs, About Us, plus a CTA button.

Available shadcn UI components include Button, Card, Badge, etc., but not Separator. Lucide icons are already in the project.

## Goals / Non-Goals

**Goals:**
- Add a clean, minimal footer to the landing page that feels consistent with the existing design
- Include brand identity, navigation links, GitHub link, and copyright
- Keep it as a standalone component for reusability

**Non-Goals:**
- Adding the footer to docs, dashboard, or profile pages
- Newsletter signup or email collection
- Multi-column complex footer layout (keep it simple)
- Installing new npm packages

## Decisions

### 1. Component location: `src/components/Footer.tsx`

A standalone `Footer` component, similar to how `Navbar` is structured. Imported directly in `page.tsx` rather than placed in root layout, since it only appears on the landing page.

**Alternative considered**: Placing in root layout with path-based visibility (like Navbar). Rejected because only the landing page needs it — adding conditional logic for a single page is unnecessary.

### 2. Layout: stacked vertical sections with a divider

Top section: logo/brand on the left, navigation links in the center, GitHub icon on the right — all in a single responsive row that stacks on mobile.

Bottom section: copyright text, separated by a border-top (using Tailwind `border-t` rather than installing the shadcn Separator component, since we only need a simple line).

**Alternative considered**: Installing shadcn `Separator` component. Rejected — `border-t` achieves the same visual result without adding a component for a single use.

### 3. Navigation links mirror the Navbar

Reuse the same link set from the Navbar (Home, Features, Testimonial, Blogs, About Us) plus a Docs link. This keeps navigation consistent and the footer functional as a secondary nav.

### 4. Styling: match existing landing page aesthetic

- Gray tones for text (`text-gray-500`, `text-gray-400`, `text-gray-900`)
- Green accent on hover (`hover:text-green-700`) matching the Navbar
- Same max-width container (`max-w-7xl`) and padding as the Navbar
- Dark background (`bg-gray-950` or `bg-gray-900`) for visual separation from the hero, with light text — common footer pattern for contrast

### 5. GitHub link uses Lucide `Github` icon

A simple icon link to the GitHub repository. Uses the existing Lucide icon set — no new dependencies.

## Risks / Trade-offs

- **Dark footer on light page**: The contrast between the light hero and dark footer creates a clear visual break. This is intentional and standard, but could feel abrupt if more sections are added between hero and footer later. → Acceptable for now; easy to adjust background if needed.
- **Hardcoded links**: Navigation links are duplicated between Navbar and Footer. → Low risk for a small site; could extract to a shared config later if the link list grows.
