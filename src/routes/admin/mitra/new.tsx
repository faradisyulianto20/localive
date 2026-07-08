import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/mitra/new')({ component: MitraNew })

function MitraNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [form, setForm] = useState({ nameId: '', nameEn: '', descId: '', descEn: '' })

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

      await api.upload('/partners', fd)
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
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Tambah Mitra</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Nama (Indonesia)" required error={errors.nameId}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.nameId} onChange={(e) => set('nameId', e.target.value)} placeholder="Nama mitra..." />
              </FormField>
              <FormField label="Name (English)" required error={errors.nameEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.nameEn} onChange={(e) => set('nameEn', e.target.value)} placeholder="Partner name..." />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)">
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={3} placeholder="Opsional..." />
              </FormField>
              <FormField label="Description (English)">
                <Textarea className="rounded-lg border-[#EAEAEC]" value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={3} placeholder="Optional..." />
              </FormField>
            </div>

            <FormField label="Logo">
              <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="rounded-lg border-[#EAEAEC]" />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-32 rounded-lg object-cover" />}
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan Draft'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/mitra' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
