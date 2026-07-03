# Profil (`/profil`)

**Route**: `/profil`  
**File**: `src/routes/profil.tsx`  
**Layout**: Public (Navbar + Footer)  
**Auth**: No  
**Bahasa**: ID + EN (i18n)

---

## Layout Halaman

Halaman profil terdiri dari 4 section vertikal:

```
┌─────────────────────────────────┐
│          HERO BANNER            │
│   (gambar penuh + overlay teks) │
├─────────────────────────────────┤
│       DEFINISI DESA             │
│   (teks + gambar)               │
├─────────────────────────────────┤
│      POTENSI DESA               │
│   (grid 4 card: Budaya, Wisata, │
│    UMKM, SDM)                   │
├─────────────────────────────────┤
│         MITRA                   │
│   (logo grid)                   │
└─────────────────────────────────┘
```

---

## Komponen Penyusun

Halaman ini tidak menggunakan komponen terpisah — semua konten di-render langsung di `profil.tsx` menggunakan 4 sub-section.

Namun, bisa dipisah ke komponen jika diperlukan:
- `ProfilHero`
- `ProfilDefinisi`
- `ProfilPotensi`
- `ProfilMitra`

---

## Data Requirements

### Type
```ts
interface ProfilDesa {
  heroImage: string
  definisi: {
    title: { id: string; en: string }
    description: { id: string; en: string }
    image: string
  }
  potensi: PotensiItem[]
  mitra: MitraItem[]
}

interface PotensiItem {
  icon: string  // nama ikon Lucide
  title: { id: string; en: string }
  description: { id: string; en: string }
}

interface MitraItem {
  name: string
  logo?: string
  url?: string
}
```

### Sumber Data
- Data statis dari server function `getProfilDesa()`
- Atau langsung hardcoded di route file untuk MVP

---

## States & Handling

| State | UI |
|---|---|
| Loading | Skeleton banner + 4 card skeleton |
| Error | Alert "Gagal memuat data profil" |
| Success | Render semua section |

---

## i18n Keys

```json
{
  "page.profil.title": "Profil Desa Tamanan",
  "profil.hero.title": "Desa Tamanan",
  "profil.hero.tagline": "Pedukuhan dengan segudang potensi",
  "profil.definisi.title": "Definisi Desa",
  "profil.definisi.description": "...",
  "profil.potensi.title": "Potensi Desa",
  "profil.potensi.budaya": "Budaya",
  "profil.potensi.budaya.desc": "Kesenian tradisional yang lestari",
  "profil.potensi.wisata": "Wisata",
  "profil.potensi.wisata.desc": "Destinasi dan atraksi menarik",
  "profil.potensi.umkm": "UMKM",
  "profil.potensi.umkm.desc": "Produk unggulan warga",
  "profil.potensi.sdm": "SDM",
  "profil.potensi.sdm.desc": "Sumber daya manusia berkualitas",
  "profil.mitra.title": "Mitra Kami"
}
```

---

## User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| Potensi card | Hover | Scale up shadow |
| Mitra logo | Klik | Buka URL mitra (jika ada) |
