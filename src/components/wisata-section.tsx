import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import WisataCard from './wisata-card'
import wisataData from '#/lib/wisata.json'

export default function WisataSection() {
  const { t } = useTranslation()
  const items = wisataData.items.slice(0, 6)

  return (
    <section id="wisata" className="page-wrap py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            {t('section.wisata.kicker')}
          </p>
          <h2 className="display-title text-forest mt-2 max-w-xl text-3xl font-bold leading-tight md:text-4xl">
            {t('section.wisata.title', 'Jelajahi Wisata Tamanan')}
          </h2>
        </div>

        <a
          href="/wisata"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
        >
          {t('section.wisata.cta', 'Lihat Semua Wisata')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {items.map((item) => (
          <WisataCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
