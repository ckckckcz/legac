## Context

The initial docs page (`src/app/docs/page.tsx`) was built using `DocsLayout`, which composes the app-level `Sidebar` (the "Manage your documents" nav) alongside a docs-specific `DocsSidebar`. This coupling means the docs page carries app navigation chrome that has no relevance in the documentation context — it wastes horizontal space, creates a four-panel layout, and confuses the page's purpose.

Additionally, the `TableOfContents` card uses `CardHeader`/`CardContent` with default shadcn padding, making it proportionally large relative to the content it lists. Sub-items in `DocsSidebar` emit click callbacks but have no anchors — they do not navigate anywhere. There is no search surface.

`cmdk` (the package underlying shadcn's Command component) is not installed. The existing `src/components/ui/command.tsx` is an unrelated install-command widget.

## Goals / Non-Goals

**Goals:**
- Remove the app `Sidebar` entirely from the docs layout — docs gets a self-contained two-column shell
- Add a minimal docs top bar: app name/logo link (home) + `Ctrl+K` search trigger button
- Tighten the `TableOfContents` card — reduce padding so it reads as a compact inset, not a full card block
- Make `DocsSidebar` sub-items functional anchor links — each item scrolls to its corresponding `<section id>` in the main content
- Implement `Ctrl+K` search using a shadcn `Dialog` + inline filter list (no cmdk dependency needed — plain `useState` filter over sections data)
- Sync `activeItem` state in `DocsSidebar` to the scroll position so the active item tracks as the user scrolls

**Non-Goals:**
- Installing `cmdk` or the full shadcn Command component
- Full-text search across document body paragraphs (section titles + item names only)
- Multi-page routing between docs entries (still single-page anchor navigation)
- Dark mode toggle (inherits app theme)
- Breadcrumbs or pagination

## Decisions

### Decision: Replace DocsLayout with a new docs-only shell (`DocsShell`)

The app `Sidebar` is not meaningful on `/docs`. Rather than adding a prop to `DocsLayout` to hide it, replace the component with `DocsShell` — a clean two-column layout: docs nav sidebar (left) + main column (right). The main column contains a top bar (logo + search trigger) above the scrollable content area.

`DocsLayout.tsx` will be rewritten in-place as `DocsShell` (same file path, renamed export) to avoid breaking the import in `page.tsx` further than a single rename.

**Alternative considered:** Add `showAppSidebar={false}` prop to `DocsLayout` — rejected because it leaves dead code and a misleading component name.

### Decision: Search via Dialog + filtered list, no cmdk

`cmdk` is not in the project. Installing it for a single search surface adds a dependency. A `Dialog` with a controlled text input filtering over the flat list of section titles + item labels covers the stated need (navigate to section) with zero new dependencies.

The filter runs entirely in-memory over the static `sections` array. On selection, the dialog closes and the page scrolls to the matching `<section id>` anchor.

**Alternative considered:** Install `cmdk` / `shadcn add command` — valid but heavier than needed for this scope. Can be upgraded later.

### Decision: Sub-items as anchor links with `href`

`DocsSection.items` currently stores plain strings. To support anchor navigation, the data shape will be extended: items become `{ label: string; anchor: string }` objects. The anchor value is a kebab-cased version of the label (e.g., `"Getting Started"` → `#getting-started`). Corresponding `<section id="getting-started">` elements are added in `page.tsx`.

**Alternative considered:** Keep items as strings and derive anchor client-side — rejected because the caller (`page.tsx`) needs to co-own the anchor values to ensure they match the rendered section IDs.

### Decision: Active item tracking via IntersectionObserver

Rather than tracking active item only on click, an `IntersectionObserver` in `page.tsx` watches each `<section>` and lifts the active anchor into state, passed down to `DocsSidebar`. This keeps the sidebar in sync as the user scrolls through long content.

**Alternative considered:** Click-only tracking — simpler but gives a stale active indicator when the user scrolls manually.

### Decision: TOC tightening via className overrides, not component restructure

`TableOfContents.tsx` already uses `CardHeader`/`CardContent`. Reducing `py`/`px` values and the gap between entries is sufficient — no structural change needed.

### Component map

| Component | File | Change |
|---|---|---|
| `DocsShell` | `src/components/docs/DocsLayout.tsx` | Rewrite — remove app Sidebar, add top bar |
| `DocsSidebar` | `src/components/docs/DocsSidebar.tsx` | Items become `{ label, anchor }`, active prop wired to scroll |
| `TableOfContents` | `src/components/docs/TableOfContents.tsx` | Tighten padding/spacing |
| `DocsSearch` | `src/components/docs/DocsSearch.tsx` | New — Dialog + filtered list, Ctrl+K binding |
| `/docs` page | `src/app/docs/page.tsx` | Update data shapes, add section IDs, IntersectionObserver |

## Risks / Trade-offs

- **IntersectionObserver complexity** → Slightly more code in `page.tsx`. Mitigation: extract to a `useActiveSection` hook if it grows beyond ~20 lines.
- **Static anchor derivation** → Item anchors are hardcoded in the data array. If a section label changes, the anchor must be updated in two places (data + JSX). Mitigation: document the convention; derive anchor from label as a utility if this becomes error-prone.
- **Dialog-based search UX** → Less polished than cmdk's keyboard-navigable command palette. Trade-off accepted for zero new dependencies; can upgrade to cmdk later.
- **DocsLayout rename** → Export name changes from `DocsLayout` to `DocsShell` in the same file. `page.tsx` import must be updated. No other consumers yet.
