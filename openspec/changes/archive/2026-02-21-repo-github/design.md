## Context

Legac menggunakan Next.js 16 App Router dengan NextAuth v5 (beta) untuk autentikasi GitHub OAuth. Dari `src/auth.ts` sudah terkonfirmasi bahwa `account.access_token` disimpan di JWT dan di-expose ke session sebagai `session.accessToken`. Ini berarti kita sudah memiliki akses token OAuth yang dibutuhkan untuk memanggil GitHub API v3 atas nama user yang login — termasuk akses ke private repository jika scope `repo` sudah dikonfigurasi.

Halaman `src/app/user/[id]/page.tsx` saat ini adalah Client Component yang menampilkan Document Management dengan mock data. Kita akan menambah tab "Repository" di halaman ini tanpa merusak konten yang sudah ada.

Stack yang relevan:
- **NextAuth session**: `session.accessToken` tersedia (GitHub OAuth token)
- **GitHub API**: `https://api.github.com` — endpoint yang akan dipakai: `/user/repos`, `/repos/{owner}/{repo}/contributors`, `/repos/{owner}/{repo}/commits`
- **Existing service**: `src/lib/services/github.ts` sudah ada tapi hanya untuk profile data — perlu diperluas atau dibuat service terpisah
- **shadcn/ui** sudah terpasang: Card, Badge, Avatar, Button, Skeleton. Perlu install: `Tabs`, `ScrollArea`

## Goals / Non-Goals

**Goals:**
- Tambah tab "Repository" di `user/[id]/page.tsx` menggunakan shadcn/ui `Tabs`
- Tampilkan daftar repo milik user (public + private) dengan info: nama, deskripsi, bahasa, visibilitas, star, fork
- Klik repo → tampilkan panel/sheet detail: kontributor + commit terbaru + tombol "Generate Legacy Code"
- API routes server-side sebagai proxy ke GitHub API (agar token tidak terekspos ke client)
- Gunakan shadcn/ui components secara konsisten: Card, Badge, Avatar, Skeleton, ScrollArea, Sheet/Drawer

**Non-Goals:**
- Tidak menyimpan data repo ke database
- Tidak mengimplementasikan fitur "Generate Legacy Code" — hanya tombol placeholder
- Tidak mendukung pagination pada tahap ini (ambil default 30 repo pertama dari GitHub API)
- Tidak mengubah sistem autentikasi atau scope OAuth yang ada — jika `repo` scope belum ada, private repo tidak muncul tapi tidak crash

## Decisions

### 1. API routes sebagai proxy, bukan GitHub API langsung dari client

Token OAuth harus tidak boleh diekspos ke JavaScript browser secara eksplisit. Meskipun `session.accessToken` saat ini di-expose ke session (lihat `auth.ts` line 48-50), best practice adalah memanggil GitHub API dari server-side API route yang mengambil token dari `auth()` server-side — bukan dari client yang baca `session.accessToken`.

**Keputusan**: Buat API routes di `src/app/api/repos/` yang memanggil `auth()` server-side untuk mendapatkan token, lalu proxy ke GitHub API. Client hanya memanggil `/api/repos`.

Alternatif dipertimbangkan: Panggil GitHub API langsung dari client menggunakan `session.accessToken` — ditolak karena mengekspos token ke browser network tab dan JavaScript.

### 2. Struktur komponen: `src/components/repos/`

Konsisten dengan pola folder yang sudah ada (`profile/`, `docs/`, `landing/`). Setiap komponen repos memiliki tanggung jawab tunggal.

**Struktur komponen:**
```
src/components/repos/
├── RepoList.tsx         — daftar kartu repo + search/filter
├── RepoCard.tsx         — satu kartu repo (nama, badge, stats)
├── RepoDetail.tsx       — Sheet/Drawer detail: orchestrates contributors + commits
├── RepoContributors.tsx — daftar kontributor dengan Avatar
└── RepoCommits.tsx      — daftar commit terbaru
```

Alternatif: Semua dalam satu file besar — ditolak karena susah dirawat.

### 3. RepoDetail menggunakan shadcn/ui `Sheet` (side drawer)

Klik pada `RepoCard` membuka `Sheet` dari kanan yang menampilkan detail repo (contributors + commits + tombol Generate). Ini lebih baik dari navigasi ke halaman baru karena user tetap melihat daftar repo di belakang.

Alternatif dipertimbangkan: `Dialog` (modal) — ditolak karena konten detail cukup panjang, Sheet lebih ergonomis untuk daftar scrollable. Navigasi ke halaman baru — ditolak karena breaking UX dari tab layout.

### 4. State management: local state di Client Components

`RepoList` adalah Client Component (`"use client"`) karena butuh state untuk selected repo, search query, dan loading. `RepoDetail` juga Client Component karena di-trigger oleh interaksi user.

`RepoContributors` dan `RepoCommits` bisa menjadi pure presentational components (menerima data via props) — tidak perlu `"use client"`.

### 5. Service baru `repo-service.ts` — tidak extend `github.ts` yang ada

`src/lib/services/github.ts` yang ada hanya untuk public profile data dan menggunakan `REACT_APP_GITHUB_TOKEN` (env var yang salah untuk Next.js). Service baru `repo-service.ts` akan:
- Menerima `accessToken` sebagai parameter (bukan env var)
- Mendefinisikan tipe `GitHubRepo`, `GitHubContributor`, `GitHubCommit`
- Menggunakan `Authorization: Bearer <token>` (format modern vs `token <token>`)

### 6. Tab "Repository" ditambahkan ke `user/[id]/page.tsx` dengan shadcn/ui `Tabs`

Halaman saat ini tidak memiliki struktur tab. Kita wrap konten existing (Document Management) sebagai `TabsContent` pertama, dan tambah `TabsContent` kedua untuk Repository.

**shadcn/ui components yang perlu diinstall**: `Tabs`, `ScrollArea`, `Sheet`

## Risks / Trade-offs

- **Scope `repo` belum tentu ada** → GitHub OAuth di `auth.ts` saat ini tidak mencantumkan `scope: 'repo'`. Jika scope tidak ada, `/api/repos` hanya akan mengembalikan public repos. Mitigasi: tampilkan pesan informatif "Showing public repositories only. Grant repo access to see private repositories." — tidak crash.

- **Rate limiting GitHub API** → GitHub API: 5000 req/jam untuk authenticated requests. Dengan satu user mengakses repo list, contributors, dan commits sekaligus bisa memakan banyak request. Mitigasi: gunakan `next: { revalidate: 60 }` pada fetch di API routes untuk caching 60 detik.

- **Access token expired/invalid** → Token dari NextAuth bisa expired. Mitigasi: handle 401 dari GitHub API di API route, kembalikan 401 ke client dengan pesan yang jelas.

- **Repo dengan banyak contributor/commit** → Batasi response: ambil max 10 contributors dan 10 commits per repo untuk performa. Bukan paginated pada tahap ini.

## Open Questions

- Apakah scope `repo` perlu ditambahkan ke konfigurasi NextAuth di `auth.ts`? Ini perlu dikonfirmasi — jika ya, user yang sudah login perlu re-authenticate. Untuk sekarang, implementasi bekerja dengan atau tanpa scope tersebut (graceful degradation ke public-only).
- Tombol "Generate Legacy Code" nantinya trigger ke endpoint apa? Untuk saat ini dibuat sebagai placeholder `Button` yang disabled dengan tooltip "Coming soon".
