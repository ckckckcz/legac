import { Pool } from "pg";

// Use global object to maintain pool across Next.js hot-reloads in development
let pool: Pool | null = (globalThis as any)._pgPool || null;

/**
 * Get a shared PostgreSQL pool (lazy singleton).
 * Uses DATABASE_URL from environment with SSL.
 * 
 * Connects to Supabase PostgreSQL via direct connection.
 * All application tables live in the default 'public' schema.
 */
export function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    // Bypass 'sslmode=require' in URL which conflicts with 'rejectUnauthorized: false'
    const connectionString = process.env.DATABASE_URL.replace('sslmode=require', 'sslmode=disable');

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    (globalThis as any)._pgPool = pool;

    // Log connection errors instead of crashing silently
    pool.on("error", (err) => {
      console.error("[db] Unexpected pool error:", err.message);
    });
  }
  return pool;
}
