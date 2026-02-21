## MODIFIED Requirements

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
The system SHALL render a self-contained docs layout shell consisting of a minimal top bar (logo/title + search trigger) and the docs nav sidebar, with no app-level chrome such as the "Manage your documents" sidebar.

#### Scenario: Top bar renders logo/title and search trigger
- **WHEN** the docs page is rendered
- **THEN** the top bar displays the application logo or title and a search trigger button that opens the docs command palette

#### Scenario: App sidebar is not present in docs layout
- **WHEN** the docs page is rendered
- **THEN** no app navigation sidebar or "Manage your documents" UI elements appear on the page

### Requirement: Docs navigation sidebar
The system SHALL render a docs-specific sidebar containing section groups with collapsible sub-item lists, item counts displayed as badges, an active item highlight, and anchor-based navigation for sub-items.

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
