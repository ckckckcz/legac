import { Pool } from "pg";

let pool: Pool | null = null;

/**
 * Get a shared PostgreSQL pool (lazy singleton).
 * Uses DATABASE_URL from environment with SSL.
 */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
}
