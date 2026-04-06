// src/components/Navbar.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar({ navigateTo }) {
  const [isOpen, setIsOpen] = useState(false)

  const logoSrc = "https://files.catbox.moe/ce6atq.jpg"

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo('/')}
          >
            <img 
              src={logoSrc} 
              alt="RhythmHub Logo"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight">
                Rhythm<span className="text-blue-500">Hub</span>
              </span>
              <span className="text-[9px] text-gray-500 -mt-0.5">MOD Game Rhythm</span>
            </div>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigateTo('/')} className="text-gray-400 hover:text-blue-500 transition text-sm font-medium">Beranda</button>
            <button onClick={() => navigateTo('/about')} className="text-gray-400 hover:text-blue-500 transition text-sm font-medium">Tentang</button>
            <button onClick={() => navigateTo('/request')} className="text-gray-400 hover:text-blue-500 transition text-sm font-medium">Request Game</button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-gray-800"
          >
            <div className="flex flex-col gap-3">
              <button onClick={() => { navigateTo('/'); setIsOpen(false) }} className="text-gray-400 hover:text-blue-500 py-2 text-left">Beranda</button>
              <button onClick={() => { navigateTo('/about'); setIsOpen(false) }} className="text-gray-400 hover:text-blue-500 py-2 text-left">Tentang</button>
              <button onClick={() => { navigateTo('/request'); setIsOpen(false) }} className="text-gray-400 hover:text-blue-500 py-2 text-left">Request Game</button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}