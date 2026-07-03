import { Link } from '@tanstack/react-router'
import { Calendar, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface ArtikelItem {
  id: string
  title: { id: string; en: string }
  content: { id: string; en: string }
  image: string
  category: string
  penulis: string
  tanggal: string
  createdAt?: string
  updatedAt?: string
}

interface ArtikelCardProps {
  item: ArtikelItem
}

const categoryColor: Record<string, string> = {
  berita: 'bg-blue-500',
  kegiatan: 'bg-green-500',
  pengumuman: 'bg-orange-500',
}

export default function ArtikelCard({ item }: ArtikelCardProps) {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'id' | 'en'

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <Link
      to="/artikel/$id"
      params={{ id: item.id }}
      className="group block overflow-hidden rounded-2xl border border-neutral-100 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={item.image}
          alt={item.title[lang] ?? item.title.id}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white ${categoryColor[item.category] ?? 'bg-neutral-500'}`}>
            {item.category}
          </span>
        </div>

        <h3 className="mt-2 text-base font-bold text-neutral-900 line-clamp-2 group-hover:text-emerald-700">
          {item.title[lang] ?? item.title.id}
        </h3>

        <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(item.tanggal)}
          </span>
          <span className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            {item.penulis}
          </span>
        </div>
      </div>
    </Link>
  )
}
