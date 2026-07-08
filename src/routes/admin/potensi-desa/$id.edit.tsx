import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/potensi-desa/$id/edit')({ component: PotensiDesaEdit })

interface Item {
  id: number
  title: { id: string; en: string }
  description: { id: string; en: string }
  image_url: string | null
}

function PotensiDesaEdit() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['village-potential', id],
    queryFn: () => api.get<{ data: Item }>(`/village-potentials/${id}`),
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [removeImage, setRemoveImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({ titleId: '', titleEn: '', descId: '', descEn: '' })

  const item = data?.data

  useEffect(() => {
    if (item) {
      setForm({
        titleId: item.title.id, titleEn: item.title.en,
        descId: item.description.id ?? '', descEn: item.description.en ?? '',
      })
      if (item.image_url) { setImagePreview(item.image_url); setRemoveImage(false) }
    }
  }, [item])

  if (isLoading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>
  if (!item) return <div className="text-sm text-[#8B8D98]">Potensi Desa tidak ditemukan</div>

  const handleRemoveImage = () => { setRemoveImage(true); setImagePreview(null); setFile(null) }
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
    if (!form.descId) errs.descId = 'Wajib'
    if (!form.descEn) errs.descEn = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('title[id]', form.titleId)
      fd.append('title[en]', form.titleEn)
      fd.append('description[id]', form.descId)
      fd.append('description[en]', form.descEn)
      if (file) fd.append('image', file)
      if (removeImage) fd.append('remove_image', '1')

      await api.upload(`/village-potentials/${id}`, fd, 'PATCH')
      navigate({ to: '/admin/potensi-desa' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-2xl">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Edit Potensi Desa</CardTitle></CardHeader>
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

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)" required error={errors.descId}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={4} />
              </FormField>
              <FormField label="Description (English)" required error={errors.descEn}>
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={4} />
              </FormField>
            </div>

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
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/potensi-desa' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
