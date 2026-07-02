import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/destinasi')({ component: Destinasi })

function Destinasi() {
  const { t } = useTranslation()

  return (
    <div className="page-wrap py-16">
      <div className="rise-in">
        <span className="island-kicker">{t('nav.destinasi')}</span>
        <h1 className="display-title text-forest mt-2 text-4xl font-bold">
          {t('page.destinasi.title')}
        </h1>
      </div>
    </div>
  )
}
