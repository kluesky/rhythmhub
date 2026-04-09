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
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Community Wishlist</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
              REQUEST <span className="text-blue-600 italic">GAME</span>
            </h1>
            
            <p className="text-gray-500 max-w-xl mx-auto font-medium leading-relaxed uppercase tracking-wider text-[11px]">
              Your favorite game not available yet? Submit your request now. <br />
              Track modification progress in <span className="text-blue-400 font-bold">Real-Time</span> through our Tracker system.
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
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Manage Requests
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAdminGameOpen(true)}
              className="px-5 py-2.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-500/20 transition-all flex items-center gap-2 shadow-lg shadow-blue-900/10"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Upload New Game
            </motion.button>
          </div>

          {/* --- REQUEST LIST COMPONENT --- */}
          <div className="relative">
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
                  Data is stored on <span className="text-blue-400 font-bold">Cloud Server</span>. 
                  Use the voting feature to speed up the research process for your chosen game modifications.
                </p>
              </div>
              
              <div className="flex justify-center md:justify-end gap-6">
                <div className="flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                     <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                     </svg>
                   </div>
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Done / Live</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                     <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.285a2 2 0 01-1.586 0l-.628-.285a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.37.37a2 2 0 00-.496.921L2 21h20l-.514-4.21a2 2 0 00-.496-.921l-.37-.37z" />
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 8a3 3 0 11-6 0 3 3 0 016 0z" />
                     </svg>
                   </div>
                   <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">In Testing</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                     <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                     </svg>
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