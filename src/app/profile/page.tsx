/**
 * Profile Page Route
 * Located at /profile - displays GitHub profile page with sidebar
 */

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Sidebar } from '@/components/sidebar';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

export default function Page() {
  const router = useRouter();
  const { status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect unauthenticated users to login, preserving the intended destination
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/profile');
    }
  }, [status, router]);

  const handleUploadClick = () => {
    console.log('Upload clicked');
  };

  // Show full-page spinner while session status is being determined
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of profile content before redirect fires
  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onUploadClick={handleUploadClick} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <div className="container max-w-4xl mx-auto px-4 py-8 md:pt-8">
          <Suspense fallback={<ProfileSkeleton />}>
            <ProfilePage />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
