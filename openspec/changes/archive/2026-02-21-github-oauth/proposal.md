## Why

Many applications need a secure, third-party authentication mechanism to reduce password management burden. GitHub OAuth allows users to authenticate using their GitHub credentials, improving security and user experience by leveraging an established identity provider.

## What Changes

- Add GitHub OAuth authentication flow to the application
- Users can sign in via GitHub instead of local credentials
- Authentication state is managed via sessions
- Login page integrates GitHub sign-in button
- Authenticated users can access protected routes

## Capabilities

### New Capabilities
- `github-oauth`: GitHub OAuth authentication implementation using NextAuth.js, including provider configuration, session management, and sign-in flow

### Modified Capabilities
<!-- No existing capabilities require specification changes -->

## Impact

- **Dependencies**: Adds `next-auth@beta` (Auth.js v5)
- **Environment**: Requires GitHub OAuth app credentials (`GITHUB_ID`, `GITHUB_SECRET`, `AUTH_SECRET`)
- **Code**: New auth configuration file, API routes, middleware, and login page updates
- **API**: NextAuth.js endpoints and session handling
- **Security**: Introduces session-based authentication and environment variable management
