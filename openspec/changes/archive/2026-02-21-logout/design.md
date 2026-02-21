## Context

The sidebar (`src/components/sidebar.tsx`) renders a "Logout" button with a destructive variant and a `LogOut` icon from lucide-react. Its `onClick` currently only calls `handleNavClick()`, which closes the sidebar on mobile — it does not call `signOut` or clear any session state. This means authenticated users cannot log out from within the application.

A fully wired `signOut` call exists in `src/app/(auth)/login/page.tsx`, but that page is only reachable before authentication. The infrastructure for cross-tab logout (`broadcastSessionClear` in `src/lib/utils/storage-sync.ts`) and automatic localStorage clearing on session change (`useSessionWithStorage` in `src/lib/hooks/useSessionStorage.ts`) is already in place but not reached from the sidebar.

## Goals / Non-Goals

**Goals:**
- Wire the sidebar "Logout" button to call NextAuth's `signOut` with a redirect to `/`
- Call `broadcastSessionClear()` before signing out so all open tabs clear their localStorage
- Disable the button and show a loading state while sign-out is in progress
- Surface a visible error if `signOut` throws

**Non-Goals:**
- Adding a confirmation dialog before logout (keep it simple, single click)
- Refactoring the sidebar into a server component
- Changing the logout behavior on the login page
- Adding logout to any other entry point (header, profile page, etc.)

## Decisions

### 1. Call `broadcastSessionClear()` before `signOut()`

`broadcastSessionClear()` writes a timestamp to `legac_session_cleared` in localStorage, which fires a `StorageEvent` in all other open tabs. This allows sibling tabs to react and clear their own session state before the NextAuth sign-out redirect happens. Calling it first (before `signOut`) ensures the broadcast is sent while localStorage is still accessible.

**Alternatives considered:**
- Call it after `signOut`: The redirect would race the broadcast; other tabs might not receive it before the current tab navigates away.
- Skip `broadcastSessionClear()` entirely: Cross-tab logout would not work — other tabs would remain authenticated after logout until the user manually refreshes them.

### 2. Keep logout logic inside the `Sidebar` component (not a custom hook)

The sidebar already has a local `isLoading`/`error` pattern needed to disable the button and show errors. Extracting to a hook adds indirection for minimal gain given this is a single-call operation. The component is already a client component (`'use client'`).

**Alternatives considered:**
- Extract a `useLogout` hook: Cleaner if logout were needed in multiple places, but there is currently only one logout entry point.

### 3. Add `isLoading` and `error` state local to `Sidebar`

The sidebar needs to disable the Logout button while sign-out is in progress to prevent double-clicks. An `error` state allows surfacing failures without navigating away. Both are straightforward `useState` values.

**Alternatives considered:**
- Toast/notification system: The app has no toast infrastructure; adding one is out of scope.
- Redirect to an error page: Worse UX than an inline message.

### 4. `signOut({ redirect: true, callbackUrl: "/" })` — same pattern as login page

Consistent with the existing working sign-out call. Redirecting to `/` is safe because unauthenticated users are redirected to `/login` by middleware or page-level auth checks.

## Risks / Trade-offs

- **Race between broadcast and redirect**: `broadcastSessionClear()` is synchronous (writes to localStorage), but the `StorageEvent` is dispatched asynchronously in other tabs. In practice the broadcast fires fast enough before the redirect, but there is no guarantee for unusually slow tabs. → Mitigation: Acceptable tradeoff; the `useSessionWithStorage` hook in each tab also reacts to NextAuth's `"unauthenticated"` status as a fallback, so localStorage will still be cleared even if the broadcast is missed.
- **`SidebarNavItem` does not accept a `disabled` prop**: The current `SidebarNavItem` component passes `onClick` to a shadcn `Button` but does not forward a `disabled` prop. → Mitigation: Extend `NavItemProps` with an optional `disabled` field and pass it through to the `Button`.
- **Error visibility**: The sidebar has no existing error display area. A small inline error message below the Logout button is sufficient and requires no new UI dependencies.

## Migration Plan

1. Extend `NavItemProps` in `sidebar.tsx` to accept `disabled?: boolean` and forward it to `Button`.
2. Add `isLoading` and `error` useState to the `Sidebar` component.
3. Implement `handleLogout` async function: call `broadcastSessionClear()`, then `signOut({ redirect: true, callbackUrl: "/" })`, with error handling.
4. Replace `onClick={handleNavClick}` on the Logout `SidebarNavItem` with `onClick={handleLogout}` and pass `disabled={isLoading}`.
5. Render an inline error string below the Logout button when `error` is set.
6. Manual test: sign in with GitHub, click Logout, verify redirect to `/`, verify localStorage is cleared, verify a second open tab also clears its session.

No database migrations, environment variable changes, or deployment steps required.

## Open Questions

- Should the error message auto-dismiss after a timeout, or require a manual dismiss? (Current lean: auto-dismiss after ~4 seconds to keep the sidebar clean, but can be deferred to implementation.)
