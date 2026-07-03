import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Instagram, Youtube, Leaf } from 'lucide-react'
import lemahAsriData from '#/data/lemah-asri.json'

export const Route = createFileRoute('/lemah-asri')({ component: LemahAsri })

function LemahAsri() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const data = lemahAsriData

  return (
    <div>
      {/* Hero */}
      <section className="relative flex items-end min-h-[40vh] overflow-hidden -mt-20">
        <img
          src="/hero.png"
          alt="Lemah Asri"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent" />
        <div className="page-wrap relative z-10 w-full pb-16">
          <Leaf className="h-12 w-12 text-emerald-400" />
          <h1 className="display-title mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {data.namaUsaha[lang] ?? data.namaUsaha.id}
          </h1>
          <p className="mt-2 text-lg text-white/80">
            {t('lemahAsri.tagline', 'Lembaga Usaha Tamanan Sadar Wisata')}
          </p>
        </div>
      </section>

      {/* Info Kontak */}
      <section className="page-wrap -mt-10 relative z-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            { icon: <MapPin className="h-5 w-5" />, label: t('lemahAsri.lokasi', 'Lokasi'), value: data.lokasi },
            { icon: <Phone className="h-5 w-5" />, label: t('lemahAsri.noTelp', 'Telepon'), value: data.noTelp, href: `tel:${data.noTelp}` },
            { icon: <Mail className="h-5 w-5" />, label: t('lemahAsri.email', 'Email'), value: data.email, href: `mailto:${data.email}` },
            { icon: <Instagram className="h-5 w-5" />, label: 'Instagram', value: data.instagram, href: `https://instagram.com/${data.instagram}` },
            { icon: <Youtube className="h-5 w-5" />, label: 'YouTube', value: data.youtube, href: `https://youtube.com/@${data.youtube.replace(/\s/g, '')}` },
          ].map((item, i) => (
            <div key={i} className="feature-card rounded-2xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                {item.icon}
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-medium text-neutral-900 hover:text-emerald-700">
                  {item.value}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-neutral-900">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="page-wrap py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="feature-card rounded-2xl p-6 md:p-8">
            <h2 className="display-title text-lg md:text-xl font-bold text-neutral-900">
              {t('lemahAsri.visi', 'Visi Usaha')}
            </h2>
            <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-neutral-600">
              {data.visi[lang] ?? data.visi.id}
            </p>
          </div>

          <div className="feature-card rounded-2xl p-6 md:p-8">
            <h2 className="display-title text-lg md:text-xl font-bold text-neutral-900">
              {t('lemahAsri.misi', 'Misi Usaha')}
            </h2>
            <ul className="mt-4 space-y-2">
              {(data.misi[lang] ?? data.misi.id).split('\n').map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm sm:text-[15px] leading-relaxed text-neutral-600">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
                  {item.replace(/^•\s*/, '')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi */}
      <section className="bg-emerald-50 py-12 md:py-16">
        <div className="page-wrap">
          <h2 className="display-title text-forest text-center text-2xl md:text-3xl lg:text-4xl font-bold">
            {t('lemahAsri.strukturOrganisasi', 'Struktur Organisasi')}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.strukturOrganisasi.map((item, i) => (
              <div key={i} className="feature-card rounded-2xl p-4 md:p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {item.jabatan}
                </p>
                <p className="mt-2 text-base font-bold text-neutral-900">
                  {item.nama}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="page-wrap py-12 md:py-16">
        <h2 className="display-title text-forest text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          {t('lemahAsri.trackRecord', 'Track Record')}
        </h2>

        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {data.trackRecord.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-emerald-50 px-5 py-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-neutral-700">{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
