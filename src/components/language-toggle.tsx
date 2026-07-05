import { useTranslation } from 'react-i18next'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const lang = (i18n.language ?? 'id').split('-')[0].toLowerCase()

  return (
    <div className="flex items-center gap-1 rounded-full bg-olive/10 p-1">
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
          lang === 'en' ? 'bg-background text-brown shadow-sm' : 'text-muted-foreground hover:bg-olive/10'
        }`}
      >
        <img src="/uk-logo.svg" alt="English" className="h-4 w-4" />
        EN
      </button>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('id')}
        className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-all duration-300 ${
          lang === 'id' ? 'bg-terracotta text-white shadow-sm' : 'text-muted-foreground hover:bg-olive/10'
        }`}
      >
        <img src="/in-logo.svg" alt="Indonesia" className="h-4 w-4" />
        ID
      </button>
    </div>
  )
}
