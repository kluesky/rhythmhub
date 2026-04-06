// src/components/AdminPanel.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllRequestsFromPastefy, updateRequestStatus } from '../api/pastefy'
import { useToast } from '../context/ToastContext'

export default function AdminPanel({ isOpen, onClose }) {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { addToast } = useToast()

  const ADMIN_PASSWORD = 'lyora6396'

  const loadRequests = async () => {
    setIsLoading(true)
    const result = await getAllRequestsFromPastefy()
    if (result.success) {
      setRequests(result.requests)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadRequests()
    }
  }, [isAuthenticated, isOpen])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      addToast('✅ Login berhasil! Selamat datang Admin', 'success')
      setPassword('')
    } else {
      addToast('❌ Password salah! Coba lagi', 'error')
    }
  }

  const handleStatusChange = async (requestId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending'
    const result = await updateRequestStatus(requestId, newStatus)
    if (result.success) {
      const statusText = newStatus === 'done' ? 'Complete' : 'Pending'
      addToast(`✅ Status berhasil diubah menjadi ${statusText}`, 'success')
      await loadRequests()
    } else {
      addToast('❌ Gagal mengubah status', 'error')
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Baru saja'
    const date = new Date(timestamp)
    return date.toLocaleString('id-ID', { 
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#0f111a] rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden border border-gray-800"
      >
        {/* Header */}
        <div className="bg-[#1e2235] px-6 py-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <span className="text-xl">🔧</span>
            </div>
            <h2 className="text-white font-bold tracking-tight">ADMIN PANEL - REQUESTS</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-75px)] custom-scrollbar">
          {!isAuthenticated ? (
            /* Login Form */
            <div className="max-w-sm mx-auto py-12 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-white font-bold text-lg">Restricted Access</p>
                <p className="text-gray-400 text-sm">Silakan masukkan password untuk mengelola request game.</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#161b2c] border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-gray-600"
                  placeholder="Enter Admin Password"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                >
                  Authorize Login
                </button>
              </form>
            </div>
          ) : (
            /* Content Area */
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-sm uppercase tracking-widest">Incoming Requests</h3>
                  <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-500/30">
                    {requests.length} ITEMS
                  </span>
                </div>
                <button
                  onClick={loadRequests}
                  className="text-[10px] font-bold bg-[#1e2235] hover:bg-[#2a2f4a] text-gray-300 px-3 py-1.5 rounded-lg border border-gray-700 transition flex items-center gap-2"
                >
                  <span className={isLoading ? 'animate-spin' : ''}>🔄</span> REFRESH DATA
                </button>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 text-sm font-medium">Fetching requests...</p>
                </div>
              ) : (
                <div className="space-y-4 pb-4">
                  <AnimatePresence mode='popLayout'>
                    {requests.length === 0 ? (
                      <div className="text-center py-12 border-2 border-dashed border-gray-800 rounded-2xl text-gray-600 text-sm italic">
                        Belum ada request game yang masuk.
                      </div>
                    ) : (
                      requests.map((req) => (
                        <motion.div
                          key={req.id}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className={`group border rounded-xl p-5 transition-all duration-300 ${
                            req.status === 'done' 
                            ? 'bg-gray-900/30 border-gray-800 opacity-60' 
                            : 'bg-[#161b2c] border-gray-700 shadow-lg'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className={`font-bold text-lg leading-none ${req.status === 'done' ? 'text-gray-500' : 'text-white'}`}>
                                  {req.gameName}
                                </h4>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider ${
                                  req.version === 'JP' ? 'bg-red-900/30 text-red-400 border border-red-800/50' :
                                  req.version === 'Global' ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' :
                                  'bg-purple-900/30 text-purple-400 border border-purple-800/50'
                                }`}>
                                  {req.version === 'JP' ? '🇯🇵 JP' : req.version === 'Global' ? '🌍 GLOBAL' : '🌐 BOTH'}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                                <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
                                  <span className="text-blue-500 opacity-50">👤</span> {req.requester || 'Anonymous'}
                                </p>
                                <p className="text-xs text-gray-500 flex items-center gap-1.5 italic font-mono">
                                  <span className="text-blue-500 opacity-50 text-[10px]">📅</span> {formatTime(req.timestamp)}
                                </p>
                              </div>

                              <div className="bg-black/30 rounded-lg p-3 space-y-2 border border-white/5">
                                <div className="flex flex-col">
                                  <span className="text-[9px] text-blue-400 font-bold uppercase tracking-tighter">Requested Features:</span>
                                  <p className="text-xs text-gray-300 leading-relaxed font-medium">{req.modFeatures || '-'}</p>
                                </div>
                                {req.message && req.message !== '-' && (
                                  <div className="flex flex-col pt-2 border-t border-white/5">
                                    <span className="text-[9px] text-purple-400 font-bold uppercase tracking-tighter">User Message:</span>
                                    <p className="text-xs text-gray-400 italic">"{req.message}"</p>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full md:w-auto min-w-[140px]">
                              <div className={`text-center py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                                req.status === 'done' 
                                  ? 'bg-[#14321a]/30 text-[#4ade80] border-[#1e5128]' 
                                  : 'bg-[#3b2d0a]/30 text-[#fbbf24] border-[#785413]'
                              }`}>
                                {req.status === 'done' ? '✓ Completed' : '⏳ Pending'}
                              </div>
                              <button
                                onClick={() => handleStatusChange(req.id, req.status)}
                                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg ${
                                  req.status === 'done'
                                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                    : 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20'
                                }`}
                              >
                                {req.status === 'done' ? 'Re-open Request' : 'Mark as Done'}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
