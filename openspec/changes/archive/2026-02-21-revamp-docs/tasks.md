## 1. DocsLayout → DocsShell rewrite

- [x] 1.1 In `src/components/docs/DocsLayout.tsx`, remove the `Sidebar` import and all app-level chrome
- [x] 1.2 Rewrite the component as `DocsShell`: two-column layout (docs nav sidebar left, main column right)
- [x] 1.3 Add a minimal top bar inside `DocsShell` with the app logo/title (links to home) and a search trigger button that opens `DocsSearch`
- [x] 1.4 Ensure the main content area is independently scrollable while the sidebar stays fixed
- [x] 1.5 Update the export name from `DocsLayout` to `DocsShell` (named export or default — keep consistent with import in `page.tsx`)
- [x] 1.6 Update `src/app/docs/page.tsx` to import `DocsShell` instead of `DocsLayout` and remove `Sidebar` usage

## 2. DocsSidebar — anchor navigation and active tracking

- [x] 2.1 Update the `DocsSection` data type: change `items` from `string[]` to `{ label: string; anchor: string }[]`
- [x] 2.2 Update all existing section data in `page.tsx` (or the data file) to provide `anchor` values (kebab-case of the label, e.g. `"Getting Started"` → `"getting-started"`)
- [x] 2.3 In `DocsSidebar.tsx`, render each sub-item as an `<a href={`#${item.anchor}`}>` link instead of a plain click-callback element
- [x] 2.4 Accept an `activeAnchor: string` prop in `DocsSidebar` and apply the highlighted background style to the sub-item whose anchor matches
- [x] 2.5 Pass the `activeAnchor` prop down from `page.tsx` (wired to scroll state — see task group 4)

## 3. TableOfContents — visual tightening

- [x] 3.1 In `TableOfContents.tsx`, reduce `CardHeader` and `CardContent` padding (replace default shadcn `py`/`px` with tighter values via `className`)
- [x] 3.2 Reduce font size on TOC link entries so the card reads as a compact inset rather than a full block
- [x] 3.3 Verify the toggle (expand/collapse) still functions correctly after the style changes

## 4. Active section tracking via IntersectionObserver

- [x] 4.1 In `src/app/docs/page.tsx`, add `<section id="...">` wrappers around each content section, using the same anchor values defined in the section data
- [x] 4.2 Implement an `IntersectionObserver` (or extract a `useActiveSection` hook if >~20 lines) that watches the section elements and updates `activeAnchor` state as sections enter/leave the viewport
- [x] 4.3 Wire `activeAnchor` state into `DocsSidebar` via the `activeAnchor` prop

## 5. DocsSearch component

- [x] 5.1 Create `src/components/docs/DocsSearch.tsx` — a `Dialog` wrapping a controlled text input and a filtered results list (no cmdk dependency)
- [x] 5.2 Flatten the sections data into a searchable list of `{ label: string; anchor: string }` entries (section titles + item names) for filtering
- [x] 5.3 Implement case-insensitive filtering: show all entries when input is empty, filter on keystroke
- [x] 5.4 Show a "No results found" message when the filtered list is empty
- [x] 5.5 On result selection (click or Enter), close the dialog and scroll to `#anchor`
- [x] 5.6 Bind `Ctrl+K` / `Cmd+K` globally on the docs page (`useEffect` with `keydown` listener) to open the `DocsSearch` dialog
- [x] 5.7 Wire the search trigger button in `DocsShell`'s top bar to open the dialog (lift `open` state or use a callback prop)
- [x] 5.8 Verify `Escape` closes the dialog (default `Dialog` behavior — confirm it works)

## 6. Mobile layout

- [x] 6.1 Verify the docs nav sidebar is hidden on mobile viewports and a trigger button is visible
- [x] 6.2 Verify the Sheet drawer opens the full docs navigation tree on mobile trigger tap
- [x] 6.3 Verify sub-item anchor links and active tracking work correctly inside the Sheet drawer

## 7. Integration and verification

- [x] 7.1 Verify `/docs` renders with no app sidebar visible (no "Manage your documents" chrome)
- [x] 7.2 Verify the top bar shows the logo/title and search trigger
- [x] 7.3 Verify clicking a sub-item in `DocsSidebar` scrolls to the correct section
- [x] 7.4 Verify scrolling through content updates the active item in `DocsSidebar`
- [x] 7.5 Verify `Ctrl+K` opens `DocsSearch`, typing filters results, selecting a result scrolls to the section and closes the dialog
- [x] 7.6 Verify the TOC card is visually compact and its toggle still works
- [x] 7.7 Run `npm run build` (or `tsc --noEmit`) and resolve any type errors from the `items` shape change and new component props
