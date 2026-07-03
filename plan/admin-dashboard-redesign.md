# Rencana Redesign Dashboard Admin — Localive

## Cara Penggunaan

Berikan file ini ke **programmer junior atau model AI murah** (seperti Claude Sonnet/GPT-4o-mini).
Instruksi sudah sangat detail: sebutkan file, baris, className yang harus diubah, dan sebelum/sesudah.

**Aturan PENTING:**
- JANGAN ubah logika/data/struktur komponen — hanya ubah className Tailwind dan struktur JSX minimal
- JANGAN tambah library baru
- Semua perubahan hanya di file `src/routes/admin/*` dan `src/components/admin/*`
- Setelah selesai, cek tidak ada shadow-md/shadow-lg/shadow-xl yang tersisa di area admin
- Cek tidak ada warna arbitrary seperti `bg-amber-100`, `bg-blue-100`, `bg-green-100` di dashboard

---

## A. Design Tokens — Palet Warna Baru

Gunakan warna-warna ini secara KONSISTEN di semua komponen admin. Jangan pakai warna lain.

### Background & Card
| Token | Nilai | Penggunaan |
|---|---|---|
| `bg-[#F7F7F8]` | Abu sangat muda | Background halaman admin (ganti dari `bg-neutral-50`) |
| `bg-white` | Putih | Background semua card dan sidebar |
| `border-[#EAEAEC]` | Abu border tipis | Semua border card, sidebar, tabel, divider |

### Teks
| Token | Nilai | Penggunaan |
|---|---|---|
| `text-[#111214]` | Hampir hitam | Heading halaman, angka besar, judul card |
| `text-[#8B8D98]` | Abu gelap | Teks sekunder, subline, label meta |
| `text-[#9CA0AC]` | Abu lebih terang | Label grup sidebar |

### Warna Aksen (hanya untuk indikator, BUKAN background card)
| Token | Nilai | Penggunaan |
|---|---|---|
| `#10B981` (emerald-500) | Hijau | Dot positif, icon sukses, link aksi (ganti `bg-emerald-700`/`text-emerald-700`) |
| `#F59E0B` (amber-500) | Oranye | Dot warning |
| `#EF4444` (red-500) | Merah | Dot negatif/urgent, tombol hapus |
| `#6366F1` (indigo-500) | Biru/Indigo | Aksen chart kedua |
| `#8B5CF6` (violet-500) | Ungu | Aksen chart ketiga |

### Background Pill / Box Sekunder
| Token | Nilai | Penggunaan |
|---|---|---|
| `bg-[#F3F4F6]` | Abu muda | Search bar, badge kategori, box statistik pendukung, nav item hover, active state |
| `bg-[#EAEAEC]` | Abu border | Border, divider, separator |

---

## B. Border Radius

| Elemen | Radius Baru | Ganti dari |
|---|---|---|
| Card utama, table wrapper | `rounded-2xl` (=16px) | sudah `rounded-xl` → upgrade ke `rounded-2xl` |
| Sidebar logo box | `rounded-lg` (=10px) | sudah `rounded-lg` — tetap |
| Search bar (sidebar) | `rounded-lg` | — |
| Nav item (sidebar) | `rounded-lg` | sudah `rounded-lg` — tetap |
| Stat box kecil | `rounded-lg` | — |
| Pill/badge kategori | `rounded-full` | sudah — tetap |
| Button / pill filter | `rounded-full` | — |
| Input, Select, Textarea | `rounded-lg` (dari `rounded-md`) | perlu diubah |

---

## C. Shadow

**HAPUS SEMUA shadow dari card.** Ganti dengan border 1px `border-[#EAEAEC]`.

| Sebelum | Sesudah |
|---|---|
| `shadow-sm` | (hapus) — card hanya pakai `border border-[#EAEAEC]` |
| `shadow-sm hover:shadow-md` | (hapus total) — ganti `hover:border-[#d4d4d6]` kalau perlu efek hover |
| `shadow-xs` di input | (hapus) |

---

## D. Typography

| Elemen | Ukuran & Weight Baru |
|---|---|
| Heading halaman | `text-2xl md:text-3xl font-bold text-[#111214]` |
| Judul card | `text-base md:text-lg font-semibold text-[#111214]` |
| Angka besar / hero number | `text-3xl md:text-4xl font-bold text-[#111214]` |
| Angka pada stat card | `text-2xl md:text-3xl font-bold text-[#111214]` |
| Body / subline | `text-sm text-[#8B8D98]` |
| Label meta (kecil) | `text-xs text-[#8B8D98]` |
| Label grup sidebar | `text-[11px] font-medium uppercase tracking-wider text-[#9CA0AC]` |

---

## E. File-by-File Instructions

### E1. `src/routes/admin.tsx` — Layout Admin

**File ini: `src/routes/admin.tsx` (24 baris)**

**Apa yang diubah:**
1. Background main content dari `bg-neutral-50` → `bg-[#F7F7F8]`
2. Padding main content konsisten `p-8`

**Kode sebelum:**
```tsx
<main className="flex-1 bg-neutral-50 p-8">
```

**Kode sesudah:**
```tsx
<main className="flex-1 bg-[#F7F7F8] p-8">
```

**Baris yang diubah: 19**

---

### E2. `src/components/admin/admin-sidebar.tsx` — Sidebar

**File ini: `src/components/admin/admin-sidebar.tsx` (70 baris)**

**Apa yang diubah secara berurutan:**

#### 1. Logo area (header sidebar) — baris 29-35
**Sebelum:**
```tsx
<aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-neutral-200 bg-white">
  <div className="flex h-16 items-center gap-2 border-b border-neutral-100 px-5">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">
      L
    </div>
    <span className="text-base font-bold text-neutral-900">Admin</span>
  </div>
```

**Sesudah:**
```tsx
<aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-[#EAEAEC] bg-white">
  <div className="flex h-16 items-center gap-3 border-b border-[#EAEAEC] px-5">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981] text-sm font-bold text-white">
      L
    </div>
    <span className="text-lg font-bold text-[#111214]">Admin</span>
  </div>
```

**Perubahan:** `border-neutral-200` → `border-[#EAEAEC]`, `border-neutral-100` → `border-[#EAEAEC]`, `bg-emerald-700` → `bg-[#10B981]`, `text-neutral-900` → `text-[#111214]`, `text-base` → `text-lg`

#### 2. Navigasi — baris 37-55
**Sebelum:**
```tsx
<nav className="flex-1 space-y-1 p-3">
  {menu.map((item) => {
    const isActive = matchRoute({ to: item.to })
    const Icon = item.icon
    return (
      <Link
        key={item.to}
        to={item.to}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-emerald-50 text-emerald-700'
            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
        }`}
      >
        <Icon className="h-4 w-4" />
        {item.label}
      </Link>
    )
  })}
</nav>
```

**Sesudah:**
```tsx
<nav className="flex-1 space-y-1 px-3 py-4">
  {/* Grup label: Menu */}
  <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-[#9CA0AC]">
    Menu
  </p>
  {menu.map((item) => {
    const isActive = matchRoute({ to: item.to })
    const Icon = item.icon
    return (
      <Link
        key={item.to}
        to={item.to}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-[#F3F4F6] text-[#111214]'
            : 'text-[#8B8D98] hover:bg-[#F3F4F6] hover:text-[#111214]'
        }`}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {item.label}
      </Link>
    )
  })}
</nav>
```

**Perubahan:**
- Tambah label grup "Menu" di atas nav items — kecil, uppercase, abu
- `bg-emerald-50 text-emerald-700` → `bg-[#F3F4F6] text-[#111214]` (active state flat, bukan warna brand)
- `text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900` → `text-[#8B8D98] hover:bg-[#F3F4F6] hover:text-[#111214]`
- `h-4 w-4` → `h-4 w-4 shrink-0` (supaya icon tidak mengecil saat teks panjang)

#### 3. Logout button — baris 58-67
**Sebelum:**
```tsx
<div className="border-t border-neutral-100 p-3">
  <button
    type="button"
    onClick={handleLogout}
    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600"
  >
```

**Sesudah:**
```tsx
<div className="border-t border-[#EAEAEC] p-3">
  <button
    type="button"
    onClick={handleLogout}
    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#8B8D98] transition-colors hover:bg-[#F3F4F6] hover:text-[#EF4444]"
  >
```

**Perubahan:** `border-neutral-100` → `border-[#EAEAEC]`, `text-neutral-600` → `text-[#8B8D98]`, `hover:bg-red-50 hover:text-red-600` → `hover:bg-[#F3F4F6] hover:text-[#EF4444]`

---

### E3. `src/routes/admin/index.tsx` — Dashboard Home

**File ini: `src/routes/admin/index.tsx` (92 baris)**

**Apa yang diubah:**

#### 1. Heading — baris 40-42
**Sebelum:**
```tsx
<h1 className="display-title text-2xl font-bold text-neutral-900">
  {t('admin.dashboard.title', 'Dashboard')}
</h1>
```

**Sesudah:**
```tsx
<h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">
  {t('admin.dashboard.title', 'Dashboard')}
</h1>
```

#### 2. Subline — TAMBAHKAN di bawah heading, setelah baris 42
Tambahkan paragraf subline di bawah `<h1>`:
```tsx
<p className="mt-1 text-sm text-[#8B8D98]">
  {t('admin.dashboard.subtitle', 'Kelola konten website Localive')}
</p>
```

#### 3. Stat cards — baris 44-63 (BESAR perubahan)
**Sebelum:**
```tsx
<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
  {stats.map((stat, i) => {
    const Icon = stat.icon
    return (
      <Link
        key={i}
        to={stat.link}
        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="flex items-center justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-3xl font-bold text-neutral-900">{stat.value}</span>
        </div>
        <p className="mt-3 text-sm font-medium text-neutral-600">{stat.label}</p>
      </Link>
    )
  })}
</div>
```

**Sesudah:**
```tsx
<div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
  {stats.map((stat, i) => {
    const Icon = stat.icon
    return (
      <Link
        key={i}
        to={stat.link}
        className="rounded-2xl border border-[#EAEAEC] bg-white p-6 transition-colors hover:border-[#d4d4d6]"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#8B8D98]">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-2xl md:text-3xl font-bold text-[#111214]">{stat.value}</span>
        </div>
        <p className="mt-4 text-sm text-[#8B8D98]">{stat.label}</p>
      </Link>
    )
  })}
</div>
```

**Perubahan detail:**
- `gap-6` → `gap-5`
- Hapus `shadow-sm transition-shadow hover:shadow-md` → tambah `transition-colors hover:border-[#d4d4d6]`
- `border-neutral-200` → `border-[#EAEAEC]`
- Hapus `stat.color` sepenuhnya (`bg-amber-100 text-amber-700` dll.) — icon box jadi `bg-[#F3F4F6] text-[#8B8D98]`
- Icon container: `h-12 w-12 rounded-xl` → `h-10 w-10 rounded-lg`
- Icon: `h-6 w-6` → `h-5 w-5`
- Angka: `text-3xl` → `text-2xl md:text-3xl`, `text-neutral-900` → `text-[#111214]`
- Label: `text-sm font-medium text-neutral-600` → `text-sm text-[#8B8D98]`

#### 4. Quick Actions section — baris 65-89
**Sebelum:**
```tsx
<div className="mt-10">
  <h2 className="display-title text-lg font-semibold text-neutral-900">
    {t('admin.dashboard.quickActions', 'Aksi Cepat')}
  </h2>
  <div className="mt-4 flex flex-wrap gap-3">
    <Link to="/admin/wisata/new">
      <Button>
        <Plus className="h-4 w-4" />
        {t('admin.dashboard.addWisata', 'Tambah Wisata')}
      </Button>
    </Link>
    <Link to="/admin/umkm/new">
      <Button variant="secondary">
        <Plus className="h-4 w-4" />
        {t('admin.dashboard.addUMKM', 'Tambah UMKM')}
      </Button>
    </Link>
    <Link to="/admin/artikel/new">
      <Button variant="secondary">
        <Plus className="h-4 w-4" />
        {t('admin.dashboard.addArtikel', 'Tambah Artikel')}
      </Button>
    </Link>
  </div>
</div>
```

**Sesudah:**
```tsx
<div className="mt-8">
  <h2 className="text-base font-semibold text-[#111214]">
    {t('admin.dashboard.quickActions', 'Aksi Cepat')}
  </h2>
  <div className="mt-4 flex flex-wrap gap-3">
    <Link to="/admin/wisata/new">
      <Button>
        <Plus className="h-4 w-4" />
        {t('admin.dashboard.addWisata', 'Tambah Wisata')}
      </Button>
    </Link>
    <Link to="/admin/umkm/new">
      <Button variant="secondary">
        <Plus className="h-4 w-4" />
        {t('admin.dashboard.addUMKM', 'Tambah UMKM')}
      </Button>
    </Link>
    <Link to="/admin/artikel/new">
      <Button variant="secondary">
        <Plus className="h-4 w-4" />
        {t('admin.dashboard.addArtikel', 'Tambah Artikel')}
      </Button>
    </Link>
  </div>
</div>
```

**Perubahan:** `mt-10` → `mt-8`, hapus `display-title`, `text-lg font-semibold text-neutral-900` → `text-base font-semibold text-[#111214]`

#### 5. Hapus array `stats` — bagian `color` property tidak dipakai lagi
Pada definisi stats (baris 14-36), hapus properti `color` dari tiap objek:
```tsx
const stats = [
  { label: 'Total Wisata', value: wisataData.items.length, icon: Mountain, link: '/admin/wisata' },
  { label: 'Total UMKM', value: umkmData.items.length, icon: Store, link: '/admin/umkm' },
  { label: 'Total Artikel', value: artikelData.length, icon: FileText, link: '/admin/artikel' },
]
```

---

### E4. Semua List Pages — Pattern Seragam

Tiga file ini pola-nya SAMA PERSIS, beda sedikit kolom tabel:
- `src/routes/admin/wisata/index.tsx` (108 baris)
- `src/routes/admin/umkm/index.tsx` (96 baris)
- `src/routes/admin/artikel/index.tsx` (99 baris)

**Ulangi perubahan berikut di KETIGA file:**

#### 1. Heading — baris 37-47 (wisata), 37-46 (umkm), 37-47 (artikel)
**Pola sebelum (di semua file):**
```tsx
<h1 className="display-title text-2xl font-bold text-neutral-900">
```

**Pola sesudah (di semua file):**
```tsx
<h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">
```

#### 2. Subline — TAMBAHKAN di bawah heading
**Tambahkan baris baru setelah `<h1>`:**
```tsx
<p className="mt-1 text-sm text-[#8B8D98]">
  Kelola data wisata / UMKM / artikel (sesuaikan konteks)
</p>
```

#### 3. Table wrapper — baris 54 (wisata), 54 (umkm), 53 (artikel)
**Sebelum:**
```tsx
<div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
```

**Sesudah:**
```tsx
<div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
```

#### 4. Table head — baris 56-63 (wisata), 56-63 (umkm), 55-63 (artikel)
**Sebelum:**
```tsx
<thead className="border-b border-neutral-200 bg-neutral-50">
  <tr>
    <th className="px-4 py-3 font-semibold text-neutral-600">
```

**Sesudah:**
```tsx
<thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
  <tr>
    <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">
```

#### 5. Table rows — baris 66-101 (wisata), 66-90 (umkm), 66-92 (artikel)
**Sebelum:**
```tsx
<tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50">
  <td className="px-4 py-3">
```

**Sesudah:**
```tsx
<tr key={item.id} className="border-b border-[#EAEAEC] hover:bg-[#F7F7F8]">
  <td className="px-5 py-3.5">
```

#### 6. Table cell images — baris 69 (wisata), 69 (umkm), 69 (artikel)
**Sebelum:**
```tsx
<img src={item.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
```

**Sesudah:**
```tsx
<img src={item.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
```

#### 7. Category badge — baris 73-76 (wisata), 73-75 (umkm), 75-77 (artikel)
**Sebelum:**
```tsx
<span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
```

**Sesudah:**
```tsx
<span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#8B8D98]">
```

#### 8. Cell text "font-medium text-neutral-900" — di semua file
**Sebelum:**
```tsx
<td className="px-4 py-3 font-medium text-neutral-900">{item.title.id}</td>
```

**Sesudah:**
```tsx
<td className="px-5 py-3.5 text-sm text-[#111214]">{item.title.id}</td>
```

#### 9. Text mutlak (seperti ID, telepon, tanggal, penulis)
**Sebelum:**
```tsx
<td className="px-4 py-3 text-xs text-neutral-500">{item.id.slice(0, 12)}...</td>
<td className="px-4 py-3 text-neutral-600">{item.noTelp}</td>
<td className="px-4 py-3 text-neutral-600">{formatDate(item.tanggal)}</td>
```

**Sesudah:**
```tsx
<td className="px-5 py-3.5 text-xs text-[#8B8D98]">{item.id.slice(0, 12)}...</td>
<td className="px-5 py-3.5 text-sm text-[#8B8D98]">{item.noTelp}</td>
<td className="px-5 py-3.5 text-sm text-[#8B8D98]">{formatDate(item.tanggal)}</td>
```

#### 10. Aksi column (icon buttons) — di semua file
Ubah container class `px-4 py-3` → `px-5 py-3.5`

---

### E5. Form Pages — Semua Create/Edit

Ada 7 file form:
1. `src/routes/admin/wisata/new.tsx` (111 baris)
2. `src/routes/admin/wisata/$id.edit.tsx` (123 baris)
3. `src/routes/admin/umkm/new.tsx` (120 baris)
4. `src/routes/admin/umkm/$id.edit.tsx` (128 baris)
5. `src/routes/admin/artikel/new.tsx` (114 baris)
6. `src/routes/admin/artikel/$id.edit.tsx` (122 baris)
7. `src/routes/admin/lemah-asri/edit.tsx` (189 baris)

**Pattern di semua form identik.** Lakukan perubahan berikut di KETUJUH file:

#### 1. Hapus shadow dari Card
Card menggunakan shadcn Card component (`src/components/ui/card.tsx`) yang punya `rounded-xl border bg-card text-card-foreground shadow-sm`.

**Cara: tambah `className` ke Card untuk override:**
```tsx
<Card className="shadow-none border-[#EAEAEC] rounded-2xl">
```
(langsung ke baris yang membungkus form, misalnya baris 64 di `wisata/new.tsx`)

#### 2. CardTitle
**Sebelum:**
```tsx
<CardTitle>{t('admin.wisata.add', 'Tambah Wisata')}</CardTitle>
```

**Sesudah:**
```tsx
<CardTitle className="text-lg font-semibold text-[#111214]">{t('admin.wisata.add', 'Tambah Wisata')}</CardTitle>
```

#### 3. Input fields — rounded-lg
Shadcn Input default `rounded-md`. Untuk mengubahnya, tambah className ke setiap `<Input>`:
```tsx
<Input className="rounded-lg border-[#EAEAEC]" value={...} ... />
```

#### 4. SelectTrigger — rounded-lg
Di setiap `<SelectTrigger>`, tambah:
```tsx
<SelectTrigger className="rounded-lg border-[#EAEAEC]">
```

#### 5. Textarea — rounded-lg
```tsx
<Textarea className="rounded-lg border-[#EAEAEC]" rows={4} ... />
```

#### 6. Form error text
`src/components/admin/form-field.tsx` — baris error:
**Sebelum:** `text-xs font-medium text-red-500`
**Sesudah:** `text-xs text-[#EF4444]`

---

### E6. `src/routes/admin/lemah-asri/index.tsx` — View Page

**File ini: `src/routes/admin/lemah-asri/index.tsx` (83 baris)**

#### 1. Heading — baris 15-17
**Sebelum:**
```tsx
<h1 className="display-title text-2xl font-bold text-neutral-900">
```

**Sesudah:**
```tsx
<h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">
```

#### 2. Card wrapper — semua card di halaman ini
**Pola sebelum (berulang di baris 25, 40, 44, 57, 69):**
```tsx
<div className="rounded-xl border border-neutral-200 bg-white p-6">
```

**Pola sesudah:**
```tsx
<div className="rounded-2xl border border-[#EAEAEC] bg-white p-6">
```

#### 3. Card headings — semua `<h2>` di halaman ini
**Pola sebelum:**
```tsx
<h2 className="text-lg font-semibold text-neutral-900">
```

**Pola sesudah:**
```tsx
<h2 className="text-base font-semibold text-[#111214]">
```

#### 4. Label data (dt) — semua di halaman ini
**Pola sebelum:**
```tsx
<dt className="text-xs font-semibold text-neutral-500 uppercase">
```

**Pola sesudah:**
```tsx
<dt className="text-xs font-medium text-[#8B8D98] uppercase tracking-wider">
```

#### 5. Data value (dd) — semua
**Pola sebelum:**
```tsx
<dd className="mt-1 text-sm text-neutral-900">
```

**Pola sesudah:**
```tsx
<dd className="mt-1 text-sm text-[#111214]">
```

#### 6. Visi & Misi text — baris 42-43, 47-53
**Sebelum:**
```tsx
<p className="mt-2 text-sm text-neutral-600">
```
dan
```tsx
<li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
```

**Sesudah:**
```tsx
<p className="mt-2 text-sm text-[#8B8D98]">
```
dan
```tsx
<li key={i} className="flex items-start gap-2 text-sm text-[#8B8D98]">
  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]" />
```

#### 7. Struktur Organisasi cards — baris 60-65
**Sebelum:**
```tsx
<div key={i} className="rounded-lg bg-neutral-50 p-4">
  <p className="text-xs font-semibold uppercase text-amber-700">{item.jabatan}</p>
  <p className="mt-1 text-sm font-medium text-neutral-900">{item.nama}</p>
</div>
```

**Sesudah:**
```tsx
<div key={i} className="rounded-lg bg-[#F3F4F6] p-4">
  <p className="text-xs font-medium uppercase text-[#8B8D98]">{item.jabatan}</p>
  <p className="mt-1 text-sm font-medium text-[#111214]">{item.nama}</p>
</div>
```

#### 8. Track Record — baris 72-77
**Sebelum:**
```tsx
<div key={i} className="flex items-center gap-3 rounded-lg bg-neutral-50 px-4 py-2.5">
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">{i + 1}</span>
  <span className="text-sm text-neutral-700">{item}</span>
</div>
```

**Sesudah:**
```tsx
<div key={i} className="flex items-center gap-3 rounded-lg bg-[#F3F4F6] px-4 py-2.5">
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] text-xs font-bold text-white">{i + 1}</span>
  <span className="text-sm text-[#111214]">{item}</span>
</div>
```

---

### E7. `src/components/admin/tiptap-editor.tsx` — Rich Text Editor

**File ini: `src/components/admin/tiptap-editor.tsx` (94 baris)**

#### 1. Editor wrapper — baris 32-38
**Sebelum:**
```tsx
<div className={`rounded-md border border-input overflow-hidden ${error ? 'border-red-500' : ''}`}>
```

**Sesudah:**
```tsx
<div className={`rounded-lg border border-[#EAEAEC] overflow-hidden ${error ? 'border-[#EF4444]' : ''}`}>
```

#### 2. Toolbar — baris 29-30
**Sebelum:**
```tsx
<div className="border-b bg-muted/50 p-1.5 flex flex-wrap gap-1">
```

**Sesudah:**
```tsx
<div className="border-b border-[#EAEAEC] bg-[#F7F7F8] p-1.5 flex flex-wrap gap-1">
```

---

## F. Ringkasan Semua File yang Diubah

| # | File | Tingkat Perubahan |
|---|---|---|
| 1 | `src/routes/admin.tsx` | 1 baris (bg color) |
| 2 | `src/components/admin/admin-sidebar.tsx` | Sedang (~15 baris) |
| 3 | `src/routes/admin/index.tsx` | Besar (~30 baris) |
| 4 | `src/routes/admin/wisata/index.tsx` | Sedang (~15 baris) |
| 5 | `src/routes/admin/umkm/index.tsx` | Sedang (~15 baris) |
| 6 | `src/routes/admin/artikel/index.tsx` | Sedang (~15 baris) |
| 7 | `src/routes/admin/wisata/new.tsx` | Kecil (~5 baris) |
| 8 | `src/routes/admin/wisata/$id.edit.tsx` | Kecil (~5 baris) |
| 9 | `src/routes/admin/umkm/new.tsx` | Kecil (~5 baris) |
| 10 | `src/routes/admin/umkm/$id.edit.tsx` | Kecil (~5 baris) |
| 11 | `src/routes/admin/artikel/new.tsx` | Kecil (~5 baris) |
| 12 | `src/routes/admin/artikel/$id.edit.tsx` | Kecil (~5 baris) |
| 13 | `src/routes/admin/lemah-asri/index.tsx` | Sedang (~20 baris) |
| 14 | `src/routes/admin/lemah-asri/edit.tsx` | Kecil (~5 baris) |
| 15 | `src/components/admin/tiptap-editor.tsx` | Kecil (~3 baris) |
| 16 | `src/components/admin/form-field.tsx` | Kecil (~1 baris, error color) |

**Total: 16 file**

---

## G. Urutan Eksekusi yang Disarankan

1. **Sidebar dulu** (`admin-sidebar.tsx`) — perubahan paling terlihat
2. **Dashboard home** (`admin/index.tsx`) — hapus warna-warna mencolok
3. **Semua list pages** — pola seragam, kerjakan berurutan
4. **Semua form pages** — tambah className override di Card, Input, Select
5. **Lemah Asri view** — ubah semua warna dan spacing
6. **TipTap & FormField** — ubah border & error color
7. **Cek konsistensi** — pastikan tidak ada shadow/shadow-sm, tidak ada `bg-amber-100`/`bg-blue-100`/`bg-green-100`, semua border pakai `#EAEAEC`

---

## H. Checklist Final (Pastikan Sebelum Selesai)

- [ ] Tidak ada `shadow-sm` / `shadow-md` / `shadow-lg` / `shadow-xl` di area admin
- [ ] Semua card menggunakan `border border-[#EAEAEC]` bukan shadow untuk pemisah visual
- [ ] Tidak ada `bg-amber-100`, `bg-blue-100`, `bg-green-100` (stat card dashboard)
- [ ] Tidak ada `bg-emerald-50`, `bg-emerald-700`, `text-emerald-700` (active sidebar state)
- [ ] Tidak ada `bg-neutral-50` sebagai background halaman (ganti `bg-[#F7F7F8]`)
- [ ] Tidak ada `border-neutral-100`, `border-neutral-200` (ganti `border-[#EAEAEC]`)
- [ ] Tidak ada `text-neutral-900` (ganti `text-[#111214]`)
- [ ] Tidak ada `text-neutral-600`, `text-neutral-500` (ganti `text-[#8B8D98]`)
- [ ] Semua input/select/textarea menggunakan `rounded-lg`
- [ ] Sidebar logo menggunakan `bg-[#10B981]`
- [ ] Sidebar active state menggunakan `bg-[#F3F4F6] text-[#111214]`
- [ ] Sidebar ada label grup "Menu" di atas nav items (text-[11px] uppercase)
- [ ] Semua heading halaman konsisten `text-2xl md:text-3xl font-bold text-[#111214]`
- [ ] Setiap halaman punya subline di bawah heading (`text-sm text-[#8B8D98]`)
