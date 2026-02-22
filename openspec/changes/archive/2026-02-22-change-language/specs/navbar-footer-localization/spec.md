## MODIFIED Requirements

### Requirement: Navbar and Footer Localization

The system SHALL render global navigation links and footer content in Indonesian.

#### Scenario: Navbar Localization

- **WHEN** the user views the main navigation bar
- **THEN** Links like "Products", "Pricing", "Docs", and "Community" become "Produk", "Harga", "Dokumentasi", dan "Komunitas" (or appropriate Indonesian equivalents).
- **THEN** Secondary actions like "Login" become "Masuk".

#### Scenario: Footer Localization

- **WHEN** the user views the footer
- **THEN** Column headers like "Company", "Resources", and "Legal" are translated to "Perusahaan", "Sumber Daya", dan "Hukum".
- **THEN** All links within these columns are rendered in Indonesian.
- **THEN** Copyright notices and descriptions are translated.
