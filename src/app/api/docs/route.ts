import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPool } from "@/lib/db";

/**
 * GET /api/docs
 * Returns all documentations for the authenticated user.
 * Each doc includes repository info and page count.
 *
 * Response: { docs: Document[] }
 */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const pool = getPool();

    // Try multiple strategies to find the user in app.users:
    // 1. session.user.id might be GitHub numeric ID (if token.githubId was set)
    // 2. Use GitHub access token to fetch real GitHub profile (most reliable)
    let userId: string | null = null;

    // Strategy 1: Try session.user.id as github_id
    const sessionId = (session as any).user?.id;
    if (sessionId && /^\d+$/.test(String(sessionId))) {
      const userRow = await pool.query(
        "SELECT id FROM app.users WHERE github_id = $1",
        [sessionId]
      );
      if (userRow.rows.length > 0) {
        userId = userRow.rows[0].id;
      }
    }

    // Strategy 2: If not found, use GitHub API with access token
    if (!userId) {
      const accessToken = (session as any).accessToken;
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
            const userRow = await pool.query(
              "SELECT id FROM app.users WHERE github_id = $1",
              [ghProfile.id]
            );
            if (userRow.rows.length > 0) {
              userId = userRow.rows[0].id;
            }
          }
        } catch {
          // GitHub API call failed, continue without it
        }
      }
    }

    // If still no user found, return empty list
    if (!userId) {
      return NextResponse.json({ docs: [] });
    }

    // Fetch all documentations for this user, with repo info and page count
    const result = await pool.query(
      `SELECT
         d.id,
         d.title AS name,
         d.description,
         d.created_at,
         r.name AS repo_name,
         r.full_name AS repo_full_name,
         r.github_url,
         (SELECT COUNT(*) FROM app.documentation_pages dp WHERE dp.documentation_id = d.id) AS page_count,
         (SELECT COALESCE(SUM(LENGTH(dp.content)), 0) FROM app.documentation_pages dp WHERE dp.documentation_id = d.id) AS total_size
       FROM app.documentations d
       JOIN app.repositories r ON r.id = d.repository_id
       WHERE r.user_id = $1
       ORDER BY d.created_at DESC`,
      [userId]
    );

    const docs = result.rows.map((row) => {
      const sizeBytes = parseInt(row.total_size, 10) || 0;
      const sizeStr =
        sizeBytes < 1024
          ? `${sizeBytes} B`
          : sizeBytes < 1024 * 1024
          ? `${(sizeBytes / 1024).toFixed(1)} KB`
          : `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;

      return {
        id: row.id,
        name: row.name,
        type: "Documentation",
        category: "Generated AI",
        size: sizeStr,
        uploadDate: new Date(row.created_at).toISOString().split("T")[0],
        status: "published" as const,
        thumbnail: "",
        description: row.description,
        repoName: row.repo_name,
        repoFullName: row.repo_full_name,
        githubUrl: row.github_url,
        pageCount: parseInt(row.page_count, 10) || 0,
      };
    });

    return NextResponse.json({ docs });
  } catch (error: any) {
    console.error("GET /api/docs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
