import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/wisata/new')({ component: WisataNew })

interface TourCategory {
  id: number
  slug: string
  name: { id: string; en: string }
}

function WisataNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    categoryId: '',
    titleId: '', titleEn: '',
    descId: '', descEn: '',
  })
  const fileRef = useState<File | null>(null)
  const [file, setFile] = fileRef

  const { data: categoriesData } = useQuery({
    queryKey: ['tour-categories'],
    queryFn: () => api.get<{ data: TourCategory[] }>('/tour-categories'),
  })

  const categories = categoriesData?.data ?? []

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    if (f) {
      setImagePreview(URL.createObjectURL(f))
    } else {
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!form.categoryId) newErrors.categoryId = 'Kategori wajib dipilih'
    if (!form.titleId) newErrors.titleId = 'Judul Indonesia wajib diisi'
    if (!form.titleEn) newErrors.titleEn = 'Title English wajib diisi'
    if (!form.descId) newErrors.descId = 'Deskripsi Indonesia wajib diisi'
    if (!form.descEn) newErrors.descEn = 'Description English wajib diisi'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('category_id', form.categoryId)
      fd.append('title[id]', form.titleId)
      fd.append('title[en]', form.titleEn)
      fd.append('description[id]', form.descId)
      fd.append('description[en]', form.descEn)
      if (file) fd.append('image', file)

      await api.upload('/tour-packages', fd)
      navigate({ to: '/admin/wisata' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="max-w-2xl">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#111214]">Tambah Wisata</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Kategori" required error={errors.categoryId}>
              <Select value={form.categoryId} onValueChange={(v) => set('categoryId', v)}>
                <SelectTrigger className="rounded-lg border-[#EAEAEC]">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.name.id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Judul (Indonesia)" required error={errors.titleId}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleId} onChange={(e) => set('titleId', e.target.value)} placeholder="Masukkan judul..." />
              </FormField>
              <FormField label="Title (English)" required error={errors.titleEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} placeholder="Enter title..." />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)" required error={errors.descId}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={4} placeholder="Masukkan deskripsi..." />
              </FormField>
              <FormField label="Description (English)" required error={errors.descEn}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={4} placeholder="Enter description..." />
              </FormField>
            </div>

            <FormField label="Gambar">
              <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="rounded-lg border-[#EAEAEC]" />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 rounded-lg object-cover" />
              )}
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan Draft'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/wisata' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
