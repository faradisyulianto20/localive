# Admin CRUD Lemah Asri (`/admin/lemah-asri/*`)

**Layout**: Admin (Sidebar + Header)  
**Auth**: Yes  
**Bahasa**: ID + EN (i18n + data bilingual)

---

## Routes

| Path | File | Fungsi |
|---|---|---|
| `/admin/lemah-asri` | `src/routes/admin/lemah-asri/index.tsx` | View & Edit profil |

Berbeda dengan CRUD lainnya, **Lemah Asri hanya memiliki satu record** (single entity). Jadi tidak ada list page, create, atau delete — hanya view dan edit.

---

## 1. Halaman View (`/admin/lemah-asri`)

### Layout
```
┌──────────────────────────────────────────────┐
│  Profil Lemah Asri           [Edit Profil]   │
├──────────────────────────────────────────────┤
│  ┌────────────────────────────────────────┐  │
│  │  Nama Usaha: LEMAH ASRI               │  │
│  │  Pemilik: Atas Nama Anggota            │  │
│  │  Tahun: 09 September 2021              │  │
│  │  Lokasi: Tamanan, Kalasan, Sleman      │  │
│  │  No Telp: 0882005012212                │  │
│  │  Email: tamanan.media@gmail.com        │  │
│  │  IG: Tamanan.Media                     │  │
│  │  YT: Tamanan TV                        │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  VISI                                  │  │
│  │  Visi (ID): ...                        │  │
│  │  Vision (EN): ...                      │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  MISI                                  │  │
│  │  Misi (ID): • ...                      │  │
│  │  Mission (EN): • ...                   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  STRUKTUR ORGANISASI                   │  │
│  │  CEO: Yusuf Budiono                    │  │
│  │  COO: Rinto Hakim Pamungkas            │  │
│  │  ...                                   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │  TRACK RECORD                          │  │
│  │  • Tuan Tuangga Agung                  │  │
│  │  • PKG Lowokwaru malang                │  │
│  │  • ...                                 │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### Data
- `getLemahAsri()` — return single `LemahAsri` object

---

## 2. Form Edit (`/admin/lemah-asri/edit`)

### Form Fields

| Field | Type | Wajib | Bilingual | Component |
|---|---|---|---|---|
| Nama Usaha (ID) | Input | ✅ | — | `<Input>` |
| Business Name (EN) | Input | ✅ | — | `<Input>` |
| Pemilik Usaha | Input | ✅ | ❌ | `<Input>` |
| Tahun Berdiri | Input | ✅ | ❌ | `<Input>` |
| Lokasi | Textarea | ✅ | ❌ | `<Textarea>` |
| No Telepon | Input | ✅ | ❌ | `<Input>` |
| Email | Input | ✅ | ❌ | `<Input type="email">` |
| Instagram | Input | ✅ | ❌ | `<Input>` |
| YouTube | Input | ✅ | ❌ | `<Input>` |
| Visi (ID) | Textarea | ✅ | — | `<Textarea>` |
| Vision (EN) | Textarea | ✅ | — | `<Textarea>` |
| Misi (ID) | Textarea | ✅ | — | `<Textarea>` |
| Mission (EN) | Textarea | ✅ | — | `<Textarea>` |

### Dynamic List Fields

**Struktur Organisasi** — array of `{ jabatan, nama }`:
```tsx
<div>
  <Label>Struktur Organisasi</Label>
  {struktur.map((item, index) => (
    <div key={index} className="flex gap-2">
      <Input value={item.jabatan} placeholder="Jabatan" />
      <Input value={item.nama} placeholder="Nama" />
      <Button variant="ghost" onClick={() => removeStruktur(index)}>
        <X />
      </Button>
    </div>
  ))}
  <Button variant="outline" onClick={addStruktur}>+ Tambah</Button>
</div>
```

**Track Record** — array of string:
```tsx
<div>
  <Label>Track Record</Label>
  {trackRecord.map((item, index) => (
    <div key={index} className="flex gap-2">
      <Input value={item} placeholder="Nama track record" />
      <Button variant="ghost" onClick={() => removeTrack(index)}>
        <X />
      </Button>
    </div>
  ))}
  <Button variant="outline" onClick={addTrack}>+ Tambah</Button>
</div>
```

---

### Zod Schema
```ts
const lemahAsriSchema = z.object({
  namaUsaha: z.object({
    id: z.string().min(1, 'Nama usaha (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Business name (English) wajib diisi'),
  }),
  pemilik: z.string().min(1, 'Pemilik usaha wajib diisi'),
  tahunBerdiri: z.string().min(1, 'Tahun berdiri wajib diisi'),
  lokasi: z.string().min(1, 'Lokasi wajib diisi'),
  noTelp: z.string().min(1, 'No telepon wajib diisi'),
  email: z.string().email('Email tidak valid'),
  instagram: z.string().min(1, 'Akun Instagram wajib diisi'),
  youtube: z.string().min(1, 'Akun YouTube wajib diisi'),
  visi: z.object({
    id: z.string().min(1, 'Visi (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Vision (English) wajib diisi'),
  }),
  misi: z.object({
    id: z.string().min(1, 'Misi (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Mission (English) wajib diisi'),
  }),
  strukturOrganisasi: z.array(z.object({
    jabatan: z.string().min(1, 'Jabatan wajib diisi'),
    nama: z.string().min(1, 'Nama wajib diisi'),
  })),
  trackRecord: z.array(z.string()),
})
```

---

## Server Functions

| Function | Method | Input | Output |
|---|---|---|---|
| `getLemahAsri` | GET | — | `LemahAsri` |
| `updateLemahAsri` | POST | `LemahAsriSchema` | `LemahAsri` |

Tidak ada create/delete karena single record.

---

## States

| State | UI |
|---|---|
| Loading | Skeleton form |
| Error | Alert "Gagal memuat data" |
| Success | Form terisi |

---

## i18n Keys

```json
{
  "admin.lemahAsri.title": "Profil Lemah Asri",
  "admin.lemahAsri.edit": "Edit Profil",
  "admin.lemahAsri.view": "Lihat Profil",
  "admin.lemahAsri.field.namaUsahaId": "Nama Usaha (Indonesia)",
  "admin.lemahAsri.field.namaUsahaEn": "Business Name (English)",
  "admin.lemahAsri.field.pemilik": "Pemilik Usaha",
  "admin.lemahAsri.field.tahunBerdiri": "Tahun Berdiri",
  "admin.lemahAsri.field.lokasi": "Lokasi",
  "admin.lemahAsri.field.noTelp": "No Telepon",
  "admin.lemahAsri.field.email": "Email",
  "admin.lemahAsri.field.instagram": "Instagram",
  "admin.lemahAsri.field.youtube": "YouTube",
  "admin.lemahAsri.field.visiId": "Visi (Indonesia)",
  "admin.lemahAsri.field.visiEn": "Vision (English)",
  "admin.lemahAsri.field.misiId": "Misi (Indonesia)",
  "admin.lemahAsri.field.misiEn": "Mission (English)",
  "admin.lemahAsri.field.struktur": "Struktur Organisasi",
  "admin.lemahAsri.field.trackRecord": "Track Record",
  "admin.lemahAsri.toast.updated": "Profil berhasil diperbarui"
}
```
