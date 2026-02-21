## Context

NextAuth v5 (Auth.js) provides a `user` argument to the JWT callback only on the very first sign-in event. On all subsequent requests the JWT callback is called with just `token` (the persisted JWT payload) — `user` is absent. The original implementation set `token.username = (user as any).login` inside the `if (user)` block, which meant it was only written once. While NextAuth does carry forward all existing token fields across refreshes, any session that was created before the `username` field existed (e.g., sessions from before the field was introduced, or sessions where the GitHub `login` field was not present on the `user` object) would have `token.username = undefined` permanently.

The symptom: `ProfilePage` reads `(session?.user as any)?.username` to determine which GitHub profile to fetch. When that value is `undefined`, `finalUsername` is undefined, and the component renders a permanent skeleton.

## Goals / Non-Goals

**Goals:**
- Ensure `token.username` is always a non-null string for authenticated users across all JWT refresh cycles
- Provide a safe fallback for existing sessions that lack `token.username`
- Keep the fix minimal and contained to the JWT callback

**Non-Goals:**
- Changing how `ProfilePage` resolves the username (it already has the correct priority chain)
- Refetching profile data from GitHub to re-populate the username
- Migrating or invalidating existing sessions

## Decisions

### Decision: Fallback to `token.name` when `token.username` is missing

`token.name` is always populated by NextAuth from the GitHub OAuth profile's `name` field. For GitHub accounts the `name` field is the display name, not the login handle — however the `token.name` value is populated from GitHub's `login` field via the default profile mapping when no custom profile callback is defined.

**Why this over alternatives:**
- **Re-fetch from GitHub API**: Would require an access token and an extra network call on every token refresh — expensive and fragile.
- **Force re-sign-in**: Would log out existing users — unacceptable for a bug fix.
- **Store login in a separate cookie**: Adds complexity without benefit; the JWT is already the right place.
- **Fallback to `token.name`**: Zero cost, already available in the token, handles the gap for any session missing `token.username`.

The fallback only fires if `token.username` is falsy, so it does not interfere with newly created sessions where `token.username` is set correctly from `user.login`.

### Decision: Single guard, no restructuring of the JWT callback

The existing `if (user)` block is the correct place to write `token.username` on first sign-in. The fallback is added as a separate, unconditional block after — not inside — the `if (user)` block. This keeps the two concerns (first sign-in population, and refresh-cycle persistence) clearly separated.

## Risks / Trade-offs

- **`token.name` may differ from GitHub login** — GitHub's `name` is the user's display name (e.g., "John Doe"), not the login handle (e.g., `johndoe`). If NextAuth's default GitHub profile mapping uses `name` → display name rather than `login`, the fallback would set `username` to the display name, which would cause the GitHub API fetch to fail (profile not found). This is mitigated by the fact that the fallback only applies to sessions where `token.username` was never set — once a user signs in fresh, `user.login` is used correctly. The risk is limited to pre-existing stale sessions.
- **Stale session fix is best-effort** — Users with old sessions missing `username` will get the `token.name` fallback. If their display name happens to match their GitHub login, it works. If not, they'll see an error state on the profile page — which is still better than an infinite skeleton. A fresh sign-in will fix it permanently.

## Migration Plan

1. Deploy `src/auth.ts` with the fallback added.
2. No schema migration, no data migration, no environment changes required.
3. Existing sessions will pick up the fallback on their next JWT refresh (transparent to users).
4. **Rollback**: Revert `src/auth.ts` to remove the fallback block — no other changes needed.
