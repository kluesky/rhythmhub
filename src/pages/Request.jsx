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
    <div className="min-h-screen bg-[#0f111a] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* --- HEADER SECTION --- */}
          <div className="text-center space-y-6">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-5 py-2 border border-blue-500/20 shadow-lg shadow-blue-500/5"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Community Wishlist</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              REQUEST <span className="text-blue-600 font-italic">GAME</span>
            </h1>
            
            <p className="text-gray-500 max-w-xl mx-auto font-medium leading-relaxed uppercase tracking-wider text-[11px]">
              Game favoritmu belum ada? Kirim permintaanmu sekarang. <br />
              Pantau progres modifikasi secara <span className="text-blue-400 font-bold">Real-Time</span> melalui sistem Tracker kami.
            </p>
          </div>

          {/* --- ADMIN CONTROLS --- */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3 px-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdminOpen(true)}
              className="px-5 py-2.5 bg-[#161b2c] hover:bg-[#1e253a] text-gray-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-gray-800 transition-all flex items-center gap-2 shadow-xl"
            >
              <span>🔧</span> Manage Requests
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdminGameOpen(true)}
              className="px-5 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-500/20 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/10"
            >
              <span>🎮</span> Upload New Game
            </motion.button>
          </div>

          {/* --- REQUEST LIST COMPONENT --- */}
          <div className="relative">
             {/* Decorative Background Glow */}
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/5 blur-[100px] -z-10 rounded-full"></div>
             <RequestList />
          </div>

          {/* --- FOOTER INFO / STATUS LEGEND --- */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-[#161b2c]/50 rounded-[2rem] border border-gray-800 p-8 backdrop-blur-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="text-left space-y-2">
                <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                  <span className="text-blue-500">●</span> Status Tracker Info
                </h4>
                <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-wider">
                  Data disimpan di <span className="text-blue-400 font-bold">Cloud Server</span>. 
                  Gunakan fitur voting untuk mempercepat proses riset modifikasi game pilihanmu.
                </p>
              </div>
              
              <div className="flex justify-center md:justify-end gap-4">
                <div className="flex flex-col items-center">
                   <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-2">
                     <span className="text-xs">✅</span>
                   </div>
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Done / Live</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20 mb-2">
                     <span className="text-xs">🧪</span>
                   </div>
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">In Testing</span>
                </div>
                <div className="flex flex-col items-center">
                   <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-2">
                     <span className="text-xs">📩</span>
                   </div>
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Submitted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- MODALS --- */}
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <AdminGamePanel isOpen={isAdminGameOpen} onClose={() => setIsAdminGameOpen(false)} />
    </div>
  )
}
