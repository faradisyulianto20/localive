# Admin CRUD Artikel (`/admin/artikel/*`)

**Layout**: Admin (Sidebar + Header)  
**Auth**: Yes  
**Bahasa**: ID + EN (i18n + data bilingual)

---

## Routes

| Path | File | Fungsi |
|---|---|---|
| `/admin/artikel` | `src/routes/admin/artikel/index.tsx` | List semua artikel |
| `/admin/artikel/new` | `src/routes/admin/artikel/new.tsx` | Create form |
| `/admin/artikel/$id/edit` | `src/routes/admin/artikel/$id.edit.tsx` | Edit form |

---

## 1. Halaman List (`/admin/artikel`)

### Layout
Tabel dengan kolom: Gambar, Judul, Kategori, Penulis, Tanggal, Aksi.

### Data
- `getArtikelList()` — return semua artikel

### States
| State | UI |
|---|---|
| Loading | Skeleton table |
| Empty | "Belum ada data artikel" + tombol "Tambah Artikel" |
| Error | Alert |
| Success | Table with rows |

---

## 2. Form Create/Edit — Rich Text

Form artikel menggunakan **TipTap** untuk field isi konten (bilingual).

### Form Fields

| Field | Type | Wajib | Bilingual | Component | Validation |
|---|---|---|---|---|---|
| Judul (ID) | Input | ✅ | — | `<Input>` | `z.string().min(1)` |
| Title (EN) | Input | ✅ | — | `<Input>` | `z.string().min(1)` |
| Isi (ID) | Rich Text | ✅ | — | `<TipTapEditor>` | `z.string().min(1)` |
| Content (EN) | Rich Text | ✅ | — | `<TipTapEditor>` | `z.string().min(1)` |
| Gambar | Input (URL) | ✅ | — | `<Input type="url">` | `z.string().url()` |
| Kategori | Select | ✅ | ❌ | `<Select>` | `z.enum(['berita', 'kegiatan', 'pengumuman'])` |
| Penulis | Input | ✅ | — | `<Input>` | `z.string().min(1)` |
| Tanggal | Date Input | ✅ | — | `<Input type="date">` | `z.string().regex(/^\d{4}-\d{2}-\d{2}$/)` |

---

### TipTap Editor Component

```tsx
// src/components/admin/tiptap-editor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

interface TipTapEditorProps {
  value: string           // HTML string
  onChange: (html: string) => void
  placeholder?: string
  error?: string
}

export default function TipTapEditor({ value, onChange, placeholder, error }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[200px] p-4 outline-none',
      },
    },
  })

  // Toolbar
  return (
    <div className={`rounded-md border ${error ? 'border-red-500' : 'border-input'}`}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b bg-muted/50 p-2">
        <button onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'bg-accent' : ''}>
          <Bold className="h-4 w-4" />
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'bg-accent' : ''}>
          <Italic className="h-4 w-4" />
        </button>
        <button onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>List</button>
        <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>OL</button>
      </div>
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}
```

### Form Layout untuk Isi (Bilingual)

```tsx
<div className="space-y-6">
  {/* Rich Text ID */}
  <FormField label="Isi (Indonesia)" required error={errors?.content?.id}>
    <TipTapEditor
      value={contentId}
      onChange={setContentId}
      placeholder="Tulis konten artikel..."
    />
  </FormField>

  {/* Rich Text EN */}
  <FormField label="Content (English)" required error={errors?.content?.en}>
    <TipTapEditor
      value={contentEn}
      onChange={setContentEn}
      placeholder="Write article content..."
    />
  </FormField>
</div>
```

---

### Zod Schema
```ts
const artikelSchema = z.object({
  title: z.object({
    id: z.string().min(1, 'Judul Indonesia wajib diisi'),
    en: z.string().min(1, 'Title English wajib diisi'),
  }),
  content: z.object({
    id: z.string().min(1, 'Konten Indonesia wajib diisi'),
    en: z.string().min(1, 'Content English wajib diisi'),
  }),
  image: z.string().url('URL gambar tidak valid'),
  category: z.enum(['berita', 'kegiatan', 'pengumuman'], {
    required_error: 'Kategori wajib dipilih',
  }),
  penulis: z.string().min(1, 'Penulis wajib diisi'),
  tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Format tanggal YYYY-MM-DD'),
})
```

---

## Server Functions

| Function | Method | Input | Output |
|---|---|---|---|
| `getArtikelList` | GET | — | `ArtikelItem[]` |
| `getArtikelById` | GET | `{ id: string }` | `ArtikelItem \| null` |
| `createArtikel` | POST | `ArtikelSchema` | `ArtikelItem` |
| `updateArtikel` | POST | `{ id: string, data: Partial<ArtikelSchema> }` | `ArtikelItem` |
| `deleteArtikel` | POST | `{ id: string }` | `{ success: true }` |

---

## Delete Flow
1. Klik icon trash → confirm dialog
2. "Apakah Anda yakin ingin menghapus artikel [judul]?"
3. Tombol: [Batal] [Hapus]
4. Jika konfirmasi → hapus → toast sukses

---

## i18n Keys

```json
{
  "admin.artikel.title": "Artikel",
  "admin.artikel.add": "Tambah Artikel",
  "admin.artikel.edit": "Edit Artikel",
  "admin.artikel.delete": "Hapus Artikel",
  "admin.artikel.list": "Daftar Artikel",
  "admin.artikel.empty": "Belum ada data artikel",
  "admin.artikel.field.titleId": "Judul (Indonesia)",
  "admin.artikel.field.titleEn": "Title (English)",
  "admin.artikel.field.contentId": "Isi (Indonesia)",
  "admin.artikel.field.contentEn": "Content (English)",
  "admin.artikel.field.image": "Gambar",
  "admin.artikel.field.category": "Kategori",
  "admin.artikel.field.penulis": "Penulis",
  "admin.artikel.field.tanggal": "Tanggal",
  "admin.artikel.toast.created": "Artikel berhasil ditambahkan",
  "admin.artikel.toast.updated": "Artikel berhasil diperbarui",
  "admin.artikel.toast.deleted": "Artikel berhasil dihapus"
}
```
