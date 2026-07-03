# UMKM (`/umkm`)

**Route**: `/umkm`  
**File**: `src/routes/umkm.tsx`  
**Layout**: Public (Navbar + Footer)  
**Auth**: No  
**Bahasa**: ID + EN (i18n + data bilingual)

---

## Layout Halaman

```
┌────────────────────────────────────┐
│  Kicker: "UMKM"                    │
│  Title: "UMKM Tamanan"             │
├────────────────────────────────────┤
│  [Semua] [Makanan] [Produk] [Jasa]  ← Filter Tabs
├────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ Card │ │ Card │ │ Card │       │  ← Grid UMKMCard
│  └──────┘ └──────┘ └──────┘       │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ Card │ │ Card │ │ Card │       │
│  └──────┘ └──────┘ └──────┘       │
└────────────────────────────────────┘
```

---

## Komponen Penyusun

| Komponen | File | Keterangan |
|---|---|---|
| `PageHeader` | `src/components/page-header.tsx` | Kicker + title |
| `FilterTabs` | Inline di halaman | Tabs filter kategori |
| `UMKMCard` | `src/components/umkm-card.tsx` | Card UMKM |

---

## Data Requirements

### Type
```ts
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
```

### Sumber Data
- `getUMKMList()` — return semua item dari `src/data/umkm.json`

### UMKMCard
Setiap card menampilkan:
- Gambar (aspect ratio 4:3)
- Nama UMKM (bilingual sesuai bahasa aktif)
- Badge kategori (warna berbeda per kategori)
- Deskripsi singkat (2 baris, text clamping)
- Tombol "Hubungi WA" → `wa.me/` + `noTelp`

---

## Filter Logic

Sama dengan halaman wisata:

```tsx
const [activeFilter, setActiveFilter] = useState<string>('all')

const filteredList = activeFilter === 'all'
  ? umkmList
  : umkmList.filter(item => item.category === activeFilter)

const tabs = [
  { slug: 'all', label: 'Semua', labelEn: 'All' },
  { slug: 'makanan', label: 'Makanan', labelEn: 'Food' },
  { slug: 'produk', label: 'Produk', labelEn: 'Products' },
  { slug: 'jasa', label: 'Jasa', labelEn: 'Services' },
]
```

---

## States & Handling

| State | UI |
|---|---|
| Loading | Skeleton card grid |
| Error | Alert "Gagal memuat data UMKM" |
| Empty | Ilustrasi + "Belum ada UMKM" |
| Success | Card grid normal |

---

## i18n Keys

```json
{
  "nav.umkm": "UMKM",
  "page.umkm.title": "UMKM Tamanan",
  "umkm.filter.all": "Semua",
  "umkm.filter.makanan": "Makanan",
  "umkm.filter.produk": "Produk",
  "umkm.filter.jasa": "Jasa",
  "umkm.empty": "Belum ada data UMKM",
  "umkm.hubungi": "Hubungi WA"
}
```

---

## User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| Filter tab | Klik | Filter grid |
| UMKM card | Hover | Scale + shadow |
| Tombol "Hubungi WA" | Klik | Buka `wa.me/<noTelp>` |
