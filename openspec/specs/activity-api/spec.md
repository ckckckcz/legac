# Activity API

## Summary

API untuk mengambil riwayat aktivitas pengguna yang terotentikasi dengan dukungan pagination dan filter. Saat ini mengembalikan data mock; akan mengambil dari tabel `app.activity_logs` di PostgreSQL.

## Endpoint

- `GET /api/profile/activity` — Mengambil daftar log aktivitas pengguna

## File

- `src/app/api/profile/activity/route.ts`
- `src/lib/types/profile.ts` — Tipe `ActivityLog`, `ActivityFilterOptions`, `PaginatedResponse`

---

### Requirement: GET /api/profile/activity - Membaca Log Aktivitas

#### Scenario: Pengguna tidak terotentikasi

WHEN `GET /api/profile/activity` dipanggil tanpa sesi valid

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Unauthorized" }`

#### Scenario: Pengguna terotentikasi - request tanpa parameter

WHEN `GET /api/profile/activity` dipanggil tanpa query parameter

THEN API menggunakan nilai default: `limit = 20`, `offset = 0`

AND mengembalikan `200 OK` dengan struktur `PaginatedResponse<ActivityLog>`:
```
{
  data: ActivityLog[],
  total: number,
  limit: number,
  offset: number
}
```

#### Scenario: Pagination dengan parameter limit dan offset

WHEN `GET /api/profile/activity?limit=10&offset=20` dipanggil

THEN API menggunakan `limit = 10` dan `offset = 20`

AND mengembalikan slice data yang sesuai

#### Scenario: Nilai limit melebihi batas maksimal

WHEN parameter `limit` diberikan dengan nilai lebih dari `100`

THEN API membatasi nilai limit ke maksimum `100` (cap at 100)

#### Scenario: Filter berdasarkan eventType

WHEN `GET /api/profile/activity?eventType=login` dipanggil

THEN API memfilter log aktivitas hanya yang memiliki `event_type = "login"`

#### Scenario: Filter berdasarkan rentang tanggal

WHEN `GET /api/profile/activity?startDate=2024-01-01&endDate=2024-12-31` dipanggil

THEN API memfilter log aktivitas yang `created_at` berada dalam rentang tanggal tersebut

#### Scenario: Server error saat GET

WHEN terjadi exception di handler

THEN API mengembalikan `500 Internal Server Error` dengan body `{ error: "Internal server error" }`

---

### Requirement: Struktur ActivityLog

WHEN API mengembalikan data aktivitas

THEN setiap item aktivitas memiliki struktur:
```
{
  id: number,
  user_id: number,
  event_type: string,    // contoh: "login", "profile_update", "cli_login"
  event_data: object,    // metadata tambahan spesifik per event
  created_at: Date
}
```

---

### Requirement: Opsi Filter (ActivityFilterOptions)

WHEN query parameter disertakan

THEN filter yang didukung adalah:
- `limit: number` — jumlah item per halaman (default: 20, max: 100)
- `offset: number` — jumlah item yang dilewati (default: 0)
- `eventType: string` — filter berdasarkan tipe event
- `startDate: Date` — filter mulai dari tanggal ini
- `endDate: Date` — filter hingga tanggal ini
