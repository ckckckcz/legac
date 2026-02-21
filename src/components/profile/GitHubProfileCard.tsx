/**
 * GitHubProfileCard Component
 * Displays GitHub user profile information (avatar, username, bio, profile link)
 */

'use client';

import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getGitHubProfileUrl } from '@/lib/services/github';
import type { GitHubUser } from '@/lib/types/github-profile';

interface GitHubProfileCardProps {
  user: GitHubUser;
}

export function GitHubProfileCard({ user }: GitHubProfileCardProps) {
  const profileUrl = getGitHubProfileUrl(user.login);
  const initials = (user.name || user.login)
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-start sm:text-left">
          {/* Avatar */}
          <Avatar className="h-24 w-24 border-2 border-border">
            <AvatarImage src={user.avatar_url} alt={user.login} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1 space-y-2 w-full">
            {/* Username with Link */}
            <div>
              <Link
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold hover:text-primary transition-colors"
              >
                {user.name || user.login}
              </Link>
              {user.name && (
                <p className="text-sm text-muted-foreground">@{user.login}</p>
              )}
            </div>

            {/* Bio */}
            {user.bio ? (
              <p className="text-sm text-foreground">{user.bio}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No bio provided
              </p>
            )}

            {/* GitHub Profile Link */}
            <div className="pt-2">
              <Link
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.545 2.914 1.209.1-.945.349-1.545.635-1.9-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.273.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.374.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.195 22 16.44 22 12.017 22 6.484 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default GitHubProfileCard;
