# User Profile Route

## Requirements

### Requirement: Profile page is served at /user/profile/[username]

The system SHALL serve the user profile page at the `/user/profile/[username]` route, rendering the existing ProfilePage component within a sidebar layout. The `[username]` path parameter SHALL be passed to ProfilePage as the `username` prop.

#### Scenario: Navigating to /user/profile/johndoe renders the profile

- **WHEN** an authenticated user navigates to `/user/profile/johndoe`
- **THEN** the system renders the ProfilePage component with `username="johndoe"` inside the sidebar layout

#### Scenario: Profile page displays loading state while session initializes

- **WHEN** the session status is `loading`
- **THEN** the page displays a full-page loading spinner until the session is resolved

#### Scenario: Profile page prevents content flash for unauthenticated users

- **WHEN** the session status is `unauthenticated`
- **THEN** the page renders nothing (returns null) while the middleware redirect takes effect

### Requirement: Sidebar profile link uses the authenticated user's username

The system SHALL render the sidebar Profile navigation link with a dynamic href of `/user/profile/{username}`, where `{username}` is the authenticated user's GitHub username from the session.

#### Scenario: Sidebar profile link points to the current user's profile

- **WHEN** an authenticated user with GitHub username `johndoe` views any page with the sidebar
- **THEN** the Profile link in the sidebar has href `/user/profile/johndoe`

### Requirement: Old /profile route is removed

The system SHALL NOT serve any content at the `/profile` route. The route directory `src/app/profile/` SHALL be deleted.

#### Scenario: Request to /profile returns 404

- **WHEN** a user navigates to `/profile`
- **THEN** the system returns a 404 Not Found response

### Requirement: UI Dashboard Localization (Indonesian)

The system SHALL render all private dashboard areas, document management interfaces, and profile settings in Indonesian.

#### Scenario: Dashboard translation

- **WHEN** an authenticated user views their dashboard or profile
- **THEN** labels like "Your Documents", "Status", and "Action" are translated to "Dokumen Anda", "Status", dan "Aksi".
- **THEN** status badges like "Completed" become "Selesai".
- **THEN** profile labels like "Display Name" are rendered in Indonesian.
