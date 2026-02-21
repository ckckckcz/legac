## Why

Halaman dokumentasi utama (`/docs/page.tsx`) dan halaman viewer dokumen individual (`/docs/[id]`) memerlukan pembaruan desain agar lebih bersih, premium, dan konsisten dengan brand identity (brand blue). Selain itu, diperlukan fitur fungsional untuk menambahkan dokumen baru melalui link GitHub repository.

## What Changes

- **Revamp `/docs/page.tsx`**: Menghapus konten lama dan menggantinya dengan desain dokumentasi yang lebih modern, premium, dan menggunakan komponen Shadcn UI.
- **Implementasi GitHub Repo Linking**: Menambahkan UI/fitur pada halaman docs untuk memungkinkan user menambahkan dokumen dari GitHub (menggunakan OAuth yang sudah ada).
- **Halaman Viewer `/docs/[id]`**: (Sudah diinisiasi) Halaman untuk melihat detail dokumen dengan Markdown renderer dan ToC dinamis.
- **Layout & Typography**: Menggunakan `@tailwindcss/typography` dan brand color (#34558b) secara konsisten.

## Capabilities

### New Capabilities

- `doc-viewer-page`: Route `/docs/[id]` — halaman viewer dokumen dengan Markdown renderer dan ToC otomatis.
- `doc-github-integration`: UI dan logic untuk memilih repository GitHub dan mengimpor dokumen.
- `doc-markdown-renderer`: Komponen renderer Markdown premium.

### Modified Capabilities

- `product-docs-page`: Revamp total halaman `/docs` dengan desain baru dan integrasi fitur tambah dokumen.

## Impact

- **Modified files**: `src/app/docs/page.tsx`, `src/components/docs/DocsLayout.tsx`, `src/components/docs/DocsSidebar.tsx`
- **New files**: `src/app/docs/[id]/page.tsx`, `src/components/docs/DocMarkdownRenderer.tsx`, `src/components/repos/RepoSelector.tsx`
- **Dependencies**: `react-markdown`, `remark-gfm`, `@tailwindcss/typography`, `rehype-slug`
- **Data**: Mock data repository GitHub dan sinkronisasi dengan session user.
