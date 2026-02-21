## ADDED Requirements

### Requirement: AUTH_SECRET environment variable configuration
The system SHALL require AUTH_SECRET to be set as an environment variable for NextAuth session encryption and security.

#### Scenario: AUTH_SECRET is configured
- **WHEN** the application starts
- **THEN** NextAuth reads AUTH_SECRET from the environment variables

#### Scenario: Missing AUTH_SECRET is detected
- **WHEN** AUTH_SECRET environment variable is not set
- **THEN** the application logs a warning or error during startup

### Requirement: Session encryption
The system SHALL use AUTH_SECRET to encrypt and decrypt session data to prevent tampering and ensure security.

#### Scenario: Sessions are encrypted
- **WHEN** a user authenticates successfully
- **THEN** the session data is encrypted using AUTH_SECRET

### Requirement: JWT token signing
The system SHALL use AUTH_SECRET as the key for signing JWT tokens used in session management.

#### Scenario: JWT tokens are properly signed
- **WHEN** a JWT token is created
- **THEN** it is signed with the AUTH_SECRET key
