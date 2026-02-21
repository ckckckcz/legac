/**
 * Custom React hooks for session and storage management
 * Provides client-side session access with localStorage fallback and synchronization
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import {
  getStoredSessionData,
  storeSessionData,
  clearSessionData,
  getStoredToken,
  storeAuthToken,
} from "@/lib/utils/session-storage";
import type { StoredSessionData, StoredSessionUser } from "@/lib/types/session-storage";

/**
 * Hook for localStorage session management
 * Provides utilities to store, retrieve, and clear session data from localStorage
 */
export function useSessionStorage() {
  const storeSession = useCallback(
    (user: StoredSessionUser, expiresAt: Date) => {
      storeSessionData(user, expiresAt);
    },
    []
  );

  const getSession = useCallback((): StoredSessionData | null => {
    return getStoredSessionData();
  }, []);

  const clearSession = useCallback(() => {
    clearSessionData();
  }, []);

  return {
    storeSession,
    getSession,
    clearSession,
  };
}

/**
 * Hook that combines NextAuth useSession with localStorage synchronization
 * Automatically syncs server session data to localStorage and provides unified access
 * 
 * Features:
 * - Syncs NextAuth session to localStorage on mount and when session changes
 * - Provides stored session as fallback if server session is not yet loaded
 * - Automatically clears localStorage on logout
 * - Handles session expiration and token refresh
 */
export function useSessionWithStorage() {
  const { data: session, status } = useSession();
  const { storeSession, getSession, clearSession } = useSessionStorage();
  const [isLoading, setIsLoading] = useState(true);
  const [storedSession, setStoredSession] = useState<StoredSessionData | null>(null);

  // Initialize stored session from localStorage on mount
  useEffect(() => {
    const stored = getSession();
    setStoredSession(stored);
    setIsLoading(false);
  }, [getSession]);

  // Sync server session to localStorage when it changes
  useEffect(() => {
    if (session?.user) {
      // Calculate expiration: 30 days from now (matches NextAuth default)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      // Store session user data
      const userToStore: StoredSessionUser = {
        id: session.user.id || "",
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        username: (session.user as any).username,
      };

      storeSession(userToStore, expiresAt);
      setStoredSession({
        user: userToStore,
        expires: expiresAt.toISOString(),
      });

      // Also store JWT token if available in session
      if ((session as any).accessToken) {
        storeAuthToken((session as any).accessToken);
      }
    } else if (status === "unauthenticated") {
      // Clear storage when user logs out
      clearSession();
      setStoredSession(null);
    }
  }, [session, status, storeSession, clearSession]);

  return {
    session,
    status,
    isLoading,
    storedSession,
    // Provide the more complete session (server session takes precedence)
    effectiveSession: session || storedSession,
  };
}

/**
 * Hook for accessing and managing auth tokens
 * Retrieves tokens from localStorage for use in API requests
 */
export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getStoredToken();
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  return {
    token,
    isLoading,
    hasToken: token !== null,
  };
}
