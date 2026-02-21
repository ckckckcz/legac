/**
 * Multi-tab session synchronization using localStorage events
 * Allows logging out in one tab to log out all open tabs
 */

import {
  SESSION_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  SESSION_EXPIRY_KEY,
} from "@/lib/types/session-storage";

/**
 * Setup listener for storage events to sync logout across tabs
 * When localStorage is cleared in one tab, other tabs will detect the change
 */
export function setupStorageSyncListener(
  onSessionCleared: () => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleStorageChange = (e: StorageEvent) => {
    // Detect when session or token is cleared
    if (
      e.key === SESSION_STORAGE_KEY ||
      e.key === TOKEN_STORAGE_KEY ||
      (e.key === null && e.newValue === null)
    ) {
      // Session was cleared in another tab
      if (e.newValue === null) {
        onSessionCleared();
      }
    }
  };

  window.addEventListener("storage", handleStorageChange);

  // Return cleanup function
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}

/**
 * Setup listener for visibility changes to refresh session when tab becomes visible
 * Useful for detecting when user switches tabs and session might have expired
 */
export function setupVisibilityChangeListener(
  onBecomeVisible: () => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      // Tab became visible - check if session is still valid
      onBecomeVisible();
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  // Return cleanup function
  return () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}

/**
 * Notify other tabs that session has been cleared
 * Used when logging out to sync logout across all tabs
 */
export function broadcastSessionClear(): void {
  if (typeof window === "undefined") return;

  try {
    // Set to null to trigger storage event in other tabs
    localStorage.setItem("legac_session_cleared", Date.now().toString());
    // Clear all session data from localStorage
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
  } catch (error) {
    console.error("Failed to broadcast session clear:", error);
  }
}

/**
 * Listen for session clear broadcast from other tabs
 */
export function setupSessionClearListener(
  onSessionClear: () => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === "legac_session_cleared" && e.newValue) {
      // Session was cleared in another tab
      onSessionClear();
    }
  };

  window.addEventListener("storage", handleStorageChange);

  // Return cleanup function
  return () => {
    window.removeEventListener("storage", handleStorageChange);
  };
}

/**
 * Force sync session to localStorage immediately
 * Useful after authentication to ensure data is stored
 */
export function forceSyncToLocalStorage(sessionData: any): void {
  if (typeof window === "undefined") return;

  try {
    if (sessionData?.user) {
      const userToStore = {
        id: sessionData.user.id || "",
        name: sessionData.user.name,
        email: sessionData.user.email,
        image: sessionData.user.image,
        username: (sessionData.user as any).username,
      };

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const sessionDataToStore = {
        user: userToStore,
        expires: expiresAt.toISOString(),
      };

      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionDataToStore));

      // Also store access token if available
      if ((sessionData as any).accessToken) {
        const tokenExpiry = Math.floor(Date.now() / 1000) + 3600; // 1 hour
        const tokenData = {
          value: (sessionData as any).accessToken,
          expiresAt: tokenExpiry * 1000,
        };
        localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
      }
    }
  } catch (error) {
    console.error("Failed to force sync to localStorage:", error);
  }
}

