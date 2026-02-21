// Profile and Settings data types

export interface UserProfile {
  id: number;
  github_id: string | number;
  name: string | null;
  email: string | null;
  bio: string | null;
  avatar_url: string | null;
  custom_avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface UserProfileInput {
  name?: string;
  email?: string;
  bio?: string;
}

export interface ActivityLog {
  id: number;
  user_id: string | number;
  event_type: string;
  event_data: Record<string, any> | null;
  created_at: Date;
}

export interface ActivityLogInput {
  event_type: string;
  event_data?: Record<string, any>;
}

export interface UserSettings {
  id?: number;
  user_id: string | number;
  theme: 'light' | 'dark' | 'auto';
  notifications_enabled: boolean;
  email_notifications: boolean;
  profile_visibility: 'public' | 'private' | 'friends';
  created_at?: Date;
  updated_at?: Date;
}

export interface UserSettingsInput {
  theme?: 'light' | 'dark' | 'auto';
  notifications_enabled?: boolean;
  email_notifications?: boolean;
  profile_visibility?: 'public' | 'private' | 'friends';
}

export interface AvatarUploadResponse {
  url: string;
  size: number;
  uploadedAt: Date;
}

export interface ActivityFilterOptions {
  eventType?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}
