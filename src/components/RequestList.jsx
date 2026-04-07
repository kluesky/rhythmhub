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

  // Mapping Status ke Style UI
  const statusConfig = {
    'pending': { label: 'Pending', color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/20' },
    'checking bypass': { label: 'Checking Bypass', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    'on test': { label: 'On Test', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    'complete': { label: 'Complete', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    'mod available': { label: 'Mod Available', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
    'done': { label: 'Mod Available', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' } // Fallback untuk data lama
  }

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
      {/* --- FORM REQUEST --- */}
      <div className="bg-[#161b2c] rounded-2xl shadow-2xl border border-gray-800 p-6 overflow-visible">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-white flex items-center gap-2 tracking-tight uppercase text-xs italic">
            <span className="p-2 bg-blue-500/10 rounded-lg text-lg">📝</span> 
            Request Mod Game
          </h3>
          <span className="text-[10px] font-black bg-[#14321a] text-[#4ade80] px-2 py-1 rounded border border-[#1e5128] uppercase tracking-widest">
            Live Server
          </span>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Nama Game *</label>
              <input type="text" placeholder="Project Sekai / MLBB..." value={newRequest.gameName} onChange={(e) => setNewRequest({...newRequest, gameName: e.target.value})}
                className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Username</label>
              <input type="text" placeholder="Hacker01" value={newRequest.requester} onChange={(e) => setNewRequest({...newRequest, requester: e.target.value})}
                className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="space-y-1.5 relative">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Region Version</label>
              <div onClick={() => setIsVersionOpen(!isVersionOpen)} className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 text-white rounded-xl flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all text-sm font-bold">
                <span>{versionOptions.find(o => o.value === newRequest.version).icon} {versionOptions.find(o => o.value === newRequest.version).label}</span>
                <span className={`text-[10px] transition-transform ${isVersionOpen ? 'rotate-180' : ''}`}>▼</span>
              </div>
              <AnimatePresence>
                {isVersionOpen && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute z-50 w-full mt-2 bg-[#1e2235] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                    {versionOptions.map(opt => (
                      <div key={opt.value} onClick={() => { setNewRequest({...newRequest, version: opt.value}); setIsVersionOpen(false); }}
                        className={`px-4 py-3 text-xs hover:bg-blue-600 cursor-pointer flex items-center justify-between transition-colors ${newRequest.version === opt.value ? 'text-blue-400 bg-blue-600/10' : 'text-gray-300'}`}>
                        <span className="font-black uppercase tracking-tighter">{opt.icon} {opt.label}</span>
                        {newRequest.version === opt.value && <span>✔</span>}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Email (Notifikasi)</label>
              <input type="email" placeholder="Optional..." value={newRequest.email} onChange={(e) => setNewRequest({...newRequest, email: e.target.value})}
                className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm" />
            </div>
          </div>
          
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-black text-gray-500 uppercase ml-1 tracking-widest">Fitur Mod Spesifik</label>
            <textarea placeholder="Contoh: Auto Perfect, Unlock Skins, Menu Mod..." value={newRequest.modFeatures} onChange={(e) => setNewRequest({...newRequest, modFeatures: e.target.value})} rows={2}
              className="w-full px-4 py-3 bg-[#0f111a] border border-gray-800 text-white rounded-xl focus:border-blue-500 outline-none transition-all text-sm resize-none" />
          </div>
          
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-[0.2em] text-[10px] disabled:opacity-50 active:scale-95">
            {isSubmitting ? '⏳ TRANSMITTING...' : '📤 UPLOAD TO MAINFRAME'}
          </button>
        </form>
      </div>

      {/* --- LIVE REQUEST LIST --- */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white flex items-center gap-2 uppercase tracking-[0.3em] text-[10px] italic">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]"></span>
            LIVE FEED REQUESTS
          </h3>
          <span className="text-[9px] font-black text-gray-500 bg-white/5 border border-white/5 px-2 py-1 rounded-md tracking-widest">{requests.length} TOTAL</span>
        </div>

        {isLoading && requests.length === 0 ? (
          <div className="text-center py-20 animate-pulse">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-[9px] font-black mt-4 tracking-[0.5em] uppercase italic">Syncing with server...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode='popLayout'>
              {requests.map((req) => {
                const status = statusConfig[req.status?.toLowerCase()] || statusConfig['pending'];
                return (
                  <motion.div key={req.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                    className="relative bg-[#161b2c]/40 border border-white/5 rounded-3xl p-6 transition-all duration-300 group hover:bg-[#161b2c] hover:border-blue-500/30 shadow-2xl">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-4 text-left">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h4 className="font-black text-lg text-white leading-none tracking-tighter italic uppercase">{req.gameName}</h4>
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-tighter ${
                            req.version === 'JP' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                            req.version === 'Global' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            'bg-purple-500/10 text-purple-400 border-purple-500/20'
                          }`}>
                            {req.version === 'JP' ? '🇯🇵 JP' : req.version === 'Global' ? '🌍 Global' : '🌐 Both'}
                          </span>
                          
                          {/* DYNAMIC TAG STATUS */}
                          <span className={`text-[8px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-widest italic ${status.bg} ${status.color} ${status.border}`}>
                            {status.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">
                          <span className="flex items-center gap-1.5"><span className="text-blue-500 opacity-50">BY</span> {req.requester || 'Anonymous'}</span>
                          <span className="flex items-center gap-1.5"><span className="text-blue-500 opacity-50">AT</span> {formatTime(req.timestamp)}</span>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-4 border border-white/5 shadow-inner group-hover:border-blue-500/10 transition-colors">
                          <p className="text-[11px] text-gray-400 leading-relaxed font-bold">
                            <span className="text-blue-500 italic mr-1">REQ_MOD:</span> {req.modFeatures || 'Standard Request'}
                          </p>
                          {req.message && req.message !== '-' && (
                            <p className="text-[10px] text-gray-600 mt-3 italic border-t border-white/5 pt-3 leading-relaxed">
                              "{req.message}"
                            </p>
                          )}
                        </div>
                      </div>

                      <button onClick={() => handleUpvote(req.id, req.upvotes)}
                        className="flex flex-col items-center justify-center p-4 rounded-[2rem] bg-black/40 border border-white/5 hover:border-blue-500 transition-all min-w-[65px] shadow-2xl active:scale-90 group/btn">
                        <span className="text-xl group-hover/btn:scale-110 transition-transform">👍</span>
                        <span className="text-[11px] font-black text-blue-400 mt-2">{req.upvotes || 0}</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {!isLoading && requests.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-[3rem] text-gray-700 font-black text-[9px] tracking-[0.6em] uppercase italic">
            NO DATA IN MAINFRAME
          </div>
        )}
      </div>
    </div>
  )
}
