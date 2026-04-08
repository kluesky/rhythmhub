import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChangelogModal from './ChangelogModal'

export default function GameCard({ game, onDownload }) {
  const [showChangelog, setShowChangelog] = useState(false);
  const isPjsk = game.name?.toLowerCase().includes("project sekai");
  const isMaintenance = game.status === 'danger';
  const isHighRisk = game.status === 'warning';

  const modFeatures = Array.isArray(game.modFeatures) 
    ? game.modFeatures 
    : game.modFeatures?.split(',').map(f => f.trim()) || [];

  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-[#161b2c]/60 border border-white/5 rounded-[2.5rem] p-6 flex flex-col justify-between group transition-all duration-500 relative overflow-hidden shadow-2xl backdrop-blur-sm ${
          isMaintenance ? 'opacity-80' : 'hover:border-blue-500/30'
        }`}
      >
        <AnimatePresence>
          {isPjsk && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 px-3 py-1.5 rounded-full backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[8px] font-black text-blue-300 uppercase tracking-[0.2em] leading-none">Top Downloaded</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6">
          <div className="aspect-video rounded-[1.8rem] overflow-hidden border border-white/5 relative bg-[#0f111a]">
            <img src={game.imageUrl || 'https://via.placeholder.com/400x225'} alt={game.name} className={`w-full h-full object-cover transition-transform duration-700 ${isMaintenance ? 'grayscale opacity-50' : 'group-hover:scale-105'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <span className={`text-[8px] font-black px-3 py-1 rounded-lg border uppercase tracking-widest ${game.version === 'JP' ? 'bg-red-500 text-white border-red-400' : 'bg-blue-600 text-white border-blue-400'}`}>{game.version}</span>
              {isMaintenance && <span className="text-[8px] font-black px-3 py-1 rounded-lg bg-black text-red-500 border border-red-500/50 uppercase tracking-widest">Offline</span>}
            </div>
          </div>

          <div className="text-left space-y-5">
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-blue-400 transition-colors">{game.name}</h3>
                <button onClick={() => setShowChangelog(true)} className="shrink-0 text-[7px] font-black text-blue-500/50 border border-blue-500/20 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition-all uppercase tracking-[0.2em]">History</button>
              </div>
              <div className="flex gap-4 border-y border-white/5 py-3">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.3em]">Publisher</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase truncate">{game.publisher || 'Unknown'}</span>
                </div>
                <div className="w-[1px] bg-white/5 h-6 self-center"></div>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[7px] font-black text-blue-500/50 uppercase tracking-[0.3em]">Status</span>
                  <span className={`text-[10px] font-bold uppercase truncate ${isMaintenance ? 'text-red-500' : isHighRisk ? 'text-yellow-500' : 'text-green-500'}`}>{isMaintenance ? 'Maintenance' : isHighRisk ? 'High Risk' : 'Online Stable'}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-2xl p-4 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.2em] italic">Modified Core</span>
                <div className="h-[1px] flex-1 bg-blue-500/10 ml-3"></div>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {modFeatures.length > 0 ? modFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5"><div className={`w-1 h-1 rounded-full ${isMaintenance ? 'bg-gray-600' : 'bg-blue-600'}`}></div><span className="text-[10px] text-gray-300 font-bold uppercase tracking-tight">{feat}</span></div>
                )) : <span className="text-[10px] text-gray-600 font-bold uppercase italic">Standard Protocol</span>}
              </div>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed font-medium uppercase line-clamp-2 italic">{game.description}</p>
          </div>
        </div>

        <button disabled={isMaintenance} onClick={() => onDownload(game.playstoreLink)} className={`w-full mt-8 font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all group/btn shadow-xl ${isMaintenance ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-white/5' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20 active:scale-95'}`}>
          <span className="relative z-10">{isMaintenance ? 'Under Maintenance' : 'Download Mod APK'}</span>
        </button>
      </motion.div>

      <ChangelogModal isOpen={showChangelog} onClose={() => setShowChangelog(false)} gameName={game.name} logs={game.changelogData || []} />
    </>
  )
}
