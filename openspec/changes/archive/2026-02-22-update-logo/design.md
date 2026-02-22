## Context

The application currently uses various methods for logo display, mostly text or SVGs. The brand has an official `logo.png` asset in the `public` directory that should be consistently used.

## Goals / Non-Goals

**Goals:**

- Replace existing logo placeholders with `public/logo.png`.
- Ensure the logo fits naturally in existing layouts (Navbar, Footer, Docs).

**Non-Goals:**

- Changing primary colors or fonts (except where specifically requested for branding).

## Decisions

### 1. Implementation Method

- **Decision**: Use the standard HTML `img` tag or Next.js `Image` component. Given the current usage of `img` tags in other parts of the codebase, I will use `img` with appropriate sizing.
- **Rationale**: Simplest way to ensure the public asset is served.

### 2. Component Updates

- **Navbar**: Replace `<div className="w-8 h-8 rounded-lg bg-brand-blue ...">L</div>` with `<img src="/logo.png" className="w-8 h-8 object-contain" alt="Legac Logo" />`.
- **Landing Footer**: Replace the text-based `SplitText` logo with a similar layout that includes the `logo.png`.
- **Docs Sidebar**: Add the `logo.png` at the top of the sidebar or layout shell to maintain branding in the documentation area.

## Risks / Trade-offs

- **[Risk]** Logo image size might be too large/small.
  - **Mitigation**: Use explicit width and height or `h-8` type utility classes to constrain.
- **[Risk]** Logo might not look good on dark/light backgrounds.
  - **Mitigation**: Verify contrast and add a filter or background wrapper if necessary.
