## ADDED Requirements

### Requirement: Donation page route exists and is auth-guarded
The system SHALL serve a `/user/[id]/donation/` page that is only accessible to authenticated users. Unauthenticated visitors SHALL be redirected to `/login?callbackUrl=/user/dashboard`.

#### Scenario: Authenticated user accesses donation page
- **WHEN** an authenticated user navigates to `/user/[id]/donation/`
- **THEN** the donation page is rendered with the Sidebar and the developer's donation platform cards

#### Scenario: Unauthenticated user accesses donation page
- **WHEN** an unauthenticated user navigates to `/user/[id]/donation/`
- **THEN** the user is redirected to `/login?callbackUrl=/user/dashboard`

#### Scenario: Session is loading
- **WHEN** the session status is `"loading"`
- **THEN** a loading spinner is displayed and the page content is not rendered

### Requirement: Donation page displays Saweria platform card
The donation page SHALL display a Saweria card using the developer's Saweria username from the `NEXT_PUBLIC_SAWERIA_USERNAME` environment variable. When the env var is set, the card SHALL render an `<iframe>` embed at `https://saweria.co/embed/<username>`. When the iframe fails to load, a fallback link card to `https://saweria.co/<username>` SHALL be shown. When the env var is not set, the card SHALL show a graceful unavailable state.

#### Scenario: Saweria username env var is configured
- **WHEN** `NEXT_PUBLIC_SAWERIA_USERNAME` is set
- **THEN** an iframe embed at `https://saweria.co/embed/<username>` is shown inside the Saweria card

#### Scenario: Saweria iframe fails to load
- **WHEN** the Saweria iframe triggers an `onError` event
- **THEN** the iframe is hidden and a fallback link card to `https://saweria.co/<username>` is shown instead

#### Scenario: Saweria username env var is not configured
- **WHEN** `NEXT_PUBLIC_SAWERIA_USERNAME` is not set or empty
- **THEN** the Saweria card shows a graceful "not available" state

### Requirement: Donation page displays Kreate.gg platform card
The donation page SHALL display a Kreate.gg card using the developer's Kreate.gg username from the `NEXT_PUBLIC_KREATE_USERNAME` environment variable. When the env var is set, the card SHALL render a styled link to `https://kreate.gg/<username>`. When the env var is not set, the card SHALL show a graceful unavailable state.

#### Scenario: Kreate.gg username env var is configured
- **WHEN** `NEXT_PUBLIC_KREATE_USERNAME` is set
- **THEN** a styled link card pointing to `https://kreate.gg/<username>` is shown

#### Scenario: Kreate.gg username env var is not configured
- **WHEN** `NEXT_PUBLIC_KREATE_USERNAME` is not set or empty
- **THEN** the Kreate.gg card shows a graceful "not available" state
