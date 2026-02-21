'use client';

import { useState } from 'react';
import { ActivityLog } from '@/lib/types/profile';
import { Card } from '@/components/ui/card';

interface ActivityExportProps {
  activities: ActivityLog[];
  isLoading?: boolean;
}

export function ActivityExport({ activities, isLoading = false }: ActivityExportProps) {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  const exportToCSV = () => {
    const headers = ['ID', 'Event Type', 'Date', 'Data'];
    const rows = activities.map((activity) => [
      activity.id,
      activity.event_type,
      new Date(activity.created_at).toISOString(),
      activity.event_data ? JSON.stringify(activity.event_data) : '',
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activity-${new Date().toISOString()}.csv`;
    link.click();
  };

  const exportToJSON = () => {
    const json = JSON.stringify(activities, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `activity-${new Date().toISOString()}.json`;
    link.click();
  };

  const handleExport = () => {
    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToJSON();
    }
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Export Activities</h3>

      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No activities to export</p>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'csv' | 'json')}
              disabled={isLoading}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <p className="text-sm text-gray-600">
            Exporting {activities.length} activities as {exportFormat.toUpperCase()}
          </p>

          <button
            onClick={handleExport}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 transition"
          >
            Download Export
          </button>
        </div>
      )}
    </Card>
  );
}
