'use client';

import { useState } from 'react';

interface NotificationPreferencesProps {
  notificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  onChange: (settings: { notifications_enabled: boolean; email_notifications: boolean }) => Promise<void>;
  isLoading?: boolean;
}

export function NotificationPreferences({
  notificationsEnabled,
  emailNotificationsEnabled,
  onChange,
  isLoading = false,
}: NotificationPreferencesProps) {
  const [settings, setSettings] = useState({
    notifications_enabled: notificationsEnabled,
    email_notifications: emailNotificationsEnabled,
  });

  const handleToggle = async (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    try {
      await onChange(newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to update notifications:', error);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Manage your notification preferences</p>

      <div className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-medium">In-App Notifications</p>
            <p className="text-sm text-gray-500">Receive notifications in the app</p>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications_enabled}
            onChange={() => handleToggle('notifications_enabled')}
            disabled={isLoading}
            className="w-5 h-5"
          />
        </label>

        <label className="flex items-center justify-between cursor-pointer">
          <div>
            <p className="font-medium">Email Notifications</p>
            <p className="text-sm text-gray-500">Receive email updates and alerts</p>
          </div>
          <input
            type="checkbox"
            checked={settings.email_notifications}
            onChange={() => handleToggle('email_notifications')}
            disabled={isLoading}
            className="w-5 h-5"
          />
        </label>
      </div>
    </div>
  );
}
