'use client';

import { ActivityLog } from '@/lib/types/profile';
import { Card } from '@/components/ui/card';

interface ActivityListProps {
  activities: ActivityLog[];
  total: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
}

export function ActivityList({
  activities,
  total,
  currentPage = 1,
  pageSize = 20,
  onPageChange,
  isLoading = false,
}: ActivityListProps) {
  const totalPages = Math.ceil(total / pageSize);

  const getEventIcon = (eventType: string): string => {
    const icons: Record<string, string> = {
      login: '🔓',
      logout: '🔒',
      profile_update: '✏️',
      avatar_change: '📸',
      document_upload: '📤',
      document_download: '📥',
      settings_change: '⚙️',
      profile_view: '👁️',
    };
    return icons[eventType] || '📝';
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Activity History</h3>

      {activities.length === 0 ? (
        <Card className="p-6 text-center text-gray-500">
          No activities yet
        </Card>
      ) : (
        <>
          <div className="space-y-2">
            {activities.map((activity) => (
              <Card key={activity.id} className="p-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{getEventIcon(activity.event_type)}</span>
                  <div className="flex-1">
                    <p className="font-medium capitalize">
                      {activity.event_type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                    {activity.event_data && (
                      <p className="text-sm text-gray-500 mt-1">
                        {JSON.stringify(activity.event_data)
                          .substring(0, 100)}
                        ...
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
                className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
