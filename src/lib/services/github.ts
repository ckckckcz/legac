/**
 * GitHub API Service
 * Handles all GitHub API calls for user profile data
 */

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  name: string | null;
  company: string | null;
  location: string | null;
  email: string | null;
  created_at: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubUserStats {
  publicRepos: number;
  followers: number;
  following: number;
  contributions?: number;
}

export class GitHubApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public rateLimitRemaining?: number,
    public rateLimitReset?: number
  ) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

/**
 * Fetch GitHub user profile data
 * @param username GitHub username to fetch
 * @returns GitHub user data
 */
export async function getGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes in Next.js
    });

    if (!response.ok) {
      const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
      const rateLimitReset = response.headers.get('x-ratelimit-reset');

      throw new GitHubApiError(
        `GitHub API error: ${response.statusText}`,
        response.status,
        rateLimitRemaining ? parseInt(rateLimitRemaining) : undefined,
        rateLimitReset ? parseInt(rateLimitReset) : undefined
      );
    }

    const data: GitHubUser = await response.json();
    return data;
  } catch (error) {
    if (error instanceof GitHubApiError) {
      throw error;
    }
    throw new GitHubApiError('Failed to fetch GitHub user data', 500);
  }
}

/**
 * Extract stats from GitHub user data
 * @param user GitHub user data
 * @returns Formatted stats object
 */
export function extractStats(user: GitHubUser): GitHubUserStats {
  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
  };
}

/**
 * Format GitHub profile URL
 * @param username GitHub username
 * @returns Full GitHub profile URL
 */
export function getGitHubProfileUrl(username: string): string {
  return `https://github.com/${username}`;
}

/**
 * Format GitHub followers URL
 * @param username GitHub username
 * @returns Full GitHub followers URL
 */
export function getGitHubFollowersUrl(username: string): string {
  return `https://github.com/${username}?tab=followers`;
}

/**
 * Format GitHub following URL
 * @param username GitHub username
 * @returns Full GitHub following URL
 */
export function getGitHubFollowingUrl(username: string): string {
  return `https://github.com/${username}?tab=following`;
}

/**
 * Check if GitHub API error is due to rate limiting
 * @param error Error object
 * @returns True if error is due to rate limiting
 */
export function isRateLimitError(error: unknown): boolean {
  return error instanceof GitHubApiError && error.status === 403;
}

/**
 * Check if API token is configured
 * @returns True if GitHub API token is available
 */
export function isGitHubTokenConfigured(): boolean {
  return !!GITHUB_TOKEN;
}
