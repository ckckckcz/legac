## MODIFIED Requirements

### Requirement: Documentation page route

The system SHALL provide routes starting at `/docs`. Static routes (`/docs`, `/docs/installation`) SHALL be publicly accessible. Dynamic document routes (`/docs/[id]`) SHALL remain protected and accessible only to authenticated users, enforced by Next.js middleware.

#### Scenario: Unauthenticated user can access static docs

- **WHEN** an unauthenticated user navigates to `/docs` or `/docs/installation`
- **THEN** the system renders the requested page without redirection.

#### Scenario: Unauthenticated user is redirected from dynamic docs

- **WHEN** an unauthenticated user navigates to `/docs/123` (or any dynamic ID)
- **THEN** the middleware redirects them to `/login?callbackUrl=/docs/123`.

#### Scenario: Authenticated user can access all docs

- **WHEN** an authenticated user navigates to any `/docs` path
- **THEN** the page renders with the full layout.

### Requirement: Docs navigation sidebar

The system SHALL render a docs-specific sidebar containing global static navigation links (Overview, Installation) and dynamic section groups for repositories/documents. It SHALL support collapsible sub-item lists, item counts displayed as badges, an active item highlight, and a search affordance.

#### Scenario: Sidebar displays both static and dynamic items

- **WHEN** the docs nav sidebar is rendered
- **THEN** it shows "Overview" and "Installation" as top-level items, followed by dynamic document groups.

#### Scenario: Active item is visually highlighted across static and dynamic routes

- **WHEN** a user is on a specific documentation route (static or dynamic)
- **THEN** the corresponding item in the sidebar is rendered with a highlighted background.
