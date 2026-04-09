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
  
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null, name: '' })
  
  const [isVersionOpen, setIsVersionOpen] = useState(false)
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  
  const { addToast } = useToast()

  const ADMIN_PASSWORD = 'admin123'
  const modTypeOptions = ['VIP UNLOCKED', 'MEGA MOD', 'PREMIUM', 'UNLIMITED MONEY', 'AD-FREE']
  
  const statusOptions = [
    { value: 'success', label: 'Online Stable', color: 'bg-green-500', text: 'STABLE' },
    { value: 'warning', label: 'High Risk', color: 'bg-yellow-500', text: 'RISK' },
    { value: 'danger', label: 'Maintenance / Need Update', color: 'bg-red-500', text: 'MAINT' }
  ]

  const initialForm = {
    name: '', version: 'Global', imageUrl: '', playstoreLink: '',
    genre: '', publisher: '', description: '', features: '',
    modFeatures: '', selectedModTypes: [], status: 'success', changelogRaw: ''
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
      setIsAuthenticated(true); addToast('ACCESS GRANTED', 'success'); setPassword('')
    } else { addToast('ACCESS DENIED', 'error') }
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
    const statusText = `[${selectedStatus.text}] ${selectedStatus.label}`
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
      addToast(editingGame ? 'UPDATE SUCCESS' : 'PUBLISHED', 'success'); resetForm(); await loadGames()
    }
  }

  const handleEdit = (game) => {
    setEditingGame(game); setIsAdding(true)
    setFormData({
      ...game,
      features: Array.isArray(game.features) ? game.features.join(', ') : game.features,
      modFeatures: Array.isArray(game.modFeatures) ? game.modFeatures.join(', ') : game.modFeatures,
      selectedModTypes: game.selectedModTypes || [],
      status: game.status || 'success',
      changelogRaw: game.changelogRaw || ''
    })
  }

  const resetForm = () => { setFormData(initialForm); setEditingGame(null); setIsAdding(false) }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#05060a]/90 backdrop-blur-xl px-4 py-4 md:py-10">
      
      {/* DELETE CONFIRM */}
      <AnimatePresence>
        {deleteConfirm.show && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm({ show: false, id: null, name: '' })} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative bg-[#161b2c] border border-red-500/30 rounded-[2rem] p-8 w-full max-w-sm text-center">
              <h3 className="text-white font-black uppercase italic tracking-tighter text-xl mb-2">Confirm Delete</h3>
              <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-8">Permanent wipe "{deleteConfirm.name}"?</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm({ show: false, id: null, name: '' })} className="flex-1 bg-white/5 text-gray-400 font-black py-4 rounded-2xl text-[10px] uppercase">Cancel</button>
                <button onClick={async () => {
                  const result = await deleteGameFromPastefy(deleteConfirm.id)
                  if (result.success) { addToast('DELETED', 'success'); setDeleteConfirm({ show: false, id: null, name: '' }); loadGames() }
                }} className="flex-1 bg-red-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase">Wipe</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f111a] rounded-[2.5rem] w-full max-w-4xl max-h-full overflow-hidden border border-white/5 flex flex-col">
        <div className="bg-[#161b2c]/50 px-8 py-6 flex justify-between items-center border-b border-white/5">
          <div className="text-left">
            <h2 className="text-white font-black uppercase italic tracking-tighter text-lg leading-none">Game <span className="text-blue-500">Terminal</span></h2>
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-2 block">Management System</span>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:text-white uppercase text-[8px] font-black tracking-widest">Close</button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-gradient-to-b from-transparent to-[#0a0c14] text-left">
          {!isAuthenticated ? (
            <div className="max-w-xs mx-auto py-24 space-y-6">
               <h3 className="text-white font-black uppercase italic tracking-tighter text-xl text-center">Authorized Only</h3>
               <form onSubmit={handleLogin} className="space-y-4">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-6 py-4 bg-black/40 border border-white/5 text-white rounded-2xl focus:border-blue-500 text-center font-mono outline-none uppercase" placeholder="PASSKEY" />
                  <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-xs">Verify</button>
               </form>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center gap-6 p-6 bg-white/5 border border-white/5 rounded-3xl sticky top-0 z-[100] backdrop-blur-md">
                <div className="flex flex-col text-left"><h3 className="text-white font-black text-sm uppercase italic">Mainframe</h3><span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Entries: {games.length}</span></div>
                <div className="flex gap-3"><button onClick={loadGames} className="px-5 py-3 bg-white/5 text-gray-400 rounded-2xl border border-white/5 font-black text-[9px]">SYNC</button>
                <button onClick={() => isAdding ? resetForm() : setIsAdding(true)} className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest ${isAdding ? 'bg-red-500/20 text-red-400' : 'bg-blue-600 text-white'}`}>{isAdding ? 'Cancel' : 'New Entry'}</button></div>
              </div>

              {isAdding && (
                <form onSubmit={handleSubmit} className="bg-[#161b2c]/40 rounded-[2rem] p-8 border border-white/5 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Title" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                    <div className="space-y-2 relative">
                      <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic">Region</label>
                      <div onClick={() => setIsVersionOpen(!isVersionOpen)} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl flex justify-between items-center cursor-pointer text-xs text-white font-bold uppercase tracking-widest">
                        <span>{formData.version} Version</span>
                        <span>V</span>
                      </div>
                      {isVersionOpen && (
                        <div className="absolute z-[110] w-full mt-2 bg-[#1e2235] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                          {['Global', 'JP'].map(v => (
                            <div key={v} onClick={() => { setFormData({...formData, version: v}); setIsVersionOpen(false); }} className="px-5 py-4 hover:bg-blue-600 text-[10px] text-white cursor-pointer uppercase font-black">{v} Version</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 relative">
                      <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic">Status</label>
                      <div onClick={() => setIsStatusOpen(!isStatusOpen)} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl flex justify-between items-center cursor-pointer text-xs text-white font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3"><div className={`w-1.5 h-1.5 rounded-full ${statusOptions.find(opt => opt.value === formData.status)?.color}`}></div><span>{statusOptions.find(opt => opt.value === formData.status)?.label}</span></div>
                        <span>V</span>
                      </div>
                      {isStatusOpen && (
                        <div className="absolute z-[110] w-full mt-2 bg-[#1e2235] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                          {statusOptions.map(opt => (
                            <div key={opt.value} onClick={() => { setFormData({...formData, status: opt.value}); setIsStatusOpen(false); }} className="px-5 py-4 hover:bg-blue-600 text-[10px] text-white cursor-pointer uppercase font-black flex items-center gap-3">
                              <div className={`w-1.5 h-1.5 rounded-full ${opt.color}`}></div><span>{opt.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <InputField label="Publisher" value={formData.publisher} onChange={(v) => setFormData({...formData, publisher: v})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Genre" value={formData.genre} onChange={(v) => setFormData({...formData, genre: v})} />
                    <InputField label="Banner URL" value={formData.imageUrl} onChange={(v) => setFormData({...formData, imageUrl: v})} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none text-[11px] text-gray-400 h-24 uppercase font-bold" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic">Changelogs</label>
                    <textarea value={formData.changelogRaw} onChange={(e) => setFormData({...formData, changelogRaw: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none text-[10px] text-blue-400 h-32 font-mono uppercase" placeholder="V1.0 | 2026-04-08 | SECURITY PATCHED" />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-blue-500 uppercase ml-2 tracking-widest italic leading-none">Capabilities</label>
                    <div className="flex flex-wrap gap-2">
                      {modTypeOptions.map(type => (
                        <button key={type} type="button" onClick={() => toggleModType(type)} className={`px-4 py-2 rounded-xl text-[8px] font-black border uppercase transition-all ${formData.selectedModTypes.includes(type) ? 'bg-blue-600 border-blue-400 text-white' : 'bg-black/40 border-white/5 text-gray-500'}`}>{type}</button>
                      ))}
                    </div>
                  </div>

                  <InputField label="Direct Link" value={formData.playstoreLink} onChange={(v) => setFormData({...formData, playstoreLink: v})} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2"><label className="text-[9px] font-black text-blue-500 uppercase ml-2 italic tracking-widest">Base Features</label><textarea value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none text-[10px] text-gray-400 h-24 font-mono uppercase" /></div>
                    <div className="space-y-2"><label className="text-[9px] font-black text-blue-500 uppercase ml-2 italic tracking-widest">Modified Logic</label><textarea value={formData.modFeatures} onChange={(e) => setFormData({...formData, modFeatures: e.target.value})} className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl outline-none text-[10px] text-purple-300 h-24 font-mono uppercase" /></div>
                  </div>

                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-3xl transition-all shadow-xl uppercase tracking-[0.4em] text-[10px]">Transmit</button>
                </form>
              )}

              <div className="grid grid-cols-1 gap-4 pb-20">
                {games.map((game) => (
                  <div key={game.id} className="bg-[#161b2c]/30 border border-white/5 rounded-[2rem] p-5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-5 w-full"><img src={game.imageUrl} className="w-16 h-16 rounded-2xl object-cover border border-white/10" alt="" />
                    <div className="flex flex-col text-left"><h4 className="font-black text-white uppercase italic text-sm">{game.name}</h4><span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-2">{game.publisher} / {game.version}</span></div></div>
                    <div className="flex gap-3 w-full md:w-auto">
                      <button onClick={() => handleEdit(game)} className="flex-1 md:flex-none px-6 py-3 bg-white/5 text-gray-500 rounded-xl font-black text-[9px] uppercase hover:text-white">EDIT</button>
                      <button onClick={() => setDeleteConfirm({ show: true, id: game.id, name: game.name })} className="flex-1 md:flex-none px-6 py-3 bg-red-500/10 text-red-500 rounded-xl font-black text-[9px] uppercase hover:bg-red-500 transition-all">WIPE</button>
                    </div>
                  </div>
                ))}
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
    <input type="text" value={value} className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500 text-xs transition-all uppercase font-bold tracking-widest" onChange={(e) => onChange(e.target.value)} required />
  </div>
)
