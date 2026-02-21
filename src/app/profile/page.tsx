/**
 * Profile Page Route
 * Located at /profile - displays GitHub profile page with sidebar
 */

'use client';

import { useState, Suspense } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ProfilePage } from '@/components/profile/ProfilePage';
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton';

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleUploadClick = () => {
    // Handle upload click if needed
    console.log('Upload clicked');
  };

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
