## 1. Fix broadcastSessionClear to clear all localStorage keys

- [x] 1.1 Open `src/lib/utils/storage-sync.ts` and import `SESSION_EXPIRY_KEY` alongside the existing `SESSION_STORAGE_KEY` and `TOKEN_STORAGE_KEY` imports
- [x] 1.2 Add `localStorage.removeItem(SESSION_EXPIRY_KEY)` inside `broadcastSessionClear()` so all three keys (`legac_session_data`, `legac_session_expiry`, `legac_auth_token`) are removed on logout

## 2. Extend SidebarNavItem to support disabled state

- [x] 2.1 Add `disabled?: boolean` to the `NavItemProps` interface in `src/components/sidebar.tsx`
- [x] 2.2 Destructure `disabled` in `SidebarNavItem` and forward it to the shadcn `Button` component

## 3. Wire logout logic into the Sidebar component

- [x] 3.1 Add `signOut` import from `next-auth/react` and `broadcastSessionClear` import from `@/lib/utils/storage-sync` at the top of `src/components/sidebar.tsx`
- [x] 3.2 Add `isLoading` and `error` useState hooks to the `Sidebar` component (both default to `false`/`null`)
- [x] 3.3 Implement `handleLogout` async function: call `broadcastSessionClear()`, then `signOut({ redirect: true, callbackUrl: "/" })`, catch errors into `error` state, and reset `isLoading` on failure
- [x] 3.4 Replace `onClick={handleNavClick}` on the Logout `SidebarNavItem` with `onClick={handleLogout}` and pass `disabled={isLoading}`

## 4. Add inline error display for logout failure

- [x] 4.1 Render an inline error message (e.g. a `<p>` in `text-destructive text-xs`) below the Logout `SidebarNavItem` when `error` is non-null

## 5. Verify end-to-end behavior

- [x] 5.1 Sign in with GitHub, click Logout in the sidebar — confirm redirect to `/`
- [x] 5.2 After logout, inspect localStorage and confirm `legac_session_data`, `legac_session_expiry`, and `legac_auth_token` are all absent
- [x] 5.3 Open a second tab while logged in, log out in the first tab — confirm the second tab's session state is also cleared (via `legac_session_cleared` storage event)
- [x] 5.4 Simulate a `signOut` failure (e.g. disconnect network) — confirm the error message appears below the Logout button and the button is re-enabled
