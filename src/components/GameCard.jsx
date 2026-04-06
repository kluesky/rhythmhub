// src/components/GameCard.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function GameCard({ game }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Fungsi untuk mendapatkan badge status berdasarkan status dari database
  const getStatusBadge = () => {
    const status = game.status || 'success'
    const statusText = game.statusText || '🟢 Online / Stable'
    
    if (status === 'success') {
      return {
        color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
        icon: '🟢',
        text: statusText
      }
    }
    if (status === 'warning') {
      return {
        color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
        icon: '⚠️',
        text: statusText
      }
    }
    if (status === 'danger') {
      return {
        color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
        icon: '🔴',
        text: statusText
      }
    }
    return {
      color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-700',
      icon: '⚪',
      text: statusText
    }
  }

  const statusBadge = getStatusBadge()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-xl transition-all duration-300"
    >
      {/* Gambar Cover */}
      <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={game.imageUrl} 
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/374151/9ca3af?text=No+Image'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent"></div>
        
        {/* Badge versi di pojok kanan atas */}
        <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium z-10 shadow-sm ${
          game.version === 'JP' 
            ? 'bg-red-500 text-white' 
            : 'bg-blue-500 text-white'
        }`}>
          {game.version === 'JP' ? '🇯🇵 JP' : '🌍 Global'}
        </span>

        {/* Badge genre di pojok kiri bawah */}
        <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/50 backdrop-blur-sm text-white border border-white/20">
          {game.genre || 'Rhythm Game'}
        </span>
      </div>

      {/* Konten */}
      <div className="p-4">
        {/* Header: Nama Game & Publisher */}
        <div className="mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-0.5 line-clamp-1">{game.name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{game.publisher || 'Unknown Publisher'}</p>
        </div>

        {/* Status MOD Badge */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium ${statusBadge.color} mb-3`}>
          <span>{statusBadge.icon}</span>
          <span>{statusBadge.text}</span>
        </div>

        {/* Deskripsi Singkat */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 leading-relaxed line-clamp-2">
          {game.description || 'No description available.'}
        </p>

        {/* Tombol toggle fitur */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-primary hover:text-primary-dark mb-3 flex items-center gap-1.5 transition"
        >
          <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
          <span>{isExpanded ? 'Sembunyikan fitur' : 'Lihat fitur MOD & Game'}</span>
        </button>

        {/* Fitur-fitur (expandable) */}
        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          {/* MOD Features */}
          {game.modFeatures && game.modFeatures.length > 0 && (
            <div className="mb-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg p-3 border border-purple-100 dark:border-purple-900">
              <p className="text-xs font-semibold text-purple-700 dark:text-purple-400 mb-2 flex items-center gap-1">
                <span>⚡</span> MOD FEATURES:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {game.modFeatures.map((mod, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Game Features */}
          {game.features && game.features.length > 0 && (
            <div className="mb-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                <span>✨</span> GAME FEATURES:
              </p>
              <div className="space-y-1">
                {game.features.map((feature, idx) => (
                  <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer untuk game High Risk (PJSK) */}
          {game.status === 'warning' && (
            <div className="mb-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-xs text-yellow-800 dark:text-yellow-300">
                <span className="font-bold">⚠️ DISCLAIMER:</span> MOD ini memiliki risiko deteksi dan banned. 
                Gunakan dengan bijak! Jangan gunakan di main account.
              </p>
            </div>
          )}

          {/* Disclaimer untuk game Maintenance */}
          {game.status === 'danger' && (
            <div className="mb-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-xs text-red-800 dark:text-red-300">
                <span className="font-bold">🔴 STATUS:</span> MOD sedang dalam perbaikan atau terdeteksi. 
                Harap tunggu update terbaru.
              </p>
            </div>
          )}
        </motion.div>

        {/* Tombol Download */}
        <motion.a
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          href={game.playstoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center font-semibold py-2.5 rounded-lg transition-all duration-200 text-sm ${
            game.status === 'danger'
              ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed text-white pointer-events-none'
              : 'bg-primary hover:bg-primary-dark text-white'
          }`}
        >
          {game.status === 'danger' ? '⏳ MOD Maintenance' : '🔥 DOWNLOAD MOD APK'}
        </motion.a>
      </div>
    </motion.div>
  )
}