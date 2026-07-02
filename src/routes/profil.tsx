import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/profil')({ component: Profil })

function Profil() {
  const { t } = useTranslation()

  return (
    <div className="page-wrap py-16">
      <div className="rise-in">
        <span className="island-kicker">{t('nav.profil')}</span>
        <h1 className="display-title text-forest mt-2 text-4xl font-bold">
          {t('page.profil.title')}
        </h1>
      </div>
    </div>
  )
}
