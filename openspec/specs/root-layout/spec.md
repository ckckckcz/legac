# Root Layout

## Summary

Layout root aplikasi Legac yang membungkus semua halaman dengan `AuthSessionProvider` (provider konteks NextAuth) dan `Navbar`. Mengatur tipografi global menggunakan font Plus Jakarta Sans dan Geist Mono. Berlaku untuk seluruh aplikasi.

## File

- `src/app/layout.tsx`
- `src/components/auth-session-provider.tsx`
- `src/components/Navbar.tsx`

---

### Requirement: Struktur Layout Root

#### Scenario: Semua halaman dirender

WHEN pengguna mengakses halaman mana pun di aplikasi

THEN halaman dibungkus dengan `<html lang="en">`

AND `<body>` menggunakan variabel font `--font-plus-jakarta-sans` dan `--font-geist-mono` dengan kelas `font-sans antialiased`

AND `AuthSessionProvider` membungkus seluruh konten body

AND `Navbar` dirender sebelum `{children}` di dalam `AuthSessionProvider`

AND urutan rendering: `AuthSessionProvider` → `Navbar` → `{children}`

---

### Requirement: AuthSessionProvider

#### Scenario: Semua komponen client dapat mengakses sesi

WHEN `useSession()`, `signIn()`, atau `signOut()` dipanggil di komponen mana pun

THEN konteks NextAuth tersedia karena `AuthSessionProvider` berada di level root

---

### Requirement: Navbar Global

#### Scenario: Navbar tampil di semua halaman

WHEN pengguna mengakses halaman mana pun termasuk landing page, dashboard, atau halaman profil

THEN `Navbar` ditampilkan di bagian atas halaman

CATATAN: Halaman dashboard (`/user/[id]`, `/user/profile/[username]`) memiliki layout sidebar sendiri yang merender konten di bawah Navbar

---

### Requirement: Metadata Halaman

#### Scenario: Title dan description default

WHEN halaman tidak mendefinisikan metadata sendiri

THEN `title` dan `description` menggunakan nilai dari root layout: `title: "Legac"`, `description: "Legac"`

---

### Requirement: Tipografi Global

#### Scenario: Font Plus Jakarta Sans untuk teks umum

WHEN halaman dirender

THEN teks umum menggunakan font Plus Jakarta Sans (via CSS variable `--font-plus-jakarta-sans`)

AND kelas `font-sans` menerapkan font ini sebagai default

#### Scenario: Font Geist Mono untuk teks monospace

WHEN elemen dengan font monospace dirender

THEN font Geist Mono tersedia via CSS variable `--font-geist-mono`
