# Admin CRUD UMKM (`/admin/umkm/*`)

**Layout**: Admin (Sidebar + Header)  
**Auth**: Yes  
**Bahasa**: ID + EN (i18n + data bilingual)

---

## Routes

| Path | File | Fungsi |
|---|---|---|
| `/admin/umkm` | `src/routes/admin/umkm/index.tsx` | List semua UMKM |
| `/admin/umkm/new` | `src/routes/admin/umkm/new.tsx` | Create form |
| `/admin/umkm/$id/edit` | `src/routes/admin/umkm/$id.edit.tsx` | Edit form |

---

## 1. Halaman List (`/admin/umkm`)

### Layout
Sama seperti list wisata — tabel dengan kolom: Gambar, Nama, Kategori, No Telepon, Aksi.

### Data
- `getUMKMList()` — return semua UMKM

### States
| State | UI |
|---|---|
| Loading | Skeleton table |
| Empty | "Belum ada data UMKM" + tombol "Tambah UMKM" |
| Error | Alert |
| Success | Table with rows |

---

## 2. Form Create/Edit

### Form Fields

| Field | Type | Wajib | Bilingual | Component | Validation |
|---|---|---|---|---|---|
| Kategori | Select | ✅ | ❌ | `<Select>` | `z.enum(['makanan', 'produk', 'jasa'])` |
| Nama (ID) | Input | ✅ | — | `<Input>` | `z.string().min(1)` |
| Name (EN) | Input | ✅ | — | `<Input>` | `z.string().min(1)` |
| Deskripsi (ID) | Textarea | ✅ | — | `<Textarea>` | `z.string().min(1)` |
| Description (EN) | Textarea | ✅ | — | `<Textarea>` | `z.string().min(1)` |
| Gambar | Input (URL) | ✅ | — | `<Input type="url">` | `z.string().url()` |
| No Telepon | Input | ✅ | — | `<Input>` | `z.string().min(8)` |
| Link WA | Input (URL) | ❌ | — | `<Input type="url">` | `z.string().url().optional()` |
| Link Maps | Input (URL) | ❌ | — | `<Input type="url">` | `z.string().url().optional()` |

---

### Zod Schema
```ts
const umkmSchema = z.object({
  category: z.enum(['makanan', 'produk', 'jasa'], {
    required_error: 'Kategori wajib dipilih',
  }),
  title: z.object({
    id: z.string().min(1, 'Nama UMKM (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Name (English) wajib diisi'),
  }),
  description: z.object({
    id: z.string().min(1, 'Deskripsi (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Description (English) wajib diisi'),
  }),
  image: z.string().url('URL gambar tidak valid'),
  noTelp: z.string().min(8, 'No telepon minimal 8 digit'),
  waUrl: z.string().url('URL WhatsApp tidak valid').optional().or(z.literal('')),
  mapsUrl: z.string().url('URL Maps tidak valid').optional().or(z.literal('')),
})
```

---

## Server Functions

| Function | Method | Input | Output |
|---|---|---|---|
| `getUMKMList` | GET | — | `UMKMItem[]` |
| `getUMKMById` | GET | `{ id: string }` | `UMKMItem \| null` |
| `createUMKM` | POST | `UMKMSchema` | `UMKMItem` |
| `updateUMKM` | POST | `{ id: string, data: Partial<UMKMSchema> }` | `UMKMItem` |
| `deleteUMKM` | POST | `{ id: string }` | `{ success: true }` |

---

## Delete Flow
1. Klik icon trash → confirm dialog
2. "Apakah Anda yakin ingin menghapus [nama]?"
3. Tombol: [Batal] [Hapus]
4. Jika konfirmasi → hapus → toast sukses

---

## i18n Keys

```json
{
  "admin.umkm.title": "UMKM",
  "admin.umkm.add": "Tambah UMKM",
  "admin.umkm.edit": "Edit UMKM",
  "admin.umkm.delete": "Hapus UMKM",
  "admin.umkm.list": "Daftar UMKM",
  "admin.umkm.empty": "Belum ada data UMKM",
  "admin.umkm.field.category": "Kategori",
  "admin.umkm.field.titleId": "Nama (Indonesia)",
  "admin.umkm.field.titleEn": "Name (English)",
  "admin.umkm.field.descId": "Deskripsi (Indonesia)",
  "admin.umkm.field.descEn": "Description (English)",
  "admin.umkm.field.image": "Gambar",
  "admin.umkm.field.noTelp": "No Telepon",
  "admin.umkm.field.waUrl": "Link WhatsApp",
  "admin.umkm.field.mapsUrl": "Link Google Maps",
  "admin.umkm.toast.created": "UMKM berhasil ditambahkan",
  "admin.umkm.toast.updated": "UMKM berhasil diperbarui",
  "admin.umkm.toast.deleted": "UMKM berhasil dihapus"
}
```
