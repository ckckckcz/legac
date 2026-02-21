## MODIFIED Requirements

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
