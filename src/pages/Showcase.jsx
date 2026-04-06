// src/pages/Showcase.jsx - MOBILE OPTIMIZED FIX
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllShowcases, addShowcaseToPastefy } from '../api/showcase'

export default function Showcase() {
  const [videos, setVideos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ username: '', videoUrl: '', gameName: '' })

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    const res = await getAllShowcases()
    if (res.success) setVideos(res.videos)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await addShowcaseToPastefy(form)
    if (res.success) {
      setForm({ username: '', videoUrl: '', gameName: '' })
      setShowForm(false)
      loadData()
    } else {
      alert("System Sync Failed!")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
        <div className="text-left">
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
            Community <span className="text-blue-500">Showcase</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-3 italic text-left">
            Exhibit your rhythm mod gameplay skills
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black px-10 py-5 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          + Post Showcase
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {videos.map((vid) => (
          <motion.div key={vid.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#161b2c]/40 border border-white/5 rounded-[2.5rem] overflow-hidden group shadow-2xl">
            <div className="aspect-video bg-black flex items-center justify-center relative">
              <video src={vid.videoUrl} controls className="w-full h-full object-contain" poster="https://files.catbox.moe/ce6atq.jpg" />
            </div>
            <div className="p-6">
              <h3 className="text-white font-black text-sm uppercase italic leading-none tracking-tighter">{vid.gameName}</h3>
              <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest mt-2 leading-none">By {vid.username}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL FULL SCREEN UNTUK MOBILE */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#05060a] overflow-y-auto"
          >
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
              {/* Box Modal */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#0b0d14] border border-white/10 rounded-[2.5rem] w-full max-w-md shadow-2xl p-8 relative"
              >
                {/* Close Button Floating */}
                <button 
                  onClick={() => setShowForm(false)} 
                  className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-gray-400 hover:text-white"
                >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>

                <div className="text-left mb-8">
                  <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">New Entry</h3>
                  <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-2">Terminal System Entry</p>
                </div>

                <div className="space-y-6">
                  {/* Panduan Catbox */}
                  <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl space-y-3">
                    <p className="text-[10px] text-blue-300 font-bold uppercase italic leading-relaxed text-center">
                      Upload video ke Catbox.moe dahulu untuk mendapatkan Direct Link (.mp4)
                    </p>
                    <a href="https://catbox.moe" target="_blank" rel="noreferrer" className="block w-full bg-blue-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest text-center shadow-lg shadow-blue-900/40 active:scale-95 transition-all">
                      Open Catbox.moe ↗
                    </a>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 text-left pb-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-500 uppercase ml-2 italic tracking-widest leading-none">Uploader Username</label>
                      <input type="text" placeholder="Your name" className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-xs outline-none focus:border-blue-500 transition-all" onChange={(e) => setForm({...form, username: e.target.value})} required />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-500 uppercase ml-2 italic tracking-widest leading-none">Game Title</label>
                      <input type="text" placeholder="e.g. Project SEKAI" className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-xs outline-none focus:border-blue-500 transition-all" onChange={(e) => setForm({...form, gameName: e.target.value})} required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-blue-500 uppercase ml-2 italic tracking-widest leading-none">Catbox URL (.mp4)</label>
                      <input type="url" placeholder="https://files.catbox.moe/..." className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-white text-xs outline-none focus:border-blue-500 font-mono transition-all" onChange={(e) => setForm({...form, videoUrl: e.target.value})} required />
                    </div>

                    {/* Tombol Submit di Paling Bawah */}
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-3xl text-[11px] uppercase tracking-[0.3em] shadow-xl active:scale-95 transition-all mt-6 shadow-blue-900/20">
                      {loading ? 'TRANSMITTING...' : 'Deploy Showcase'}
                    </button>
                    
                    {/* Spacer tambahan agar tombol tidak tertutup navigasi browser */}
                    <div className="h-10 md:hidden"></div>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
