# GitHub OAuth Implementation

## Summary
Implement authentication using GitHub OAuth provider via NextAuth.js (Auth.js v5). The login page already has a UI button for "Log In with GitHub". This needs to be wired up to actual authentication logic.

## Technical Details
- **Framework**: Start with installing `next-auth@beta`.
- **Environment**: Use `.env.local` for secrets.
  - `AUTH_GITHUB_ID`
  - `AUTH_GITHUB_SECRET`
  - `AUTH_SECRET` (generate with `npx auth secret` or similar)

## Implementation Steps

### 1. Install Dependencies
Install the required package:
```bash
npm install next-auth@beta
```

### 2. Configuration Setup
Create a main configuration file at `src/auth.ts`:
- Configure the GitHub provider using `next-auth/providers/github`.
- Export `{ handlers, signIn, signOut, auth }` from `NextAuth(config)`.

### 3. API Route Handler
Create an API route at `src/app/api/auth/[...nextauth]/route.ts`:
- Import `handlers` from `src/auth.ts`.
- Export `GET` and `POST` methods.

### 4. Middleware (Optional but Recommended)
Create `src/middleware.ts` to protect routes or manage session updates, importing `auth` from `src/auth.ts`.

### 5. Update Login Page
Modify `src/app/(auth)/login/page.tsx`:
- Import `signIn` from `next-auth/react` (client-side) or create a server action if using `src/auth.ts` `signIn`.
- Since the button is in a client component ("use client"), use a server action or `signIn` client function.
- Ideally, wrap the button in a form action that calls a server function `async () => { "use server"; await signIn("github"); }` inside the component, or use the client `signIn`.
- Note: The current `page.tsx` is `"use client"`. It might be easier to use `onclick={() => signIn("github")}` if using SessionProvider, or better yet, refactor the button into a distinct server component or use server actions if possible.
- **Recommended Approach**: Keep `page.tsx` as client or server? It is currently `"use client"`. Use `next-auth/react` `signIn` method or create a server action in a separate file `src/app/actions/auth.ts` and call it.

### 6. Environment Variables
Add the following to `.env`:
```
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
AUTH_SECRET=...
```

## Acceptance Criteria
- [ ] User can click "Log In with GitHub" on `/login`.
- [ ] User is redirected to GitHub to authorize.
- [ ] User is redirected back to the app (e.g., dashboard or home) after successful login.
- [ ] Session is persisted.
