// src/components/Toast.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function Toast({ message, type, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getConfig = () => {
    switch (type) {
      case 'success': return { 
        icon: '✅', 
        color: 'text-green-400', 
        bg: 'bg-[#14321a]/90', 
        border: 'border-green-500/30',
        progress: 'bg-green-500'
      }
      case 'error': return { 
        icon: '❌', 
        color: 'text-red-400', 
        bg: 'bg-[#451010]/90', 
        border: 'border-red-500/30',
        progress: 'bg-red-500'
      }
      case 'warning': return { 
        icon: '⚠️', 
        color: 'text-yellow-400', 
        bg: 'bg-[#3b2d0a]/90', 
        border: 'border-yellow-500/30',
        progress: 'bg-yellow-500'
      }
      default: return { 
        icon: 'ℹ️', 
        color: 'text-blue-400', 
        bg: 'bg-[#161b2c]/90', 
        border: 'border-blue-500/30',
        progress: 'bg-blue-500'
      }
    }
  }

  const config = getConfig()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
        whileHover={{ scale: 1.02 }}
        className={`fixed top-24 right-4 z-[999] flex flex-col min-w-[300px] max-w-[420px] ${config.bg} backdrop-blur-md border ${config.border} rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}
      >
        <div className="flex items-center gap-4 px-5 py-4">
          {/* Icon Section with Glow */}
          <div className={`relative flex items-center justify-center w-10 h-10 rounded-xl bg-black/20 border border-white/5 shadow-inner`}>
            <span className="text-xl z-10">{config.icon}</span>
            <div className={`absolute inset-0 blur-lg opacity-20 ${config.color.replace('text', 'bg')}`}></div>
          </div>

          {/* Message Section */}
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 text-white mb-0.5">
              System Notification
            </p>
            <p className="text-sm font-bold text-gray-100 leading-tight tracking-tight">
              {message}
            </p>
          </div>

          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-all active:scale-90"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Animated Progress Bar (Timer Visual) */}
        <div className="h-[3px] w-full bg-white/5">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={`h-full ${config.progress} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
