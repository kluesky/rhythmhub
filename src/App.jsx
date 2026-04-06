// src/App.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import FilterBar from './components/FilterBar'
import GameGrid from './components/GameGrid'
import About from './pages/About'
import Request from './pages/Request'
import { getAllGamesFromPastefy } from './api/pastefy'

function App() {
  const [games, setGames] = useState([])
  const [filter, setFilter] = useState('all')
  const [filteredGames, setFilteredGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('/')

  // Load games dari Pastefy
  useEffect(() => {
    const loadGames = async () => {
      setLoading(true)
      const result = await getAllGamesFromPastefy()
      if (result.success) {
        setGames(result.games)
      }
      setLoading(false)
    }
    loadGames()
  }, [])

  // Handle navigation
  useEffect(() => {
    const handlePopState = () => setCurrentPage(window.location.pathname)
    setCurrentPage(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Filter games berdasarkan versi
  useEffect(() => {
    if (filter === 'all') {
      setFilteredGames(games)
    } else if (filter === 'jp') {
      setFilteredGames(games.filter(game => game.version === 'JP'))
    } else if (filter === 'global') {
      setFilteredGames(games.filter(game => game.version === 'Global'))
    }
  }, [filter, games])

  const navigateTo = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPage(path)
  }

  // Halaman About
  if (currentPage === '/about') {
    return (
      <>
        <Navbar navigateTo={navigateTo} />
        <About />
      </>
    )
  }

  // Halaman Request
  if (currentPage === '/request') {
    return (
      <>
        <Navbar navigateTo={navigateTo} />
        <Request />
      </>
    )
  }

  // Halaman Home
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar navigateTo={navigateTo} />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-950/30 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-blue-800">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-blue-400 font-medium">#1 Koleksi MOD Game Rhythm</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Rhythm Game <span className="text-blue-500">MOD</span> Hub
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Koleksi MOD APK game rhythm terbaik. Download gratis dan nikmati fitur premium.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{games.length}</div>
              <div className="text-xs text-gray-500">Total Game</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12+</div>
              <div className="text-xs text-gray-500">Fitur MOD</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-gray-500">Gratis</div>
            </div>
          </div>
        </motion.div>

        {/* Global Disclaimer */}
        <div className="bg-yellow-950/30 border border-yellow-800 rounded-lg p-4 mb-8 max-w-3xl mx-auto">
          <p className="text-xs text-yellow-400 text-center">
            ⚠️ <span className="font-semibold">PERINGATAN:</span> MOD APK ini untuk tujuan edukasi. 
            Gunakan dengan bijak. Project Sekai memiliki risiko deteksi dan banned. 
            Kami tidak bertanggung jawab atas akun Anda.
          </p>
        </div>

        <FilterBar filter={filter} setFilter={setFilter} />
        
        {loading ? (
          <div className="text-center py-20 text-gray-400">Memuat game...</div>
        ) : (
          <GameGrid games={filteredGames} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20 bg-gray-950">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg"></div>
                <span className="font-bold text-white">Rhythm<span className="text-blue-500">Hub</span></span>
              </div>
              <p className="text-sm text-gray-500">Koleksi MOD APK game rhythm original terbaik dengan fitur premium.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button onClick={() => navigateTo('/')} className="hover:text-blue-500 transition">Beranda</button></li>
                <li><button onClick={() => navigateTo('/about')} className="hover:text-blue-500 transition">Tentang</button></li>
                <li><button onClick={() => navigateTo('/request')} className="hover:text-blue-500 transition">Request Game</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Kategori</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><button onClick={() => { setFilter('jp'); navigateTo('/') }} className="hover:text-blue-500 transition">JP Version</button></li>
                <li><button onClick={() => { setFilter('global'); navigateTo('/') }} className="hover:text-blue-500 transition">Global Version</button></li>
                <li><button onClick={() => { setFilter('all'); navigateTo('/') }} className="hover:text-blue-500 transition">Semua Game</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="#" className="hover:text-blue-500 transition">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-blue-500 transition">Syarat & Ketentuan</a></li>
                <li><span className="text-xs">© 2024 Rhythm Hub</span></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800 text-xs text-gray-600">
            <p>Semua game adalah hak cipta dari masing-masing pengembang. MOD APK untuk keperluan edukasi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App