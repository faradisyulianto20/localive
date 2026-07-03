# Wisata (`/wisata`)

**Route**: `/wisata`  
**File**: `src/routes/wisata.tsx`  
**Layout**: Public (Navbar + Footer)  
**Auth**: No  
**Bahasa**: ID + EN (i18n + data bilingual)

---

## Layout Halaman

```
┌────────────────────────────────────┐
│  Kicker: "Wisata"                  │
│  Title: "Wisata Tamanan"           │
├────────────────────────────────────┤
│  [Semua] [Destinasi] [Atraksi] [Aktivitas]  ← Filter Tabs
├────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ Card │ │ Card │ │ Card │       │  ← Grid WisataCard
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
| `WisataCard` | `src/components/wisata-card.tsx` | Card wisata |

---

## Data Requirements

### Type
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
```

### Sumber Data
- `getWisataList()` — return semua item dari `src/data/wisata.json`
- Filter dilakukan **client-side** berdasarkan `category` slug
- Tabs: Semua (no filter) | Destinasi (`destinasi`) | Atraksi (`atraksi`) | Aktivitas (`aktivitas`)

---

## Filter Logic

```tsx
const [activeFilter, setActiveFilter] = useState<string>('all')

const filteredList = activeFilter === 'all'
  ? wisataList
  : wisataList.filter(item => item.category === activeFilter)

const tabs = [
  { slug: 'all', label: 'Semua', labelEn: 'All' },
  { slug: 'destinasi', label: 'Destinasi', labelEn: 'Destinations' },
  { slug: 'atraksi', label: 'Atraksi', labelEn: 'Attractions' },
  { slug: 'aktivitas', label: 'Aktivitas', labelEn: 'Activities' },
]
```

---

## States & Handling

| State | UI |
|---|---|
| Loading | Skeleton card grid (6 card) |
| Error | Alert "Gagal memuat data wisata" |
| Empty | Ilustrasi + "Belum ada wisata" |
| Empty (filtered) | "Tidak ada wisata dengan kategori ini" |
| Success | Card grid normal |

---

## i18n Keys

```json
{
  "nav.wisata": "Wisata",
  "page.wisata.title": "Wisata Tamanan",
  "wisata.filter.all": "Semua",
  "wisata.filter.destinasi": "Destinasi",
  "wisata.filter.atraksi": "Atraksi",
  "wisata.filter.aktivitas": "Aktivitas",
  "wisata.empty": "Belum ada data wisata",
  "wisata.empty.filtered": "Tidak ada wisata dengan kategori ini"
}
```

---

## User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| Filter tab | Klik | Filter grid dengan animasi fade |
| Wisata card | Hover | Scale up image |
| Wisata card | Klik | (Future) modal detail / navigasi |
