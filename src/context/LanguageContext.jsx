// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import id from '../locales/id.json'
import en from '../locales/en.json'

const LanguageContext = createContext()

const translations = { id, en }

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved === 'en' ? 'en' : 'id'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = (key, params = {}) => {
    let text = translations[language][key] || key
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param])
    })
    return text
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'id' ? 'en' : 'id')
  }

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}