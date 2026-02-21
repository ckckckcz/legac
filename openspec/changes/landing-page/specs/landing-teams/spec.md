## ADDED Requirements

### Requirement: Landing Teams section displays team member profiles in a grid
The system SHALL render a Teams section on the landing page that presents team members in a responsive grid of profile cards. Each card SHALL display the member's name, role, a short bio, and an avatar.

#### Scenario: Teams section is visible on the landing page
- **WHEN** a visitor loads the landing page
- **THEN** the Teams section SHALL be rendered as a distinct section below the About section

#### Scenario: Teams grid renders at least one profile card
- **WHEN** the Teams section is rendered
- **THEN** it SHALL display one or more team member cards in a grid layout

#### Scenario: Each team member card displays required fields
- **WHEN** a team member card is rendered
- **THEN** it SHALL display the member's full name, role/title, and a short bio

#### Scenario: Avatar renders with image or fallback initials
- **WHEN** a team member card is rendered and no photo URL is available
- **THEN** the `AvatarFallback` component SHALL display the member's initials so no broken image is shown

### Requirement: Teams section uses shadcn/ui Card and Avatar components
The system SHALL implement team member cards using `Card`, `CardContent`, `Avatar`, `AvatarImage`, `AvatarFallback`, and `Badge` from shadcn/ui.

#### Scenario: Team member card uses Card component
- **WHEN** the Teams section is rendered
- **THEN** each team member SHALL be wrapped in a shadcn/ui `Card` component

#### Scenario: Team member card uses Avatar component
- **WHEN** the Teams section is rendered
- **THEN** each team member's avatar SHALL use the shadcn/ui `Avatar` component

### Requirement: Team member data is defined as a static constant
The system SHALL store team member data (name, role, bio, avatar URL) as a typed array constant within the component file so it can be migrated to an external data source later.

#### Scenario: Team data is an exportable constant array
- **WHEN** the Teams component file is inspected
- **THEN** it SHALL contain a constant array (e.g. `TEAM_MEMBERS`) holding all member objects

### Requirement: Teams section is a Server Component
The system SHALL implement the Teams section as a React Server Component with no client-side interactivity.

#### Scenario: Teams component has no use-client directive
- **WHEN** the Teams component file is inspected
- **THEN** it SHALL NOT contain `"use client"` at the top of the file

### Requirement: Teams component is located in the landing folder
The system SHALL place the Teams component at `src/components/landing/LandingTeams.tsx`.

#### Scenario: Teams component file exists at the correct path
- **WHEN** the landing-teams capability is implemented
- **THEN** a file SHALL exist at `src/components/landing/LandingTeams.tsx`
