import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ navigateTo, activePage, dbStatus, user }) {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Showcase', path: '/showcase' },
    { name: 'Request', path: '/request' },
  ]

  // Tombol Admin muncul otomatis di menu jika sudah login
  if (user) {
    menuItems.push({ name: 'Admin Daily', path: '/admin-daily' });
  }

  return (
    <nav className="sticky top-0 z-[100] bg-[#0f111a]/60 backdrop-blur-2xl border-b border-white/[0.05] py-4">
      <div className="container mx-auto px-6 max-w-7xl flex justify-between items-center">
        
        {/* LEFT: LOGO (Clean Typography) */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => { navigateTo('/'); setIsOpen(false); }}
        >
          <div className="w-9 h-9 rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-500">
            <img src="https://files.catbox.moe/ce6atq.jpg" className="w-full h-full object-cover" alt="Logo" />
          </div>
          <span className="font-black text-lg tracking-tighter uppercase italic text-white leading-none">
            RHYTHM<span className="text-blue-600">HUB</span>
          </span>
        </div>

        {/* CENTER: DESKTOP NAV (iOS Style Pill) */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] p-1 rounded-2xl">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`text-[9px] font-bold uppercase tracking-[0.15em] px-5 py-2 rounded-xl transition-all duration-300 ${
                activePage === item.path 
                ? 'bg-white/10 text-white shadow-lg' 
                : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* RIGHT: SYSTEM STATUS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-2xl">
            <div className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dbStatus === 'online' ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dbStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            </div>
            <span className="text-[8px] font-black uppercase text-gray-400 tracking-[0.2em] hidden sm:inline">
              {dbStatus === 'online' ? 'System Stable' : 'Link Down'}
            </span>
          </div>

          {/* IPHONE HAMBURGER (Clean) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-white/[0.03] rounded-2xl border border-white/[0.05]"
          >
            <motion.span animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-5 h-[1.5px] bg-white rounded-full" />
            <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-[1.5px] bg-white rounded-full" />
            <motion.span animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-5 h-[1.5px] bg-white rounded-full" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU (iOS Blur Effect) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0f111a]/90 backdrop-blur-3xl border-b border-white/[0.05] overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col p-8 gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigateTo(item.path); setIsOpen(false); }}
                  className={`text-left text-xs font-black uppercase tracking-[0.3em] transition-colors ${
                    activePage === item.path ? 'text-blue-500' : 'text-gray-500'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
