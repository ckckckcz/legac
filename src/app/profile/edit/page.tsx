'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserProfile, UserProfileInput } from '@/lib/types/profile';
import { ProfileForm } from '@/components/profile/profile-form';
import { AvatarUpload } from '@/components/profile/avatar-upload';
import { Button } from '@/components/ui/button';

export default function ProfileEditPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (data: UserProfileInput) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        setSaveMessage('Profile updated successfully');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      setSaveMessage('Failed to update profile');
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setProfile((prev) =>
          prev ? { ...prev, custom_avatar_url: result.url } : null
        );
        setSaveMessage('Avatar uploaded successfully');
        setTimeout(() => setSaveMessage(''), 3000);
        return result.url;
      }
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      setSaveMessage('Failed to upload avatar');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Unable to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          <p className="text-gray-600">Update your profile information and avatar</p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
            {saveMessage}
          </div>
        )}

        {/* Avatar Upload */}
        <div className="mb-8">
          <AvatarUpload profile={profile} onUpload={handleAvatarUpload} isLoading={isLoading} />
        </div>

        {/* Profile Form */}
        <div className="mb-8">
          <ProfileForm profile={profile} onSubmit={handleProfileUpdate} isLoading={isLoading} />
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button onClick={() => redirect('/profile')} variant="outline">
            Back to Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
