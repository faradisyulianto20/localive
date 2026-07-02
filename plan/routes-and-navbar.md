# Routes & Navbar — Localive

## Route Structure

```
src/routes/
├── __root.tsx         ← Layout (Navbar + i18n provider)
├── index.tsx          ← /           Beranda
├── profil.tsx         ← /profil     → "Profil Desa Wisata Prenggan"
├── destinasi.tsx      ← /destinasi  → "Atraksi dan Destinasi"
├── paket-wisata.tsx   ← /paket-wisata → "Paket Wisata"
└── penginapan.tsx     ← /penginapan → "Penginapan"
```

## Navbar

```
[Logo Localive]  |  Beranda  Profil  Destinasi  Paket Wisata  Penginapan  |  [ID | EN]
```

- Sticky top, bg blur
- Active link: `useMatchRoute`

## i18n — react-i18next

### Files
- `src/locales/id.json`
- `src/locales/en.json`
- `src/lib/i18n.ts`

### Dependencies
- `react-i18next`, `i18next`, `i18next-browser-languagedetector`

## Execution Order
1. Install dependencies
2. Locale files (id.json, en.json)
3. i18n config (src/lib/i18n.ts)
4. Navbar component
5. LanguageToggle component
6. Route pages (profil, destinasi, paket-wisata, penginapan)
7. Update __root.tsx
8. Update index.tsx
9. Generate routes + build test
