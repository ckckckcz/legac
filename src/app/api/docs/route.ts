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

    // Get GitHub numeric ID from session
    const githubId = (session as any).user?.id;

    // Find app.users row for this GitHub user
    let userId: string | null = null;
    if (githubId) {
      const userRow = await pool.query(
        "SELECT id FROM app.users WHERE github_id = $1",
        [githubId]
      );
      if (userRow.rows.length > 0) {
        userId = userRow.rows[0].id;
      }
    }

    // If no user found, return empty list
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
