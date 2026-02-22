# Spec: Database Schema Design

## Overview

This specification details the SQL schema for the PostgreSQL database, covering users, repositories, and generated documentation.

## User Stories

- As a system, I need to track who is logged in and their profile information.
- As a user, I want to see a list of repositories I have synchronized.
- As a user, I want to access generated documentation for each repostiory.

## Scenarios

### Scenario: Creating the Users table

- **GIVEN** a new PostgreSQL database
- **WHEN** the user management table is initialized
- **THEN** it should store `id`, `username`, `email`, `avatar_url`, and `status` (active/inactive).

### Scenario: Creating the Repositories table

- **GIVEN** a logged-in user
- **WHEN** they sync a GitHub repository
- **THEN** it should be stored in the `repositories` table with a link to the `user_id`.

### Scenario: Creating the Generated Documentation table

- **GIVEN** a completed analysis for a repository
- **WHEN** the results are saved
- **THEN** they should be stored in the `generated_documentations` table with a foreign key to `repository_id` and support multi-page content (title, content, page_order).

## Technical Details

### Proposed Tables

#### 1. `users`

| Column       | Type         | Constraints                            |
| ------------ | ------------ | -------------------------------------- |
| id           | UUID         | PRIMARY KEY, DEFAULT gen_random_uuid() |
| username     | VARCHAR(255) | NOT NULL, UNIQUE                       |
| email        | VARCHAR(255) | NOT NULL, UNIQUE                       |
| avatar_url   | TEXT         |                                        |
| login_status | BOOLEAN      | DEFAULT FALSE                          |
| created_at   | TIMESTAMP    | DEFAULT NOW()                          |

#### 2. `repositories`

| Column      | Type         | Constraints                            |
| ----------- | ------------ | -------------------------------------- |
| id          | UUID         | PRIMARY KEY, DEFAULT gen_random_uuid() |
| user_id     | UUID         | FOREIGN KEY REFERENCES users(id)       |
| name        | VARCHAR(255) | NOT NULL                               |
| full_name   | VARCHAR(255) | NOT NULL                               |
| github_url  | TEXT         |                                        |
| description | TEXT         |                                        |
| created_at  | TIMESTAMP    | DEFAULT NOW()                          |

#### 3. `documentations`

| Column        | Type         | Constraints                                               |
| ------------- | ------------ | --------------------------------------------------------- |
| id            | UUID         | PRIMARY KEY, DEFAULT gen_random_uuid()                    |
| repository_id | UUID         | FOREIGN KEY REFERENCES repositories(id) ON DELETE CASCADE |
| title         | VARCHAR(255) | NOT NULL                                                  |
| description   | TEXT         |                                                           |
| created_at    | TIMESTAMP    | DEFAULT NOW()                                             |

#### 4. `documentation_pages`

| Column           | Type         | Constraints                                                 |
| ---------------- | ------------ | ----------------------------------------------------------- |
| id               | UUID         | PRIMARY KEY, DEFAULT gen_random_uuid()                      |
| documentation_id | UUID         | FOREIGN KEY REFERENCES documentations(id) ON DELETE CASCADE |
| slug             | VARCHAR(255) | NOT NULL (e.g., 'overview', 'components')                   |
| title            | VARCHAR(255) | NOT NULL                                                    |
| content          | TEXT         | NOT NULL (Markdown)                                         |
| page_order       | INTEGER      | DEFAULT 0                                                   |

## Constraints

- Use snake_case for all identifiers.
- Ensure cascading deletes for documentation when a repository is removed.
- Use UUIDs for primary keys to ensure scalability and avoid predictable IDs.
