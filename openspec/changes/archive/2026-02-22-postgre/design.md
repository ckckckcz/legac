# Design: PostgreSQL Schema Implementation

## Architecture Overview

The database will be structured to support a hierarchical data model: Users -> Repositories -> Documentations -> Pages. This aligns with the multi-page documentation structure recently implemented in the frontend.

## Components

### 1. SQL Migrations

- We will use plain `.sql` files in the `database` directory for schema initialization.
- Files will be prefixed with numbers to ensure correct execution order (e.g., `01_users.sql`, `02_repostories.sql`, etc.).

### 2. Table Relationships

- **User to Repository**: One-to-Many. A user can track multiple repositories.
- **Repository to Documentation**: One-to-One (or One-to-Many if snapshots are needed). For now, one main analysis per repo.
- **Documentation to Pages**: One-to-Many. Essential for the multi-page markdown renderer.

## Implementation Approach

1. **Initial Schema**: Create `database/schema.sql` containing all table definitions and constraints.
2. **Foreign Keys**: Explicitly define `ON DELETE CASCADE` for repositories and documentation to maintain referential integrity.
3. **Indices**: Add indices on `user_id` in repositories and `repository_id` in documentation for query optimization.

## Data Mapping

- The `pages` field in the current `mock-data.ts` will map directly to rows in the `documentation_pages` table.
- The `thumbnail` emoji or URL will be stored in the `documentations` table.

## Security

- Use UUID version 4 for all primary keys.
- Ensure email and username are searchable and unique.
