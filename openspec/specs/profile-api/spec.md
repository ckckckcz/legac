# Profile API

## Summary

API untuk membaca dan memperbarui profil pengguna yang terotentikasi. Saat ini mengembalikan data mock dari sesi NextAuth, dengan rencana migrasi ke query PostgreSQL (`app.user_profiles`).

## Endpoint

- `GET /api/profile` — Membaca profil pengguna saat ini
- `PUT /api/profile` — Memperbarui data profil pengguna

## File

- `src/app/api/profile/route.ts`
- `src/lib/types/profile.ts` — Tipe `UserProfileInput`

---

### Requirement: GET /api/profile - Membaca Profil Pengguna

#### Scenario: Pengguna tidak terotentikasi

WHEN `GET /api/profile` dipanggil tanpa sesi yang valid (`session.user.id` tidak ada)

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Unauthorized" }`

#### Scenario: Pengguna terotentikasi

WHEN `GET /api/profile` dipanggil dengan sesi valid

THEN API mengembalikan `200 OK` dengan objek profil:
```
{
  id: number,
  github_id: string,
  name: string | null,
  email: string | null,
  bio: null,
  avatar_url: string | null,
  custom_avatar_url: null,
  created_at: Date,
  updated_at: Date
}
```

AND `github_id` diisi dari `session.user.id`

AND `name` diisi dari `session.user.name`

AND `email` diisi dari `session.user.email`

AND `avatar_url` diisi dari `session.user.image`

#### Scenario: Server error saat GET

WHEN terjadi exception yang tidak tertangani di handler GET

THEN API mengembalikan `500 Internal Server Error` dengan body `{ error: "Internal server error" }`

---

### Requirement: PUT /api/profile - Memperbarui Profil Pengguna

#### Scenario: Pengguna tidak terotentikasi

WHEN `PUT /api/profile` dipanggil tanpa sesi yang valid

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Unauthorized" }`

#### Scenario: Field name tidak valid (bukan string)

WHEN body request mengandung field `name` dengan tipe bukan string

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "Invalid name field" }`

#### Scenario: Field email tidak valid (bukan string)

WHEN body request mengandung field `email` dengan tipe bukan string

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "Invalid email field" }`

#### Scenario: Field bio tidak valid (bukan string)

WHEN body request mengandung field `bio` dengan tipe bukan string

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "Invalid bio field" }`

#### Scenario: Update profil berhasil

WHEN `PUT /api/profile` dipanggil dengan sesi valid dan body yang valid

THEN API mengembalikan `200 OK` dengan profil yang diperbarui

AND `name` menggunakan nilai dari body jika ada, fallback ke `session.user.name`

AND `email` menggunakan nilai dari body jika ada, fallback ke `session.user.email`

AND `bio` menggunakan nilai dari body jika ada, fallback ke `null`

#### Scenario: Server error saat PUT

WHEN terjadi exception yang tidak tertangani di handler PUT

THEN API mengembalikan `500 Internal Server Error` dengan body `{ error: "Internal server error" }`

---

### Requirement: Struktur Data Input (UserProfileInput)

WHEN `PUT /api/profile` dipanggil

THEN body request dapat mengandung field opsional: `name: string`, `email: string`, `bio: string`

AND semua field bersifat opsional (partial update)
