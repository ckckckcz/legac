/**
 * useGithubProfile Hook
 * Handles fetching, caching, and managing GitHub user profile data
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { getGitHubUser, GitHubApiError, isRateLimitError } from '@/lib/services/github';
import { getCached, clearCache, getCacheStatus } from '@/lib/utils/cache';
import type { CachedProfileData, ProfilePageState } from '@/lib/types/github-profile';

const CACHE_KEY_PREFIX = 'github_profile_';
const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

interface UseGitHubProfileOptions {
  cacheTtl?: number;
  maxRetries?: number;
}

export function useGitHubProfile(username: string, options: UseGitHubProfileOptions = {}) {
  const { cacheTtl = DEFAULT_CACHE_TTL, maxRetries = MAX_RETRIES } = options;

  const [state, setState] = useState<ProfilePageState>({
    loading: false,
    error: null,
    data: null,
    retryCount: 0,
  });

  const cacheKey = `${CACHE_KEY_PREFIX}${username}`;

  /**
   * Fetch GitHub profile data with caching and error handling
   */
  const fetchProfile = useCallback(
    async (isRetry = false) => {
      if (!isRetry) {
        setState((prev) => ({
          ...prev,
          loading: true,
          error: null,
        }));
      }

      try {
        const user = await getCached(
          cacheKey,
          () => getGitHubUser(username),
          cacheTtl
        );

        const profileData: CachedProfileData = {
          user,
          stats: {
            publicRepos: user.public_repos,
            followers: user.followers,
            following: user.following,
          },
          timestamp: Date.now(),
          lastUpdated: new Date(),
        };

        setState((prev) => ({
          ...prev,
          loading: false,
          data: profileData,
          error: null,
          retryCount: 0,
        }));
      } catch (error) {
        const isRateLimit = isRateLimitError(error);
        const isFinal =
          state.retryCount >= maxRetries ||
          (error instanceof GitHubApiError && error.status !== 429);

        if (isRateLimit && state.retryCount < maxRetries) {
          // Retry on rate limit with exponential backoff
          const delayMs = RETRY_DELAY_MS * Math.pow(2, state.retryCount);
          setTimeout(() => {
            setState((prev) => ({
              ...prev,
              retryCount: prev.retryCount + 1,
            }));
          }, delayMs);

          return;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error : new Error('Unknown error'),
          retryCount: isFinal ? 0 : prev.retryCount,
        }));
      }
    },
    [username, cacheKey, cacheTtl, state.retryCount, maxRetries]
  );

  /**
   * Effect: Fetch profile on mount and when username changes
   */
  useEffect(() => {
    if (!username) {
      setState({
        loading: false,
        error: null,
        data: null,
        retryCount: 0,
      });
      return;
    }

    fetchProfile();
  }, [username, fetchProfile]);

  /**
   * Effect: Retry on retryCount change
   */
  useEffect(() => {
    if (state.retryCount > 0 && state.retryCount <= maxRetries) {
      fetchProfile(true);
    }
  }, [state.retryCount, maxRetries, fetchProfile]);

  /**
   * Manually retry fetching profile
   */
  const retry = useCallback(() => {
    clearCache(cacheKey);
    setState((prev) => ({
      ...prev,
      retryCount: 0,
      error: null,
    }));
    fetchProfile();
  }, [cacheKey, fetchProfile]);

  /**
   * Manually refetch profile (bypass cache)
   */
  const refetch = useCallback(() => {
    clearCache(cacheKey);
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    fetchProfile();
  }, [cacheKey, fetchProfile]);

  /**
   * Get cache status for debugging
   */
  const getCacheInfo = useCallback(() => {
    return getCacheStatus(cacheKey);
  }, [cacheKey]);

  return {
    // State
    ...state,
    // Methods
    retry,
    refetch,
    getCacheInfo,
    // Metadata
    isCached: getCacheStatus(cacheKey) !== null,
    cacheInfo: getCacheStatus(cacheKey),
  };
}

export default useGitHubProfile;
