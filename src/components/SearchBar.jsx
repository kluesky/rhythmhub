// src/components/SearchBar.jsx
import { motion, AnimatePresence } from 'framer-motion'

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative group w-full max-w-md">
      {/* Background Glow Effect on Focus */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
      
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg 
            className="w-4 h-4 text-gray-500 group-focus-within:text-blue-400 transition-colors duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Cari Game Rhythm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-11 py-3 bg-[#161b2c] border border-gray-800 rounded-2xl text-white text-sm font-medium placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 tracking-tight"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {searchQuery && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1.5 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700 transition-all active:scale-90"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Shortcut Indicator (Optional Visual) */}
      {!searchQuery && (
        <div className="absolute inset-y-0 right-4 hidden sm:flex items-center pointer-events-none">
          <kbd className="px-2 py-0.5 text-[10px] font-black text-gray-600 bg-[#0f111a] border border-gray-800 rounded-md">
            CTRL + K
          </kbd>
        </div>
      )}
    </div>
  )
}
