## ADDED Requirements

### Requirement: Session sync component mounts at app root
The system SHALL render a dedicated `SessionSync` client component inside `AuthSessionProvider` that calls `useSessionWithStorage()`, ensuring localStorage is populated with session data and JWT token for every authenticated page in the application.

#### Scenario: Session data is written to localStorage after login
- **WHEN** a user completes GitHub OAuth login
- **THEN** `SessionSync` triggers `useSessionWithStorage` which stores user data and JWT token in localStorage before any page-specific component renders

#### Scenario: Session sync runs on all routes
- **WHEN** an authenticated user navigates to any page in the application
- **THEN** `SessionSync` is mounted and the session remains synchronized with localStorage

#### Scenario: Token is cleared from localStorage on logout
- **WHEN** a user logs out from any page
- **THEN** `SessionSync` detects `status === 'unauthenticated'` and clears localStorage session data and JWT token

#### Scenario: Component renders no visible UI
- **WHEN** `SessionSync` is mounted
- **THEN** it renders nothing visible to the user (returns null)
