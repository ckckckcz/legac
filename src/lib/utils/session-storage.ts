/**
 * localStorage utility functions for session and token management
 * 
 * Security Note: localStorage stores data in plain text accessible to JavaScript.
 * Do not store sensitive credentials here. These utilities are for:
 * - Session user data (already exposed in client components via useSession)
 * - Short-lived JWT tokens (primary auth is via httpOnly cookies)
 * - Session metadata for offline support
 */

import { 
  StoredSessionData, 
  StoredSessionUser,
  SESSION_STORAGE_KEY,
  TOKEN_STORAGE_KEY,
  SESSION_EXPIRY_KEY 
} from "@/lib/types/session-storage";

/**
 * Store session data in localStorage for client-side access
 * Called when user logs in or session is refreshed
 */
export function storeSessionData(user: StoredSessionUser, expiresAt: Date): void {
  if (typeof window === "undefined") return; // Skip on server-side

  try {
    const sessionData: StoredSessionData = {
      user,
      expires: expiresAt.toISOString(),
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
    localStorage.setItem(SESSION_EXPIRY_KEY, expiresAt.getTime().toString());
  } catch (error) {
    console.error("Failed to store session data:", error);
  }
}

/**
 * Retrieve stored session data from localStorage
 * Returns null if no session data or if session has expired
 */
export function getStoredSessionData(): StoredSessionData | null {
  if (typeof window === "undefined") return null; // Skip on server-side

  try {
    const stored = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;

    const sessionData: StoredSessionData = JSON.parse(stored);
    
    // Check if session has expired
    const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);
    if (expiryTime && parseInt(expiryTime) < Date.now()) {
      clearSessionData();
      return null;
    }

    return sessionData;
  } catch (error) {
    console.error("Failed to retrieve session data:", error);
    return null;
  }
}

/**
 * Store JWT token in localStorage for API requests
 * Note: Keep tokens short-lived and use httpOnly cookies as primary auth
 */
export function storeAuthToken(token: string, expiresInSeconds: number = 3600): void {
  if (typeof window === "undefined") return; // Skip on server-side

  try {
    const expiresAt = Date.now() + expiresInSeconds * 1000;
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify({
      value: token,
      expiresAt,
    }));
  } catch (error) {
    console.error("Failed to store auth token:", error);
  }
}

/**
 * Retrieve JWT token from localStorage
 * Returns null if token is missing or expired
 */
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null; // Skip on server-side

  try {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!stored) return null;

    const tokenData = JSON.parse(stored);
    
    // Check if token has expired
    if (tokenData.expiresAt < Date.now()) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return null;
    }

    return tokenData.value;
  } catch (error) {
    console.error("Failed to retrieve auth token:", error);
    return null;
  }
}

/**
 * Clear all session and token data from localStorage
 * Called on logout or when session becomes invalid
 */
export function clearSessionData(): void {
  if (typeof window === "undefined") return; // Skip on server-side

  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
  } catch (error) {
    console.error("Failed to clear session data:", error);
  }
}

/**
 * Get token for API requests
 * First tries to get from localStorage, can be extended to fetch from server if needed
 */
export function getAuthToken(): string | null {
  return getStoredToken();
}

/**
 * Check if stored session is still valid
 * Considers both expiration time and session existence
 */
export function isStoredSessionValid(): boolean {
  const sessionData = getStoredSessionData();
  return sessionData !== null;
}

/**
 * Serialize session data to JSON string
 * Used for localStorage storage
 */
export function serializeSessionData(session: StoredSessionData): string {
  return JSON.stringify(session);
}

/**
 * Deserialize session data from JSON string
 * Used for localStorage retrieval with error handling
 */
export function deserializeSessionData(jsonString: string): StoredSessionData | null {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to deserialize session data:", error);
    return null;
  }
}
