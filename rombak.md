# Rencana Besar Restrukturisasi Localive

> **Dokumen ini berisi rencana implementasi perubahan besar-besaran pada proyek Localive.**
> Berlaku mulai: Juli 2026

---

## Daftar Isi

1. [Ringkasan Perubahan](#1-ringkasan-perubahan)
2. [Tech Stack & Keputusan Arsitektur](#2-tech-stack--keputusan-arsitektur)
3. [Fase Eksekusi](#3-fase-eksekusi)
4. [Struktur File Final](#4-struktur-file-final)
5. [Detail Perubahan Per Komponen](#5-detail-perubahan-per-komponen)
6. [Server Functions & Data Layer](#6-server-functions--data-layer)
7. [Admin Dashboard & CRUD](#7-admin-dashboard--crud)
8. [i18n & Multilingual](#8-i18n--multilingual)
9. [Estimasi Waktu](#9-estimasi-waktu)

---

## 1. Ringkasan Perubahan

### 1.1. Navbar — Perubahan Menu

| Hapus | Tambah |
|---|---|
| Destinasi (`/destinasi`) | Wisata (`/wisata`) |
| Paket Wisata (`/paket-wisata`) | UMKM (`/umkm`) |
| Penginapan (`/penginapan`) | Artikel (`/artikel`) |
| — | Lemah Asri (`/lemah-asri`) |

Menu baru: **Beranda, Profil, Wisata, UMKM, Artikel, Lemah Asri**

### 1.2. Landing Page — Susunan Komponen Baru

| Posisi | Komponen | Sumber Data |
|---|---|---|
| 1 | `<HeroSection />` | Static (i18n) |
| 2 | `<ProfilSection />` | Static (i18n) |
| 3 | `<WisataSection />` | `wisata.json` (filter: destinasi + atraksi) |
| 4 | `<ProdukUMKMSection />` | `umkm.json` |
| 5 | `<LemahAsriSection />` | `lemah-asri.json` |
| 6 | `<ArtikelSection />` | `artikel.json` (3 terbaru) |
| 7 | `<CTASection />` | Static (WA: 085876270545) |
| 8 | `<Footer />` | Static |

### 1.3. Halaman Baru / Diubah

| Halaman | Route | Status |
|---|---|---|
| Landing | `/` | **Edit** |
| Profil | `/profil` | **Edit** (tambah hero, definisi, potensi, mitra) |
| Wisata | `/wisata` | **Baru** (grid + filter kategori) |
| UMKM | `/umkm` | **Baru** (grid + filter kategori) |
| Artikel | `/artikel` | **Baru** (list card) |
| Detail Artikel | `/artikel/$id` | **Baru** |
| Lemah Asri | `/lemah-asri` | **Baru** (profil lengkap) |
| Login | `/login` | **Baru** |
| Admin Dashboard | `/admin/dashboard` | **Baru** |
| Admin CRUD Wisata | `/admin/wisata/*` | **Baru** |
| Admin CRUD UMKM | `/admin/umkm/*` | **Baru** |
| Admin CRUD Artikel | `/admin/artikel/*` | **Baru** |
| Admin CRUD Lemah Asri | `/admin/lemah-asri/*` | **Baru** |

---

## 2. Tech Stack & Keputusan Arsitektur

| Aspek | Keputusan |
|---|---|
| **Data Storage** | JSON file (`src/data/*.json`) — dibaca/ditulis via server functions |
| **Rich Text** | TipTap (`@tiptap/react` + `@tiptap/starter-kit` + `@tiptap/extension-image`) |
| **Auth** | Hardcoded admin/admin123, token di localStorage (MVP) |
| **Form State** | `@tanstack/react-form` (existing) |
| **Validation** | Zod (existing) |
| **i18n** | i18next + react-i18next (existing) — bilingual ID/EN |
| **CSS** | Tailwind v4 + shadcn/ui (existing) |

---

## 3. Fase Eksekusi

### Fase 1: Setup & Konfigurasi
- [x] Install dependencies: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-image`
- [ ] Update `src/locales/id.json` dan `en.json`
- [ ] Generate route tree: `pnpm generate-routes`

### Fase 2: Restruktur Public Routes & Komponen
- [ ] Hapus: `destinasi.tsx`, `penginapan.tsx`, `homestay-section.tsx`, `map-section.tsx`
- [ ] Buat: `wisata.tsx`, `umkm.tsx`, `artikel.tsx`, `artikel/$id.tsx`, `lemah-asri.tsx`
- [ ] Rename: `destinasi-section.tsx` → `wisata-section.tsx`, `paket-wisata-section.tsx` → `produk-umkm-section.tsx`
- [ ] Edit: `navbar.tsx`, `footer.tsx`, `hero-section.tsx`, `profil-section.tsx`, `index.tsx`
- [ ] Buat komponen baru: `wisata-card.tsx`, `umkm-card.tsx`, `artikel-card.tsx`, `lemah-asri-section.tsx`, `artikel-section.tsx`, `cta-section.tsx`

### Fase 3: Halaman Public Detail
- [ ] `src/routes/profil.tsx` — 4 sections (hero, definisi, potensi, mitra)
- [ ] `src/routes/wisata.tsx` — grid + filter tabs (Semua/Destinasi/Atraksi/Aktivitas)
- [ ] `src/routes/umkm.tsx` — grid + filter tabs (Semua/Makanan/Produk/Jasa)
- [ ] `src/routes/artikel.tsx` + `artikel/$id.tsx` — list + detail
- [ ] `src/routes/lemah-asri.tsx` — profil lengkap

### Fase 4: Admin Dashboard
- [ ] `src/routes/login.tsx` — form login
- [ ] `src/routes/admin/__root.tsx` — layout sidebar
- [ ] `src/routes/admin/dashboard.tsx` — stat cards
- [ ] Komponen: `src/components/admin/form-field.tsx` — reusable form field with *

### Fase 5: CRUD Server Functions
- [ ] `src/lib/data-utils.ts` — helper read/write JSON
- [ ] `src/server/functions/auth.ts`
- [ ] `src/server/functions/wisata.ts`
- [ ] `src/server/functions/umkm.ts`
- [ ] `src/server/functions/artikel.ts`
- [ ] `src/server/functions/lemah-asri.ts`

### Fase 6: CRUD Admin Routes
- [ ] Wisata: list, create, edit
- [ ] UMKM: list, create, edit
- [ ] Artikel: list, create, edit
- [ ] Lemah Asri: view + edit

### Fase 7: Polish
- [ ] Floating WhatsApp button di root layout
- [ ] Asterisk merah di semua form wajib
- [ ] Admin sidebar active state
- [ ] Responsive design

---

## 4. Struktur File Final

```
localive/
├── rombak.md                          ← Dokumen ini
├── plan/                              ← Dokumen perencanaan lama
├── structure/                         ← Dokumentasi per halaman (baru)
│   ├── 01-landing-page.md
│   ├── 02-profil.md
│   ├── 03-wisata.md
│   ├── 04-umkm.md
│   ├── 05-artikel.md
│   ├── 06-lemah-asri.md
│   ├── 07-login.md
│   ├── 08-admin-dashboard.md
│   ├── 09-admin-crud-wisata.md
│   ├── 10-admin-crud-umkm.md
│   ├── 11-admin-crud-artikel.md
│   └── 12-admin-crud-lemah-asri.md
├── src/
│   ├── components/
│   │   ├── ui/                        ← unchanged
│   │   ├── navbar.tsx                 ← EDIT
│   │   ├── footer.tsx                 ← EDIT
│   │   ├── hero-section.tsx           ← EDIT
│   │   ├── profil-section.tsx         ← EDIT
│   │   ├── wisata-section.tsx         ← RENAME (ex destinasi-section)
│   │   ├── produk-umkm-section.tsx    ← RENAME (ex paket-wisata-section)
│   │   ├── lemah-asri-section.tsx     ← BARU
│   │   ├── artikel-section.tsx        ← BARU
│   │   ├── cta-section.tsx            ← BARU
│   │   ├── artikel-card.tsx           ← BARU
│   │   ├── umkm-card.tsx              ← BARU
│   │   ├── wisata-card.tsx            ← BARU
│   │   ├── language-toggle.tsx        ← unchanged
│   │   ├── page-header.tsx            ← unchanged
│   │   └── admin/
│   │       ├── form-field.tsx         ← BARU (reusable form field)
│   │       └── admin-sidebar.tsx      ← BARU
│   ├── routes/
│   │   ├── __root.tsx                 ← EDIT (tambah floating WA)
│   │   ├── index.tsx                  ← EDIT
│   │   ├── profil.tsx                 ← EDIT (4 sections)
│   │   ├── wisata.tsx                 ← BARU
│   │   ├── umkm.tsx                   ← BARU
│   │   ├── artikel.tsx                ← BARU
│   │   ├── artikel/
│   │   │   └── $id.tsx                ← BARU
│   │   ├── lemah-asri.tsx             ← BARU
│   │   ├── login.tsx                  ← BARU
│   │   └── admin/
│   │       ├── __root.tsx             ← BARU (admin layout)
│   │       ├── dashboard.tsx          ← BARU
│   │       ├── wisata/
│   │       │   ├── index.tsx          ← BARU (list)
│   │       │   ├── new.tsx            ← BARU (create)
│   │       │   └── $id.edit.tsx       ← BARU (edit)
│   │       ├── umkm/
│   │       │   ├── index.tsx
│   │       │   ├── new.tsx
│   │       │   └── $id.edit.tsx
│   │       ├── artikel/
│   │       │   ├── index.tsx
│   │       │   ├── new.tsx
│   │       │   └── $id.edit.tsx
│   │       └── lemah-asri/
│   │           ├── index.tsx          ← BARU (view)
│   │           └── edit.tsx           ← BARU (edit)
│   ├── lib/
│   │   ├── i18n.ts                    ← unchanged
│   │   ├── utils.ts                   ← unchanged
│   │   ├── data-utils.ts              ← BARU (read/write JSON helper)
│   │   ├── wisata.json                ← existing (seed)
│   │   └── umkm.json                  ← existing (seed)
│   ├── server/
│   │   └── functions/
│   │       ├── auth.ts                ← BARU
│   │       ├── wisata.ts              ← BARU
│   │       ├── umkm.ts                ← BARU
│   │       ├── artikel.ts             ← BARU
│   │       └── lemah-asri.ts          ← BARU
│   ├── data/
│   │   ├── wisata.json                ← BARU (CRUD target)
│   │   ├── umkm.json                  ← BARU (CRUD target)
│   │   ├── artikel.json               ← BARU (CRUD target)
│   │   └── lemah-asri.json            ← BARU (CRUD target)
│   ├── locales/
│   │   ├── id.json                    ← EDIT
│   │   └── en.json                    ← EDIT
│   └── integrations/                  ← unchanged
├── package.json
├── vite.config.ts
└── ... (config files)
```

---

## 5. Detail Perubahan Per Komponen

### 5.1. Navbar (`src/components/navbar.tsx`)
```ts
// Sebelum
const links = [
  { to: "/", label: "nav.beranda" },
  { to: "/profil", label: "nav.profil" },
  { to: "/destinasi", label: "nav.destinasi" },
  { to: "/paket-wisata", label: "nav.paketWisata" },
  { to: "/penginapan", label: "nav.penginapan" },
]

// Sesudah
const links = [
  { to: "/", label: "nav.beranda" },
  { to: "/profil", label: "nav.profil" },
  { to: "/wisata", label: "nav.wisata" },
  { to: "/umkm", label: "nav.umkm" },
  { to: "/artikel", label: "nav.artikel" },
  { to: "/lemah-asri", label: "nav.lemahAsri" },
]
```

### 5.2. Landing Page (`src/routes/index.tsx`)
```tsx
// Sebelum
<HeroSection />
<ProfilSection />
<DestinasiSection />
<PaketWisataSection />
<HomestaySection />
<MapSection />
<Footer />

// Sesudah
<HeroSection />
<ProfilSection />
<WisataSection />
<ProdukUMKMSection />
<LemahAsriSection />
<ArtikelSection />
<CTASection />
<Footer />
```

### 5.3. Komponen Dihapus
- `src/components/homestay-section.tsx` — pindahkan data homestay ke file terpisah jika diperlukan
- `src/components/map-section.tsx` — tidak ada pengganti

### 5.4. Komponen Direname
- `destinasi-section.tsx` → `wisata-section.tsx` (pakai data `wisata.json`)
- `paket-wisata-section.tsx` → `produk-umkm-section.tsx` (pakai data `umkm.json`)

### 5.5. Route Dihapus
- `src/routes/destinasi.tsx`
- `src/routes/paket-wisata.tsx`
- `src/routes/penginapan.tsx`

---

## 6. Server Functions & Data Layer

### 6.1. Data Storage Format (JSON)

Setiap entity memiliki file JSON di `src/data/`:

**`wisata.json`**
```json
[
  {
    "id": "destinasi-cagar-budaya",
    "category": "destinasi",
    "title": { "id": "Cagar Budaya", "en": "Cultural Heritage" },
    "description": { "id": "Deskripsi...", "en": "Description..." },
    "image": "/wisata/cagar-budaya.png",
    "createdAt": "2026-07-01T00:00:00Z",
    "updatedAt": "2026-07-01T00:00:00Z"
  }
]
```

**`umkm.json`**
```json
[
  {
    "id": "joglo-belimo",
    "title": { "id": "Joglo Belimo", "en": "Joglo Belimo" },
    "category": "makanan",
    "description": { "id": "Menjual aneka donat...", "en": "Selling various donuts..." },
    "image": "/umkm/joglo-belimo.png",
    "mapsUrl": "",
    "waUrl": "https://wa.me/6285876270545",
    "noTelp": "081210839779",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

**`artikel.json`**
```json
[
  {
    "id": "artikel-1",
    "title": { "id": "Judul Artikel", "en": "Article Title" },
    "content": { "id": "<p>Konten...</p>", "en": "<p>Content...</p>" },
    "image": "/artikel/gambar.png",
    "category": "berita",
    "penulis": "Admin",
    "tanggal": "2026-07-01",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

**`lemah-asri.json`**
```json
{
  "namaUsaha": { "id": "LEMAH ASRI", "en": "LEMAH ASRI" },
  "pemilik": "Atas Nama Anggota Lemah Asri",
  "tahunBerdiri": "09 September 2021",
  "lokasi": "Tamanan, Tamanmartani, Kalasan, Sleman, DIY",
  "noTelp": "0882005012212",
  "email": "tamanan.media@gmail.com",
  "instagram": "Tamanan.Media",
  "youtube": "Tamanan TV",
  "visi": {
    "id": "Menjadikan Tamanan sebagai Pedukuhan...",
    "en": "Making Tamanan a tourism-based hamlet..."
  },
  "misi": {
    "id": "• mensupport...\n• Membantu...",
    "en": "• Support...\n• Help..."
  },
  "strukturOrganisasi": [
    { "jabatan": "CHIEF EXECUTIVE OFFICER", "nama": "YUSUF BUDIONO" },
    { "jabatan": "CHIEF OPERATING OFFICER", "nama": "RINTO HAKIM PAMUNGKAS" }
  ],
  "trackRecord": [
    "Tuan Tuangga Agung",
    "PKG Lowokwaru malang"
  ],
  "updatedAt": "..."
}
```

### 6.2. Data Utils (`src/lib/data-utils.ts`)

```ts
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DATA_DIR = path.resolve(import.meta.dirname, '../data')

export async function readData<T>(filename: string): Promise<T> {
  const filePath = path.join(DATA_DIR, filename)
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function writeData<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, filename)
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
```

### 6.3. Server Function Pattern

```ts
// src/server/functions/wisata.ts
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { readData, writeData } from '#/lib/data-utils'
import type { WisataItem } from '#/types'

const wisataSchema = z.object({
  category: z.enum(['destinasi', 'atraksi', 'aktivitas']),
  title: z.object({
    id: z.string().min(1, 'Judul Indonesia wajib'),
    en: z.string().min(1, 'Title English wajib'),
  }),
  description: z.object({
    id: z.string().min(1, 'Deskripsi Indonesia wajib'),
    en: z.string().min(1, 'Description English wajib'),
  }),
  image: z.string().url('URL gambar tidak valid'),
})

export const getWisataList = createServerFn({ method: 'GET' })
  .handler(async () => {
    return readData<WisataItem[]>('wisata.json')
  })

export const createWisata = createServerFn({ method: 'POST' })
  .validator((data: unknown) => wisataSchema.parse(data))
  .handler(async ({ data }) => {
    const list = await readData<WisataItem[]>('wisata.json')
    const newItem: WisataItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    list.push(newItem)
    await writeData('wisata.json', list)
    return newItem
  })
```

---

## 7. Admin Dashboard & CRUD

### 7.1. Login Flow
1. User buka `/login`
2. Isi username + password
3. Submit → validasi `admin/admin123`
4. Simpan `{ token: 'authenticated', username: 'admin' }` ke localStorage
5. Redirect ke `/admin/dashboard`
6. Admin layout cek localStorage → jika tidak ada, redirect ke `/login`

### 7.2. Admin Layout
- Sidebar kiri (250px, fixed):
  ```
  📊 Dashboard         → /admin/dashboard
  🏛️ Wisata           → /admin/wisata
  🏪 UMKM             → /admin/umkm
  📝 Artikel          → /admin/artikel
  🌿 Lemah Asri       → /admin/lemah-asri
  🚪 Logout           → hapus token, redirect /login
  ```
- Konten kanan (scroll)
- Breadcrumb navigasi

### 7.3. Form CRUD — Layout Umum
Setiap form CRUD mengikuti pola:
```
┌─────────────────────────────────────────────┐
│  Card Header: Tambah / Edit [Entity]        │
├─────────────────────────────────────────────┤
│  Card Content:                              │
│                                             │
│  Kategori *        [Select dropdown]        │
│                                             │
│  ┌──────────────┐ ┌──────────────┐         │
│  │ Judul (ID) *  │ │ Title (EN) * │         │
│  │ [Input]       │ │ [Input]      │         │
│  └──────────────┘ └──────────────┘         │
│                                             │
│  ┌──────────────┐ ┌──────────────┐         │
│  │ Deskripsi(ID)*│ │ Desc (EN) *  │         │
│  │ [Textarea]    │ │ [Textarea]   │         │
│  └──────────────┘ └──────────────┘         │
│                                             │
│  Gambar *          [Input URL]              │
│                                             │
├─────────────────────────────────────────────┤
│  Card Footer: [Simpan] [Batal]             │
└─────────────────────────────────────────────┘
```

### 7.4. Asterisk Merah di Form
Semua field required menggunakan pattern:
```tsx
<Label className="after:ml-0.5 after:text-red-500 after:content-['*']">
  Judul (Indonesia)
</Label>
```

---

## 8. i18n & Multilingual

### 8.1. Strategi
- Semua konten CRUD bilingual: ID + EN, **keduanya wajib**
- Format penyimpanan: `{ id: string; en: string }` untuk setiap field tekstual
- Public site: menampilkan konten sesuai bahasa aktif (fallback ke ID jika EN None)
- Admin site: form menampilkan 2 input per field (ID + EN)

### 8.2. i18n Key Structure
```
nav.beranda, nav.profil, nav.wisata, nav.umkm, nav.artikel, nav.lemahAsri
page.beranda.*, page.profil.*, page.wisata.*, page.umkm.*, page.artikel.*, page.lemahAsri.*
section.profil.*, section.wisata.*, section.umkm.*, section.lemahAsri.*, section.artikel.*, section.cta.*
admin.* (sidebar labels, form labels, button text, table headers)
```

### 8.3. Public Site — Akses Field Bilingual
```tsx
const { i18n } = useTranslation()
const lang = i18n.language as 'id' | 'en'

// Akses dengan fallback ke ID
const title = item.title[lang] ?? item.title.id
```

---

## 9. Estimasi Waktu

| Fase | Item | Estimasi |
|---|---|---|
| 1 | Setup dependencies + update locales + generate routes | 30 menit |
| 2a | Navbar + Footer + hapus komponen lama | 20 menit |
| 2b | Komponen baru (sections + cards) | 2 jam |
| 3a | Halaman Profil (4 sections) | 40 menit |
| 3b | Halaman Wisata + UMKM (grid + filter) | 1 jam |
| 3c | Halaman Artikel (list + detail) + seed data | 1 jam |
| 3d | Halaman Lemah Asri | 30 menit |
| 4 | Login + Admin Layout + Dashboard | 1 jam |
| 5a | Data utils + helper | 30 menit |
| 5b | Server functions (5 files) | 1.5 jam |
| 6a | CRUD Wisata (3 routes) | 1 jam |
| 6b | CRUD UMKM (3 routes) | 1 jam |
| 6c | CRUD Artikel (3 routes + TipTap) | 1.5 jam |
| 6d | CRUD Lemah Asri (2 routes) | 45 menit |
| 7a | Floating WA button | 10 menit |
| 7b | Asterisk merah + FormField component | 20 menit |
| 7c | Responsive + testing | 1 jam |
| **Total** | | **~13–15 jam** |

---

## Catatan Penting

1. **Semua field bilingual WAJIB** — tidak ada field EN yang opsional
2. **Asterisk merah** (`*`) ditampilkan di semua label field required
3. **Data seed** artikel akan disiapkan oleh user
4. **Rich text** menggunakan TipTap (bukan textarea biasa) untuk isi artikel
5. **JSON file** sebagai storage — data akan hilang saat redeploy Netlify jika tidak pakai persistent storage (perlu upgrade ke DB nanti)
6. **Auth masih hardcoded** — untuk production perlu integrasi dengan provider auth

---

*Dokumen ini diperbarui: 2 Juli 2026*
