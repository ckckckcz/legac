# Landing Page

## Summary

Halaman utama publik aplikasi Legac (`/`). Terdiri dari lima section: Hero, About, WhyUs, Banner, dan Footer. Halaman ini tidak memerlukan autentikasi dan bersifat publik.

## Komponen

- **Halaman**: `src/app/page.tsx`
- **Hero**: inline di `page.tsx` dengan `InstallCommand` dan `SplitText`
- **About**: `src/components/landing/LandingAbout.tsx`
- **WhyUs**: `src/components/landing/LandingWhyUs.tsx`
- **Banner**: `src/components/landing/LandingBanner.tsx`
- **Footer**: `src/components/landing/LandingFooter.tsx`
- **UI**: `src/components/ui/install-command.tsx`, `src/components/ui/split-text.tsx`

---

### Requirement: Hero Section

#### Scenario: Pengguna mengunjungi halaman utama

WHEN pengguna membuka `/`

THEN Hero section ditampilkan fullscreen (`min-h-screen`) dengan background putih

AND menampilkan badge "Codebase Legacy" di bagian atas

AND heading utama "AI-Powered Code Revitalization" dengan animasi karakter per-karakter menggunakan `SplitText`

AND "AI-Powered" ditampilkan dengan gradient warna brand-blue ke brand-green

AND teks deskripsi singkat tentang Legac ditampilkan dengan animasi kata per-kata

AND komponen `InstallCommand` ditampilkan di bawah teks deskripsi

#### Scenario: Tampilan desktop - floating illustration cards

WHEN lebar layar adalah `xl` ke atas

THEN ilustrasi "Codebase Map" ditampilkan di kiri tengah dengan rotasi -10 derajat dan animasi fade-in-left

AND ilustrasi "Legacy Code" ditampilkan di kanan atas dengan rotasi +11 derajat dan animasi fade-in-right

#### Scenario: Tampilan mobile/tablet - tidak ada floating cards

WHEN lebar layar di bawah `xl`

THEN ilustrasi floating tidak ditampilkan (hidden)

#### Scenario: Salin perintah install

WHEN pengguna mengklik tombol salin di `InstallCommand`

THEN teks `"npm i legac"` disalin ke clipboard

AND ikon berubah dari Copy menjadi Check selama 2 detik

---

### Requirement: About Section (LandingAbout)

#### Scenario: Pengguna scroll ke section About

WHEN pengguna menggulir ke bawah dari Hero section

THEN section About ditampilkan dengan konten tentang apa itu Legac

AND section dapat diakses di semua ukuran layar

---

### Requirement: WhyUs Section (LandingWhyUs)

#### Scenario: Pengguna scroll ke section WhyUs

WHEN pengguna menggulir ke section WhyUs

THEN section menampilkan alasan menggunakan Legac dibandingkan solusi lain

---

### Requirement: Banner Section (LandingBanner)

#### Scenario: Pengguna scroll ke section Banner

WHEN pengguna menggulir ke Banner section

THEN banner CTA (call-to-action) ditampilkan untuk mendorong pengguna mencoba Legac

---

### Requirement: Urutan Rendering Halaman

WHEN halaman `/` di-render

THEN section ditampilkan dalam urutan:
1. Hero (fullscreen pertama)
2. LandingAbout
3. LandingWhyUs
4. LandingBanner
5. LandingFooter

---

### Requirement: Dekoratif Background

WHEN Hero section dirender

THEN elemen dekoratif gradient blur ditampilkan di latar belakang (top-left dan bottom-right)

AND overlay dot-pattern dengan `radial-gradient` ditampilkan sebagai tekstur latar

AND semua elemen dekoratif bersifat non-interaktif (`pointer-events-none`)
