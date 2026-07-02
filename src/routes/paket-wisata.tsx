import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/paket-wisata')({ component: PaketWisata })

function PaketWisata() {
  const { t } = useTranslation()

  return (
    <div className="page-wrap py-16">
      <div className="rise-in">
        <span className="island-kicker">{t('nav.paketWisata')}</span>
        <h1 className="display-title text-forest mt-2 text-4xl font-bold">
          {t('page.paketWisata.title')}
        </h1>
      </div>
    </div>
  )
}
