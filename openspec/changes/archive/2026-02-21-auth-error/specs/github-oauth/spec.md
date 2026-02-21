## MODIFIED Requirements

### Requirement: Client-Side Session Management
The system SHALL provide client-side access to session data via useSession hook and SessionProvider. The profile page SHALL use the authenticated user's GitHub username from the session as the primary source for profile data, falling back to a `?user=` query parameter for viewing other users' profiles.

#### Scenario: Components can access session data
- **WHEN** a component calls useSession()
- **THEN** it returns the current user's session data including user information

#### Scenario: SessionProvider wraps the app
- **WHEN** the application starts
- **THEN** all components have access to SessionProvider context

#### Scenario: Component detects loading state
- **WHEN** a component uses useSession() during initialization
- **THEN** the hook returns a loading state

#### Scenario: Component detects authentication status
- **WHEN** a component uses useSession()
- **THEN** the hook returns whether the user is authenticated

#### Scenario: Protected route checks session
- **WHEN** a user visits a protected route
- **THEN** the component checks if the user is authenticated

#### Scenario: Profile page displays authenticated user's GitHub profile
- **WHEN** an authenticated user navigates to /profile
- **THEN** the page fetches and displays the GitHub profile of the currently signed-in user, not a hardcoded default

#### Scenario: Profile page redirects unauthenticated users
- **WHEN** an unauthenticated user navigates to /profile
- **THEN** they are redirected to /login with callbackUrl=/profile preserved

#### Scenario: Profile page shows loading state while session resolves
- **WHEN** a user navigates to /profile and the session is still initializing
- **THEN** a skeleton loading state is shown until the session and profile data are ready
