// src/components/Navbar.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ navigateTo, activePage }) {
  const [isOpen, setIsOpen] = useState(false)
  const logoSrc = "https://files.catbox.moe/ce6atq.jpg"

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Tentang', path: '/about' },
    { name: 'Request Game', path: '/request' },
  ]

  return (
    <nav className="sticky top-0 z-[100] bg-[#0f111a]/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex justify-between items-center">
          
          {/* LOGO SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigateTo('/')}
          >
            <div className="relative">
              <img 
                src={logoSrc} 
                alt="Logo"
                className="w-10 h-10 rounded-xl object-cover border border-gray-700 group-hover:border-blue-500 transition-colors shadow-lg shadow-blue-500/10"
              />
              <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tighter uppercase leading-none">
                RHYTHM<span className="text-blue-500">HUB</span>
              </span>
              <span className="text-[9px] font-bold text-gray-500 tracking-[0.15em] uppercase">MOD Database</span>
            </div>
          </motion.div>
          
          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button 
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activePage === link.path 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-[#161b2c] text-gray-400 rounded-xl border border-gray-800 hover:text-white transition-all active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 mt-4 pb-4 border-t border-gray-800 pt-4">
                {navLinks.map((link) => (
                  <button 
                    key={link.path}
                    onClick={() => { navigateTo(link.path); setIsOpen(false) }}
                    className={`px-4 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] text-left transition-all ${
                      activePage === link.path 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                      : 'bg-[#161b2c] text-gray-400 border border-gray-800'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
