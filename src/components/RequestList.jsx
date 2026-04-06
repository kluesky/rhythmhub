// src/components/RequestList.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllRequestsFromPastefy, addRequestToPastefy, updateRequestUpvote } from '../api/pastefy'

export default function RequestList() {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newRequest, setNewRequest] = useState({
    gameName: '',
    version: 'Both',
    modFeatures: '',
    requester: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const loadRequests = async () => {
    setIsLoading(true)
    const result = await getAllRequestsFromPastefy()
    if (result.success) {
      setRequests(result.requests)
    }
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
      setSubmitStatus('empty')
      setTimeout(() => setSubmitStatus(null), 2000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    const result = await addRequestToPastefy(newRequest)
    
    if (result.success) {
      setSubmitStatus('success')
      setNewRequest({ 
        gameName: '', 
        version: 'Both', 
        modFeatures: '', 
        requester: '', 
        email: '', 
        message: '' 
      })
      await loadRequests()
    } else {
      console.error('Error:', result.error)
      setSubmitStatus('error')
    }
    
    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus(null), 3000)
  }

  const handleUpvote = async (id, currentUpvotes) => {
    const result = await updateRequestUpvote(id, currentUpvotes)
    if (result.success) {
      await loadRequests()
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Baru saja'
    const date = new Date(timestamp)
    const now = new Date()
    const diff = Math.floor((now - date) / 1000 / 60)
    
    if (diff < 1) return 'Baru saja'
    if (diff < 60) return `${diff} menit lalu`
    if (diff < 1440) return `${Math.floor(diff / 60)} jam lalu`
    return `${Math.floor(diff / 1440)} hari lalu`
  }

  return (
    <div className="space-y-6">
      {/* Form Submit Request */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-xl">📝</span> Request Game Baru
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Live ke Pastefy</span>
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nama Game *"
              value={newRequest.gameName}
              onChange={(e) => setNewRequest({...newRequest, gameName: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm"
            />
            <input
              type="text"
              placeholder="Namamu (opsional)"
              value={newRequest.requester}
              onChange={(e) => setNewRequest({...newRequest, requester: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              value={newRequest.version}
              onChange={(e) => setNewRequest({...newRequest, version: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm"
            >
              <option value="JP">🇯🇵 JP Version</option>
              <option value="Global">🌍 Global Version</option>
              <option value="Both">🌐 Both</option>
            </select>
            <input
              type="email"
              placeholder="Email (opsional)"
              value={newRequest.email}
              onChange={(e) => setNewRequest({...newRequest, email: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm"
            />
          </div>
          
          <textarea
            placeholder="Fitur mod yang diinginkan"
            value={newRequest.modFeatures}
            onChange={(e) => setNewRequest({...newRequest, modFeatures: e.target.value})}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm resize-none"
          />
          
          <textarea
            placeholder="Pesan tambahan (opsional)"
            value={newRequest.message}
            onChange={(e) => setNewRequest({...newRequest, message: e.target.value})}
            rows={1}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-sm resize-none"
          />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition text-sm disabled:opacity-50 w-full md:w-auto"
          >
            {isSubmitting ? '⏳ Mengirim...' : '📤 Kirim Request'}
          </button>
          
          {submitStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
              <p className="text-green-700 text-sm">✅ Request terkirim ke Pastefy!</p>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
              <p className="text-red-700 text-sm">❌ Gagal mengirim. Coba lagi!</p>
            </div>
          )}
          {submitStatus === 'empty' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-center">
              <p className="text-yellow-700 text-sm">⚠️ Nama game harus diisi!</p>
            </div>
          )}
        </form>
      </div>

      {/* Live Request List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">🔥</span> Live Request 
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Real-time</span>
          </h3>
          <span className="text-xs text-gray-400">{requests.length} request</span>
        </div>

        {isLoading && requests.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm mt-2">Memuat request...</p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="space-y-3">
              {requests.map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`bg-white rounded-lg border p-4 hover:shadow-md transition ${
                    req.status === 'done' 
                      ? 'border-green-300 bg-green-50/30' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-semibold text-gray-900">{req.gameName}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          req.version === 'JP' ? 'bg-red-100 text-red-600' :
                          req.version === 'Global' ? 'bg-blue-100 text-blue-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {req.version === 'JP' ? '🇯🇵 JP' : req.version === 'Global' ? '🌍 Global' : '🌐 Both'}
                        </span>
                        <span className="text-xs text-gray-400">{formatTime(req.timestamp)}</span>
                        {req.status === 'done' && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                            ✅ MOD TERSEDIA
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        ⚡ {req.modFeatures || '-'}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span>👤 {req.requester || 'Anonymous'}</span>
                        <span className={req.status === 'done' ? 'text-green-600' : 'text-yellow-600'}>
                          {req.status === 'done' ? '✅ Selesai' : '⏳ Menunggu'}
                        </span>
                      </div>
                      {req.message && req.message !== '-' && (
                        <p className="text-xs text-gray-400 mt-2 italic">💬 {req.message}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleUpvote(req.id, req.upvotes)}
                      className="flex flex-col items-center px-3 py-1 rounded-lg hover:bg-gray-100 transition"
                    >
                      <span className="text-lg">👍</span>
                      <span className="text-xs font-semibold text-gray-600">{req.upvotes || 0}</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

        {!isLoading && requests.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            Belum ada request. Jadi yang pertama request game!
          </div>
        )}
      </div>
    </div>
  )
}