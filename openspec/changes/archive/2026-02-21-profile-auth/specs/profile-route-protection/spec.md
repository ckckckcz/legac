## ADDED Requirements

### Requirement: Profile route is protected by middleware
The system SHALL enforce authentication for the `/profile` route at the middleware layer, redirecting unauthenticated requests to `/login?callbackUrl=/profile` before any page content is served.

#### Scenario: Unauthenticated request to /profile is redirected at the edge
- **WHEN** an unauthenticated user makes a request to `/profile`
- **THEN** the middleware intercepts the request and redirects to `/login?callbackUrl=/profile` without rendering any page HTML

#### Scenario: Authenticated request to /profile passes through
- **WHEN** an authenticated user makes a request to `/profile`
- **THEN** the middleware allows the request to proceed to the page

#### Scenario: callbackUrl is preserved through the redirect
- **WHEN** an unauthenticated user is redirected from `/profile` to `/login`
- **THEN** the login page receives `callbackUrl=/profile` and returns the user to `/profile` after successful authentication
