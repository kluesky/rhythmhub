// src/components/AdminGamePanel.jsx - FINAL FIX
import { useState, useEffect } from 'react'
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
  
  const [isVersionOpen, setIsVersionOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  
  const { addToast } = useToast()

  // LOCK BODY SCROLL: Mencegah background ikut gerak saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  const ADMIN_PASSWORD = 'admin123'
  const modTypeOptions = ['VIP UNLOCKED', 'MEGA MOD', 'PREMIUM', 'UNLIMITED MONEY', 'AD-FREE']
  
  const statusOptions = [
    { value: 'success', label: 'Online / Stable', icon: '🟢', risk: 'Aman digunakan' },
    { value: 'warning', label: 'High Risk / Warning', icon: '⚠️', risk: 'Berisiko banned' },
    { value: 'danger', label: 'Maintenance / Detected', icon: '🔴', risk: 'Jangan digunakan' }
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
      addToast('✅ ACCESS GRANTED', 'success')
      setPassword('')
    } else {
      addToast('❌ ACCESS DENIED', 'error')
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
      addToast(editingGame ? '✅ UPDATE SUCCESS' : '✅ PUBLISHED', 'success')
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
        addToast(`🗑️ DELETED: ${gameName}`, 'success')
        await loadGames()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#05060a]/90 backdrop-blur-xl px-4 py-4 md:py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0f111a] rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-full md:max-h-[90vh] overflow-hidden border border-white/5 flex flex-col"
      >
        {/* STICKY HEADER */}
        <div className="bg-[#161b2c]/50 px-8 py-6 flex justify-between items-center border-b border-white/5 shrink-0">
          <div className="flex flex-col text-left">
            <h2 className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">
              Game <span className="text-blue-500">Terminal</span>
            </h2>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-2 leading-none">Management System v2.0</span>
          </div>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-red-500/20 transition-all active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* SCROLLABLE BODY AREA */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-transparent to-[#0a0c14]">
          {!isAuthenticated ? (
            <div className="max-w-xs mx-auto py-24 space-y-6 text-center">
               <h3 className="text-white font-black uppercase italic tracking-tighter text-xl">Authorized Only</h3>
               <form onSubmit={handleLogin} className="space-y-4">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 bg-black/40 border border-white/5 text-white rounded-2xl focus:border-blue-500 text-center font-mono outline-none" placeholder="ENTER PASSKEY" />
                  <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs">Verify Terminal</button>
               </form>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Toolbar */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-3xl sticky top-0 z-[100] backdrop-blur-md">
                <div className="flex flex-col text-left w-full">
                   <h3 className="text-white font-black text-sm uppercase italic tracking-tighter leading-none">Database Mainframe</h3>
                   <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-2 leading-none">Total {games.length} Entries Sync</span>
                </div>
                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  <button onClick={loadGames} className="px-5 py-3 bg-white/5 text-gray-400 rounded-2xl border border-white/5 hover:text-white transition-all">🔄</button>
                  <button onClick={() => isAdding ? resetForm() : setIsAdding(true)} className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${isAdding ? 'bg-red-500/20 text-red-400 border border-red-500/20' : 'bg-blue-600 text-white shadow-xl'}`}>
                    {isAdding ? 'Cancel Entry' : '+ New Item'}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {isAdding && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-visible">
                    <form onSubmit={handleSubmit} className="bg-[#161b2c]/40 rounded-[2rem] p-8 border border-white/5 space-y-8 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputField label="Game Title" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                        <div className="space-y-2 relative">
                          <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic">Region Segment</label>
                          <div onClick={() => setIsVersionOpen(!isVersionOpen)} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl flex justify-between items-center cursor-pointer text-sm text-white">
                            <span>{formData.version === 'Global' ? '🌍 Global' : '🇯🇵 Japan'}</span>
                            <span className="text-[10px]">▼</span>
                          </div>
                          {isVersionOpen && (
                            <div className="absolute z-[100] w-full mt-2 bg-[#1e2235] border border-white/5 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                              {['Global', 'JP'].map(v => (
                                <div key={v} onClick={() => { setFormData({...formData, version: v}); setIsVersionOpen(false); }} className="px-5 py-4 hover:bg-blue-600 text-xs text-white cursor-pointer uppercase font-black">{v} Version</div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InputField label="Publisher" value={formData.publisher} onChange={(v) => setFormData({...formData, publisher: v})} />
                        <InputField label="Genre Tag" value={formData.genre} onChange={(v) => setFormData({...formData, genre: v})} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic leading-none">Manifest Description</label>
                        <textarea placeholder="Brief information..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none text-sm text-gray-400 resize-none h-24 focus:border-blue-500 transition-all" />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic leading-none">Mod Capability Matrix:</label>
                        <div className="flex flex-wrap gap-2">
                          {modTypeOptions.map(type => (
                            <button key={type} type="button" onClick={() => toggleModType(type)} className={`px-4 py-2 rounded-xl text-[9px] font-black border transition-all ${formData.selectedModTypes.includes(type) ? 'bg-blue-600 border-blue-400 text-white' : 'bg-black/40 border-white/5 text-gray-500'}`}>{type}</button>
                          ))}
                        </div>
                      </div>

                      <InputField label="Asset Banner URL" value={formData.imageUrl} onChange={(v) => setFormData({...formData, imageUrl: v})} />
                      <InputField label="Direct Source Link" value={formData.playstoreLink} onChange={(v) => setFormData({...formData, playstoreLink: v})} />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-blue-500 uppercase ml-2 italic tracking-widest leading-none">Original Features</label>
                          <textarea placeholder="Feature A, Feature B..." value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none text-[11px] text-gray-400 resize-none h-24 focus:border-blue-500 font-mono" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-blue-500 uppercase ml-2 italic tracking-widest leading-none">Modified Core</label>
                          <textarea placeholder="Mod A, Mod B..." value={formData.modFeatures} onChange={(e) => setFormData({...formData, modFeatures: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none text-[11px] text-purple-300 resize-none h-24 focus:border-blue-500 font-mono" />
                        </div>
                      </div>

                      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-3xl transition-all shadow-xl uppercase tracking-[0.3em] text-[11px]">Transmit to Database</button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* LIST GAMES */}
              <div className="grid grid-cols-1 gap-4 pb-20">
                {isLoading ? (
                  <div className="py-24 text-center animate-pulse text-[10px] font-black uppercase text-gray-700 tracking-[0.4em]">Syncing Mainframe...</div>
                ) : (
                  games.map((game) => (
                    <div key={game.id} className="bg-[#161b2c]/30 border border-white/5 rounded-[2rem] p-5 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-5 w-full text-left">
                        <img src={game.imageUrl} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt="" />
                        <div className="flex flex-col">
                          <h4 className="font-black text-white uppercase italic tracking-tighter text-sm leading-none">{game.name}</h4>
                          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-2">{game.publisher} • {game.version}</span>
                        </div>
                      </div>
                      <div className="flex gap-3 w-full md:w-auto">
                        <button onClick={() => handleEdit(game)} className="flex-1 md:flex-none px-6 py-3 bg-white/5 text-gray-500 rounded-xl font-black text-[9px] uppercase hover:text-white transition-all">Edit</button>
                        <button onClick={() => handleDelete(game.id, game.name)} className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-black text-[9px] uppercase hover:bg-red-500 transition-all">Wipe</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

const InputField = ({ label, value, onChange }) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] font-black text-blue-500 uppercase ml-2 italic tracking-widest leading-none">{label}</label>
    <input type="text" value={value} className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500 text-sm transition-all" onChange={(e) => onChange(e.target.value)} required />
  </div>
)
