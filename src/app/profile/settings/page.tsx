'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserSettings, UserSettingsInput } from '@/lib/types/profile';
import { SettingsPanel } from '@/components/profile/settings-panel';
import { ThemePreference } from '@/components/profile/theme-preference';
import { NotificationPreferences } from '@/components/profile/notification-preferences';
import { PrivacySettings } from '@/components/profile/privacy-settings';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }

    if (status === 'authenticated') {
      fetchSettings();
    }
  }, [status]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingsUpdate = async (updates: UserSettingsInput) => {
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        const updated = await response.json();
        setSettings(updated);
        setSaveMessage('Settings updated successfully');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (error) {
      console.error('Failed to update settings:', error);
      setSaveMessage('Failed to update settings');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Unable to load settings</p>
      </div>
    );
  }

  const settingsSections = [
    {
      title: 'Theme',
      icon: '🎨',
      content: (
        <ThemePreference
          currentTheme={settings.theme}
          onChange={(theme) =>
            handleSettingsUpdate({ theme })
          }
          isLoading={isLoading}
        />
      ),
    },
    {
      title: 'Notifications',
      icon: '🔔',
      content: (
        <NotificationPreferences
          notificationsEnabled={settings.notifications_enabled}
          emailNotificationsEnabled={settings.email_notifications}
          onChange={handleSettingsUpdate}
          isLoading={isLoading}
        />
      ),
    },
    {
      title: 'Privacy',
      icon: '🔒',
      content: (
        <PrivacySettings
          profileVisibility={settings.profile_visibility}
          onChange={(visibility) =>
            handleSettingsUpdate({ profile_visibility: visibility })
          }
          isLoading={isLoading}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and settings</p>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
            {saveMessage}
          </div>
        )}

        {/* Settings Panel */}
        <div className="mb-8">
          <SettingsPanel sections={settingsSections} />
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button onClick={() => redirect('/profile')} variant="outline">
            Back to Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
