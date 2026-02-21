'use client';

import { useSessionWithStorage } from '@/lib/hooks/useSessionStorage';

/**
 * SessionSync — zero-render component that mounts useSessionWithStorage
 * at the app root to ensure session data and JWT token are always written
 * to localStorage after OAuth login, and cleared on logout.
 *
 * Renders null — no visible output, no layout impact.
 */
export function SessionSync() {
  useSessionWithStorage();
  return null;
}
