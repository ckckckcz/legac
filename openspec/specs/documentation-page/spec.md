### Requirement: Documentation page route

The system SHALL provide a protected route at `/docs` that is accessible only to authenticated users, enforced by Next.js middleware before any page content is served.

#### Scenario: Unauthenticated user is redirected from /docs

- **WHEN** an unauthenticated user navigates to `/docs`
- **THEN** the middleware redirects them to `/login?callbackUrl=/docs` without rendering any page HTML

#### Scenario: Authenticated user can access /docs

- **WHEN** an authenticated user navigates to `/docs`
- **THEN** the documentation page renders with the full layout

### Requirement: Three-region page layout

The system SHALL render the `/docs` page as a two-region docs-only layout: a docs-specific navigation sidebar on the left and a main scrollable content area on the right. The app navigation sidebar SHALL NOT be rendered on the docs page.

#### Scenario: Layout renders docs sidebar and content on desktop

- **WHEN** an authenticated user visits `/docs` on a desktop viewport
- **THEN** only the docs nav sidebar and the main content area are visible; the app navigation sidebar is absent

#### Scenario: Docs nav sidebar is hidden on mobile

- **WHEN** an authenticated user visits `/docs` on a mobile viewport
- **THEN** the docs nav sidebar is hidden and replaced by a trigger button that opens a Sheet drawer

#### Scenario: Main content area is independently scrollable

- **WHEN** the user scrolls within the main content area
- **THEN** the docs nav sidebar remains fixed in position

### Requirement: Docs-only layout shell

The system SHALL render a self-contained docs layout shell consisting of a minimal top bar (official `logo.png` image + search trigger) and the docs nav sidebar, with no app-level chrome such as the "Manage your documents" sidebar.

#### Scenario: Top bar renders logo/title and search trigger

- **WHEN** the docs page is rendered
- **THEN** the top bar displays the official `logo.png` image or title and a search trigger button that opens the docs command palette

#### Scenario: App sidebar is not present in docs layout

- **WHEN** the docs page is rendered
- **THEN** no app navigation sidebar or "Manage your documents" UI elements appear on the page

### Requirement: Docs navigation sidebar

The system SHALL render a docs-specific sidebar containing section groups with collapsible sub-item lists, item counts displayed as badges, an active item highlight, anchor-based navigation for sub-items, and a search affordance element that opens the docs search modal.

#### Scenario: Section groups are displayed with item counts

- **WHEN** the docs nav sidebar is rendered
- **THEN** each section group shows its name and item count (e.g. "About (70)") as a Badge

#### Scenario: Section group expands on click

- **WHEN** a user clicks a collapsed section group
- **THEN** the group expands to show its child items and the chevron icon rotates to indicate open state

#### Scenario: Section group collapses on click

- **WHEN** a user clicks an expanded section group
- **THEN** the group collapses, hiding its child items and rotating the chevron back

#### Scenario: Active item is visually highlighted

- **WHEN** a navigation item is the currently selected item
- **THEN** it is rendered with a highlighted background to indicate active state

#### Scenario: Sub-item click navigates to content anchor

- **WHEN** a user clicks a sub-item in the docs nav sidebar
- **THEN** the page scrolls to (or routes to) the corresponding content section via its anchor link

#### Scenario: Active item tracking updates on anchor navigation

- **WHEN** the page navigates to a content anchor (via sub-item click or search result selection)
- **THEN** the corresponding sub-item in the docs nav sidebar is highlighted as active

#### Scenario: Mobile sheet drawer contains the nav tree

- **WHEN** a user taps the menu trigger on mobile
- **THEN** a Sheet drawer opens containing the full docs navigation tree

#### Scenario: Search affordance is visible in the sidebar

- **WHEN** the docs nav sidebar is rendered and `onSearchOpen` is provided
- **THEN** a search affordance element (styled as an input with a `Ctrl+K` hint) is visible above the navigation tree

#### Scenario: Search affordance opens the search modal on click

- **WHEN** a user clicks the search affordance in the docs nav sidebar
- **THEN** the docs search modal opens

#### Scenario: Search affordance is visible in the mobile sheet drawer

- **WHEN** a user opens the mobile sheet drawer
- **THEN** the search affordance element is also present inside the drawer above the navigation tree

#### Scenario: Search affordance is absent when no callback is provided

- **WHEN** the `DocsSidebar` is rendered without an `onSearchOpen` prop
- **THEN** the search affordance element is not rendered

### Requirement: Table of Contents

The system SHALL render a compact, collapsible Table of Contents card at the top of the main content area listing the headings of the current document, with reduced padding and font size so it does not visually dominate the page.

#### Scenario: TOC is visible by default

- **WHEN** the docs page first renders
- **THEN** the Table of Contents card is expanded and shows all section heading links

#### Scenario: TOC collapses on toggle

- **WHEN** a user clicks the TOC toggle button
- **THEN** the heading list collapses and only the "Table of Contents" header row remains visible

#### Scenario: TOC expands on toggle

- **WHEN** the TOC is collapsed and the user clicks the toggle button
- **THEN** the heading list expands again

#### Scenario: TOC links are rendered as plain text anchors

- **WHEN** the TOC is expanded
- **THEN** each entry is rendered as a link styled in the muted accent color matching the reference design

#### Scenario: TOC has a reduced visual footprint

- **WHEN** the TOC card is rendered
- **THEN** it uses tighter padding and smaller font sizes compared to the previous design so it does not dominate the page layout

### Requirement: Placeholder document content

The system SHALL render static placeholder content in the main content area to demonstrate the layout, including a page title, subtitle, TOC, and body paragraphs with section headings.

#### Scenario: Placeholder content fills the main area

- **WHEN** the docs page renders
- **THEN** the main content area displays a title, subtitle, Table of Contents, and at least two body sections with headings and paragraphs
