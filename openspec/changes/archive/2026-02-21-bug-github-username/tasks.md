## 1. Fix JWT callback in src/auth.ts

- [x] 1.1 Source `token.username` from the `profile` parameter (raw GitHub OAuth profile) in the JWT callback, not from `user.login` (which doesn't exist) or `token.name` (which is the display name)

## 2. Verify

- [x] 2.1 Sign in fresh — confirm profile page loads and displays GitHub profile data correctly
- [x] 2.2 Reload the page while authenticated — confirm profile page still loads (username persists across JWT refresh)
- [x] 2.3 Confirm `session.user.username` is non-null in browser devtools (NextAuth session debug or React DevTools)
