## MODIFIED Requirements

### Requirement: Profile route is protected by middleware
The system SHALL enforce authentication for the `/user/profile` route prefix at the middleware layer, redirecting unauthenticated requests to `/login?callbackUrl={original_path}` before any page content is served. The `/user/profile` path is covered by the existing `/user` prefix match in the protected routes list, so the separate `/profile` entry SHALL be removed.

#### Scenario: Unauthenticated request to /user/profile/johndoe is redirected at the edge
- **WHEN** an unauthenticated user makes a request to `/user/profile/johndoe`
- **THEN** the middleware intercepts the request and redirects to `/login?callbackUrl=/user/profile/johndoe` without rendering any page HTML

#### Scenario: Authenticated request to /user/profile/johndoe passes through
- **WHEN** an authenticated user makes a request to `/user/profile/johndoe`
- **THEN** the middleware allows the request to proceed to the page

#### Scenario: callbackUrl is preserved through the redirect
- **WHEN** an unauthenticated user is redirected from `/user/profile/johndoe` to `/login`
- **THEN** the login page receives `callbackUrl=/user/profile/johndoe` and returns the user to `/user/profile/johndoe` after successful authentication

#### Scenario: /profile is removed from the protected routes list
- **WHEN** the middleware evaluates its protected routes
- **THEN** the `/profile` entry is no longer present, and only `/user` (which covers `/user/profile/...`) remains
