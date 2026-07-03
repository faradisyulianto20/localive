# Artikel (`/artikel` + `/artikel/$id`)

## Halaman List (`/artikel`)

**Route**: `/artikel`  
**File**: `src/routes/artikel.tsx`  
**Layout**: Public (Navbar + Footer)  
**Auth**: No  
**Bahasa**: ID + EN (i18n + data bilingual)

---

### Layout

```
┌────────────────────────────────────┐
│  Kicker: "Artikel"                 │
│  Title: "Artikel & Berita"         │
├────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐        │
│  │Card      │ │Card      │        │  ← Grid ArtikelCard
│  │img       │ │img       │        │
│  │judul     │ │judul     │        │
│  │tgl-penulis│ │tgl-penulis│      │
│  └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐        │
│  │Card      │ │Card      │        │
│  └──────────┘ └──────────┘        │
│         [Pagination]              │
└────────────────────────────────────┘
```

### Komponen

| Komponen | File |
|---|---|
| `PageHeader` | `src/components/page-header.tsx` |
| `ArtikelCard` | `src/components/artikel-card.tsx` |

### Data

```ts
interface ArtikelItem {
  id: string
  title: { id: string; en: string }
  content: { id: string; en: string }    // HTML dari TipTap
  image: string
  category: string
  penulis: string
  tanggal: string       // format: YYYY-MM-DD
  createdAt: string
  updatedAt: string
}
```

- `getArtikelList()` — return semua artikel dari `src/data/artikel.json`

### ArtikelCard
- Gambar (aspect 16:9)
- Badge kategori (warna sesuai: berita=blue, kegiatan=green, pengumuman=orange)
- Judul (max 2 baris)
- Tanggal + penulis (icon kalender + user)
- Klik → `/artikel/$id`

### States

| State | UI |
|---|---|
| Loading | Skeleton card 6 grid |
| Error | Alert "Gagal memuat artikel" |
| Empty | "Belum ada artikel" |
| Success | Card grid |

---

## Halaman Detail (`/artikel/$id`)

**Route**: `/artikel/$id`  
**File**: `src/routes/artikel/$id.tsx`  
**Layout**: Public (Navbar + Footer)

### Layout

```
┌────────────────────────────────────┐
│  ← Kembali ke daftar artikel       │
├────────────────────────────────────┤
│  ┌──────────────────────────┐      │
│  │      GAMBAR HEADER       │      │
│  └──────────────────────────┘      │
│  Badge Kategori                     │
│  JUDUL ARTIKEL                      │
│  📅 1 Jul 2026  ✍️ Admin           │
├────────────────────────────────────┤
│  KONTEN ARTIKEL (Rich Text / HTML) │
│  (di-render dari TipTap output)    │
└────────────────────────────────────┘
```

### Data
- `getArtikelById(id)` — baca params.id, cari di array, return satu item

### Rich Text Rendering
- Content disimpan sebagai HTML dari TipTap editor
- Di-render menggunakan `dangerouslySetInnerHTML` dengan Tailwind typography:
  ```tsx
  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
  ```

### States

| State | UI |
|---|---|
| Loading | Skeleton artikel |
| Error | "Artikel tidak ditemukan" |
| Not found (id invalid) | 404 illustration |
| Success | Konten lengkap |

### i18n Keys

```json
{
  "nav.artikel": "Artikel",
  "page.artikel.title": "Artikel & Berita",
  "artikel.back": "Kembali ke daftar artikel",
  "artikel.notFound": "Artikel tidak ditemukan",
  "artikel.penulis": "Penulis",
  "artikel.tanggal": "Tanggal"
}
```

### User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| ArtikelCard | Klik | Navigasi ke `/artikel/$id` |
| Back button | Klik | Navigasi ke `/artikel` |
