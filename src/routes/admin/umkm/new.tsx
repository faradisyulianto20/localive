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

export const Route = createFileRoute('/admin/umkm/new')({ component: UMKMNew })

interface UmkmCategory {
  id: number
  name: { id: string; en: string }
}

function UMKMNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({
    categoryId: '', titleId: '', titleEn: '',
    descId: '', descEn: '', mapsLink: '', phone: '',
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['umkm-categories'],
    queryFn: () => api.get<{ data: UmkmCategory[] }>('/umkm-categories'),
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

      await api.upload('/umkm', fd)
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
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Tambah UMKM</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Kategori" required error={errors.categoryId}>
              <Select value={form.categoryId} onValueChange={(v) => set('categoryId', v)}>
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
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleId} onChange={(e) => set('titleId', e.target.value)} placeholder="Nama UMKM..." />
              </FormField>
              <FormField label="Name (English)" required error={errors.titleEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} placeholder="UMKM name..." />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)" required error={errors.descId}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={3} placeholder="Deskripsi..." />
              </FormField>
              <FormField label="Description (English)" required error={errors.descEn}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={3} placeholder="Description..." />
              </FormField>
            </div>

            <FormField label="Google Maps Link">
              <Input className="rounded-lg border-[#EAEAEC]" type="url" value={form.mapsLink} onChange={(e) => set('mapsLink', e.target.value)} placeholder="https://maps.google.com/..." />
            </FormField>

            <FormField label="No Telepon">
              <Input className="rounded-lg border-[#EAEAEC]" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="08xxxx" />
            </FormField>

            <FormField label="Gambar">
              <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="rounded-lg border-[#EAEAEC]" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 rounded-lg object-cover" />}
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan Draft'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/umkm' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
