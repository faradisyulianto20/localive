import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/mitra/$id/edit')({ component: MitraEdit })

interface Item {
  id: number
  name: { id: string; en: string }
  description: { id: string; en: string }
  logo_url: string | null
}

function MitraEdit() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['partner', id],
    queryFn: () => api.get<{ data: Item }>(`/partners/${id}`),
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [removeLogo, setRemoveLogo] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({ nameId: '', nameEn: '', descId: '', descEn: '' })

  const item = data?.data

  useEffect(() => {
    if (item) {
      setForm({
        nameId: item.name.id, nameEn: item.name.en,
        descId: item.description.id ?? '', descEn: item.description.en ?? '',
      })
      if (item.logo_url) { setImagePreview(item.logo_url); setRemoveLogo(false) }
    }
  }, [item])

  if (isLoading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>
  if (!item) return <div className="text-sm text-[#8B8D98]">Mitra tidak ditemukan</div>

  const handleRemoveLogo = () => { setRemoveLogo(true); setImagePreview(null); setFile(null) }
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    if (f) setImagePreview(URL.createObjectURL(f))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const errs: Record<string, string> = {}
    if (!form.nameId) errs.nameId = 'Wajib'
    if (!form.nameEn) errs.nameEn = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name[id]', form.nameId)
      fd.append('name[en]', form.nameEn)
      if (form.descId) fd.append('description[id]', form.descId)
      if (form.descEn) fd.append('description[en]', form.descEn)
      if (file) fd.append('logo', file)
      if (removeLogo) fd.append('remove_logo', '1')

      await api.upload(`/partners/${id}`, fd, 'PATCH')
      navigate({ to: '/admin/mitra' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-2xl">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Edit Mitra</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Nama (Indonesia)" required error={errors.nameId}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.nameId} onChange={(e) => set('nameId', e.target.value)} />
              </FormField>
              <FormField label="Name (English)" required error={errors.nameEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)">
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={3} />
              </FormField>
              <FormField label="Description (English)">
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={3} />
              </FormField>
            </div>

            <FormField label="Logo">
              {!removeLogo && imagePreview && (
                <div className="mb-2 flex items-start gap-3">
                  <img src={imagePreview} alt="Current" className="h-32 w-32 rounded-lg object-cover" />
                  <Button type="button" variant="ghost" size="sm" onClick={handleRemoveLogo} className="text-red-600 h-8">Hapus</Button>
                </div>
              )}
              {!removeLogo && (
                <>
                  <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="rounded-lg border-[#EAEAEC]" />
                  <p className="mt-1 text-xs text-[#8B8D98]">Kosongkan jika tidak ingin mengubah logo</p>
                </>
              )}
              {removeLogo && <p className="text-sm text-amber-600">Logo akan dihapus saat disimpan.</p>}
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/mitra' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
