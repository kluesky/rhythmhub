// src/components/MusicPlayer.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const PLAYLIST_ID = 'PLG2PhA0b49j4Wa6v3_U3UjGWauSz_UAYE'

  return (
    <div className="fixed bottom-8 right-8 z-[200] font-sansantialiased">
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
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-5 bg-white rounded-3xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.15)] w-[300px] border border-gray-100 overflow-hidden"
          >
            {/* Header: Song Info & Close */}
            <div className="p-6 pb-0 flex items-start justify-between">
              <div className="flex flex-col gap-1 max-w-[80%]">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Now Playing</span>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight truncate">
                  {isPlaying ? "Lo-fi Study Beats" : "Player Paused"}
                </h3>
                <p className="text-xs text-gray-500 truncate">YouTube Community Playlist</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Simple Visualizer Line */}
            <div className="px-6 py-8 flex items-center justify-center h-16">
              {isPlaying ? (
                <div className="flex items-center gap-1 w-full justify-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <motion.span
                      key={i}
                      animate={{ height: [4, 16, 4, 12, 4] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.7, 
                        delay: i * 0.08,
                        ease: "linear"
                      }}
                      className="w-1 bg-gray-900 rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="w-full h-[2px] bg-gray-100 rounded-full relative">
                  <div className="absolute inset-0 w-1/3 bg-gray-200 rounded-full"></div>
                </div>
              )}
            </div>

            {/* Controls & Footer */}
            <div className="bg-gray-50/50 p-6 border-t border-gray-100 flex items-center justify-between">
              {/* Play/Pause Button */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-md ${
                  isPlaying 
                  ? 'bg-gray-100 text-gray-800 shadow-inner' 
                  : 'bg-gray-900 text-white shadow-gray-900/20 shadow-lg'
                }`}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Status & Version */}
              <div className="flex flex-col items-end gap-1">
                 <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`}></span>
                    <span className="text-xs font-medium text-gray-600">
                      {isPlaying ? 'Streaming' : 'Idle'}
                    </span>
                 </div>
                 <span className="text-[10px] text-gray-400 font-mono">v1.2</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (Pill Shape) */}
      <motion.button
        whileHover={{ y: -3, shadow: '0 20px 30px -5px rgba(0,0,0,0.2)' }}
        whileTap={{ scale: 0.97, y: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-6 h-14 rounded-full shadow-lg transition-all duration-300 border ${
          isOpen 
          ? 'bg-gray-50 border-gray-100 text-gray-600 shadow-sm' 
          : 'bg-white border-white text-gray-900 shadow-gray-200/50'
        }`}
      >
        {isOpen ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="text-sm font-semibold tracking-tight">Close</span>
          </>
        ) : (
          <>
             {/* Music Icon atau Waveform sederhana saat Playing */}
             {isPlaying ? (
                <div className="flex gap-[2px] items-center h-4">
                  <span className="w-0.5 h-3 bg-gray-900 rounded-full animate-bounce [animation-duration:0.6s]"></span>
                  <span className="w-0.5 h-4 bg-gray-900 rounded-full animate-bounce [animation-delay:0.1s] [animation-duration:0.6s]"></span>
                  <span className="w-0.5 h-2.5 bg-gray-900 rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:0.6s]"></span>
                </div>
             ) : (
                <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
                </svg>
             )}
             <span className="text-sm font-semibold tracking-tight">
                {isPlaying ? 'Now Playing' : 'Player'}
             </span>
          </>
        )}
      </motion.button>
    </div>
  )
}
