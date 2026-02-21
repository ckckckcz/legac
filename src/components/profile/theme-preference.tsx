'use client';

import { useState } from 'react';

interface ThemePreferenceProps {
  currentTheme: 'light' | 'dark' | 'auto';
  onChange: (theme: 'light' | 'dark' | 'auto') => Promise<void>;
  isLoading?: boolean;
}

export function ThemePreference({ currentTheme, onChange, isLoading = false }: ThemePreferenceProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(currentTheme);

  const handleChange = async (newTheme: 'light' | 'dark' | 'auto') => {
    try {
      await onChange(newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600">Choose your preferred theme</p>

      <div className="space-y-2">
        {(['light', 'dark', 'auto'] as const).map((t) => (
          <label key={t} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="theme"
              value={t}
              checked={theme === t}
              onChange={() => handleChange(t)}
              disabled={isLoading}
              className="w-4 h-4"
            />
            <span className="capitalize font-medium">
              {t === 'auto' ? 'System (Auto)' : `${t.charAt(0).toUpperCase() + t.slice(1)} Mode`}
            </span>
            <span className="text-sm text-gray-500">
              {t === 'light' && '☀️'}
              {t === 'dark' && '🌙'}
              {t === 'auto' && '⚙️'}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
