/**
 * useGitHubProfile Hook Tests
 * Unit and integration tests for GitHub profile data fetching
 */

import { renderHook, waitFor } from '@testing-library/react';
import useGitHubProfile from '@/lib/hooks/useGitHubProfile';
import * as githubService from '@/lib/services/github';
import { clearAllCache } from '@/lib/utils/cache';

// Mock the GitHub service
jest.mock('@/lib/services/github');

describe('useGitHubProfile', () => {
  beforeEach(() => {
    clearAllCache();
    jest.clearAllMocks();
  });

  describe('Successful Data Fetching', () => {
    it('should fetch and return GitHub profile data', async () => {
      const mockUser = {
        login: 'octocat',
        id: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
        bio: 'There once was...',
        name: 'The Octocat',
        company: '@github',
        location: 'San Francisco',
        email: null,
        created_at: '2011-01-25T18:44:36Z',
        public_repos: 8,
        followers: 3938,
        following: 9,
      };

      (githubService.getGitHubUser as jest.Mock).mockResolvedValue(mockUser);

      const { result } = renderHook(() => useGitHubProfile('octocat'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBeDefined();
      expect(result.current.data?.user.login).toBe('octocat');
      expect(result.current.error).toBeNull();
    });

    it('should cache data after first fetch', async () => {
      const mockUser = {
        login: 'octocat',
        id: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
        bio: null,
        name: null,
        company: null,
        location: null,
        email: null,
        created_at: '2011-01-25T18:44:36Z',
        public_repos: 8,
        followers: 3938,
        following: 9,
      };

      (githubService.getGitHubUser as jest.Mock).mockResolvedValue(mockUser);

      const { rerender } = renderHook(
        ({ username }) => useGitHubProfile(username),
        { initialProps: { username: 'octocat' } }
      );

      await waitFor(() => {
        expect(githubService.getGitHubUser).toHaveBeenCalledTimes(1);
      });

      // Rerender with same username
      rerender({ username: 'octocat' });

      // Should still be 1 call due to caching
      expect(githubService.getGitHubUser).toHaveBeenCalledTimes(1);
    });

    it('should handle loading state correctly', async () => {
      const mockUser = {
        login: 'octocat',
        id: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
        bio: null,
        name: null,
        company: null,
        location: null,
        email: null,
        created_at: '2011-01-25T18:44:36Z',
        public_repos: 8,
        followers: 3938,
        following: 9,
      };

      (githubService.getGitHubUser as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(mockUser), 100))
      );

      const { result } = renderHook(() => useGitHubProfile('octocat'));

      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeNull();

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const error = new Error('GitHub API error: Not Found');
      (githubService.getGitHubUser as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useGitHubProfile('invalid-user'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeNull();
    });

    it('should handle rate limiting errors', async () => {
      const rateLimitError = new githubService.GitHubApiError(
        'GitHub API error: Forbidden',
        403,
        0,
        Math.floor(Date.now() / 1000) + 3600
      );

      (githubService.getGitHubUser as jest.Mock).mockRejectedValue(
        rateLimitError
      );

      const { result } = renderHook(() => useGitHubProfile('octocat'));

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });

      expect(githubService.isRateLimitError(result.current.error)).toBe(true);
    });

    it('should provide retry functionality', async () => {
      const error = new Error('Network error');
      (githubService.getGitHubUser as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useGitHubProfile('octocat'));

      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });

      const mockUser = {
        login: 'octocat',
        id: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
        bio: null,
        name: null,
        company: null,
        location: null,
        email: null,
        created_at: '2011-01-25T18:44:36Z',
        public_repos: 8,
        followers: 3938,
        following: 9,
      };

      (githubService.getGitHubUser as jest.Mock).mockResolvedValue(mockUser);

      result.current.retry();

      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });
    });
  });

  describe('Data Validation', () => {
    it('should extract stats correctly from user data', async () => {
      const mockUser = {
        login: 'octocat',
        id: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
        bio: null,
        name: null,
        company: null,
        location: null,
        email: null,
        created_at: '2011-01-25T18:44:36Z',
        public_repos: 42,
        followers: 100,
        following: 50,
      };

      (githubService.getGitHubUser as jest.Mock).mockResolvedValue(mockUser);

      const { result } = renderHook(() => useGitHubProfile('octocat'));

      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });

      expect(result.current.data?.stats.publicRepos).toBe(42);
      expect(result.current.data?.stats.followers).toBe(100);
      expect(result.current.data?.stats.following).toBe(50);
    });

    it('should handle missing optional fields', async () => {
      const mockUser = {
        login: 'octocat',
        id: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
        bio: null,
        name: null,
        company: null,
        location: null,
        email: null,
        created_at: '2011-01-25T18:44:36Z',
        public_repos: 0,
        followers: 0,
        following: 0,
      };

      (githubService.getGitHubUser as jest.Mock).mockResolvedValue(mockUser);

      const { result } = renderHook(() => useGitHubProfile('octocat'));

      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });

      expect(result.current.data?.user.bio).toBeNull();
      expect(result.current.data?.user.company).toBeNull();
      expect(result.current.data?.user.email).toBeNull();
    });
  });

  describe('Hook Configuration', () => {
    it('should respect custom cache TTL', async () => {
      const mockUser = {
        login: 'octocat',
        id: 1,
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/octocat',
        bio: null,
        name: null,
        company: null,
        location: null,
        email: null,
        created_at: '2011-01-25T18:44:36Z',
        public_repos: 8,
        followers: 3938,
        following: 9,
      };

      (githubService.getGitHubUser as jest.Mock).mockResolvedValue(mockUser);

      const { result } = renderHook(() =>
        useGitHubProfile('octocat', { cacheTtl: 10000 })
      );

      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });

      expect(result.current.cacheInfo?.ttl).toBe(10000);
    });
  });
});
