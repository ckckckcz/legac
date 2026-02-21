CREATE TABLE IF NOT EXISTS app.user_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       BIGINT NOT NULL REFERENCES app.users(id) ON DELETE CASCADE,
  token_hash    TEXT UNIQUE NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at    TIMESTAMPTZ NOT NULL,
  revoked_at    TIMESTAMPTZ,
  user_agent    TEXT,
  ip            INET
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON app.user_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON app.user_sessions (expires_at);