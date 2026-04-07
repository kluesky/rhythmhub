// src/components/SearchSortBar.jsx - NO EMOJI VERSION
import { motion } from 'framer-motion'
import SearchBar from './SearchBar'
import Dropdown from './Dropdown'

export default function SearchSortBar({ searchQuery, setSearchQuery, sortBy, setSortBy }) {
  // Mengganti icon emoji dengan teks deskriptif atau simbol minimalis
  const sortOptions = [
    { value: 'name-asc', label: 'Name: A-Z', icon: 'ASC' },
    { value: 'name-desc', label: 'Name: Z-A', icon: 'DESC' },
    { value: 'status', label: 'Mod Status', icon: 'SYS' },
    { value: 'newest', label: 'Newest Entry', icon: 'NEW' },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className="relative z-[60] mb-12" 
    >
      {/* Outer Glow Decorator */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-[2.5rem] blur-xl opacity-50 pointer-events-none"></div>

      <div className="relative flex flex-col lg:flex-row items-center gap-4 p-3 bg-[#161b2c]/60 backdrop-blur-2xl rounded-[2rem] border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        
        {/* Section: Search Field */}
        <div className="w-full lg:flex-1 relative z-10">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        </div>
        
        {/* Vertical Divider (Desktop Only) */}
        <div className="hidden lg:block h-10 w-[1px] bg-gradient-to-b from-transparent via-gray-700/50 to-transparent mx-2"></div>

        {/* Section: Sort Dropdown (Z-index Tinggi) */}
        <div className="w-full lg:w-auto min-w-[240px] relative z-50">
          <Dropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Catalog Filter"
            icon="SORT" // Mengganti icon grafik menjadi teks terminal
            className="w-full"
          />
        </div>

        {/* Section: Live System Status Indicator */}
        <div className="hidden xl:flex items-center gap-3 pl-5 pr-4 py-2.5 bg-black/30 rounded-2xl border border-white/5 ml-2">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] leading-none mb-1">
              Network
            </span>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight leading-none">
              Online
            </span>
          </div>
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500/20"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Caption Meta Data */}
      <div className="flex justify-between px-8 mt-4">
        <div className="flex items-center gap-2">
           <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></div>
           <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">
             {searchQuery ? `Query: ${searchQuery.toUpperCase()}` : 'System Initialized: All Data Displayed'}
           </p>
        </div>
        <p className="text-[9px] font-black text-blue-500/40 uppercase tracking-[0.4em] italic">
          REL:HUB_v2.6.0
        </p>
      </div>
    </motion.div>
  )
}
