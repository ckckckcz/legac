## MODIFIED Requirements

### Requirement: Landing Page Localization (Indonesian)

The system SHALL render all user-facing text on the landing page in Indonesian, except for the phrase "AI-Powered Code Revitalization" which SHALL remain in English.

#### Scenario: Hero Section Localization

- **WHEN** the user visits the landing page hero section
- **THEN** Title "Revolutionizing Legacy Audits" becomes "Merevolusi Audit Kode Legacy"
- **THEN** Subtitle "Discover, Analyze, and Document" becomes "Temukan, Analisis, dan Dokumentasikan"
- **THEN** Description text is translated to natural Indonesian
- **BUT** the tagline "AI-Powered Code Revitalization" remains in English.

#### Scenario: Call to Action Localization

- **WHEN** the user views CTA buttons
- **THEN** "Get Started Free" becomes "Mulai Gratis"
- **THEN** "View Documentation" becomes "Lihat Dokumentasi"

#### Scenario: Features Section Localization

- **WHEN** the user scrolls to features section
- **THEN** Header "Features" becomes "Fitur"
- **THEN** Feature titles and descriptions (e.g., "Deep Analysis", "Smart Documentation") are translated to "Analisis Mendalam" and "Dokumentasi Cerdas" with corresponding Indonesian descriptions.

#### Scenario: About Section Localization

- **WHEN** the user views the About section
- **THEN** All explanatory text about Legac mission and vision is rendered in natural Indonesian.
