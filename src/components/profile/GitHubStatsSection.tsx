/**
 * GitHubStatsSection Component
 * Displays GitHub statistics (repos, followers, following, contributions)
 */

'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getGitHubFollowersUrl,
  getGitHubFollowingUrl,
} from '@/lib/services/github';
import type { GitHubUserStats } from '@/lib/types/github-profile';

interface GitHubStatsSectionProps {
  username: string;
  stats: GitHubUserStats;
}

interface StatItemProps {
  label: string;
  value: number;
  href?: string;
}

function StatItem({ label, value, href }: StatItemProps) {
  const content = (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="text-2xl font-bold text-primary">{value.toLocaleString()}</div>
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 rounded-lg hover:bg-accent transition-colors cursor-pointer"
      >
        {content}
      </Link>
    );
  }

  return <div className="p-4 rounded-lg bg-muted/50">{content}</div>;
}

export function GitHubStatsSection({
  username,
  stats,
}: GitHubStatsSectionProps) {
  const followersUrl = getGitHubFollowersUrl(username);
  const followingUrl = getGitHubFollowingUrl(username);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Stats Grid - Responsive */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {/* Public Repos */}
            <div className="rounded-lg bg-muted/50 p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {stats.publicRepos}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                Repos
              </div>
            </div>

            {/* Followers - Clickable */}
            <Link
              href={followersUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-muted/50 p-3 sm:p-4 text-center hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {stats.followers}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                Followers
              </div>
            </Link>

            {/* Following - Clickable */}
            <Link
              href={followingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-muted/50 p-3 sm:p-4 text-center hover:bg-accent transition-colors cursor-pointer"
            >
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {stats.following}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                Following
              </div>
            </Link>

            {/* Contributions */}
            <div className="rounded-lg bg-muted/50 p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {stats.contributions || '-'}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                Contributions
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="border-t pt-4 text-sm text-muted-foreground">
            <p className="text-center">
              {stats.publicRepos > 0
                ? `${stats.publicRepos} public ${stats.publicRepos === 1 ? 'repository' : 'repositories'}`
                : 'No public repositories'}
              {' • '}
              {stats.followers > 0
                ? `${stats.followers} ${stats.followers === 1 ? 'follower' : 'followers'}`
                : 'No followers'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GitHubStatsSection;
