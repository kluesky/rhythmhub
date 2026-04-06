// src/components/LanguageSwitcher.jsx
import { useLanguage } from '../context/LanguageContext'

export default function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="px-2 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition flex items-center gap-1"
    >
      {language === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
    </button>
  )
}