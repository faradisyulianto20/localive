# Setup Color & Font — Localive

## Font
- **Plus Jakarta Sans** (400, 500, 600, 700, 800)

## Color Palette

| Name | Hex | Role |
|---|---|---|
| Cream | `#F0E7D8` | Background dasar, surface |
| Olive | `#8CA70A` | Accent brand, interactive |
| Forest | `#0B592F` | Primary, heading, teks |
| Brown | `#774F2F` | Secondary, muted |
| Gold | `#FFC639` | Warning, highlight |
| Terracotta | `#DF703B` | CTA, destructive |

## Execution Steps

1. **Font** — Ganti Google Fonts import & `--font-sans` di `src/styles.css`
2. **Light palette** — Ganti `:root` CSS custom properties
3. **Dark palette** — Ganti `.dark` CSS custom properties
4. **shadcn/ui vars** — Update `:root` & `.dark` shadcn variables
5. **Background effects** — Update gradients, body overlays
6. **Title & meta** — Update `__root.tsx`
7. **Index page** — Update landing placeholder
8. **Public assets** — Hapus lama (favicon, logo, robots)
9. **Cleanup** — Hapus referensi warna lama di seluruh projek
