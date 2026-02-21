/**
 * Types for session storage and management
 * Defines the structure of data stored in localStorage and session context
 */

export interface StoredSessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
}

export interface StoredSessionData {
  user: StoredSessionUser;
  expires: string; // ISO date string for session expiration
  accessToken?: string; // Optional: OAuth access token if stored
}

export interface SessionToken {
  value: string;
  expiresAt: number; // Unix timestamp
}

export const SESSION_STORAGE_KEY = "legac_session_data";
export const TOKEN_STORAGE_KEY = "legac_auth_token";
export const SESSION_EXPIRY_KEY = "legac_session_expiry";
