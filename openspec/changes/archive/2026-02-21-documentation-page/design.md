## Context

The app already has a two-panel page pattern established by `/profile` — a fixed left app-navigation sidebar (`src/components/sidebar.tsx`) plus a main scrollable content area. The docs page introduces a second, independent sidebar specifically for document section navigation (like the shadcn.io docs layout in the reference UI). This docs-nav sidebar is separate from the app sidebar and sits between it and the content area.

Existing shadcn/ui components available: `Card`, `Badge`, `Button`, `Sheet`, `Avatar`, `Skeleton`, `Input`, `Select`, `Command`. Lucide React is already used for icons. No new dependencies are needed.

## Goals / Non-Goals

**Goals:**
- Create a `/docs` page with a three-region layout: app sidebar (left) + docs nav sidebar (fixed, left) + main content (scrollable, right)
- Docs nav sidebar: collapsible section groups, item counts as `Badge`, chevron expand/collapse icons, active item highlight
- Main content: collapsible Table of Contents card (`Card` + `Button` toggle) followed by the document body area
- Use shadcn/ui primitives throughout — no custom CSS beyond Tailwind utilities
- Protect the route via middleware (`/docs` added to `protectedRoutes`)
- Mobile: docs nav sidebar collapses into a `Sheet` drawer triggered by a menu button

**Non-Goals:**
- Dynamic content loading or API integration (placeholder content only for now)
- Search functionality within docs
- Pagination or multi-page navigation between doc entries
- Dark mode toggle (inherits app-level theme)

## Decisions

### Decision: DocsLayout as a standalone wrapper, not extending the app Sidebar

The app's `Sidebar` component manages global navigation (Files, Profile, Settings, Logout). The docs nav is a different concern — it lists document sections within the `/docs` context. Mixing them would couple unrelated navigation concerns and make future content injection harder.

**Approach:** `DocsLayout.tsx` composes the app `Sidebar` + `DocsSidebar` + main content as a three-column flex layout. Each sidebar is independently scrollable.

**Alternative considered:** Extending the app sidebar with a sub-nav section — rejected because it would require significant changes to `sidebar.tsx` and bleed docs-specific state into a global component.

### Decision: Collapsible sections via local React state, not a headless library

The reference UI shows section groups that expand/collapse (chevron right → down). This is straightforward enough to implement with `useState` per group — no need for Radix `Accordion` or additional shadcn components.

**Alternative considered:** shadcn `Accordion` — available but adds a dependency pattern and opinionated animation. Plain `useState` + Tailwind transition classes keep it lightweight and consistent with the existing sidebar pattern.

### Decision: Table of Contents as a `Card` with a `Button` toggle

The reference UI shows a TOC card that collapses. Using shadcn `Card` for the container and a `Button` (ghost, icon) for the toggle chevron matches the existing design language exactly.

### Decision: Mobile docs nav via `Sheet` (already installed)

`Sheet` is already in the project. On small screens, `DocsSidebar` is hidden and a hamburger `Button` triggers a `Sheet` containing the same nav tree.

### Component map

| Component | Location | shadcn/ui used |
|---|---|---|
| `DocsLayout` | `src/components/docs/DocsLayout.tsx` | — (layout wrapper) |
| `DocsSidebar` | `src/components/docs/DocsSidebar.tsx` | `Button`, `Badge`, `Sheet` |
| `TableOfContents` | `src/components/docs/TableOfContents.tsx` | `Card`, `Button` |
| `/docs` page | `src/app/docs/page.tsx` | — (assembles components) |

## Risks / Trade-offs

- **Three sidebars on mobile** → The app sidebar + docs sidebar would stack awkwardly on small screens. Mitigation: docs sidebar is hidden on mobile (`hidden md:flex`) and replaced by the `Sheet` drawer trigger.
- **Placeholder content only** → The layout ships with hardcoded section names and body text. When real content is wired up, the `DocsSidebar` and `TableOfContents` data shapes need to be finalized. Mitigation: define clear props interfaces now so content can be injected without layout changes.
- **Middleware `/docs` addition** → Adding `/docs` to `protectedRoutes` uses `pathname.startsWith("/docs")`, which protects all sub-paths too (e.g., `/docs/intro`). This is intentional and consistent with how `/profile` is protected.
