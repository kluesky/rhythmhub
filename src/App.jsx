import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- API & SERVICES ---
import { getAllGamesFromPastefy, getAllUsersFromPastefy } from './api/pastefy'

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
  
  // New Features: Database & Daily Content
  const [databaseStatus, setDatabaseStatus] = useState('syncing') // online, offline, syncing
  const [dailyContent, setDailyContent] = useState(null)
  
  // User Statistics Feature
  const [userStats, setUserStats] = useState(0)

  const itemsPerPage = 6

  // --- EFFECTS: LOAD ALL DATA ---
  useEffect(() => {
    // Load User Session
    const savedSession = localStorage.getItem('hub_session')
    if (savedSession) setSession(JSON.parse(savedSession))

    const fetchData = async () => {
      setLoading(true)
      try {
        // 1. Fetch Games
        const result = await getAllGamesFromPastefy()
        if (result.success) {
          setGames(result.games || [])
          setDatabaseStatus('online')
        } else {
          setDatabaseStatus('offline')
        }

        // 2. Fetch User Stats (ID: LvcKPvc9)
        const userResult = await getAllUsersFromPastefy()
        if (userResult.success) {
          setUserStats(userResult.users?.length || 0)
        }
        
      } catch (error) {
        console.error("Mainframe Sync Error:", error)
        setDatabaseStatus('offline')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Navigation Logic
  useEffect(() => {
    const handlePopState = () => setCurrentPageState(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateTo = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPageState(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // --- HANDLERS ---
  const handleDownloadIntent = (link) => {
    if (link && link.trim() !== "") {
      window.open(link, '_blank', 'noopener,noreferrer');
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
        note: note?.trim() || 'No detail' 
      }
    })
  }

  // --- COMPUTED DATA (SORTING & FILTERING) ---
  const processedGames = useMemo(() => {
    // Inject parsed changelog data
    let result = (games || []).map(g => ({ ...g, changelogData: parseChangelog(g.changelogRaw) }))
    
    if (filter === 'jp') result = result.filter(g => g.version === 'JP')
    if (filter === 'global') result = result.filter(g => g.version === 'Global')
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(g => g.name.toLowerCase().includes(q))
    }

    // PJSK Always #1
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
      
      {/* DB OFFLINE ALARM BANNER */}
      <AnimatePresence>
        {databaseStatus === 'offline' && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0"></div>
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest leading-none text-left">
                  Critical Error: Mainframe Sync Failed. Database Unreachable.
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

      <div className="text-center mb-16 space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white italic">RHYTHM<span className="text-blue-600">HUB</span></h1>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-[10px] uppercase tracking-[0.4em] leading-loose text-center">
          MOD APK curation platform specifically for rhythm games with community quality standards. <br/>
          Free, safe, and updated downloads.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        <div className="lg:col-span-8 xl:col-span-9 space-y-8 relative z-[50]">
          <SearchSortBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} sortBy={sortBy} setSortBy={setSortBy} />
          <FilterBar filter={filter} setFilter={setFilter} />
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4 text-left">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-gray-600 tracking-widest uppercase">Syncing Protocol...</p>
            </div>
          ) : (
            <div className="space-y-12">
              <GameGrid 
                games={paginatedGames} 
                onDownload={handleDownloadIntent} 
                dbStatus={databaseStatus} 
              />
              {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
            </div>
          )}
          
          <div 
            onClick={() => navigateTo('/pjsk-guide')}
            className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6 mt-12 cursor-pointer hover:bg-red-900/20 transition-all group text-left"
          >
            <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest leading-relaxed">
              Warning: Project Sekai has a high risk of being banned. Read the Safety Guide for risk mitigation. <br/>
              <span className="text-white underline group-hover:text-blue-400 font-black uppercase">[ Open Safety Guide Here ]</span>
            </p>
          </div>
        </div>

        <aside className="lg:col-span-4 xl:col-span-3 space-y-8 relative z-[40]">
          <div className="sticky top-28 space-y-8">
            <DailyCard dailyContent={dailyContent} />

            <div className="bg-[#161b2c]/40 border border-white/5 rounded-3xl p-6 backdrop-blur-xl text-left">
               <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4 block leading-none text-left">System Status</span>
               <div className="space-y-3 font-bold text-[10px]">
                  <div className="flex justify-between items-center text-left">
                    <span className="text-gray-500 uppercase tracking-widest">Total Items</span>
                    <span className="text-white">{games.length}</span>
                  </div>
                  
                  {/* Authorized Personnel Stats */}
                  <div className="flex justify-between items-center text-left border-t border-white/5 pt-3 text-left">
                    <span className="text-blue-500/50 uppercase tracking-tighter">Authorized Personnel</span>
                    <span className="text-blue-400 font-mono italic">[{userStats}]</span>
                  </div>

                  <div className="flex justify-between items-center text-left text-left">
                    <span className="text-gray-500 uppercase tracking-widest">Mainframe</span>
                    <span className={databaseStatus === 'online' ? 'text-green-500 font-mono' : 'text-red-500 font-mono'}>{databaseStatus.toUpperCase()}</span>
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
      '/about': <About />, '/request': <Request />, '/privacy': <Privacy />, '/terms': <Terms />, '/admin-daily': <AdminDaily />, '/showcase': <Showcase />, '/pjsk-guide': <PjskGuide />
    }
    return routes[currentPageState] || renderHome()
  }

  return (
    <div className="min-h-screen bg-[#0f111a] text-white selection:bg-blue-500/30 font-sans">
      <Navbar navigateTo={navigateTo} activePage={currentPageState} user={session} onLogout={() => { localStorage.removeItem('hub_session'); setSession(null); }} dbStatus={databaseStatus} />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl relative z-10 text-left text-left">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>
      
      <footer className="bg-[#0b0d14] border-t border-gray-800/50 mt-32 pt-20 pb-10 relative z-10 text-left">
        <div className="container mx-auto px-4 max-w-7xl space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
            <div className="space-y-5 text-left text-left">
              <div className="flex items-center gap-3">
                <img src="https://files.catbox.moe/ce6atq.jpg" alt="Logo" className="w-10 h-10 rounded-xl object-cover border border-gray-800" />
                <span className="font-black text-xl tracking-tighter uppercase text-white italic">RHYTHM<span className="text-blue-600">HUB</span></span>
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-widest text-left">
                MOD APK curation platform specifically for rhythm games with community quality standards. Free, safe, and updated downloads.
              </p>
            </div>

            <div className="space-y-5 text-left">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Navigation</h4>
              <ul className="space-y-3">
                <li><button onClick={() => navigateTo('/')} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest">Home</button></li>
                <li><button onClick={() => navigateTo('/about')} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest">About</button></li>
                <li><button onClick={() => navigateTo('/request')} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest">Request</button></li>
                <li><button onClick={() => navigateTo('/pjsk-guide')} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest">Safety Guide</button></li>
              </ul>
            </div>

            <div className="space-y-5 text-left text-left">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Library</h4>
              <ul className="space-y-3">
                <li><button onClick={() => { setFilter('jp'); navigateTo('/'); }} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest text-left">JP Version</button></li>
                <li><button onClick={() => { setFilter('ai'); navigateTo('/'); }} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest text-left">AI Mods</button></li>
                <li><button onClick={() => { setFilter('internet'); navigateTo('/'); }} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest text-left">Internet Tool</button></li>
                <li><button onClick={() => navigateTo('/showcase')} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest text-left text-left">Showcase</button></li>
              </ul>
            </div>

            <div className="space-y-5 text-left text-left">
              <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Legal</h4>
              <ul className="space-y-3">
                <li><button onClick={() => navigateTo('/privacy')} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest text-left">Privacy</button></li>
                <li><button onClick={() => navigateTo('/terms')} className="text-[10px] text-gray-600 hover:text-blue-500 font-bold uppercase transition-colors tracking-widest text-left text-left">Terms</button></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-gray-800/50 text-[9px] font-bold text-gray-700 uppercase tracking-[0.3em] text-left text-left">
            <p>© 2026 RhythmHub. Secured Mainframe Database System.</p>
          </div>
        </div>
      </footer>

      <ActivityLog />
      <MusicPlayer />
    </div>
  )
}

export default App;