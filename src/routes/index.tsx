import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import PageHeader from '../components/page-header'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const { t } = useTranslation()

  return (
    <div className="page-wrap">
      <PageHeader kicker={t('nav.beranda')} title={t('page.beranda.title')} />
    </div>
  )
}
