## MODIFIED Requirements

### Requirement: Navbar component

The system SHALL provide a standalone `Navbar` React component exported from `src/components/Navbar.tsx` that renders the landing page top navigation bar, including the official `logo.png` image, navigation links, and conditionally renders either a CTA button or user profile dropdown based on authentication state.

#### Scenario: Navbar renders logo

- **WHEN** the `Navbar` component is rendered
- **THEN** the official `logo.png` image and "Legac" wordmark are visible as a linked element

#### Scenario: Navbar renders navigation links on desktop

- **WHEN** the `Navbar` component is rendered on a viewport of `md` width or wider
- **THEN** the links Home, Features, Testimonial, Blogs, and About Us are visible in a horizontal row

#### Scenario: Navbar hides navigation links on mobile

- **WHEN** the `Navbar` component is rendered on a viewport narrower than `md`
- **THEN** the navigation link list is not visible

#### Scenario: Navbar renders CTA button when unauthenticated

- **WHEN** the `Navbar` component is rendered AND the user is not logged in
- **THEN** a "Start for free" button is visible that links to `/login`

#### Scenario: Navbar renders profile avatar when authenticated

- **WHEN** the `Navbar` component is rendered AND the user is logged in
- **THEN** a user profile avatar image is visible in place of the CTA button

#### Scenario: Navbar renders profile dropdown menu

- **WHEN** the user is logged in AND clicks the profile avatar
- **THEN** a dropdown menu is displayed containing "Profile", "Repository", and "Logout" options

#### Scenario: Landing page uses Navbar component

- **WHEN** `src/app/page.tsx` renders
- **THEN** the top navigation is rendered via the `<Navbar />` component with no inline `<nav>` block remaining in the page file
