import { ArrowRight, GraduationCap, PawPrint, Sprout } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInView } from '#/hooks/use-in-view.ts'

const POINTS = [
  { icon: Sprout, key: 'edukasi', label: 'Edukasi Budaya & Alam' },
  { icon: GraduationCap, key: 'outing', label: 'Outing Class & Praktik Langsung' },
  { icon: PawPrint, key: 'agrowisata', label: 'Agrowisata Peternakan' },
]

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
        {/* gradient hijau ke transparent di sisi kanan */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-emerald-800/70" />
      </div>

      <div className="page-wrap relative z-10 py-12 md:py-16">
        <div className="max-w-lg rounded-xl bg-white p-6 md:p-8 shadow-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            {t('section.lemahAsri.eyebrow', 'Lembaga Masyarakat')}
          </span>

          <h2 className="display-title mt-2 text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-900">
            {t('section.lemahAsri.title', 'Mengenal LEMAH ASRI')}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-neutral-600">
            {t(
              'section.lemahAsri.description',
              'Lembaga Usaha Tamanan Sadar Wisata (LEMAH ASRI) merupakan payung besar yang menaungi seluruh inisiatif pemberdayaan di Tamanan, mengelola potensi  yang ada di Padukuhan Tamanan',
            )}
          </p>

          <ul className="mt-6 space-y-3">
            {POINTS.map(({ icon: Icon, key, label }) => (
              <li key={key}>
                <div className="flex items-center gap-3 rounded-full bg-emerald-50 py-2 pl-2 pr-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-800">
                    <Icon className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-sm font-medium text-emerald-900">
                    {t(`section.lemahAsri.points.${key}`, label)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="/lemah-asri"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
          >
            {t('section.lemahAsri.cta', 'Kenali LEMAH ASRI')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}