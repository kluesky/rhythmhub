// src/components/AdminGamePanel.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllGamesFromPastefy, addGameToPastefy, updateGameOnPastefy, deleteGameFromPastefy } from '../api/pastefy'
import { useToast } from '../context/ToastContext'

export default function AdminGamePanel({ isOpen, onClose }) {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingGame, setEditingGame] = useState(null)
  
  // State untuk Custom Dropdown
  const [isVersionOpen, setIsVersionOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  
  const { addToast } = useToast()

  const ADMIN_PASSWORD = 'admin123'
  const modTypeOptions = ['VIP UNLOCKED', 'MEGA MOD', 'PREMIUM', 'UNLIMITED MONEY', 'AD-FREE']
  
  const statusOptions = [
    { value: 'success', label: 'Online / Stable', icon: '🟢', risk: 'Aman digunakan', color: 'text-[#4ade80]', bg: 'bg-[#14321a]/60', border: 'border-[#1e5128]' },
    { value: 'warning', label: 'High Risk / Warning', icon: '⚠️', risk: 'Berisiko banned', color: 'text-[#fbbf24]', bg: 'bg-[#3b2d0a]/60', border: 'border-[#785413]' },
    { value: 'danger', label: 'Maintenance / Detected', icon: '🔴', risk: 'Jangan digunakan', color: 'text-[#f87171]', bg: 'bg-[#451010]/60', border: 'border-[#7f1d1d]' }
  ]

  const initialForm = {
    name: '', version: 'Global', imageUrl: '', playstoreLink: '',
    genre: '', publisher: '', description: '', features: '',
    modFeatures: '', selectedModTypes: [], status: 'success'
  }

  const [formData, setFormData] = useState(initialForm)

  const loadGames = async () => {
    setIsLoading(true)
    const result = await getAllGamesFromPastefy()
    if (result.success) setGames(result.games)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated && isOpen) loadGames()
  }, [isAuthenticated, isOpen])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      addToast('✅ Akses Admin Diterima!', 'success')
      setPassword('')
    } else {
      addToast('❌ Password Salah!', 'error')
    }
  }

  const toggleModType = (type) => {
    setFormData(prev => ({
      ...prev,
      selectedModTypes: prev.selectedModTypes.includes(type)
        ? prev.selectedModTypes.filter(t => t !== type)
        : [...prev.selectedModTypes, type]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const selectedStatus = statusOptions.find(opt => opt.value === formData.status)
    const statusText = `${selectedStatus.icon} ${selectedStatus.label}`
    
    const dataToSend = { ...formData, statusText }
    
    const result = editingGame 
      ? await updateGameOnPastefy(editingGame.id, {
          ...dataToSend,
          features: formData.features.split(',').map(f => f.trim()),
          modFeatures: formData.modFeatures.split(',').map(f => f.trim()),
          updatedAt: new Date().toISOString()
        })
      : await addGameToPastefy(dataToSend)

    if (result.success) {
      addToast(editingGame ? '✅ Update Berhasil!' : '✅ Game Publish!', 'success')
      resetForm()
      await loadGames()
    }
  }

  const handleEdit = (game) => {
    setEditingGame(game)
    setIsAdding(true)
    setFormData({
      ...game,
      features: Array.isArray(game.features) ? game.features.join(', ') : game.features,
      modFeatures: Array.isArray(game.modFeatures) ? game.modFeatures.join(', ') : game.modFeatures,
      selectedModTypes: game.selectedModTypes || []
    })
  }

  const resetForm = () => {
    setFormData(initialForm)
    setEditingGame(null)
    setIsAdding(false)
  }

  const handleDelete = async (gameId, gameName) => {
    if (confirm(`Hapus permanen "${gameName}"?`)) {
      const result = await deleteGameFromPastefy(gameId)
      if (result.success) {
        addToast(`🗑️ "${gameName}" telah dihapus`, 'success')
        await loadGames()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0f111a] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border border-gray-800"
      >
        {/* Header */}
        <div className="bg-[#1e2235] px-6 py-4 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-white font-bold tracking-tight uppercase text-sm">🎮 Game Management System</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-75px)]">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="max-w-xs mx-auto py-12 space-y-4">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#161b2c] border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-center" placeholder="Admin Password" />
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg">Login</button>
            </form>
          ) : (
            <>
              {/* Toolbar */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-xs flex items-center gap-2 uppercase tracking-widest">
                   Database Games <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded text-[10px]">{games.length}</span>
                </h3>
                <div className="flex gap-2">
                  <button onClick={loadGames} className="p-2 bg-[#1e2235] text-gray-400 rounded-lg border border-gray-700 hover:text-white transition-colors">🔄</button>
                  <button onClick={() => isAdding ? resetForm() : setIsAdding(true)} 
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isAdding ? 'bg-gray-700 text-white' : 'bg-green-600 text-white shadow-lg shadow-green-900/20'}`}>
                    {isAdding ? 'Batal' : '+ Publish Game'}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isAdding && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-visible mb-8">
                    <form onSubmit={handleSubmit} className="bg-[#161b2c] rounded-2xl p-6 border border-gray-700 space-y-5">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* INPUT NAMA */}
                        <div className="space-y-1.5 text-white">
                          <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Nama Game</label>
                          <input type="text" placeholder="Genshin Impact, etc.." value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 rounded-xl focus:border-blue-600 outline-none text-sm transition-all" required />
                        </div>

                        {/* CUSTOM DROPDOWN VERSION */}
                        <div className="space-y-1.5 text-white relative">
                          <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Region/Version</label>
                          <div 
                            onClick={() => { setIsVersionOpen(!isVersionOpen); setIsStatusOpen(false); }}
                            className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 rounded-xl flex justify-between items-center cursor-pointer hover:border-blue-600 transition-all text-sm"
                          >
                            <span className="flex items-center gap-2">
                              {formData.version === 'Global' ? '🌍 Global' : '🇯🇵 Japan'}
                            </span>
                            <span className={`text-[10px] transform transition-transform ${isVersionOpen ? 'rotate-180' : ''}`}>▼</span>
                          </div>

                          <AnimatePresence>
                            {isVersionOpen && (
                              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="absolute z-[100] w-full mt-2 bg-[#1e2235] border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                              >
                                {['Global', 'JP'].map((v) => (
                                  <div key={v} onClick={() => { setFormData({...formData, version: v}); setIsVersionOpen(false); }}
                                    className={`px-4 py-3 hover:bg-blue-600/20 cursor-pointer flex items-center justify-between transition-colors text-xs ${formData.version === v ? 'bg-blue-600/10 text-blue-400 font-bold' : 'text-gray-300'}`}
                                  >
                                    <span>{v === 'Global' ? '🌍 Global' : '🇯🇵 Japan'}</span>
                                    {formData.version === v && <span>✔</span>}
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* MOD PRESETS */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Mod Presets (Quick Select):</label>
                        <div className="flex flex-wrap gap-2">
                          {modTypeOptions.map(type => (
                            <button key={type} type="button" onClick={() => toggleModType(type)}
                              className={`px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all ${
                                formData.selectedModTypes.includes(type)
                                  ? 'bg-blue-600 border-blue-400 text-white' : 'bg-[#0f111a] border-gray-800 text-gray-500 hover:border-gray-600'
                              }`}>
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* CUSTOM DROPDOWN STATUS */}
                        <div className="space-y-1.5 text-white relative">
                          <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Status MOD</label>
                          <div 
                            onClick={() => { setIsStatusOpen(!isStatusOpen); setIsVersionOpen(false); }}
                            className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 rounded-xl flex justify-between items-center cursor-pointer hover:border-blue-600 transition-all text-sm"
                          >
                            <span className="flex items-center gap-2">
                              {statusOptions.find(o => o.value === formData.status).icon} {statusOptions.find(o => o.value === formData.status).label}
                            </span>
                            <span className={`text-[10px] transform transition-transform ${isStatusOpen ? 'rotate-180' : ''}`}>▼</span>
                          </div>

                          <AnimatePresence>
                            {isStatusOpen && (
                              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                className="absolute z-[100] w-full mt-2 bg-[#1e2235] border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
                              >
                                {statusOptions.map((opt) => (
                                  <div key={opt.value} onClick={() => { setFormData({...formData, status: opt.value}); setIsStatusOpen(false); }}
                                    className={`px-4 py-3 hover:bg-white/5 cursor-pointer flex flex-col transition-colors border-b border-gray-800 last:border-0 ${formData.status === opt.value ? 'bg-blue-600/10' : ''}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className={`text-xs font-bold ${formData.status === opt.value ? 'text-blue-400' : 'text-gray-300'}`}>
                                        {opt.icon} {opt.label}
                                      </span>
                                      {formData.status === opt.value && <span className="text-blue-400 text-xs">✔</span>}
                                    </div>
                                    <span className="text-[9px] text-gray-500 font-medium">{opt.risk}</span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <div className="space-y-1.5 text-white">
                          <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Genre</label>
                          <input type="text" placeholder="Action, Rhythm.." value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 rounded-xl outline-none text-sm" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <input type="text" placeholder="Image URL (Banner)" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 rounded-xl outline-none text-sm text-blue-400" required />
                        <input type="text" placeholder="Download Link (APK/MOD)" value={formData.playstoreLink} onChange={(e) => setFormData({...formData, playstoreLink: e.target.value})} className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 rounded-xl outline-none text-sm text-green-400" required />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <textarea placeholder="Fitur Game (Pisah dengan koma)" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 rounded-xl outline-none text-sm text-gray-300 resize-none h-24 shadow-inner" />
                        <textarea placeholder="Fitur MOD (Pisah dengan koma)" value={formData.modFeatures} onChange={(e) => setFormData({...formData, modFeatures: e.target.value})} className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 rounded-xl outline-none text-sm text-purple-300 resize-none h-24 shadow-inner" />
                      </div>

                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-widest text-xs">
                        {editingGame ? 'Update Database Item' : 'Publish to RhythmHub'}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Game List Area */}
              <div className="grid grid-cols-1 gap-3 pb-6">
                {isLoading ? (
                  <div className="text-center py-20 text-gray-600 text-[10px] animate-pulse font-bold tracking-[0.3em]">SYNCHRONIZING...</div>
                ) : games.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-2xl text-gray-600 text-xs">DATABASE EMPTY</div>
                ) : (
                  games.map((game) => (
                    <motion.div key={game.id} layout className="border border-gray-800 rounded-2xl p-4 bg-[#161b2c]/40 hover:bg-[#161b2c] transition-all group">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex gap-4 items-center flex-1">
                          <img src={game.imageUrl} alt="" className="w-14 h-14 object-cover rounded-xl border border-gray-700 shadow-lg" onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=X'} />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-bold text-white tracking-tight">{game.name}</h4>
                              <span className="text-[9px] font-black px-2 py-0.5 rounded bg-blue-900/40 text-blue-400 border border-blue-800 uppercase tracking-tighter">
                                {game.version === 'JP' ? '🇯🇵 JP' : '🌍 Global'}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {game.selectedModTypes?.map(t => (
                                <span key={t} className="text-[8px] font-black px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          <button onClick={() => handleEdit(game)} className="flex-1 md:flex-none px-4 py-2 bg-yellow-600/10 text-yellow-500 border border-yellow-900/50 rounded-lg text-[10px] font-bold hover:bg-yellow-600 hover:text-white transition-all">EDIT</button>
                          <button onClick={() => handleDelete(game.id, game.name)} className="flex-1 md:flex-none px-4 py-2 bg-red-600/10 text-red-500 border border-red-900/50 rounded-lg text-[10px] font-bold hover:bg-red-600 hover:text-white transition-all">HAPUS</button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
