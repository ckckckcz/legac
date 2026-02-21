/**
 * ProfileMetadataSection Component
 * Displays GitHub user metadata (location, company, email, account creation date)
 */

'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Building2, Calendar } from 'lucide-react';

interface ProfileMetadataSectionProps {
  location?: string | null;
  company?: string | null;
  email?: string | null;
  createdAt: string;
}

interface MetadataItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  placeholder?: string;
  href?: string;
}

function MetadataItem({
  icon,
  label,
  value,
  placeholder = 'Not provided',
  href,
}: MetadataItemProps) {
  const displayValue = value || placeholder;
  const isLink = href && value;

  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className="text-muted-foreground flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        {isLink ? (
          <a
            href={href}
            className="text-sm font-medium text-primary hover:underline break-all"
          >
            {displayValue}
          </a>
        ) : (
          <p
            className={`text-sm font-medium break-all ${
              value
                ? 'text-foreground'
                : 'text-muted-foreground italic'
            }`}
          >
            {displayValue}
          </p>
        )}
      </div>
    </div>
  );
}

export function ProfileMetadataSection({
  location,
  company,
  email,
  createdAt,
}: ProfileMetadataSectionProps) {
  // Format creation date
  const createdDate = new Date(createdAt);
  const formattedDate = createdDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold mb-2">Profile Information</h3>

          {/* Account Creation Date */}
          <MetadataItem
            icon={<Calendar className="w-4 h-4" />}
            label="Joined"
            value={formattedDate}
          />

          {/* Location */}
          <MetadataItem
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={location}
            placeholder="Location not specified"
          />

          {/* Company */}
          <MetadataItem
            icon={<Building2 className="w-4 h-4" />}
            label="Company"
            value={company}
            placeholder="No company specified"
          />

          {/* Email */}
          <MetadataItem
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={email}
            placeholder={email ? 'Email not public' : 'Email not public'}
            href={email ? `mailto:${email}` : undefined}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default ProfileMetadataSection;
