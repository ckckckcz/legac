## 1. Create New Route

- [x] 1.1 Create directory `src/app/user/profile/[username]/` and add `page.tsx` that renders `<Sidebar>` + `<ProfilePage username={params.username} />` with the same loading/auth guard pattern as the current `/profile` page
- [x] 1.2 Verify `/user/profile/[username]` does not conflict with `/user/[id]` by confirming Next.js resolves the literal `profile` segment correctly

## 2. Update Sidebar Link

- [x] 2.1 In `src/components/sidebar.tsx`, update the Profile `SidebarNavItem` href from `"/profile"` to a dynamic path using the session username (e.g., `` `/user/profile/${username}` ``) — obtain username from `useSession()` via `(session?.user as any)?.username`

## 3. Update Middleware

- [x] 3.1 In `src/middleware.ts`, remove `"/profile"` from the `protectedRoutes` array (the `/user` prefix already covers `/user/profile/...`)

## 4. Remove Old Route

- [x] 4.1 Delete `src/app/profile/page.tsx` and the `src/app/profile/` directory

## 5. Verification

- [x] 5.1 Run `pnpm build` and confirm no new TypeScript or build errors (ignore pre-existing error in `activity-logger.ts:107`)
- [x] 5.2 Navigate to `/user/profile/{username}` while authenticated and confirm the profile page renders correctly with sidebar
- [x] 5.3 Confirm the sidebar Profile link points to `/user/profile/{username}` with the correct session username
- [x] 5.4 Confirm `/profile` returns a 404
