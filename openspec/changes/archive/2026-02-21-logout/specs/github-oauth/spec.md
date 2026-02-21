## MODIFIED Requirements

### Requirement: Session Expiration and Cleanup
The system SHALL implement proper session expiration and cleanup of localStorage.

#### Scenario: Session is cleared on logout
- **WHEN** a user clicks the logout button
- **THEN** both the server session and localStorage data are cleared

#### Scenario: Expired sessions are detected and cleared
- **WHEN** a server session expires
- **THEN** localStorage is also cleared to prevent stale data

#### Scenario: Session is cleared when logout is triggered from the sidebar
- **WHEN** a user clicks the "Logout" button in the sidebar
- **THEN** `broadcastSessionClear()` is called before `signOut`, removing localStorage session and token data and firing a storage event so all other open tabs also clear their session state
