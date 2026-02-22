## 1. Preparation

- [x] 1.1 Ensure `Avatar` and `DropdownMenu` components are available in `src/components/ui`.
- [x] 1.2 Import `useAuthSession` hook in `src/components/Navbar.tsx`.
- [x] 1.3 Add `"use client"` directive to `src/components/Navbar.tsx` if missing.

## 2. Component Refactoring

- [x] 2.1 Wrap the "Start for free" button in a conditional check for `!session`.
- [x] 2.2 Implement the authenticated UI section that displays when `session` is present.
- [x] 2.3 Integrate the `Avatar` component with the user's profile image (or fallback).
- [x] 2.4 Implement the `DropdownMenu` with the following items:
  - [x] Profile (Link to `/user/${user.id}`)
  - [x] Repository (Link to `/user/${user.id}/repository`)
  - [x] Logout (Button triggering logout logic)

## 3. Polish and Testing

- [x] 3.1 Optimize loading state to prevent layout shift while session is being fetched.
- [x] 3.2 Verify mobile responsiveness of the profile dropdown.
- [x] 3.3 Test navigation for all dropdown links.
- [x] 3.4 Verify that clicking Logout correctly clears the session and updates the UI back to the "Start for free" button.
