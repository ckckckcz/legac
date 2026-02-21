## Why

Proyek ini membutuhkan halaman landing yang menarik dan informatif sebagai wajah publik produk. Halaman ini akan memperkenalkan produk kepada calon pengguna melalui berbagai seksi konten terstruktur, dibangun dengan shadcn/ui untuk konsistensi visual dan kemudahan pengembangan.

## What Changes

- Tambah seksi **About** — deskripsi singkat tentang produk/perusahaan
- Tambah seksi **Teams** — profil anggota tim
- Tambah seksi **Why Us** — keunggulan/nilai yang ditawarkan
- Tambah seksi **Features** — daftar fitur utama produk
- Tambah seksi **Footer** — navigasi, link sosial, dan informasi legal
- Semua komponen menggunakan shadcn/ui

## Capabilities

### New Capabilities
- `landing-about`: Seksi About — narasi singkat tentang produk/perusahaan beserta tagline
- `landing-teams`: Seksi Teams — grid kartu profil anggota tim (nama, peran, foto, bio singkat)
- `landing-why-us`: Seksi Why Us — daftar keunggulan/nilai produk dalam format card atau list
- `landing-features`: Seksi Features — showcase fitur utama produk dengan ikon dan deskripsi
- `landing-footer`: Seksi Footer — link navigasi, sosial media, copyright, dan info legal

### Modified Capabilities

_(tidak ada capability existing yang berubah)_

## Impact

- Membuat halaman baru (misal: `app/page.tsx` atau `pages/index.tsx` tergantung struktur project)
- Menambah komponen baru di `components/landing/`
- Dependensi: `shadcn/ui` harus sudah terpasang (Card, Button, Badge, Avatar, Separator, dll)
- Tidak ada perubahan pada API atau sistem backend
