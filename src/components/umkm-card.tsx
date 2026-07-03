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
  const lang = i18n.language
  const cat = categoryLabel[item.category]

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-100 shadow-sm transition-shadow hover:shadow-md">
      <div className="aspect-[1/1] overflow-hidden">
        <img
          src={item.image}
          alt={tval(item.title, lang)}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-1">
          <h3 className="text-sm font-bold text-neutral-900 line-clamp-1">
            {tval(item.title, lang)}
          </h3>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${categoryColor[item.category]}`}>
            {cat[lang] ?? cat.id}
          </span>
        </div>

        <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 line-clamp-2">
          {tval(item.description, lang)}
        </p>

        <a
          href={item.waUrl ?? (item.noTelp ? `https://wa.me/${item.noTelp.replace(/[^0-9]/g, '')}` : '#')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-green-700"
        >
          <MessageCircle className="h-3 w-3" />
          {t('umkm.hubungi', 'Hubungi WA')}
        </a>
      </div>
    </div>
  )
}
