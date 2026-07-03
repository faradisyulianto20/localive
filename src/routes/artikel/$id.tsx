import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import artikelData from '#/data/artikel.json'

export const Route = createFileRoute('/artikel/$id')({ component: ArtikelDetail })

const categoryColor: Record<string, string> = {
  berita: 'bg-blue-500',
  kegiatan: 'bg-green-500',
  pengumuman: 'bg-orange-500',
}

function ArtikelDetail() {
  const { id } = Route.useParams()
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'

  const artikel = artikelData.find((a) => a.id === id)

  if (!artikel) {
    return (
      <div className="page-wrap py-16 text-center">
        <p className="text-neutral-500">
          {t('artikel.notFound', 'Artikel tidak ditemukan')}
        </p>
        <Link
          to="/artikel"
          className="mt-4 inline-flex items-center gap-2 text-emerald-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('artikel.back', 'Kembali ke daftar artikel')}
        </Link>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="page-wrap py-16">
      <Link
        to="/artikel"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('artikel.back', 'Kembali ke daftar artikel')}
      </Link>

      <article className="mx-auto mt-6 max-w-3xl">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={artikel.image}
            alt={artikel.title[lang] ?? artikel.title.id}
            className="aspect-video w-full object-cover"
          />
        </div>

        <div className="mt-6">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold text-white ${categoryColor[artikel.category] ?? 'bg-neutral-500'}`}>
            {artikel.category}
          </span>

          <h1 className="display-title text-forest mt-3 text-3xl font-bold md:text-4xl">
            {artikel.title[lang] ?? artikel.title.id}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(artikel.tanggal)}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {artikel.penulis}
            </span>
          </div>

          <div
            className="prose prose-lg mt-8 max-w-none"
            dangerouslySetInnerHTML={{
              __html: artikel.content[lang] ?? artikel.content.id,
            }}
          />
        </div>
      </article>
    </div>
  )
}
