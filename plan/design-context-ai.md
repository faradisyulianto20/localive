
# Design Context — Localive Website (Desa Wisata Tamanan)

Gunakan dokumen ini sebagai konteks untuk AI design (UI/UX) agar menghasilkan desain yang sesuai dengan sistem yang sudah ada.

---

## 1. Project Overview

| Atribut | Value |
|---|---|
| Nama | Localive — Website Desa Wisata Tamanan |
| Domain | desa-wisata.biz |
| Framework | React 19 + TanStack Start (SSR) |
| Styling | Tailwind CSS v4 + shadcn/ui (New York style) |
| Icons | Lucide React v0.577 |
| Animasi | tw-animate-css + custom keyframes |
| i18n | react-i18next (ID / EN) |
| Font | Plus Jakarta Sans (Google Fonts) |
| Package Manager | pnpm |

---

## 2. Brand Colors (Tailwind v4 `@theme` tokens)

| Token | Hex | Usage |
|---|---|---|
| `forest` / `--forest` | `#0B592F` | Primary text, headings, buttons |
| `olive` | `#8CA70A` | Accent, hover states |
| `brown` | `#774F2F` | Secondary text, kicker labels |
| `cream` | `#F0E7D8` | Background tint |
| `gold` | `#FFC639` | Highlight |
| `terracotta` | `#DF703B` | Destructive/warning |
| `amber-700` | `#B45309` | Active nav link, CTA buttons, section kickers |
| `emerald-600/700/800` | Various | Hero accents, tags, UI accents |
| `neutral-500/600/900` | Various | Body text, muted text |
| `#10B981` | - | Admin sidebar logo accent |
| `#EAEAEC` | - | Admin sidebar borders |
| `#F3F4F6` | - | Admin sidebar active bg |
| `#8B8D98` | - | Admin sidebar inactive text |
| `#111214` | - | Admin sidebar active text |
| `#F7F7F8` | - | Admin main content bg |
| `#9CA0AC` | - | Admin menu label text |

### How to use in Tailwind
```tsx
className="text-forest bg-amber-700 text-white border-emerald-700"
```
Custom colors are registered in `@theme inline {}` in `styles.css`.

---

## 3. Typography

### Font
- **Family:** `Plus Jakarta Sans` (weights 400, 500, 600, 700, 800)
- **Utility class:** `.display-title` untuk heading (sama dengan font-sans)
- **Kicker class:** `.island-kicker` — uppercase, tracking-wide, `font-size: 0.69rem`

### Responsive Font Size Pattern (WAJIB diikuti)

| Level | Mobile | Tablet (`sm:`) | Desktop (`md:`) | Large (`lg:`) |
|---|---|---|---|---|
| **h1 (hero title)** | `text-3xl` | `sm:text-4xl` | `md:text-5xl` | - |
| **h1 (page title)** | `text-3xl` | - | `md:text-4xl` | - |
| **h2 (section title)** | `text-2xl` | - | `md:text-3xl` | `lg:text-4xl` |
| **h3 (card title)** | `text-base` | - | `md:text-lg` | - |
| **Body text** | `text-sm` | `sm:text-[15px]` | - | - |
| **Small / caption** | `text-xs` | - | `md:text-sm` | - |
| **Button text** | `text-sm` | - | - | - |
| **Nav link** | `text-[15px]` | - | - | - |

### Contoh implementasi:
```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Hero Title</h1>
<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Section Title</h2>
<p className="text-sm sm:text-[15px] leading-relaxed">Body text here</p>
```

---

## 4. Spacing & Layout

### Container
```css
.page-wrap {
  width: min(1080px, calc(100% - 2rem));
  margin-inline: auto;
}
```
Semua section di landing page menggunakan `.page-wrap`.

### Section Padding
```tsx
className="py-12 md:py-16"   // standard section
className="py-12"             // CTA section (lebih kecil)
```

### Grid Gaps
```tsx
gap-4 md:gap-6    // standard grid gap
gap-4 md:gap-5    // tighter grid (wisata listing)
```

### Card Padding
```tsx
p-6 md:p-8        // larger cards (lemah asri, profil)
p-4 md:p-5        // smaller cards (struktur organisasi)
```

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Usage |
|---|---|---|
| `sm:` | 640px | Tablet kecil (grid 2 kolom, font size step) |
| `md:` | 768px | Tablet besar (sidebar muncul, nav links muncul, grid 2-3 kolom) |
| `lg:` | 1024px | Desktop (grid 3-4 kolom, font size step) |
| `xl:` | 1280px | Jarang dipakai |

### Mobile-first approach
- Default style = mobile
- Tambah breakpoint untuk layar lebih besar

---

## 6. Navigation Patterns

### 6.1 Public Navbar (`src/components/navbar.tsx`)

**Desktop (`md:` ke atas):**
- Sticky header dengan scroll detection
- Logo kiri, 6 nav links tengah, LanguageToggle kanan
- Saat scroll > 50px: `top-2`, `w-[90%]`, `rounded-2xl`, `shadow-lg`, `backdrop-blur-md`
- Saat di atas: `top-0`, `w-full`, `rounded-none rounded-b-3xl`
- Active link: `text-amber-700 underline decoration-2 underline-offset-[6px]`
- Inactive link: `text-forest hover:text-amber-700`

**Mobile (`< md`):**
- Logo kiri, LanguageToggle + hamburger icon kanan
- Hamburger icon: `Menu`/`X` dari Lucide
- Drawer slide dari kanan: `fixed top-0 right-0 z-50 h-full w-72`
- Backdrop: `fixed inset-0 z-40 bg-black/50`
- Nav links dalam drawer: `rounded-lg px-4 py-3`
- Active link di drawer: `bg-amber-50 text-amber-700`
- Inactive link di drawer: `text-neutral-700 hover:bg-neutral-50 hover:text-amber-700`
- LanguageToggle di bagian bawah drawer

### 6.2 Admin Navigation (`src/components/admin/admin-sidebar.tsx`)

**Desktop (`md:` ke atas):**
- Sidebar kiri: `hidden md:flex sticky top-0 h-screen w-60`
- Logo "L" + label "Admin" di header
- 6 menu item: Dashboard, Wisata, UMKM, Artikel, Lemah Asri, Profil
- Active item: `bg-[#F3F4F6] text-[#111214]`
- Inactive item: `text-[#8B8D98] hover:bg-[#F3F4F6] hover:text-[#111214]`

**Mobile (`< md`):**
- Sidebar disembunyikan
- Bottom navigation: `fixed bottom-0 left-0 right-0 z-40 border-t bg-white`
- 6 icon + label: Dashboard, Wisata, UMKM, Artikel, Lemah Asri, Profil
- Icon size: `h-5 w-5`, label: `text-[11px]`
- Active: `text-[#111214]`, Inactive: `text-[#8B8D98]`
- Main content: `pb-20 md:pb-8` untuk memberi ruang bottom nav

---

## 7. Component Patterns

### Cards
```tsx
// Standard card dengan glassmorphism
className="feature-card rounded-2xl p-6"  // atau rounded-xl p-5

// Image card dengan gradient overlay
className="group relative aspect-[4/3] overflow-hidden rounded-xl"
// + gradient: bg-gradient-to-t from-emerald-950/90 via-emerald-900/30 to-transparent
```

### Filter Tabs
```tsx
// Container
className="flex flex-wrap gap-1.5 md:gap-2"
// Active tab
className="rounded-full px-4 md:px-5 py-1.5 md:py-2 text-sm font-semibold bg-amber-700 text-white"
// Inactive tab
className="rounded-full px-4 md:px-5 py-1.5 md:py-2 text-sm font-semibold bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
```

### Buttons
```tsx
// Primary CTA
className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white hover:bg-amber-800"
// Secondary (outline)
className="inline-flex items-center gap-2 rounded-full border-2 border-amber-700 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-amber-700 hover:bg-amber-50"
```

### Section Structure
```tsx
<section className="page-wrap py-12 md:py-16">
  {/* Header */}
  <div className="mx-auto max-w-2xl text-center">
    <p className="island-kicker">KICKER TEXT</p>
    <h2 className="display-title text-forest mt-2 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
      Section Title
    </h2>
  </div>
  {/* Content grid */}
  <div className="mt-10 grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
    {/* cards */}
  </div>
</section>
```

### Hero Sections (static pages)
```tsx
<section className="relative flex items-end min-h-[50vh] overflow-hidden -mt-20">
  <img src="..." alt="..." className="absolute inset-0 h-full w-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
  <div className="page-wrap relative z-10 w-full pb-16">
    <span className="text-sm font-semibold uppercase tracking-wide text-emerald-400">Kicker</span>
    <h1 className="display-title mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
      Title
    </h1>
  </div>
</section>
```

---

## 8. Animation Patterns

| Animasi | Durasi | Easing | Usage |
|---|---|---|---|
| `animate-fade-in-up` | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Section entrance, cards |
| `.rise-in` | 700ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Page header title |
| `animate-fade-in` | 500ms | `ease` | Simple fade |

Delay pattern untuk staggered animation:
```tsx
style={{ animationDelay: `${index * 100}ms` }}
style={{ animationDelay: '150ms' }}
style={{ animationDelay: '300ms' }}
```

---

## 9. Admin Panel

### Admin Layout (`src/routes/admin.tsx`)
- Auth guard (localStorage `admin_token`)
- Layout: `flex min-h-screen` dengan sidebar + main content
- Main: `flex-1 bg-[#F7F7F8] p-4 md:p-8 pb-20 md:pb-8`

### Admin Profil Page (`/admin/profil`)
- Form ganti password (simulasi — belum ada API)
- Tampilkan username dari localStorage
- Tombol logout (hapus token + redirect ke `/login`)

### Admin CRUD Pages
- Wisata, UMKM, Artikel: list → new → edit (`$id.edit.tsx`)
- Lemah Asri: view → edit
- Form menggunakan shadcn/ui components (Input, Label, Button, Select, Textarea)
- Rich text editor: TipTap

---

## 10. Existing Animations (Keyframes)

```css
@keyframes rise-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

Utility classes: `.rise-in`, `.animate-fade-in-up`, `.animate-fade-in`

---

## 11. CSS Utility Classes

| Class | Purpose |
|---|---|
| `.page-wrap` | Container: `width: min(1080px, calc(100% - 2rem)); margin-inline: auto;` |
| `.display-title` | Heading font (sama dengan body font) |
| `.island-shell` | Glass card dengan border + shadow + blur |
| `.feature-card` | Card dengan gradient + shadow + hover effect |
| `.island-kicker` | Small uppercase label (0.69rem, tracking-wide) |
| `.scrollbar-hide` | Hide scrollbar (for carousel) |
| `.site-footer` | Footer styling |
| `.nav-link` | Nav link dengan underline animation |

---

## 12. File Structure (Components)

```
src/components/
├── admin/
│   ├── admin-sidebar.tsx      # Sidebar (desktop) + Bottom nav (mobile)
│   ├── form-field.tsx
│   └── tiptap-editor.tsx      # Rich text editor
├── ui/
│   ├── button.tsx             # shadcn/ui button
│   ├── card.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── select.tsx
│   ├── slider.tsx
│   ├── switch.tsx
│   └── textarea.tsx
├── navbar.tsx                 # Public navbar (hamburger + drawer mobile)
├── hero-section.tsx
├── profil-section.tsx
├── wisata-section.tsx
├── produk-umkm-section.tsx
├── artikel-section.tsx
├── lemah-asri-section.tsx
├── cta-section.tsx
├── footer.tsx
├── page-header.tsx
├── language-toggle.tsx
├── wisata-card.tsx
├── umkm-card.tsx
├── artikel-card.tsx
├── artikel-card-featured.tsx
└── artikel-card-list.tsx
```

---

## 13. Common Mistakes to Avoid

1. ❌ Jangan pakai `px-6 py-3` tanpa breakpoint di mobile → pakai `px-5 sm:px-6 py-2.5 sm:py-3`
2. ❌ Jangan pakai `text-4xl` tanpa `md:` variant untuk page title → pakai `text-3xl md:text-4xl`
3. ❌ Jangan pakai `gap-6` tanpa `md:` variant → pakai `gap-4 md:gap-6`
4. ❌ Jangan pakai `py-16` tanpa `md:` variant → pakai `py-12 md:py-16`
5. ❌ Jangan lupa `-mt-20` di hero section static pages (untuk overlap navbar)
6. ❌ Jangan tambah horizontal scroll yang tidak disengaja di mobile
7. ❌ Jangan gunakan `w-75` di mobile → pakai `w-60 sm:w-75`
8. ❌ Jangan lupa `pb-20 md:pb-8` di admin layout main content

---

## 14. Responsive Checklist (untuk setiap halaman baru)

- [ ] h1: `text-3xl md:text-4xl` atau `text-3xl sm:text-4xl md:text-5xl` (hero)
- [ ] h2: `text-2xl md:text-3xl lg:text-4xl`
- [ ] h3: `text-base md:text-lg`
- [ ] Body text: `text-sm sm:text-[15px]` atau `text-sm md:text-base`
- [ ] Section padding: `py-12 md:py-16`
- [ ] Grid gap: `gap-4 md:gap-6`
- [ ] Filter tabs: `gap-1.5 md:gap-2`, `px-4 md:px-5 py-1.5 md:py-2`
- [ ] Buttons: `px-5 sm:px-6 py-2.5 sm:py-3`
- [ ] Tidak ada overflow horizontal
- [ ] Cek viewport 375px (iPhone SE), 768px (tablet), 1440px (desktop)
