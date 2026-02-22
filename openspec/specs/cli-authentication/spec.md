# CLI Authentication

## Summary

Fitur autentikasi CLI memungkinkan pengguna CLI `legacyver` untuk login melalui browser menggunakan GitHub OAuth. Setelah autentikasi selesai, token sesi CLI dikirimkan ke server HTTP lokal CLI melalui redirect.

Alur: CLI membuka browser → `/cli-auth?code=&port=` → GitHub OAuth jika belum login → `POST /api/auth/cli` → redirect ke `http://localhost:{port}/callback?token=&username=&email=`

## Komponen

- **Halaman**: `src/app/cli-auth/page.tsx`
- **API Route**: `src/app/api/auth/cli/route.ts`
- **Komponen Animasi**: `src/components/confentti.tsx`

---

### Requirement: Halaman /cli-auth Menampilkan Status Autentikasi

#### Scenario: Parameter code atau port tidak ada

WHEN pengguna mengakses `/cli-auth` tanpa query parameter `code` atau `port`

THEN halaman menampilkan pesan error "Missing code or port parameter. Please try again from the CLI."

AND tampilan menggunakan state error (teks merah) dengan panel error merah

#### Scenario: Session sedang dimuat

WHEN halaman dimuat dan status session NextAuth adalah `loading`

THEN tampil spinner loading di bawah pesan "Authenticating..."

#### Scenario: Pengguna belum login (unauthenticated)

WHEN pengguna mengakses `/cli-auth?code=<code>&port=<port>` dan belum memiliki sesi aktif

THEN sistem memanggil `signIn("github", { callbackUrl: "/cli-auth?code=...&port=..." })`

AND pengguna diarahkan ke GitHub OAuth dengan callbackUrl yang menyertakan parameter `code` dan `port`

#### Scenario: Pengguna sudah login dan berhasil mendapat token

WHEN pengguna sudah terotentikasi (status `authenticated`) dan parameter `code` serta `port` valid

THEN halaman menampilkan pesan "Creating CLI session..."

AND sistem memanggil `POST /api/auth/cli` dengan body `{ code, port }`

AND setelah berhasil menampilkan pesan "Welcome, {username}! Redirecting to CLI..."

AND setelah delay 1 detik, browser diarahkan ke `http://localhost:{port}/callback?token=...&username=...&email=...`

AND animasi confetti ditampilkan

AND panel sukses berwarna hijau ditampilkan dengan instruksi menutup tab

#### Scenario: POST /api/auth/cli gagal

WHEN permintaan ke `/api/auth/cli` menghasilkan respons non-ok

THEN halaman menampilkan pesan error "Authentication failed: {pesan error dari server}"

AND panel error merah ditampilkan dengan instruksi menjalankan ulang `legacyver login`

---

### Requirement: API POST /api/auth/cli Menerbitkan Token CLI

#### Scenario: Request tanpa sesi aktif

WHEN `POST /api/auth/cli` dipanggil tanpa sesi NextAuth yang valid

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Not authenticated. Please log in with GitHub first." }`

#### Scenario: Sesi ada tapi tidak memiliki accessToken GitHub

WHEN sesi valid ada tapi `session.accessToken` tidak ada

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "No GitHub access token in session. Please sign out and sign in again." }`

#### Scenario: Body request tidak menyertakan code

WHEN request body tidak mengandung field `code` atau `code` bukan string

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "Missing or invalid code." }`

#### Scenario: Token GitHub tidak bisa memuat profil GitHub

WHEN `GET https://api.github.com/user` menggunakan accessToken gagal (non-ok)

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Failed to fetch GitHub profile. Token may be expired..." }`

#### Scenario: Pengguna baru berhasil diautentikasi

WHEN sesi valid, code valid, dan profil GitHub berhasil diambil, DAN pengguna belum ada di `app.users`

THEN sistem menyisipkan baris baru ke `app.users` dengan `github_id`, `username`, `email`, `avatar_url`

AND sistem membuat token sesi CLI: 32 byte random hex, hashed SHA-256, expired 90 hari

AND token hash disimpan ke `app.user_sessions` dengan `user_id`, `token_hash`, `expires_at`, `user_agent`

AND event `cli_login` dicatat ke `app.activity_logs`

AND API mengembalikan `200 OK` dengan body `{ token, userId, username, email, avatarUrl }`

#### Scenario: Pengguna lama login ulang via CLI

WHEN pengguna sudah ada di `app.users` (ditemukan berdasarkan `github_id`)

THEN sistem memperbarui `username`, `email`, `avatar_url`, dan `updated_at` di `app.users`

AND membuat token sesi CLI baru (tidak mengganti token lama)

AND mengembalikan token baru beserta data pengguna
