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
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await params;
    const pool = getPool();

    // Fetch the documentation record
    const docResult = await pool.query(
      `SELECT
         d.id,
         d.title AS name,
         d.description,
         d.created_at,
         r.name AS repo_name,
         r.full_name AS repo_full_name,
         r.github_url
       FROM app.documentations d
       JOIN app.repositories r ON r.id = d.repository_id
       WHERE d.id = $1`,
      [id]
    );

    if (docResult.rows.length === 0) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const row = docResult.rows[0];

    // Fetch all pages for this documentation
    const pagesResult = await pool.query(
      `SELECT id, slug, title, content, page_order
       FROM app.documentation_pages
       WHERE documentation_id = $1
       ORDER BY page_order ASC`,
      [id]
    );

    // Build an index page from the list of pages
    const pageList = pagesResult.rows.map((p) => `- [${p.title}](${p.slug.replace(/\.[^.]+$/, "")})`).join("\n");
    const indexContent = `# ${row.name}\n\n**Repository:** ${row.repo_name}\n**Generated at:** ${new Date(row.created_at).toISOString()}\n\n## Files\n\n${pageList}`;

    // Build pages array: index page + real pages
    const pages = [
      { id: "index", name: "Overview", content: indexContent },
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
