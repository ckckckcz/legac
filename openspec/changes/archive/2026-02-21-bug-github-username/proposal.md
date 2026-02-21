## Why

The GitHub username is not available in the session after the initial sign-in. On subsequent page loads the `user` argument is absent from the JWT callback (NextAuth only provides it on first sign-in), so `token.username` is never re-populated, leaving `session.user.username` as `undefined`. This causes the profile page to render a skeleton indefinitely instead of displaying the user's GitHub profile.

## What Changes

- Add a fallback in the JWT callback so that `token.username` is carried forward from `token.name` if it was not set during first sign-in (e.g. for existing sessions created before this fix)
- Ensure `token.username` persists across all token refresh cycles, not just the initial sign-in

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `github-oauth`: The JWT session callback requirement changes — `token.username` must be reliably available in the session on every request, not only on first sign-in. The "Client-Side Session Management" requirement is affected: `session.user.username` must be non-null for authenticated users at all times.

## Impact

- `src/auth.ts` — JWT callback logic
- `src/components/profile/ProfilePage.tsx` — indirectly affected: already reads `session.user.username`; will work correctly once the fix is in place
- No API changes, no dependency changes, no breaking changes
