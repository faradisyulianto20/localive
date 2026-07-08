import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import { api } from '../../../lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/lemah-asri/')({ component: LemahAsriView })

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

function LemahAsriView() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'

  const profile = useQuery({ queryKey: ['profile'], queryFn: () => api.get<{ data: Profile }>('/profile') })
  const villageInfo = useQuery({ queryKey: ['village-info'], queryFn: () => api.get<{ data: VillageInfo }>('/village-info') })
  const trackRecords = useQuery({ queryKey: ['track-records'], queryFn: () => api.get<{ data: TrackRecord[] }>('/track-records') })
  const orgMembers = useQuery({ queryKey: ['organization-members'], queryFn: () => api.get<{ data: OrgMember[] }>('/organization-members') })

  const loading = profile.isLoading || villageInfo.isLoading || trackRecords.isLoading || orgMembers.isLoading

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  const tVal = (obj: { id: string; en: string } | undefined, l: 'id' | 'en') => {
    const v = obj?.[l] ?? ''
    return v || '-'
  }

  const p = profile.data?.data
  const vi = villageInfo.data?.data
  const tracks = trackRecords.data?.data ?? []
  const members = orgMembers.data?.data ?? []

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="display-title text-2xl font-bold text-neutral-900">
          {t('admin.lemahAsri.title', 'Profil Lemah Asri')}
        </h1>
        <Link to="/admin/lemah-asri/edit">
          <Button>{t('admin.lemahAsri.edit', 'Edit Profil')}</Button>
        </Link>
      </div>

      <div className="mt-6 space-y-6">
        {p && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Informasi Umum</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Nama Usaha</dt><dd className="mt-1 text-sm text-neutral-900">{tVal(p?.business_name, lang)}</dd></div>
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Pemilik</dt><dd className="mt-1 text-sm text-neutral-900">{tVal(p?.owner, lang)}</dd></div>
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Tahun Berdiri</dt><dd className="mt-1 text-sm text-neutral-900">{p?.founded_date || '-'}</dd></div>
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Lokasi</dt><dd className="mt-1 text-sm text-neutral-900">{tVal(p?.location, lang)}</dd></div>
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Telepon</dt><dd className="mt-1 text-sm text-neutral-900">{p.phone ?? '-'}</dd></div>
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Email</dt><dd className="mt-1 text-sm text-neutral-900">{p.email ?? '-'}</dd></div>
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Instagram</dt><dd className="mt-1 text-sm text-neutral-900">{p.ig_url ?? '-'}</dd></div>
              <div><dt className="text-xs font-semibold text-neutral-500 uppercase">YouTube</dt><dd className="mt-1 text-sm text-neutral-900">{p.yt_url ?? '-'}</dd></div>
            </dl>
          </div>
        )}

        {vi && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-900">Visi</h2>
              <p className="mt-2 text-sm text-neutral-600">{tVal(vi?.vision, lang)}</p>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-neutral-900">Misi</h2>
              <p className="mt-2 whitespace-pre-line text-sm text-neutral-600">{tVal(vi?.mission, lang)}</p>
            </div>
          </div>
        )}

        {members.length > 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Struktur Organisasi ({members.length} orang)</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((item) => {
                const name = tVal(item.name, lang)
                if (name === '-') return null
                const parts = name.split(' - ')
                return (
                  <div key={item.id} className="rounded-lg bg-neutral-50 p-4">
                    {parts.length === 2 && <p className="text-xs font-semibold uppercase text-amber-700">{parts[0]}</p>}
                    <p className="mt-1 text-sm font-medium text-neutral-900">{parts.length === 2 ? parts[1] : name}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {tracks.length > 0 && (
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Track Record ({tracks.length} item)</h2>
            <div className="mt-4 space-y-2">
              {tracks.map((item, i) => (
                <div key={item.id} className="flex items-center gap-3 rounded-lg bg-neutral-50 px-4 py-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">{i + 1}</span>
                  <span className="text-sm text-neutral-700">{tVal(item.content, lang)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
