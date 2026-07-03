import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import UMKMCard from './umkm-card'
import umkmData from '#/lib/umkm.json'

export default function ProdukUMKMSection() {
  const { t } = useTranslation()
  const items = umkmData.items.slice(0, 6)

  return (
    <section id="umkm" className="page-wrap py-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          {t('section.umkm.kicker')}
        </p>
        <h2 className="display-title text-forest mt-2 text-3xl font-bold leading-tight md:text-4xl">
          {t('section.umkm.title', 'Produk Unggulan UMKM Tamanan')}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <UMKMCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/umkm"
          className="inline-flex items-center gap-2 rounded-full border border-amber-700/60 px-6 py-3 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
        >
          {t('section.umkm.cta', 'Lihat Semua UMKM')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
