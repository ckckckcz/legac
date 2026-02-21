/**
 * ProfileSkeleton Component
 * Shows skeleton loaders while fetching profile data
 */

'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Profile Card Skeleton */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-start sm:text-left">
            {/* Avatar Skeleton */}
            <Skeleton className="h-24 w-24 rounded-full" />

            {/* Profile Info Skeleton */}
            <div className="flex-1 space-y-2 w-full">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-24 mt-4" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Section Skeleton */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg bg-muted/50 p-4">
                <Skeleton className="h-6 w-12 mx-auto mb-2" />
                <Skeleton className="h-4 w-16 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Metadata Section Skeleton */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            <Skeleton className="h-4 w-40 mb-4" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-3 py-3">
                <Skeleton className="h-4 w-4 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-20 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileSkeleton;
