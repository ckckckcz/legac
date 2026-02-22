## ADDED Requirements

### Requirement: Documentation Overview Page

The system SHALL provide a static route at `/docs` (or `/docs/overview`) that renders a high-level introduction to the project.

#### Scenario: User navigates to overview

- **WHEN** the user visits `/docs`
- **THEN** the system renders the Overview page using the `DocsShell` layout.

### Requirement: Documentation Installation Page

The system SHALL provide a static route at `/docs/installation` that renders setup and installation instructions. It SHALL use a premium black-and-white visual style for interactive elements.

#### Scenario: User navigates to installation

- **WHEN** the user visits `/docs/installation`
- **THEN** the system renders the Installation page with step-by-step instructions using a black-and-white stepper.

#### Requirement: Installation Page Content

The Installation page SHALL include four main setup steps: Installation (via npm/npx), Login (Cloud Sync), Inisialisasi Konfigurasi (Optional), and Analisis & Generate. It SHALL also include a comprehensive CLI Command Reference and a detailed breakdown of the `analyze` command flags.

#### Requirement: Premium Installation Stepper

The Installation page SHALL use a custom stepper component with a continuous vertical line connecting all steps. Numbers SHALL be displayed in white circles with grey/black borders.

#### Requirement: Light-Themed Code Blocks

Code snippets in the Installation guide SHALL use a light theme (white background) with a distinct border and black text.

#### Requirement: Compact Desktop Layout

The Documentation pages SHALL use a more compact layout on desktop to avoid excessive white space and oversized elements.

### Requirement: Static Page Navigation Sidebar

The system SHALL render a sidebar for static pages that includes "Overview" and "Installation" links.

#### Scenario: Sidebar shows static links

- **WHEN** a user is on a static documentation page
- **THEN** the sidebar displays "Overview" and "Installation" as primary navigation items.
