'use client';

import Image from 'next/image';
import { UserProfile } from '@/lib/types/profile';

interface AvatarDisplayProps {
  profile: UserProfile;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
  className?: string;
}

const SIZES = {
  sm: { container: 32, image: 32 },
  md: { container: 64, image: 64 },
  lg: { container: 96, image: 96 },
  xl: { container: 128, image: 128 },
};

export function AvatarDisplay({
  profile,
  size = 'md',
  showBorder = true,
  className = '',
}: AvatarDisplayProps) {
  const sizeConfig = SIZES[size];
  const avatarUrl = profile.custom_avatar_url || profile.avatar_url;

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-gray-200 overflow-hidden ${
        showBorder ? 'border-2 border-gray-300' : ''
      } ${className}`}
      style={{
        width: `${sizeConfig.container}px`,
        height: `${sizeConfig.container}px`,
      }}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={profile.name || 'User Avatar'}
          width={sizeConfig.image}
          height={sizeConfig.image}
          className="w-full h-full object-cover"
          priority
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <span
            className="text-gray-400"
            style={{ fontSize: `${sizeConfig.container / 3}px` }}
          >
            👤
          </span>
        </div>
      )}

      {/* Custom avatar indicator */}
      {profile.custom_avatar_url && (
        <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
          ✓
        </div>
      )}
    </div>
  );
}
