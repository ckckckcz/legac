-- =============================================================================
-- Database Schema for Legacyver (Reference)
-- =============================================================================
-- This file reflects the actual schema used by the application.
-- All tables live in the 'app' schema.
-- For Supabase setup, run 'supabase-migration.sql' instead.
-- =============================================================================

-- Users table (core auth table)
CREATE TABLE IF NOT EXISTS app.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    github_id BIGINT NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) DEFAULT '',
    avatar_url TEXT DEFAULT '',
    login_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User sessions table (CLI authentication tokens)
CREATE TABLE IF NOT EXISTS app.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES app.users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    user_agent TEXT DEFAULT 'legacyver-cli',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs table (user activity tracking)
CREATE TABLE IF NOT EXISTS app.activity_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES app.users(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User profiles table (extended user info)
CREATE TABLE IF NOT EXISTS app.user_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES app.users(id) ON DELETE CASCADE,
    github_id BIGINT,
    name VARCHAR(255),
    email VARCHAR(255),
    bio TEXT,
    avatar_url TEXT,
    custom_avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User settings table (preferences)
CREATE TABLE IF NOT EXISTS app.user_settings (
    user_id UUID PRIMARY KEY REFERENCES app.users(id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'auto',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    profile_visibility VARCHAR(20) DEFAULT 'public',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Repositories table
CREATE TABLE IF NOT EXISTS app.repositories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES app.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    github_url TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documentation headers table
CREATE TABLE IF NOT EXISTS app.documentations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID REFERENCES app.repositories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documentation pages table (supporting multi-page structure)
CREATE TABLE IF NOT EXISTS app.documentation_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    documentation_id UUID REFERENCES app.documentations(id) ON DELETE CASCADE,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    page_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for optimization
CREATE INDEX IF NOT EXISTS idx_users_github_id ON app.users(github_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON app.user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON app.user_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON app.activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON app.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_repositories_user_id ON app.repositories(user_id);
CREATE INDEX IF NOT EXISTS idx_documentations_repository_id ON app.documentations(repository_id);
CREATE INDEX IF NOT EXISTS idx_documentation_pages_doc_id ON app.documentation_pages(documentation_id);
