import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { createPotensiDesa } from '../../../server/functions/profil'

export const Route = createFileRoute('/admin/potensi-desa/new')({ component: PotensiDesaNew })

const COLOR_OPTIONS = [
  { value: 'forest', label: 'Forest' },
  { value: 'olive', label: 'Olive' },
  { value: 'brown', label: 'Brown' },
  { value: 'gold', label: 'Gold' },
  { value: 'terracotta', label: 'Terracotta' },
  { value: 'cream', label: 'Cream' },
]

function PotensiDesaNew() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    image: '',
    titleId: '', titleEn: '',
    descId: '', descEn: '',
    color: 'forest',
    badgeId: '', badgeEn: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!form.image) newErrors.image = 'Gambar wajib diisi'
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
      await createPotensiDesa({
        data: {
          image: form.image,
          title: { id: form.titleId, en: form.titleEn },
          description: { id: form.descId, en: form.descEn },
          color: form.color,
          badge: form.badgeId && form.badgeEn
            ? { id: form.badgeId, en: form.badgeEn }
            : null,
          icon: null,
        },
      })
      navigate({ to: '/admin/potensi-desa' })
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
          <CardTitle className="text-lg font-semibold text-[#111214]">Tambah Potensi Desa</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Gambar (URL)" required error={errors.image}>
              <Input className="rounded-lg border-[#EAEAEC]" type="url" value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://..." />
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

            <FormField label="Warna" error={errors.color}>
              <Select value={form.color} onValueChange={(v) => set('color', v)}>
                <SelectTrigger className="rounded-lg border-[#EAEAEC]"><SelectValue placeholder="Pilih warna" /></SelectTrigger>
                <SelectContent>
                  {COLOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Badge (Indonesia)" error={errors.badgeId}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.badgeId} onChange={(e) => set('badgeId', e.target.value)} placeholder="Opsional..." />
              </FormField>
              <FormField label="Badge (English)" error={errors.badgeEn}>
                <Input className="rounded-lg border-[#EAEAEC]" value={form.badgeEn} onChange={(e) => set('badgeEn', e.target.value)} placeholder="Optional..." />
              </FormField>
            </div>
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
