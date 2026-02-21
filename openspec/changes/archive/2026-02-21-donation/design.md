## Context

Legac is the developer's own app. The Saweria and Kreate.gg accounts belong to the developer, not to individual users of the app. The donation page simply surfaces the developer's donation links to any logged-in visitor. Platform usernames are static — they don't change per user, don't need to be stored in a database, and don't require any UI for configuration. The sidebar already imports the `Heart` icon and has a stub "Donation" nav item wired to the wrong URL.

## Goals / Non-Goals

**Goals:**
- Render a `/user/[id]/donation/` page that displays the developer's Saweria and Kreate.gg links
- Read platform usernames from `NEXT_PUBLIC_SAWERIA_USERNAME` and `NEXT_PUBLIC_KREATE_USERNAME` env vars
- Saweria: show an `<iframe>` embed (`https://saweria.co/embed/<username>`) with `onError` fallback to a link card
- Kreate.gg: show a styled link card to `https://kreate.gg/<username>`
- Wire the sidebar "Donation" nav item to the correct route

**Non-Goals:**
- Per-user donation config or localStorage persistence
- Any UI for users to change platform usernames
- Payment processing, webhook handling, or transaction history
- Support for platforms other than Saweria and Kreate.gg

## Decisions

### 1. Platform usernames from environment variables

The usernames are developer-owned constants. Using `NEXT_PUBLIC_*` env vars is the correct pattern — they're baked in at build time, available client-side, and require no API calls or database.

**Alternative considered**: Hardcoding usernames directly in source. Rejected because env vars keep the config out of version control and allow changes without code edits.

### 2. Saweria embed via `<iframe>`

Saweria provides an overlay widget script, but the most stable embed approach is `<iframe src="https://saweria.co/embed/<username>">`. This renders their full donation widget inline.

**Alternative considered**: Saweria JS overlay widget (injected script). Rejected because script injection in a Next.js Client Component is fragile and requires `dangerouslySetInnerHTML` or a custom `Script` tag with unknown CSP implications.

### 3. Kreate.gg as a styled link card (no embed)

Kreate.gg has no published embed or widget API. The integration is a link card (`<a href="https://kreate.gg/<username>">`) styled consistently with the Saweria card.

### 4. Sidebar nav item correction

The sidebar already has a `Heart` icon and "Donation" stub. Only the `href` needs updating from `/user/profile/${username}` to `/user/${userId}/donation`. No structural sidebar changes needed.

## Risks / Trade-offs

- **Saweria iframe CSP**: If Saweria sets `X-Frame-Options: DENY` or a restrictive CSP, the embed will be blocked in browser. → Fall back to a link card if embed fails; detect via `onError` on the iframe.
- **Env vars missing at runtime**: If `NEXT_PUBLIC_SAWERIA_USERNAME` or `NEXT_PUBLIC_KREATE_USERNAME` are not set, the cards will show a graceful fallback rather than breaking.
