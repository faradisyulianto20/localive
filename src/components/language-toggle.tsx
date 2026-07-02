import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div className="flex items-center gap-1 rounded-full bg-emerald-50 p-1">
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
          lang === 'en' ? 'bg-white text-neutral-700 shadow-sm' : 'text-neutral-400'
        }`}
      >
        <span role="img" aria-label="UK flag">🇬🇧</span>
        EN
      </button>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('id')}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
          lang === 'id' ? 'bg-red-500 text-white shadow-sm' : 'text-neutral-400'
        }`}
      >
        <span role="img" aria-label="Indonesia flag">🇮🇩</span>
        ID
      </button>
    </div>
  )
}