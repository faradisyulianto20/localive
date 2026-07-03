import { ArrowRight, Leaf } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInView } from '#/hooks/use-in-view.ts'

export default function LemahAsriSection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className={`relative min-h-[420px] overflow-hidden transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
      <div className="absolute inset-0">
        <img
          src="/hero.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/85 via-emerald-800/50 to-transparent" />
      </div>

      <div className="page-wrap relative z-10 py-16">
        <div className="max-w-lg rounded-xl bg-white p-8 shadow-lg">
          <Leaf className="h-10 w-10 text-emerald-600" />
          <h2 className="display-title mt-4 text-3xl font-bold text-forest md:text-4xl">
            {t('section.lemahAsri.title', 'Mengenal Lemah Asri')}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {t('section.lemahAsri.description', 'Lembaga Usaha Tamanan Sadar Wisata')}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
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
      </div>
    </section>
  )
}
