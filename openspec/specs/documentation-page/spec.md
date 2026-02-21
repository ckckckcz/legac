### Requirement: Documentation page route
The system SHALL provide a protected route at `/docs` that is accessible only to authenticated users, enforced by Next.js middleware before any page content is served.

#### Scenario: Unauthenticated user is redirected from /docs
- **WHEN** an unauthenticated user navigates to `/docs`
- **THEN** the middleware redirects them to `/login?callbackUrl=/docs` without rendering any page HTML

#### Scenario: Authenticated user can access /docs
- **WHEN** an authenticated user navigates to `/docs`
- **THEN** the documentation page renders with the full layout

### Requirement: Three-region page layout
The system SHALL render the `/docs` page as a three-region layout: the app navigation sidebar on the far left, a docs-specific section navigation sidebar in the middle-left, and a main scrollable content area on the right.

#### Scenario: Layout renders all three regions on desktop
- **WHEN** an authenticated user visits `/docs` on a desktop viewport
- **THEN** the app sidebar, docs nav sidebar, and main content area are all visible simultaneously

#### Scenario: Docs nav sidebar is hidden on mobile
- **WHEN** an authenticated user visits `/docs` on a mobile viewport
- **THEN** the docs nav sidebar is hidden and replaced by a trigger button that opens a Sheet drawer

#### Scenario: Main content area is independently scrollable
- **WHEN** the user scrolls within the main content area
- **THEN** the app sidebar and docs nav sidebar remain fixed in position

### Requirement: Docs navigation sidebar
The system SHALL render a docs-specific sidebar containing section groups with collapsible sub-item lists, item counts displayed as badges, and an active item highlight.

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

#### Scenario: Mobile sheet drawer contains the nav tree
- **WHEN** a user taps the menu trigger on mobile
- **THEN** a Sheet drawer opens containing the full docs navigation tree

### Requirement: Table of Contents
The system SHALL render a collapsible Table of Contents card at the top of the main content area listing the headings of the current document.

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

### Requirement: Placeholder document content
The system SHALL render static placeholder content in the main content area to demonstrate the layout, including a page title, subtitle, TOC, and body paragraphs with section headings.

#### Scenario: Placeholder content fills the main area
- **WHEN** the docs page renders
- **THEN** the main content area displays a title, subtitle, Table of Contents, and at least two body sections with headings and paragraphs
