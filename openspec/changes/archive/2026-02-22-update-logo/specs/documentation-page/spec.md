## MODIFIED Requirements

### Requirement: Docs-only layout shell

The system SHALL render a self-contained docs layout shell consisting of a minimal top bar (official `logo.png` image + search trigger) and the docs nav sidebar, with no app-level chrome such as the "Manage your documents" sidebar.

#### Scenario: Top bar renders logo/title and search trigger

- **WHEN** the docs page is rendered
- **THEN** the top bar displays the official `logo.png` image or title and a search trigger button that opens the docs command palette
