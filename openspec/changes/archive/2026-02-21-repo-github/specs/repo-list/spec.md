## ADDED Requirements

### Requirement: Repository tab is accessible from the user dashboard page
The system SHALL display a "Repository" tab on the `user/[id]` page, implemented using shadcn/ui `Tabs`, alongside the existing Document Management tab.

#### Scenario: Repository tab is visible when user is authenticated
- **WHEN** an authenticated user navigates to `user/[id]`
- **THEN** the page SHALL display at least two tabs: one for existing content and one labelled "Repository"

#### Scenario: Clicking Repository tab shows the repo list
- **WHEN** an authenticated user clicks the "Repository" tab
- **THEN** the `RepoList` component SHALL be rendered within the tab panel

### Requirement: RepoList displays the authenticated user's repositories
The system SHALL fetch and display a list of GitHub repositories belonging to the currently authenticated user. The list SHALL include both public and private repositories when the OAuth token has the `repo` scope, or public repositories only when it does not.

#### Scenario: Repositories are displayed as cards
- **WHEN** the Repository tab is active and data has loaded
- **THEN** each repository SHALL be rendered as a `RepoCard` in a responsive grid or list layout

#### Scenario: Each RepoCard displays required repository metadata
- **WHEN** a `RepoCard` is rendered
- **THEN** it SHALL display: repository name, description (or a placeholder if null), programming language badge, visibility badge (Public/Private), star count, and fork count

#### Scenario: Private repositories are shown with a Private badge
- **WHEN** a repository has `private: true` in the API response
- **THEN** its `RepoCard` SHALL display a "Private" `Badge` using a visually distinct style

#### Scenario: Graceful degradation when repo scope is absent
- **WHEN** the OAuth token does not have `repo` scope and only public repositories are returned
- **THEN** the system SHALL display an informational notice: "Showing public repositories only"
- **THEN** the repository list SHALL still render without errors

#### Scenario: Loading state is shown while fetching repositories
- **WHEN** the Repository tab is first activated and data is being fetched
- **THEN** skeleton placeholder cards SHALL be displayed using the shadcn/ui `Skeleton` component

#### Scenario: Error state is shown when fetch fails
- **WHEN** the `/api/repos` request returns a non-2xx response
- **THEN** an error message SHALL be displayed and the list SHALL NOT crash

### Requirement: RepoList supports search filtering
The system SHALL provide a search input that filters the displayed repository list client-side by repository name.

#### Scenario: Typing in the search input filters repos by name
- **WHEN** the user types text into the search input
- **THEN** only repositories whose names contain the search string (case-insensitive) SHALL be shown

#### Scenario: Empty search shows all repositories
- **WHEN** the search input is empty
- **THEN** all fetched repositories SHALL be displayed

### Requirement: RepoCard is interactive and opens the detail sheet
The system SHALL make each `RepoCard` clickable. Clicking a card SHALL open the `RepoDetail` sheet for that repository.

#### Scenario: Clicking a RepoCard opens the Sheet
- **WHEN** the user clicks on a `RepoCard`
- **THEN** the shadcn/ui `Sheet` component SHALL open from the right side of the screen
- **THEN** the sheet SHALL display the detail view for the selected repository
