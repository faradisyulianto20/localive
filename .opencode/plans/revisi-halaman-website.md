# RENCANA REVISI HALAMAN WEBSITE LOCALIVE

> **Instruksi untuk Junior Programmer / AI Model**
> Dokumen ini berisi daftar revisi yang harus dikerjakan secara berurutan.
> Baca setiap section dengan teliti, jangan ada yang terlewat.
> Kerjakan urut dari atas ke bawah.

---

## PRASYARAT — BACA DULU

### Color Palette yang Wajib Dipakai (dari `src/styles.css`)

| Nama | CSS Variable | Tailwind Class | Hex |
|------|-------------|----------------|-----|
| Forest | `--forest` | `text-forest`, `bg-forest` | `#0B592F` |
| Olive | `--olive` | `text-olive`, `bg-olive` | `#8CA70A` |
| Brown / Palm | `--brown`, `--palm` | `text-brown`, `bg-brown` | `#774F2F` |
| Gold | `--gold` | `text-gold`, `bg-gold` | `#FFC639` |
| Terracotta | `--terracotta` | `text-terracotta`, `bg-terracotta` | `#DF703B` |
| Cream | `--cream` | `text-cream`, `bg-cream` | `#F0E7D8` |
| Sea-ink | `--sea-ink` | `text-sea-ink`, `bg-sea-ink` | `#0B592F` |
| Lagoon | `--lagoon` | `text-lagoon`, `bg-lagoon` | `#8CA70A` |

**GUNAKAN var(--xxx) ATAU kelas Tailwind di atas, JANGAN pakai warna hardcode** seperti `emerald-600`, `green-500`, `amber-700`, `neutral-900`, dll. Kecuali untuk gradient overlay yang memang butuh opacity khusus, gunakan `rgba()` dari warna-warna di atas.

### Animasi yang Tersedia

Gunakan class ini untuk animasi scroll:
- `rise-in` — opacity 0→1, translateY 12px→0, 700ms
- `animate-fade-in-up` — opacity 0→1, translateY 24px→0, 600ms
- `animate-fade-in` — opacity 0→1, 500ms

Cara pakai:
```tsx
<div className="rise-in">{/* konten */}</div>
<div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>{/* konten */}</div>
```

### Golden Ratio Card

Semua card harus proporsi yang konsisten:
- **Image aspect ratio**: `aspect-[4/3]` untuk card grid, `aspect-video` untuk hero/featured
- **Border radius**: `rounded-xl` (default card), `rounded-lg` (untuk image dalam card)
- **Padding dalam card**: `p-4` atau `p-5`
- **Gap antar card (grid)**: `gap-4 md:gap-6`

---

## ============================================
## TUGAS 1: SEMUA HALAMAN (GLOBAL CHANGES)
## ============================================

### 1.1 — Animasi pada Setiap Komponen

**File affected:** Semua route dan component files

Task:
- Setiap section/wrapper utama di setiap halaman harus punya animasi masuk (`rise-in` atau `animate-fade-in-up`)
- Animasi diterapkan ke parent wrapper section, bukan ke child elements
- Gunakan staggered delay (100ms, 200ms, 300ms) untuk komponen yang berurutan
- Contoh penerapan di section:
```tsx
<section className="rise-in">
  {/* konten section */}
</section>
```

**Yang harus dianimasi:**
1. `src/routes/profil.tsx` — hero, intro, potensi desa, mitra sections
2. `src/routes/wisata.tsx` — featured, filter, grid cards
3. `src/routes/umkm.tsx` — header, filter, grid cards
4. `src/routes/artikel.tsx` — header, grid cards
5. `src/routes/artikel/$id.tsx` — breadcrumb, article content, sidebar
6. `src/routes/lemah-asri.tsx` — hero, sejarah, visi-misi, struktur, track record
7. `src/routes/index.tsx` — sudah ada di hero, cek section lainnya belum
8. `src/components/hero-section.tsx` — sudah, pastikan konsisten
9. `src/components/artikel-section.tsx` — sudah pakai `useInView`
10. `src/components/lemah-asri-section.tsx` — sudah
11. `src/components/cta-section.tsx` — sudah

### 1.2 — Cursor Pointer

**File affected:** Semua component files

Task:
- Tambahkan `cursor-pointer` ke:
  - Semua `<Link>` dari TanStack Router (sudah default, tapi pastikan)
  - Semua `<button>` yang bisa diklik
  - Semua `<a>` tag
  - Semua komponen yang punya `onClick`
  - Card yang `group` dengan hover effect
- Cukup search `onClick`, `to=`, `href=`, `type="button"`, lalu pastikan ada `cursor-pointer`

### 1.3 — Konsistensi Warna (Hijau, Coklat, Gradient)

**File affected:** Semua files yang disebut di atas

Task:
- **GANTI** semua warna hardcode yang tidak ada di palette:
  - `bg-emerald-600` / `bg-emerald-700` → `bg-forest` (var(--forest))
  - `bg-emerald-50` / `bg-emerald-100` → `bg-cream` atau `bg-olive/10`
  - `text-emerald-700` / `text-emerald-600` → `text-forest`
  - `text-amber-700` → `text-brown`
  - `bg-amber-700` → `bg-brown`
  - `hover:bg-emerald-50` → `hover:bg-cream`
  - `border-emerald-700` → `border-forest`
  - `bg-green-500` / `bg-green-600` → `bg-forest`
  - `text-green-...` → `text-forest`
  - `text-neutral-500` / `text-neutral-600` → `text-sea-ink-soft`
  - `text-neutral-900` → `text-forest` atau `text-sea-ink`
  - `bg-neutral-100` / `bg-neutral-200` → `bg-cream`
  - `from-emerald-950` → `from-forest`
- Untuk gradient overlay (seperti di card wisata, hero), pertahankan tapi dengan warna dari palette:
  - `from-forest/90 via-forest/30 to-transparent`
  - `from-black/80 via-black/20 to-transparent` → `from-forest/90 via-forest/40 to-transparent`

### 1.4 — Transition Smooth pada Hover

**File affected:** Semua component files

Task:
- Setiap elemen yang berubah ukuran/posisi saat hover harus punya `transition-all duration-300` atau `transition-transform duration-300`
- Yang sudah benar: `.group-hover:scale-105` dengan `transition-transform duration-300`
- Cek yang belum: card yang naik (`-translate-y-1`), border yang berubah, shadow
- Pastikan parent card / link yang `group` punya `transition-all duration-300`

### 1.5 — Kata-kata Interaktif (Call-to-Action)

**File affected:** `src/locales/id.json`, `src/locales/en.json`

Task:
- Review dan ubah copy text menjadi lebih mengundang/action-oriented
- Contoh perubahan:
  - "Lihat Profil Lengkap" → "Jelajahi Profil Desa"
  - "Lihat Semua Wisata" → "Temukan Semua Wisata"
  - "Hubungi Kami" → "Ngobrol Langsung via WhatsApp"
  - "Baca Selengkapnya" → "Baca Artikel Selengkapnya"
- Cek semua key di `section.*.cta` dan `page.*.cta*` di kedua file
- Pastikan bahasa Indonesia dan Inggris konsisten semangatnya

### 1.6 — Golden Ratio Card

**File affected:**
- `src/components/artikel-card.tsx`
- `src/components/artikel-card-featured.tsx`
- `src/components/artikel-card-list.tsx`
- `src/components/wisata-card.tsx`
- `src/components/umkm-card.tsx`

Task:
- Semua card harus konsisten:
  - Image ratio: `aspect-[4/3]` (kecuali featured artikel: `aspect-video`)
  - Border radius card: `rounded-xl`
  - Border radius image dalam card: `rounded-lg`
  - Shadow: `shadow-sm` saat normal, `shadow-md` saat hover
  - Padding konten: `p-4`
  - Gap grid: `gap-4 md:gap-6`

### 1.7 — Padding/Margin Antar Komponen

**File affected:** `src/routes/lemah-asri.tsx`, dan halaman lainnya

Task:
- Pastikan setiap section punya jarak vertikal yang cukup
- Beri `py-12 md:py-16` atau `mt-12 md:mt-16` antar section
- Di `lemah-asri.tsx`, pastikan ada jarak antara hero dan section sejarah (`pt-12 md:pt-16` di section setelah hero)
- Cek semua halaman, tidak boleh ada konten yang menempel

### 1.8 — Ikon Toggle Bahasa (SVG)

**File affected:** `src/components/language-toggle.tsx`

Task:
- **HAPUS** emoji flags (`🇬🇧` / `🇮🇩`)
- **GANTI** dengan SVG icon:
  - Untuk EN: `<img src="/uk-logo.svg" alt="English" className="h-4 w-4" />`
  - Untuk ID: `<img src="/in-logo.svg" alt="Indonesia" className="h-4 w-4" />`
- Ikon SVG sudah tersedia di `public/uk-logo.svg` dan `public/in-logo.svg`

### 1.9 — Google Map di Footer

**File affected:** `src/components/footer.tsx`

Task:
- **HAPUS** `<img src="/map.png" .../>`
- **GANTI** dengan Google Maps iframe embed:
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.123456!2d110.456!3d-7.789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnMjAuNCJTIDExMMKwMjcnMjEuNiJF!5e0!3m2!1sen!2sid!4v1234567890"
  width="100%"
  height="160"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  title="Peta Lokasi Tamanan"
  className="rounded-xl"
/>
```
- Gunakan Google Maps embed untuk lokasi: "Tamanan, Tamanmartani, Kalasan, Sleman, DIY"
- Pastikan responsif (height: `h-40 md:h-48`)

### 1.10 — Footer Dinamis terhadap Bahasa

**File affected:** `src/components/footer.tsx`

Task:
- Pastikan semua teks statis di footer sudah menggunakan `t()` dari `useTranslation()`
- Yang perlu diterjemahkan:
  - "Quick Links." → `t('footer.quickLinks', 'Quick Links.')`
  - "Kontak." → `t('footer.kontak', 'Kontak.')`
  - "Alamat" → `t('footer.alamat', 'Alamat')`
  - "Email" → `t('footer.email', 'Email')`
  - "Telepon" → `t('footer.telepon', 'Telepon')`
  - "Lokasi." → `t('footer.lokasi', 'Lokasi.')`
  - "Kebijakan Privasi" → `t('footer.privacy', 'Kebijakan Privasi')`
  - "Syarat & Ketentuan" → `t('footer.terms', 'Syarat & Ketentuan')`
  - "All rights reserved." → ini sudah dinamis via `new Date().getFullYear()`
- Tambahkan key-key tersebut ke `src/locales/id.json` dan `src/locales/en.json`

### 1.11 — Pagination untuk List Panjang

**File affected:**
- `src/routes/wisata.tsx`
- `src/routes/umkm.tsx`
- `src/routes/artikel.tsx` (jika sudah banyak artikel nanti)

Task:
- Buat komponen `Pagination` di `src/components/pagination.tsx`:
```tsx
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
```
- Implementasi:
  - State `currentPage` di masing-masing halaman (default: 1)
  - `itemsPerPage` (contoh: 9 untuk wisata, 12 untuk umkm)
  - Filter data berdasarkan halaman: `data.slice((page-1)*itemsPerPage, page*itemsPerPage)`
  - Tampilkan tombol navigasi halaman
  - Style: `rounded-full`, `bg-forest` untuk active, `bg-cream` untuk inactive
- Untuk saat ini, data masih sedikit (3-23 items). Tapi struktur pagination harus sudah siap agar ketika BE sudah ada pagination, frontend tinggal pakai.

---

## ============================================
## TUGAS 2: HALAMAN BERANDA (index.tsx)
## ============================================

### 2.1 — Terjemahan Card Destinasi, Atraksi, Aktivitas

**File affected:** `src/routes/index.tsx`, bagian `<WisataSection>`

Task:
- Baca data wisata dari `#/lib/wisata.json` (yang bilingual, dengan `{id, en}`)
- Tampilkan semua card dengan `tval()` function untuk title dan description
- Pastikan ada button "Lihat Selengkapnya" / "See All" yang juga bilingual melalui `t('section.wisata.cta', 'Lihat Semua Wisata')`

### 2.2 — Ketersediaan Paket

Task:
- Tambahkan label "Tersedia" / "Available" pada card wisata yang ada paketnya
- Bisa badge kecil di pojok card: `bg-olive text-white text-[10px] px-2 py-0.5 rounded-full`
- Label ini juga harus bilingual melalui i18n: `t('wisata.tersedia', 'Tersedia')` / `t('wisata.tersedia', 'Available')`

---

## ============================================
## TUGAS 3: HALAMAN PROFIL (profil.tsx)
## ============================================

### 3.1 — Background Hijau Gradasi pada Potensi Desa

**File affected:** `src/routes/profil.tsx`

Task:
- Pada section Potensi Desa, tambahkan gradient background:
```tsx
<section className="relative overflow-hidden py-16">
  {/* Background gradient di atas dan bawah */}
  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-olive/10 to-transparent" />
  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-olive/10 to-transparent" />
  
  {/* Konten */}
  <div className="page-wrap relative z-10">
    {/* ... */}
  </div>
</section>
```
- Ini membuat tidak monoton, ada gradasi hijau di atas dan bawah section
- Pastikan z-index konten di atas gradient

---

## ============================================
## TUGAS 4: HALAMAN WISATA (wisata.tsx)
## ============================================

### 4.1 — Button Filter Dinamis Bahasa

**File affected:** `src/routes/wisata.tsx`

Task:
- Ganti teks filter yang hardcode dengan data bilingual dari data JSON
- Filter tabs: "Semua" / "All", "Destinasi" / "Destination", "Atraksi" / "Attraction", "Aktivitas" / "Activity"
- Gunakan label bilingual dari file wisata.json, atau dari i18n:
  - `t('wisata.filter.all', 'Semua')`
  - `t('wisata.filter.destinasi', 'Destinasi')`
  - `t('wisata.filter.atraksi', 'Atraksi')`
  - `t('wisata.filter.aktivitas', 'Aktivitas')`
- Tambahkan key-key ini ke file i18n

### 4.2 — Cursor Pointer pada Filter

Task:
- Pastikan setiap button filter punya `cursor-pointer`
- Tambahkan `cursor-pointer` jika belum ada

---

## ============================================
## TUGAS 5: HALAMAN ARTIKEL
## ============================================

### 5.1 — Artikel Lainnya di Detail Artikel

**File affected:** `src/routes/artikel/$id.tsx`

Task:
- Pada sidebar "Artikel Lainnya" (related articles):
  - **Kurangi** ukuran `rounded` image: dari `rounded-xl` → `rounded-lg`
  - **Tambahkan** brief title (max 2 baris) dengan `line-clamp-2` di bawah title
  - **Letakkan** brief title di bawah title, di atas tanggal
  - Title di-"truncate" / diringkas dengan `line-clamp-2` dan `text-ellipsis`
  - Struktur yang benar:
```
[Image]
[Category Badge]
[Title]           ← line-clamp-2, text-ellipsis
[Brief excerpt]   ← line-clamp-2, text-xs, text-neutral-500 (BARU)
[Date]            ← seperti biasa
```

### 5.2 — Navbar Aktif saat Detail Artikel

**File affected:** `src/components/navbar.tsx`

Task:
- Saat pengguna di route `/artikel/$id`, navbar item "Artikel" harus tetap aktif (warna brown/aktif)
- Saat ini `matchRoute` hanya cocok untuk route exact `/artikel`
- Perbaiki: untuk link Artikel, cocokkan apakah route saat ini adalah `/artikel` ATAU `/artikel/$id`
```tsx
const isArtikelActive = matchRoute({ to: '/artikel' }) || matchRoute({ to: '/artikel/$id' })
// lalu di link Artikel, gunakan isArtikelActive
```
- Alternatif: gunakan `useLocation()` dan cek `pathname.startsWith('/artikel')`

---

## ============================================
## TUGAS 6: HALAMAN LEMAH ASRI (lemah-asri.tsx)
## ============================================

### 6.1 — Hero Lebih Tinggi

**File affected:** `src/routes/lemah-asri.tsx`, bagian hero

Task:
- Ubah tinggi hero dari `min-h-[60vh]` menjadi `min-h-[80vh]` atau `min-h-screen`
- Sesuaikan padding dan margin agar konten hero tetap proporsional

### 6.2 — Margin Sebelum Section Sejarah

Task:
- Tambahkan `pt-16 md:pt-20` pada section Sejarah (yang langsung di bawah hero)
- Di hero, pastikan ada jarak dengan konten berikutnya

### 6.3 — Konten Dinamis Bahasa

**File affected:** `src/routes/lemah-asri.tsx`

Task:
- Gunakan data dari `#/data/lemah-asri.json` yang memiliki field bilingual
- Untuk field yang belum bilingual (seperti `visi`, `misi`), tambahkan dulu ke JSON dengan format `{ id: "...", en: "..." }` atau gunakan `t()` dari i18n
- Pastikan semua konten di halaman ini berubah saat user ganti bahasa:
  - Nama usaha
  - Visi
  - Misi (list items)
  - Track record items
  - Label-label heading

### 6.4 — Image Struktur Organisasi

**File affected:** `src/routes/lemah-asri.tsx`

Task:
- Saat ini struktur organisasi digambar manual dengan CSS tree
- **GANTI** dengan image yang menggunakan placeholder:
```tsx
<div className="flex justify-center">
  <img
    src="/placeholder-bagan.jpeg"
    alt="Struktur Organisasi Lemah Asri"
    className="w-full max-w-2xl rounded-xl shadow-md"
  />
</div>
```
- File `public/placeholder-bagan.jpeg` sudah tersedia (cek dulu, jika belum ada beri tahu)
- Beri space/padding yang cukup: `py-12`
- Tambahkan caption: "Struktur Organisasi Lemah Asri" yang bilingual

### 6.5 — Badge Track Record

**File affected:** `src/routes/lemah-asri.tsx`

Task:
- Track record saat ini berupa list dengan titik bullet (`•`)
- **HAPUS** titik-titik tersebut
- **BUAT** badge yang lebih menarik:
```tsx
<span className="inline-block rounded-full bg-gradient-to-r from-olive to-forest px-4 py-1.5 text-sm font-medium text-white shadow-sm">
  {item}
</span>
```
- Susun badge dalam flex-wrap grid dengan gap `gap-2`
- Background: gradient dari olive ke forest
- Teks: putih (`text-white`)

---

## ============================================
## PRIORITAS PENGERJAAN
## ============================================

Kerjakan dalam urutan ini:

1. **Tugas 6.5** — Badge Track Record (Lemah Asri) — paling mudah, efek visual besar
2. **Tugas 6.4** — Image Struktur Organisasi
3. **Tugas 6.1 & 6.2** — Hero dan spacing Lemah Asri
4. **Tugas 6.3** — Konten bilingual Lemah Asri
5. **Tugas 1.8** — Ikon SVG Toggle Bahasa
6. **Tugas 1.9 & 1.10** — Google Map Footer + Dinamis
7. **Tugas 1.3** — Konsistensi warna di semua halaman
8. **Tugas 1.2** — Cursor pointer
9. **Tugas 1.4** — Transition smooth
10. **Tugas 1.6** — Golden ratio card
11. **Tugas 1.7** — Padding/margin
12. **Tugas 1.1** — Animasi
13. **Tugas 5.1** — Artikel lainnya di detail
14. **Tugas 5.2** — Navbar aktif
15. **Tugas 4** — Filter wisata bilingual
16. **Tugas 3** — Background gradasi profil
17. **Tugas 2** — Beranda card terjemahan
18. **Tugas 1.5** — Kata-kata interaktif
19. **Tugas 1.11** — Pagination (terakhir karena data masih sedikit)

---

## ============================================
## FILE YANG AKAN DIUBAH
## ============================================

### Route Files
- `src/routes/index.tsx` ✓
- `src/routes/profil.tsx` ✓
- `src/routes/wisata.tsx` ✓
- `src/routes/umkm.tsx` ✓
- `src/routes/artikel.tsx` ✓
- `src/routes/artikel/$id.tsx` ✓
- `src/routes/lemah-asri.tsx` ✓

### Component Files
- `src/components/hero-section.tsx` ✓
- `src/components/navbar.tsx` ✓
- `src/components/footer.tsx` ✓
- `src/components/language-toggle.tsx` ✓
- `src/components/wisata-card.tsx` ✓
- `src/components/umkm-card.tsx` ✓
- `src/components/artikel-card.tsx` ✓
- `src/components/artikel-card-featured.tsx` ✓
- `src/components/artikel-card-list.tsx` ✓
- `src/components/artikel-section.tsx` ✓
- `src/components/lemah-asri-section.tsx` ✓
- `src/components/cta-section.tsx` ✓
- `src/components/pagination.tsx` (BARU) ✓

### Data Files
- `src/data/lemah-asri.json` (tambah bilingual fields) ✓

### i18n Files
- `src/locales/id.json` ✓
- `src/locales/en.json` ✓

---

## ============================================
## VERIFIKASI
## ============================================

Setelah selesai, jalankan:
```bash
npx biome check src/
npx tsr generate
npm run build
```

Cek di browser:
1. Buka semua halaman, pastikan tidak error
2. Ganti bahasa EN/ID, pastikan semua konten berubah
3. Hover setiap card, pastikan animasi smooth
4. Cek navbar aktif saat di `/artikel/selamat-datang-di-tamanan`
5. Cek footer Google Maps muncul
6. Cek toggle bahasa pakai SVG bukan emoji
7. Cek badge track record di Lemah Asri
8. Cek warna konsisten (tidak ada emerald / amber / neutral yang hardcoded)
