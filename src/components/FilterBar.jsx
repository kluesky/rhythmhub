// src/components/FilterBar.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FilterBar({ filter, setFilter }) {
  const [isOpen, setIsOpen] = useState(false)

  const filters = [
    { id: 'all', label: 'All Catalog', icon: '💎' },
    { id: 'jp', label: 'JP Version', icon: '🇯🇵' },
    { id: 'global', label: 'Global Version', icon: '🌍' }
  ]

  const activeFilter = filters.find(f => f.id === filter)

  return (
    <div className="relative w-full max-w-[240px] mx-auto mb-12 px-4 z-40">
      {/* Label Kecil di Atas Dropdown */}
      <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mb-2 ml-2">
        Filter Region
      </p>

      {/* Main Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-all duration-300 ${
          isOpen 
          ? 'bg-[#1e2235] border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.1)]' 
          : 'bg-[#161b2c] border-white/5 hover:border-white/10 shadow-xl'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm">{activeFilter?.icon}</span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">
            {activeFilter?.label}
          </span>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-[10px] text-blue-500"
        >
          ▼
        </motion.span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay untuk menutup dropdown saat klik di luar */}
            <div className="fixed inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 5, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute left-4 right-4 mt-2 bg-[#1e2235] border border-white/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl"
            >
              <div className="p-1">
                {filters.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setFilter(f.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                      filter === f.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-sm ${filter !== f.id && 'grayscale'}`}>
                        {f.icon}
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        {f.label}
                      </span>
                    </div>
                    {filter === f.id && (
                      <span className="text-[10px] font-bold">✔</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
