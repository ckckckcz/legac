## ADDED Requirements

### Requirement: Display User Activity History
The system SHALL track and display user activities including document uploads, downloads, and login history.

#### Scenario: User can view activity history
- **WHEN** a user navigates to their activity history section
- **THEN** the system displays a chronological list of their recent activities

#### Scenario: Activity history shows document uploads
- **WHEN** a user views their activity history
- **THEN** the system displays document upload events with date, time, and document name

#### Scenario: Activity history shows login events
- **WHEN** a user views their activity history
- **THEN** the system displays login events with date, time, and device/browser information

#### Scenario: Activity history is paginated
- **WHEN** a user has many activity records
- **THEN** the system displays activities in pages with navigation to view more records

### Requirement: Filter Activity History
The system SHALL allow users to filter their activity history by type and date range.

#### Scenario: User can filter by activity type
- **WHEN** a user applies a filter for activity type (uploads, logins, downloads)
- **THEN** the system displays only activities matching the selected type

#### Scenario: User can filter by date range
- **WHEN** a user selects a date range for activity history
- **THEN** the system displays only activities within that range

### Requirement: Download Activity Report
The system SHALL allow users to export their activity history as a report.

#### Scenario: User can download activity report
- **WHEN** a user clicks the download/export button on activity history
- **THEN** the system generates and downloads an activity report in CSV or PDF format
