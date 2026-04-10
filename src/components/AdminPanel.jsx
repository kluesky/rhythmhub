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

  // Label diperpendek agar muat dalam grid kecil
  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'text-gray-400' },
    { value: 'checking bypass', label: 'Bypass', color: 'text-yellow-400' },
    { value: 'on test', label: 'Testing', color: 'text-purple-400' },
    { value: 'complete', label: 'Done', color: 'text-blue-400' },
    { value: 'mod available', label: 'Ready', color: 'text-green-400' }
  ]

  const loadRequests = async () => {
    setIsLoading(true)
    const result = await getAllRequestsFromPastefy()
    if (result.success) setRequests(result.requests)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated && isOpen) loadRequests()
    // Lock scroll body
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => { document.body.style.overflow = 'unset' }
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

  const handleStatusUpdate = async (requestId, newStatus) => {
    const result = await updateRequestStatus(requestId, newStatus)
    if (result.success) {
      addToast(`🚀 ${newStatus.toUpperCase()}`, 'success')
      await loadRequests()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md px-3 py-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#0f111a] rounded-[2rem] border border-white/10 w-full max-w-2xl h-full max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* HEADER RAMPING */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-white/5 shrink-0 bg-[#161b2c]/50">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]"></div>
            <h2 className="text-white font-black uppercase italic tracking-tighter text-xs">Request <span className="text-blue-500">Manager</span></h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-xl transition-colors p-1">&times;</button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-transparent to-[#0a0c14]">
          {!isAuthenticated ? (
            <div className="max-w-[260px] mx-auto py-16 space-y-4">
              <div className="text-center space-y-1 mb-6">
                <p className="text-white font-black text-[10px] uppercase tracking-widest leading-none italic">Secure Mainframe</p>
                <p className="text-gray-600 text-[8px] font-bold uppercase tracking-widest leading-none">Authorization Required</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-3">
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-white text-center outline-none focus:border-blue-500 transition-all font-mono text-xs" 
                  placeholder="PASSKEY" 
                  autoFocus 
                />
                <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl uppercase tracking-[0.3em] text-[9px] active:scale-95 transition-all">Verify</button>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              {/* TOOLBAR */}
              <div className="flex justify-between items-center border-b border-white/5 pb-3 sticky top-0 bg-[#0f111a] z-10">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">Terminal Output</span>
                  <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-1.5 leading-none">{requests.length} Requests Processed</span>
                </div>
                <button onClick={loadRequests} className="text-[9px] font-black text-blue-500 hover:text-white transition-colors">
                  {isLoading ? 'SYNCING...' : 'REFRESH_DB'}
                </button>
              </div>

              {/* LIST REQUEST COMPACT */}
              {isLoading && requests.length === 0 ? (
                 <div className="py-20 text-center animate-pulse">
                    <span className="text-[9px] font-black uppercase text-gray-700 tracking-[0.5em] italic">Accessing Mainframe...</span>
                 </div>
              ) : (
                <div className="space-y-3 pb-8">
                  {requests.map((req) => (
                    <motion.div key={req.id} layout className="bg-white/5 border border-white/5 rounded-2xl p-4 hover:border-white/10 transition-all">
                      <div className="flex flex-col gap-4">
                        {/* Info Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="text-left space-y-1">
                            <h4 className="font-black text-sm text-white uppercase italic tracking-tighter leading-none truncate max-w-[250px]">{req.gameName}</h4>
                            <div className="flex items-center gap-2">
                               <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest leading-none">By {req.requester}</span>
                               <span className="text-[8px] font-black px-1.5 py-0.5 rounded-md bg-blue-900/20 text-blue-400 border border-blue-900/40 uppercase tracking-tighter leading-none">{req.version}</span>
                            </div>
                          </div>
                          
                          {/* Grid Status Selector */}
                          <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1 w-full md:w-auto md:justify-end">
                            {statusOptions.map((opt) => (
                              <button
                                key={opt.value}
                                onClick={() => handleStatusUpdate(req.id, opt.value)}
                                className={`px-2 py-1.5 rounded-lg text-[7px] font-black uppercase tracking-tighter border transition-all ${
                                  req.status?.toLowerCase() === opt.value 
                                  ? `bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-900/20` 
                                  : `bg-black/60 border-white/5 text-gray-600 hover:text-white`
                                }`}
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Mod Description Box */}
                        <div className="bg-black/60 rounded-xl p-3 border border-white/5 text-left group-hover:border-blue-500/20 transition-all">
                          <p className="text-[10px] text-gray-400 leading-normal">
                            <span className="text-blue-500 font-bold italic mr-1">REQ_MOD:</span> {req.modFeatures}
                          </p>
                          {req.message && req.message !== '-' && (
                            <p className="text-[9px] text-gray-600 mt-2 italic border-t border-white/5 pt-2 leading-relaxed">
                               "{req.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {requests.length === 0 && (
                    <div className="text-center py-10 border border-dashed border-white/5 rounded-2xl">
                       <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">No Incoming Data</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
