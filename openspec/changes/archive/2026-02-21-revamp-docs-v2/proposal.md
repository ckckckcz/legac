## Why

The landing page navbar is hardcoded inline in `src/app/page.tsx`, making it impossible to reuse or test independently. Additionally, the docs sidebar has no visible search affordance — users must already know `Ctrl+K` exists, as there is no in-sidebar hint or input that surfaces the search modal.

## What Changes

- Extract the inline `<nav>` block from `src/app/page.tsx` into a standalone `src/components/Navbar.tsx` component
- Add a search affordance to the docs sidebar: a clickable input-style element that displays `Ctrl+K` hint text and opens the existing `DocsSearch` modal on click or keyboard shortcut

## Capabilities

### New Capabilities

- `navbar`: Reusable top navigation bar for the landing page — logo, nav links, and CTA button extracted from `page.tsx` into its own component

### Modified Capabilities

- `documentation-page`: Docs sidebar gains a search affordance (input-style element with `Ctrl+K` hint text) that triggers the search modal — this is a new requirement for the docs sidebar UI

## Impact

- `src/app/page.tsx` — inline `<nav>` block replaced with `<Navbar />` import
- `src/components/Navbar.tsx` — new file; contains the extracted nav with logo, links, and "Start for free" CTA
- `src/components/docs/DocsSidebar.tsx` — adds a search hint element above the nav tree; clicking it fires `onSearchOpen` callback
- `src/components/docs/DocsLayout.tsx` — passes `onSearchOpen` down to `DocsSidebar` (already has it for the top bar button; extend to sidebar)
- `src/app/docs/page.tsx` — no changes needed (already lifts `searchOpen` state and passes `onSearchOpen` to `DocsShell`)
