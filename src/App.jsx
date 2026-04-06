import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Navbar from './components/Navbar'
import FilterBar from './components/FilterBar'
import GameGrid from './components/GameGrid'
import Pagination from './components/Pagination'
import SearchSortBar from './components/SearchSortBar'
import ActivityLog from './components/ActivityLog' 
import MusicPlayer from './components/MusicPlayer'
import DailyCard from './components/DailyCard'

// Pages
import About from './pages/About'
import Request from './pages/Request'
import Auth from './pages/Auth'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AdminDaily from './pages/AdminDaily'
import Showcase from './pages/Showcase' // Import Page Showcase Baru

import { getAllGamesFromPastefy } from './api/pastefy'

function App() {
  const [games, setGames] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [currentPageState, setCurrentPageState] = useState('/')
  const [session, setSession] = useState(null)
  
  const itemsPerPage = 6

  useEffect(() => {
    const savedSession = localStorage.getItem('hub_session')
    if (savedSession) setSession(JSON.parse(savedSession))

    const loadGames = async () => {
      setLoading(true)
      const result = await getAllGamesFromPastefy()
      if (result.success) setGames(result.games)
      setLoading(false)
    }
    loadGames()
  }, [])

  useEffect(() => {
    const handlePopState = () => setCurrentPageState(window.location.pathname)
    setCurrentPageState(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPageState(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const processedGames = useMemo(() => {
    let result = [...games]
    if (filter === 'jp') result = result.filter(g => g.version === 'JP')
    if (filter === 'global') result = result.filter(g => g.version === 'Global')
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(g => g.name.toLowerCase().includes(q))
    }

    if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'name-desc') result.sort((a, b) => b.name.localeCompare(a.name))
    else if (sortBy === 'status') {
      const order = { success: 1, warning: 2, danger: 3 }
      result.sort((a, b) => (order[a.status] || 0) - (order[b.status] || 0))
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    }
    return result
  }, [games, filter, searchQuery, sortBy])

  const totalPages = Math.ceil(processedGames.length / itemsPerPage)
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return processedGames.slice(start, start + itemsPerPage)
  }, [processedGames, currentPage])

  useEffect(() => { setCurrentPage(1) }, [filter, searchQuery, sortBy])

  if (!session) {
    return <Auth onLoginSuccess={(user) => setSession(user)} />
  }

  const renderContent = () => {
    switch (currentPageState) {
      case '/about': return <About key="about" />
      case '/request': return <Request key="request" />
      case '/privacy': return <Privacy key="privacy" />
      case '/terms': return <Terms key="terms" />
      case '/admin-daily': return <AdminDaily key="admin-daily" />
      case '/showcase': return <Showcase key="showcase" /> // Render Page Showcase
      default: return (
        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="text-center mb-16 space-y-6">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 shadow-lg">
              <span className="w-2 h-2 bg-blue-50 rounded-full animate-pulse shadow-[0_0_8px_white]"></span>
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Database Online Active</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white">RHYTHM<span className="text-blue-600">HUB</span></h1>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-wide text-xs">Pusat koleksi MOD APK game rhythm terbaik. <br className="hidden md:block" /><span className="text-blue-400 font-bold italic">Download gratis, install mudah, main tanpa batas.</span></p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 xl:col-span-9 space-y-8 relative z-[50]">
              <SearchSortBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortBy={sortBy} setSortBy={setSortBy} />
              <FilterBar filter={filter} setFilter={setFilter} />
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                  <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs font-black text-gray-600 tracking-[0.3em] uppercase">Synchronizing...</p>
                </div>
              ) : (
                <div className="space-y-12">
                  <GameGrid games={paginatedGames} />
                  {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
                </div>
              )}
              <div className="bg-[#451010]/20 border border-[#7f1d1d]/50 rounded-2xl p-4 mt-12 shadow-2xl">
                <p className="text-[9px] text-[#f87171] text-center font-bold uppercase tracking-widest leading-relaxed">⚠️ Peringatan: MOD APK untuk edukasi. Project Sekai berisiko tinggi banned. Gunakan akun tumbal!</p>
              </div>
            </div>

            <aside className="lg:col-span-4 xl:col-span-3 space-y-8 relative z-[40]">
              <div className="sticky top-28 space-y-8">
                <div className="flex flex-col items-center gap-4 text-center">
                  <h4 className="text-[9px] font-black text-blue-500/40 uppercase tracking-[0.4em] italic">— Featured Terminal</h4>
                  <DailyCard />
                </div>
                <div className="bg-[#161b2c]/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Network Status</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-500 uppercase">Total Games</span>
                        <span className="text-white">{games.length}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-gray-500 uppercase">Encryption</span>
                        <span className="text-blue-400 tracking-tighter">AES-256</span>
                      </div>
                   </div>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-white selection:bg-blue-500/30">
      <Navbar navigateTo={navigateTo} activePage={currentPageState} user={session} onLogout={() => { localStorage.removeItem('hub_session'); setSession(null); }} />
      <main className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>

      <footer className="bg-[#0b0d14] border-t border-gray-800/50 mt-32 pt-20 pb-10 font-sans relative z-10">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-800 shadow-xl">
                  <img src="https://files.catbox.moe/ce6atq.jpg" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-black text-xl tracking-tighter uppercase text-white">RHYTHM<span className="text-blue-500">HUB</span></span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider">Platform kurasi MOD APK khusus game rhythm dengan standar kualitas komunitas.</p>
            </div>
            {[
              { title: 'Navigation', links: [{ n: 'Home', p: '/' }, { n: 'About', p: '/about' }, { n: 'Request', p: '/request' }, { n: 'Showcase', p: '/showcase' }, { n: 'Admin', p: '/admin-daily' }] },
              { title: 'Categories', links: [{ n: 'JP Version', f: 'jp' }, { n: 'Global Version', f: 'global' }, { n: 'See All', f: 'all' }] },
              { title: 'Community', links: [{ n: 'Video Showcase', p: '/showcase' }, { n: 'Telegram' }, { n: 'WhatsApp' }] }
            ].map((col, i) => (
              <div key={i} className="space-y-5 text-left">
                <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <button onClick={() => { if(l.p) navigateTo(l.p); if(l.f) { setFilter(l.f); navigateTo('/'); } }} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest">{l.n}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            <p>© 2026 RhythmHub — Secure Cloud Database Sync</p>
            <div className="flex gap-6">
              <button onClick={() => navigateTo('/privacy')} className="hover:text-blue-500 transition-colors uppercase">Privacy Policy</button>
              <button onClick={() => navigateTo('/terms')} className="hover:text-blue-500 transition-colors uppercase">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
      <ActivityLog />
      <MusicPlayer />
    </div>
  )
}

export default App;
