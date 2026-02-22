## ADDED Requirements

### Requirement: Route /docs/[id] exists and is auth-guarded
The system SHALL provide a route at `/docs/[id]` that is only accessible to authenticated users. Unauthenticated users SHALL be redirected to the login page.

#### Scenario: Authenticated user accesses document viewer
- **WHEN** an authenticated user navigates to `/docs/[id]`
- **THEN** the page renders the document viewer for that document ID

#### Scenario: Unauthenticated user accesses document viewer
- **WHEN** an unauthenticated user navigates to `/docs/[id]`
- **THEN** the system redirects the user to the login page

### Requirement: Document header displays metadata
The system SHALL display the document's name, type, status, and relevant metadata at the top of the viewer page.

#### Scenario: Document found in mock data
- **WHEN** the viewer page loads with a valid document ID
- **THEN** the header shows the document name, type badge, and status badge

#### Scenario: Document not found
- **WHEN** the viewer page loads with an ID that does not match any document in mock data
- **THEN** the system displays a not-found message (e.g., "Document not found")

### Requirement: Document Markdown content is rendered in the main area
The system SHALL render the document's Markdown content using the `DocMarkdownRenderer` component in the main content area of the page.

#### Scenario: Document has Markdown content
- **WHEN** the viewer page loads a document with a non-empty `content` field
- **THEN** the Markdown is rendered as styled HTML in the main content area

#### Scenario: Document has no content
- **WHEN** the viewer page loads a document with an empty or missing `content` field
- **THEN** a graceful placeholder message is shown instead of an empty area

### Requirement: Sticky Table of Contents on desktop
The system SHALL display a sticky Table of Contents (ToC) on the right side of the page on desktop viewports, extracted automatically from the headings in the Markdown content.

#### Scenario: Content has multiple headings
- **WHEN** the Markdown content contains H2 or H3 headings
- **THEN** the ToC sidebar renders a list of those headings as navigation links

#### Scenario: Content has no headings
- **WHEN** the Markdown content contains no headings
- **THEN** the ToC sidebar is hidden or empty

#### Scenario: Page viewed on mobile viewport
- **WHEN** the page is viewed on a small screen (mobile)
- **THEN** the sticky ToC sidebar is hidden and only the main content is shown

### Requirement: Loading state is handled gracefully
The system SHALL display a loading indicator while document data is being prepared or resolved.

#### Scenario: Page is in loading state
- **WHEN** the document data has not yet been resolved
- **THEN** a loading skeleton or spinner is displayed in place of the document content
