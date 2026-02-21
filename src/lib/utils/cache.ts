/**
 * Simple Cache Utility
 * Provides client-side caching with TTL (Time To Live)
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class CacheStore {
  private cache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Set a value in the cache with TTL
   * @param key Cache key
   * @param data Data to cache
   * @param ttlMs Time to live in milliseconds (default: 5 minutes)
   */
  set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  /**
   * Get a value from the cache
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      return null;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Check if a key exists and is not expired
   * @param key Cache key
   * @returns True if key exists and is valid
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  /**
   * Delete a key from the cache
   * @param key Cache key
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Clear all cached data
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache entry info (for debugging)
   * @param key Cache key
   * @returns Cache entry metadata or null
   */
  getInfo(key: string) {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const age = Date.now() - entry.timestamp;
    const isExpired = age > entry.ttl;

    return {
      age,
      ttl: entry.ttl,
      isExpired,
      expiresIn: Math.max(0, entry.ttl - age),
    };
  }
}

// Create a singleton cache instance
export const profileCache = new CacheStore();

/**
 * Get or set a cached value with async data fetching
 * @param key Cache key
 * @param fetcher Async function to fetch data if not cached
 * @param ttlMs Time to live in milliseconds
 * @returns Cached or fetched data
 */
export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 5 * 60 * 1000
): Promise<T> {
  // Check if value exists in cache
  const cached = profileCache.get<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch new value if not cached
  const data = await fetcher();

  // Store in cache
  profileCache.set(key, data, ttlMs);

  return data;
}

/**
 * Get cache status for debugging
 * @param key Cache key
 * @returns Cache status information
 */
export function getCacheStatus(key: string) {
  return profileCache.getInfo(key);
}

/**
 * Clear cache for a specific key
 * @param key Cache key
 */
export function clearCache(key: string): void {
  profileCache.delete(key);
}

/**
 * Clear all cached data
 */
export function clearAllCache(): void {
  profileCache.clear();
}

export default profileCache;
