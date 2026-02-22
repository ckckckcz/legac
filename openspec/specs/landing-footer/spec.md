# Landing Footer

## Requirements

### Requirement: Landing page displays a footer section

The system SHALL render a footer section at the bottom of the landing page (`/`), below the hero section. The footer SHALL NOT appear on any other pages (docs, dashboard, profile).

#### Scenario: Footer is visible on the landing page

- **WHEN** a user visits the landing page at `/`
- **THEN** a footer section is rendered below the hero content

#### Scenario: Footer is not rendered on other pages

- **WHEN** a user visits `/docs`, `/user/*`, or any non-landing page
- **THEN** no footer section is rendered

### Requirement: Footer displays the Legac brand

The system SHALL render the official `logo.png` image and "Legac" brand name in the footer, consistent with the Navbar branding.

#### Scenario: Brand is visible in the footer

- **WHEN** the footer is rendered
- **THEN** the official `logo.png` image and "Legac" text are displayed

### Requirement: Footer displays navigation links

The system SHALL render navigation links in the footer including Home, Features, Testimonial, Blogs, About Us, and Docs. Links SHALL use green hover accents (`hover:text-green-700`) consistent with the Navbar style.

#### Scenario: All navigation links are present

- **WHEN** the footer is rendered
- **THEN** links for Home, Features, Testimonial, Blogs, About Us, and Docs are displayed

#### Scenario: Navigation links have hover styling

- **WHEN** a user hovers over a footer navigation link
- **THEN** the link text color changes to green (`text-green-700`)

### Requirement: Footer displays a GitHub link

The system SHALL render a GitHub icon link in the footer that opens the project repository in a new tab.

#### Scenario: GitHub icon link is present

- **WHEN** the footer is rendered
- **THEN** a clickable GitHub icon is displayed that links to the repository URL with `target="_blank"` and `rel="noopener noreferrer"`

### Requirement: Footer displays a copyright notice

The system SHALL render a copyright notice at the bottom of the footer with the current year and "Legac" brand name, separated from the main footer content by a top border.

#### Scenario: Copyright text is displayed

- **WHEN** the footer is rendered
- **THEN** a copyright line reading "© {current year} Legac. All rights reserved." is visible below a border divider

### Requirement: Footer uses a dark background for visual contrast

The system SHALL render the footer with a dark background (e.g., `bg-gray-950`) and light text to create visual separation from the light-themed hero section above it.

#### Scenario: Footer has dark background styling

- **WHEN** the footer is rendered
- **THEN** the footer container has a dark background color and light-colored text
