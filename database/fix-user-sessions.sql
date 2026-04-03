-- Add missing revoked_at column to user_sessions table
ALTER TABLE user_sessions ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;
