## Context

Legac adalah tools berbasis AI untuk merevitalisasi legacy code. Halaman `src/app/page.tsx` saat ini sudah ada namun hanya berisi seksi hero sederhana. Perlu diperluas dengan seksi-seksi landing page yang lebih lengkap: About, Teams, Why Us, Features, dan Footer.

Stack yang sudah ada:
- **Next.js 16 App Router**, React 19, TypeScript strict
- **shadcn/ui** (style: `new-york`, sudah terpasang: Card, Button, Badge, Avatar, dll)
- **Tailwind CSS v4** (konfigurasi via CSS, bukan `tailwind.config.ts`)
- **Lucide React** sebagai ikon
- Path alias `@/*` → `./src/*`

## Goals / Non-Goals

**Goals:**
- Tambah 5 seksi baru ke landing page: About, Teams, Why Us, Features, Footer
- Setiap seksi adalah komponen terpisah di `src/components/landing/`
- Semua komponen menggunakan shadcn/ui primitives (Card, Badge, Avatar, Button, Separator)
- Kompatibel dengan App Router (Server Components by default, `"use client"` hanya jika perlu)
- Responsive mobile-first

**Non-Goals:**
- Tidak mengubah seksi hero yang sudah ada
- Tidak membuat backend/API baru
- Tidak mengintegrasikan CMS atau data dinamis — semua konten hardcoded dulu
- Tidak mengubah Navbar yang sudah ada

## Decisions

### 1. Struktur folder: `src/components/landing/`
Buat folder baru `src/components/landing/` untuk menampung semua komponen seksi landing page. Konsisten dengan pola yang sudah ada (`profile/`, `docs/`).

Alternatif yang dipertimbangkan: taruh semua di `src/app/page.tsx` langsung — ditolak karena file akan terlalu besar dan susah di-maintain.

### 2. Komponen sebagai Server Components
Semua komponen landing bersifat presentasional (tidak ada state/interactivity), sehingga default sebagai Server Components. Tidak perlu `"use client"` kecuali ada animasi/interaksi.

### 3. Footer: Ganti komponen existing atau buat yang baru?
`src/components/Footer.tsx` sudah ada tapi kemungkinan dipakai untuk layout internal. Buat komponen `LandingFooter.tsx` terpisah khusus untuk landing page agar tidak mengganggu komponen Footer yang sudah ada.

### 4. shadcn/ui components yang dipakai per seksi

| Seksi | shadcn/ui Components |
|---|---|
| About | `Badge`, `Button` |
| Teams | `Card`, `CardContent`, `Avatar`, `AvatarImage`, `AvatarFallback`, `Badge` |
| Why Us | `Card`, `CardHeader`, `CardTitle`, `CardDescription` |
| Features | `Card`, `CardContent`, `Badge` |
| Footer | `Separator`, `Button` |

Ikon dari `lucide-react` (sudah terpasang sebagai dependency shadcn/ui).

### 5. Assembly di `page.tsx`
Import dan susun semua seksi di `src/app/page.tsx` secara berurutan. Seksi hero yang sudah ada dipertahankan di atas.

## Risks / Trade-offs

- **Konten hardcoded** → Mudah diimplementasi sekarang, tapi harus di-refactor jika nanti perlu CMS. Mitigasi: susun data sebagai array/object konstanta di dalam file komponen agar mudah dipindah ke sumber data eksternal.
- **Avatar Teams menggunakan placeholder** → Jika foto tim belum tersedia, gunakan `AvatarFallback` dengan inisial. Tidak ada risiko broken image.
- **Footer duplikasi** → Ada dua Footer (existing + LandingFooter). Mitigasi: dokumentasikan di komentar bahwa `LandingFooter` khusus untuk `app/page.tsx`.
