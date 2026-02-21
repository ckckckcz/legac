## ADDED Requirements

### Requirement: OAuth callback URL handling
The system SHALL properly handle GitHub OAuth callbacks and redirect users to the correct callback URL configured in both the application and GitHub app settings.

#### Scenario: OAuth callback URL matches configuration
- **WHEN** GitHub OAuth completes authentication and redirects to the callback URL
- **THEN** the callback URL matches the configuration in both the application and GitHub OAuth app

#### Scenario: User is redirected after successful authentication
- **WHEN** GitHub OAuth authentication completes successfully
- **THEN** the user is redirected to the application's post-login page

### Requirement: Post-login redirection
The system SHALL redirect authenticated users to an appropriate page after successful OAuth login, typically a dashboard or profile page.

#### Scenario: User is redirected to dashboard after login
- **WHEN** a user successfully authenticates via GitHub OAuth
- **THEN** the user is redirected to a dashboard or home page

#### Scenario: User is redirected to originally requested page
- **WHEN** a user was attempting to access a protected route and was redirected to login
- **THEN** after authentication, the user is redirected back to the originally requested page

### Requirement: Redirect URL validation
The system SHALL validate redirect URLs to prevent open redirect vulnerabilities.

#### Scenario: Invalid redirect URLs are rejected
- **WHEN** a redirect URL is provided that is not in the allowlist
- **THEN** the redirect is rejected and the user is sent to a default safe page instead

### Requirement: OAuth error callback handling
The system SHALL handle OAuth errors from GitHub and provide appropriate feedback to the user.

#### Scenario: OAuth error is caught and displayed
- **WHEN** GitHub OAuth returns an error
- **THEN** the error is caught and displayed to the user with a message explaining what went wrong
