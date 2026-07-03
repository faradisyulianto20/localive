# Plan Implementasi Responsive — Localive Website

## Daftar Isi
1. [Aturan Umum](#1-aturan-umum)
2. [Public Navbar — Mobile Hamburger Menu](#2-public-navbar--mobile-hamburger-menu)
3. [Admin Sidebar → Bottom Nav (Mobile)](#3-admin-sidebar--bottom-nav-mobile)
4. [Halaman Profil Admin Baru](#4-halaman-profil-admin-baru)
5. [Landing Page — Hero Section](#5-landing-page--hero-section)
6. [Landing Page — Profil Section](#6-landing-page--profil-section)
7. [Landing Page — Wisata Section](#7-landing-page--wisata-section)
8. [Landing Page — Produk UMKM Section](#8-landing-page--produk-umkm-section)
9. [Landing Page — Artikel Section](#9-landing-page--artikel-section)
10. [Landing Page — Lemah Asri Section](#10-landing-page--lemah-asri-section)
11. [Landing Page — CTA Section](#11-landing-page--cta-section)
12. [Landing Page — Footer](#12-landing-page--footer)
13. [Halaman Profil (/profil)](#13-halaman-profil-profil)
14. [Halaman Wisata (/wisata)](#14-halaman-wisata-wisata)
15. [Halaman UMKM (/umkm)](#15-halaman-umkm-umkm)
16. [Halaman Artikel (/artikel)](#16-halaman-artikel-artikel)
17. [Halaman Lemah Asri (/lemah-asri)](#17-halaman-lemah-asri-lemah-asri)
18. [Daftar File yang Diubah/Dibuat](#18-daftar-file-yang-diubahdibuat)

---

## 1. Aturan Umum

### 1.1 Pola Font Size Responsive
Gunakan pola ini di semua halaman:
```
/* Heading utama (h1) — di hero pages */
text-3xl md:text-4xl lg:text-5xl

/* Heading section (h2) */
text-2xl md:text-3xl lg:text-4xl

/* Sub-heading (h3) */
text-lg md:text-xl

/* Body text */
text-sm md:text-base (atau text-[15px] md:text-base)

/* Small text / caption */
text-xs md:text-sm
```

### 1.2 Pola Grid Responsive
Gunakan breakpoint secara konsisten:
```
/* 1 kolom → 2 kolom → 3 kolom */
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

/* 1 kolom → 2 kolom */
grid grid-cols-1 md:grid-cols-2

/* 1 kolom → 3 kolom langsung */
grid grid-cols-1 md:grid-cols-3
```

### 1.3 Spacing
```
/* Section padding */
py-12 md:py-16 lg:py-20   (atau py-16 md:py-20)

/* Gap grid */
gap-6 md:gap-8
```

### 1.4 Container
File `src/styles.css` sudah punya class `.page-wrap`:
```css
width: min(1080px, calc(100% - 2rem)); /* sudah responsive */
```
Tidak perlu diubah. Semua section sudah memakainya.

### 1.5 Animasi
Hati-hati dengan animasi `animate-fade-in-up` — pastikan properti `animation-delay` menggunakan `style` prop dan diberi nilai berbeda agar tidak bertumpukan. Animasi sudah ok, jangan diubah.

### 1.6 Image
Semua img sudah pakai `object-cover` dan ukuran relatif. Jangan ubah.

---

## 2. Public Navbar — Mobile Hamburger Menu

**File:** `src/components/navbar.tsx`

### Yang Perlu Diubah:

#### 2.1 Tambah Import
```tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
```

#### 2.2 Tambah State
```tsx
const [mobileOpen, setMobileOpen] = useState(false);
```

#### 2.3 Tombol Hamburger
Letakkan di dalam `<nav>` setelah `<ul>` (atau setelah LanguageToggle), hanya muncul di mobile:
```tsx
<button
  type="button"
  onClick={() => setMobileOpen(!mobileOpen)}
  className="flex md:hidden items-center justify-center h-10 w-10 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
  aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
>
  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>
```

#### 2.4 Backdrop Overlay
Letakkan setelah tag `<nav>` ditutup (`</nav>`), di dalam `<header>`:
```tsx
{mobileOpen && (
  <div
    className="fixed inset-0 z-40 bg-black/50 md:hidden"
    onClick={() => setMobileOpen(false)}
  />
)}
```

#### 2.5 Mobile Drawer
Letakkan setelah backdrop, sebelum `</header>`:
```tsx
<aside
  className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 md:hidden ${
    mobileOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-100">
    <span className="text-lg font-bold text-forest">Menu</span>
    <button
      type="button"
      onClick={() => setMobileOpen(false)}
      className="flex items-center justify-center h-9 w-9 rounded-lg text-neutral-500 hover:bg-neutral-100"
    >
      <X className="h-5 w-5" />
    </button>
  </div>

  <nav className="px-4 py-6">
    <ul className="space-y-1">
      {links.map((link) => {
        const isActive = matchRoute({ to: link.to });
        return (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${
                isActive
                  ? "bg-amber-50 text-amber-700"
                  : "text-neutral-700 hover:bg-neutral-50 hover:text-amber-700"
              }`}
            >
              {t(link.label)}
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>

  <div className="absolute bottom-6 left-0 w-full px-6">
    <LanguageToggle />
  </div>
</aside>
```

#### 2.6 Penjelasan
- Backdrop: layer hitam transparan di belakang drawer, kalau diklik drawer tertutup
- Drawer: slide dari kanan (`translate-x-full` → `translate-x-0`)
- Setiap link punya `onClick` untuk menutup drawer setelah navigasi
- LanguageToggle dipindah ke bagian bawah drawer di mobile

---

## 3. Admin Sidebar → Bottom Nav (Mobile)

**File:** `src/components/admin/admin-sidebar.tsx`

### Yang Perlu Diubah:

#### 3.1 Tambah Import untuk Profil
```tsx
import { LayoutDashboard, Mountain, Store, FileText, Leaf, UserCircle, LogOut } from 'lucide-react'
```
Ganti `LogOut` tetap ada untuk tombol logout.

#### 3.2 Tambah Menu Profil
Di array `menu`, tambah item:
```tsx
{ to: '/admin/profil', label: 'Profil', icon: UserCircle },
```

#### 3.3 Desktop Sidebar — Tambah `hidden md:flex`
Ubah `<aside>`:
```tsx
<aside className="hidden md:flex sticky top-0 h-screen w-60 flex-col border-r border-[#EAEAEC] bg-white">
```

#### 3.4 Hapus Logout dari Desktop Sidebar
Logout sekarang akan dipindah ke halaman Profil. Hapus seluruh `<div className="border-t...">` yang berisi tombol Logout dari sidebar. Nanti logout hanya ada di halaman Profil.

**Jangan lupa:** hapus juga `useNavigate` dari import jika tidak dipakai di sidebar lagi (atau simpan saja, tidak masalah).

#### 3.5 Mobile Bottom Nav — Tambah Setelah `</aside>`
```tsx
{/* Mobile Bottom Navigation */}
<nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EAEAEC] bg-white md:hidden">
  <div className="flex items-center justify-around px-2 py-1">
    {menu.map((item) => {
      const isActive = matchRoute({ to: item.to })
      const Icon = item.icon
      return (
        <Link
          key={item.to}
          to={item.to}
          className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors min-w-0 flex-1 ${
            isActive
              ? 'text-[#111214]'
              : 'text-[#8B8D98] hover:text-[#111214]'
          }`}
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className="truncate">{item.label}</span>
        </Link>
      )
    })}
  </div>
</nav>
```

### 3.6 Admin Layout — Tambah Padding Bottom

**File:** `src/routes/admin.tsx`

Ubah `<main>`:
```tsx
<main className="flex-1 bg-[#F7F7F8] p-4 md:p-8 pb-20 md:pb-8">
  <Outlet />
</main>
```

Penjelasan:
- `pb-20` di mobile memberi ruang untuk bottom nav yang fixed
- `md:pb-8` kembali normal di desktop
- Padding kiri/kanan `p-4` di mobile lebih kecil dari `p-8` desktop

---

## 4. Halaman Profil Admin Baru

**File Baru:** `src/routes/admin/profil.tsx`

### 4.1 Struktur Halaman
```tsx
import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { User, Lock, LogOut } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

export const Route = createFileRoute('/admin/profil')({ component: AdminProfil })

function AdminProfil() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Ambil data admin dari localStorage
  const stored = JSON.parse(localStorage.getItem('admin_token') || '{}')
  const [username] = useState(stored.username || 'admin')

  // Form ganti password
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Semua field harus diisi')
      setMessageType('error')
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('Password baru tidak cocok')
      setMessageType('error')
      return
    }

    if (newPassword.length < 6) {
      setMessage('Password baru minimal 6 karakter')
      setMessageType('error')
      return
    }

    // Simulasi sukses (belum ada API)
    setMessage('Password berhasil diubah (simulasi)')
    setMessageType('success')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate({ to: '/login' })
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111214] mb-8">
        Profil Admin
      </h1>

      {/* Info Akun */}
      <div className="rounded-xl border border-[#EAEAEC] bg-white p-6 mb-6">
        <h2 className="text-base font-semibold text-[#111214] mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-[#10B981]" />
          Informasi Akun
        </h2>
        <div>
          <p className="text-sm text-[#8B8D98]">Username</p>
          <p className="text-sm font-medium text-[#111214]">{username}</p>
        </div>
        <p className="text-xs text-[#8B8D98] mt-4">
          Email dan password saat ini hanya dapat diubah melalui pengaturan sistem.
        </p>
      </div>

      {/* Ganti Password */}
      <div className="rounded-xl border border-[#EAEAEC] bg-white p-6 mb-6">
        <h2 className="text-base font-semibold text-[#111214] mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-[#10B981]" />
          Ganti Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Password Saat Ini</Label>
            <div className="relative mt-1.5">
              <Input
                id="currentPassword"
                type={showPasswords ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword">Password Baru</Label>
            <div className="relative mt-1.5">
              <Input
                id="newPassword"
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <div className="relative mt-1.5">
              <Input
                id="confirmPassword"
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={() => setShowPasswords(!showPasswords)}
              className="rounded"
            />
            Tampilkan password
          </label>

          {message && (
            <p className={`text-sm font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full">
            Simpan Password
          </Button>
        </form>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  )
}
```

### 4.2 Daftarkan Route
Tidak perlu daftar manual — TanStack Router menggunakan file-based routing. File `src/routes/admin/profil.tsx` akan otomatis menjadi route `/admin/profil`.

---

## 5. Landing Page — Hero Section

**File:** `src/components/hero-section.tsx`

### Sudah Responsif
Section ini sudah cukup responsif. Perubahan minimal:

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h1>` | `text-4xl font-bold leading-tight text-white md:text-5xl` | `text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white` |
| Description | `text-[15px]` | `text-sm sm:text-[15px]` |
| Button padding | `px-6 py-3` | `px-5 sm:px-6 py-2.5 sm:py-3` |

### Layout Note
Di mobile, tombol CTA di `<div className="flex-wrap">` sudah otomatis turun ke bawah karena `flex-wrap`. Tidak perlu diubah.

---

## 6. Landing Page — Profil Section

**File:** `src/components/profil-section.tsx`

### Sudah Responsif
Grid `md:grid-cols-2` sudah otomatis 1 kolom di mobile.

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h2>` | `text-3xl font-bold leading-tight md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl font-bold leading-tight` |
| Description | `text-[15px]` | `text-sm sm:text-[15px]` |
| Section padding | `py-16` | `py-12 md:py-16` |

---

## 7. Landing Page — Wisata Section

**File:** `src/components/wisata-section.tsx`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h2>` | `text-3xl font-bold leading-tight md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl font-bold leading-tight` |
| Card title `<h3>` | `text-lg font-bold` | `text-base md:text-lg font-bold` |
| Card description | `text-sm` | (tetap, sudah ok) |
| Section padding | `py-16` | `py-12 md:py-16` |
| Grid gap | `gap-6` | `gap-4 md:gap-6` |

---

## 8. Landing Page — Produk UMKM Section

**File:** `src/components/produk-umkm-section.tsx`

### Carousel Horizontal
Saat ini pakai horizontal scroll. Di mobile:
- Lebar card `w-75` (300px) mungkin terlalu besar untuk HP 360px.
- Tambah breakpoint: `w-64 sm:w-75`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<div className="snap-start shrink-0 w-75">` | `w-75` | `w-60 sm:w-75` |
| `<h2>` | `text-3xl font-bold leading-tight md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl font-bold leading-tight` |

### Scroll Buttons
Tombol left/right chevron di mobile:
```
md:-translate-x-5   →   di mobile: -translate-x-3
md:translate-x-5    →   di mobile: translate-x-3
```
Ubah:
```tsx
className="... -translate-x-3 md:-translate-x-5 ..."
className="... translate-x-3 md:translate-x-5 ..."
```

---

## 9. Landing Page — Artikel Section

**File:** `src/components/artikel-section.tsx`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h2>` | `text-3xl` | `text-2xl md:text-3xl lg:text-4xl` |
| `<h3>` (featured title) | `text-2xl font-bold md:text-3xl` | `text-xl md:text-2xl lg:text-3xl font-bold` |
| Section padding | `py-16` | `py-12 md:py-16` |
| Grid | `lg:grid-cols-2` | (sudah ok — 1 kolom di mobile, 2 di lg) |

---

## 10. Landing Page — Lemah Asri Section

**File:** `src/components/lemah-asri-section.tsx`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h2>` | `text-3xl font-bold md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl font-bold` |
| Card padding | `p-8` | `p-6 md:p-8` |
| Section vertical padding | `py-16` | `py-12 md:py-16` |
| Button CTA | `py-3.5` | `py-3 md:py-3.5` |

### Background Image
Di mobile, background image di kiri dengan gradient hijau di kanan. Pastikan di mobile gradient tetap terbaca:
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-emerald-800/70" />
```
Ini sudah benar. Di mobile tetap memberikan efek gelap di seluruh section.

---

## 11. Landing Page — CTA Section

**File:** `src/components/cta-section.tsx`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h2>` | `text-3xl leading-tight text-white md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl leading-tight text-white` |
| Description | `text-sm md:text-base` | (sudah ok) |
| Section padding | `py-12` | (tetap) |
| Button | `text-sm md:text-base` | (sudah ok) |

---

## 12. Landing Page — Footer

**File:** `src/components/footer.tsx`

### Sudah Responsif
Grid footer sudah responsif: `grid-cols-1 md:grid-cols-[1.3fr_0.8fr_1fr_1fr]`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| Footer padding top | `pt-16` | `pt-12 md:pt-16` |
| Grid gap | `gap-10` | `gap-8 md:gap-10` |

---

## 13. Halaman Profil (/profil)

**File:** `src/routes/profil.tsx`

| Elemen | Lokasi | Sebelum | Sesudah |
|---|---|---|---|
| Hero `<h1>` | baris 67 | `text-4xl font-bold text-white md:text-5xl` | `text-3xl sm:text-4xl md:text-5xl font-bold text-white` |
| Definisi `<h2>` | baris 90 | `text-3xl font-bold leading-tight md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl font-bold leading-tight` |
| Potensi title `<h2>` | baris 107 | `text-3xl font-bold md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl font-bold` |
| Mitra title `<h2>` | baris 136 | `text-3xl font-bold md:text-4xl` | `text-2xl md:text-3xl lg:text-4xl font-bold` |
| Potensi card gap | baris 112 | `gap-6` | `gap-4 md:gap-6` |
| Mitra gap | baris 141 | `gap-6` | `gap-4 md:gap-6` |
| Potensi section padding | baris 104 | `py-16` | `py-12 md:py-16` |
| Mitra section padding | baris 134 | `py-16` | `py-12 md:py-16` |
| Definisi section padding | baris 77 | `py-16` | `py-12 md:py-16` |

### Catatan Hero Page
Semua halaman (Profil, Wisata, UMKM, Artikel, Lemah Asri) punya hero section dengan `min-h-[50vh]` dan `-mt-20`. Ini sengaja untuk menutup navbar. Di mobile, pastikan font di hero tidak terlalu besar.

---

## 14. Halaman Wisata (/wisata)

**File:** `src/routes/wisata.tsx`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h1>` | `text-4xl font-bold` | `text-3xl md:text-4xl font-bold` |
| Grid | `md:grid-cols-3`, gap `gap-5` | Tetap. Tambah `gap-4 md:gap-5` |
| Section padding | `py-16` | `py-12 md:py-16` |
| Filter tab padding | `px-5 py-2` | `px-4 md:px-5 py-1.5 md:py-2` |

### Filter Tabs (baris 34-49)
Di mobile tab filter mungkin kelebihan. Sudah pakai `flex-wrap` jadi akan turun ke baris baru. Tambah `gap-1.5 md:gap-2` untuk spacing yang lebih rapat di mobile.

---

## 15. Halaman UMKM (/umkm)

**File:** `src/routes/umkm.tsx`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h1>` | `text-4xl font-bold` | `text-3xl md:text-4xl font-bold` |
| Grid | `sm:grid-cols-2 lg:grid-cols-3` | Tetap (sudah ok) |
| Grid gap | `gap-6` | `gap-4 md:gap-6` |
| Section padding | `py-16` | `py-12 md:py-16` |
| Filter tab padding | `px-5 py-2` | `px-4 md:px-5 py-1.5 md:py-2` |

---

## 16. Halaman Artikel (/artikel)

**File:** `src/routes/artikel.tsx`

| Elemen | Sebelum | Sesudah |
|---|---|---|
| `<h1>` | `text-4xl font-bold` | `text-3xl md:text-4xl font-bold` |
| Grid | `sm:grid-cols-2 lg:grid-cols-3` | Tetap (sudah ok) |
| Grid gap | `gap-6` | `gap-4 md:gap-6` |
| Section padding | `py-16` | `py-12 md:py-16` |

---

## 17. Halaman Lemah Asri (/lemah-asri)

**File:** `src/routes/lemah-asri.tsx`

| Elemen | Lokasi | Sebelum | Sesudah |
|---|---|---|---|
| Hero `<h1>` | baris 25 | `text-4xl font-bold text-white md:text-5xl` | `text-3xl sm:text-4xl md:text-5xl font-bold text-white` |
| Visi/Misi title `<h2>` | baris 67, 76 | `text-xl font-bold` | `text-lg md:text-xl font-bold` |
| Struktur title `<h2>` | baris 94 | `text-3xl font-bold` | `text-2xl md:text-3xl lg:text-4xl font-bold` |
| Track Record title `<h2>` | baris 115 | `text-3xl font-bold` | `text-2xl md:text-3xl lg:text-4xl font-bold` |
| Info kontak grid | baris 36 | `grid grid-cols-2 gap-4 md:grid-cols-5` | (sudah ok — 2 kolom di mobile) |
| Visi Misi grid | baris 65 | `md:grid-cols-2` | (sudah ok — 1 kolom di mobile) |
| Struktur grid | baris 98 | `sm:grid-cols-2 lg:grid-cols-3` | (sudah ok) |
| Struktur padding card | baris 100 | `p-5` | `p-4 md:p-5` |
| Section padding | baris 64, 92, 114 | `py-16` | `py-12 md:py-16` |

### Info Kontak Cards
Di mobile, grid 2 kolom dengan card yang berisi icon, label, value. Pastikan value tidak overflow:
```tsx
<p className="... text-sm font-medium text-neutral-900 break-words">
  {item.value}
</p>
```

---

## 18. Daftar File yang Diubah/Dibuat

### File Baru
| # | File Path | Keterangan |
|---|---|---|
| 1 | `src/routes/admin/profil.tsx` | Halaman profil admin (lihat username, ganti password, logout) |

### File Diubah
| # | File Path | Perubahan |
|---|---|---|
| 1 | `src/components/navbar.tsx` | Tambah hamburger button, backdrop overlay, mobile drawer |
| 2 | `src/components/admin/admin-sidebar.tsx` | Tambah profil menu, tambah mobile bottom nav, sembunyikan sidebar di mobile, hapus logout section |
| 3 | `src/routes/admin.tsx` | Ubah padding main content (pb-20 di mobile) |
| 4 | `src/components/hero-section.tsx` | Font size heading, padding button |
| 5 | `src/components/profil-section.tsx` | Font size, section padding, gap |
| 6 | `src/components/wisata-section.tsx` | Font size, section padding, card gap |
| 7 | `src/components/produk-umkm-section.tsx` | Lebar card mobile, posisi scroll button |
| 8 | `src/components/artikel-section.tsx` | Font size heading |
| 9 | `src/components/lemah-asri-section.tsx` | Font size, card padding |
| 10 | `src/components/cta-section.tsx` | Font size heading |
| 11 | `src/components/footer.tsx` | Padding, grid gap |
| 12 | `src/routes/profil.tsx` | Font size hero, section headings, section padding, gaps |
| 13 | `src/routes/wisata.tsx` | Font size h1, filter tabs padding, gap, section padding |
| 14 | `src/routes/umkm.tsx` | Font size h1, filter tabs padding, gap, section padding |
| 15 | `src/routes/artikel.tsx` | Font size h1, gap, section padding |
| 16 | `src/routes/lemah-asri.tsx` | Font size headings, section padding, card padding |

---

## Checklist Implementasi (untuk developer)

Gunakan checklist ini untuk memastikan tidak ada yang terlewat:

### Navbar
- [ ] Hamburger button muncul di mobile (`md:hidden`)
- [ ] Drawer slide dari kanan
- [ ] Backdrop gelap di belakang drawer
- [ ] Klik backdrop atau link tutup drawer
- [ ] LanguageToggle di dalam drawer

### Admin
- [ ] Desktop: sidebar tetap kiri (`hidden md:flex`)
- [ ] Mobile: bottom nav fixed di bawah (`fixed bottom-0 md:hidden`)
- [ ] Bottom nav: 6 item (Dashboard, Wisata, UMKM, Artikel, Lemah Asri, Profil)
- [ ] Admin layout: `pb-20 md:pb-8` di main content
- [ ] Halaman `/admin/profil` bisa diakses
- [ ] Logout di halaman profil berfungsi
- [ ] Ganti password di halaman profil (simulasi)

### Setiap Halaman (general)
- [ ] h1: `text-3xl md:text-4xl` (atau `sm:text-4xl md:text-5xl` di hero)
- [ ] h2: `text-2xl md:text-3xl lg:text-4xl`
- [ ] Body text: punya breakpoint (`text-sm md:text-base`)
- [ ] Section padding: `py-12 md:py-16`
- [ ] Grid gaps: `gap-4 md:gap-6`
- [ ] Tidak ada horizontal scroll di mobile (kecuali carousel UMKM yang sengaja)
- [ ] Filter/pagination tabs pakai `flex-wrap` dan gap kecil di mobile

### Visual Check (manual)
- [ ] Buka semua halaman di Chrome DevTools dengan viewport 375px (iPhone SE)
- [ ] Buka semua halaman di viewport 768px (tablet)
- [ ] Buka semua halaman di viewport 1440px (desktop)
- [ ] Cek navbar: hamburger muncul di mobile, drawer terbuka/tertutup mulus
- [ ] Cek admin: bottom nav muncul di mobile, sidebar muncul di desktop
- [ ] Cek admin profil: halaman terbuka, logout dan ganti password berfungsi
