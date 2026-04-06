// src/pages/Request.jsx
import { motion } from 'framer-motion'
import { useState } from 'react'
import RequestList from '../components/RequestList'
import AdminPanel from '../components/AdminPanel'
import AdminGamePanel from '../components/AdminGamePanel'

export default function Request() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)
  const [isAdminGameOpen, setIsAdminGameOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-950/30 rounded-full px-4 py-1.5 mb-4 border border-blue-800">
              <span className="text-xs text-blue-400 font-medium">Request Game</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Request <span className="text-blue-500">Game</span>
            </h1>
            <p className="text-gray-400">
              Request game rhythm yang belum tersedia. 
              Data tersimpan di <span className="text-green-400 font-medium">MongoDB</span> secara online!
            </p>
          </div>

          {/* Tombol Admin */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              🔧 Kelola Request
            </button>
            <button
              onClick={() => setIsAdminGameOpen(true)}
              className="text-xs bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 px-3 py-1.5 rounded-lg transition flex items-center gap-1 border border-blue-800"
            >
              🎮 Upload Game
            </button>
          </div>

          <RequestList />

          {/* Info Pastefy */}
          <div className="mt-8 bg-gray-900 rounded-lg p-4 text-center border border-gray-800">
            <p className="text-sm text-gray-400">
              📦 Data request disimpan di <span className="font-medium text-green-400">Server</span> — 
              Status <span className="text-green-400 font-medium">Selesai</span> menandakan MOD sudah tersedia.
            </p>
          </div>
        </motion.div>
      </div>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <AdminGamePanel isOpen={isAdminGameOpen} onClose={() => setIsAdminGameOpen(false)} />
    </div>
  )
}