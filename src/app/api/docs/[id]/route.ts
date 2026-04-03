import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getPool } from "@/lib/db";

/**
 * GET /api/docs/[id]
 * Returns a single documentation with all its pages.
 *
 * Response: { doc: Document & { pages: DocumentSubPage[] } }
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    // Try multiple strategies to find the user in users:
    let userId: string | null = null;
    const sessionId = (session as any).user?.id;
    
    // Strategy 1: Try session.user.id as github_id
    if (sessionId && /^\\d+$/.test(String(sessionId))) {
      const pool = getPool();
      const userRow = await pool.query(
        "SELECT id FROM users WHERE github_id = $1",
        [sessionId]
      );
      if (userRow.rows.length > 0) userId = userRow.rows[0].id;
    }

    // Strategy 2: If not found, use GitHub API with access token
    if (!userId) {
      const accessToken = (session as any).accessToken;
      if (accessToken) {
        try {
          const ghRes = await fetch("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
          });
          if (ghRes.ok) {
            const ghProfile = await ghRes.json();
            const pool = getPool();
            const userRow = await pool.query(
              "SELECT id FROM users WHERE github_id = $1",
              [ghProfile.id]
            );
            if (userRow.rows.length > 0) userId = userRow.rows[0].id;
          }
        } catch { } // Ignore errors
      }
    }

    if (!userId) {
      return NextResponse.json({ error: "Access denied: cannot verify user identity." }, { status: 403 });
    }

    const pool = getPool();

    // Fetch the documentation record matching the current user enforcing authorization (IDOR protection)
    const docResult = await pool.query(
      `SELECT
         d.id,
         d.title AS name,
         d.description,
         d.created_at,
         r.name AS repo_name,
         r.full_name AS repo_full_name,
         r.github_url
       FROM documentations d
       JOIN repositories r ON r.id = d.repository_id
       WHERE d.id = $1 AND r.user_id = $2`,
      [id, userId]
    );

    if (docResult.rows.length === 0) {
      return NextResponse.json({ error: "Document not found or access denied" }, { status: 404 });
    }

    const row = docResult.rows[0];

    // Fetch all pages for this documentation
    const pagesResult = await pool.query(
      `SELECT id, slug, title, content, page_order
       FROM documentation_pages
       WHERE documentation_id = $1
       ORDER BY page_order ASC`,
      [id]
    );

    // Build an index page from the list of pages
    const pageList = pagesResult.rows.map((p) => `- [${p.title}](${p.slug.replace(/\.[^.]+$/, "")})`).join("\n");
    const indexContent = `# ${row.name}\n\n**Repository:** ${row.repo_name}\n**Generated at:** ${new Date(row.created_at).toISOString()}\n\n## Files\n\n${pageList}`;

    // Build pages array: index page + real pages
    const pages = [
      { id: "overview", name: "Overview", content: indexContent },
      ...pagesResult.rows.map((p) => ({
        id: p.slug.replace(/\.[^.]+$/, "").replace(/\//g, "-"),
        name: p.title,
        content: p.content,
      })),
    ];

    // Calculate total size
    const totalSize = pagesResult.rows.reduce((sum, p) => sum + (p.content?.length || 0), 0);
    const sizeStr =
      totalSize < 1024
        ? `${totalSize} B`
        : totalSize < 1024 * 1024
          ? `${(totalSize / 1024).toFixed(1)} KB`
          : `${(totalSize / (1024 * 1024)).toFixed(1)} MB`;

    const doc = {
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
      pages,
    };

    return NextResponse.json({ doc });
  } catch (error: any) {
    console.error("GET /api/docs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
