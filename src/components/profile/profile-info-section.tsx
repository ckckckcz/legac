'use client';

import { UserProfile } from '@/lib/types/profile';
import { Card } from '@/components/ui/card';

interface ProfileInfoSectionProps {
  profile: UserProfile;
  editable?: boolean;
  onEdit?: () => void;
}

export function ProfileInfoSection({ profile, editable = false, onEdit }: ProfileInfoSectionProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Profile Information</h2>
        {editable && onEdit && (
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="border-b pb-4">
          <label className="text-sm font-semibold text-gray-600">Name</label>
          <p className="text-lg mt-1">{profile.name || 'Not set'}</p>
        </div>

        {/* Email */}
        <div className="border-b pb-4">
          <label className="text-sm font-semibold text-gray-600">Email</label>
          <p className="text-lg mt-1">{profile.email || 'Not set'}</p>
        </div>

        {/* Bio */}
        <div className="border-b pb-4">
          <label className="text-sm font-semibold text-gray-600">Bio</label>
          <p className="text-lg mt-1 whitespace-pre-wrap">{profile.bio || 'No bio added yet'}</p>
        </div>

        {/* Account Creation Date */}
        <div className="border-b pb-4">
          <label className="text-sm font-semibold text-gray-600">Account Created</label>
          <p className="text-lg mt-1">
            {new Date(profile.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Last Updated */}
        <div>
          <label className="text-sm font-semibold text-gray-600">Last Updated</label>
          <p className="text-lg mt-1">
            {new Date(profile.updated_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
