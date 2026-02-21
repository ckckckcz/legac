## Why

After a successful GitHub OAuth login, the profile page always shows "The Octocat" (a GitHub demo account) instead of the authenticated user's own profile, and the JWT token is never written to localStorage. Both bugs share the same root cause: no component ever calls `useSessionWithStorage`, so the sync effect that writes session data and the token to localStorage never fires, and `ProfilePage` falls back to the hardcoded username `'octocat'` instead of the signed-in user.

## What Changes

- **Fix profile page to display the authenticated user's data**: `ProfilePage` must read the logged-in user's GitHub username from the NextAuth session and pass it to `useGitHubProfile`, replacing the `'octocat'` fallback.
- **Fix JWT token and session data not written to localStorage**: Mount `useSessionWithStorage` in a component that is always rendered after login (e.g., a top-level `SessionSync` component or within the profile page itself) so the sync effect reliably fires after OAuth.
- **Add auth guard to the profile page**: Redirect unauthenticated users to `/login` with a `callbackUrl`, consistent with the dashboard page pattern.

## Capabilities

### New Capabilities
- `session-sync-component`: A lightweight client component that mounts `useSessionWithStorage` to ensure session data and JWT token are always written to localStorage after login. Rendered near the app root (e.g., inside `AuthSessionProvider`).

### Modified Capabilities
- `github-oauth`: Profile page now derives username from authenticated session instead of a hardcoded fallback; requires session to be present before rendering profile data.

## Impact

- `src/components/profile/ProfilePage.tsx` — reads session username from `useSession` instead of defaulting to `'octocat'`
- `src/components/auth-session-provider.tsx` — renders the new `SessionSync` component so storage sync runs app-wide
- `src/app/profile/page.tsx` — adds auth guard (redirect to login if unauthenticated)
- `src/lib/hooks/useSessionStorage.ts` — no changes needed; bug is in call sites, not the hook itself
