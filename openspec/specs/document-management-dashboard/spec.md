# Document Management Dashboard

## Summary

Halaman dashboard utama untuk pengelolaan dokumen pengguna yang telah terotentikasi. Tersedia di rute `/user/[id]`. Menampilkan daftar dokumen yang dapat difilter berdasarkan nama, kategori, dan tipe file. Mendukung upload dokumen melalui modal.

## Komponen

- **Halaman**: `src/app/user/[id]/page.tsx`
- **Sidebar**: `src/components/sidebar.tsx`
- **Card Dokumen**: `src/components/document-card.tsx`
- **API yang dikonsumsi**: `GET /api/docs`

---

### Requirement: Proteksi Rute - Hanya Pengguna Terotentikasi

#### Scenario: Pengguna belum login mengakses dashboard

WHEN pengguna dengan status session `unauthenticated` mengakses `/user/[id]`

THEN sistem melakukan redirect ke `/login?callbackUrl=/user/dashboard`

#### Scenario: Status session sedang dimuat

WHEN halaman dimuat dan status session adalah `loading`

THEN halaman menampilkan spinner loading fullscreen dengan teks "Loading..."

AND konten utama dashboard tidak dirender

#### Scenario: Pengguna sudah login

WHEN status session adalah `authenticated` dan `session.user` ada

THEN halaman merender konten dashboard lengkap termasuk Sidebar dan area dokumen

---

### Requirement: Memuat Dokumen dari API

#### Scenario: Memuat dokumen saat pertama kali halaman dibuka

WHEN pengguna terotentikasi dan halaman selesai mount

THEN sistem memanggil `GET /api/docs`

AND menampilkan spinner loading "Loading documents..." selama proses fetch

AND setelah selesai, menampilkan daftar dokumen yang dikembalikan `data.docs`

#### Scenario: API gagal atau mengembalikan error

WHEN `GET /api/docs` gagal (network error atau response error)

THEN `documents` di-set ke array kosong `[]`

AND error dicatat ke console

AND halaman menampilkan tampilan "No documents found"

---

### Requirement: Filter dan Pencarian Dokumen

#### Scenario: Pencarian berdasarkan nama dokumen

WHEN pengguna mengetik teks di kolom pencarian

THEN daftar dokumen yang ditampilkan difilter secara real-time

AND hanya dokumen yang namanya mengandung teks pencarian (case-insensitive) yang ditampilkan

#### Scenario: Filter berdasarkan kategori

WHEN pengguna memilih kategori dari dropdown (selain "All")

THEN hanya dokumen dengan `doc.category` yang cocok yang ditampilkan

Kategori yang tersedia: All, Finance, Projects, Marketing, HR, Design, Analytics, Engineering, Strategy, Management, Generated AI

#### Scenario: Filter berdasarkan tipe file

WHEN pengguna memilih tipe file dari dropdown (selain "All")

THEN hanya dokumen dengan `doc.type` yang cocok yang ditampilkan

Tipe file yang tersedia: All, PDF, Word, Image, Spreadsheet, Presentation, Markdown, Design, Documentation

#### Scenario: Kombinasi filter

WHEN pengguna menggunakan lebih dari satu filter sekaligus (search + category + type)

THEN dokumen yang ditampilkan harus memenuhi semua kriteria filter secara bersamaan

#### Scenario: Tidak ada dokumen yang sesuai filter

WHEN tidak ada dokumen yang cocok dengan filter yang diterapkan

THEN tampilan menampilkan ikon dokumen, judul "No documents found", deskripsi, dan tombol "Upload Your First Document"

---

### Requirement: Upload Dokumen Modal

#### Scenario: Membuka modal upload

WHEN pengguna mengklik tombol "Upload" di header (desktop) ATAU tombol upload di sidebar ATAU tombol "Upload Your First Document" di empty state

THEN modal upload ditampilkan dengan overlay gelap

AND modal berisi area drag-and-drop, tombol "Cancel", dan tombol "Upload"

#### Scenario: Menutup modal upload

WHEN pengguna mengklik tombol "Cancel" ATAU tombol X di sudut modal

THEN modal upload ditutup

---

### Requirement: Tampilan Jumlah Dokumen

#### Scenario: Menampilkan hasil filter

WHEN halaman menampilkan daftar dokumen (dengan atau tanpa filter)

THEN di bagian bawah daftar ditampilkan teks "Showing {filteredCount} of {totalCount} documents"

---

### Requirement: Layout Responsif

#### Scenario: Tampilan desktop

WHEN layar berukuran `md` ke atas

THEN tombol "Upload" ditampilkan di header (di samping search bar)

AND grid dokumen menampilkan 2-4 kolom sesuai lebar layar

#### Scenario: Tampilan mobile

WHEN layar berukuran di bawah `md`

THEN tombol "Upload" di header disembunyikan

AND grid dokumen menampilkan 1 kolom
