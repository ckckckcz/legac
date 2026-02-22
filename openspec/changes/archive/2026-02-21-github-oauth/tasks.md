## 1. Setup and Dependencies

- [x] 1.1 Install `next-auth@beta` package
- [x] 1.2 Generate `AUTH_SECRET` using `openssl rand -base64 32`
- [x] 1.3 Create GitHub OAuth application in GitHub Settings → Developer Settings → OAuth Apps
- [x] 1.4 Configure GitHub OAuth app with Authorization callback URL
- [x] 1.5 Set environment variables (`GITHUB_ID`, `GITHUB_SECRET`, `AUTH_SECRET`) in `.env.local`

## 2. NextAuth Configuration

- [x] 2.1 Create `src/auth.ts` with NextAuth configuration
- [x] 2.2 Configure GitHub provider with credentials from environment variables
- [x] 2.3 Configure session settings (callbacks, JWT encryption, cookie options)
- [x] 2.4 Add callback to handle user profile data from GitHub OAuth response
- [x] 2.5 Export `auth` and `signIn`, `signOut` utilities from `src/auth.ts`
- [x] 2.6 Wrap app with SessionProvider to enable useSession hook

## 3. API Route Setup

- [x] 3.1 Create directory structure `src/app/api/auth/[...nextauth]/`
- [x] 3.2 Create `src/app/api/auth/[...nextauth]/route.ts` API handler
- [x] 3.3 Export NextAuth handler for GET and POST methods
- [x] 3.4 Test OAuth callback endpoint is reachable at `/api/auth/callback/github`

## 4. Middleware Protection

- [x] 4.1 Create `src/middleware.ts` to check authentication state
- [x] 4.2 Implement route matching for protected paths (identify which routes need auth)
- [x] 4.3 Redirect unauthenticated users from protected routes to `/login`
- [x] 4.4 Allow public routes (login, home) without authentication checks

## 5. Login Page Updates

- [x] 5.1 Review `src/app/(auth)/login/page.tsx` component
- [x] 5.2 Import `signIn` function from `next-auth/react`
- [x] 5.3 Add GitHub sign-in button to login page
- [x] 5.4 Implement click handler to trigger `signIn("github")` with callback redirect
- [x] 5.5 Add sign-out functionality (button or link) that calls `signOut()`

## 6. Session and Authentication State

- [x] 6.1 Create utility function to get current session in server components
- [x] 6.2 Create hook for accessing session state in client components
- [x] 6.3 Verify user profile data (GitHub ID, username, email) is available in session
- [x] 6.4 Test authentication state check on both server and client side

## 7. Testing and Validation

- [x] 7.1 Test GitHub OAuth sign-in flow end-to-end
- [x] 7.2 Verify session persists across page reloads
- [x] 7.3 Verify session is cleared after sign-out
- [x] 7.4 Verify unauthenticated users cannot access protected routes
- [x] 7.5 Verify authenticated users can access protected routes
- [x] 7.6 Verify user profile data is correctly retrieved and stored in session
- [x] 7.7 Test missing environment variable handling (graceful degradation)
