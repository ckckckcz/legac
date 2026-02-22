# Session Storage Hooks

## Summary

Kumpulan custom React hooks untuk mengelola sesi dan token autentikasi di sisi klien menggunakan localStorage sebagai fallback dan penyimpanan sinkron. Menyediakan akses terpadu antara sesi NextAuth dan localStorage.

## File

- `src/lib/hooks/useSessionStorage.ts`
- `src/lib/utils/session-storage.ts` — utility functions
- `src/lib/utils/storage-sync.ts` — multi-tab broadcast
- `src/lib/types/session-storage.ts` — TypeScript types

## Hooks yang Tersedia

- `useSessionStorage()` — manajemen dasar localStorage untuk sesi
- `useSessionWithStorage()` — kombinasi NextAuth + localStorage sync
- `useAuthToken()` — akses token autentikasi dari localStorage

---

### Requirement: useSessionStorage - Manajemen Dasar localStorage

#### Scenario: Menyimpan data sesi ke localStorage

WHEN `storeSession(user, expiresAt)` dipanggil

THEN data sesi disimpan ke localStorage melalui `storeSessionData(user, expiresAt)`

#### Scenario: Membaca data sesi dari localStorage

WHEN `getSession()` dipanggil

THEN mengembalikan `StoredSessionData | null` dari localStorage via `getStoredSessionData()`

#### Scenario: Menghapus data sesi dari localStorage

WHEN `clearSession()` dipanggil

THEN data sesi dihapus dari localStorage via `clearSessionData()`

---

### Requirement: useSessionWithStorage - Sinkronisasi NextAuth + localStorage

#### Scenario: Inisialisasi - membaca stored session saat mount

WHEN komponen yang menggunakan `useSessionWithStorage()` pertama kali mount

THEN hook membaca data sesi dari localStorage

AND `isLoading` di-set ke `false` setelah pembacaan selesai

AND `storedSession` diinisialisasi dengan data dari localStorage (atau `null` jika tidak ada)

#### Scenario: Sesi aktif - sync ke localStorage

WHEN status NextAuth adalah `authenticated` dan `session.user` tersedia

THEN data pengguna (id, name, email, image, username) disimpan ke localStorage

AND waktu kadaluarsa di-set ke 30 hari dari sekarang (mengikuti default NextAuth)

AND jika `session.accessToken` tersedia, token juga disimpan via `storeAuthToken()`

#### Scenario: Pengguna logout - membersihkan localStorage

WHEN status NextAuth berubah menjadi `unauthenticated`

THEN localStorage dibersihkan via `clearSession()`

AND `storedSession` di-set ke `null`

#### Scenario: Nilai effectiveSession - server session prioritas

WHEN hook dipanggil

THEN `effectiveSession` mengembalikan `session` (NextAuth) jika tersedia

AND jika `session` adalah `null`, fallback ke `storedSession`

#### Scenario: Return values

WHEN `useSessionWithStorage()` digunakan dalam komponen

THEN hook mengembalikan:
- `session` — sesi NextAuth (bisa null)
- `status` — status NextAuth ("loading" | "authenticated" | "unauthenticated")
- `isLoading` — apakah localStorage sedang diinisialisasi
- `storedSession` — data sesi dari localStorage
- `effectiveSession` — sesi terbaik yang tersedia (server > stored)

---

### Requirement: useAuthToken - Akses Token Autentikasi

#### Scenario: Inisialisasi token dari localStorage

WHEN komponen yang menggunakan `useAuthToken()` pertama kali mount

THEN hook membaca token dari localStorage via `getStoredToken()`

AND `isLoading` di-set ke `false` setelah pembacaan selesai

#### Scenario: Token tersedia

WHEN token valid tersimpan di localStorage

THEN `token` berisi string token

AND `hasToken` bernilai `true`

#### Scenario: Token tidak tersedia

WHEN tidak ada token di localStorage

THEN `token` bernilai `null`

AND `hasToken` bernilai `false`

#### Scenario: Return values

WHEN `useAuthToken()` digunakan dalam komponen

THEN hook mengembalikan:
- `token: string | null` — token dari localStorage
- `isLoading: boolean` — apakah sedang diinisialisasi
- `hasToken: boolean` — shorthand apakah token tersedia

---

### Requirement: Struktur StoredSessionData

WHEN data sesi disimpan ke localStorage

THEN strukturnya adalah:
```
{
  user: {
    id: string,
    name: string | null | undefined,
    email: string | null | undefined,
    image: string | null | undefined,
    username: string | undefined
  },
  expires: string  // ISO date string
}
```
