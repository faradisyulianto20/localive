import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { createUMKM } from '../../../server/functions/umkm'

export const Route = createFileRoute('/admin/umkm/new')({ component: UMKMNew })

function UMKMNew() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    category: '', titleId: '', titleEn: '', descId: '', descEn: '',
    image: '', noTelp: '', waUrl: '', mapsUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const errs: Record<string, string> = {}
    if (!form.category) errs.category = 'Wajib'
    if (!form.titleId) errs.titleId = 'Wajib'
    if (!form.titleEn) errs.titleEn = 'Wajib'
    if (!form.descId) errs.descId = 'Wajib'
    if (!form.descEn) errs.descEn = 'Wajib'
    if (!form.image) errs.image = 'Wajib'
    if (!form.noTelp) errs.noTelp = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      await createUMKM({
        data: {
          category: form.category,
          title: { id: form.titleId, en: form.titleEn },
          description: { id: form.descId, en: form.descEn },
          image: form.image,
          noTelp: form.noTelp,
          waUrl: form.waUrl || undefined,
          mapsUrl: form.mapsUrl || undefined,
        },
      })
      navigate({ to: '/admin/umkm' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader><CardTitle>{t('admin.umkm.add', 'Tambah UMKM')}</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Kategori" required error={errors.category}>
              <Select value={form.category} onValueChange={(v) => set('category', v)}>
                <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="makanan">Makanan</SelectItem>
                  <SelectItem value="produk">Produk</SelectItem>
                  <SelectItem value="jasa">Jasa</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Nama (Indonesia)" required error={errors.titleId}>
                <Input value={form.titleId} onChange={(e) => set('titleId', e.target.value)} />
              </FormField>
              <FormField label="Name (English)" required error={errors.titleEn}>
                <Input value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Deskripsi (Indonesia)" required error={errors.descId}>
                <Textarea value={form.descId} onChange={(e) => set('descId', e.target.value)} rows={3} />
              </FormField>
              <FormField label="Description (English)" required error={errors.descEn}>
                <Textarea value={form.descEn} onChange={(e) => set('descEn', e.target.value)} rows={3} />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Gambar (URL)" required error={errors.image}>
                <Input type="url" value={form.image} onChange={(e) => set('image', e.target.value)} />
              </FormField>
              <FormField label="No Telepon" required error={errors.noTelp}>
                <Input value={form.noTelp} onChange={(e) => set('noTelp', e.target.value)} placeholder="08xxxx" />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Link WhatsApp">
                <Input type="url" value={form.waUrl} onChange={(e) => set('waUrl', e.target.value)} />
              </FormField>
              <FormField label="Link Google Maps">
                <Input type="url" value={form.mapsUrl} onChange={(e) => set('mapsUrl', e.target.value)} />
              </FormField>
            </div>
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
