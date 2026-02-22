## Context

The current `Navbar` component is a static navigation bar that does not reflect user authentication state. The application uses `useAuthSession` for session management. This change will integrate session state into the navbar to provide a personalized experience for logged-in users.

## Goals / Non-Goals

**Goals:**

- Provide clear visual feedback of the user's logged-in status.
- Add quick access to Profile, Repository, and Logout actions.
- Maintain responsive design consistency across all auth states.

**Non-Goals:**

- Modifying the core auth logic or session persistence.
- Design changes to the main navigation links (Home, Features, etc.).

## Decisions

### 1. Component Implementation

- **Decision**: Use Shadcn UI `DropdownMenu` and `Avatar` components.
- **Rationale**: Leverages existing design system components for accessibility and visual consistency.
- **Alternatives**: Custom dropdown implementation (higher maintenance).

### 2. State Management

- **Decision**: Consume `useAuthSession` within the Navbar.
- **Rationale**: Direct integration with the established auth pattern in the codebase.
- **Alternatives**: Passing session data as props (difficult for global components like Navbar).

### 3. Component Architecture

- **Decision**: Ensure `Navbar.tsx` is marked with `"use client"` if it isn't already, or wrap the auth section in a client component.
- **Rationale**: Session state and interactive dropdowns require client-side execution in Next.js.

## Risks / Trade-offs

- **[Risk]** Layout shift during session hydrations.
  - **Mitigation**: Implement a loading state or a fixed-width container for the auth action section to prevent shifting when transitioning from loading to authenticated/unauthenticated.
- **[Risk]** Mobile navigation overlap.
  - **Mitigation**: Ensure the profile avatar and dropdown are correctly positioned or moved into the mobile menu if necessary (though the user specifically requested it replace the "Start for free" button).
