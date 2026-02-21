### Requirement: Navbar component
The system SHALL provide a standalone `Navbar` React component exported from `src/components/Navbar.tsx` that renders the landing page top navigation bar, including the logo, navigation links, and CTA button.

#### Scenario: Navbar renders logo
- **WHEN** the `Navbar` component is rendered
- **THEN** the Legac logo SVG and "Legac" wordmark are visible as a linked element

#### Scenario: Navbar renders navigation links on desktop
- **WHEN** the `Navbar` component is rendered on a viewport of `md` width or wider
- **THEN** the links Home, Features, Testimonial, Blogs, and About Us are visible in a horizontal row

#### Scenario: Navbar hides navigation links on mobile
- **WHEN** the `Navbar` component is rendered on a viewport narrower than `md`
- **THEN** the navigation link list is not visible

#### Scenario: Navbar renders CTA button
- **WHEN** the `Navbar` component is rendered
- **THEN** a "Start for free" button is visible that links to `/login`

#### Scenario: Landing page uses Navbar component
- **WHEN** `src/app/page.tsx` renders
- **THEN** the top navigation is rendered via the `<Navbar />` component with no inline `<nav>` block remaining in the page file
