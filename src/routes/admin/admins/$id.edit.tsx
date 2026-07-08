import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'

export const Route = createFileRoute('/admin/admins/$id/edit')({ component: AdminEdit })

interface Admin {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'admin'
}

function AdminEdit() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const { data, isLoading } = useQuery({
    queryKey: ['admin', id],
    queryFn: () => api.get<{ data: Admin }>(`/admins/${id}`),
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' })

  const item = data?.data

  useEffect(() => {
    if (item) {
      setForm({ name: item.name, email: item.email, password: '', role: item.role })
    }
  }, [item])

  if (isLoading) return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>
  if (!item) return <div className="text-sm text-[#8B8D98]">Admin tidak ditemukan</div>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    const errs: Record<string, string> = {}
    if (!form.name) errs.name = 'Wajib'
    if (!form.email) errs.email = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      await api.put(`/admins/${id}`, {
        name: form.name,
        email: form.email,
        role: form.role,
        ...(form.password ? { password: form.password } : {}),
      })
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
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Edit Admin</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <FormField label="Nama" required error={errors.name}>
              <Input className="rounded-lg border-[#EAEAEC]" value={form.name} onChange={(e) => set('name', e.target.value)} />
            </FormField>
            <FormField label="Email" required error={errors.email}>
              <Input className="rounded-lg border-[#EAEAEC]" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
            </FormField>
            <FormField label="Password (kosongkan jika tidak ingin mengubah)">
              <Input className="rounded-lg border-[#EAEAEC]" type="password" value={form.password} onChange={(e) => set('password', e.target.value)} placeholder="Min. 8 karakter" />
            </FormField>
            <FormField label="Role">
              <Select key={item.id} defaultValue={item.role} onValueChange={(v) => set('role', v)}>
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
