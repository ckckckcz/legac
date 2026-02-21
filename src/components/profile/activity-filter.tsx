'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface ActivityFilterProps {
  onFilter: (filters: {
    eventType?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  eventTypes?: string[];
  isLoading?: boolean;
}

export function ActivityFilter({
  onFilter,
  eventTypes = [
    'login',
    'logout',
    'profile_update',
    'avatar_change',
    'document_upload',
    'document_download',
    'settings_change',
  ],
  isLoading = false,
}: ActivityFilterProps) {
  const [filters, setFilters] = useState({
    eventType: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilter({
      eventType: newFilters.eventType || undefined,
      startDate: newFilters.startDate || undefined,
      endDate: newFilters.endDate || undefined,
    });
  };

  const handleReset = () => {
    setFilters({ eventType: '', startDate: '', endDate: '' });
    onFilter({});
  };

  return (
    <Card className="p-4 mb-6">
      <h3 className="font-semibold mb-4">Filter Activities</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Event Type</label>
          <select
            name="eventType"
            value={filters.eventType}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Events</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium mb-2">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium mb-2">End Date</label>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        disabled={!filters.eventType && !filters.startDate && !filters.endDate}
        className="mt-4 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:text-gray-300"
      >
        Reset Filters
      </button>
    </Card>
  );
}
