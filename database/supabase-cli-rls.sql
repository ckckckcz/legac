-- =============================================================================
-- 10. CLI AUTH & RLS POLICIES FOR 'ANON'
-- =============================================================================
-- The CLI uses the 'anon' key to interact with Supabase.
-- To prevent anonymous abuse, we require the CLI to send its session token
-- in a custom HTTP header: 'x-cli-token'.
-- This function extracts that token and finds the corresponding user_id.

CREATE OR REPLACE FUNCTION get_cli_user_id()
RETURNS UUID AS $$
DECLARE
  cli_token TEXT;
  token_hash_hex TEXT;
  found_user_id UUID;
BEGIN
  -- 1. Extract token from header
  cli_token := current_setting('request.headers', true)::json->>'x-cli-token';
  
  IF cli_token IS NULL OR cli_token = '' THEN
    RETURN NULL;
  END IF;

  -- 2. Hash it (SHA-256) like the Node.js backend does
  token_hash_hex := encode(digest(cli_token, 'sha256'), 'hex');

  -- 3. Look up valid session
  SELECT user_id INTO found_user_id
  FROM user_sessions
  WHERE token_hash = token_hash_hex
    AND expires_at > now()
    AND revoked_at IS NULL
  LIMIT 1;

  RETURN found_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- =============================================================================
-- 11. POLICIES FOR 'ANON' ROLE
-- =============================================================================

-- user_sessions: Allow reading session logic for token validation
CREATE POLICY "CLI can read own session" 
ON user_sessions FOR SELECT TO anon 
USING (user_id = get_cli_user_id());

-- repositories: Allow CRUD for owned repos
CREATE POLICY "CLI can manage own repos" 
ON repositories FOR ALL TO anon 
USING (user_id = get_cli_user_id()) 
WITH CHECK (user_id = get_cli_user_id());

-- documentations: Allow CRUD linked to owned repos
CREATE POLICY "CLI can manage own docs" 
ON documentations FOR ALL TO anon 
USING (repository_id IN (SELECT id FROM repositories WHERE user_id = get_cli_user_id()))
WITH CHECK (repository_id IN (SELECT id FROM repositories WHERE user_id = get_cli_user_id()));

-- documentation_pages: Allow CRUD linked to owned docs
CREATE POLICY "CLI can manage own pages" 
ON documentation_pages FOR ALL TO anon 
USING (documentation_id IN (SELECT id FROM documentations WHERE repository_id IN (SELECT id FROM repositories WHERE user_id = get_cli_user_id())))
WITH CHECK (documentation_id IN (SELECT id FROM documentations WHERE repository_id IN (SELECT id FROM repositories WHERE user_id = get_cli_user_id())));

-- Also ensure 'anon' has basic usage grants on the schema
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
