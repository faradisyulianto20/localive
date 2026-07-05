import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInView } from '#/hooks/use-in-view.ts'
import wisataData from '#/lib/wisata.json'
import heroImg from '../../public/hero.png' // sesuaikan path import hero.png kamu

const categoryImages: Record<string, string> = {
  destinasi: heroImg,
  atraksi: heroImg,
  aktivitas: heroImg,
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
    image: categoryImages[cat.slug],
  }))

  return (
    <section id="wisata" ref={ref} className={`page-wrap py-12 md:py-16 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brown">
          {t('section.wisata.kicker')}
        </p>
        <h2 className="display-title text-forest mt-2 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
          {t('section.wisata.title', 'Jelajahi Wisata Tamanan')}
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
        {categories.map((cat, index) => (
          <div
            key={cat.slug}
            className={`group relative aspect-[4/5] md:aspect-[4/4.5] overflow-hidden rounded-lg shadow-sm transition-all duration-500 hover:shadow-xl ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gambar penuh */}
            <img
              src={cat.image}
              alt={cat.label}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay gelap tipis, menguat saat hover agar teks tetap terbaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/20" />

            {/* Label kategori saat default (belum hover), posisinya naik & fade-out saat hover */}
            <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
              <h3 className="text-lg md:text-xl font-bold text-white">{t('wisata.filter.' + cat.slug)}</h3>
            </div>

            {/* Panel detail: slide-up dari bawah saat hover */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white p-5 transition-transform duration-400 ease-out group-hover:translate-y-0">
              <h3 className="text-lg font-bold text-forest">{t('wisata.filter.' + cat.slug)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brown/80 line-clamp-3">
                {cat.desc?.[lang] ?? cat.desc?.id}
              </p>
              <span className="mt-3 inline-block text-xs font-semibold text-terracotta">
                {t('wisata.paketTersedia', { count: cat.count })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="/wisata"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-terracotta/80"
        >
          {t('section.wisata.cta', 'Lihat Selengkapnya')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}