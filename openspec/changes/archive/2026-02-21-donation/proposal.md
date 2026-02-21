## Why

Legac is built by a developer who wants to receive support from the community. The app should surface the developer's Saweria and Kreate.gg donation links so any logged-in user can easily find and use them to donate.

## What Changes

- New page `/user/[id]/donation/` that displays the developer's Saweria and Kreate.gg donation links
- Saweria: `<iframe>` embed pointing at `https://saweria.co/embed/<username>` with link-card fallback
- Kreate.gg: styled link card pointing at `https://kreate.gg/<username>`
- Platform usernames are configured via environment variables (`NEXT_PUBLIC_SAWERIA_USERNAME`, `NEXT_PUBLIC_KREATE_USERNAME`) — set once by the developer, not per user
- Sidebar gains a "Donation" nav item linking to `/user/[id]/donation`

## Capabilities

### New Capabilities

- `donation-page`: The `/user/[id]/donation/` route — shows Saweria iframe embed and Kreate.gg link card using developer-configured platform usernames
- `donation-config`: Developer-side configuration of platform usernames via environment variables

### Modified Capabilities

- `sidebar-logout`: Sidebar navigation gains a new "Donation" entry pointing to `/user/[id]/donation`

## Impact

- **New files**: `src/app/user/[id]/donation/page.tsx`, components under `src/components/donation/`
- **Modified files**: `src/components/sidebar.tsx` (nav item href fix), `.env` + `.env.example` (new env vars)
- **Data**: No per-user data — usernames come from `NEXT_PUBLIC_SAWERIA_USERNAME` and `NEXT_PUBLIC_KREATE_USERNAME`
- **Dependencies**: No new npm packages required
