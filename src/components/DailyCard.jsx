// src/components/DailyCard.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DailyCard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  // KONFIGURASI (Gunakan ID Paste Khusus Daily Card)
  const DAILY_PASTE_ID = '68O7d7kH' 
  const API_KEY = 'aJLzptOLgwIhDwVRkOTSEXsqnYWKg42aoh3FhxrZ1CgvFooGtKUNkwKVPvzD'

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        const response = await fetch(`https://pastefy.app/api/v2/paste/${DAILY_PASTE_ID}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        })
        const resData = await response.json()
        if (response.ok && resData && resData.content) {
          setData(JSON.parse(resData.content))
        }
      } catch (err) {
        console.error("Fetch Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDaily()
  }, [])

  if (loading || !data) return (
    <div className="w-full h-80 bg-[#161b2c]/20 animate-pulse rounded-[2.5rem] border border-white/5 flex items-center justify-center">
      <span className="text-[10px] font-black text-gray-700 uppercase tracking-widest italic">Syncing Terminal...</span>
    </div>
  )

  const rarityColor = data.rarity === 'SSR' ? 'text-yellow-500 border-yellow-500/50' : 
                     data.rarity === 'SR' ? 'text-purple-500 border-purple-500/50' : 'text-blue-500 border-blue-500/50'

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative group w-full max-w-[280px] mx-auto">
      <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.8rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000`}></div>
      <div className="relative bg-[#0b0d14] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
        <div className="h-72 w-full overflow-hidden relative">
          <img src={data.imageUrl} alt={data.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2s]" />
          <div className={`absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-xl border ${rarityColor} rounded-full`}>
            <span className="text-[9px] font-black tracking-widest">{data.rarity}</span>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <div className="flex flex-col text-left">
            <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">{data.origin}</span>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">{data.name}</h3>
          </div>
          <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase italic text-left">"{data.description}"</p>
        </div>
      </div>
    </motion.div>
  )
}
