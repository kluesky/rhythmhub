// src/components/GameCard.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useToast } from '../context/ToastContext'

export default function GameCard({ game }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const { addToast } = useToast()

  // Cek apakah game baru (7 hari terakhir)
  const isNewGame = () => {
    if (!game.createdAt) return false
    const createdDate = new Date(game.createdAt)
    const now = new Date()
    const diffDays = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24))
    return diffDays <= 7
  }

  // Fungsi untuk mendapatkan badge status - Warna diperbarui sesuai SS
  const getStatusBadge = () => {
    const status = game.status || 'success'
    const statusText = game.statusText || '🟢 Online / Stable'
    
    if (status === 'success') {
      return {
        color: 'bg-[#14321a]/60 text-[#4ade80] border-[#1e5128]',
        icon: '🟢',
        text: statusText
      }
    }
    if (status === 'warning') {
      return {
        color: 'bg-[#3b2d0a]/60 text-[#fbbf24] border-[#785413]',
        icon: '⚠️',
        text: statusText
      }
    }
    if (status === 'danger') {
      return {
        color: 'bg-[#451010]/60 text-[#f87171] border-[#7f1d1d]',
        icon: '🔴',
        text: statusText
      }
    }
    return {
      color: 'bg-gray-800/60 text-gray-400 border-gray-700',
      icon: '⚪',
      text: statusText
    }
  }

  // Fungsi Share
  const shareToWhatsApp = () => {
    const text = `🎮 *${game.name}* (${game.version})\n\n${game.description}\n\n🔗 Download: ${window.location.origin}/game/${game.id}\n\n#RhythmHub #MODGame`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
    addToast(`💚 Berhasil membuka WhatsApp untuk share ${game.name}`, 'success')
    setShowShareMenu(false)
  }

  const shareToTelegram = () => {
    const text = `🎮 ${game.name} (${game.version})\n\n${game.description}\n\n🔗 Download: ${window.location.origin}/game/${game.id}`
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin + '/game/' + game.id)}&text=${encodeURIComponent(`🎮 ${game.name} (${game.version})\n\n${game.description}`)}`, '_blank')
    addToast(`✈️ Berhasil membuka Telegram untuk share ${game.name}`, 'success')
    setShowShareMenu(false)
  }

  const shareToTwitter = () => {
    const text = `🎮 ${game.name} (${game.version}) - MOD APK Rhythm Game! Download sekarang juga! 🎵🔥`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.origin + '/game/' + game.id)}`, '_blank')
    addToast(`🐦 Berhasil membuka Twitter untuk share ${game.name}`, 'success')
    setShowShareMenu(false)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/game/${game.id}`)
    addToast('🔗 Link berhasil disalin!', 'success')
    setShowShareMenu(false)
  }

  const statusBadge = getStatusBadge()
  const showNewBadge = isNewGame()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group bg-[#1a1c26] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 relative shadow-lg"
    >
      {/* Badge NEW */}
      {showNewBadge && (
        <div className="absolute top-3 left-3 z-20">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg animate-pulse">
            🔥 NEW
          </div>
        </div>
      )}

      {/* Tombol Share (3 dots) */}
      <div className="absolute top-3 right-3 z-20">
        <div className="relative">
          <button
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="bg-black/60 backdrop-blur-md hover:bg-black/80 text-white p-1.5 rounded-full transition-all duration-200 border border-white/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>

          {/* Share Menu */}
          {showShareMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-0 mt-2 w-40 bg-[#0f111a] border border-gray-700 rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              <div className="py-1">
                <button onClick={shareToWhatsApp} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-2">
                  <span>💚</span> WhatsApp
                </button>
                <button onClick={shareToTelegram} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-2">
                  <span>✈️</span> Telegram
                </button>
                <button onClick={shareToTwitter} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-2">
                  <span>🐦</span> Twitter
                </button>
                <hr className="border-gray-800 my-1" />
                <button onClick={copyLink} className="w-full text-left px-4 py-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white transition flex items-center gap-2">
                  <span>🔗</span> Copy Link
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Gambar Cover */}
      <div className="relative h-44 overflow-hidden bg-gray-800">
        <img 
          src={game.imageUrl} 
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/0f111a/ffffff?text=No+Image'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c26] via-transparent to-transparent opacity-80"></div>
        
        {/* Badge versi */}
        <span className={`absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold z-10 shadow-lg border border-white/10 ${
          game.version === 'JP' 
            ? 'bg-red-600 text-white' 
            : 'bg-blue-600 text-white'
        }`}>
          {game.version === 'JP' ? '🇯🇵 JP' : '🌍 GLOBAL'}
        </span>

        {/* Badge genre */}
        <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
          {game.genre || 'RHYTHM GAME'}
        </span>
      </div>

      {/* Konten */}
      <div className="p-5">
        {/* Header: Nama Game & Publisher */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-white mb-0.5 line-clamp-1 group-hover:text-blue-400 transition-colors tracking-tight">{game.name}</h3>
          <p className="text-xs text-gray-400 font-medium">{game.publisher || 'Unknown Publisher'}</p>
        </div>

        {/* Status MOD Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-bold border uppercase tracking-wider ${statusBadge.color} mb-4`}>
          <span>{statusBadge.icon}</span>
          <span>{statusBadge.text}</span>
        </div>

        {/* Deskripsi Singkat */}
        <p className="text-sm text-gray-300 mb-4 leading-relaxed line-clamp-2">
          {game.description || 'No description available.'}
        </p>

        {/* Tombol toggle fitur */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[11px] font-bold text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-1.5 transition-all uppercase tracking-wide"
        >
          <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
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
            <div className="mb-4 bg-[#241b35] rounded-xl p-3 border border-purple-900/50">
              <p className="text-[10px] font-black text-purple-400 mb-2 flex items-center gap-1 tracking-tighter">
                <span>⚡</span> MOD FEATURES:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {game.modFeatures.map((mod, idx) => (
                  <span key={idx} className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-900/40 text-purple-200 border border-purple-800/50">
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Game Features */}
          {game.features && game.features.length > 0 && (
            <div className="mb-4 bg-[#1e2230] rounded-xl p-3 border border-gray-800">
              <p className="text-[10px] font-black text-gray-400 mb-2 flex items-center gap-1 tracking-tighter">
                <span>✨</span> GAME FEATURES:
              </p>
              <div className="space-y-1.5">
                {game.features.map((feature, idx) => (
                  <div key={idx} className="text-[11px] text-gray-300 flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    <span className="leading-tight">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer untuk game High Risk */}
          {game.status === 'warning' && (
            <div className="mb-4 bg-[#3b2d0a]/30 border border-yellow-900/50 rounded-xl p-3">
              <p className="text-[10px] text-yellow-500 leading-normal">
                <span className="font-black mr-1">⚠️ DISCLAIMER:</span> 
                MOD ini memiliki risiko deteksi dan banned. Gunakan akun tumbal!
              </p>
            </div>
          )}
        </motion.div>

        {/* Tombol Download */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={game.playstoreLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`block w-full text-center font-black py-3 rounded-xl transition-all duration-300 text-xs uppercase tracking-[0.1em] shadow-lg ${
            game.status === 'danger'
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed pointer-events-none border border-gray-700'
              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20'
          }`}
        >
          {game.status === 'danger' ? '⏳ MOD MAINTENANCE' : '🔥 DOWNLOAD MOD APK'}
        </motion.a>
      </div>
    </motion.div>
  )
}
