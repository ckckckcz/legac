## ADDED Requirements

### Requirement: RepoDetail sheet displays full repository information
The system SHALL render a `RepoDetail` component inside a shadcn/ui `Sheet` that shows the selected repository's full name, description, primary language, visibility, star count, fork count, and a direct link to the repository on GitHub.

#### Scenario: Sheet header shows repository name and GitHub link
- **WHEN** the `RepoDetail` sheet is open
- **THEN** the sheet header SHALL display the repository full name (owner/repo) and a link icon that opens the GitHub URL in a new tab

#### Scenario: Sheet displays repository metadata
- **WHEN** the `RepoDetail` sheet is open
- **THEN** the sheet SHALL display the repository description, language badge, visibility badge, star count, and fork count

### Requirement: RepoDetail displays a list of contributors
The system SHALL fetch and display the top contributors for the selected repository using the `RepoContributors` component. Up to 10 contributors SHALL be shown, ordered by contribution count descending.

#### Scenario: Contributors are listed with avatar, username, and contribution count
- **WHEN** the `RepoDetail` sheet is open and contributors data has loaded
- **THEN** each contributor SHALL be shown with their GitHub `Avatar` (with `AvatarFallback` initials), their GitHub username, and their total contribution count

#### Scenario: Contributor avatar links to their GitHub profile
- **WHEN** a contributor entry is rendered
- **THEN** clicking the avatar or username SHALL navigate to `https://github.com/{username}` in a new tab

#### Scenario: Contributors loading state uses skeletons
- **WHEN** the contributors data is being fetched
- **THEN** skeleton placeholder rows SHALL be displayed

#### Scenario: Empty contributors list is handled gracefully
- **WHEN** the API returns an empty contributors array
- **THEN** the system SHALL display "No contributors found" and SHALL NOT crash

### Requirement: RepoDetail displays recent commits
The system SHALL fetch and display the most recent commits for the selected repository using the `RepoCommits` component. Up to 10 commits SHALL be shown, ordered by date descending.

#### Scenario: Each commit row displays required fields
- **WHEN** the `RepoDetail` sheet is open and commits data has loaded
- **THEN** each commit row SHALL display: the shortened commit SHA (first 7 characters), the commit message, the author's name, and the commit date formatted as a relative or absolute date

#### Scenario: Commit SHA links to the commit on GitHub
- **WHEN** a commit row is rendered
- **THEN** the SHA badge SHALL be a link that opens `https://github.com/{owner}/{repo}/commit/{sha}` in a new tab

#### Scenario: Commits loading state uses skeletons
- **WHEN** the commits data is being fetched
- **THEN** skeleton placeholder rows SHALL be displayed

#### Scenario: Empty commits list is handled gracefully
- **WHEN** the API returns an empty commits array
- **THEN** the system SHALL display "No commits found" and SHALL NOT crash

### Requirement: RepoDetail displays a "Generate Legacy Code" button
The system SHALL render a prominent "Generate Legacy Code" `Button` within the `RepoDetail` sheet. In this phase the button SHALL be in a disabled state with a "Coming soon" tooltip.

#### Scenario: Generate Legacy Code button is visible in the sheet
- **WHEN** the `RepoDetail` sheet is open
- **THEN** a `Button` labelled "Generate Legacy Code" SHALL be visible

#### Scenario: Generate Legacy Code button is disabled with tooltip
- **WHEN** the user hovers over or focuses the "Generate Legacy Code" button
- **THEN** the button SHALL be visually disabled and SHALL display a "Coming soon" tooltip or label

### Requirement: RepoDetail sheet is closable
The system SHALL allow the user to dismiss the `RepoDetail` sheet by clicking outside it, pressing Escape, or clicking an explicit close button.

#### Scenario: Sheet closes when user clicks outside or presses Escape
- **WHEN** the `RepoDetail` sheet is open and the user clicks the overlay or presses Escape
- **THEN** the sheet SHALL close and the repository list SHALL remain visible and unchanged
