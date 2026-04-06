// src/components/LoginModal.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { useToast } from '../context/ToastContext'

export default function LoginModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const { t } = useLanguage()
  const { addToast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(password)) {
      addToast(t('login_success'), 'success')
      onClose()
      setPassword('')
    } else {
      addToast(t('login_error'), 'error')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 rounded-xl shadow-xl w-full max-w-md mx-4 border border-gray-700"
      >
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-white font-semibold">{t('login_title')}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input
            type="password"
            placeholder={t('login_placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            {t('login_btn')}
          </button>
        </form>
      </motion.div>
    </div>
  )
}