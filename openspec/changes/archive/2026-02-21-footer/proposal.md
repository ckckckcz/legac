## Why

The landing page currently has a hero section and navbar but no footer, leaving the page feeling incomplete. A clean footer provides standard navigation, brand reinforcement, and copyright information that users expect on a professional landing page.

## What Changes

- Create a new `Footer` component using shadcn UI primitives (Separator, Button) and Lucide icons
- Add the footer to the landing page (`src/app/page.tsx`) below the hero section
- Footer content: Legac logo/brand, navigation links (mirroring the navbar), GitHub link, and copyright notice
- Clean, minimal design consistent with the existing landing page aesthetic (gray tones, green accents)

## Capabilities

### New Capabilities
- `landing-footer`: Footer section for the landing page with brand, navigation links, social link, and copyright

### Modified Capabilities
(none)

## Impact

- **Components**: New `src/components/Footer.tsx` component
- **Landing page**: `src/app/page.tsx` updated to include the Footer below the hero
- **Dependencies**: Uses existing shadcn UI components (Separator) and Lucide icons (Github) — no new packages
