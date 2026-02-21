## ADDED Requirements

### Requirement: Landing About section displays product narrative
The system SHALL render an About section on the landing page that presents a short narrative about the Legac product and company, including a tagline and a brief descriptive paragraph.

#### Scenario: About section is visible on the landing page
- **WHEN** a visitor loads the landing page
- **THEN** the About section SHALL be rendered below the hero section

#### Scenario: About section contains a tagline
- **WHEN** the About section is rendered
- **THEN** it SHALL display a prominent tagline that summarises the product's value proposition

#### Scenario: About section contains a descriptive paragraph
- **WHEN** the About section is rendered
- **THEN** it SHALL display a paragraph of body text describing the product or company

### Requirement: About section uses shadcn/ui primitives
The system SHALL implement the About section using `Badge` and `Button` components from shadcn/ui, consistent with the project's design system.

#### Scenario: About section renders a Badge label
- **WHEN** the About section is rendered
- **THEN** a `Badge` component SHALL be visible, labelling the section (e.g. "About Us")

#### Scenario: About section renders a call-to-action Button
- **WHEN** the About section is rendered
- **THEN** at least one `Button` component SHALL be present as a call-to-action

### Requirement: About section is a Server Component
The system SHALL implement the About section as a React Server Component (no `"use client"` directive) because it contains no client-side interactivity or state.

#### Scenario: About component has no use-client directive
- **WHEN** the About component file is inspected
- **THEN** it SHALL NOT contain `"use client"` at the top of the file

### Requirement: About component is located in the landing folder
The system SHALL place the About component at `src/components/landing/LandingAbout.tsx`.

#### Scenario: About component file exists at the correct path
- **WHEN** the landing-about capability is implemented
- **THEN** a file SHALL exist at `src/components/landing/LandingAbout.tsx`
