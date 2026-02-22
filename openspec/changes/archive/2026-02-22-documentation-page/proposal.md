## Why

The current documentation system is focused on dynamic content loaded by ID (`/docs/[id]`). There is a need for structural documentation pages (Overview, Installation) that provide a consistent landing experience for the documentation section. Crucially, these static landing pages should be accessible to everyone (public), while dynamic document content remains protected for authenticated users.

## What Changes

- Create new static documentation routes in `src/app/docs`.
- Implement an `Overview` page and an `Installation` page.
- **UI Refinement**: Enhance the Installation page with a continuous connector stepper (white base with black borders for numbers), white-themed code blocks with borders, and a more compact desktop layout.
- Update the documentation navigation to include these static sections.
- **Access Control**: Update middleware to allow public access to `/docs` and `/docs/installation`, while keeping `/docs/[id]` restricted to logged-in users.
- Reuse the existing `DocsShell` and styling for a cohesive experience.

## Capabilities

### New Capabilities

- `docs-static-pages`: Static documentation pages for Overview and Installation with a unified sidebar navigation.

### Modified Capabilities

- `documentation-page`: Extend the existing documentation layout and navigation logic to support static routes.

## Impact

- `src/app/docs`: New folder structure for static pages.
- `src/components/docs/DocsLayout.tsx`: Potential updates to shared layout components to handle static vs dynamic routing.
- `src/components/docs/DocsSidebar.tsx`: Update sidebar to include the new Overview and Installation links.
