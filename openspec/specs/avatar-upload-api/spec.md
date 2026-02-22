# Avatar Upload API

## Summary

API untuk mengunggah avatar kustom pengguna. Menerima file gambar melalui `multipart/form-data`, memvalidasi tipe dan ukuran file, lalu (nantinya) menyimpannya ke storage. Saat ini mengembalikan URL mock.

## Endpoint

- `POST /api/profile/avatar` — Upload avatar pengguna

## File

- `src/app/api/profile/avatar/route.ts`

## Batasan

- Ukuran file maksimal: **5 MB**
- Tipe file yang diizinkan: **JPEG, PNG, WebP** (`image/jpeg`, `image/png`, `image/webp`)

---

### Requirement: POST /api/profile/avatar - Upload Avatar

#### Scenario: Pengguna tidak terotentikasi

WHEN `POST /api/profile/avatar` dipanggil tanpa sesi valid (`session.user.id` tidak ada)

THEN API mengembalikan `401 Unauthorized` dengan body `{ error: "Unauthorized" }`

#### Scenario: Request tidak menyertakan file

WHEN `POST /api/profile/avatar` dipanggil dengan `multipart/form-data` tapi field `avatar` tidak ada

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "No file provided" }`

#### Scenario: Tipe file tidak diizinkan

WHEN file yang diunggah memiliki MIME type selain `image/jpeg`, `image/png`, atau `image/webp`

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "Invalid file type. Allowed: JPG, PNG, WebP" }`

#### Scenario: Ukuran file melebihi batas

WHEN file yang diunggah berukuran lebih dari 5 MB (5 × 1024 × 1024 bytes)

THEN API mengembalikan `400 Bad Request` dengan body `{ error: "File too large. Maximum 5MB allowed" }`

#### Scenario: Upload berhasil

WHEN file valid (tipe dan ukuran sesuai) diunggah dengan sesi yang terotentikasi

THEN API mengembalikan `200 OK` dengan body:
```
{
  url: string,       // URL avatar yang disimpan
  size: number,      // Ukuran file dalam bytes
  uploadedAt: Date   // Waktu upload
}
```

#### Scenario: Server error saat upload

WHEN terjadi exception yang tidak tertangani selama proses upload

THEN API mengembalikan `500 Internal Server Error` dengan body `{ error: "Internal server error" }`

---

### Requirement: Rencana Implementasi Storage (TODO)

WHEN implementasi storage nyata diterapkan

THEN sistem harus menyimpan file ke `public/avatars/` atau CDN

AND mengoptimasi gambar: resize ke 256×256, compress

AND memperbarui field `custom_avatar_url` di database untuk pengguna tersebut

AND menggunakan nama file format `{userId}-{timestamp}.{ext}`
