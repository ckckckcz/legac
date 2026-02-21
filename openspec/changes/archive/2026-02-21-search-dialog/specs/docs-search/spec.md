## MODIFIED Requirements

### Requirement: Docs search command palette
The system SHALL provide a `Ctrl+K` keyboard shortcut that opens a search command palette allowing users to search across documentation section titles and item names, and navigate to the matching content anchor on selection. The command palette modal panel (input field and results list) SHALL be rendered visibly when opened, regardless of the CSS overflow or positioning context of the surrounding layout.

#### Scenario: Ctrl+K opens the search palette
- **WHEN** the user presses `Ctrl+K` (or `Cmd+K` on macOS) while on the docs page
- **THEN** a modal command palette dialog opens using the shadcn `Command` + `Dialog` components

#### Scenario: Search palette panel is visible when opened
- **WHEN** the command palette is opened via any trigger
- **THEN** the modal panel containing the search input and results list is visibly rendered on screen, not obscured by the overlay or clipped by any ancestor layout

#### Scenario: Search filters results by query
- **WHEN** the user types a query in the command palette input
- **THEN** the results list updates to show only section titles and item names that match the query (case-insensitive)

#### Scenario: Selecting a result navigates to the anchor
- **WHEN** the user clicks or keyboard-confirms a search result
- **THEN** the dialog closes and the page scrolls to the corresponding content anchor for that section or item

#### Scenario: Empty query shows all searchable entries
- **WHEN** the command palette is opened with an empty input
- **THEN** all section titles and item names are shown as selectable results

#### Scenario: No results message shown for unmatched query
- **WHEN** the user types a query that matches no section titles or item names
- **THEN** the results list displays a "No results found" message

#### Scenario: Escape closes the search palette
- **WHEN** the command palette is open and the user presses `Escape`
- **THEN** the dialog closes without navigating anywhere

#### Scenario: Search trigger button in top bar opens palette
- **WHEN** the user clicks the search trigger button in the docs top bar
- **THEN** the command palette dialog opens, equivalent to pressing `Ctrl+K`
