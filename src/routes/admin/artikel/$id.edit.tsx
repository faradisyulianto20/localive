import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import TipTapEditor from '../../../components/admin/tiptap-editor'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/artikel/$id/edit')({ component: ArtikelEdit })

interface Category {
  id: number
  name: { id: string; en: string }
}

interface ArticleItem {
  id: number
  category_id: number
  title: { id: string; en: string }
  content: { id: string; en: string }
  image_url: string | null
  date: string
  author?: { name: string }
}

function ArtikelEdit() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => api.get<{ data: ArticleItem }>(`/articles/${id}`),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['article-categories'],
    queryFn: () => api.get<{ data: Category[] }>('/article-categories'),
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    titleId: '', titleEn: '',
    contentId: '', contentEn: '',
    categoryId: '', date: '',
  })
  const [editorKey, setEditorKey] = useState(0)

  const item = data?.data
  const categories = categoriesData?.data ?? []

  useEffect(() => {
    if (item) {
      setForm({
        titleId: item.title.id,
        titleEn: item.title.en,
        contentId: item.content.id,
        contentEn: item.content.en,
        categoryId: String(item.category_id),
        date: item.date.slice(0, 10),
      })
      setEditorKey((k) => k + 1)
      if (item.image_url) {
        setImagePreview(item.image_url)
        setRemoveImage(false)
      }
    }
  }, [item])

  if (isLoading || !categoriesData) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  if (!item) return <div className="text-sm text-[#8B8D98]">Artikel tidak ditemukan</div>

  const handleRemoveImage = () => {
    setRemoveImage(true)
    setImagePreview(null)
    setFile(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    if (f) setImagePreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const errs: Record<string, string> = {}
    if (!form.titleId) errs.titleId = 'Wajib'
    if (!form.titleEn) errs.titleEn = 'Wajib'
    if (!form.contentId) errs.contentId = 'Wajib'
    if (!form.contentEn) errs.contentEn = 'Wajib'
    if (!form.categoryId) errs.categoryId = 'Wajib'
    if (!form.date) errs.date = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('category_id', form.categoryId)
      fd.append('title[id]', form.titleId)
      fd.append('title[en]', form.titleEn)
      fd.append('content[id]', form.contentId)
      fd.append('content[en]', form.contentEn)
      fd.append('date', form.date)
      if (file) fd.append('image', file)
      if (removeImage) fd.append('remove_image', '1')

      await api.upload(`/articles/${id}`, fd, 'PATCH')
      navigate({ to: '/admin/artikel' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-3xl">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Edit Artikel</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Judul (Indonesia)" required error={errors.titleId}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleId} onChange={(e) => set('titleId', e.target.value)} />
              </FormField>
              <FormField label="Title (English)" required error={errors.titleEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} />
              </FormField>
            </div>

            <FormField label="Isi (Indonesia)" required error={errors.contentId}>
              <TipTapEditor key={`id-${editorKey}`} value={form.contentId} onChange={(v) => set('contentId', v)} />
            </FormField>
            <FormField label="Content (English)" required error={errors.contentEn}>
              <TipTapEditor key={`en-${editorKey}`} value={form.contentEn} onChange={(v) => set('contentEn', v)} />
            </FormField>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField label="Kategori" required error={errors.categoryId}>
                <Select key={item.id} defaultValue={String(item.category_id)} onValueChange={(v) => set('categoryId', v)}>
                  <SelectTrigger className="rounded-lg border-[#EAEAEC]"><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>{cat.name.id}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
              <FormField label="Tanggal" required error={errors.date}>
                <Input className="rounded-lg border-[#EAEAEC]" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
              </FormField>
            </div>

            {item.author && (
              <p className="text-sm text-[#8B8D98]">Penulis: {item.author.name}</p>
            )}

            <FormField label="Gambar">
              {!removeImage && imagePreview && (
                <div className="mb-2 flex items-start gap-3">
                  <img src={imagePreview} alt="Current" className="h-32 w-32 rounded-lg object-cover" />
                  <Button type="button" variant="ghost" size="sm" onClick={handleRemoveImage} className="text-red-600 h-8">Hapus</Button>
                </div>
              )}
              {!removeImage && (
                <>
                  <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="rounded-lg border-[#EAEAEC]" />
                  <p className="mt-1 text-xs text-[#8B8D98]">Kosongkan jika tidak ingin mengubah gambar</p>
                </>
              )}
              {removeImage && <p className="text-sm text-amber-600">Gambar akan dihapus saat disimpan.</p>}
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/artikel' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
