import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { getMitra, updateMitra } from '../../../server/functions/profil'
import type { MitraItem } from '../../../server/functions/profil'

export const Route = createFileRoute('/admin/mitra/$id/edit')({ component: MitraEdit })

function MitraEdit() {
  const { id } = Route.useParams()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    logo: '',
    nama: '',
    url: '',
  })

  useEffect(() => {
    getMitra()
      .then((items) => {
        const item = items.find((i: MitraItem) => i.id === id)
        if (!item) {
          setErrors({ form: 'Mitra tidak ditemukan' })
          return
        }
        setForm({
          logo: item.logo ?? '',
          nama: item.nama ?? '',
          url: item.url ?? '',
        })
      })
      .catch(() => setErrors({ form: 'Gagal memuat data' }))
      .finally(() => setPageLoading(false))
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const newErrors: Record<string, string> = {}
    if (!form.logo) newErrors.logo = 'Logo wajib diisi'
    if (!form.nama) newErrors.nama = 'Nama perusahaan wajib diisi'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await updateMitra({
        data: {
          id,
          data: {
            logo: form.logo,
            nama: form.nama,
            url: form.url || null,
          },
        },
      })
      navigate({ to: '/admin/mitra' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  if (pageLoading) {
    return <div className="text-sm text-[#8B8D98]">Memuat...</div>
  }

  if (errors.form && !form.nama) {
    return <div className="text-sm text-red-600">{errors.form}</div>
  }

  return (
    <div className="max-w-2xl">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-[#111214]">Edit Mitra</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Logo (URL)" required error={errors.logo}>
              <Input className="rounded-lg border-[#EAEAEC]" type="url" value={form.logo} onChange={(e) => set('logo', e.target.value)} />
            </FormField>

            <FormField label="Nama Perusahaan" required error={errors.nama}>
              <Input className="rounded-lg border-[#EAEAEC]" value={form.nama} onChange={(e) => set('nama', e.target.value)} />
            </FormField>

            <FormField label="Website (URL)" error={errors.url}>
              <Input className="rounded-lg border-[#EAEAEC]" type="url" value={form.url} onChange={(e) => set('url', e.target.value)} placeholder="Opsional..." />
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
