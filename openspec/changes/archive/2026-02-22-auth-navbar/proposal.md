## Why

Currently, the navbar always shows a "Start for free" button regardless of the user's authentication status. We need to provide authenticated users with immediate access to their profile, repositories, and the ability to log out directly from the top navigation.

## What Changes

- **Navbar Auth State**: Conditionally render the "Start for free" button based on the user's login status.
- **User Profile Avatar**: When a user is logged in, display their profile picture as a clickable element in the navbar.
- **Profile Dropdown**: Clicking the avatar triggers a dropdown menu with the following options:
  - **Profile**: Link to the user's profile page.
  - **Repository**: Link to the user's repositories management page.
  - **Logout**: Action to terminate the current session.

## Capabilities

### Modified Capabilities

- `navbar`: Update the navbar requirement to include authenticated state handling, profile avatar rendering, and the dropdown menu logic.

## Impact

- `src/components/Navbar.tsx`: Component modification to handle auth logic and new UI elements.
- `src/lib/use-auth-session.ts`: Integration for session state and user data.
- UI Libraries: Usage of Shadcn UI `Avatar` and `DropdownMenu` components.
