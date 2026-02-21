-- Create activity_logs table for tracking user activities
CREATE TABLE IF NOT EXISTS app.activity_logs (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES app.users(id) ON DELETE CASCADE,
  event_type      TEXT NOT NULL,
  event_data      JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON app.activity_logs (user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON app.activity_logs (created_at);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_created ON app.activity_logs (user_id, created_at DESC);
