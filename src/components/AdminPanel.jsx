// src/components/AdminPanel.jsx
import { useState, useEffect } from 'react'
import { getAllRequestsFromPastefy, updateRequestStatus } from '../api/pastefy'

export default function AdminPanel({ isOpen, onClose }) {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Ganti dengan password Anda
  const ADMIN_PASSWORD = 'admin123'

  const loadRequests = async () => {
    setIsLoading(true)
    const result = await getAllRequestsFromPastefy()
    if (result.success) {
      setRequests(result.requests)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadRequests()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('Password salah!')
    }
  }

  const handleStatusChange = async (requestId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending'
    await updateRequestStatus(requestId, newStatus)
    await loadRequests()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden mx-4">
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-semibold">🔧 Admin Panel - Manage Requests</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-70px)]">
          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <p className="text-gray-600">Masukkan password admin:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                placeholder="Password"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Login
              </button>
            </form>
          ) : (
            <>
              {isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 mb-4">Total request: {requests.length}</p>
                  {requests.map((req) => (
                    <div key={req.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{req.gameName}</h3>
                          <p className="text-sm text-gray-500">By: {req.requester || 'Anonymous'}</p>
                          <p className="text-xs text-gray-400 mt-1">⚡ {req.modFeatures}</p>
                          <p className="text-xs text-gray-400 mt-1">📅 {new Date(req.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            req.status === 'done' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {req.status === 'done' ? '✅ Complete' : '⏳ Pending'}
                          </span>
                          <button
                            onClick={() => handleStatusChange(req.id, req.status)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                              req.status === 'done'
                                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                            }`}
                          >
                            {req.status === 'done' ? '↩️ Mark Pending' : '✓ Mark Complete'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}