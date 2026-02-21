## ADDED Requirements

### Requirement: Display User Profile Information
The system SHALL display user profile data including name, email, avatar, and biographical information.

#### Scenario: User profile information is displayed
- **WHEN** a user views their profile page
- **THEN** the system displays their name, email, avatar image, and bio section

#### Scenario: Profile information is read from user session
- **WHEN** a profile page loads
- **THEN** the system retrieves user information from the authenticated session (GitHub OAuth)

#### Scenario: Avatar image is displayed with fallback
- **WHEN** a user has an avatar from GitHub OAuth
- **THEN** the system displays the avatar image; if not available, shows a default placeholder avatar

### Requirement: Edit Profile Information
The system SHALL allow users to edit their profile information (name, email, bio).

#### Scenario: User can open profile edit form
- **WHEN** a user clicks an "Edit Profile" button on their profile page
- **THEN** the system opens an editable form with their current profile information

#### Scenario: User can update profile information
- **WHEN** a user fills out the profile edit form and clicks save
- **THEN** the system updates their profile information and displays a success message

#### Scenario: Form validation prevents invalid input
- **WHEN** a user enters invalid data (empty name, invalid email format)
- **THEN** the system displays validation errors and prevents submission
