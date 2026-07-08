import { useState, useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Textarea } from '../../../components/ui/textarea'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import FormField from '../../../components/admin/form-field'
import { api } from '../../../lib/api'
import { useQuery } from '@tanstack/react-query'
import { Plus, X } from 'lucide-react'

export const Route = createFileRoute('/admin/lemah-asri/edit')({ component: LemahAsriEdit })

interface Profile {
  business_name: { id: string; en: string }
  owner: { id: string; en: string }
  founded_date: string | null
  location: { id: string; en: string }
  phone: string | null
  email: string | null
  ig_url: string | null
  yt_url: string | null
}

interface VillageInfo {
  vision: { id: string; en: string }
  mission: { id: string; en: string }
}

interface TrackRecord {
  id: number
  content: { id: string; en: string }
}

interface OrgMember {
  id: number
  name: { id: string; en: string }
}

function LemahAsriEdit() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [msg, setMsg] = useState('')

  const profile = useQuery({ queryKey: ['profile'], queryFn: () => api.get<{ data: Profile }>('/profile') })
  const villageInfo = useQuery({ queryKey: ['village-info'], queryFn: () => api.get<{ data: VillageInfo }>('/village-info') })
  const trackRecords = useQuery({ queryKey: ['track-records'], queryFn: () => api.get<{ data: TrackRecord[] }>('/track-records') })
  const orgMembers = useQuery({ queryKey: ['organization-members'], queryFn: () => api.get<{ data: OrgMember[] }>('/organization-members') })

  const [pForm, setPForm] = useState({ bizId: '', bizEn: '', ownerId: '', ownerEn: '', founded: '', locId: '', locEn: '', phone: '', email: '', ig: '', yt: '' })
  const [vForm, setVForm] = useState({ visiId: '', visiEn: '', misiId: '', misiEn: '' })
  const [tracks, setTracks] = useState<{ dbId: number | null; id: string; en: string }[]>([])
  const [members, setMembers] = useState<{ dbId: number | null; id: string; en: string }[]>([])

  useEffect(() => {
    const p = profile.data?.data
    if (p) {
      setPForm({
        bizId: p.business_name.id, bizEn: p.business_name.en, ownerId: p.owner.id, ownerEn: p.owner.en,
        founded: p.founded_date?.slice(0, 10) ?? '', locId: p.location.id, locEn: p.location.en,
        phone: p.phone ?? '', email: p.email ?? '', ig: p.ig_url ?? '', yt: p.yt_url ?? '',
      })
    }
  }, [profile.data])

  useEffect(() => {
    const v = villageInfo.data?.data
    if (v) setVForm({ visiId: v.vision.id, visiEn: v.vision.en, misiId: v.mission.id, misiEn: v.mission.en })
  }, [villageInfo.data])

  useEffect(() => {
    const t = trackRecords.data?.data
    if (t) setTracks(t.map((r) => ({ dbId: r.id, id: r.content.id, en: r.content.en })))
  }, [trackRecords.data])

  useEffect(() => {
    const m = orgMembers.data?.data
    if (m) setMembers(m.map((r) => ({ dbId: r.id, id: r.name.id, en: r.name.en })))
  }, [orgMembers.data])

  const loadingAll = profile.isLoading || villageInfo.isLoading || trackRecords.isLoading || orgMembers.isLoading

  if (loadingAll) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setMsg('')
    const errs: Record<string, string> = {}
    if (!pForm.bizId) errs.bizId = 'Wajib'
    if (!pForm.ownerId) errs.ownerId = 'Wajib'
    if (!pForm.locId) errs.locId = 'Wajib'
    if (!vForm.visiId) errs.visiId = 'Wajib'
    if (!vForm.misiId) errs.misiId = 'Wajib'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    try {
      // Save profile + village info
      await Promise.all([
        api.patch('/profile', {
          business_name: { id: pForm.bizId, en: pForm.bizEn },
          owner: { id: pForm.ownerId, en: pForm.ownerEn },
          founded_date: pForm.founded || undefined,
          location: { id: pForm.locId, en: pForm.locEn },
          phone: pForm.phone || undefined,
          email: pForm.email || undefined,
          ig_url: pForm.ig || undefined,
          yt_url: pForm.yt || undefined,
        }),
        api.patch('/village-info', {
          vision: { id: vForm.visiId, en: vForm.visiEn },
          mission: { id: vForm.misiId, en: vForm.misiEn },
        }),
      ])

      // Track records: only send changes
      const existingTracks = trackRecords.data?.data ?? []
      const deleteTracks = existingTracks.filter((t) => !tracks.find((f) => f.dbId === t.id))
      const newTracks = tracks.filter((t) => !t.dbId && t.id)
      const updateTracks = tracks.filter((t) => t.dbId && existingTracks.find((e) => e.id === t.dbId && (e.content.id !== t.id || e.content.en !== t.en)))

      await Promise.all([
        ...deleteTracks.map((t) => api.delete(`/track-records/${t.id}`)),
        ...newTracks.map((t) => api.post('/track-records', { content: { id: t.id, en: t.en } })),
        ...updateTracks.map((t) => api.patch(`/track-records/${t.dbId}`, { content: { id: t.id, en: t.en } })),
      ])

      // Org members: only send changes
      const existingMembers = orgMembers.data?.data ?? []
      const deleteMembers = existingMembers.filter((m) => !members.find((f) => f.dbId === m.id))
      const newMembers = members.filter((m) => !m.dbId && m.id)
      const updateMembers = members.filter((m) => m.dbId && existingMembers.find((e) => e.id === m.dbId && (e.name.id !== m.id || e.name.en !== m.en)))

      await Promise.all([
        ...deleteMembers.map((m) => api.delete(`/organization-members/${m.id}`)),
        ...newMembers.map((m) => api.post('/organization-members', { name: { id: m.id, en: m.en } })),
        ...updateMembers.map((m) => api.patch(`/organization-members/${m.dbId}`, { name: { id: m.id, en: m.en } })),
      ])

      setMsg('Profil berhasil disimpan.')
      // Refetch
      profile.refetch()
      villageInfo.refetch()
      trackRecords.refetch()
      orgMembers.refetch()
    } catch {
      setErrors({ form: 'Gagal menyimpan. Coba lagi.' })
    }
    setLoading(false)
  }

  const pSet = (k: string, v: string) => setPForm((prev) => ({ ...prev, [k]: v }))
  const vSet = (k: string, v: string) => setVForm((prev) => ({ ...prev, [k]: v }))

  return (
    <div className="max-w-3xl">
      <Card className="shadow-none border-[#EAEAEC] rounded-2xl">
        <CardHeader><CardTitle className="text-lg font-semibold text-[#111214]">Edit Profil Lemah Asri</CardTitle></CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {/* Profile */}
            <div>
              <h3 className="text-sm font-semibold text-[#111214] mb-3">Informasi Umum</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Nama Usaha (ID)" required error={errors.bizId}>
                    <Input className="rounded-lg border-[#EAEAEC]" value={pForm.bizId} onChange={(e) => pSet('bizId', e.target.value)} />
                  </FormField>
                  <FormField label="Business Name (EN)">
                    <Input className="rounded-lg border-[#EAEAEC]" value={pForm.bizEn} onChange={(e) => pSet('bizEn', e.target.value)} />
                  </FormField>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Pemilik (ID)" required error={errors.ownerId}>
                    <Input className="rounded-lg border-[#EAEAEC]" value={pForm.ownerId} onChange={(e) => pSet('ownerId', e.target.value)} />
                  </FormField>
                  <FormField label="Owner (EN)">
                    <Input className="rounded-lg border-[#EAEAEC]" value={pForm.ownerEn} onChange={(e) => pSet('ownerEn', e.target.value)} />
                  </FormField>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Tahun Berdiri">
                    <Input className="rounded-lg border-[#EAEAEC]" type="date" value={pForm.founded} onChange={(e) => pSet('founded', e.target.value)} />
                  </FormField>
                  <FormField label="Lokasi (ID)" required error={errors.locId}>
                    <Input className="rounded-lg border-[#EAEAEC]" value={pForm.locId} onChange={(e) => pSet('locId', e.target.value)} />
                  </FormField>
                </div>
                <FormField label="Location (EN)">
                  <Input className="rounded-lg border-[#EAEAEC]" value={pForm.locEn} onChange={(e) => pSet('locEn', e.target.value)} />
                </FormField>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="No Telepon"><Input className="rounded-lg border-[#EAEAEC]" value={pForm.phone} onChange={(e) => pSet('phone', e.target.value)} /></FormField>
                  <FormField label="Email"><Input className="rounded-lg border-[#EAEAEC]" type="email" value={pForm.email} onChange={(e) => pSet('email', e.target.value)} /></FormField>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Instagram URL"><Input className="rounded-lg border-[#EAEAEC]" value={pForm.ig} onChange={(e) => pSet('ig', e.target.value)} /></FormField>
                  <FormField label="YouTube URL"><Input className="rounded-lg border-[#EAEAEC]" value={pForm.yt} onChange={(e) => pSet('yt', e.target.value)} /></FormField>
                </div>
              </div>
            </div>

            {/* Visi Misi */}
            <div>
              <h3 className="text-sm font-semibold text-[#111214] mb-3">Visi & Misi</h3>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Visi (ID)" required error={errors.visiId}>
                    <Textarea className="rounded-lg border-[#EAEAEC]" value={vForm.visiId} onChange={(e) => vSet('visiId', e.target.value)} rows={3} />
                  </FormField>
                  <FormField label="Vision (EN)">
                    <Textarea className="rounded-lg border-[#EAEAEC]" value={vForm.visiEn} onChange={(e) => vSet('visiEn', e.target.value)} rows={3} />
                  </FormField>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Misi (ID)" required error={errors.misiId}>
                    <Textarea className="rounded-lg border-[#EAEAEC]" value={vForm.misiId} onChange={(e) => vSet('misiId', e.target.value)} rows={4} />
                  </FormField>
                  <FormField label="Mission (EN)">
                    <Textarea className="rounded-lg border-[#EAEAEC]" value={vForm.misiEn} onChange={(e) => vSet('misiEn', e.target.value)} rows={4} />
                  </FormField>
                </div>
              </div>
            </div>

            {/* Track Record */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#111214]">Track Record</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => setTracks([...tracks, { dbId: null, id: '', en: '' }])}>
                  <Plus className="h-4 w-4" /> Tambah
                </Button>
              </div>
              {tracks.map((item, i) => (
                <div key={i} className="mb-2 grid grid-cols-2 gap-2">
                  <Input className="rounded-lg border-[#EAEAEC]" value={item.id} onChange={(e) => { const n = [...tracks]; n[i] = { ...n[i], id: e.target.value }; setTracks(n) }} placeholder="Bahasa Indonesia" />
                  <div className="flex gap-2">
                    <Input className="rounded-lg border-[#EAEAEC]" value={item.en} onChange={(e) => { const n = [...tracks]; n[i] = { ...n[i], en: e.target.value }; setTracks(n) }} placeholder="English" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => setTracks(tracks.filter((_, j) => j !== i))}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {tracks.length === 0 && <p className="text-sm text-[#8B8D98]">Belum ada track record</p>}
            </div>

            {/* Struktur Organisasi */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#111214]">Struktur Organisasi</h3>
                <Button type="button" variant="outline" size="sm" onClick={() => setMembers([...members, { dbId: null, id: '', en: '' }])}>
                  <Plus className="h-4 w-4" /> Tambah
                </Button>
              </div>
              {members.map((item, i) => (
                <div key={i} className="mb-2 grid grid-cols-2 gap-2">
                  <Input className="rounded-lg border-[#EAEAEC]" value={item.id} onChange={(e) => { const n = [...members]; n[i] = { ...n[i], id: e.target.value }; setMembers(n) }} placeholder="Jabatan - Nama (ID)" />
                  <div className="flex gap-2">
                    <Input className="rounded-lg border-[#EAEAEC]" value={item.en} onChange={(e) => { const n = [...members]; n[i] = { ...n[i], en: e.target.value }; setMembers(n) }} placeholder="Position - Name (EN)" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => setMembers(members.filter((_, j) => j !== i))}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {members.length === 0 && <p className="text-sm text-[#8B8D98]">Belum ada anggota</p>}
            </div>
          </CardContent>
          <CardFooter className="gap-3 flex-wrap">
            <Button type="submit" disabled={loading}>{loading ? '...' : 'Simpan Semua'}</Button>
            <Button type="button" variant="outline" onClick={() => navigate({ to: '/admin/lemah-asri' })}>Batal</Button>
            {msg && <span className="text-sm text-emerald-600">{msg}</span>}
            {errors.form && <span className="text-sm text-red-600">{errors.form}</span>}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
