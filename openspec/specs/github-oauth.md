# GitHub OAuth Implementation

## Summary
Implement complete authentication using GitHub OAuth provider via NextAuth.js (Auth.js v5). This includes OAuth provider setup, session management, localStorage synchronization for JWT tokens, protected routes, error handling with user feedback, and multi-tab session synchronization. The login page already has a UI button for "Log In with GitHub" that needs to be wired up to actual authentication logic with comprehensive security and persistence features.

## Technical Details
- **Framework**: Start with installing `next-auth@beta`.
- **Environment**: Use `.env.local` for secrets.
  - `AUTH_GITHUB_ID`
  - `AUTH_GITHUB_SECRET`
  - `AUTH_SECRET` (generate with `npx auth secret` or similar)
- **Session Storage**: Dual-layer persistence with httpOnly cookies (server-side) and localStorage (client-side)
- **Token Management**: JWT tokens stored in localStorage for client-side API access
- **Security**: Session encryption with AUTH_SECRET, CORS headers for token requests, open redirect validation
- **UX**: Loading indicators, error messages, retry options, multi-tab session synchronization

## Implementation Steps

### 1. Install Dependencies
Install the required package:
```bash
npm install next-auth@beta
```

### 2. Configuration Setup
Create a main configuration file at `src/auth.ts`:
- Configure the GitHub provider using `next-auth/providers/github` with GITHUB_ID and GITHUB_SECRET
- Export `{ handlers, signIn, signOut, auth }` from `NextAuth(config)`
- Configure JWT callback to generate and sign tokens with AUTH_SECRET
- Configure session callback to enrich session data with user information
- Set session cookie settings for security (httpOnly, secure, sameSite)
- Add redirect callback for post-login routing

### 3. API Route Handler
Create an API route at `src/app/api/auth/[...nextauth]/route.ts`:
- Import `handlers` from `src/auth.ts`
- Export `GET` and `POST` methods

### 4. SessionProvider Integration
Wrap the application with NextAuth's SessionProvider at the root layout to enable client-side session management and useSession hooks in all components.

### 5. Client-Side Session Management
Create custom hooks and utilities for localStorage integration:
- Create `useSessionStorage()` hook for localStorage management
- Create `useSessionWithStorage()` hook that combines useSession with localStorage sync
- Implement session data serialization/deserialization for localStorage
- Add TypeScript types for stored session data

### 6. JWT Token Storage and Synchronization
- Extract JWT token from NextAuth session in custom hooks
- Store JWT token in localStorage when user authenticates
- Retrieve JWT token from localStorage on page load before server session validation
- Keep localStorage token synchronized with server-side session
- Implement secure token retrieval function for API calls

### 7. Multi-Tab Session Synchronization
- Implement storage event listeners to sync session across tabs
- Detect logout in one tab and clear session in all tabs
- Create utility functions for cross-tab synchronization

### 8. Middleware (Optional but Recommended)
Create `src/middleware.ts` to protect routes or manage session updates, importing `auth` from `src/auth.ts`.

### 9. Update Login Page
Modify `src/app/(auth)/login/page.tsx`:
- Check session status with useSession hook and redirect authenticated users
- Add loading indicator during OAuth redirect
- Display error messages from OAuth provider failures
- Add retry button for failed login attempts
- Add callbackUrl parameter for post-login redirect to originally requested page
- Implement open redirect validation
- Add accessibility improvements (ARIA labels, keyboard navigation)

### 10. Protected Routes
- Create ProtectedRoute component to check session status
- Redirect unauthenticated users to login page with callbackUrl preservation
- Implement session validation error handling
- Show loading state while checking authentication

### 11. Error Handling
- Create error boundary component for authentication errors
- Display clear error messages for OAuth failures
- Handle network errors during authentication with retry options
- Handle session validation failures and provide re-authentication prompts
- Log authentication errors for debugging

### 12. Environment Variables
Add the following to `.env`:
```
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
AUTH_SECRET=...
```

## Requirements

### GitHub OAuth Provider Credentials Configuration
The system SHALL configure the GitHub OAuth provider with GITHUB_ID and GITHUB_SECRET environment variables.

#### Scenario: Environment variables are properly set
- **WHEN** the application starts
- **THEN** NextAuth reads GITHUB_ID and GITHUB_SECRET from environment variables

#### Scenario: GitHub OAuth provider is registered
- **WHEN** a user visits the login page
- **THEN** the GitHub OAuth provider is available as an authentication option

#### Scenario: Missing credentials are detected
- **WHEN** GITHUB_ID or GITHUB_SECRET environment variables are missing
- **THEN** the application logs a warning message during startup

### AUTH_SECRET Configuration
The system SHALL require AUTH_SECRET to be set as an environment variable for session encryption and JWT signing.

#### Scenario: AUTH_SECRET is configured
- **WHEN** the application starts
- **THEN** NextAuth reads AUTH_SECRET from the environment variables

#### Scenario: Sessions are encrypted
- **WHEN** a user authenticates successfully
- **THEN** the session data is encrypted using AUTH_SECRET

#### Scenario: JWT tokens are properly signed
- **WHEN** a JWT token is created
- **THEN** it is signed with the AUTH_SECRET key

### OAuth Callback URL Handling
The system SHALL properly handle GitHub OAuth callbacks and redirect users correctly.

#### Scenario: OAuth callback URL matches configuration
- **WHEN** GitHub OAuth completes authentication
- **THEN** the callback URL matches the configuration in both the application and GitHub OAuth app

#### Scenario: User is redirected after successful authentication
- **WHEN** GitHub OAuth authentication completes successfully
- **THEN** the user is redirected to the dashboard or home page

#### Scenario: User is redirected to originally requested page
- **WHEN** a user was redirected to login from a protected route
- **THEN** after authentication, the user is redirected back to that original page

#### Scenario: Invalid redirect URLs are rejected
- **WHEN** a redirect URL is not in the allowlist
- **THEN** the redirect is rejected and the user is sent to a default safe page

### Client-Side Session Management
The system SHALL provide client-side access to session data via useSession hook and SessionProvider. The profile page SHALL use the authenticated user's GitHub username from the session as the primary source for profile data, falling back to a `?user=` query parameter for viewing other users' profiles. The JWT callback SHALL ensure `session.user.username` is always a non-null string for authenticated users across all token refresh cycles, not only on first sign-in.

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
- **THEN** the Next.js middleware checks the session server-side and redirects unauthenticated users to `/login` before the page is rendered

#### Scenario: Profile page displays authenticated user's GitHub profile
- **WHEN** an authenticated user navigates to /profile
- **THEN** the page fetches and displays the GitHub profile of the currently signed-in user, not a hardcoded default

#### Scenario: Profile page redirects unauthenticated users
- **WHEN** an unauthenticated user navigates to /profile
- **THEN** they are redirected to /login with callbackUrl=/profile preserved, enforced by Next.js middleware before any page HTML is served

#### Scenario: Profile page shows loading state while session resolves
- **WHEN** a user navigates to /profile and the session is still initializing
- **THEN** a skeleton loading state is shown until the session and profile data are ready

#### Scenario: Username is available in session on every page load
- **WHEN** an authenticated user loads any page after their initial sign-in
- **THEN** `session.user.username` is a non-null string identifying their GitHub account

#### Scenario: Username persists across JWT token refreshes
- **WHEN** an authenticated user's JWT token is refreshed by NextAuth
- **THEN** `session.user.username` retains its value and is not lost due to the absence of the `user` argument in the JWT callback

### JWT Token Storage in localStorage
The system SHALL store JWT tokens in localStorage to persist session tokens across page reloads.

#### Scenario: JWT token is stored in localStorage after authentication
- **WHEN** a user successfully authenticates with GitHub OAuth
- **THEN** the JWT token is stored in localStorage

#### Scenario: JWT token is retrieved from localStorage on page load
- **WHEN** a page reloads after user authentication
- **THEN** the JWT token is retrieved from localStorage

#### Scenario: localStorage is updated when server session changes
- **WHEN** the server session is updated or invalidated
- **THEN** localStorage is also updated to reflect the new state

#### Scenario: Token is used with proper headers
- **WHEN** client-side code uses the JWT token for API requests
- **THEN** tokens are sent via secure headers

### Session Data localStorage Persistence
The system SHALL store session user data in localStorage for quick client-side access.

#### Scenario: Session user data is stored in localStorage
- **WHEN** a user authenticates successfully
- **THEN** user data (name, email, GitHub profile info) is stored in localStorage

#### Scenario: Session data is available immediately on page load
- **WHEN** a page reloads after authentication
- **THEN** user session data is available from localStorage immediately

### Session Persistence Across Reloads and Navigation
The system SHALL maintain user session data across page reloads and browser navigation.

#### Scenario: Session persists after page reload
- **WHEN** a user reloads the page after authentication
- **THEN** the user remains logged in and session data is restored

#### Scenario: Session is restored from localStorage on initial page load
- **WHEN** a page loads after previous authentication
- **THEN** session data is restored from localStorage immediately

#### Scenario: Session persists during browser navigation
- **WHEN** a user navigates using back/forward buttons
- **THEN** the user remains authenticated and session data is available

### Multi-Tab Session Synchronization
The system SHALL synchronize session state across multiple browser tabs.

#### Scenario: Logout in one tab logs out all tabs
- **WHEN** a user logs out in one browser tab
- **THEN** all other open tabs automatically log out the user

### Session Expiration and Cleanup
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

### Authentication Error Handling
The system SHALL display clear error messages when authentication fails.

#### Scenario: OAuth provider error is displayed
- **WHEN** GitHub OAuth returns an error
- **THEN** the error is displayed to the user with an explanation

#### Scenario: Configuration error is logged
- **WHEN** GitHub OAuth credentials are missing or misconfigured
- **THEN** a clear error message is logged or displayed

#### Scenario: Network error during OAuth flow is handled
- **WHEN** a network error occurs during OAuth authentication
- **THEN** the user is informed and given an option to retry

### User Feedback During Authentication
The system SHALL provide visual feedback to users during the authentication process.

#### Scenario: Loading indicator is shown during OAuth redirect
- **WHEN** a user clicks the GitHub login button
- **THEN** a loading indicator is shown while OAuth redirect is happening

#### Scenario: Loading state is maintained during callback
- **WHEN** the OAuth callback is processing
- **THEN** a loading indicator is shown to the user

### Session Validation Error Handling
The system SHALL handle cases where a stored session becomes invalid.

#### Scenario: Invalid stored session is detected
- **WHEN** a stored session in localStorage or cookies is invalid or expired
- **THEN** the user is informed and redirected to login

#### Scenario: Server session mismatch is handled
- **WHEN** the client session and server session become out of sync
- **THEN** the user is informed and asked to re-authenticate

## Acceptance Criteria
- [ ] User can click "Log In with GitHub" on `/login`
- [ ] User is redirected to GitHub to authorize
- [ ] User is redirected back to the app after successful login
- [ ] Session is persisted across page reloads
- [ ] JWT token is stored in localStorage and synchronized with server session
- [ ] Error messages are displayed for authentication failures and network errors
- [ ] Logout in one tab logs out all open tabs automatically
- [ ] Protected routes require authentication and redirect to login when necessary
- [ ] Session data is available immediately from localStorage on page load
- [ ] Session remains valid during browser back/forward navigation
