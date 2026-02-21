'use client';

import { useState } from 'react';

interface PrivacySettingsProps {
  profileVisibility: 'public' | 'private' | 'friends';
  onChange: (visibility: 'public' | 'private' | 'friends') => Promise<void>;
  isLoading?: boolean;
}

export function PrivacySettings({ profileVisibility, onChange, isLoading = false }: PrivacySettingsProps) {
  const [visibility, setVisibility] = useState<'public' | 'private' | 'friends'>(profileVisibility);

  const handleChange = async (newVisibility: 'public' | 'private' | 'friends') => {
    try {
      await onChange(newVisibility);
      setVisibility(newVisibility);
    } catch (error) {
      console.error('Failed to update privacy settings:', error);
    }
  };

  const visibilityOptions = [
    {
      value: 'public' as const,
      label: 'Public',
      icon: '🌐',
      description: 'Your profile is visible to everyone',
    },
    {
      value: 'friends' as const,
      label: 'Friends Only',
      icon: '👥',
      description: 'Your profile is visible to friends only',
    },
    {
      value: 'private' as const,
      label: 'Private',
      icon: '🔒',
      description: 'Your profile is only visible to you',
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Control who can see your profile</p>

      <div className="space-y-2">
        {visibilityOptions.map((option) => (
          <label key={option.value} className="flex items-start gap-3 cursor-pointer p-3 rounded hover:bg-gray-100 transition">
            <input
              type="radio"
              name="visibility"
              value={option.value}
              checked={visibility === option.value}
              onChange={() => handleChange(option.value)}
              disabled={isLoading}
              className="w-4 h-4 mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span>{option.icon}</span>
                <p className="font-medium">{option.label}</p>
              </div>
              <p className="text-sm text-gray-500">{option.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
