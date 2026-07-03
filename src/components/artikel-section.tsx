import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import ArtikelCard from './artikel-card'
import type { ArtikelItem } from './artikel-card'

interface ArtikelSectionProps {
  items: ArtikelItem[]
}

export default function ArtikelSection({ items }: ArtikelSectionProps) {
  const { t } = useTranslation()
  const latest = items.slice(0, 3)

  if (latest.length === 0) return null

  return (
    <section id="artikel" className="page-wrap py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="display-title text-forest text-3xl font-bold leading-tight md:text-4xl">
            {t('section.artikel.title', 'Artikel & Berita')}
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            {t('section.artikel.subtitle', 'Informasi terbaru seputar Tamanan dan Lemah Asri')}
          </p>
        </div>

        <a
          href="/artikel"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-amber-700/60 px-6 py-3 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
        >
          {t('nav.artikel')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((item) => (
          <ArtikelCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
