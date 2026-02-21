## Why

The sidebar already renders a "Logout" button with a destructive variant, but clicking it does nothing — the `onClick` only closes the sidebar on mobile and never calls `signOut`. The only working logout call lives on the login page itself, which is inaccessible to authenticated users navigating the app. Users have no way to sign out from within the application.

## What Changes

- Wire the existing sidebar "Logout" button to call `signOut` from NextAuth
- Call `broadcastSessionClear()` before signing out to synchronize logout across all open browser tabs
- Show a loading/disabled state on the button while sign-out is in progress
- Handle sign-out errors gracefully with an error state visible to the user

## Capabilities

### New Capabilities

- `sidebar-logout`: Wiring the existing sidebar logout button to perform a full sign-out, clear localStorage, and broadcast the logout event to other tabs

### Modified Capabilities

- `github-oauth`: The session expiration/cleanup requirement gains a new scenario — logout triggered from the sidebar (rather than only from the login page)

## Impact

- **`src/components/sidebar.tsx`**: Wire `onClick` of the "Logout" `SidebarNavItem` to call `signOut` and `broadcastSessionClear`
- **`src/lib/utils/storage-sync.ts`**: `broadcastSessionClear()` becomes a live call path (currently dead code)
- No new dependencies, no migrations, no environment changes
