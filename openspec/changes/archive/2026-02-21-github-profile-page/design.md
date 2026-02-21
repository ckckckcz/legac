## Context

The application needs a new profile page that displays GitHub user data alongside additional profile metadata. The page must integrate with the existing sidebar navigation and follow the application's design system (shadcn/ui). GitHub data will be fetched via the GitHub API, requiring secure credential handling. The page should be responsive and maintain consistent styling with existing pages.

## Goals / Non-Goals

**Goals:**
- Create a visually cohesive profile page using shadcn/ui components
- Display GitHub user information (avatar, username, bio, URL) from GitHub API
- Show GitHub statistics (repos, followers, following, contributions)
- Display additional profile metadata (account creation, location, company)
- Integrate seamlessly with existing sidebar navigation
- Ensure responsive design for mobile and desktop viewports
- Provide secure GitHub API credential handling

**Non-Goals:**
- User profile editing (read-only display)
- Real-time GitHub data synchronization
- GitHub organization profiles or team data
- OAuth implementation (use existing authentication if available)

## Decisions

### 1. Component Architecture
**Decision**: Create a modular component hierarchy with separate components for each capability.
- `ProfilePage` (main container with sidebar)
- `GitHubProfileCard` (displays avatar, username, bio, profile link)
- `GitHubStatsSection` (displays repos, followers, following, contributions)
- `ProfileMetadataSection` (displays account creation, location, company, email)

**Rationale**: Separation of concerns allows independent testing, reuse, and easier maintenance. Each component maps to a capability defined in the proposal.

**Alternatives Considered**:
- Monolithic single component (simpler initially but harder to maintain and test)
- Server-side rendering (would require backend changes; client-side is simpler)

### 2. Data Fetching Strategy
**Decision**: Fetch GitHub data client-side using a custom hook with caching.
- Create `useGithubProfile` hook to fetch and cache user data
- Cache data in component state or context to avoid repeated API calls
- Display loading state while fetching

**Rationale**: Client-side fetching keeps the architecture simple and doesn't require backend API modifications. Caching prevents excessive API calls and improves performance.

**Alternatives Considered**:
- Backend GraphQL endpoint (more complex, requires backend development)
- Direct REST API calls without caching (inefficient, hits rate limits)

### 3. GitHub API Credential Handling
**Decision**: Use a personal access token stored securely in environment variables.
- Token accessed via `process.env.REACT_APP_GITHUB_TOKEN` (or similar)
- Token should have `public_repo` and `user` scopes
- Avoid hardcoding or exposing token in version control

**Rationale**: Environment variables are the standard approach for sensitive data in client applications. The required scopes provide access to public user data without exposing private information.

**Alternatives Considered**:
- OAuth flow (more complex, requires setup)
- Backend relay (more complex, requires backend changes)

### 4. UI Consistency
**Decision**: Use shadcn/ui components exclusively:
- `Card` for section containers (profile, stats, metadata)
- `Avatar` for GitHub profile picture
- `Badge` for stats display
- `Separator` for visual dividers
- `Skeleton` for loading states

**Rationale**: shadcn/ui components match the application's existing design system and provide accessible, consistent UI patterns.

### 5. Page Layout Structure
**Decision**: Use the existing page layout system that preserves the sidebar.
- Profile page follows the same layout wrapper as other pages
- Content area uses responsive grid for desktop, stacked layout for mobile
- Sidebar remains fixed or sticky as per application convention

**Rationale**: Maintains consistency with existing pages and leverages proven layout patterns.

## Risks / Trade-offs

**[Risk]** GitHub API rate limiting (60 requests/hour for unauthenticated, 5,000 for authenticated)
→ **Mitigation**: Implement client-side caching with reasonable expiration (e.g., 5-10 minutes). Display cached data on rate limit error with a "Last updated" timestamp.

**[Risk]** Exposed GitHub API token in environment variables
→ **Mitigation**: Use `.env.local` (gitignored) for local development. Document secure environment variable handling for production. Consider token rotation strategy.

**[Risk]** Long data load time on slow networks
→ **Mitigation**: Show skeleton loaders for each section while fetching. Display partial data as it loads using progressive enhancement.

**[Risk]** GitHub API endpoint changes or deprecations
→ **Mitigation**: Pin API version in requests. Document API endpoints used. Create abstraction layer (`githubApi.ts`) for easy future updates.

**Trade-off**: Client-side data fetching means GitHub API calls are visible to users but simplifies architecture. Alternative backend approach would add complexity.

**Trade-off**: Caching improves performance but adds slight staleness to displayed data. Users see data from the last 5-10 minutes rather than perfectly fresh data.
