## Context

The application currently lacks a robust authentication mechanism. Users must manage credentials locally, increasing security burden and password recovery complexity. GitHub OAuth provides a widely-adopted identity provider that reduces password management overhead while improving user experience. This implementation uses NextAuth.js (Auth.js v5) to handle the OAuth flow, session management, and middleware protection.

The application is built with Next.js and React, making NextAuth.js the natural choice for authentication infrastructure.

## Goals / Non-Goals

**Goals:**
- Implement GitHub OAuth authentication using NextAuth.js (Auth.js v5)
- Provide secure session management with encrypted session storage
- Protect authenticated routes with middleware-based access control
- Enable seamless user sign-in/sign-out experience
- Store minimal user profile data (GitHub ID, username, email) from OAuth response
- Support both client and server-side authentication state checking

**Non-Goals:**
- User profile management or editing (beyond what OAuth provides)
- Custom user registration flow (GitHub OAuth only)
- Role-based access control (authentication only, not authorization)
- Social account linking or multiple auth providers (GitHub only for this change)
- Database storage of user profiles (session-based only)

## Decisions

### Decision 1: Use NextAuth.js (Auth.js v5) for OAuth Implementation
**Rationale**: NextAuth.js abstracts OAuth complexity, handles token exchange, session management, and provides middleware support. Auth.js v5 (currently beta) offers improved TypeScript support and a streamlined API.

**Alternatives Considered:**
- Manual OAuth implementation: Too complex, requires careful handling of token exchange, PKCE, and state validation
- Other libraries (Passport.js, Clerk): Would require additional setup; NextAuth.js is purpose-built for Next.js

### Decision 2: Session-Based Authentication with JWT Encryption
**Rationale**: NextAuth.js defaults to encrypted session tokens stored as HTTP-only cookies. This approach is secure against XSS and provides automatic session validation without requiring a database.

**Alternatives Considered:**
- Direct JWT in localStorage: Vulnerable to XSS attacks
- Server-side session storage: Requires database, adds latency and complexity

### Decision 3: Middleware-Based Route Protection
**Rationale**: Next.js middleware runs before request handling, enabling efficient authentication checks at the edge. Routes can be protected by checking session status in middleware.ts before allowing access.

**Alternatives Considered:**
- Route-level auth checks: Requires manual verification in each route handler
- Client-side redirects: Less secure, user briefly sees protected content

### Decision 4: Minimal User Profile Storage
**Rationale**: Store only GitHub-provided user ID, username, and email in the session. No local database for user profiles—the session is the source of truth.

**Alternatives Considered:**
- Store in database: Adds complexity; session-based approach is simpler for this use case
- Store full GitHub profile: Unnecessary data bloat; only essential fields captured

### Decision 5: Environment Variable-Based Configuration
**Rationale**: GitHub OAuth credentials (GITHUB_ID, GITHUB_SECRET, AUTH_SECRET) stored as environment variables, loaded at startup. This follows 12-factor app principles and keeps secrets out of code.

**Alternatives Considered:**
- Configuration file: Security risk; secrets in code repository
- Runtime fetch from vault: Added complexity for this implementation phase

## Risks / Trade-offs

**[Risk] GitHub OAuth Outage → Application Cannot Authenticate**
- **Mitigation**: Gracefully handle OAuth provider unavailability. Log warnings if credentials are missing. Consider fallback message on login page if OAuth is unreachable.

**[Risk] Leaked or Compromised AUTH_SECRET → Sessions Can Be Forged**
- **Mitigation**: Use a strong, randomly-generated AUTH_SECRET. Rotate periodically if suspected compromise. Never commit to version control.

**[Risk] User OAuth Token Expiration → Session Becomes Invalid**
- **Mitigation**: NextAuth.js handles token refresh automatically. If GitHub OAuth token expires, user may need to re-authenticate. This is acceptable as GitHub tokens are long-lived.

**[Risk] Session Cookie Theft via Network → Session Hijacking**
- **Mitigation**: Use HTTP-only, secure, SameSite cookies. Enforce HTTPS in production. Cookies are inaccessible to JavaScript, protecting against common XSS attacks.

**[Trade-off] Session-Based Approach vs. Stateless JWT**
- Sessions require some server-side state (the encryption key), but provide better security for browser-based applications. Acceptable trade-off for improved XSS protection.

## Migration Plan

**Phase 1: Setup (Initial Deploy)**
1. Install `next-auth@beta` as a dependency
2. Generate `AUTH_SECRET` using `openssl rand -base64 32`
3. Create GitHub OAuth application in GitHub Settings → Developer Settings → OAuth Apps
4. Set environment variables: `GITHUB_ID`, `GITHUB_SECRET`, `AUTH_SECRET`
5. Deploy configuration and auth files

**Phase 2: Implementation (Second Deploy)**
6. Create `src/auth.ts` with NextAuth configuration
7. Create `src/app/api/auth/[...nextauth]/route.ts` API handler
8. Create `src/middleware.ts` to protect routes
9. Update `src/app/(auth)/login/page.tsx` to include GitHub sign-in button
10. Test OAuth flow end-to-end

**Phase 3: Validation**
11. Verify sessions persist across page reloads
12. Verify sign-out clears session
13. Verify protected routes redirect unauthenticated users to login

**Rollback Strategy**: If critical issues arise, rollback to previous application version. No database migrations required (session-based only), so rollback is straightforward.

## Open Questions

1. Should we implement a "sign-out" button in the application header, or is a separate endpoint sufficient?
2. Should we display user information (GitHub username/avatar) after successful authentication?
3. Do we need logging/audit trails for authentication events, or is standard application logging sufficient?
4. Should sessions expire after inactivity, or remain valid indefinitely until manual sign-out?
