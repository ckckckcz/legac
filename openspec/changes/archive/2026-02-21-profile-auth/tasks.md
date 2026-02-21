## 1. Protect /profile in middleware

- [x] 1.1 Open `src/middleware.ts` and add `"/profile"` to the `protectedRoutes` array

## 2. Clean up redundant client-side redirect in profile page

- [x] 2.1 Remove the `useRouter` import from `src/app/profile/page.tsx`
- [x] 2.2 Remove the `const router = useRouter()` call from the `Page` component
- [x] 2.3 Remove the `useEffect` that calls `router.push('/login?callbackUrl=/profile')` on `status === 'unauthenticated'`

## 3. Verify

- [ ] 3.1 While logged out, navigate to `/profile` — confirm immediate redirect to `/login?callbackUrl=/profile` with no profile page HTML rendered
- [ ] 3.2 While logged in, navigate to `/profile` — confirm profile renders normally with no regressions
- [ ] 3.3 Log out from the sidebar while on `/profile`, then log back in — confirm `callbackUrl` returns the user to `/profile`
