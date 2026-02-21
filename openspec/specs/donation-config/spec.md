### Requirement: Donation platform usernames are configured via environment variables
The system SHALL read the developer's Saweria username from `NEXT_PUBLIC_SAWERIA_USERNAME` and the Kreate.gg username from `NEXT_PUBLIC_KREATE_USERNAME`. These are `NEXT_PUBLIC_` prefixed so they are available in Client Components at runtime without any API call.

#### Scenario: Both env vars are set
- **WHEN** `NEXT_PUBLIC_SAWERIA_USERNAME` and `NEXT_PUBLIC_KREATE_USERNAME` are both defined
- **THEN** both donation cards render using the configured usernames

#### Scenario: An env var is missing or empty
- **WHEN** one or both env vars are not set or are empty strings
- **THEN** the corresponding donation card renders a graceful unavailable state rather than throwing an error

#### Scenario: Env vars are documented in .env.example
- **WHEN** a developer sets up the project
- **THEN** `.env.example` includes `NEXT_PUBLIC_SAWERIA_USERNAME` and `NEXT_PUBLIC_KREATE_USERNAME` with placeholder values
