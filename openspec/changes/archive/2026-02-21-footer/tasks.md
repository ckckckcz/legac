## 1. Create Footer Component

- [x] 1.1 Create `src/components/Footer.tsx` with a dark-background (`bg-gray-950`) footer containing: Legac logo/brand, navigation links (Home, Features, Testimonial, Blogs, About Us, Docs), GitHub icon link (`target="_blank"`), and copyright notice with current year — separated by a `border-t` divider
- [x] 1.2 Style navigation links with `text-gray-400` default and `hover:text-green-700` accent, matching the Navbar hover pattern

## 2. Integrate Footer in Landing Page

- [x] 2.1 Import and render `<Footer />` in `src/app/page.tsx` below the hero section

## 3. Verification

- [x] 3.1 Run `pnpm build` and confirm no new TypeScript or build errors (ignore pre-existing error in `activity-logger.ts:107`)
- [x] 3.2 Visit `/` and confirm the footer renders below the hero with dark background, brand, nav links, GitHub icon, and copyright
- [x] 3.3 Confirm footer does NOT appear on `/docs` or `/user/*` pages
