## MODIFIED Requirements

### Requirement: GitHub OAuth callback configuration
The GitHub OAuth flow SHALL use `NEXTAUTH_URL` environment variable set to the production domain `https://weci-holic.hackathon.sev-2.com` so that OAuth callbacks resolve correctly in the deployed environment.

#### Scenario: OAuth callback works in production
- **WHEN** a user clicks "Sign in with GitHub" on the deployed app
- **THEN** GitHub SHALL redirect back to `https://weci-holic.hackathon.sev-2.com/api/auth/callback/github` after authorization

#### Scenario: NEXTAUTH_URL is set in environment
- **WHEN** the application starts in the Kubernetes pod
- **THEN** the `NEXTAUTH_URL` environment variable SHALL be `https://weci-holic.hackathon.sev-2.com`
