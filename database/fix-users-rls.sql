-- Add policy for anon to read their own user record
CREATE POLICY "CLI can read own user" 
ON users FOR SELECT TO anon 
USING (id = get_cli_user_id());
