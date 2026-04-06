// src/components/AdminGamePanel.jsx (lengkap dengan status MOD)
import { useState, useEffect } from 'react'
import { getAllGamesFromPastefy, addGameToPastefy, updateGameOnPastefy, deleteGameFromPastefy } from '../api/pastefy'

export default function AdminGamePanel({ isOpen, onClose }) {
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingGame, setEditingGame] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    version: 'Global',
    imageUrl: '',
    playstoreLink: '',
    genre: '',
    publisher: '',
    description: '',
    features: '',
    modFeatures: '',
    status: 'success',
    statusText: '🟢 Online / Stable'
  })

  const ADMIN_PASSWORD = 'admin123'

  // Opsi status MOD
  const statusOptions = [
    { value: 'success', label: '🟢 Online / Stable', color: 'green', risk: 'Aman digunakan' },
    { value: 'warning', label: '⚠️ High Risk / Warning', color: 'yellow', risk: 'Berisiko kena banned' },
    { value: 'danger', label: '🔴 Maintenance / Detected', color: 'red', risk: 'Sedang diperbaiki / Terdeteksi' }
  ]

  const loadGames = async () => {
    setIsLoading(true)
    const result = await getAllGamesFromPastefy()
    if (result.success) {
      setGames(result.games)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadGames()
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.imageUrl || !formData.playstoreLink) {
      alert('Nama Game, Banner URL, dan Link Download wajib diisi!')
      return
    }
    
    // Pilih statusText berdasarkan status yang dipilih
    const selectedStatus = statusOptions.find(opt => opt.value === formData.status)
    const statusText = selectedStatus ? selectedStatus.label : formData.statusText
    
    const result = await addGameToPastefy({ ...formData, statusText })
    if (result.success) {
      alert('Game berhasil ditambahkan!')
      setFormData({
        name: '', version: 'Global', imageUrl: '', playstoreLink: '', genre: '', publisher: '',
        description: '', features: '', modFeatures: '', status: 'success', statusText: '🟢 Online / Stable'
      })
      setIsAdding(false)
      await loadGames()
    } else {
      alert('Gagal menambahkan game: ' + result.error)
    }
  }

  const handleEdit = (game) => {
    setEditingGame(game)
    setFormData({
      name: game.name,
      version: game.version,
      imageUrl: game.imageUrl,
      playstoreLink: game.playstoreLink,
      genre: game.genre,
      publisher: game.publisher,
      description: game.description,
      features: game.features ? game.features.join(', ') : '',
      modFeatures: game.modFeatures ? game.modFeatures.join(', ') : '',
      status: game.status || 'success',
      statusText: game.statusText || '🟢 Online / Stable'
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const selectedStatus = statusOptions.find(opt => opt.value === formData.status)
    const statusText = selectedStatus ? selectedStatus.label : formData.statusText
    
    const updatedData = {
      name: formData.name,
      version: formData.version,
      imageUrl: formData.imageUrl,
      playstoreLink: formData.playstoreLink,
      genre: formData.genre,
      publisher: formData.publisher,
      description: formData.description,
      features: formData.features.split(',').map(f => f.trim()),
      modFeatures: formData.modFeatures.split(',').map(f => f.trim()),
      status: formData.status,
      statusText: statusText,
      updatedAt: new Date().toISOString()
    }
    
    const result = await updateGameOnPastefy(editingGame.id, updatedData)
    if (result.success) {
      alert('Game berhasil diupdate!')
      setEditingGame(null)
      setFormData({
        name: '', version: 'Global', imageUrl: '', playstoreLink: '', genre: '', publisher: '',
        description: '', features: '', modFeatures: '', status: 'success', statusText: '🟢 Online / Stable'
      })
      await loadGames()
    } else {
      alert('Gagal mengupdate game: ' + result.error)
    }
  }

  const handleDelete = async (gameId) => {
    if (confirm('Yakin hapus game ini?')) {
      const result = await deleteGameFromPastefy(gameId)
      if (result.success) {
        alert('Game berhasil dihapus!')
        await loadGames()
      } else {
        alert('Gagal menghapus game')
      }
    }
  }

  const getStatusBadge = (status, statusText) => {
    if (status === 'success') return <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{statusText || '🟢 Online'}</span>
    if (status === 'warning') return <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">{statusText || '⚠️ High Risk'}</span>
    if (status === 'danger') return <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{statusText || '🔴 Maintenance'}</span>
    return <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{statusText}</span>
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        <div className="bg-primary px-6 py-4 flex justify-between items-center">
          <h2 className="text-white font-semibold">🎮 Admin Panel - Upload & Manage Game</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-70px)]">
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
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition">
                Login
              </button>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">📦 Daftar Game ({games.length})</h3>
                <button onClick={() => { setIsAdding(!isAdding); setEditingGame(null) }} className={`px-3 py-1.5 rounded-lg text-sm ${isAdding ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'} text-white`}>
                  {isAdding ? '✖ Batal' : '+ Tambah Game'}
                </button>
              </div>

              {/* Form Add Game */}
              {isAdding && !editingGame && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Tambah Game Baru</h4>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" placeholder="Nama Game *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" required />
                      <select value={formData.version} onChange={(e) => setFormData({...formData, version: e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
                        <option value="JP">JP</option>
                        <option value="Global">Global</option>
                      </select>
                      <input type="text" placeholder="Genre" value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
                      <input type="text" placeholder="Publisher" value={formData.publisher} onChange={(e) => setFormData({...formData, publisher: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" />
                    </div>
                    
                    {/* Status MOD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="text-xs text-gray-500 flex items-center">
                        {statusOptions.find(opt => opt.value === formData.status)?.risk}
                      </div>
                    </div>
                    
                    <input type="text" placeholder="URL Banner *" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" required />
                    <input type="text" placeholder="Link Download MOD APK *" value={formData.playstoreLink} onChange={(e) => setFormData({...formData, playstoreLink: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" required />
                    <textarea placeholder="Deskripsi Game" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none" />
                    <textarea placeholder="Fitur Game (pisah koma)" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none" />
                    <textarea placeholder="Fitur MOD (pisah koma)" value={formData.modFeatures} onChange={(e) => setFormData({...formData, modFeatures: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none" />
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm w-full">Simpan Game</button>
                  </form>
                </div>
              )}

              {/* Form Edit Game */}
              {editingGame && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Edit Game: {editingGame.name}</h4>
                  <form onSubmit={handleUpdate} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input type="text" placeholder="Nama Game" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-3 py-2 border rounded-lg text-sm" required />
                      <select value={formData.version} onChange={(e) => setFormData({...formData, version: e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
                        <option value="JP">JP</option>
                        <option value="Global">Global</option>
                      </select>
                    </div>
                    
                    {/* Status MOD untuk Edit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})} className="px-3 py-2 border rounded-lg text-sm">
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <div className="text-xs text-gray-500 flex items-center">
                        {statusOptions.find(opt => opt.value === formData.status)?.risk}
                      </div>
                    </div>
                    
                    <input type="text" placeholder="URL Banner" value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                    <input type="text" placeholder="Link Download" value={formData.playstoreLink} onChange={(e) => setFormData({...formData, playstoreLink: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" />
                    <textarea placeholder="Deskripsi" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none" />
                    <textarea placeholder="Fitur Game (pisah koma)" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none" />
                    <textarea placeholder="Fitur MOD (pisah koma)" value={formData.modFeatures} onChange={(e) => setFormData({...formData, modFeatures: e.target.value})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm resize-none" />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg text-sm">Update Game</button>
                      <button type="button" onClick={() => { setEditingGame(null); setFormData({...formData, name: ''}) }} className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">Batal</button>
                    </div>
                  </form>
                </div>
              )}

              {/* List Games dengan Status */}
              {isLoading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {games.map((game) => (
                    <div key={game.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-gray-900">{game.name}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600">{game.version}</span>
                            {getStatusBadge(game.status, game.statusText)}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-1">{game.description}</p>
                          <div className="flex gap-2 mt-2">
                            <img src={game.imageUrl} alt={game.name} className="w-12 h-12 object-cover rounded" />
                            <span className="text-xs text-gray-400 truncate">{game.playstoreLink?.substring(0, 50)}...</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(game)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs">Edit</button>
                          <button onClick={() => handleDelete(game.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">Hapus</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {games.length === 0 && <div className="text-center py-8 text-gray-400">Belum ada game. Klik "Tambah Game" untuk mulai.</div>}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}