'use client';

import { useState, useEffect } from 'react';
import { ActivityLog, PaginatedResponse, ActivityFilterOptions } from '@/lib/types/profile';

export function useActivity(initialFilters?: ActivityFilterOptions) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ActivityFilterOptions>(initialFilters || {});

  const pageSize = 20;

  useEffect(() => {
    fetchActivities();
  }, [currentPage, filters]);

  const fetchActivities = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        limit: pageSize.toString(),
        offset: ((currentPage - 1) * pageSize).toString(),
      });

      if (filters.eventType) params.append('eventType', filters.eventType);
      if (filters.startDate) params.append('startDate', filters.startDate.toISOString());
      if (filters.endDate) params.append('endDate', filters.endDate.toISOString());

      const response = await fetch(`/api/profile/activity?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }

      const data: PaginatedResponse<ActivityLog> = await response.json();
      setActivities(data.data);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = (newFilters: ActivityFilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const refreshActivities = () => fetchActivities();

  const totalPages = Math.ceil(total / pageSize);

  return {
    activities,
    total,
    isLoading,
    error,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    filters,
    applyFilters,
    refreshActivities,
  };
}
