## 1. Middleware

- [x] 1.1 Add `"/docs"` to the `protectedRoutes` array in `src/middleware.ts`

## 2. DocsLayout component

- [x] 2.1 Create `src/components/docs/DocsLayout.tsx` — flex row wrapper that composes the app `Sidebar` + `DocsSidebar` + main content slot
- [x] 2.2 App sidebar takes fixed width on left; docs sidebar takes fixed width (`w-56`) hidden on mobile (`hidden md:flex`); main content takes `flex-1 overflow-auto`

## 3. DocsSidebar component

- [x] 3.1 Create `src/components/docs/DocsSidebar.tsx` with a typed `DocsSection[]` prop (`{ title: string; count?: number; items: string[]; }[]`)
- [x] 3.2 Render each section group as a collapsible row: section title + `Badge` showing count + `ChevronRight`/`ChevronDown` icon (lucide-react), toggle via `useState`
- [x] 3.3 Render child items as `Button` (variant `ghost`, full width, left-aligned) inside the collapsed/expanded region; highlight active item with `bg-accent`
- [x] 3.4 Add mobile `Sheet` trigger: a `Menu` icon `Button` visible only on mobile (`md:hidden`) that opens a `Sheet` containing the same nav tree

## 4. TableOfContents component

- [x] 4.1 Create `src/components/docs/TableOfContents.tsx` with a typed `TocEntry[]` prop (`{ label: string; anchor: string; }[]`)
- [x] 4.2 Render as a `Card` with a header row containing "Table of Contents" label + a `ChevronUp`/`ChevronDown` `Button` (ghost, icon) to toggle collapse
- [x] 4.3 Render each entry as an `<a href={anchor}>` styled `text-sm text-muted-foreground hover:text-primary` inside the collapsible body
- [x] 4.4 Collapse state managed with `useState`, defaulting to expanded

## 5. Docs page route

- [x] 5.1 Create `src/app/docs/page.tsx` as a `'use client'` page that renders `DocsLayout` with `DocsSidebar` and main content
- [x] 5.2 Define placeholder `sections` data array (e.g. Introduction, About (70), Account (50), AI (4), Blog (20)) matching the reference UI
- [x] 5.3 Define placeholder `tocEntries` array (at least 6 entries matching the reference UI headings)
- [x] 5.4 Render main content: page title (`text-3xl font-bold`), subtitle (`text-muted-foreground`), `TableOfContents`, then at least two body sections with `<h2>` headings and paragraph text

## 6. Verify

- [x] 6.1 Visit `/docs` while logged out — confirm redirect to `/login?callbackUrl=/docs`
- [x] 6.2 Visit `/docs` while logged in — confirm three-region layout renders correctly on desktop
- [x] 6.3 Click a section group in the docs sidebar — confirm it expands/collapses with chevron rotation
- [x] 6.4 Click the TOC toggle — confirm the heading list collapses and re-expands
- [x] 6.5 Resize to mobile viewport — confirm docs sidebar is hidden and Sheet trigger is visible
