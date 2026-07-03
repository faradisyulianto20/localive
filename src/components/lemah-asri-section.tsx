import { ArrowRight, Leaf } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function LemahAsriSection() {
  const { t } = useTranslation()

  return (
    <section id="lemah-asri" className="bg-emerald-950 py-16">
      <div className="page-wrap">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div className="text-white">
            <Leaf className="h-10 w-10 text-emerald-400" />
            <h2 className="display-title mt-4 text-3xl font-bold leading-tight md:text-4xl">
              {t('section.lemahAsri.title', 'Mengenal Lemah Asri')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              {t('section.lemahAsri.description', 'Lembaga Usaha Tamanan Sadar Wisata')}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Lembaga Usaha Tamanan Sadar Wisata (Lemah Asri) adalah sebuah usaha di bidang event organizer, ekonomi kreatif, dan UMKM sejak tahun 2021, yang mengelola potensi-potensi yang ada di Pedukuhan Tamanan.
            </p>
            <a
              href="/lemah-asri"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              {t('section.lemahAsri.cta', 'Lihat Profil Lemah Asri')}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <img
              src="/hero.png"
              alt="Lemah Asri"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
