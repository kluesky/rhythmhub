// src/components/RequestList.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllRequestsFromPastefy, addRequestToPastefy, updateRequestUpvote } from '../api/pastefy'
import { useToast } from '../context/ToastContext'

export default function RequestList() {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVersionOpen, setIsVersionOpen] = useState(false)
  const [newRequest, setNewRequest] = useState({
    gameName: '',
    version: 'Both',
    modFeatures: '',
    requester: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  const versionOptions = [
    { value: 'Global', label: 'Global Version', icon: '🌍' },
    { value: 'JP', label: 'JP Version', icon: '🇯🇵' },
    { value: 'Both', label: 'Both Versions', icon: '🌐' }
  ]

  const loadRequests = async () => {
    const result = await getAllRequestsFromPastefy()
    if (result.success) setRequests(result.requests)
    setIsLoading(false)
  }

  useEffect(() => {
    loadRequests()
    const interval = setInterval(loadRequests, 15000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newRequest.gameName.trim()) {
      addToast('⚠️ Nama game wajib diisi!', 'warning')
      return
    }
    setIsSubmitting(true)
    const result = await addRequestToPastefy(newRequest)
    if (result.success) {
      addToast('✅ Request berhasil dikirim!', 'success')
      setNewRequest({ gameName: '', version: 'Both', modFeatures: '', requester: '', email: '', message: '' })
      await loadRequests()
    } else {
      addToast('❌ Gagal mengirim request', 'error')
    }
    setIsSubmitting(false)
  }

  const handleUpvote = async (id, currentUpvotes) => {
    const result = await updateRequestUpvote(id, currentUpvotes)
    if (result.success) {
      addToast('👍 Dukungan berhasil dikirim!', 'success')
      await loadRequests()
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Baru saja'
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000 / 60)
    if (diff < 1) return 'Baru saja'
    if (diff < 60) return `${diff}m lalu`
    if (diff < 1440) return `${Math.floor(diff / 60)}j lalu`
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
  }

  return (
    <div className="space-y-8 pb-10">
      {/* --- FORM REQUEST (GELAP & MODERN) --- */}
      <div className="bg-[#161b2c] rounded-2xl shadow-2xl border border-gray-800 p-6 overflow-visible">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white flex items-center gap-2 tracking-tight">
            <span className="p-2 bg-blue-500/10 rounded-lg text-lg">📝</span> 
            REQUEST MOD GAME
          </h3>
          <span className="text-[10px] font-black bg-[#14321a] text-[#4ade80] px-2 py-1 rounded border border-[#1e5128] uppercase tracking-widest">
            Live Server
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Nama Game *</label>
              <input type="text" placeholder="Contoh: Project Sekai" value={newRequest.gameName} onChange={(e) => setNewRequest({...newRequest, gameName: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Nama Kamu</label>
              <input type="text" placeholder="Anonymous" value={newRequest.requester} onChange={(e) => setNewRequest({...newRequest, requester: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CUSTOM DROPDOWN VERSION */}
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Region Version</label>
              <div onClick={() => setIsVersionOpen(!isVersionOpen)} className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 text-white rounded-xl flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all text-sm">
                <span>{versionOptions.find(o => o.value === newRequest.version).icon} {versionOptions.find(o => o.value === newRequest.version).label}</span>
                <span className={`text-[10px] transition-transform ${isVersionOpen ? 'rotate-180' : ''}`}>▼</span>
              </div>
              <AnimatePresence>
                {isVersionOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 w-full mt-2 bg-[#1e2235] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                    {versionOptions.map(opt => (
                      <div key={opt.value} onClick={() => { setNewRequest({...newRequest, version: opt.value}); setIsVersionOpen(false); }}
                        className={`px-4 py-3 text-xs hover:bg-blue-600/20 cursor-pointer flex items-center justify-between transition-colors ${newRequest.version === opt.value ? 'text-blue-400 bg-blue-600/5' : 'text-gray-300'}`}>
                        <span>{opt.icon} {opt.label}</span>
                        {newRequest.version === opt.value && <span>✔</span>}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Email (Optional)</label>
              <input type="email" placeholder="Untuk notifikasi update" value={newRequest.email} onChange={(e) => setNewRequest({...newRequest, email: e.target.value})}
                className="w-full px-4 py-2.5 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1">Fitur Mod Yang Diinginkan</label>
            <textarea placeholder="Contoh: Auto Dance, Full Combo, Unlock Song" value={newRequest.modFeatures} onChange={(e) => setNewRequest({...newRequest, modFeatures: e.target.value})} rows={2}
              className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm resize-none" />
          </div>
          
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-[0.2em] text-xs disabled:opacity-50">
            {isSubmitting ? '⏳ SINKRONISASI...' : '📤 KIRIM REQUEST KE DATABASE'}
          </button>
        </form>
      </div>

      {/* --- LIVE REQUEST LIST --- */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white flex items-center gap-2 uppercase tracking-widest text-xs">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            LIVE FEED REQUESTS
          </h3>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-800/50 px-2 py-1 rounded-md">{requests.length} TOTAL</span>
        </div>

        {isLoading && requests.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 text-[10px] font-bold mt-4 tracking-[0.3em] uppercase">MENGHUBUNGKAN KE SERVER...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode='popLayout'>
              {requests.map((req) => (
                <motion.div key={req.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                  className={`relative group rounded-2xl border p-5 transition-all duration-300 ${
                    req.status === 'done' ? 'bg-[#14321a]/10 border-[#1e5128]/50 shadow-inner' : 'bg-[#161b2c] border-gray-800 shadow-lg'
                  }`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className={`font-bold text-lg leading-none ${req.status === 'done' ? 'text-gray-500 line-through' : 'text-white'}`}>{req.gameName}</h4>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter ${
                          req.version === 'JP' ? 'bg-red-900/20 text-red-400 border-red-800/50' :
                          req.version === 'Global' ? 'bg-blue-900/20 text-blue-400 border-blue-800/50' :
                          'bg-purple-900/20 text-purple-400 border-purple-800/50'
                        }`}>
                          {req.version === 'JP' ? '🇯🇵 JP' : req.version === 'Global' ? '🌍 Global' : '🌐 Both'}
                        </span>
                        {req.status === 'done' && (
                          <span className="text-[9px] font-black bg-[#14321a] text-[#4ade80] px-2 py-0.5 rounded border border-[#1e5128] uppercase">Mod Tersedia</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                        <span className="flex items-center gap-1"><span className="text-blue-500">👤</span> {req.requester || 'Anonymous'}</span>
                        <span className="flex items-center gap-1 opacity-60"><span className="text-blue-500">🕒</span> {formatTime(req.timestamp)}</span>
                      </div>

                      <div className="bg-black/30 rounded-xl p-3 border border-white/5 shadow-inner">
                        <p className="text-xs text-gray-300 leading-relaxed"><span className="text-blue-400 font-bold mr-1">⚡ MOD:</span> {req.modFeatures || 'Original Request'}</p>
                        {req.message && req.message !== '-' && (
                          <p className="text-[11px] text-gray-500 mt-2 italic border-t border-white/5 pt-2">"{req.message}"</p>
                        )}
                      </div>
                    </div>

                    <button onClick={() => handleUpvote(req.id, req.upvotes)}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#0f111a] border border-gray-800 hover:border-blue-500 transition-all min-w-[50px] shadow-lg active:scale-90">
                      <span className="text-xl group-hover:animate-bounce">👍</span>
                      <span className="text-xs font-black text-blue-400 mt-1">{req.upvotes || 0}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && requests.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl text-gray-600 font-bold text-[10px] tracking-[0.4em] uppercase">
            REQUEST DATABASE IS EMPTY
          </div>
        )}
      </div>
    </div>
  )
}
