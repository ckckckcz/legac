# Settings API

## Summary

API untuk membaca dan memperbarui preferensi/pengaturan pengguna seperti tema, notifikasi, dan visibilitas profil. Saat ini mengembalikan data mock, dengan rencana migrasi ke tabel `app.user_settings` di PostgreSQL.

## Endpoint

- `GET /api/settings` — Membaca pengaturan pengguna saat ini
- `PUT /api/settings` — Memperbarui pengaturan pengguna

## File

- `src/app/api/settings/route.ts`
- `src/lib/types/profile.ts` — Tipe `UserSettingsInput`

---

### Requirement: GET /api/settings - Membaca Pengaturan Pengguna

#### Scenario: Pengguna tidak terotentikasi

WHEN `GET /api/settings` dipanggil tanpa sesi valid

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Unauthorized" }`

#### Scenario: Pengguna terotentikasi

WHEN `GET /api/settings` dipanggil dengan sesi valid

THEN API mengembalikan `200 OK` dengan objek pengaturan:
```
{
  user_id: string,
  theme: "auto" | "light" | "dark",
  notifications_enabled: boolean,
  email_notifications: boolean,
  profile_visibility: "public" | "private" | "friends",
  created_at: Date,
  updated_at: Date
}
```

AND nilai default: `theme = "auto"`, `notifications_enabled = true`, `email_notifications = true`, `profile_visibility = "public"`

#### Scenario: Server error saat GET

WHEN terjadi exception di handler GET

THEN API mengembalikan `500 Internal Server Error` dengan body `{ error: "Internal server error" }`

---

### Requirement: PUT /api/settings - Memperbarui Pengaturan Pengguna

#### Scenario: Pengguna tidak terotentikasi

WHEN `PUT /api/settings` dipanggil tanpa sesi valid

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Unauthorized" }`

#### Scenario: Nilai theme tidak valid

WHEN body request mengandung field `theme` dengan nilai selain `"light"`, `"dark"`, atau `"auto"`

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "Invalid theme value" }`

#### Scenario: Nilai profile_visibility tidak valid

WHEN body request mengandung field `profile_visibility` dengan nilai selain `"public"`, `"private"`, atau `"friends"`

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "Invalid profile_visibility value" }`

#### Scenario: Update pengaturan berhasil

WHEN `PUT /api/settings` dipanggil dengan sesi valid dan body yang valid

THEN API mengembalikan `200 OK` dengan pengaturan yang diperbarui

AND `theme` menggunakan nilai dari body jika ada, fallback ke `"auto"`

AND `notifications_enabled` menggunakan nilai dari body jika ada, fallback ke `true`

AND `email_notifications` menggunakan nilai dari body jika ada, fallback ke `true`

AND `profile_visibility` menggunakan nilai dari body jika ada, fallback ke `"public"`

#### Scenario: Server error saat PUT

WHEN terjadi exception di handler PUT

THEN API mengembalikan `500 Internal Server Error` dengan body `{ error: "Internal server error" }`

---

### Requirement: Struktur Input (UserSettingsInput)

WHEN `PUT /api/settings` dipanggil

THEN body request dapat mengandung field opsional:
- `theme: "light" | "dark" | "auto"`
- `notifications_enabled: boolean`
- `email_notifications: boolean`
- `profile_visibility: "public" | "private" | "friends"`

AND semua field bersifat opsional (partial update)
