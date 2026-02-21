## Why

The `/profile` route is protected only by a client-side `useEffect` redirect: unauthenticated users briefly receive the full page HTML before JavaScript fires and redirects them to `/login`. The existing `src/middleware.ts` already enforces server-side auth for `/user` routes but `/profile` is missing from the `protectedRoutes` list, leaving it unprotected at the edge.

## What Changes

- Add `/profile` to the `protectedRoutes` array in `src/middleware.ts` so NextAuth middleware intercepts unauthenticated requests before the page renders
- Remove the redundant client-side `useEffect` + `router.push` auth redirect from `src/app/profile/page.tsx` (the `null` flash-prevention guard can stay as a lightweight fallback)

## Capabilities

### New Capabilities

- `profile-route-protection`: Middleware-level enforcement that `/profile` requires an active session, redirecting unauthenticated requests to `/login?callbackUrl=/profile` before any page content is served

### Modified Capabilities

- `github-oauth`: The "Protected route checks session" scenario gains a concrete enforcement point — `/profile` is now protected at the middleware layer, not only client-side

## Impact

- **`src/middleware.ts`**: Add `"/profile"` to the `protectedRoutes` array
- **`src/app/profile/page.tsx`**: Remove the `useEffect` redirect and its `useRouter` import (the `null` guard for non-authenticated status can remain as a belt-and-suspenders measure to prevent content flash during the redirect)
- No new dependencies, no API changes, no migrations
