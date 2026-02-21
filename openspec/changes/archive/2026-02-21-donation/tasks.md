## 1. Environment Config

- [x] 1.1 Add `NEXT_PUBLIC_SAWERIA_USERNAME` and `NEXT_PUBLIC_KREATE_USERNAME` to `.env` and `.env.example`

## 2. Donation Components

- [x] 2.1 Create `src/components/donation/SaweriaCard.tsx` — reads username from `NEXT_PUBLIC_SAWERIA_USERNAME`; shows iframe embed, `onError` link-card fallback, and unavailable state when env var is empty
- [x] 2.2 Create `src/components/donation/KreateCard.tsx` — reads username from `NEXT_PUBLIC_KREATE_USERNAME`; shows styled link card, and unavailable state when env var is empty

## 3. Donation Page

- [x] 3.1 Create `src/app/user/[id]/donation/page.tsx` — Client Component with `useSession` auth guard (redirect to `/login?callbackUrl=/user/dashboard` when unauthenticated, spinner when loading), Sidebar, page header, and donation platform cards

## 4. Sidebar Fix

- [x] 4.1 Update the "Donation" nav item `href` in `src/components/sidebar.tsx` from `/user/profile/${username}` to `/user/${userId}/donation`
