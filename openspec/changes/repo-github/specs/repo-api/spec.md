## ADDED Requirements

### Requirement: GET /api/repos returns the authenticated user's repository list
The system SHALL expose a `GET /api/repos` API route that returns a list of repositories for the currently authenticated user by calling the GitHub API `GET /user/repos` endpoint using the user's OAuth access token from the server-side session.

#### Scenario: Returns repository list for authenticated user
- **WHEN** an authenticated user makes a `GET /api/repos` request
- **THEN** the route SHALL call GitHub API `GET /user/repos` with the user's `accessToken`
- **THEN** the route SHALL return a JSON array of repository objects with status 200

#### Scenario: Returns 401 when user is not authenticated
- **WHEN** an unauthenticated request is made to `GET /api/repos`
- **THEN** the route SHALL return `{ error: "Unauthorized" }` with status 401

#### Scenario: Returns 401 when access token is missing from session
- **WHEN** an authenticated session exists but `accessToken` is absent
- **THEN** the route SHALL return `{ error: "No access token" }` with status 401

#### Scenario: Forwards GitHub API errors to the client
- **WHEN** the GitHub API returns a non-2xx response (e.g. 403 rate limit, 401 invalid token)
- **THEN** the route SHALL return `{ error: "<message>" }` with the corresponding HTTP status code

#### Scenario: Repository objects include required fields
- **WHEN** the route returns a successful response
- **THEN** each repository object SHALL include: `id`, `name`, `full_name`, `description`, `private`, `html_url`, `language`, `stargazers_count`, `forks_count`, `updated_at`, `visibility`

### Requirement: GET /api/repos/[owner]/[repo]/detail returns contributors and recent commits
The system SHALL expose a `GET /api/repos/[owner]/[repo]/detail` API route that fetches and returns both the top contributors (max 10) and the most recent commits (max 10) for the specified repository, using the authenticated user's OAuth access token.

#### Scenario: Returns contributors and commits for a valid repository
- **WHEN** an authenticated user makes a `GET /api/repos/{owner}/{repo}/detail` request
- **THEN** the route SHALL call GitHub API `GET /repos/{owner}/{repo}/contributors` and `GET /repos/{owner}/{repo}/commits`
- **THEN** the route SHALL return `{ contributors: [...], commits: [...] }` with status 200

#### Scenario: Contributors are limited to the top 10
- **WHEN** the GitHub API returns more than 10 contributors
- **THEN** the route SHALL return only the first 10 contributors ordered by contribution count descending

#### Scenario: Commits are limited to the most recent 10
- **WHEN** fetching commits from GitHub API
- **THEN** the route SHALL request with `per_page=10` and return only those 10 commits

#### Scenario: Returns 401 when user is not authenticated
- **WHEN** an unauthenticated request is made to the detail route
- **THEN** the route SHALL return `{ error: "Unauthorized" }` with status 401

#### Scenario: Returns 404 when repository does not exist or is inaccessible
- **WHEN** the GitHub API returns 404 for the specified repository
- **THEN** the route SHALL return `{ error: "Repository not found" }` with status 404

#### Scenario: Contributor objects include required fields
- **WHEN** the detail route returns a successful response
- **THEN** each contributor object SHALL include: `login`, `avatar_url`, `html_url`, `contributions`

#### Scenario: Commit objects include required fields
- **WHEN** the detail route returns a successful response
- **THEN** each commit object SHALL include: `sha`, `html_url`, `commit.message`, `commit.author.name`, `commit.author.date`

### Requirement: repo-service.ts provides typed wrappers for GitHub API calls
The system SHALL implement `src/lib/services/repo-service.ts` that encapsulates all GitHub API calls for repository data. Functions SHALL accept `accessToken` as a parameter and use `Authorization: Bearer <token>` headers.

#### Scenario: fetchUserRepos returns typed GitHubRepo array
- **WHEN** `fetchUserRepos(accessToken)` is called with a valid token
- **THEN** it SHALL return a `GitHubRepo[]` array by calling `GET /user/repos`

#### Scenario: fetchRepoContributors returns typed GitHubContributor array
- **WHEN** `fetchRepoContributors(owner, repo, accessToken)` is called
- **THEN** it SHALL return a `GitHubContributor[]` array by calling `GET /repos/{owner}/{repo}/contributors`

#### Scenario: fetchRepoCommits returns typed GitHubCommit array
- **WHEN** `fetchRepoCommits(owner, repo, accessToken)` is called
- **THEN** it SHALL return a `GitHubCommit[]` array by calling `GET /repos/{owner}/{repo}/commits?per_page=10`

#### Scenario: Service functions throw on non-2xx GitHub responses
- **WHEN** any service function receives a non-2xx response from GitHub API
- **THEN** it SHALL throw an error with the HTTP status and error message
