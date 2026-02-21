### Requirement: Sidebar logout button triggers sign-out
The sidebar "Logout" button SHALL call NextAuth's `signOut` with `redirect: true` and `callbackUrl: "/"` when clicked, signing the user out and redirecting to the home page.

#### Scenario: User clicks Logout in the sidebar
- **WHEN** an authenticated user clicks the "Logout" button in the sidebar
- **THEN** the user is signed out via NextAuth and redirected to `/`

#### Scenario: Logout button is disabled while sign-out is in progress
- **WHEN** the user clicks the "Logout" button and sign-out is in progress
- **THEN** the button is disabled and cannot be clicked again until the operation completes or fails

### Requirement: Sidebar logout broadcasts session clear to other tabs
Before calling `signOut`, the sidebar logout handler SHALL call `broadcastSessionClear()` to remove session and token data from localStorage and notify all other open browser tabs.

#### Scenario: localStorage is cleared on logout
- **WHEN** a user clicks "Logout" in the sidebar
- **THEN** `SESSION_STORAGE_KEY` and `TOKEN_STORAGE_KEY` are removed from localStorage before the NextAuth sign-out redirect occurs

#### Scenario: Other open tabs detect the logout broadcast
- **WHEN** a user logs out in one browser tab
- **THEN** other tabs listening for the `legac_session_cleared` storage event also clear their session state

### Requirement: Sidebar logout displays error on failure
If `signOut` throws, the sidebar SHALL display an inline error message and re-enable the "Logout" button so the user can retry.

#### Scenario: Sign-out error is shown inline
- **WHEN** `signOut` throws an error
- **THEN** an error message is shown below the "Logout" button and the button is re-enabled

#### Scenario: Logout button re-enables after error
- **WHEN** the sign-out call fails
- **THEN** the "Logout" button is no longer disabled and the user can attempt logout again
