# Bug Fix Landing Page

## Root Cause: CSS Cascade Layer pada `<a>` Tag

**Temuan:** Aturan `a { color: var(--lagoon-deep); }` di `src/styles.css:226` tidak berada dalam `@layer` apapun. Karena CSS Cascade Layers, deklarasi tanpa layer menimpa Tailwind utility (`text-white`) meskipun spesifisitas class lebih tinggi. Akibatnya semua `<a>` dengan `text-white` tetap berwarna hijau gelap, bukan putih.

**Perbaikan:** Bungkus aturan `a` dan `a:hover` dalam `@layer base`.

---

## Perubahan yang Dilakukan

### 1. `src/styles.css`

| Perubahan | Detail |
|-----------|--------|
| Pindahkan `a { color }` ke `@layer base` | Mencegah override Tailwind utility `text-white` |
| `--bg-base: #F0E7D8` → `#FFFFFF` | Background putih |
| `--background: #F0E7D8` → `#FFFFFF` | Background putih (shadcn variable) |
| `--primary-foreground: #F0E7D8` → `#FFFFFF` | Konsistensi white mode |
| `--sidebar-primary-foreground: #F0E7D8` → `#FFFFFF` | Konsistensi white mode |
| `--sand: #F0E7D8` → `#FFFFFF` | White gradient base |
| `--foam: #f5ede0` → `#FAFAFA` | Light gray untuk depth |
| Body gradient disederhanakan | White background dengan subtle green radial gradients |

### 2. `src/components/navbar.tsx`

| Perubahan | Detail |
|-----------|--------|
| `px-4 pt-4` dihapus dari `<header>` | Navbar mentok ke atas |
| `page-wrap mx-auto max-w-6xl` → `w-full` | Navbar full width 100% |
| `rounded-3xl` → `rounded-none rounded-b-3xl` | Hanya rounded di bottom |

### 3. `src/components/hero-section.tsx`

| Perubahan | Detail |
|-----------|--------|
| `-mt-20` pada `<section>` | Hero ditarik ke atas, background mentok ke atas |
| `pt-24` pada content div | Konten tetap terbaca di bawah navbar |
| Hapus `pt-32` (diganti `pt-24`) | Optimalisasi padding |
| Kicker → `KAMPUNG WISATA PRENGGAN · KOTAGEDE, YOGYAKARTA` | Update teks |
| Title → `Rasakan Keindahan dan Keautentikan Yogyakarta di Jantung Kampung Prenggan` | Update teks |
| Description → paragraf budaya sesuai permintaan | Update teks |
| CTA Primary → `Pesan Paket Wisata` (href → `#paket-wisata`) | Update teks & link |
| CTA Secondary → `Jelajahi Destinasi` (href → `#destinasi`) | Update teks & link |

### 4. `src/components/profil-section.tsx`

| Perubahan | Detail |
|-----------|--------|
| Kicker → `TENTANG KAMPUNG WISATA PRENGGAN` | Uppercase |
| Title → `Warisan Lima Abad di Jantung Kotagede` | Update teks |
| Description → paragraf sejarah Prenggan | Update teks |
| Button: outline → solid `bg-amber-700 text-white hover:bg-amber-800` | Button coklat solid |

### 5. `src/components/paket-wisata-section.tsx`

| Perubahan | Detail |
|-----------|--------|
| Button "Pesan Sekarang": `bg-emerald-600` → `bg-amber-700 hover:bg-amber-800` | Warna coklat sesuai permintaan |

### 6. `src/locales/id.json`

Semua key baru untuk teks Bahasa Indonesia.

### 7. `src/locales/en.json`

Semua key baru untuk teks Bahasa Inggris.

---

## Verifikasi

- [x] Semua `<a>` dengan `text-white` benar-benar putih setelah `a` rule dipindah ke `@layer base`
- [x] Background putih `#FFFFFF` di root layout
- [x] Hero background mentok ke atas (via `-mt-20`)
- [x] Navbar full width, flush top, rounded bottom-only
- [x] Semua teks section sesuai permintaan
- [x] Button profil solid brown
- [x] Button paket wisata coklat
- [x] Button destinasi, homestay tetap putih
