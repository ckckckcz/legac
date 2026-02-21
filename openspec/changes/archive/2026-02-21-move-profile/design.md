## Context

The profile page currently lives at `/profile` (route: `src/app/profile/page.tsx`). It renders a `<Sidebar>` + `<ProfilePage>` layout where `ProfilePage` resolves the GitHub username from `session.user.username` (set in the JWT callback from `profile.login`).

The `/user` namespace already exists with a `[id]` dynamic route at `src/app/user/[id]/page.tsx` (document management page). The middleware at `src/middleware.ts` protects `/user`, `/profile`, and `/docs` routes using a prefix-match strategy (`pathname.startsWith(route)`).

The sidebar (`src/components/sidebar.tsx`) has a hardcoded Profile link pointing to `/profile`.

## Goals / Non-Goals

**Goals:**
- Move the profile page to `/user/profile/[username]` so user-related routes are consolidated under `/user`
- Update all internal links and auth redirects to use the new dynamic path
- Maintain existing sidebar + profile page layout and behavior unchanged
- Keep middleware protection working for the new path

**Non-Goals:**
- Public profile viewing (the page still requires authentication)
- Changing the ProfilePage component internals or fetching strategy
- Modifying the `/user/[id]` document management page
- Adding username validation or user lookup by username on the server side

## Decisions

### 1. Route structure: `/user/profile/[username]`

Create `src/app/user/profile/[username]/page.tsx`. This avoids conflict with the existing `/user/[id]` route because Next.js resolves `profile` as a literal segment before falling through to `[id]`.

**Alternative considered**: `/user/[username]/profile` — rejected because it would conflict with `/user/[id]` (both are dynamic catch segments at the same level).

### 2. Pass `params.username` to ProfilePage as a prop

The new route page will extract `username` from `params.username` and pass it directly to `<ProfilePage username={params.username} />`. The `ProfilePage` component already accepts an optional `username` prop (priority: prop > query param > session), so no changes to `ProfilePage` internals are needed.

### 3. Sidebar link uses session username dynamically

The sidebar currently hardcodes `href="/profile"`. Since the sidebar already has access to `useSession()` via its parent or its own hook usage, the link will be updated to `/user/profile/${session.user.username}`. If the username is not yet available (session loading), the link can fall back to `/user/profile/me` or be disabled — but since middleware already protects the route (requiring auth), the session will always be present when the sidebar renders.

**Decision**: Use the session username directly. No fallback path needed since the sidebar only renders for authenticated users.

### 4. Remove `/profile` from middleware, keep `/user` protection

The middleware already protects `/user` with prefix matching (`pathname.startsWith("/user")`). Since `/user/profile/[username]` falls under `/user`, it's already protected. We just need to remove the separate `/profile` entry from `protectedRoutes`.

### 5. Delete old `/profile` route

Remove `src/app/profile/page.tsx` (and the directory) after the new route is in place. No redirect from old to new — this is a clean break per the proposal's BREAKING label.

### 6. callbackUrl update

The middleware dynamically sets `callbackUrl` from `pathname`, so after the route move, unauthenticated requests to `/user/profile/foo` will automatically get `callbackUrl=/user/profile/foo`. No explicit callbackUrl string changes are needed in the middleware itself.

However, any hardcoded `/profile` references in client-side redirect logic (e.g., in `src/app/profile/page.tsx` or elsewhere) will be eliminated when the old route is deleted.

## Risks / Trade-offs

- **Breaking change for bookmarks/links**: Anyone who bookmarked `/profile` will get a 404. → Acceptable per proposal; no redirect planned.
- **Session username availability**: If `session.user.username` is somehow undefined (e.g., token migration edge case), the sidebar link would be malformed. → Low risk since username is set on first sign-in from GitHub `profile.login` and persisted in JWT.
- **Route segment conflict with `/user/[id]`**: Next.js resolves literal segments (`profile`) before dynamic ones (`[id]`), so `/user/profile/...` won't accidentally match `/user/[id]`. → No conflict, but worth verifying during implementation.
