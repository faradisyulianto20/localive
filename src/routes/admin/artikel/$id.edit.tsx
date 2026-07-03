import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import TipTapEditor from '../../../components/admin/tiptap-editor'
import { updateArtikel } from '../../../server/functions/artikel'
import artikelData from '#/data/artikel.json'

export const Route = createFileRoute('/admin/artikel/$id/edit')({ component: ArtikelEdit })

function ArtikelEdit() {
  const { id } = Route.useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const item = artikelData.find((i) => i.id === id)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    titleId: item?.title.id ?? '', titleEn: item?.title.en ?? '',
    contentId: item?.content.id ?? '', contentEn: item?.content.en ?? '',
    image: item?.image ?? '', category: item?.category ?? '', penulis: item?.penulis ?? '', tanggal: item?.tanggal ?? '',
  })

  if (!item) return <div className="text-sm text-[#8B8D98]">Artikel tidak ditemukan</div>

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
      await updateArtikel({
        data: {
          id,
          data: {
            title: { id: form.titleId, en: form.titleEn },
            content: { id: form.contentId, en: form.contentEn },
            image: form.image,
            category: form.category as 'berita' | 'kegiatan' | 'pengumuman',
            penulis: form.penulis,
            tanggal: form.tanggal,
          },
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
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">{t('admin.artikel.edit', 'Edit Artikel')}</CardTitle></CardHeader>
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

            <FormField label="Isi (Indonesia)" required error={errors.contentId}>
              <TipTapEditor value={form.contentId} onChange={(v) => set('contentId', v)} />
            </FormField>
            <FormField label="Content (English)" required error={errors.contentEn}>
              <TipTapEditor value={form.contentEn} onChange={(v) => set('contentEn', v)} />
            </FormField>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Gambar (URL)" required error={errors.image}>
                <Input className="rounded-lg border-[#EAEAEC]" type="url" value={form.image} onChange={(e) => set('image', e.target.value)} />
              </FormField>
              <FormField label="Kategori" required error={errors.category}>
                <Select value={form.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger className="rounded-lg border-[#EAEAEC]"><SelectValue placeholder="Pilih" /></SelectTrigger>
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
                <Input className="rounded-lg border-[#EAEAEC]" value={form.penulis} onChange={(e) => set('penulis', e.target.value)} />
              </FormField>
              <FormField label="Tanggal" required error={errors.tanggal}>
                <Input className="rounded-lg border-[#EAEAEC]" type="date" value={form.tanggal} onChange={(e) => set('tanggal', e.target.value)} />
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
