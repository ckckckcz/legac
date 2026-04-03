-- =============================================================================
-- Supabase Migration Script for Legacyver (PUBLIC schema)
-- =============================================================================
-- Run this in Supabase Dashboard → SQL Editor
-- This creates MISSING tables in the 'public' schema.
-- Tables that already exist will be skipped (IF NOT EXISTS).
-- =============================================================================

-- 0. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. USERS TABLE (may already exist — will add missing columns)
-- =============================================================================
-- Referenced by: auth-db-user.ts, api/auth/cli/route.ts, api/docs/route.ts
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    github_id BIGINT NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) DEFAULT '',
    avatar_url TEXT DEFAULT '',
    login_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add missing columns to users table if it already exists
-- (these will silently fail if columns already exist)
DO $$ BEGIN
    ALTER TABLE users ADD COLUMN IF NOT EXISTS github_id BIGINT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT DEFAULT '';
    ALTER TABLE users ADD COLUMN IF NOT EXISTS login_status BOOLEAN DEFAULT FALSE;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
END $$;

-- Add unique constraint on github_id if not exists
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_github_id_key') THEN
        ALTER TABLE users ADD CONSTRAINT users_github_id_key UNIQUE (github_id);
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);

-- =============================================================================
-- 2. USER SESSIONS TABLE (CLI authentication tokens)
-- =============================================================================
-- Referenced by: api/auth/cli/route.ts
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    user_agent TEXT DEFAULT 'legacyver-cli',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON user_sessions(token_hash);

-- =============================================================================
-- 3. ACTIVITY LOGS TABLE
-- =============================================================================
-- Referenced by: api/auth/cli/route.ts, api/profile/activity/route.ts
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_event_type ON activity_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at);

-- =============================================================================
-- 4. USER PROFILES TABLE
-- =============================================================================
-- Referenced by: api/profile/route.ts
CREATE TABLE IF NOT EXISTS user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    github_id BIGINT,
    name VARCHAR(255),
    email VARCHAR(255),
    bio TEXT,
    avatar_url TEXT,
    custom_avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_github_id ON user_profiles(github_id);

-- =============================================================================
-- 5. USER SETTINGS TABLE
-- =============================================================================
-- Referenced by: api/settings/route.ts
CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'auto',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    profile_visibility VARCHAR(20) DEFAULT 'public',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- 6. REPOSITORIES TABLE (may already exist)
-- =============================================================================
CREATE TABLE IF NOT EXISTS repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    github_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_repositories_user_id ON repositories(user_id);

-- =============================================================================
-- 7. DOCUMENTATIONS TABLE (may already exist)
-- =============================================================================
CREATE TABLE IF NOT EXISTS documentations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID REFERENCES repositories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documentations_repository_id ON documentations(repository_id);

-- =============================================================================
-- 8. DOCUMENTATION PAGES TABLE (may already exist)
-- =============================================================================
CREATE TABLE IF NOT EXISTS documentation_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    documentation_id UUID REFERENCES documentations(id) ON DELETE CASCADE,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    page_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documentation_pages_doc_id ON documentation_pages(documentation_id);

-- =============================================================================
-- 9. SECURITY (Row Level Security)
-- =============================================================================
-- We enable RLS on all tables for security.
-- Note: Direct connections using the 'postgres' user (the DATABASE_URL) 
-- usually bypass RLS, which is fine for our server-side API.

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentation_pages ENABLE ROW LEVEL SECURITY;

-- Permissive policies for the server-side connections
CREATE POLICY "Allow all for postgres" ON users FOR ALL TO postgres USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for postgres" ON user_sessions FOR ALL TO postgres USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for postgres" ON activity_logs FOR ALL TO postgres USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for postgres" ON user_profiles FOR ALL TO postgres USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for postgres" ON user_settings FOR ALL TO postgres USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for postgres" ON repositories FOR ALL TO postgres USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for postgres" ON documentations FOR ALL TO postgres USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for postgres" ON documentation_pages FOR ALL TO postgres USING (true) WITH CHECK (true);

-- =============================================================================
-- VERIFY: List all tables in public schema
-- =============================================================================
-- Run this after migration to verify:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
