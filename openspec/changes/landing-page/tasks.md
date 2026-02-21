## 1. Project Structure & shadcn/ui Components

- [x] 1.1 Create the `src/components/landing/` folder
- [x] 1.2 Install missing shadcn/ui components needed by landing sections: `Separator` (run `pnpm dlx shadcn add separator`)
- [x] 1.3 Verify existing components are available: `Badge`, `Button`, `Card`, `Avatar` (check `src/components/ui/`)

## 2. LandingAbout Component

- [x] 2.1 Create `src/components/landing/LandingAbout.tsx` as a Server Component (no `"use client"`)
- [x] 2.2 Add a `Badge` labelling the section (e.g. "About Us")
- [x] 2.3 Add a prominent tagline heading summarising Legac's value proposition
- [x] 2.4 Add a descriptive paragraph about the product/company
- [x] 2.5 Add at least one `Button` call-to-action (e.g. "Learn More" or "Get Started")

## 3. LandingTeams Component

- [x] 3.1 Create `src/components/landing/LandingTeams.tsx` as a Server Component (no `"use client"`)
- [x] 3.2 Define a typed `TEAM_MEMBERS` constant array with fields: `name`, `role`, `bio`, `avatarUrl`, `initials`
- [x] 3.3 Render team members in a responsive grid using shadcn/ui `Card` and `CardContent`
- [x] 3.4 Include `Avatar`, `AvatarImage`, and `AvatarFallback` (showing initials) for each member
- [x] 3.5 Include a `Badge` for each member's role/title

## 4. LandingWhyUs Component

- [x] 4.1 Create `src/components/landing/LandingWhyUs.tsx` as a Server Component (no `"use client"`)
- [x] 4.2 Define a typed `VALUE_PROPS` constant array with fields: `icon` (Lucide component), `title`, `description`
- [x] 4.3 Render at least three value proposition cards using `Card`, `CardHeader`, `CardTitle`, and `CardDescription`
- [x] 4.4 Render the Lucide icon for each card

## 5. LandingFeatures Component

- [x] 5.1 Create `src/components/landing/LandingFeatures.tsx` as a Server Component (no `"use client"`)
- [x] 5.2 Define a typed `FEATURES` constant array with fields: `icon` (Lucide component), `title`, `description`, `badge`
- [x] 5.3 Render at least three feature cards in a responsive grid using `Card` and `CardContent`
- [x] 5.4 Include a `Badge` label and Lucide icon on each feature card

## 6. LandingFooter Component

- [x] 6.1 Create `src/components/landing/LandingFooter.tsx` as a Server Component (no `"use client"`)
- [x] 6.2 Add internal navigation links (About, Features, Teams) rendered as shadcn/ui `Button` with `variant="ghost"`
- [x] 6.3 Add social media links rendered as shadcn/ui `Button` with Lucide icons (e.g. `Github`, `Twitter`)
- [x] 6.4 Add a `Separator` between the main link area and the copyright bar
- [x] 6.5 Add a copyright notice with the current year and "Legac"
- [x] 6.6 Confirm `src/components/Footer.tsx` is NOT modified

## 7. Assembly in page.tsx

- [x] 7.1 Import `LandingAbout`, `LandingTeams`, `LandingWhyUs`, `LandingFeatures`, `LandingFooter` into `src/app/page.tsx`
- [x] 7.2 Append each section below the existing hero section in the correct order: About → Teams → Why Us → Features → Footer
- [x] 7.3 Confirm the existing hero section and its content are unchanged

## 8. Verification

- [x] 8.1 Run `pnpm build` and confirm no TypeScript or compilation errors
- [x] 8.2 Run `pnpm dev` and visually verify all five sections render on the landing page
- [x] 8.3 Verify mobile responsiveness for all sections (grid layouts collapse correctly on small screens)
- [x] 8.4 Verify `AvatarFallback` initials render when no avatar image is provided for team members
