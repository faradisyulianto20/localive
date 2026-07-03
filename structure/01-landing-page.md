# Landing Page (`/`)

**Route**: `/`  
**File**: `src/routes/index.tsx`  
**Layout**: Public (Navbar + Footer)  
**Auth**: No  
**Bahasa**: ID + EN (i18n)

---

## Komponen Penyusun (urutan render)

| No | Komponen | File |
|---|---|---|
| 1 | `<Navbar />` | `src/components/navbar.tsx` (dari `__root.tsx`) |
| 2 | `<HeroSection />` | `src/components/hero-section.tsx` |
| 3 | `<ProfilSection />` | `src/components/profil-section.tsx` |
| 4 | `<WisataSection />` | `src/components/wisata-section.tsx` |
| 5 | `<ProdukUMKMSection />` | `src/components/produk-umkm-section.tsx` |
| 6 | `<LemahAsriSection />` | `src/components/lemah-asri-section.tsx` |
| 7 | `<ArtikelSection />` | `src/components/artikel-section.tsx` |
| 8 | `<CTASection />` | `src/components/cta-section.tsx` |
| 9 | `<Footer />` | `src/components/footer.tsx` |

---

## Data Requirements

| Komponen | Sumber Data | Fetch Method |
|---|---|---|
| HeroSection | Static | i18n translation keys |
| ProfilSection | Static | i18n translation keys |
| WisataSection | `src/data/wisata.json` | `getWisataList({ limit: 6 })` |
| ProdukUMKMSection | `src/data/umkm.json` | `getUMKMList({ limit: 6 })` |
| LemahAsriSection | `src/data/lemah-asri.json` | `getLemahAsri()` |
| ArtikelSection | `src/data/artikel.json` | `getArtikelList({ limit: 3 })` |
| CTASection | Static | WA number: 085876270545 |
| Footer | Static | i18n + config |

### Types

```ts
interface WisataItem {
  id: string
  category: 'destinasi' | 'atraksi' | 'aktivitas'
  title: { id: string; en: string }
  description: { id: string; en: string }
  image: string
  createdAt: string
  updatedAt: string
}

interface UMKMItem {
  id: string
  title: { id: string; en: string }
  category: 'makanan' | 'produk' | 'jasa'
  description: { id: string; en: string }
  image: string
  mapsUrl?: string
  waUrl?: string
  noTelp: string
  createdAt: string
  updatedAt: string
}

interface ArtikelItem {
  id: string
  title: { id: string; en: string }
  content: { id: string; en: string }
  image: string
  category: string
  penulis: string
  tanggal: string
  createdAt: string
  updatedAt: string
}
```

---

## States & Handling

| State | Kondisi | UI |
|---|---|---|
| Loading | Data belum selesai di-fetch | Skeleton card (6 grid) |
| Error | Fetch gagal | Toast error + retry button |
| Empty | Data kosong | Ilustrasi + "Belum ada data" |
| Success | Data tersedia | Card grid normal |

---

## i18n Keys

```json
{
  "page.beranda.kicker": "LEMAH ASRI · TAMANAN, KALASAN, SLEMAN",
  "page.beranda.title": "Rasakan Keindahan...",
  "page.beranda.description": "...",
  "page.beranda.ctaPrimary": "Pesan Paket Wisata",
  "page.beranda.ctaSecondary": "Hubungi Kami",
  "section.profil.kicker": "TENTANG KAMI",
  "section.profil.title": "Profil Desa Tamanan",
  "section.profil.description": "...",
  "section.profil.cta": "Lihat Profil",
  "section.wisata.kicker": "Destinasi & Atraksi",
  "section.wisata.title": "Jelajahi Wisata Tamanan",
  "section.wisata.cta": "Lihat Semua Wisata",
  "section.umkm.kicker": "Produk UMKM",
  "section.umkm.title": "Produk Unggulan UMKM Tamanan",
  "section.umkm.cta": "Lihat Semua UMKM",
  "section.lemahAsri.title": "Mengenal Lemah Asri",
  "section.artikel.title": "Artikel & Berita",
  "section.cta.title": "Hubungi Kami",
  "section.cta.description": "Hubungi kami via WhatsApp",
  "footer.description": "..."
}
```

---

## User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| Navbar link | Klik | Navigasi ke halaman tujuan |
| Hero CTA "Pesan Paket Wisata" | Klik | Scroll ke section `/wisata` |
| Hero CTA "Hubungi Kami" | Klik | Scroll ke CTA section |
| Wisata card | Klik | Navigasi ke `/wisata` |
| UMKM card | Klik "Hubungi" | Buka `wa.me/6285876270545` |
| Artikel card | Klik | Navigasi ke `/artikel/$id` |
| CTA WhatsApp | Klik | Buka `wa.me/6285876270545` |
| Floating WA button | Klik | Buka `wa.me/6285876270545` |

---

## Scroll Behavior

- Hero CTA scroll ke section wisata menggunakan anchor `#wisata`
- Setiap section memiliki `id` untuk anchor navigation
- Smooth scroll: `scroll-behavior: smooth` di CSS global
