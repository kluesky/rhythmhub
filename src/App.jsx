import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- API & SERVICES ---
import { getAllGamesFromPastefy } from './api/pastefy'

// --- UI COMPONENTS ---
import Navbar from './components/Navbar'
import FilterBar from './components/FilterBar'
import GameGrid from './components/GameGrid'
import Pagination from './components/Pagination'
import SearchSortBar from './components/SearchSortBar'
import ActivityLog from './components/ActivityLog' 
import MusicPlayer from './components/MusicPlayer'
import DailyCard from './components/DailyCard'

// --- PAGES ---
import About from './pages/About'
import Request from './pages/Request'
import Auth from './pages/Auth'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AdminDaily from './pages/AdminDaily'
import Showcase from './pages/Showcase'
import PjskGuide from './pages/PjskGuide'

function App() {
  // --- STATES ---
  const [games, setGames] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('name-asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [currentPageState, setCurrentPageState] = useState(window.location.pathname)
  const [session, setSession] = useState(null)
  const [databaseStatus, setDatabaseStatus] = useState('syncing') // online, offline, syncing

  const itemsPerPage = 6

  // --- EFFECTS ---
  useEffect(() => {
    const savedSession = localStorage.getItem('hub_session')
    if (savedSession) setSession(JSON.parse(savedSession))

    const loadGames = async () => {
      setLoading(true)
      try {
        const result = await getAllGamesFromPastefy()
        if (result.success) {
          setGames(result.games)
          setDatabaseStatus('online')
        } else {
          setDatabaseStatus('offline')
        }
      } catch (error) {
        setDatabaseStatus('offline')
      } finally {
        setLoading(false)
      }
    }
    loadGames()
  }, [])

  useEffect(() => {
    const handlePopState = () => setCurrentPageState(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // --- HANDLERS ---
  const navigateTo = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPageState(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDownloadIntent = (link) => {
    if (link && link.trim() !== "") {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  // --- LOGIC: PARSE DYNAMIC CHANGELOG ---
  const parseChangelog = (raw) => {
    if (!raw) return []
    return raw.split('\n').filter(line => line.includes('|')).map(line => {
      const [version, date, note] = line.split('|')
      return { 
        version: version?.trim() || 'N/A', 
        date: date?.trim() || 'N/A', 
        note: note?.trim() || 'No Detail' 
      }
    })
  }

  // --- COMPUTED DATA (SORTING & INJECTION) ---
  const processedGames = useMemo(() => {
    // Inject parsed changelog data
    let result = games.map(g => ({ ...g, changelogData: parseChangelog(g.changelogRaw) }))
    
    // Filter logic
    if (filter === 'jp') result = result.filter(g => g.version === 'JP')
    if (filter === 'global') result = result.filter(g => g.version === 'Global')
    if (filter === 'ai') result = result.filter(g => g.category === 'AI')
    if (filter === 'internet') result = result.filter(g => g.category === 'Internet')
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(g => g.name.toLowerCase().includes(q))
    }

    // Priority Sorting (Project Sekai Always First)
    return result.sort((a, b) => {
      const aName = a.name.toLowerCase()
      const bName = b.name.toLowerCase()
      const aIsHot = aName.includes("project sekai")
      const bIsHot = bName.includes("project sekai")

      if (aIsHot && !bIsHot) return -1
      if (!aIsHot && bIsHot) return 1

      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name)
      if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      
      return 0
    })
  }, [games, filter, searchQuery, sortBy])

  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return processedGames.slice(start, start + itemsPerPage)
  }, [processedGames, currentPage])

  const totalPages = Math.ceil(processedGames.length / itemsPerPage)
  useEffect(() => { setCurrentPage(1) }, [filter, searchQuery, sortBy])

  if (!session) return <Auth onLoginSuccess={setSession} />

  const renderHome = () => (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      
      {/* Real-time Connection Failure Banner */}
      <AnimatePresence>
        {databaseStatus === 'offline' && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0"></div>
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">
                  Mainframe Connection Failure: Pastefy API is currently unreachable. System is in read-only local mode.
                </p>
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="text-[9px] font-black text-white bg-red-600 px-6 py-2 rounded-lg hover:bg-red-500 transition-all uppercase shrink-0"
              >
                Retry Connection
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white italic">
          RHYTHM<span className="text-blue-600">HUB</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-[10px] uppercase tracking-[0.4em] leading-loose">
          Platform kurasi MOD APK berkualitas. <br/>
          Download aman, instalasi mudah, pembaruan rutin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        <div className="lg:col-span-8 xl:col-span-9 space-y-8 relative z-[50]">
          <SearchSortBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortBy={sortBy} setSortBy={setSortBy} />
          <FilterBar filter={filter} setFilter={setFilter} />
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Synchronizing Mainframe...</p>
            </div>
          ) : (
            <div className="space-y-12">
              <GameGrid games={paginatedGames} onDownload={handleDownloadIntent} />
              {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            </div>
          )}
          
          <div 
            onClick={() => navigateTo('/pjsk-guide')}
            className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 mt-12 cursor-pointer hover:bg-red-900/20 transition-all group text-left"
          >
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest leading-relaxed">
              Peringatan: Project Sekai berisiko tinggi banned. Baca Safety Guide untuk mitigasi risiko. <br/>
              <span className="text-white underline group-hover:text-blue-400 font-black">[ Buka Safety Guide Disini ]</span>
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-8 relative z-[40]">
          <div className="sticky top-28 space-y-8">
            <DailyCard />
            <div className="bg-[#161b2c]/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl text-left">
               <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4 block leading-none">System Status</span>
               <div className="space-y-3 font-bold text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-gray-500 uppercase tracking-widest">Total Items</span>
                    <span className="text-white">{games.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 uppercase tracking-widest">Encryption</span>
                    <span className="text-blue-500">Active</span>
                  </div>
               </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  )

  const renderContent = () => {
    const routes = {
      '/about': <About />,
      '/request': <Request />,
      '/privacy': <Privacy />,
      '/terms': <Terms />,
      '/admin-daily': <AdminDaily />,
      '/showcase': <Showcase />,
      '/pjsk-guide': <PjskGuide />
    }
    return routes[currentPageState] || renderHome()
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-white selection:bg-blue-500/30 font-sans">
      <Navbar 
        navigateTo={navigateTo} 
        activePage={currentPageState} 
        user={session} 
        onLogout={() => { localStorage.removeItem('hub_session'); setSession(null); }} 
        dbStatus={databaseStatus}
      />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl relative z-10">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <footer className="bg-[#0b0d14] border-t border-gray-800/50 mt-32 pt-20 pb-10 relative z-10 text-left">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <img src="https://files.catbox.moe/ce6atq.jpg" alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-gray-800" />
                <span className="font-black text-xl tracking-tighter uppercase text-white italic">RHYTHM<span className="text-blue-500">HUB</span></span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest">
                Kurasi MOD APK terbaik dengan standar keamanan komunitas.
              </p>
            </div>

            {[
              { 
                title: 'Navigation', 
                links: [{ n: 'Home', p: '/' }, { n: 'About', p: '/about' }, { n: 'Request', p: '/request' }, { n: 'Safety Guide', p: '/pjsk-guide' }] 
              },
              { 
                title: 'Library', 
                links: [{ n: 'JP Version', f: 'jp' }, { n: 'AI Mods', f: 'ai' }, { n: 'Internet Tool', f: 'internet' }, { n: 'Showcase', p: '/showcase' }] 
              },
              { 
                title: 'Legal', 
                links: [{ n: 'Privacy', p: '/privacy' }, { n: 'Terms', p: '/terms' }] 
              }
            ].map((col, i) => (
              <div key={i} className="space-y-5">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <button 
                        onClick={() => { if(l.p) navigateTo(l.p); if(l.f) { setFilter(l.f); navigateTo('/'); } }} 
                        className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest"
                      >
                        {l.n}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-gray-700 uppercase tracking-[0.3em]">
            <p>© 2026 RhythmHub. Secured Database System.</p>
          </div>
        </div>
      </footer>

      <ActivityLog />
      <MusicPlayer />
    </div>
  )
}

export default App;
