CREATE TABLE IF NOT EXISTS app.users (
  id           BIGSERIAL PRIMARY KEY,
  github_id    BIGINT UNIQUE NOT NULL,
  username     TEXT,
  email        TEXT,
  avatar_url   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_github_id ON app.users (github_id);