import { useState } from 'react'
import { motion } from 'framer-motion'
import { updateUserDataInPastefy } from '../api/pastefy'
import { useToast } from '../context/ToastContext'

export default function Profile({ user, onUpdateUser, onLogout }) {
  const [form, setForm] = useState({
    avatar: user.avatar || '',
    bio: user.bio || ''
  })
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await updateUserDataInPastefy(user.id, form)
    
    if (result.success) {
      const updatedUser = { ...user, ...form }
      // Update session di local storage
      localStorage.setItem('hub_session', JSON.stringify(updatedUser))
      // Update state di App.jsx
      onUpdateUser(updatedUser)
      addToast('✅ Profil berhasil diperbarui ke Cloud!', 'success')
    } else {
      addToast('❌ Gagal memperbarui profil', 'error')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f111a] py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-[#161b2c] rounded-[2.5rem] border border-gray-800 p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Dekorasi Latar */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[80px] -z-10"></div>

          <div className="flex flex-col items-center mb-10">
            <div className="relative group mb-4">
              <img 
                src={form.avatar || `https://ui-avatars.com/api/?name=${user.username}&background=2563eb&color=fff`} 
                className="w-28 h-28 rounded-[2rem] border-4 border-[#0f111a] object-cover shadow-2xl transition-transform group-hover:scale-105 duration-500"
                alt="Profile"
              />
              <div className="absolute inset-0 rounded-[2rem] bg-blue-600/20 blur-xl -z-10 opacity-50"></div>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{user.username}</h2>
            <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">{user.role || 'Verified Member'}</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2 text-white">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Avatar Image URL</label>
              <input 
                type="text" 
                value={form.avatar}
                placeholder="https://link-foto-kamu.jpg"
                onChange={e => setForm({...form, avatar: e.target.value})}
                className="w-full px-5 py-4 bg-[#0f111a] border border-gray-800 focus:border-blue-500 text-white rounded-2xl outline-none transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-2 text-white">
              <label className="text-[10px] font-bold text-gray-500 uppercase ml-2 tracking-widest">Personal Bio</label>
              <textarea 
                value={form.bio}
                placeholder="Tuliskan sesuatu tentang dirimu..."
                onChange={e => setForm({...form, bio: e.target.value})}
                className="w-full px-5 py-4 bg-[#0f111a] border border-gray-800 focus:border-blue-500 text-white rounded-2xl outline-none transition-all text-sm font-medium h-32 resize-none"
              />
            </div>

            <div className="flex flex-col gap-3 pt-4">
              <button 
                type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {loading ? 'SINKRONISASI DATA...' : 'Update Cloud Profile'}
              </button>

              <button 
                type="button"
                onClick={onLogout}
                className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-black py-4 rounded-2xl transition-all border border-red-500/20 uppercase tracking-widest text-xs"
              >
                Logout Account
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
