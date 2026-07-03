import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { updateLemahAsri } from '../../../server/functions/lemah-asri'
import { X, Plus } from 'lucide-react'
import lemahAsriData from '#/data/lemah-asri.json'

export const Route = createFileRoute('/admin/lemah-asri/edit')({ component: LemahAsriEdit })

function LemahAsriEdit() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const data = lemahAsriData
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    namaUsahaId: data.namaUsaha.id, namaUsahaEn: data.namaUsaha.en,
    pemilik: data.pemilik, tahunBerdiri: data.tahunBerdiri,
    lokasi: data.lokasi, noTelp: data.noTelp, email: data.email,
    instagram: data.instagram, youtube: data.youtube,
    visiId: data.visi.id, visiEn: data.visi.en,
    misiId: data.misi.id, misiEn: data.misi.en,
  })
  const [struktur, setStruktur] = useState(data.strukturOrganisasi)
  const [trackRecord, setTrackRecord] = useState(data.trackRecord)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const errs: Record<string, string> = {}
    if (!form.namaUsahaId) errs.namaUsahaId = 'Wajib'
    if (!form.namaUsahaEn) errs.namaUsahaEn = 'Wajib'
    if (!form.pemilik) errs.pemilik = 'Wajib'
    if (!form.lokasi) errs.lokasi = 'Wajib'
    if (!form.noTelp) errs.noTelp = 'Wajib'
    if (!form.email) errs.email = 'Wajib'
    if (!form.visiId) errs.visiId = 'Wajib'
    if (!form.visiEn) errs.visiEn = 'Wajib'
    if (!form.misiId) errs.misiId = 'Wajib'
    if (!form.misiEn) errs.misiEn = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      await updateLemahAsri({
        data: {
          namaUsaha: { id: form.namaUsahaId, en: form.namaUsahaEn },
          pemilik: form.pemilik,
          tahunBerdiri: form.tahunBerdiri,
          lokasi: form.lokasi,
          noTelp: form.noTelp,
          email: form.email,
          instagram: form.instagram,
          youtube: form.youtube,
          visi: { id: form.visiId, en: form.visiEn },
          misi: { id: form.misiId, en: form.misiEn },
          strukturOrganisasi: struktur,
          trackRecord: trackRecord,
        },
      })
      navigate({ to: '/admin/lemah-asri' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader><CardTitle>{t('admin.lemahAsri.edit', 'Edit Profil Lemah Asri')}</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Nama Usaha (Indonesia)" required error={errors.namaUsahaId}>
                <Input value={form.namaUsahaId} onChange={(e) => set('namaUsahaId', e.target.value)} />
              </FormField>
              <FormField label="Business Name (English)" required error={errors.namaUsahaEn}>
                <Input value={form.namaUsahaEn} onChange={(e) => set('namaUsahaEn', e.target.value)} />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Pemilik Usaha" required error={errors.pemilik}>
                <Input value={form.pemilik} onChange={(e) => set('pemilik', e.target.value)} />
              </FormField>
              <FormField label="Tahun Berdiri" required>
                <Input value={form.tahunBerdiri} onChange={(e) => set('tahunBerdiri', e.target.value)} />
              </FormField>
            </div>

            <FormField label="Lokasi" required error={errors.lokasi}>
              <Textarea value={form.lokasi} onChange={(e) => set('lokasi', e.target.value)} rows={2} />
            </FormField>

            <div className="grid gap-4 md:grid-cols-3">
              <FormField label="No Telepon" required error={errors.noTelp}>
                <Input value={form.noTelp} onChange={(e) => set('noTelp', e.target.value)} />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
              </FormField>
              <FormField label="Instagram" required>
                <Input value={form.instagram} onChange={(e) => set('instagram', e.target.value)} />
              </FormField>
            </div>

            <FormField label="YouTube">
              <Input value={form.youtube} onChange={(e) => set('youtube', e.target.value)} />
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Visi (Indonesia)" required error={errors.visiId}>
                <Textarea value={form.visiId} onChange={(e) => set('visiId', e.target.value)} rows={3} />
              </FormField>
              <FormField label="Vision (English)" required error={errors.visiEn}>
                <Textarea value={form.visiEn} onChange={(e) => set('visiEn', e.target.value)} rows={3} />
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Misi (Indonesia)" required error={errors.misiId}>
                <Textarea value={form.misiId} onChange={(e) => set('misiId', e.target.value)} rows={4} placeholder="• item 1&#10;• item 2" />
              </FormField>
              <FormField label="Mission (English)" required error={errors.misiEn}>
                <Textarea value={form.misiEn} onChange={(e) => set('misiEn', e.target.value)} rows={4} />
              </FormField>
            </div>

            {/* Struktur Organisasi */}
            <div>
              <p className="mb-2 text-sm font-medium">Struktur Organisasi</p>
              {struktur.map((item, i) => (
                <div key={i} className="mb-2 flex gap-2">
                  <Input value={item.jabatan} onChange={(e) => {
                    const newSt = [...struktur]
                    newSt[i] = { ...newSt[i], jabatan: e.target.value }
                    setStruktur(newSt)
                  }} placeholder="Jabatan" className="flex-1" />
                  <Input value={item.nama} onChange={(e) => {
                    const newSt = [...struktur]
                    newSt[i] = { ...newSt[i], nama: e.target.value }
                    setStruktur(newSt)
                  }} placeholder="Nama" className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setStruktur(struktur.filter((_, j) => j !== i))}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setStruktur([...struktur, { jabatan: '', nama: '' }])}>
                <Plus className="h-4 w-4" /> Tambah
              </Button>
            </div>

            {/* Track Record */}
            <div>
              <p className="mb-2 text-sm font-medium">Track Record</p>
              {trackRecord.map((item, i) => (
                <div key={i} className="mb-2 flex gap-2">
                  <Input value={item} onChange={(e) => {
                    const newTr = [...trackRecord]
                    newTr[i] = e.target.value
                    setTrackRecord(newTr)
                  }} placeholder="Nama track record" className="flex-1" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setTrackRecord(trackRecord.filter((_, j) => j !== i))}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => setTrackRecord([...trackRecord, ''])}>
                <Plus className="h-4 w-4" /> Tambah
              </Button>
            </div>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/lemah-asri' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
