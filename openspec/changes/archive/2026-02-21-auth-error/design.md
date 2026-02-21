## Context

After a successful GitHub OAuth login via NextAuth, two symptoms are observed:

1. **Profile page shows "octocat"** — `ProfilePage` resolves its target username via `searchParams.get('user') || props.username || 'octocat'`. No code path passes the authenticated user's username, so it always falls back to the hardcoded default.

2. **JWT token absent from localStorage** — `useSessionWithStorage` contains a `useEffect` that writes the token and user data to localStorage whenever the session changes. But this hook is never called by any mounted component. It exists in `src/lib/hooks/useSessionStorage.ts` but has no consumers.

Both bugs are wiring problems — the infrastructure is correct, it simply isn't connected.

**Current component tree (simplified):**
```
RootLayout
  └── AuthSessionProvider         ← wraps SessionProvider, renders children
        └── (page components)
              └── ProfilePage     ← calls useGitHubProfile('octocat'), not useSession
```

`useSessionWithStorage` is never mounted anywhere in this tree.

## Goals / Non-Goals

**Goals:**
- Profile page displays the authenticated GitHub user's own profile data
- JWT access token and session user data are written to localStorage immediately after OAuth login
- Profile page redirects unauthenticated users to `/login` with callbackUrl preserved
- Fix is minimal and non-breaking — no changes to NextAuth config or existing hooks

**Non-Goals:**
- Changing how `useGitHubProfile` fetches data (it works correctly once given the right username)
- Storing additional GitHub profile fields beyond what NextAuth already exposes in the session
- Changing the session strategy or cookie configuration

## Decisions

### Decision 1: Add a `SessionSync` component rendered inside `AuthSessionProvider`

**Chosen:** Create `src/components/SessionSync.tsx` — a zero-render client component that calls `useSessionWithStorage()` and returns `null`. Mount it as a sibling to `{children}` inside `AuthSessionProvider`.

**Why:** This is the single best place to ensure the hook runs across the entire app, for every page, without modifying each page component. `AuthSessionProvider` already wraps all authenticated pages via the root layout.

**Alternative considered:** Call `useSessionWithStorage` directly inside `ProfilePage`. Rejected because it only fixes localStorage for the profile route — other pages (e.g., dashboard) would still never trigger the sync, and it conflates two separate concerns.

**Alternative considered:** Move the sync logic into the `SessionProvider` `onSession` callback. Rejected — NextAuth's `SessionProvider` does not expose such a callback.

### Decision 2: Read session username in `ProfilePage` via `useSession`, not props or query params

**Chosen:** Inside `ProfilePage`, call `useSession()` and use `(session.user as any).username` as the primary source for the GitHub username. Keep the `?user=` query param as a secondary override (useful for viewing other users' profiles in the future). Remove `'octocat'` as a fallback — if no session and no query param, show an auth error state.

**Why:** The session already contains `username` (set in `src/auth.ts` JWT callback: `token.username = user.login`). No new data fetching is needed.

**Alternative considered:** Pass the username down as a prop from the page route via server-side `auth()`. Rejected — `profile/page.tsx` is a client component and the change would require a larger refactor of the page to a server component.

### Decision 3: Add auth guard in `src/app/profile/page.tsx` using `useSession` + `useRouter`

**Chosen:** Mirror the exact pattern already used in `src/app/user/[id]/page.tsx` — check `status === 'unauthenticated'` in a `useEffect` and redirect to `/login?callbackUrl=/profile`.

**Why:** Consistency with the existing pattern; no new abstractions needed.

## Risks / Trade-offs

- **`username` may be undefined on first render** — The session takes a moment to hydrate. `ProfilePage` must handle the `loading` state from `useSession` before the username is available and avoid passing `undefined` to `useGitHubProfile` (which would trigger an unnecessary fetch or cache miss). Mitigation: render the `ProfileSkeleton` while `status === 'loading'`.

- **`useSessionWithStorage` fires on every page** — Since `SessionSync` is mounted at the root, it runs on every route including `/login`. When `status === 'unauthenticated'`, the hook's effect already calls `clearSessionData()` — this is correct behavior but worth noting.

- **GitHub username field name** — The JWT callback stores the username as `token.username`, mapped from `user.login` (the GitHub login). The session callback exposes it as `(session.user as any).username`. This relies on the `any` cast since NextAuth's default `User` type doesn't include `username`. Mitigation: already established in the codebase; no change needed.

## Migration Plan

1. Create `src/components/SessionSync.tsx`
2. Update `src/components/auth-session-provider.tsx` to render `<SessionSync />` alongside `{children}`
3. Update `src/components/profile/ProfilePage.tsx` to read username from `useSession`
4. Update `src/app/profile/page.tsx` to add the auth guard

No data migrations, no environment variable changes, no API changes. Rollback is a revert of the four files.

## Open Questions

- Should the `?user=<username>` query param (viewing another user's profile) remain supported? Current proposal keeps it as a secondary override. No action needed now, but worth formalising in a future spec.
