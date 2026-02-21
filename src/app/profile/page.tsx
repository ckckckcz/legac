'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/lib/types/profile';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileInfoSection } from '@/components/profile/profile-info-section';
import { ProfileStats } from '@/components/profile/profile-stats';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }

    if (status === 'authenticated' && session?.user?.id) {
      fetchProfile();
    }
  }, [status, session]);

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

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
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
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <ProfileHeader profile={profile} />

        {/* Stats */}
        <div className="mb-8">
          <ProfileStats totalDocuments={0} recentActivities={0} loginCount={0} />
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileInfoSection
              profile={profile}
              editable={true}
              onEdit={() => redirect('/profile/edit')}
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-6 h-fit sticky top-8">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                onClick={() => redirect('/profile/edit')}
                className="w-full"
              >
                Edit Profile
              </Button>
              <Button
                onClick={() => redirect('/profile/settings')}
                variant="outline"
                className="w-full"
              >
                Settings
              </Button>
              <Button
                onClick={() => redirect('/profile/activity')}
                variant="outline"
                className="w-full"
              >
                View Activity
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
