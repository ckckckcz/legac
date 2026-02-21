## ADDED Requirements

### Requirement: Landing Features section showcases product capabilities
The system SHALL render a Features section on the landing page that highlights the main product features. Each feature SHALL be shown as a card with an icon, a title, and a short description.

#### Scenario: Features section is visible on the landing page
- **WHEN** a visitor loads the landing page
- **THEN** the Features section SHALL be rendered as a distinct section below the Why Us section

#### Scenario: Features section contains multiple feature cards
- **WHEN** the Features section is rendered
- **THEN** it SHALL display two or more feature cards in a responsive grid

#### Scenario: Each feature card displays an icon, title, and description
- **WHEN** a feature card is rendered
- **THEN** it SHALL display a Lucide React icon, a feature title, and a short description

#### Scenario: Each feature card includes a Badge label
- **WHEN** a feature card is rendered
- **THEN** it SHALL include a `Badge` component that categorises or labels the feature (e.g. "AI", "Automation")

### Requirement: Features section uses shadcn/ui Card and Badge components
The system SHALL implement feature cards using `Card`, `CardContent`, and `Badge` from shadcn/ui.

#### Scenario: Feature card uses Card and CardContent
- **WHEN** the Features section is rendered
- **THEN** each feature card SHALL use the shadcn/ui `Card` and `CardContent` components

#### Scenario: Feature card uses Badge component
- **WHEN** the Features section is rendered
- **THEN** each feature card SHALL contain at least one shadcn/ui `Badge` component

### Requirement: Feature data is defined as a static constant
The system SHALL store the list of features (icon, title, description, badge label) as a typed array constant within the component file.

#### Scenario: Features are stored as an array constant
- **WHEN** the Features component file is inspected
- **THEN** it SHALL contain a constant array (e.g. `FEATURES`) holding all feature objects

### Requirement: Features section is a Server Component
The system SHALL implement the Features section as a React Server Component with no client-side interactivity.

#### Scenario: Features component has no use-client directive
- **WHEN** the Features component file is inspected
- **THEN** it SHALL NOT contain `"use client"` at the top of the file

### Requirement: Features component is located in the landing folder
The system SHALL place the Features component at `src/components/landing/LandingFeatures.tsx`.

#### Scenario: Features component file exists at the correct path
- **WHEN** the landing-features capability is implemented
- **THEN** a file SHALL exist at `src/components/landing/LandingFeatures.tsx`
