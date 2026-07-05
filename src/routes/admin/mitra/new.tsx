import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { createMitra } from '../../../server/functions/profil'

export const Route = createFileRoute('/admin/mitra/new')({ component: MitraNew })

function MitraNew() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    logo: '',
    nama: '',
    url: '',
  })

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
      await createMitra({
        data: {
          logo: form.logo,
          nama: form.nama,
          url: form.url || null,
        },
      })
      navigate({ to: '/admin/mitra' })
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
          <CardTitle className="text-lg font-semibold text-[#111214]">Tambah Mitra</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <FormField label="Logo (URL)" required error={errors.logo}>
              <Input className="rounded-lg border-[#EAEAEC]" type="url" value={form.logo} onChange={(e) => set('logo', e.target.value)} placeholder="https://..." />
            </FormField>

            <FormField label="Nama Perusahaan" required error={errors.nama}>
              <Input className="rounded-lg border-[#EAEAEC]" value={form.nama} onChange={(e) => set('nama', e.target.value)} placeholder="Masukkan nama..." />
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
