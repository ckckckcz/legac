## Context

The application currently supports dynamic documentation viewing via `/docs/[id]` which leverages a unified `DocsShell` layout. However, it lacks entry-level static pages such as an Overview and Installation guide. To provide a professional documentation experience, we need to introduce these pages while maintaining the same premium aesthetic and unified navigation.

## Goals / Non-Goals

**Goals:**

- Implement `/docs` (Overview) and `/docs/installation` routes.
- Reuse `DocsShell` and related components for UI consistency.
- Implement a unified sidebar that smoothly transitions between static and dynamic documentation content.
- Support active link highlighting for both static paths and dynamic anchors.

**Non-Goals:**

- Implementing a full CMS for these static pages (static TSX/JSX content is sufficient for now).
- Changing the existing dynamic document loading logic.

## Decisions

### 1. Route Organization

- **Decision**: Use Next.js file-based routing with `src/app/docs/page.tsx` for Overview and `src/app/docs/installation/page.tsx` for Installation.
- **Rationale**: Static routes in Next.js automatically take precedence over dynamic segments like `[id]`, making this a clean and native solution.

### 2. Access Control (Middleware)

- **Decision**: Update `middleware.ts` to explicitly allow `/docs` and `/docs/installation` for unauthenticated users, while maintaining protection for `/docs/[id]`.
- **Rationale**: `/docs/[id]` contains user-specific analysis data, whereas the overview and installation guides should be public to attract new users.
- **Implementation**: In `src/middleware.ts`, refine the `isProtectedRoute` logic to only trigger for `/docs` if the subpath is a dynamic ID, or explicitly exclude `/docs` and `/docs/installation` from the blanket protection.

### 3. Active Highlight Logic

- **Decision**: Combine `usePathname` for static route highlighting and `activeAnchor` prop for dynamic/section highlighting.
- **Rationale**: Ensures the user always knows exactly where they are in the documentation hierarchy, regardless of whether they are on a static or dynamic page.

### 4. Content Implementation

- **Decision**: Implement the content for static pages as structured JSX within the page components, heavily utilizing the `DocMarkdownRenderer` or similar styling patterns.
- **Rationale**: Allows for high-fidelity designs and rapid implementation without setting up a separate markdown ingestion pipeline for just two pages.

### 5. UI Refinements (Installation Page)

- **Decision**: Implement a "Continuous Connector Stepper".
- **Rationale**: A solid vertical line connecting steps provides better visual continuity. Numbers will be in white circles with black borders for a clean look.
- **Decision**: Use white-themed code blocks with borders and box shadows.
- **Rationale**: Matches the lighter overall theme and provides better contrast on a white page compared to blocks that are all black.
- **Decision**: Implement a more compact container for documentation content.
- **Rationale**: Prevents elements from looking "oversized" on large desktop monitors.
