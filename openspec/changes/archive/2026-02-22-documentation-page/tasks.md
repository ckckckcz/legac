## 1. Shared Component Updates

- [x] 1.1 Update `DocsSidebar.tsx` to include static links (Overview, Installation) as top-level navigation items.
- [x] 1.2 Implement active state logic in sidebar using `usePathname` for static routes.
- [x] 1.3 Ensure `DocsShell.tsx` correctly handles layout rendering for routes without a dynamic ID.

## 2. Static Documentation Pages

- [x] 2.1 Create `src/app/docs/page.tsx` for the Overview page.
- [x] 2.2 Implement Overview page content using premium UI sections (Hero, Key Features).
- [x] 2.3 Create `src/app/docs/installation/page.tsx` for the Installation page.
- [x] 2.4 Implement Installation page content with step-by-step setup guides and code snippets.

## 3. Navigation & UX Polish

- [x] 3.1 Verify sidebar transition between static and dynamic documentation categories.
- [x] 3.2 Add "Back to Profile" and pagination links ("Next: Installation") to static pages.
- [x] 3.3 Test responsive behavior for static pages on mobile devices (mobile sheet sidebar).

## 4. Access Control (Public Access)

- [x] 4.1 Update `src/middleware.ts` to allow public access to `/docs` and `/docs/installation`.
- [x] 4.2 Verify `/docs/[id]` remains protected and redirects unauthenticated users to login.
- [x] 4.3 Ensure buttons on static pages correctly handle the unauthenticated state (Verified: "Back to Home" is used which is public).

## 5. UI Refinements (Installation Page)

- [x] 5.1 Redesign the Installation page stepper with a premium black-and-white style.
- [x] 5.2 Implement high-contrast code blocks for CLI commands.
- [x] 5.3 Add a "Command Reference" table after the troubleshooting section.
- [x] 5.4 Update Overview page (`src/app/docs/page.tsx`) to match the new minimalist aesthetic if needed (Verified).

## 6. Style Refinements (User Feedback)

- [x] 6.1 Fix stepper to have a continuous vertical connector line.
- [x] 6.2 Redesign steps to use white background for numbers with black borders.
- [x] 6.3 Update code blocks to a light theme (white background, border, black text).
- [x] 6.4 Reduce the overall size of elements on desktop for a more compact feel.
- [x] 6.5 Update Installation page content with the specific steps (npm/npx, login, init, analyze) and full command reference.
