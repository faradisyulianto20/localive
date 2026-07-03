// umkm-card.tsx
import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

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
}

const categoryLabel: Record<string, { id: string; en: string }> = {
  makanan: { id: 'Makanan', en: 'Food' },
  produk: { id: 'Produk', en: 'Product' },
  jasa: { id: 'Jasa', en: 'Service' },
}

const categoryColor: Record<string, string> = {
  makanan: 'bg-orange-500',
  produk: 'bg-blue-500',
  jasa: 'bg-purple-500',
}

function tval(v: string | { id: string; en: string }, lang: string) {
  return typeof v === 'string' ? v : v[lang as 'id' | 'en'] || v.id
}

export default function UMKMCard({ item }: UMKMCardProps) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const cat = categoryLabel[item.category]

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md">
      <img
        src={item.image}
        alt={tval(item.title, lang)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* gradient hijau dari bawah ke atas */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-emerald-900/40 to-transparent" />

      <span className={`absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${categoryColor[item.category]}`}>
        {cat[lang] ?? cat.id}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-3">
        <h3 className="text-sm font-bold text-white line-clamp-1">
          {tval(item.title, lang)}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-white/80 line-clamp-2">
          {tval(item.description, lang)}
        </p>
        <a
          href={item.waUrl ?? (item.noTelp ? `https://wa.me/${item.noTelp.replace(/[^0-9]/g, '')}` : '#')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700"
        >
          <MessageCircle className="h-3 w-3" />
          {t('umkm.hubungi', 'Hubungi WA')}
        </a>
      </div>
    </div>
  )
}