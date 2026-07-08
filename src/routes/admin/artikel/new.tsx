import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import TipTapEditor from '../../../components/admin/tiptap-editor'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/artikel/new')({ component: ArtikelNew })

interface Category {
  id: number
  name: { id: string; en: string }
}

function ArtikelNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    titleId: '', titleEn: '',
    contentId: '', contentEn: '',
    categoryId: '', date: '',
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['article-categories'],
    queryFn: () => api.get<{ data: Category[] }>('/article-categories'),
  })

  const categories = categoriesData?.data ?? []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    if (f) setImagePreview(URL.createObjectURL(f))
    else setImagePreview(null)
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

      await api.upload('/articles', fd)
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
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Tambah Artikel</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Judul (Indonesia)" required error={errors.titleId}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleId} onChange={(e) => set('titleId', e.target.value)} placeholder="Judul..." />
              </FormField>
              <FormField label="Title (English)" required error={errors.titleEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} placeholder="Title..." />
              </FormField>
            </div>

            <FormField label="Isi (Indonesia)" required error={errors.contentId}>
              <TipTapEditor value={form.contentId} onChange={(v) => set('contentId', v)} />
            </FormField>
            <FormField label="Content (English)" required error={errors.contentEn}>
              <TipTapEditor value={form.contentEn} onChange={(v) => set('contentEn', v)} />
            </FormField>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField label="Kategori" required error={errors.categoryId}>
                <Select value={form.categoryId} onValueChange={(v) => set('categoryId', v)}>
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

            <FormField label="Gambar">
              <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="rounded-lg border-[#EAEAEC]" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 rounded-lg object-cover" />}
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan Draft'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/artikel' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
