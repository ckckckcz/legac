# Tasks

## 1. Environment & Data Setup

- [x] Install required libraries: `react-markdown`, `remark-gfm`, and `@tailwindcss/typography`
- [x] Update `tailwind.config.ts` to include the `@tailwindcss/typography` plugin
- [x] Enhance mock document data with a `content` field containing sample Markdown for testing
- [x] Create mock data for GitHub repositories (`src/lib/mock-repos.ts`)

## 2. Shared Components

- [x] Create `DocMarkdownRenderer` component in `src/components/docs/DocMarkdownRenderer.tsx`
- [x] Implement Markdown rendering using `react-markdown` and `remark-gfm`
- [x] Apply `prose` classes for styling and handle empty/null content states
- [x] Ensure code blocks have distinct styling
- [x] Create `GitHubRepoSelector` component in `src/components/repos/GitHubRepoSelector.tsx`

## 3. Document Viewer Page (`/docs/[id]`)

- [x] Create route at `src/app/docs/[id]/page.tsx`
- [x] Implement authentication guard using `useSession` and redirect to `/login`
- [x] Implement data fetching (from mock data) and handle "Document not found" state
- [x] Display document header with metadata (name, type, status)
- [x] Create a responsive layout with a main content area and a right sidebar for ToC on desktop

## 4. Main Docs Page Revamp (`/docs/page.tsx`)

- [x] Replace entire content of `src/app/docs/page.tsx` with a new premium design
- [x] Integrate `DocMarkdownRenderer` to display the product documentation content
- [x] Add a "Connect GitHub" section to the main documentation page
- [x] Integrate `GitHubRepoSelector` into the main docs page
- [x] Ensure consistent use of brand blue (#34558b) and premium typography

## 5. Navigation & Table of Contents

- [x] Implement a utility to extract headings (H2, H3) from the Markdown content
- [x] Integrate the heading list into the `TableOfContents` component
- [x] Ensure the ToC is sticky on desktop and hidden on mobile
- [x] Verify that clicking ToC links scrolls to the correct section

## 6. Verification & Polish

- [x] Verify the complete flow from `DocumentCard` click to document viewer
- [x] Test with various Markdown elements (tables, lists, code blocks)
- [x] Ensure loading states and skeleton UI are working correctly
- [x] Perform a final UI pass to ensure consistency with the brand design
