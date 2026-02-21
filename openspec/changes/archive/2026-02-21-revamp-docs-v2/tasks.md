## 1. Extract Navbar Component

- [x] 1.1 Create `src/components/Navbar.tsx` and move the inline `<nav>` block (lines 17–46 of `src/app/page.tsx`) into it as a named export `Navbar`
- [x] 1.2 Replace the inline `<nav>` block in `src/app/page.tsx` with `<Navbar />` and add the import

## 2. Docs Sidebar Search Affordance

- [x] 2.1 Add `onSearchOpen?: () => void` to `DocsSidebarProps` in `src/components/docs/DocsSidebar.tsx`
- [x] 2.2 Add a search affordance `<button>` (styled as an input with `Ctrl+K` hint) above the `<NavTree>` in the desktop sidebar — only render it when `onSearchOpen` is provided
- [x] 2.3 Add the same search affordance inside the mobile `<SheetContent>` body, above `<NavTree>`
- [x] 2.4 Pass `onSearchOpen` from `DocsShell` to `<DocsSidebar>` in `src/components/docs/DocsLayout.tsx`

## 3. Verification

- [x] 3.1 Confirm the landing page renders identically to before (logo, links, CTA all present and styled correctly)
- [x] 3.2 Confirm the docs sidebar shows the search affordance with `Ctrl+K` hint on desktop
- [x] 3.3 Confirm clicking the search affordance opens the `DocsSearch` modal
- [x] 3.4 Confirm the search affordance appears inside the mobile sheet drawer
- [x] 3.5 Run `pnpm build` and confirm no TypeScript or build errors
