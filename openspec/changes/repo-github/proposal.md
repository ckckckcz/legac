## Why

Pengguna yang sudah login ke Legac perlu melihat daftar repository GitHub mereka (public dan private) langsung di dalam aplikasi, beserta detail kontributor, commit history, dan akses cepat ke fitur utama Legac ("Generate Legacy Code"). Saat ini halaman `user/[id]` hanya menampilkan mock document management — belum ada integrasi nyata dengan GitHub repository.

## What Changes

- Tambah tab **Repository** di halaman `src/app/user/[id]/page.tsx` sebagai tab baru di samping konten yang sudah ada
- Tambah komponen daftar repository (`RepoList`) yang menampilkan repo public dan private milik user yang sedang login
- Tambah komponen detail repository (`RepoDetail`) berisi: info repo, daftar kontributor (avatar + nama), ringkasan commit terbaru (pesan + author + tanggal), dan tombol **"Generate Legacy Code"**
- Tambah API route `GET /api/repos` untuk mengambil daftar repository dari GitHub API menggunakan OAuth access token dari session
- Tambah API route `GET /api/repos/[repoId]/detail` untuk mengambil detail repo: kontributor dan commit terbaru

## Capabilities

### New Capabilities

- `repo-list`: Daftar repository GitHub (public + private) milik user yang login — ditampilkan sebagai tab "Repository" di `user/[id]`, dengan info nama repo, deskripsi, bahasa, visibilitas, dan jumlah star/fork
- `repo-detail`: Panel/drawer detail per repository — menampilkan daftar kontributor (avatar, username, jumlah kontribusi), daftar commit terbaru (hash pendek, pesan, author, tanggal), dan tombol "Generate Legacy Code"
- `repo-api`: API routes server-side (`/api/repos` dan `/api/repos/[repoId]/detail`) yang memanggil GitHub API menggunakan access token OAuth dari NextAuth session

### Modified Capabilities

_(tidak ada capability existing yang berubah)_

## Impact

- **Halaman dimodifikasi**: `src/app/user/[id]/page.tsx` — tambah tab UI (tabs dari shadcn/ui)
- **Komponen baru**: `src/components/repos/RepoList.tsx`, `src/components/repos/RepoCard.tsx`, `src/components/repos/RepoDetail.tsx`, `src/components/repos/RepoContributors.tsx`, `src/components/repos/RepoCommits.tsx`
- **API routes baru**: `src/app/api/repos/route.ts`, `src/app/api/repos/[repoId]/detail/route.ts`
- **Service baru**: `src/lib/services/repo-service.ts` — wrapper GitHub API untuk repos, contributors, commits
- **Dependensi GitHub API**: Membutuhkan `repo` scope pada OAuth token (perlu verifikasi konfigurasi NextAuth); token harus disimpan di session untuk akses private repo
- **shadcn/ui components baru**: `Tabs`, `ScrollArea` (perlu diinstall)
- Tidak ada perubahan database atau skema
