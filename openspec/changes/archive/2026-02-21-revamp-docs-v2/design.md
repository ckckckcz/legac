## Context

The app currently has two navigation concerns mixed with component responsibilities:

1. **Landing page navbar** (`src/app/page.tsx` lines 17–46): A `<nav>` block is hardcoded inline inside the page component. It has no independent lifecycle, cannot be tested in isolation, and cannot be reused if other pages ever need the same top bar.

2. **Docs sidebar search affordance** (`src/components/docs/DocsSidebar.tsx`): The `DocsSearch` modal is fully implemented and wired up (keyboard shortcut `Ctrl+K`, open/close state, entries), but the sidebar gives users no visible hint that search exists. The only trigger is the `Search` button in the `DocsShell` top bar — which is 12px tall, subtle, and easy to miss. There is no in-sidebar affordance.

The `DocsShell` component already accepts and forwards an `onSearchOpen` callback to the top bar button, but does not pass it down to `DocsSidebar`.

## Goals / Non-Goals

**Goals:**
- Extract the inline `<nav>` from `page.tsx` into `src/components/Navbar.tsx` — identical markup, just relocated
- Add a search affordance inside `DocsSidebar` that opens the existing `DocsSearch` modal
- Wire `onSearchOpen` from `DocsShell` through to `DocsSidebar` with no state refactoring

**Non-Goals:**
- Redesigning the navbar (colors, links, layout are unchanged)
- Changing `DocsSearch` internals or search behavior
- Adding mobile hamburger menu to the navbar
- Changing the docs page routing or content

## Decisions

### 1. Extract navbar as a named export from `src/components/Navbar.tsx`

**Decision:** Create `src/components/Navbar.tsx` exporting a `Navbar` component. Replace the inline `<nav>` in `page.tsx` with `<Navbar />`.

**Rationale:** The navbar has no props or state dependencies on the page — it's pure static markup. A direct lift-and-shift is safe and zero-risk. Placing it in `src/components/` follows the existing pattern (see `Sidebar`, `DocsSidebar`) for layout-level components.

**Alternative considered:** Co-locate as `src/app/_components/Navbar.tsx` (Next.js private folder convention). Rejected because the landing navbar may eventually be used in other contexts (e.g., marketing sub-pages), so `src/components/` is more appropriate.

---

### 2. Search affordance: input-style button, not a real `<input>`

**Decision:** Render a `<button>` styled to look like a search input (border, rounded, placeholder text, `Ctrl+K` kbd badge) in the sidebar above the nav tree. Clicking it calls `onSearchOpen`.

**Rationale:** The existing search UX is modal-based — `DocsSearch` renders a `<Command>` dialog. There is no persistent inline search input. A fake input button is the standard pattern for this (used by Linear, GitHub, Vercel docs) and avoids duplicating input logic.

**Alternative considered:** A real `<input>` that focuses and opens the modal on focus. Rejected because it introduces an extra focus event and is less accessible — a button's role and behavior are unambiguous.

---

### 3. `onSearchOpen` passed as an optional prop to `DocsSidebar`

**Decision:** Add `onSearchOpen?: () => void` to `DocsSidebarProps`. `DocsShell` already holds this callback; it passes it to the top bar button and now also passes it to `DocsSidebar`.

**Rationale:** Minimal change surface. No new state, no context, no refactor. The prop is optional so existing usages of `DocsSidebar` (if any outside `DocsShell`) remain valid.

**Alternative considered:** Pull `onSearchOpen` from a React context. Rejected as over-engineering — the call chain is only two levels deep (Shell → Sidebar).

---

### 4. Search affordance placement: top of sidebar, above `NavTree`

**Decision:** Render the search button between the "Documentation" header and the `NavTree` in the desktop sidebar, and at the top of the mobile `SheetContent` body (below the `SheetHeader`).

**Rationale:** Placing it above the tree makes it the first interactive element users encounter when scanning the sidebar top-to-bottom, matching the convention established by tools like Notion and Linear.

## Risks / Trade-offs

- **SVG inline in `Navbar.tsx`:** The logo SVG is pasted inline. If it needs updating it lives in two places until a shared `<LegacLogo />` component is extracted. This is a known pre-existing issue; this change does not make it worse.
  → Mitigation: Out of scope for this change. Track as a separate cleanup item.

- **`onSearchOpen` is optional on `DocsSidebar`:** If `onSearchOpen` is undefined, the search affordance should either not render or render disabled. A missing callback should not throw.
  → Mitigation: Guard the render — only show the affordance when `onSearchOpen` is provided, or use a no-op fallback.

## Migration Plan

1. Create `src/components/Navbar.tsx` with the extracted nav markup
2. Replace inline `<nav>` in `src/app/page.tsx` with `<Navbar />`
3. Add `onSearchOpen?: () => void` to `DocsSidebarProps` in `DocsSidebar.tsx`
4. Add the search affordance element inside `DocsSidebar` (both desktop and mobile paths)
5. Pass `onSearchOpen` from `DocsShell` to `<DocsSidebar>` in `DocsLayout.tsx`
6. Verify: landing page renders identically, docs sidebar shows search affordance, clicking it opens the modal

No data migrations, no environment changes, no deployment steps beyond a standard build.

**Rollback:** Revert is a single-commit undo. No schema or data changes.

## Open Questions

- None. Scope is fully defined by the proposal.
