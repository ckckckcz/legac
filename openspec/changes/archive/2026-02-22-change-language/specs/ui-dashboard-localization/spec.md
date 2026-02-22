## MODIFIED Requirements

### Requirement: UI Dashboard Localization

The system SHALL render private dashboard areas, document grids, and management interfaces in Indonesian.

#### Scenario: User Dashboard Localization

- **WHEN** an authenticated user visits their dashboard
- **THEN** "Your Documents" becomes "Dokumen Anda"
- **THEN** Action buttons like "Upload", "Analyze", "Delete" become "Unggah", "Audit", "Hapus".
- **THEN** Search placeholders like "Search documents..." become "Cari dokumen...".

#### Scenario: Document List and Status Localization

- **WHEN** viewing document status or metadata
- **THEN** Statuses like "Completed", "Pending", "Failed" become "Selesai", "Menunggu", "Gagal".
- **THEN** Metadata labels like "Created at", "File size", "Language" become "Dibuat pada", "Ukuran file", "Bahasa".

#### Scenario: Profile and Settings Localization

- **WHEN** the user accesses profile settings
- **THEN** Labels like "Display Name", "Email Preferences", and "API Keys" are rendered in Indonesian.
