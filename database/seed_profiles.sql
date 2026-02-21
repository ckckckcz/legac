-- Seed script: Initialize test user profiles with sample data
-- Run this after creating the user_profiles and activity_logs tables

-- Insert sample user profiles for existing test users
INSERT INTO app.user_profiles (github_id, name, email, bio, avatar_url, created_at, updated_at)
SELECT 
  u.github_id,
  COALESCE(u.username, 'User ' || u.github_id),
  COALESCE(u.email, 'user' || u.github_id || '@example.com'),
  'Enthusiastic user of document management',
  u.avatar_url,
  u.created_at,
  u.updated_at
FROM app.users u
WHERE NOT EXISTS (
  SELECT 1 FROM app.user_profiles up WHERE up.github_id = u.github_id
)
ON CONFLICT (github_id) DO NOTHING;

-- Insert sample activity log entries for demonstration
INSERT INTO app.activity_logs (user_id, event_type, event_data, created_at)
SELECT 
  u.id,
  'login',
  jsonb_build_object('ip', '192.168.1.1', 'user_agent', 'Mozilla/5.0'),
  NOW() - INTERVAL '1 day'
FROM app.users u
LIMIT 1;
