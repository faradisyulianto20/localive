// umkm-card.tsx
import { MessageCircle, MapPin, UtensilsCrossed, Package, Wrench } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SafeImage } from '../ui/safe-image'

export interface UMKMItem {
  id: string
  title: string | { id: string; en: string }
  category: 'makanan' | 'produk' | 'jasa'
  description: string | { id: string; en: string }
  image: string
  mapsUrl?: string
  waUrl?: string
  noTelp?: string
  createdAt?: string
  updatedAt?: string
}

interface UMKMCardProps {
  item: UMKMItem
  onClick?: () => void
}

const categoryLabel: Record<string, { id: string; en: string }> = {
  makanan: { id: 'Makanan', en: 'Food' },
  produk: { id: 'Produk', en: 'Product' },
  jasa: { id: 'Jasa', en: 'Service' },
}

const categoryIcon: Record<string, typeof UtensilsCrossed> = {
  makanan: UtensilsCrossed,
  produk: Package,
  jasa: Wrench,
}

function tval(v: string | { id: string; en: string }, lang: string) {
  return typeof v === 'string' ? v : v[lang as 'id' | 'en'] || v.id
}

export default function UMKMCard({ item, onClick }: UMKMCardProps) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const cat = categoryLabel[item.category] ?? { id: item.category, en: item.category }
  const CatIcon = categoryIcon[item.category] ?? UtensilsCrossed

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer" onClick={onClick}>
      <SafeImage
        src={item.image}
        alt={tval(item.title, lang)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* gradient — lebih gelap saat hover agar teks tambahan terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/50 to-transparent transition-all duration-300 group-hover:from-forest group-hover:via-forest/70" />

      <div className="absolute inset-x-0 bottom-0 p-3.5">
        {/* Kategori + icon, selalu terlihat, sedikit naik saat hover */}
        <div className="flex items-center gap-1.5 mb-1.5 transition-transform duration-300 group-hover:-translate-y-0.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 backdrop-blur">
            <CatIcon className="h-3 w-3 text-white" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-white/80">
            {cat[lang] ?? cat.id}
          </span>
        </div>

        {/* Judul besar — selalu tampil */}
        <h3 className="text-base md:text-3xl group-hover:text-lg font-bold text-white leading-snug line-clamp-2 transition-transform duration-300 group-hover:-translate-y-0.5">
          {tval(item.title, lang)}
        </h3>

        {/* Detail tambahan — selalu tampil di mobile, reveal saat hover di desktop */}
        <div className="mt-2 grid md:grid-rows-[0fr] md:opacity-0 transition-all duration-300 ease-out group-hover:md:mt-2 group-hover:md:grid-rows-[1fr] group-hover:md:opacity-100">
          <div className="overflow-hidden">
            <p className="text-xs leading-relaxed text-white/80 md:line-clamp-2">
              {tval(item.description, lang)}
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <a
                href={item.waUrl ?? (item.noTelp ? `https://wa.me/${item.noTelp.replace(/[^0-9]/g, '')}` : '#')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest border-2 border-white/20 px-3 py-1.5 text-xs font-semibold text-white cursor-pointer transition-all duration-300 hover:bg-forest/80"
              >
                <MessageCircle className="h-3 w-3" />
                {t('umkm.hubungi', 'WA')}
              </a>

              {item.mapsUrl && (
                <a
                  href={item.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white cursor-pointer transition-all duration-300 hover:bg-white/25"
                >
                  <MapPin className="h-3 w-3" />
                  {t('umkm.maps', 'Maps')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}