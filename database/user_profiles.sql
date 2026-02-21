-- Create user_profiles table with extended profile information
CREATE TABLE IF NOT EXISTS app.user_profiles (
  id                BIGSERIAL PRIMARY KEY,
  github_id         BIGINT UNIQUE NOT NULL REFERENCES app.users(github_id) ON DELETE CASCADE,
  name              TEXT,
  email             TEXT,
  bio               TEXT,
  avatar_url        TEXT,
  custom_avatar_url TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster lookups by github_id
CREATE INDEX IF NOT EXISTS idx_user_profiles_github_id ON app.user_profiles (github_id);
