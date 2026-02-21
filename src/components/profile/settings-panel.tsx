'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';

interface SettingsPanelProps {
  children?: React.ReactNode;
  sections?: Array<{
    title: string;
    icon?: string;
    content: React.ReactNode;
  }>;
}

export function SettingsPanel({ sections = [] }: SettingsPanelProps) {
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>

      {sections.map((section, index) => (
        <Card key={index} className="overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              {section.icon && <span className="text-2xl">{section.icon}</span>}
              <h3 className="font-semibold text-lg">{section.title}</h3>
            </div>
            <span className={`transition transform ${expandedSection === index ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {expandedSection === index && (
            <div className="px-6 py-4 bg-gray-50 border-t">
              {section.content}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
