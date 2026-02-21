'use client';

import { Card } from '@/components/ui/card';

interface ProfileStatsProps {
  totalDocuments?: number;
  recentActivities?: number;
  loginCount?: number;
  storageUsedMB?: number;
}

export function ProfileStats({
  totalDocuments = 0,
  recentActivities = 0,
  loginCount = 0,
  storageUsedMB = 0,
}: ProfileStatsProps) {
  const stats = [
    {
      label: 'Documents',
      value: totalDocuments,
      icon: '📄',
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Recent Activity',
      value: recentActivities,
      icon: '⚡',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      label: 'Logins',
      value: loginCount,
      icon: '🔐',
      color: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Storage',
      value: `${storageUsedMB} MB`,
      icon: '💾',
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className={`p-4 ${stat.color}`}>
          <div className="text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.textColor}`}>
              {typeof stat.value === 'number' && stat.label !== 'Storage'
                ? stat.value.toLocaleString()
                : stat.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
