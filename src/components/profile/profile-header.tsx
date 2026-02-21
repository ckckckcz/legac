'use client';

import { UserProfile } from '@/lib/types/profile';
import { AvatarDisplay } from './avatar-display';
import { Badge } from '@/components/ui/badge';

interface ProfileHeaderProps {
  profile: UserProfile;
  status?: 'online' | 'offline' | 'away';
  showBio?: boolean;
}

export function ProfileHeader({ profile, status = 'online', showBio = true }: ProfileHeaderProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    away: 'bg-yellow-500',
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="relative">
          <AvatarDisplay profile={profile} size="lg" />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusColors[status]}`}
            title={status}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{profile.name || 'User Profile'}</h1>
            <Badge variant={status === 'online' ? 'default' : 'secondary'}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          {profile.email && (
            <p className="text-gray-600 mb-3">{profile.email}</p>
          )}

          {showBio && profile.bio && (
            <p className="text-gray-700 mb-4">{profile.bio}</p>
          )}

          {/* Meta info */}
          <div className="flex gap-6 text-sm text-gray-500">
            <div>
              <span className="font-semibold text-gray-700">Member since</span>
              <p>{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Last updated</span>
              <p>{new Date(profile.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
