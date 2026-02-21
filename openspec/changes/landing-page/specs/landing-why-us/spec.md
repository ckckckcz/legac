## ADDED Requirements

### Requirement: Landing Why Us section displays product value propositions
The system SHALL render a "Why Us" section on the landing page that communicates the key advantages and values Legac offers over alternatives. Each value proposition SHALL be presented as a distinct card with a title, icon, and short description.

#### Scenario: Why Us section is visible on the landing page
- **WHEN** a visitor loads the landing page
- **THEN** the Why Us section SHALL be rendered as a distinct section below the Teams section

#### Scenario: Why Us section contains multiple value proposition cards
- **WHEN** the Why Us section is rendered
- **THEN** it SHALL display two or more cards, each representing a distinct value proposition

#### Scenario: Each value proposition card displays title and description
- **WHEN** a value proposition card is rendered
- **THEN** it SHALL display a title (e.g. `CardTitle`) and a short description (e.g. `CardDescription`)

#### Scenario: Each value proposition card displays an icon
- **WHEN** a value proposition card is rendered
- **THEN** it SHALL display a Lucide React icon relevant to the value proposition

### Requirement: Why Us section uses shadcn/ui Card components
The system SHALL implement value proposition cards using `Card`, `CardHeader`, `CardTitle`, and `CardDescription` from shadcn/ui.

#### Scenario: Value proposition uses Card, CardHeader, CardTitle, CardDescription
- **WHEN** the Why Us section is rendered
- **THEN** each card SHALL be composed of `Card`, `CardHeader`, `CardTitle`, and `CardDescription` shadcn/ui components

### Requirement: Why Us value proposition data is defined as a static constant
The system SHALL store the list of value propositions (icon, title, description) as a typed array constant within the component file.

#### Scenario: Value propositions are stored as an array constant
- **WHEN** the Why Us component file is inspected
- **THEN** it SHALL contain a constant array (e.g. `VALUE_PROPS`) holding all value proposition objects

### Requirement: Why Us section is a Server Component
The system SHALL implement the Why Us section as a React Server Component with no client-side interactivity.

#### Scenario: Why Us component has no use-client directive
- **WHEN** the Why Us component file is inspected
- **THEN** it SHALL NOT contain `"use client"` at the top of the file

### Requirement: Why Us component is located in the landing folder
The system SHALL place the Why Us component at `src/components/landing/LandingWhyUs.tsx`.

#### Scenario: Why Us component file exists at the correct path
- **WHEN** the landing-why-us capability is implemented
- **THEN** a file SHALL exist at `src/components/landing/LandingWhyUs.tsx`
