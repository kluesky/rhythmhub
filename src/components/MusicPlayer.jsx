// src/components/MusicPlayer.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const PLAYLIST_ID = 'PLG2PhA0b49j4Wa6v3_U3UjGWauSz_UAYE'

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      {/* Hidden YouTube Engine */}
      <div className="hidden">
        <iframe
          id="yt-player"
          width="0"
          height="0"
          src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}&autoplay=${isPlaying ? 1 : 0}&enablejsapi=1`}
          title="YouTube Background Player"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            className="mb-4 bg-[#161b2c]/95 backdrop-blur-3xl border border-blue-500/30 p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] w-80 overflow-hidden"
          >
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[7px] font-black text-blue-500 uppercase tracking-[0.4em]">Signal Detected</span>
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mt-1">Rhythm Terminal</h4>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="group flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 transition-all"
                >
                  <svg className="w-3 h-3 text-gray-500 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Minimalist Visualizer */}
              <div className="rounded-2xl h-24 bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
                {isPlaying ? (
                  <div className="flex items-end gap-1.5 h-10">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [8, 35, 12, 28, 8] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                        className="w-1.5 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 opacity-20">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em]">Ready</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-5">
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-black text-white uppercase tracking-tighter">Community Playlist</p>
                  <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest italic">Source: YouTube-Net</p>
                </div>

                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`group relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 active:scale-90 border-2 ${
                    isPlaying 
                    ? 'bg-red-500/10 border-red-500/40 text-red-500' 
                    : 'bg-blue-600 border-blue-400 text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)]'
                  }`}
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Info Footer */}
              <div className="bg-black/20 rounded-xl px-4 py-2 border border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className={`w-1 h-1 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse shadow-[0_0_5px_#22c55e]' : 'bg-gray-700'}`}></div>
                    <span className="text-[7px] font-black text-gray-500 uppercase tracking-widest leading-none">
                      {isPlaying ? 'Live Streaming' : 'Standby'}
                    </span>
                 </div>
                 <span className="text-[7px] font-black text-blue-500/40 uppercase italic">v2.4-STABLE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (No Emoji) */}
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 border-2 relative ${
          isOpen 
          ? 'bg-[#161b2c] border-blue-500 text-blue-500' 
          : 'bg-blue-600 border-blue-400 text-white shadow-[0_15px_35px_rgba(37,99,235,0.3)]'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
             {/* Music Icon SVG */}
             <svg className={`w-7 h-7 transition-transform duration-500 ${isPlaying ? 'rotate-12' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
             </svg>
             {/* Live Indicator */}
             {isPlaying && (
               <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-[#0f111a] rounded-full shadow-[0_0_10px_#4ade80]"></span>
             )}
          </div>
        )}
      </motion.button>
    </div>
  )
}
