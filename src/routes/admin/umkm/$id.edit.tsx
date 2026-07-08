import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/umkm/$id/edit')({ component: UMKMEdit })

interface UmkmCategory {
  id: number
  name: { id: string; en: string }
}

interface UmkmItem {
  id: number
  category_id: number
  title: { id: string; en: string }
  description: { id: string; en: string }
  image_url: string | null
  maps_link: string | null
  phone: string | null
}

function UMKMEdit() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['umkm', id],
    queryFn: () => api.get<{ data: UmkmItem }>(`/umkm/${id}`),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['umkm-categories'],
    queryFn: () => api.get<{ data: UmkmCategory[] }>('/umkm-categories'),
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    categoryId: '', titleId: '', titleEn: '',
    descId: '', descEn: '', mapsLink: '', phone: '',
  })

  const item = data?.data
  const categories = categoriesData?.data ?? []

  useEffect(() => {
    if (item) {
      setForm({
        categoryId: String(item.category_id),
        titleId: item.title.id,
        titleEn: item.title.en,
        descId: item.description.id ?? '',
        descEn: item.description.en ?? '',
        mapsLink: item.maps_link ?? '',
        phone: item.phone ?? '',
      })
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

  if (!item) return <div className="text-sm text-[#8B8D98]">UMKM tidak ditemukan</div>

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
    if (!form.categoryId) errs.categoryId = 'Wajib'
    if (!form.titleId) errs.titleId = 'Wajib'
    if (!form.titleEn) errs.titleEn = 'Wajib'
    if (!form.descId) errs.descId = 'Wajib'
    if (!form.descEn) errs.descEn = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('category_id', form.categoryId)
      fd.append('title[id]', form.titleId)
      fd.append('title[en]', form.titleEn)
      fd.append('description[id]', form.descId)
      fd.append('description[en]', form.descEn)
      if (form.mapsLink) fd.append('maps_link', form.mapsLink)
      if (form.phone) fd.append('phone', form.phone)
      if (file) fd.append('image', file)
      if (removeImage) fd.append('remove_image', '1')

      await api.upload(`/umkm/${id}`, fd, 'PATCH')
      navigate({ to: '/admin/umkm' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-2xl">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Edit UMKM</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Kategori" required error={errors.categoryId}>
              <Select key={item.id} defaultValue={String(item.category_id)} onValueChange={(v) => set('categoryId', v)}>
                <SelectTrigger className="rounded-lg border-[#EAEAEC]"><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>{cat.name.id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Nama (Indonesia)" required error={errors.titleId}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleId} onChange={(e) => set('titleId', e.target.value)} />
              </FormField>
              <FormField label="Name (English)" required error={errors.titleEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)" required error={errors.descId}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={3} />
              </FormField>
              <FormField label="Description (English)" required error={errors.descEn}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={3} />
              </FormField>
            </div>

            <FormField label="Google Maps Link">
              <Input className="rounded-lg border-[#EAEAEC]" type="url" value={form.mapsLink} onChange={(e) => set('mapsLink', e.target.value)} />
            </FormField>

            <FormField label="No Telepon">
              <Input className="rounded-lg border-[#EAEAEC]" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="08xxxx" />
            </FormField>

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
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/umkm' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
