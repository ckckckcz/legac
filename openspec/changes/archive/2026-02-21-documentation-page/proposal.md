## Why

The app needs a documentation page at `/docs` where generated content can be displayed in a structured, navigable layout. The layout shell needs to exist before content generation is wired up — building it now unblocks future content work and establishes the visual pattern for the docs section.

## What Changes

- Add a new protected route at `/docs` (protected by middleware, requires authentication)
- Build a two-panel layout: fixed left sidebar with section/category navigation + main scrollable content area
- Main content area includes a collapsible Table of Contents at the top, followed by the document body
- Sidebar shows section categories with item counts (e.g. "Introduction", "About (70)") and chevron expand indicators — matching the shadcn.io docs pattern shown in the reference UI
- Content is placeholder/static for now; the layout and components are the deliverable
- Reuse existing `Sidebar` (app nav) pattern and shadcn/ui primitives (`Card`, `Badge`, `Button`, `Sheet` for mobile)

## Capabilities

### New Capabilities

- `documentation-page`: The `/docs` route — page layout, docs sidebar navigation component, table of contents component, and main content area

### Modified Capabilities

_(none — middleware already handles `/docs` protection once added to `protectedRoutes`)_

## Impact

- `src/app/docs/page.tsx` — new route (protected)
- `src/middleware.ts` — add `/docs` to `protectedRoutes`
- `src/components/docs/` — new directory for docs-specific components:
  - `DocsSidebar.tsx` — left nav with collapsible sections and item counts
  - `TableOfContents.tsx` — collapsible TOC card at top of content
  - `DocsLayout.tsx` — two-panel wrapper
- No new dependencies (uses existing shadcn/ui components)
