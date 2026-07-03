import { ArrowRight, Landmark, Palette, Mountain } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInView } from '#/hooks/use-in-view.ts'
import wisataData from '#/lib/wisata.json'

const categoryIcons: Record<string, React.ReactNode> = {
  destinasi: <Landmark className="h-8 w-8" />,
  atraksi: <Palette className="h-8 w-8" />,
  aktivitas: <Mountain className="h-8 w-8" />,
}

const categoryDescriptions: Record<string, { id: string; en: string }> = {
  destinasi: {
    id: 'Jelajahi tempat-tempat bersejarah dan budaya di Tamanan, dari cagar budaya hingga sanggar seni.',
    en: 'Explore historical and cultural places in Tamanan, from heritage sites to art studios.',
  },
  atraksi: {
    id: 'Saksikan pertunjukan seni tradisional yang memukau, mulai dari macapat, gejok lesung, hingga karawitan.',
    en: 'Witness captivating traditional art performances, from macapat, gejok lesung, to karawitan.',
  },
  aktivitas: {
    id: 'Rasakan pengalaman seru bertani, beternak, jelajah desa, dan berbagai aktivitas alam lainnya.',
    en: 'Experience fun farming, livestock, village exploration, and various other nature activities.',
  },
}

export default function WisataSection() {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const items = wisataData.items
  const { ref, inView } = useInView()

  const categories = wisataData.categories.map((cat) => ({
    ...cat,
    count: items.filter((i) => i.category === cat.slug).length,
    desc: categoryDescriptions[cat.slug],
  }))

  return (
    <section id="wisata" ref={ref} className={`page-wrap py-16 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          {t('section.wisata.kicker')}
        </p>
        <h2 className="display-title text-forest mt-2 text-3xl font-bold leading-tight md:text-4xl">
          {t('section.wisata.title', 'Jelajahi Wisata Tamanan')}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {categories.map((cat, index) => (
          <div
            key={cat.slug}
            className={`rounded-xl border border-neutral-100 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-md ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              {categoryIcons[cat.slug]}
            </div>
            <h3 className="mt-4 text-lg font-bold text-forest">{cat.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {cat.desc?.[lang] ?? cat.desc?.id}
            </p>
            <span className="mt-3 inline-block text-xs font-semibold text-amber-700">
              {cat.count} Paket Tersedia
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/wisata"
          className="inline-flex items-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
        >
          Lihat Selengkapnya
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
