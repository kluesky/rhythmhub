// src/pages/AdminDaily.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Dropdown from '../components/Dropdown'

export default function AdminDaily() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [passkey, setPasskey] = useState('')
  const [toast, setToast] = useState({ show: false, msg: '', type: 'blue' })
  const [showConfirm, setShowConfirm] = useState(false) // State Pop-up Hapus
  const [formData, setFormData] = useState({ name: '', origin: '', imageUrl: '', rarity: 'SSR', description: '' })

  const ADMIN_PASSWORD = 'lyora6396' 
  const PASTE_ID = '68O7d7kH' 
  const API_KEY = 'aJLzptOLgwIhDwVRkOTSEXsqnYWKg42aoh3FhxrZ1CgvFooGtKUNkwKVPvzD'

  const showToast = (msg, type = 'blue') => {
    setToast({ show: true, msg, type })
    setTimeout(() => setToast({ show: false, msg: '', type: 'blue' }), 3000)
  }

  useEffect(() => {
    if (sessionStorage.getItem('admin_authenticated') === 'true') setIsAdmin(true)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (passkey === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true')
      setIsAdmin(true)
      showToast('ACCESS GRANTED', 'blue')
    } else {
      showToast('INVALID PASSKEY', 'red')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    showToast('TRANSMITTING...', 'blue')
    try {
      const response = await fetch(`https://pastefy.app/api/v2/paste/${PASTE_ID}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: JSON.stringify(formData, null, 2) })
      })
      if (response.ok) showToast('DATABASE SYNC SUCCESS', 'blue')
      else throw new Error()
    } catch (err) {
      showToast('SYNC FAILED', 'red')
    }
  }

  const handleClear = async () => {
    setShowConfirm(false) // Tutup modal dulu
    showToast('WIPING DATA...', 'red')
    try {
      const response = await fetch(`https://pastefy.app/api/v2/paste/${PASTE_ID}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: "" })
      })
      if (response.ok) {
        showToast('DATABASE CLEARED', 'blue')
        setFormData({ name: '', origin: '', imageUrl: '', rarity: 'SSR', description: '' })
      }
    } catch (err) {
      showToast('WIPE FAILED', 'red')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative min-h-[80vh]">
      
      {/* 1. ANIMASI TOAST (GANTI ALERT) */}
      <AnimatePresence>
        {toast.show && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>

      {/* 2. ANIMASI POP-UP KONFIRMASI (GANTI CONFIRM) */}
      <AnimatePresence>
        {showConfirm && (
          <ConfirmModal 
            onConfirm={handleClear} 
            onCancel={() => setShowConfirm(false)} 
          />
        )}
      </AnimatePresence>

      {!isAdmin ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0b0d14] border border-white/5 p-8 rounded-[2.5rem] shadow-2xl text-center max-w-sm mx-auto">
          <h2 className="text-xl font-black text-white uppercase mb-8 italic tracking-tighter">Terminal Auth</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="ENTER PASSKEY" className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-center font-mono outline-none focus:border-red-500" onChange={(e) => setPasskey(e.target.value)} />
            <button className="w-full bg-red-600 text-white font-black py-4 rounded-2xl uppercase text-[10px]">Unlock System</button>
          </form>
        </motion.div>
      ) : (
        <div className="bg-[#0b0d14] border border-blue-500/20 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-white italic uppercase">Daily <span className="text-blue-500">Admin</span></h2>
            <button onClick={() => { sessionStorage.clear(); window.location.reload(); }} className="text-[8px] font-black text-gray-600 hover:text-red-500 uppercase transition-colors tracking-widest">Logout</button>
          </div>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Name" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
              <InputField label="Origin" value={formData.origin} onChange={(v) => setFormData({...formData, origin: v})} />
            </div>
            <InputField label="Image Source" value={formData.imageUrl} onChange={(v) => setFormData({...formData, imageUrl: v})} />
            <div className="space-y-2 relative z-[100]">
              <label className="text-[9px] font-black text-blue-500 uppercase ml-2 italic tracking-widest">Aura Rarity</label>
              <Dropdown options={[{value:'SSR',label:'SSR (Gold)',icon:'💎'},{value:'SR',label:'SR (Purple)',icon:'✨'},{value:'R',label:'R (Blue)',icon:'🔹'}]} value={formData.rarity} onChange={(val) => setFormData({...formData, rarity: val})} icon="📊" />
            </div>
            <textarea rows="3" placeholder="Description..." className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white text-xs font-mono outline-none focus:border-blue-500 resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required></textarea>
            
            <div className="grid grid-cols-4 gap-4">
              <button type="submit" className="col-span-3 bg-blue-600 text-white font-black py-5 rounded-[1.8rem] uppercase text-[10px] shadow-xl active:scale-95 transition-all">Deploy to Cloud</button>
              <button type="button" onClick={() => setShowConfirm(true)} className="bg-red-500/10 border border-red-500/20 text-red-500 font-black py-5 rounded-[1.8rem] uppercase text-[10px] active:scale-95 transition-all">Reset</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

// --- KOMPONEN ANIMASI POP-UP (CONFIRM MODAL) ---
const ConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[2000] flex items-center justify-center px-4">
    {/* Overlay blur */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onCancel} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
    
    {/* Box Modal */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }} 
      animate={{ opacity: 1, scale: 1, y: 0 }} 
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="relative bg-[#0b0d14] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center"
    >
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 border border-red-500/20">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </div>
      <h3 className="text-white font-black uppercase text-lg tracking-tighter mb-2 italic">Confirm Wipe?</h3>
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest leading-relaxed mb-8">Karakter harian akan dihapus dan kartu di beranda menjadi kosong.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <button onClick={onCancel} className="bg-white/5 text-gray-400 font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest hover:bg-white/10 transition-all">Cancel</button>
        <button onClick={onConfirm} className="bg-red-600 text-white font-black py-4 rounded-2xl text-[9px] uppercase tracking-widest shadow-lg shadow-red-900/20 active:scale-95 transition-all">Yes, Wipe</button>
      </div>
    </motion.div>
  </div>
)

// --- KOMPONEN ANIMASI TOAST ---
const Toast = ({ msg, type }) => (
  <motion.div 
    initial={{ opacity: 0, y: -50, x: '-50%' }} 
    animate={{ opacity: 1, y: 0, x: '-50%' }} 
    exit={{ opacity: 0, y: -20, x: '-50%' }} 
    className="fixed top-12 left-1/2 z-[3000] min-w-[280px]"
  >
    <div className={`px-6 py-4 rounded-2xl border backdrop-blur-xl flex items-center justify-center gap-3 shadow-2xl ${type === 'red' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-blue-600/20 border-blue-500/50 text-blue-300'}`}>
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${type === 'red' ? 'bg-red-500' : 'bg-blue-400'}`}></div>
      <span className="text-[9px] font-black uppercase tracking-[0.2em]">{msg}</span>
    </div>
  </motion.div>
)

const InputField = ({ label, value, onChange }) => (
  <div className="space-y-2 text-left">
    <label className="text-[9px] font-black text-blue-500 uppercase ml-2 italic tracking-widest leading-none">{label}</label>
    <input type="text" value={value} className="w-full bg-black/40 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500 text-xs font-mono" onChange={(e) => onChange(e.target.value)} required />
  </div>
)