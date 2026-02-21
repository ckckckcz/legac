## Context

The application uses NextAuth for authentication but has incomplete OAuth configuration. GitHub OAuth provider is configured without credentials, missing AUTH_SECRET for session encryption, and the client-side lacks proper session management. Users report:
1. GitHub OAuth doesn't redirect to GitHub login page
2. JWT tokens aren't stored in localStorage
3. Sessions don't persist across page reloads

NextAuth currently stores session data in secure httpOnly cookies (server-side), which is more secure than localStorage but doesn't provide client-side JavaScript access by default.

## Goals / Non-Goals

**Goals:**
- Configure GitHub OAuth with proper credentials (GITHUB_ID, GITHUB_SECRET)
- Set up AUTH_SECRET for session encryption
- Implement client-side session management using NextAuth hooks
- Add localStorage backup for JWT tokens and session data
- Fix OAuth redirect callback handling for proper post-login redirection
- Ensure session persistence across page reloads and browser navigation
- Provide proper error handling and user feedback for auth failures
- Make session data accessible to client-side components

**Non-Goals:**
- Migrate away from NextAuth (too disruptive)
- Implement custom OAuth flow
- Add multi-provider authentication beyond GitHub
- Implement 2FA or advanced security features
- Modify database schema for sessions
- Change from httpOnly cookies to less secure methods for core auth

## Decisions

### 1. Environment Variable Configuration
**Decision**: Store GitHub credentials (GITHUB_ID, GITHUB_SECRET) and AUTH_SECRET in environment variables.
- Use `.env.local` for local development
- Use environment variables in production deployment

**Rationale**: Standard practice for managing secrets, follows NextAuth conventions, supports different environments easily.

**Alternatives Considered**:
- Hardcoding (security risk)
- Environment-specific config files (harder to manage)
- Secrets management service (overkill for current needs)

### 2. Client-Side Session Management
**Decision**: Use NextAuth's `useSession` hook in client components to access session data.
- Wrap application root with `SessionProvider` from `next-auth/react`
- Use `useSession()` in components needing session data
- Store session data in React Context via SessionProvider

**Rationale**: NextAuth provides built-in hooks for client-side session access, no need for custom implementation.

**Alternatives Considered**:
- Custom context provider (unnecessary duplication)
- Global state management (adds complexity)
- Direct API calls (less efficient, no caching)

### 3. localStorage JWT Token Storage
**Decision**: Store JWT token and session data in localStorage as a backup and for JavaScript access.
- Extract token from NextAuth session in `useSession` hook
- Store serialized session and token in localStorage
- Add utility function to retrieve tokens for API calls

**Rationale**: Allows client-side JavaScript to access tokens for API requests, provides session data persistence across reloads.

**Alternatives Considered**:
- Only use secure cookies (can't access from JavaScript, but more secure)
- localStorage only without cookies (less secure, no CSRF protection)
- IndexedDB (overkill for this use case)

### 4. OAuth Redirect Flow Fix
**Decision**: Properly configure OAuth callback URL and redirect handling in NextAuth.
- Set correct callback URL in GitHub OAuth app settings
- Ensure `callbackUrl` parameter is passed to `signIn()` function
- Fix redirect destination after successful authentication

**Rationale**: OAuth requires exact callback URL match, missing or incorrect setup prevents redirect.

**Alternatives Considered**:
- Use default NextAuth callback (may not match GitHub app settings)
- Manual OAuth flow (requires custom implementation)

### 5. Session Persistence Strategy
**Decision**: Use multi-layer persistence:
- Primary: Secure httpOnly cookies (server-side session)
- Secondary: localStorage (client-side access and recovery)
- Tertiary: React Context via SessionProvider (runtime state)

**Rationale**: Provides security (httpOnly cookies), accessibility (localStorage), and performance (Context).

**Alternatives Considered**:
- Cookies only (no client-side access)
- localStorage only (less secure)
- Single source of truth (reduces flexibility)

### 6. Error Handling and User Feedback
**Decision**: Add try-catch blocks and user-friendly error messages for OAuth flow.
- Catch and log authentication errors
- Display error messages in login form
- Provide retry mechanism for failed logins

**Rationale**: Users need feedback on what went wrong and how to recover.

**Alternatives Considered**:
- Silent failures (confusing for users)
- Console logging only (not visible to users)
- Generic error messages (not helpful for debugging)

## Risks / Trade-offs

**[Risk]** Exposing JWT in localStorage - more vulnerable to XSS attacks  
→ **Mitigation**: Keep tokens short-lived, implement CSP headers, sanitize user inputs, don't store sensitive data in localStorage. Use httpOnly cookies as primary auth mechanism.

**[Risk]** Clock skew between client and server causing token validation issues  
→ **Mitigation**: Implement token refresh logic in NextAuth callbacks, adjust clock tolerance in JWT validation.

**[Risk]** Session data becoming stale if user changes permissions on GitHub  
→ **Mitigation**: Add session refresh endpoint, implement periodic token refresh (1 hour), show refresh button in UI.

**[Risk]** OAuth callback URL mismatch between app settings and code  
→ **Mitigation**: Document exact callback URL, add validation in setup checklist, auto-detect callback URL if possible.

**[Risk]** Increased complexity from multi-layer persistence  
→ **Mitigation**: Create utility functions to abstract complexity, document storage strategy clearly.

**Trade-off**: localStorage for JWT means reduced security (XSS vulnerability) vs. convenience (JavaScript access to tokens).  
**Decision**: Accept reduced security because tokens are short-lived and httpOnly cookies provide primary protection.

**Trade-off**: Storing session data in localStorage duplicates server-side session data.  
→ **Benefit**: Better offline experience and client-side accessibility.

## Migration Plan

1. **Environment Setup Phase**
   - Document required environment variables (GITHUB_ID, GITHUB_SECRET, AUTH_SECRET)
   - Create .env.local with credentials (local dev only)
   - Update .env.example with variable names and instructions

2. **NextAuth Configuration Phase**
   - Add AUTH_SECRET to auth.ts
   - Update GitHub provider with proper configuration
   - Add JWT callback for token storage
   - Add session callback for session data enrichment

3. **SessionProvider Integration Phase**
   - Wrap application with SessionProvider in root layout
   - Ensure SessionProvider is available to client components
   - Test session access in components

4. **Client-Side Session Management Phase**
   - Create custom hook for session + localStorage management
   - Implement token extraction and localStorage storage
   - Add utility functions for token retrieval

5. **OAuth Redirect Fix Phase**
   - Verify callback URL in GitHub OAuth app settings
   - Test OAuth login flow end-to-end
   - Fix any redirect issues

6. **Error Handling Phase**
   - Add error handling to login component
   - Display user-friendly error messages
   - Add retry mechanism

7. **Testing Phase**
   - Test OAuth login flow
   - Verify session persistence across page reloads
   - Test on different browsers
   - Verify token access from client-side code

8. **Deployment Phase**
   - Set environment variables in production
   - Deploy updated code
   - Monitor authentication errors
   - Have rollback plan ready (revert to previous version)

## Open Questions

1. **GitHub OAuth App Settings**: Are the callback URLs correctly configured in the GitHub OAuth app? Need to verify exact values.
2. **Current AUTH_SECRET Status**: Is AUTH_SECRET already set in production or do we need to generate a new one?
3. **Session TTL**: What's the desired session timeout? (NextAuth default is 30 days)
4. **Token Refresh**: Should tokens be automatically refreshed, or only refresh on demand?
5. **Logout Behavior**: Should logout clear localStorage as well as cookies?
6. **Protected Routes**: Do we need to implement protected routes that require authentication?
7. **Error Logging**: Should authentication errors be logged to a service like Sentry?
