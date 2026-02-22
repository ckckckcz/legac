# Specification: Theme Auth and 404 Pages

## 404 Page (not-found.tsx)
- **Background**: Light background with subtle gradients (e.g., `bg-background`).
- **Layout**: Centered content with a large "404" text followed by a friendly explanation.
- **Components**: Include a "Back to Home" button styled with `variant="default"`.
- **Styling**: Use `backdrop-blur` and rounded corners to match the "glassmorphism" vibe.

## Login Page
- **Header**: Standardize with the `Navbar` or a similar premium logo area.
- **Glassmorphism**: Ensure the login card feels "on top" of the background.
- **Colors**: Use `brand-blue` for primary buttons and accents.

## CLI Auth Page
- **Fallback State**: Change `bg-gray-950` to `bg-background`.
- **Success State**: Ensure confetti and messages use the brand color palette.
- **Logo**: Ensure logo is properly visible on a light background.
