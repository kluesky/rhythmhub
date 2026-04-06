// src/components/SearchSortBar.jsx
import { motion } from 'framer-motion'
import SearchBar from './SearchBar'
import Dropdown from './Dropdown'

export default function SearchSortBar({ searchQuery, setSearchQuery, sortBy, setSortBy }) {
  const sortOptions = [
    { value: 'name-asc', label: 'Nama: A → Z', icon: '📋' },
    { value: 'name-desc', label: 'Nama: Z → A', icon: '📋' },
    { value: 'status', label: 'Status MOD', icon: '⚠️' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      // Tambahkan z-index tinggi di sini agar tidak tertutup FilterBar di bawahnya
      className="relative z-[60] mb-12" 
    >
      {/* Outer Glow Decorator */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[2.5rem] blur-xl opacity-50 pointer-events-none"></div>

      <div className="relative flex flex-col lg:flex-row items-center gap-4 p-3 bg-[#161b2c]/60 backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        
        {/* Section: Search (Z-index lebih rendah dari dropdown) */}
        <div className="w-full lg:flex-1 relative z-10">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        </div>
        
        {/* Divider (Desktop Only) */}
        <div className="hidden lg:block h-10 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent mx-2"></div>

        {/* Section: Sort Dropdown (Z-index Paling Tinggi di dalam bar ini) */}
        <div className="w-full lg:w-auto min-w-[240px] relative z-50">
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Urutkan Katalog"
            icon="📊"
            className="w-full"
          />
        </div>

        {/* Section: Live Status Indicator */}
        <div className="hidden xl:flex items-center gap-3 pl-5 pr-4 py-2.5 bg-black/30 rounded-2xl border border-white/5 ml-2">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] leading-none mb-1">
              Network
            </span>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight leading-none">
              Live Hub
            </span>
          </div>
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Caption */}
      <div className="flex justify-between px-8 mt-4">
        <div className="flex items-center gap-2">
           <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
           <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
             {searchQuery ? `Result: ${searchQuery}` : 'All Games Displayed'}
           </p>
        </div>
        <p className="text-[9px] font-black text-blue-500/40 uppercase tracking-[0.3em] italic">
          v2.4.0-STABLE
        </p>
      </div>
    </motion.div>
  )
}
