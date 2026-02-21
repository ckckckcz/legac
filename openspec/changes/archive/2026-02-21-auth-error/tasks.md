## 1. Create SessionSync Component

- [x] 1.1 Create `src/components/SessionSync.tsx` as a `'use client'` component that calls `useSessionWithStorage()` and returns `null`
- [x] 1.2 Verify the component has no visible output and causes no layout shifts

## 2. Wire SessionSync into AuthSessionProvider

- [x] 2.1 Update `src/components/auth-session-provider.tsx` to import and render `<SessionSync />` as a sibling to `{children}` inside `SessionProvider`
- [x] 2.2 Verify after login that `legac_auth_token` and `legac_session_data` keys appear in localStorage

## 3. Fix ProfilePage to Use Authenticated Session Username

- [x] 3.1 Add `useSession` import and call to `src/components/profile/ProfilePage.tsx`
- [x] 3.2 Derive `finalUsername` from `(session.user as any).username` as primary source, with `searchParams.get('user')` as secondary override — remove the hardcoded `'octocat'` fallback
- [x] 3.3 Guard against passing `undefined` to `useGitHubProfile`: while `status === 'loading'` or username is not yet available, render `<ProfileSkeleton />` instead of initiating a fetch
- [x] 3.4 When no username is available and status is `'unauthenticated'`, render `<ProfileError />` with an appropriate message instead of silently falling back

## 4. Add Auth Guard to Profile Page Route

- [x] 4.1 Update `src/app/profile/page.tsx` to import `useSession` and `useRouter`
- [x] 4.2 Add a `useEffect` that redirects to `/login?callbackUrl=/profile` when `status === 'unauthenticated'`, mirroring the pattern in `src/app/user/[id]/page.tsx`
- [x] 4.3 Render a full-page loading spinner while `status === 'loading'` (before auth is known)
- [x] 4.4 Return `null` when status is not yet `'authenticated'` to prevent a flash of profile content

## 5. Verification

- [ ] 5.1 Log in via GitHub OAuth and confirm `legac_auth_token` is present in localStorage with a non-null `value`
- [ ] 5.2 Log in via GitHub OAuth and confirm `legac_session_data` in localStorage contains the correct GitHub username, name, and email
- [ ] 5.3 Navigate to `/profile` while authenticated and confirm the page displays your own GitHub profile, not "The Octocat"
- [ ] 5.4 Open `/profile` in a new tab while unauthenticated and confirm redirect to `/login?callbackUrl=%2Fprofile`
- [ ] 5.5 Log out and confirm `legac_auth_token` and `legac_session_data` are removed from localStorage
