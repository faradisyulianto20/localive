import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/admins/new')({ component: AdminNew })

function AdminNew() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const errs: Record<string, string> = {}
    if (!form.name) errs.name = 'Wajib'
    if (!form.email) errs.email = 'Wajib'
    if (!form.password) errs.password = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      await api.post('/admins', form)
      navigate({ to: '/admin/admins' })
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  return (
    <div className="max-w-lg">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Tambah Admin</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <FormField label="Nama" required error={errors.name}>
              <Input className="rounded-lg border-[#EAEAEC]" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Nama lengkap..." />
            </FormField>
            <FormField label="Email" required error={errors.email}>
              <Input className="rounded-lg border-[#EAEAEC]" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="admin@localive.id" />
            </FormField>
            <FormField label="Password" required error={errors.password}>
              <Input className="rounded-lg border-[#EAEAEC]" type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="Min. 8 karakter" />
            </FormField>
            <FormField label="Role" required>
              <Select value={form.role} onValueChange={(v) => set('role', v)}>
                <SelectTrigger className="rounded-lg border-[#EAEAEC]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </CardContent>
          <CardFooter className="gap-3">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/admins' })}>Batal</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
