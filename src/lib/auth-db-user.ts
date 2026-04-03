import { getPool } from "@/lib/db";

type AppUser = {
  userId: string;
  githubId: string;
  username: string;
  email: string;
  avatarUrl: string;
};

/**
 * Ensures authenticated NextAuth session is linked to users row.
 * Returns normalized app user payload used by profile/settings routes.
 */
export async function getOrCreateAppUser(session: any): Promise<AppUser | null> {
  if (!session?.user) {
    return null;
  }

  const pool = getPool();
  const accessToken = session.accessToken as string | undefined;

  let githubId = session.user.id ? String(session.user.id) : "";
  let username = (session.user as any)?.username || session.user.name || "unknown";
  let email = session.user.email || "";
  let avatarUrl = session.user.image || "";

  // Prefer live GitHub profile when token exists to keep id/username/avatar in sync.
  if (accessToken) {
    try {
      const ghRes = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      if (ghRes.ok) {
        const ghProfile = await ghRes.json();
        if (ghProfile?.id) githubId = String(ghProfile.id);
        if (ghProfile?.login) username = ghProfile.login;
        if (ghProfile?.email) email = ghProfile.email;
        if (ghProfile?.avatar_url) avatarUrl = ghProfile.avatar_url;
      }
    } catch {
      // Ignore GitHub API failures and fallback to session values.
    }
  }

  if (!githubId || !/^\d+$/.test(githubId)) {
    return null;
  }

  let userRow = await pool.query(
    `SELECT id, github_id::text AS github_id, username, email, avatar_url
     FROM users
     WHERE github_id = $1`,
    [githubId]
  );

  if (userRow.rows.length === 0) {
    userRow = await pool.query(
      `INSERT INTO users (github_id, username, email, avatar_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id, github_id::text AS github_id, username, email, avatar_url`,
      [githubId, username, email, avatarUrl]
    );
  } else {
    userRow = await pool.query(
      `UPDATE users
       SET username = $1,
           email = $2,
           avatar_url = $3,
           updated_at = NOW()
       WHERE github_id = $4
       RETURNING id, github_id::text AS github_id, username, email, avatar_url`,
      [username, email, avatarUrl, githubId]
    );
  }

  const user = userRow.rows[0];
  return {
    userId: String(user.id),
    githubId: String(user.github_id),
    username: user.username || username,
    email: user.email || email,
    avatarUrl: user.avatar_url || avatarUrl,
  };
}
