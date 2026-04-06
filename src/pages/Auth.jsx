import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllUsersFromPastefy, registerNewUser } from '../api/pastefy'
import { useToast } from '../context/ToastContext'

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const { addToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (isLogin) {
      // LOGIKA LOGIN
      const result = await getAllUsersFromPastefy()
      if (result.success) {
        const user = result.users.find(u => u.username === form.username && u.password === form.password)
        if (user) {
          addToast(`👋 Selamat datang kembali, ${user.username}!`, 'success')
          localStorage.setItem('hub_session', JSON.stringify(user))
          onLoginSuccess(user)
        } else {
          addToast('❌ Username atau Password salah!', 'error')
        }
      }
    } else {
      // LOGIKA REGISTER
      const result = await registerNewUser({
        username: form.username,
        password: form.password
      })

      if (result.success) {
        addToast('✅ Akun berhasil dibuat! Silakan login.', 'success')
        setIsLogin(true) // Pindah ke halaman login setelah daftar
      } else {
        addToast(`❌ ${result.error || 'Gagal mendaftar'}`, 'error')
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Efek Cahaya Latar */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] z-10"
      >
        <div className="bg-[#161b2c] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase leading-none">
              RHYTHM<span className="text-blue-500">HUB</span>
            </h2>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mt-2">
              {isLogin ? 'Member Access' : 'Create Account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Username</label>
              <input 
                type="text" required
                placeholder="Ex: rhythm_master"
                className="w-full px-5 py-4 bg-[#0f111a] border border-gray-800 focus:border-blue-500 text-white rounded-2xl outline-none transition-all text-sm font-medium"
                onChange={e => setForm({...form, username: e.target.value.toLowerCase()})}
                value={form.username}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 tracking-widest">Password</label>
              <input 
                type="password" required
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-[#0f111a] border border-gray-800 focus:border-blue-500 text-white rounded-2xl outline-none transition-all text-sm font-medium"
                onChange={e => setForm({...form, password: e.target.value})}
                value={form.password}
              />
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-900/20 uppercase tracking-widest text-xs mt-4 disabled:opacity-50 active:scale-95"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Now')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-500 text-[11px] font-bold uppercase tracking-widest hover:text-blue-400 transition-colors"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        </div>
        
        <p className="text-center text-gray-600 text-[9px] mt-6 font-bold uppercase tracking-[0.2em]">
          &copy; 2024 RhythmHub Cloud Database
        </p>
      </motion.div>
    </div>
  )
}
