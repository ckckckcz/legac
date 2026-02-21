## Why

The initial docs page layout reused the app navigation sidebar (which is scoped to document management) and has several UX gaps: the Table of Contents card is oversized, sub-items in the docs nav are not functional, and there is no way to search across documentation sections. These issues make the docs page feel disconnected from its purpose and harder to use as a reference surface.

## What Changes

- Remove the app `Sidebar` from the docs layout — docs gets a self-contained layout with only a docs-specific header/nav, no "Manage your documents" chrome
- Replace `DocsLayout` with a new docs-only shell: minimal top bar (logo/title + search trigger) + docs nav sidebar + main content
- Tighten the Table of Contents card — reduce padding, font size, and overall footprint so it doesn't dominate the page
- Make docs sidebar sub-items functional — clicking an item scrolls to (or routes to) the corresponding content section via anchor links
- Add a `Ctrl+K` search command palette using the existing shadcn `Command` component — searches across section titles and item names, navigates to the matching anchor on selection

## Capabilities

### New Capabilities

- `docs-search`: `Ctrl+K` command palette for searching docs sections and items; uses shadcn `Command` + `Dialog`; results navigate to the matching content anchor

### Modified Capabilities

- `documentation-page`: Layout changes (remove app sidebar, add docs-only shell), TOC visual tightening, sub-item anchor navigation — these are requirement-level behavior changes to the existing capability

## Impact

- `src/app/docs/page.tsx` — updated to use new layout shell instead of `DocsLayout` + app `Sidebar`
- `src/components/docs/DocsLayout.tsx` — replaced or significantly reworked (remove `Sidebar` import, add top bar with search trigger)
- `src/components/docs/DocsSidebar.tsx` — sub-items emit anchor navigation (href or scroll); active item tracking by anchor
- `src/components/docs/TableOfContents.tsx` — visual tightening (padding, font sizes)
- `src/components/docs/DocsSearch.tsx` — new component: `Command` dialog, `Ctrl+K` binding, searches sections + items
- No new npm dependencies (shadcn `Command` + `Dialog` already installed or installable via shadcn CLI)
