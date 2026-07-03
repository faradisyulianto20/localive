# Admin Dashboard (`/admin/dashboard`)

**Route**: `/admin/dashboard`  
**File**: `src/routes/admin/dashboard.tsx`  
**Layout**: Admin (Sidebar + Header)  
**Auth**: Yes (token di localStorage)  
**Bahasa**: ID + EN (i18n)

---

## Layout Halaman

```
┌─────────────┬────────────────────────────────────────┐
│  SIDEBAR    │  HEADER: Dashboard                     │
│             │                                        │
│  📊 Dashboard│  ┌──────┐ ┌──────┐ ┌──────┐          │
│  🏛️ Wisata  │  │Total │ │Total │ │Total │          │
│  🏪 UMKM    │  │Wisata│ │ UMKM │ │Artikel│          │
│  📝 Artikel │  │  12  │ │  23  │ │  8   │          │
│  🌿 Lemah   │  └──────┘ └──────┘ └──────┘          │
│    Asri     │                                        │
│             │  ┌─────────────────────────────────┐  │
│  🚪 Logout  │  │      Quick Actions              │  │
│             │  │  [+ Tambah Wisata]              │  │
│             │  │  [+ Tambah UMKM]                │  │
│             │  │  [+ Tambah Artikel]             │  │
│             │  └─────────────────────────────────┘  │
│             │                                        │
└─────────────┴────────────────────────────────────────┘
```

---

## Komponen Penyusun

| Komponen | File | Keterangan |
|---|---|---|
| AdminSidebar | `src/components/admin/admin-sidebar.tsx` | Sidebar navigasi |
| StatCard | Inline | Card statistik dengan icon |

---

## Auth Check

```tsx
// Di admin layout (__root.tsx)
const token = localStorage.getItem('admin_token')
if (!token) {
  throw redirect({ to: '/login' })
}
```

---

## Data Requirements

### Stat Cards
```ts
interface DashboardStats {
  totalWisata: number
  totalUMKM: number
  totalArtikel: number
}
```

### Sumber Data
```ts
const getDashboardStats = createServerFn({ method: 'GET' })
  .handler(async () => {
    const wisata = await readData<WisataItem[]>('wisata.json')
    const umkm = await readData<UMKMItem[]>('umkm.json')
    const artikel = await readData<ArtikelItem[]>('artikel.json')
    return {
      totalWisata: wisata.length,
      totalUMKM: umkm.length,
      totalArtikel: artikel.length,
    }
  })
```

---

## States & Handling

| State | UI |
|---|---|
| Loading | Skeleton stat cards |
| Error | Toast "Gagal memuat dashboard" |
| Success | Stat cards + quick actions |

---

## i18n Keys

```json
{
  "admin.dashboard.title": "Dashboard",
  "admin.dashboard.totalWisata": "Total Wisata",
  "admin.dashboard.totalUMKM": "Total UMKM",
  "admin.dashboard.totalArtikel": "Total Artikel",
  "admin.dashboard.quickActions": "Aksi Cepat",
  "admin.dashboard.addWisata": "Tambah Wisata",
  "admin.dashboard.addUMKM": "Tambah UMKM",
  "admin.dashboard.addArtikel": "Tambah Artikel"
}
```

---

## User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| Stat card | Klik | Navigasi ke halaman list terkait |
| "Tambah Wisata" | Klik | Navigasi ke `/admin/wisata/new` |
| "Tambah UMKM" | Klik | Navigasi ke `/admin/umkm/new` |
| "Tambah Artikel" | Klik | Navigasi ke `/admin/artikel/new` |
| Sidebar link | Klik | Navigasi ke halaman admin |
| Logout | Klik | Hapus token, redirect ke `/login` |
