## Context

Halaman `/docs/page.tsx` saat ini merupakan dokumentasi statis dengan desain standar. User menginginkan revamp total agar terlihat premium, menggunakan brand blue (#34558b), dan memiliki fitur integrasi GitHub. Selain itu, route `/docs/[id]` juga perlu diselesaikan sebagai viewer dokumen user.

## Goals / Non-Goals

**Goals:**

- Revamp `/docs/page.tsx` dengan layout yang lebih bersih (premium docs style).
- Integrasi komponen `GitHubRepoSelector` untuk import dokumen dari GitHub (menggunakan session OAuth).
- Render dokumentasi produk menggunakan `DocMarkdownRenderer` agar konsisten.
- ToC dinamis untuk dokumentasi produk.
- Viewer dokumen user di `/docs/[id]` tetap dipertahankan dengan desain senada.

**Non-Goals:**

- Implementasi backend asli untuk GitHub sync (masih mock logic/UI).
- Sistem komentar pada dokumen.

## Decisions

### 1. Unified Docs Layout (DocsShell)

Menggunakan `DocsShell` untuk `/docs/page.tsx` dan (opsional) untuk `/docs/[id]`. Namun, untuk `/docs/[id]`, layout 2-kolom yang sudah dibuat lebih cocok untuk viewer. `/docs/page.tsx` akan tetap menggunakan sidebar navigasi docs produk.

### 2. Premium Aesthetics on `/docs/page.tsx`

- Menggunakan gradien halus dan brand blue untuk aksen.
- Tipografi menggunakan `Plus Jakarta Sans`.
- Section Documentation akan di-group dengan `DocMarkdownRenderer` daripada hardcoded HTML tags di page file.

### 3. GitHub Integration UI

- Menambahkan section "Add from GitHub" di halaman docs.
- Menggunakan komponen selector repo yang menampilkan list repo user (mock fetched via GitHub API scope).

### 4. Component Reuse

- `DocMarkdownRenderer` akan digunakan baik untuk viewer dokumen user maupun untuk isi dokumentasi produk itu sendiri.
- `TableOfContents` akan diekstrak secara dinamis dari section dokumentasi.

## Risks / Trade-offs

- Mengganti seluruh isi `src/app/docs/page.tsx` dapat menghilangkan konten lama jika tidak dipindahkan ke data structure. → Mitigasi: Pindahkan konten dokumentasi ke file data atau konstanta.
- Kompleksitas layout bertambah karena adanya sidebar produk vs viewer user.
