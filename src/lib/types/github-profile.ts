/**
 * GitHub API Type Definitions
 */

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

export interface CachedProfileData {
  user: GitHubUser;
  stats: GitHubUserStats;
  timestamp: number;
  lastUpdated: Date;
}

export interface ProfilePageState {
  loading: boolean;
  error: Error | null;
  data: CachedProfileData | null;
  retryCount: number;
}

export interface ProfileCardProps {
  user: GitHubUser;
}

export interface StatsCardProps {
  label: string;
  value: number;
  href?: string;
  icon?: React.ReactNode;
}

export interface MetadataItemProps {
  label: string;
  value: string | null | undefined;
  placeholder?: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface SkeletonLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}
