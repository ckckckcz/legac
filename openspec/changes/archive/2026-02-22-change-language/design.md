# Design: Indonesian Localization

## Architecture

Localization will be implemented using a simple string mapping approach within the React components. Since the application currently uses hardcoded English strings, we will extract these into a centralized dictionary or handle them directly in the component logic using a localization helper if one exists.

## Component Strategy

- **Landing Page**: Update elements in `LandingAbout.tsx`, `LandingWhyUs.tsx`, `LandingFooter.tsx`, `LandingFeatures.tsx`, `LandingBanner.tsx`, and `page.tsx` (hero section).
- **Navbar**: Update `src/components/navbar.tsx` (or equivalent) to use Indonesian links.
- **Dashboard**: Update `src/app/user/[id]/page.tsx` and related components like `DocumentGrid`, `DocumentCard`, etc.
- **Middleware**: Ensure public access routes (already done in previous task) are maintained and consistent with the new Indonesian documentation paths.

## Implementation Details

- **Static Strings**: Most strings will be replaced directly in the TSX files.
- **Tagline Preservation**: We will use a regex or specific check to ensure "AI-Powered Code Revitalization" is not translated.
- **Date Formatting**: Update date displays to use Indonesian locale (e.g., `id-ID`).
