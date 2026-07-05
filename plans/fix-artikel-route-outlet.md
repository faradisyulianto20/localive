# Fix: Artikel Detail Route Tidak Tampil

## Masalah

Halaman `/artikel/selamat-datang-di-tamanan` tidak menampilkan detail artikel,
malah menampilkan halaman daftar artikel (`/artikel`).

## Root Cause

Di TanStack Router, route `/artikel` memiliki child route `/artikel/$id`.
Ketika sebuah route memiliki child, component parent berfungsi sebagai **layout**
dan **WAJIB** menyertakan `<Outlet />` dari `@tanstack/react-router`
untuk merender component child.

**File:** `src/routes/artikel.tsx`

Komponen `Artikel` tidak memiliki `<Outlet />`, sehingga saat router mencocokkan
route `/artikel/$id`:
1. Router menemukan `ArtikelRoute` (parent) + `ArtikelIdRoute` (child) ✅
2. Komponen `Artikel` (daftar artikel) dirender
3. Tanpa `<Outlet />`, komponen `ArtikelDetail` (child) **tidak dirender** ❌
4. User hanya melihat halaman daftar artikel

**Bandingkan dengan** `src/routes/admin.tsx` yang sudah benar menggunakan `<Outlet />`
di line 20, sehingga semua child-nya dapat dirender.

## Solusi

Tambahkan `Outlet` + `useMatches` di `src/routes/artikel.tsx`:
- Jika user di child route (`/artikel/$id`), render `<Outlet />`
- Jika user di root route (`/artikel`), tampilkan daftar artikel seperti biasa

## File yang Diubah

- `src/routes/artikel.tsx`
