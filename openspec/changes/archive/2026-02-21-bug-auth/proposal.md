## Why

Users cannot authenticate with GitHub OAuth - the login flow fails to redirect to GitHub, and JWT tokens aren't being stored properly, preventing session management across page reloads. The application lacks proper environment configuration for GitHub OAuth credentials and session security.

## What Changes

- Configure GitHub OAuth provider with GITHUB_ID and GITHUB_SECRET environment variables
- Set up AUTH_SECRET for NextAuth session encryption and security
- Implement proper client-side session management using NextAuth hooks (useSession)
- Add localStorage integration for JWT token and session persistence
- Fix OAuth redirect callback handling to properly redirect users after authentication
- Ensure session data persists across page reloads and browser navigation
- Add proper error handling and user feedback for authentication failures

## Capabilities

### New Capabilities
- `github-oauth-setup`: Configure GitHub OAuth provider with proper credentials and environment variables
- `auth-secret-configuration`: Set up AUTH_SECRET for NextAuth session encryption
- `client-session-management`: Client-side session management using NextAuth hooks and utilities
- `jwt-localStorage-persistence`: JWT token and session data storage in localStorage
- `oauth-redirect-flow`: Fix OAuth redirect callback handling and post-login redirection
- `session-persistence`: Maintain session data across page reloads and browser navigation
- `auth-error-handling`: Proper error messages and user feedback for authentication failures

### Modified Capabilities

## Impact

- **NextAuth Configuration** (`src/auth.ts`): Add environment variable handling and session callbacks
- **Login Page** (`src/app/(auth)/login/page.tsx`): Add session management and localStorage handling
- **Environment Configuration** (`.env.local`, `.env.example`): Add GITHUB_ID, GITHUB_SECRET, AUTH_SECRET
- **Client Components**: Need useSession hook integration for protected routes
- **Session Provider**: May need to wrap application with SessionProvider for client-side session access
- **Authentication Flow**: Complete OAuth redirect and callback chain
