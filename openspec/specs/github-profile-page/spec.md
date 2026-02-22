# GitHub Profile Page

## Summary

Halaman profil GitHub pengguna yang menampilkan data profil, statistik repositori, dan metadata. Diakses melalui `/user/profile/[username]`. Dilengkapi dengan state skeleton loading, error handling, dan cache in-memory 5 menit dengan retry otomatis pada rate limit.

## Komponen

- **Halaman route**: `src/app/user/profile/[username]/page.tsx`
- **Komponen utama**: `src/components/profile/ProfilePage.tsx`
- **Sub-komponen**:
  - `src/components/profile/GitHubProfileCard.tsx`
  - `src/components/profile/GitHubStatsSection.tsx`
  - `src/components/profile/ProfileMetadataSection.tsx`
  - `src/components/profile/ProfileSkeleton.tsx`
  - `src/components/profile/ProfileError.tsx`
- **Hook**: `src/lib/hooks/useGitHubProfile.ts`
- **Service**: `src/lib/services/github.ts` — `getGitHubUser()`
- **Cache**: `src/lib/utils/cache.ts` — `getCached()`, `clearCache()`

---

### Requirement: Proteksi Rute - Hanya Pengguna Terotentikasi

#### Scenario: Status session masih loading di halaman route

WHEN `/user/profile/[username]` diakses dan status session adalah `loading`

THEN halaman menampilkan spinner fullscreen dengan teks "Loading..."

#### Scenario: Pengguna belum terotentikasi

WHEN status session bukan `authenticated`

THEN halaman mengembalikan `null` (tidak ada konten) untuk mencegah flash

AND middleware akan menangani redirect ke login

---

### Requirement: Resolusi Username

#### Scenario: Username dari prop URL param

WHEN halaman route menerima `params.username` dari URL `/user/profile/alice`

THEN `ProfilePage` menggunakan `username = "alice"` dari prop

#### Scenario: Username dari query parameter `?user=`

WHEN `ProfilePage` dirender tanpa prop username tapi URL mengandung `?user=bob`

THEN `ProfilePage` menggunakan `username = "bob"` dari query parameter

#### Scenario: Username dari sesi (profil sendiri)

WHEN tidak ada prop username dan tidak ada query parameter `?user=`

THEN `ProfilePage` menggunakan `session.user.username` sebagai username

#### Scenario: Tidak ada username dan pengguna tidak terotentikasi

WHEN tidak ada prop, tidak ada query param, dan sesi tidak tersedia

THEN ditampilkan `ProfileError` dengan pesan "You must be signed in to view your profile."

AND tombol retry mengarahkan ke `/login?callbackUrl=/profile`

---

### Requirement: Loading State Profil

#### Scenario: Session sedang diinisialisasi

WHEN status session adalah `loading` ATAU username belum tersedia dan status bukan `unauthenticated`

THEN ditampilkan `ProfileSkeleton` sebagai placeholder

#### Scenario: Data sedang di-fetch dari GitHub API

WHEN `useGitHubProfile` dalam status loading dan belum ada data cached

THEN ditampilkan `ProfileSkeleton`

---

### Requirement: Menampilkan Data Profil GitHub

#### Scenario: Data berhasil diambil

WHEN `useGitHubProfile` berhasil mengambil data profil

THEN ditampilkan:
- Heading "GitHub Profile" dan deskripsi
- `GitHubProfileCard` dengan data `user`
- `GitHubStatsSection` dengan `username` dan `stats` (publicRepos, followers, following)
- `ProfileMetadataSection` dengan `location`, `company`, `email`, `created_at`
- Timestamp "Last updated: {waktu}" jika `data.lastUpdated` tersedia

#### Scenario: Error dan tidak ada data

WHEN `useGitHubProfile` mengembalikan error dan tidak ada data sama sekali

THEN ditampilkan `ProfileError` dengan pesan error dan tombol retry

AND klik tombol retry memanggil fungsi `retry()` dari hook

---

### Requirement: Caching Profil GitHub

#### Scenario: Profil pertama kali dimuat

WHEN `useGitHubProfile(username)` dipanggil dan belum ada cache

THEN data diambil dari `getGitHubUser(username)` dan disimpan ke cache dengan TTL 5 menit

#### Scenario: Profil sudah di-cache

WHEN `useGitHubProfile(username)` dipanggil dan cache masih valid (< 5 menit)

THEN data dikembalikan dari cache tanpa memanggil API GitHub lagi

#### Scenario: Refetch manual - bypass cache

WHEN `refetch()` dipanggil

THEN cache dihapus untuk username tersebut dan data di-fetch ulang dari API

#### Scenario: Retry manual setelah error

WHEN `retry()` dipanggil

THEN cache dihapus dan fetch dimulai ulang dari awal

---

### Requirement: Auto-Retry pada Rate Limit

#### Scenario: GitHub API mengembalikan rate limit (429)

WHEN `getGitHubUser()` gagal dengan error rate limit dan `retryCount < maxRetries` (default: 3)

THEN sistem menunggu dengan delay exponential backoff: `1000ms * 2^retryCount`

AND secara otomatis mencoba kembali

#### Scenario: Non-rate-limit error atau melebihi maxRetries

WHEN error bukan rate limit ATAU `retryCount >= 3`

THEN state error diset dan tidak ada retry otomatis

AND pengguna dapat melakukan retry manual via tombol di `ProfileError`
