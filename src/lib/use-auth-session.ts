"use client";

import { useSession, useSessionStatus } from "next-auth/react";

/**
 * Hook to get the current session and status in client components
 * @returns Object with session, status, and isLoading
 */
export function useAuthSession() {
  const { data: session, status, update } = useSession();
  
  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    user: session?.user || null,
    refetch: update,
  };
}
