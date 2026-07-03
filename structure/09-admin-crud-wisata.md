# Admin CRUD Wisata (`/admin/wisata/*`)

**Layout**: Admin (Sidebar + Header)  
**Auth**: Yes  
**Bahasa**: ID + EN (i18n + data bilingual)

---

## Routes

| Path | File | Fungsi |
|---|---|---|
| `/admin/wisata` | `src/routes/admin/wisata/index.tsx` | List semua wisata |
| `/admin/wisata/new` | `src/routes/admin/wisata/new.tsx` | Create form |
| `/admin/wisata/$id/edit` | `src/routes/admin/wisata/$id.edit.tsx` | Edit form |

---

## 1. Halaman List (`/admin/wisata`)

### Layout
```
┌──────────────────────────────────────────────┐
│  Wisata                        [+ Tambah]    │
├──────────────────────────────────────────────┤
│  ┌──────┬──────┬────────┬────────┬────────┐ │
│  │Gambar│Judul │Kategori│ ID      │ Aksi  │ │  ← Table
│  ├──────┼──────┼────────┼────────┼────────┤ │
│  │  🖼️ │ ...  │ ...    │  ...   │✏️ 🗑️  │ │
│  │  🖼️ │ ...  │ ...    │  ...   │✏️ 🗑️  │ │
│  └──────┴──────┴────────┴────────┴────────┘ │
└──────────────────────────────────────────────┘
```

### Komponen
- Table (shadcn/ui atau custom)
- Row actions: Edit (icon pencil), Delete (icon trash)

### Data
- `getWisataList()` — return semua wisata

### States
| State | UI |
|---|---|
| Loading | Skeleton table rows |
| Empty | "Belum ada data wisata" + tombol "Tambah Wisata" |
| Error | Alert |
| Success | Table with rows |

---

## 2. Form Create/Edit

### Form Fields

| Field | Type | Wajib | Bilingual | Component | Validation |
|---|---|---|---|---|---|
| Kategori | Select | ✅ | ❌ | `<Select>` | `z.enum(['destinasi', 'atraksi', 'aktivitas'])` |
| Judul (ID) | Input | ✅ | — | `<Input>` | `z.string().min(1)` |
| Title (EN) | Input | ✅ | — | `<Input>` | `z.string().min(1)` |
| Deskripsi (ID) | Textarea | ✅ | — | `<Textarea>` | `z.string().min(1)` |
| Description (EN) | Textarea | ✅ | — | `<Textarea>` | `z.string().min(1)` |
| Gambar | Input (URL) | ✅ | — | `<Input type="url">` | `z.string().url()` |

### Form Layout
```tsx
<Card>
  <CardHeader>
    <CardTitle>Tambah Wisata / Edit Wisata</CardTitle>
  </CardHeader>
  <CardContent className="space-y-6">
    {/* Kategori */}
    <FormField label="Kategori" required error={errors?.category}>
      <Select value={category} onValueChange={setCategory}>
        <SelectItem value="destinasi">Destinasi</SelectItem>
        <SelectItem value="atraksi">Atraksi</SelectItem>
        <SelectItem value="aktivitas">Aktivitas</SelectItem>
      </Select>
    </FormField>

    {/* Bilingual Title - side by side */}
    <div className="grid gap-4 md:grid-cols-2">
      <FormField label="Judul (Indonesia)" required error={errors?.title?.id}>
        <Input value={titleId} onChange={...} placeholder="Masukkan judul..." />
      </FormField>
      <FormField label="Title (English)" required error={errors?.title?.en}>
        <Input value={titleEn} onChange={...} placeholder="Enter title..." />
      </FormField>
    </div>

    {/* Bilingual Description */}
    <div className="grid gap-4 md:grid-cols-2">
      <FormField label="Deskripsi (Indonesia)" required error={errors?.description?.id}>
        <Textarea value={descId} onChange={...} rows={4} />
      </FormField>
      <FormField label="Description (English)" required error={errors?.description?.en}>
        <Textarea value={descEn} onChange={...} rows={4} />
      </FormField>
    </div>

    {/* Gambar */}
    <FormField label="Gambar (URL)" required error={errors?.image}>
      <Input type="url" value={image} onChange={...} placeholder="https://..." />
    </FormField>
  </CardContent>
  <CardFooter className="gap-3">
    <Button type="submit">Simpan</Button>
    <Button type="button" variant="outline" onClick={goBack}>Batal</Button>
  </CardFooter>
</Card>
```

### Zod Schema
```ts
const wisataSchema = z.object({
  category: z.enum(['destinasi', 'atraksi', 'aktivitas'], {
    required_error: 'Kategori wajib dipilih',
  }),
  title: z.object({
    id: z.string().min(1, 'Judul Indonesia wajib diisi'),
    en: z.string().min(1, 'Title English wajib diisi'),
  }),
  description: z.object({
    id: z.string().min(1, 'Deskripsi Indonesia wajib diisi'),
    en: z.string().min(1, 'Description English wajib diisi'),
  }),
  image: z.string().url('URL gambar tidak valid'),
})
```

---

## Server Functions

| Function | Method | Input | Output |
|---|---|---|---|
| `getWisataList` | GET | — | `WisataItem[]` |
| `getWisataById` | GET | `{ id: string }` | `WisataItem \| null` |
| `createWisata` | POST | `WisataSchema` | `WisataItem` |
| `updateWisata` | POST | `{ id: string, data: Partial<WisataSchema> }` | `WisataItem` |
| `deleteWisata` | POST | `{ id: string }` | `{ success: true }` |

---

## Delete Flow
1. Klik icon trash → muncul confirm dialog
2. "Apakah Anda yakin ingin menghapus [judul]?"
3. Tombol: [Batal] [Hapus]
4. Jika konfirmasi → panggil `deleteWisata(id)` → toast sukses → refresh table

---

## i18n Keys

```json
{
  "admin.wisata.title": "Wisata",
  "admin.wisata.add": "Tambah Wisata",
  "admin.wisata.edit": "Edit Wisata",
  "admin.wisata.delete": "Hapus Wisata",
  "admin.wisata.list": "Daftar Wisata",
  "admin.wisata.empty": "Belum ada data wisata",
  "admin.wisata.deleteConfirm": "Apakah Anda yakin ingin menghapus \"{title}\"?",
  "admin.wisata.field.category": "Kategori",
  "admin.wisata.field.titleId": "Judul (Indonesia)",
  "admin.wisata.field.titleEn": "Title (English)",
  "admin.wisata.field.descId": "Deskripsi (Indonesia)",
  "admin.wisata.field.descEn": "Description (English)",
  "admin.wisata.field.image": "Gambar",
  "admin.wisata.toast.created": "Wisata berhasil ditambahkan",
  "admin.wisata.toast.updated": "Wisata berhasil diperbarui",
  "admin.wisata.toast.deleted": "Wisata berhasil dihapus"
}
```
