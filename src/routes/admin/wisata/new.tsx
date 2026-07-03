import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { createWisata } from '../../../server/functions/wisata'

export const Route = createFileRoute('/admin/wisata/new')({ component: WisataNew })

function WisataNew() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    category: '',
    titleId: '', titleEn: '',
    descId: '', descEn: '',
    image: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!form.category) newErrors.category = 'Kategori wajib dipilih'
    if (!form.titleId) newErrors.titleId = 'Judul Indonesia wajib diisi'
    if (!form.titleEn) newErrors.titleEn = 'Title English wajib diisi'
    if (!form.descId) newErrors.descId = 'Deskripsi Indonesia wajib diisi'
    if (!form.descEn) newErrors.descEn = 'Description English wajib diisi'
    if (!form.image) newErrors.image = 'Gambar wajib diisi'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await createWisata({
        data: {
          category: form.category,
          title: { id: form.titleId, en: form.titleEn },
          description: { id: form.descId, en: form.descEn },
          image: form.image,
        },
      })
      navigate({ to: '/admin/wisata' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.wisata.add', 'Tambah Wisata')}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Kategori" required error={errors.category}>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="destinasi">Destinasi</SelectItem>
                  <SelectItem value="atraksi">Atraksi</SelectItem>
                  <SelectItem value="aktivitas">Aktivitas</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Judul (Indonesia)" required error={errors.titleId}>
                <Input value={form.titleId} onChange={(e) => set('titleId', e.target.value)} placeholder="Masukkan judul..." />
              </FormField>
              <FormField label="Title (English)" required error={errors.titleEn}>
                <Input value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} placeholder="Enter title..." />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)" required error={errors.descId}>
                <Textarea value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={4} placeholder="Masukkan deskripsi..." />
              </FormField>
              <FormField label="Description (English)" required error={errors.descEn}>
                <Textarea value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={4} placeholder="Enter description..." />
              </FormField>
            </div>

            <FormField label="Gambar (URL)" required error={errors.image}>
              <Input type="url" value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://..." />
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/wisata' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
