## 1. Install shadcn/ui Components

- [x] 1.1 Install shadcn/ui `tabs`, `scroll-area`, and `sheet` components via `pnpm dlx shadcn@latest add tabs scroll-area sheet`

## 2. Create repo-service.ts

- [x] 2.1 Create `src/lib/services/repo-service.ts` with types: `GitHubRepo`, `GitHubContributor`, `GitHubCommit`
- [x] 2.2 Implement `fetchUserRepos(accessToken)` — calls `GET /user/repos` with `Authorization: Bearer <token>`
- [x] 2.3 Implement `fetchRepoContributors(owner, repo, accessToken)` — calls `GET /repos/{owner}/{repo}/contributors`
- [x] 2.4 Implement `fetchRepoCommits(owner, repo, accessToken)` — calls `GET /repos/{owner}/{repo}/commits?per_page=10`
- [x] 2.5 Ensure all functions throw on non-2xx GitHub responses with status + message

## 3. Create API Routes

- [x] 3.1 Create `src/app/api/repos/route.ts` — `GET /api/repos` proxying GitHub `/user/repos`, with 401 guards and `next: { revalidate: 60 }` caching
- [x] 3.2 Create `src/app/api/repos/[owner]/[repo]/detail/route.ts` — `GET /api/repos/[owner]/[repo]/detail` returning `{ contributors, commits }`, capped at 10 each, with 401/404 handling

## 4. Create Presentational Components

- [x] 4.1 Create `src/components/repos/RepoCommits.tsx` — accepts `commits: GitHubCommit[]` prop, renders up to 10 commit rows (SHA link, message, author, date), skeleton + empty state
- [x] 4.2 Create `src/components/repos/RepoContributors.tsx` — accepts `contributors: GitHubContributor[]` prop, renders avatar + username + contribution count, skeleton + empty state
- [x] 4.3 Create `src/components/repos/RepoCard.tsx` — accepts `repo: GitHubRepo` and `onClick` prop, renders card with name, description, language badge, visibility badge, star/fork counts

## 5. Create Interactive Components

- [x] 5.1 Create `src/components/repos/RepoDetail.tsx` — Client Component, accepts `repo: GitHubRepo | null` and `open/onOpenChange` props, renders shadcn/ui `Sheet` with repo metadata, fetches detail from `/api/repos/[owner]/[repo]/detail` on open, renders `RepoContributors` and `RepoCommits`, includes disabled "Generate Legacy Code" button with "Coming soon" label
- [x] 5.2 Create `src/components/repos/RepoList.tsx` — Client Component, fetches `/api/repos` on mount, renders search input + grid of `RepoCard`s, manages selected repo state, renders `RepoDetail` sheet, shows skeleton during load and error message on failure, shows "Showing public repositories only" notice when appropriate

## 6. Integrate into User Page

- [x] 6.1 ~~Modify `src/app/user/[id]/page.tsx` to wrap existing Document Management content in a `TabsContent` and add a second `TabsContent` for the `RepoList` component using shadcn/ui `Tabs`~~ (superseded by 6.2–6.4)

## 7. Dedicated Repository Page Route

- [x] 7.1 Revert `src/app/user/[id]/page.tsx` to standalone Document Management (remove Tabs + RepoList)
- [x] 7.2 Create `src/app/user/[id]/repository/page.tsx` — dedicated page with Sidebar + RepoList, auth guard
- [x] 7.3 Wire sidebar "Repository" nav item to `/user/[id]/repository` using session user id

## 8. Private Repos Access + Language Logo Enhancement

- [x] 8.1 Add `repo` scope to GitHub OAuth provider in `src/auth.ts` so private repositories are included
- [x] 8.2 Create `src/lib/utils/language-icon.ts` — maps GitHub language names to devicons CDN URLs
- [x] 8.3 Update `src/components/repos/RepoCard.tsx` — replace text language badge with devicons logo + name
