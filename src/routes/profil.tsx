import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Landmark, ShoppingBag, Users, TreePine } from 'lucide-react'

export const Route = createFileRoute('/profil')({ component: Profil })

const potensiData = [
  {
    icon: <Landmark className="h-6 w-6" />,
    titleKey: 'profil.potensi.budaya',
    descKey: 'profil.potensi.budaya.desc',
    fallbackTitle: 'Budaya',
    fallbackDesc: 'Kesenian tradisional yang lestari',
    color: 'bg-amber-100 text-amber-700',
  },
  {
    icon: <TreePine className="h-6 w-6" />,
    titleKey: 'profil.potensi.wisata',
    descKey: 'profil.potensi.wisata.desc',
    fallbackTitle: 'Wisata',
    fallbackDesc: 'Destinasi dan atraksi menarik',
    color: 'bg-emerald-100 text-emerald-700',
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    titleKey: 'profil.potensi.umkm',
    descKey: 'profil.potensi.umkm.desc',
    fallbackTitle: 'UMKM',
    fallbackDesc: 'Produk unggulan warga',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    icon: <Users className="h-6 w-6" />,
    titleKey: 'profil.potensi.sdm',
    descKey: 'profil.potensi.sdm.desc',
    fallbackTitle: 'SDM',
    fallbackDesc: 'Sumber daya manusia berkualitas',
    color: 'bg-purple-100 text-purple-700',
  },
]

const mitraList = [
  'RS Bethesda Yogyakarta',
  'GENBI',
  'DEM UGM',
  'BEM FEB UGM',
  'Bengkel Sapi Kalijeruk',
]

function Profil() {
  const { t } = useTranslation()

  return (
    <div>
      {/* Hero */}
      <section className="relative flex items-end min-h-[50vh] overflow-hidden -mt-20">
        <img
          src="/hero.png"
          alt="Desa Tamanan"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="page-wrap relative z-10 w-full pb-16">
          <span className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
            {t('nav.profil')}
          </span>
          <h1 className="display-title mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {t('profil.hero.title', 'Desa Tamanan')}
          </h1>
          <p className="mt-3 text-lg text-white/80">
            {t('profil.hero.tagline', 'Pedukuhan dengan segudang potensi')}
          </p>
        </div>
      </section>

      {/* Definisi Desa */}
      <section className="page-wrap py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="/hero.png"
              alt="Desa Tamanan"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              {t('profil.definisi.title', 'Definisi Desa')}
            </p>
            <h2 className="display-title text-forest mt-3 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              {t('section.profil.title', 'Desa Tamanan')}
            </h2>
            <p className="mt-5 text-sm sm:text-[15px] leading-relaxed text-neutral-600">
              {t('section.profil.description', 'Tamanan adalah pedukuhan yang terletak di Kalasan, Sleman, Daerah Istimewa Yogyakarta.')}
            </p>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-neutral-600">
              Tamanan memiliki berbagai potensi yang dikelola oleh Lemah Asri (Lembaga Usaha Tamanan Sadar Wisata) sejak tahun 2021, meliputi event organizer, ekonomi kreatif, dan UMKM.
            </p>
          </div>
        </div>
      </section>

      {/* Potensi Desa */}
      <section className="bg-emerald-50 py-12 md:py-16">
        <div className="page-wrap">
          <div className="text-center">
            <h2 className="display-title text-forest text-2xl md:text-3xl lg:text-4xl font-bold">
              {t('profil.potensi.title', 'Potensi Desa')}
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {potensiData.map((item, i) => (
              <div
                key={i}
                className="feature-card rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
              >
                <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-forest mt-4 text-lg font-bold">
                  {t(item.titleKey, item.fallbackTitle)}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  {t(item.descKey, item.fallbackDesc)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mitra */}
      <section className="page-wrap py-12 md:py-16">
        <div className="text-center">
          <h2 className="display-title text-forest text-2xl md:text-3xl lg:text-4xl font-bold">
            {t('profil.mitra.title', 'Mitra Kami')}
          </h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">
          {mitraList.map((mitra, i) => (
            <div
              key={i}
              className="feature-card flex items-center rounded-2xl px-8 py-5 font-semibold text-neutral-700"
            >
              {mitra}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
