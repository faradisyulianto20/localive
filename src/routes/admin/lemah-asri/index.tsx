import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../components/ui/button'
import lemahAsriData from '#/data/lemah-asri.json'

export const Route = createFileRoute('/admin/lemah-asri/')({ component: LemahAsriView })

function LemahAsriView() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const data = lemahAsriData

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
        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">Informasi Umum</h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Nama Usaha</dt><dd className="mt-1 text-sm text-neutral-900">{data.namaUsaha[lang] ?? data.namaUsaha.id}</dd></div>
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Pemilik</dt><dd className="mt-1 text-sm text-neutral-900">{data.pemilik}</dd></div>
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Tahun Berdiri</dt><dd className="mt-1 text-sm text-neutral-900">{data.tahunBerdiri}</dd></div>
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Lokasi</dt><dd className="mt-1 text-sm text-neutral-900">{data.lokasi}</dd></div>
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Telepon</dt><dd className="mt-1 text-sm text-neutral-900">{data.noTelp}</dd></div>
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Email</dt><dd className="mt-1 text-sm text-neutral-900">{data.email}</dd></div>
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">Instagram</dt><dd className="mt-1 text-sm text-neutral-900">{data.instagram}</dd></div>
            <div><dt className="text-xs font-semibold text-neutral-500 uppercase">YouTube</dt><dd className="mt-1 text-sm text-neutral-900">{data.youtube}</dd></div>
          </dl>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Visi</h2>
            <p className="mt-2 text-sm text-neutral-600">{data.visi[lang] ?? data.visi.id}</p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-neutral-900">Misi</h2>
            <ul className="mt-2 space-y-1">
              {(data.misi[lang] ?? data.misi.id).split('\n').map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                  {item.replace(/^•\s*/, '')}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">Struktur Organisasi ({data.strukturOrganisasi.length} orang)</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.strukturOrganisasi.map((item, i) => (
              <div key={i} className="rounded-lg bg-neutral-50 p-4">
                <p className="text-xs font-semibold uppercase text-amber-700">{item.jabatan}</p>
                <p className="mt-1 text-sm font-medium text-neutral-900">{item.nama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-neutral-900">Track Record ({data.trackRecord.length} item)</h2>
          <div className="mt-4 space-y-2">
            {data.trackRecord.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg bg-neutral-50 px-4 py-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">{i + 1}</span>
                <span className="text-sm text-neutral-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
