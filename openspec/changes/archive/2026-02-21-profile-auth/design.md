## Context

`src/middleware.ts` already runs on every request (matched by the broad catch-all pattern) and enforces authentication for routes under `/user` by checking `await auth()` from NextAuth. However, `/profile` is not in the `protectedRoutes` array, so the middleware passes all requests through — including unauthenticated ones.

The profile page (`src/app/profile/page.tsx`) compensates with a client-side `useEffect` that calls `router.push('/login?callbackUrl=/profile')` when `status === 'unauthenticated'`. This fires only after the JavaScript bundle has loaded and React has rendered, meaning unauthenticated users briefly receive the full page HTML and components before being redirected. For a page that renders personal GitHub data, this is a security gap.

## Goals / Non-Goals

**Goals:**
- Add `/profile` to the middleware `protectedRoutes` so the redirect happens at the edge, before any page HTML is served
- Remove the now-redundant client-side `useEffect` redirect and its `useRouter` import from `page.tsx`
- Preserve the `status !== 'authenticated'` → `return null` guard as a belt-and-suspenders flash-prevention measure

**Non-Goals:**
- Refactoring the middleware into a more generic route-protection pattern (out of scope)
- Protecting any other currently unprotected routes (e.g. `/dashboard`, `/settings`)
- Changing the redirect destination or `callbackUrl` format
- Server-component rendering of the profile page

## Decisions

### 1. Extend the existing `protectedRoutes` array rather than restructuring middleware

The middleware already has a clean `protectedRoutes.some(route => pathname.startsWith(route))` pattern. Adding `"/profile"` is a one-line change with zero risk of regressions to other routes.

**Alternatives considered:**
- Route group with a shared layout that does server-side auth: More architectural lift, not necessary for a single route addition.
- NextAuth's built-in `authorized` callback in middleware config: Would require restructuring the existing middleware; disproportionate for this scope.

### 2. Remove the `useEffect` redirect, keep the `null` guard

With middleware enforcing auth at the edge, the `useEffect` redirect is dead code — a real unauthenticated request never reaches the page. Removing it cleans up the component, eliminates the `useRouter` import, and removes a React effect that runs on every mount.

The `if (status !== 'authenticated') return null` guard is kept because it costs nothing and prevents a theoretical content flash in the narrow window between page load and NextAuth's client-side `useSession` resolving to `authenticated`. This window exists only because NextAuth's session hydration is asynchronous on the client.

**Alternatives considered:**
- Remove both the effect and the null guard: Marginally cleaner but risks a flash if the session takes longer than usual to hydrate.
- Keep the `useEffect` as a fallback: Unnecessary with middleware in place; dead code causes confusion.

### 3. `callbackUrl` is preserved by middleware

The existing middleware already sets `callbackUrl` to `pathname` on redirect:
```ts
loginUrl.searchParams.set("callbackUrl", pathname);
```
So `/profile` access while unauthenticated will redirect to `/login?callbackUrl=/profile`, matching the previous client-side behaviour exactly. No changes needed here.

## Risks / Trade-offs

- **Middleware runs on every request including static assets** — the existing `matcher` pattern already excludes `api`, `_next/static`, `_next/image`, and `favicon.ico`, so adding `/profile` to `protectedRoutes` does not add overhead to asset requests.
- **`await auth()` adds latency to every matched request** — this is pre-existing; adding `/profile` does not change the cost per request.
- **`status !== 'authenticated'` guard renders `null` briefly on authenticated users** — only during the session hydration window (~100–300ms on a warm session). Acceptable given the existing loading spinner handles this window visually.

## Migration Plan

1. Add `"/profile"` to `protectedRoutes` in `src/middleware.ts`.
2. Remove the `useEffect`, the `useRouter` import, and the `useRouter()` call from `src/app/profile/page.tsx`.
3. Verify: visit `/profile` while logged out — confirm immediate redirect to `/login?callbackUrl=/profile` with no page flash.
4. Verify: visit `/profile` while logged in — confirm profile renders normally.

No deployment steps, feature flags, or rollback plan required — the change is a two-file edit with no data or API impact.

## Open Questions

None. The scope is well-defined and the existing middleware pattern is directly reusable.
