import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggle = () => {
    const next = i18n.language === 'id' ? 'en' : 'id'
    i18n.changeLanguage(next)
  }

  const isId = i18n.language === 'id'

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors hover:bg-surface-strong"
    >
      <span className={isId ? 'text-olive' : 'text-sea-ink-soft'}>ID</span>
      <span className="text-sea-ink-soft">/</span>
      <span className={!isId ? 'text-olive' : 'text-sea-ink-soft'}>EN</span>
    </button>
  )
}
