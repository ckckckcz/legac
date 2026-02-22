import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPool } from "@/lib/db";
import crypto from "crypto";

/**
 * POST /api/auth/cli
 * Called after GitHub OAuth completes, from the /cli-auth page.
 * Creates a session token for the CLI and links it to the authenticated user.
 *
 * Body: { code: string }
 *
 * Returns: { token, username, email, userId, avatarUrl }
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Not authenticated. Please log in with GitHub first." },
        { status: 401 }
      );
    }

    // Get GitHub access token from session
    const accessToken = (session as any).accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { error: "No GitHub access token in session. Please sign out and sign in again." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid code." },
        { status: 400 }
      );
    }

    // Fetch GitHub profile using access token to get the real numeric ID
    const ghRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!ghRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub profile. Token may be expired. Please sign out and sign in again." },
        { status: 401 }
      );
    }

    const ghProfile = await ghRes.json();
    const githubId = ghProfile.id; // numeric GitHub user ID
    const username = ghProfile.login || session.user.name || "unknown";
    const email = session.user.email || ghProfile.email || "";
    const avatarUrl = ghProfile.avatar_url || session.user.image || "";

    const pool = getPool();

    // Upsert user in app.users (find by github_id, create if not exists)
    let userRow = await pool.query(
      "SELECT id FROM app.users WHERE github_id = $1",
      [githubId]
    );

    if (userRow.rows.length === 0) {
      userRow = await pool.query(
        `INSERT INTO app.users (github_id, username, email, avatar_url)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [githubId, username, email, avatarUrl]
      );
    } else {
      // Update username/email/avatar in case they changed
      await pool.query(
        `UPDATE app.users SET username = $1, email = $2, avatar_url = $3, updated_at = NOW()
         WHERE github_id = $4`,
        [username, email, avatarUrl, githubId]
      );
    }

    const userId = userRow.rows[0].id;

    // Generate a CLI session token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days

    // Store in app.user_sessions
    await pool.query(
      `INSERT INTO app.user_sessions (user_id, token_hash, expires_at, user_agent)
       VALUES ($1, $2, $3, $4)`,
      [userId, tokenHash, expiresAt, req.headers.get("user-agent") || "legacyver-cli"]
    );

    // Log activity
    await pool.query(
      `INSERT INTO app.activity_logs (user_id, event_type, event_data)
       VALUES ($1, 'cli_login', $2)`,
      [userId, JSON.stringify({ code, userAgent: "legacyver-cli" })]
    );

    return NextResponse.json({
      token: rawToken,
      userId: String(userId),
      username,
      email,
      avatarUrl,
    });
  } catch (error: any) {
    console.error("CLI auth error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
