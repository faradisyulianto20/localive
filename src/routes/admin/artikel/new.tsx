import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import TipTapEditor from '../../../components/admin/tiptap-editor'
import { createArtikel } from '../../../server/functions/artikel'

export const Route = createFileRoute('/admin/artikel/new')({ component: ArtikelNew })

function ArtikelNew() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    titleId: '', titleEn: '',
    contentId: '', contentEn: '',
    image: '', category: '', penulis: '', tanggal: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const errs: Record<string, string> = {}
    if (!form.titleId) errs.titleId = 'Wajib'
    if (!form.titleEn) errs.titleEn = 'Wajib'
    if (!form.contentId) errs.contentId = 'Wajib'
    if (!form.contentEn) errs.contentEn = 'Wajib'
    if (!form.image) errs.image = 'Wajib'
    if (!form.category) errs.category = 'Wajib'
    if (!form.penulis) errs.penulis = 'Wajib'
    if (!form.tanggal) errs.tanggal = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    try {
      await createArtikel({
        data: {
          title: { id: form.titleId, en: form.titleEn },
          content: { id: form.contentId, en: form.contentEn },
          image: form.image,
          category: form.category as 'berita' | 'kegiatan' | 'pengumuman',
          penulis: form.penulis,
          tanggal: form.tanggal,
        },
      })
      navigate({ to: '/admin/artikel' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader><CardTitle>{t('admin.artikel.add', 'Tambah Artikel')}</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Judul (Indonesia)" required error={errors.titleId}>
                <Input value={form.titleId} onChange={(e) => set('titleId', e.target.value)} />
              </FormField>
              <FormField label="Title (English)" required error={errors.titleEn}>
                <Input value={form.titleEn} onChange={(e) => set('titleEn', e.target.value)} />
              </FormField>
            </div>

            <FormField label="Isi (Indonesia)" required error={errors.contentId}>
              <TipTapEditor value={form.contentId} onChange={(v) => set('contentId', v)} />
            </FormField>
            <FormField label="Content (English)" required error={errors.contentEn}>
              <TipTapEditor value={form.contentEn} onChange={(v) => set('contentEn', v)} />
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Gambar (URL)" required error={errors.image}>
                <Input type="url" value={form.image} onChange={(e) => set('image', e.target.value)} />
              </FormField>
              <FormField label="Kategori" required error={errors.category}>
                <Select value={form.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Pilih" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="berita">Berita</SelectItem>
                    <SelectItem value="kegiatan">Kegiatan</SelectItem>
                    <SelectItem value="pengumuman">Pengumuman</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Penulis" required error={errors.penulis}>
                <Input value={form.penulis} onChange={(e) => set('penulis', e.target.value)} />
              </FormField>
              <FormField label="Tanggal" required error={errors.tanggal}>
                <Input type="date" value={form.tanggal} onChange={(e) => set('tanggal', e.target.value)} />
              </FormField>
            </div>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/artikel' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
