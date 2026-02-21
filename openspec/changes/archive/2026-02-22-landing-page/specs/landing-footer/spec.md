## ADDED Requirements

### Requirement: Landing Footer section provides navigation, social links, and legal info
The system SHALL render a Footer section at the bottom of the landing page that contains navigation links, social media links, a copyright notice, and optional legal information.

#### Scenario: Footer section is visible at the bottom of the landing page
- **WHEN** a visitor loads the landing page
- **THEN** the Footer section SHALL be rendered as the last section of the page

#### Scenario: Footer displays navigation links
- **WHEN** the Footer section is rendered
- **THEN** it SHALL display a set of internal navigation links (e.g. About, Features, Teams)

#### Scenario: Footer displays social media links
- **WHEN** the Footer section is rendered
- **THEN** it SHALL display links to at least one social media platform, rendered using Lucide React icons

#### Scenario: Footer displays a copyright notice
- **WHEN** the Footer section is rendered
- **THEN** it SHALL display a copyright notice including the current year and the product name "Legac"

### Requirement: Footer uses a Separator to visually divide content areas
The system SHALL use the shadcn/ui `Separator` component to visually separate the main footer content from the copyright bar.

#### Scenario: Separator is rendered between content and copyright bar
- **WHEN** the Footer section is rendered
- **THEN** a `Separator` component SHALL appear between the main link area and the copyright notice

### Requirement: Footer uses shadcn/ui Button for interactive links
The system SHALL render navigation and social links as shadcn/ui `Button` components with `variant="ghost"` or `variant="link"` for accessible, consistently styled interaction targets.

#### Scenario: Footer links use Button component
- **WHEN** the Footer section is rendered
- **THEN** each link element SHALL use the shadcn/ui `Button` component

### Requirement: Footer is a dedicated LandingFooter component separate from existing Footer
The system SHALL implement the landing page footer as `LandingFooter.tsx` and NOT modify the existing `src/components/Footer.tsx`, so the two footers remain independent.

#### Scenario: LandingFooter component does not modify existing Footer.tsx
- **WHEN** the landing-footer capability is implemented
- **THEN** `src/components/Footer.tsx` SHALL remain unchanged

#### Scenario: LandingFooter component exists at the correct path
- **WHEN** the landing-footer capability is implemented
- **THEN** a file SHALL exist at `src/components/landing/LandingFooter.tsx`

### Requirement: Footer is a Server Component
The system SHALL implement the Footer section as a React Server Component with no client-side interactivity.

#### Scenario: LandingFooter component has no use-client directive
- **WHEN** the LandingFooter component file is inspected
- **THEN** it SHALL NOT contain `"use client"` at the top of the file
