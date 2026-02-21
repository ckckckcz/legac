'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/lib/types/profile';
import Image from 'next/image';

interface ProfileCardProps {
  profile: UserProfile;
  onEdit?: () => void;
}

export function ProfileCard({ profile, onEdit }: ProfileCardProps) {
  return (
    <Card className="w-full max-w-md p-6">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="mb-4">
          {profile.custom_avatar_url || profile.avatar_url ? (
            <Image
              src={profile.custom_avatar_url || profile.avatar_url || ''}
              alt={profile.name || 'User'}
              width={96}
              height={96}
              className="rounded-full border-4 border-blue-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              <span className="text-2xl">👤</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold mb-2">{profile.name || 'User Profile'}</h2>

        {/* Email */}
        {profile.email && <p className="text-gray-600 mb-3">{profile.email}</p>}

        {/* Bio */}
        {profile.bio && (
          <p className="text-gray-700 mb-4 italic max-w-xs">{profile.bio}</p>
        )}

        {/* Account Status Badge */}
        <div className="mb-4">
          <Badge variant="outline">Active</Badge>
        </div>

        {/* Created At */}
        <p className="text-sm text-gray-500 mb-4">
          Member since {new Date(profile.created_at).toLocaleDateString()}
        </p>

        {/* Edit Button */}
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </Card>
  );
}
