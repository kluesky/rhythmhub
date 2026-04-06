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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Request <span className="text-primary">Game</span>
            </h1>
            <p className="text-gray-500">
              Request game rhythm yang belum tersedia. 
              Data tersimpan di <span className="text-green-600 font-medium">Pastefy</span> secara online!
            </p>
          </div>

          {/* Tombol Admin */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              🔧 Manage Request
            </button>
            <button
              onClick={() => setIsAdminGameOpen(true)}
              className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg transition flex items-center gap-1"
            >
              🎮 Upload Game
            </button>
          </div>

          <RequestList />
        </motion.div>
      </div>

      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <AdminGamePanel isOpen={isAdminGameOpen} onClose={() => setIsAdminGameOpen(false)} />
    </div>
  )
}