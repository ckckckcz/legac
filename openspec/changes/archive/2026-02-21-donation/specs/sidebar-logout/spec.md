## ADDED Requirements

### Requirement: Sidebar includes a Donation navigation item
The sidebar navigation SHALL include a "Donation" item with a heart icon that links to `/user/${userId}/donation`. The item SHALL appear in the user section of the sidebar (below Profile, above Logout).

#### Scenario: Authenticated user sees Donation nav item
- **WHEN** an authenticated user views the sidebar
- **THEN** a "Donation" nav item with a heart icon is visible in the user section

#### Scenario: Donation nav item links to the correct route
- **WHEN** the user clicks the "Donation" nav item
- **THEN** the user is navigated to `/user/<userId>/donation`

#### Scenario: Donation nav item is disabled when userId is unavailable
- **WHEN** the session does not yet provide a `userId`
- **THEN** the "Donation" nav item has no `href` and is effectively disabled

## MODIFIED Requirements

### Requirement: Sidebar logout button triggers sign-out
The sidebar "Logout" button SHALL call NextAuth's `signOut` with `redirect: true` and `callbackUrl: "/"` when clicked, signing the user out and redirecting to the home page.

#### Scenario: User clicks Logout in the sidebar
- **WHEN** an authenticated user clicks the "Logout" button in the sidebar
- **THEN** the user is signed out via NextAuth and redirected to `/`

#### Scenario: Logout button is disabled while sign-out is in progress
- **WHEN** the user clicks the "Logout" button and sign-out is in progress
- **THEN** the button is disabled and cannot be clicked again until the operation completes or fails
