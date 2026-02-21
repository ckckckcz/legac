'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ActivityLog, PaginatedResponse } from '@/lib/types/profile';
import { ActivityList } from '@/components/profile/activity-list';
import { ActivityFilter } from '@/components/profile/activity-filter';
import { ActivityExport } from '@/components/profile/activity-export';
import { Button } from '@/components/ui/button';

export default function ActivityPage() {
  const { data: session, status } = useSession();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }

    if (status === 'authenticated') {
      fetchActivities();
    }
  }, [status, currentPage, filters]);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        limit: '20',
        offset: ((currentPage - 1) * 20).toString(),
        ...filters,
      });

      const response = await fetch(`/api/profile/activity?${params}`);
      if (response.ok) {
        const data: PaginatedResponse<ActivityLog> = await response.json();
        setActivities(data.data);
        setTotal(data.total);
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Activity History</h1>
          <p className="text-gray-600">View and manage your account activity</p>
        </div>

        {/* Export Section */}
        <div className="mb-8">
          <ActivityExport activities={activities} isLoading={isLoading} />
        </div>

        {/* Filter Section */}
        <ActivityFilter onFilter={handleFilter} isLoading={isLoading} />

        {/* Activity List */}
        <ActivityList
          activities={activities}
          total={total}
          currentPage={currentPage}
          pageSize={20}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />

        {/* Back Button */}
        <div className="flex justify-center mt-8">
          <Button onClick={() => redirect('/profile')} variant="outline">
            Back to Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
