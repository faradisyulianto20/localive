# Lemah Asri (`/lemah-asri`)

**Route**: `/lemah-asri`  
**File**: `src/routes/lemah-asri.tsx`  
**Layout**: Public (Navbar + Footer)  
**Auth**: No  
**Bahasa**: ID + EN (i18n + data bilingual)

---

## Layout Halaman

```
┌──────────────────────────────────────┐
│             HERO SECTION             │
│   Nama Usaha (besar)                 │
│   Tagline: "Lembaga Usaha Tamanan    │
│            Sadar Wisata"             │
├──────────────────────────────────────┤
│          INFO KONTAK                 │
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐        │
│   │📍│ │📞│ │✉️│ │📷│ │▶️│        │  ← Icon cards
│   └──┘ └──┘ └──┘ └──┘ └──┘        │
├──────────────────────────────────────┤
│          PENDAHULUAN                 │
│   ┌──────────────────────────┐      │
│   │ 1.1 Latar Belakang       │      │
│   │ (teks deskripsi)         │      │
│   ├──────────────────────────┤      │
│   │ 1.2 Visi Usaha           │      │
│   │ (teks)                   │      │
│   ├──────────────────────────┤      │
│   │ 1.3 Misi Usaha           │      │
│   │ • bullet                 │      │
│   │ • bullet                 │      │
│   └──────────────────────────┘      │
├──────────────────────────────────────┤
│       STRUKTUR ORGANISASI            │
│   ┌──────────────────────────┐      │
│   │ CEO: Yusuf Budiono       │      │
│   │ COO: Rinto Hakim ...    │      │  ← Card/list
│   │ ...                     │      │
│   └──────────────────────────┘      │
├──────────────────────────────────────┤
│          TRACK RECORD                │
│   • Tuan Tuangga Agung              │
│   • PKG Lowokwaru malang            │
│   • ...                             │
└──────────────────────────────────────┘
```

---

## Komponen Penyusun

Semua konten di-render langsung di route file (tidak ada komponen terpisah untuk MVP).

Bisa dipisah nanti:
- `LemahAsriHero`
- `LemahAsriKontak`
- `LemahAsriVisiMisi`
- `LemahAsriStruktur`
- `LemahAsriTrackRecord`

---

## Data Requirements

### Type
```ts
interface LemahAsri {
  namaUsaha: { id: string; en: string }
  pemilik: string
  tahunBerdiri: string
  lokasi: string
  noTelp: string
  email: string
  instagram: string
  youtube: string
  visi: { id: string; en: string }
  misi: { id: string; en: string }
  strukturOrganisasi: { jabatan: string; nama: string }[]
  trackRecord: string[]
  updatedAt: string
}
```

### Sumber Data
- `getLemahAsri()` — return single object dari `src/data/lemah-asri.json`
- Data statis diisi dari konten yang diberikan user

---

## States & Handling

| State | UI |
|---|---|
| Loading | Skeleton per section |
| Error | Alert "Gagal memuat data" |
| Success | Render semua section |

---

## i18n Keys

```json
{
  "nav.lemahAsri": "Lemah Asri",
  "page.lemahAsri.title": "Profil Lemah Asri",
  "lemahAsri.tagline": "Lembaga Usaha Tamanan Sadar Wisata",
  "lemahAsri.pemilik": "Pemilik Usaha",
  "lemahAsri.tahunBerdiri": "Awal Didirikan",
  "lemahAsri.lokasi": "Lokasi Usaha",
  "lemahAsri.noTelp": "Nomor Telepon",
  "lemahAsri.email": "Email Perusahaan",
  "lemahAsri.instagram": "Instagram",
  "lemahAsri.youtube": "YouTube",
  "lemahAsri.pendahuluan": "Pendahuluan",
  "lemahAsri.latarBelakang": "1.1 Latar Belakang",
  "lemahAsri.visi": "1.2 Visi Usaha",
  "lemahAsri.misi": "1.3 Misi Usaha",
  "lemahAsri.strukturOrganisasi": "Struktur Organisasi",
  "lemahAsri.trackRecord": "Track Record"
}
```

---

## User Interactions

| Element | Aksi | Hasil |
|---|---|---|
| No Telp | Klik | `tel:0882005012212` |
| Email | Klik | `mailto:tamanan.media@gmail.com` |
| Instagram | Klik | Buka IG profile (external) |
| YouTube | Klik | Buka YT channel (external) |
