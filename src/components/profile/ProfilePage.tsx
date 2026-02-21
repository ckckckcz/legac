/**
 * ProfilePage Component
 * Main profile page with sidebar integration and all profile sections
 */

'use client';

import { useSearchParams } from 'next/navigation';
import useGitHubProfile from '@/lib/hooks/useGitHubProfile';
import { GitHubProfileCard } from '@/components/profile/GitHubProfileCard';
import { GitHubStatsSection } from '@/components/profile/GitHubStatsSection';
import { ProfileMetadataSection } from '@/components/profile/ProfileMetadataSection';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';
import { ProfileError } from '@/components/profile/ProfileError';

interface ProfilePageProps {
  username?: string;
}

export function ProfilePage({ username }: ProfilePageProps) {
  const searchParams = useSearchParams();
  const paramUsername = searchParams.get('user');
  const finalUsername = username || paramUsername || 'octocat';

  const { loading, error, data, retry } = useGitHubProfile(finalUsername);

  // Loading State
  if (loading && !data) {
    return (
      <div className="w-full space-y-4">
        <ProfileSkeleton />
      </div>
    );
  }

  // Error State (no data at all)
  if (error && !data) {
    return (
      <ProfileError
        error={error}
        onRetry={retry}
        username={finalUsername}
      />
    );
  }

  // Success State
  if (data) {
    const { user, stats } = data;

    return (
      <div className="w-full space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            GitHub Profile
          </h1>
          <p className="text-muted-foreground mt-2">
            View GitHub profile information and statistics
          </p>
        </div>

        {/* Profile Card Section */}
        <section>
          <GitHubProfileCard user={user} />
        </section>

        {/* Stats Section */}
        <section>
          <GitHubStatsSection username={user.login} stats={stats} />
        </section>

        {/* Metadata Section */}
        <section>
          <ProfileMetadataSection
            location={user.location}
            company={user.company}
            email={user.email}
            createdAt={user.created_at}
          />
        </section>

        {/* Cache Info */}
        {data.lastUpdated && (
          <div className="text-xs text-muted-foreground text-center">
            Last updated: {data.lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>
    );
  }

  // Fallback (shouldn't reach here)
  return null;
}

export default ProfilePage;
