## Why

The current profile route lives at `/profile`, which is disconnected from the `/user` route namespace. The user wants to consolidate user-related routes under `/user` so that the profile page is at `/user/profile/username`, creating a more logical and consistent URL hierarchy.

## What Changes

- **BREAKING**: Move the profile page from `/profile` to `/user/profile/[username]`
- Update the middleware protected routes list to protect the new path instead of `/profile`
- Update all internal links pointing to `/profile` (sidebar, navbar, etc.) to use the new route with the authenticated user's username
- Update the callbackUrl in auth redirects to point to the new profile path
- Remove the old `/profile` route directory

## Capabilities

### New Capabilities
- `user-profile-route`: Route structure for `/user/profile/[username]` that renders the authenticated user's profile page with sidebar layout

### Modified Capabilities
- `profile-route-protection`: Update protected route from `/profile` to `/user/profile` path prefix, and update redirect callbackUrl accordingly

## Impact

- **Routes**: `/profile` removed, `/user/profile/[username]` added
- **Middleware** (`src/middleware.ts`): Protected routes array updated
- **Sidebar** (`src/components/sidebar.tsx`): Profile link href updated to dynamic path
- **Auth flows**: callbackUrl references to `/profile` updated to new path
- **Existing `/user/[id]` route**: No conflict — the `[id]` and `profile` segments are distinct under `/user`
