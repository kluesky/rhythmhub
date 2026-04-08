import { motion, AnimatePresence } from 'framer-motion'

export default function ChangelogModal({ isOpen, onClose, gameName, logs }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative bg-[#0f111a] border border-white/10 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex justify-between items-center text-left">
          <div><h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Manifest History</h4><h2 className="text-xl font-black text-white uppercase italic tracking-tighter">{gameName}</h2></div>
          <button onClick={onClose} className="text-[10px] font-black text-gray-600 hover:text-white uppercase">Close</button>
        </div>
        <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {logs.length > 0 ? (
            <div className="space-y-8 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-blue-500/20"></div>
              {logs.map((log, index) => (
                <div key={index} className="flex gap-6 relative text-left">
                  <div className="mt-1.5 w-3.5 h-3.5 rounded-full bg-[#0f111a] border-2 border-blue-600 z-10 shadow-[0_0_10px_rgba(37,99,235,0.3)]"></div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3"><span className="text-[9px] font-black text-white bg-blue-600/20 px-2 py-0.5 rounded border border-blue-500/30 font-mono">{log.version}</span><span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">{log.date}</span></div>
                    <p className="text-[11px] text-gray-400 font-medium uppercase leading-relaxed tracking-tight italic">{log.note}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-[10px] text-gray-700 uppercase font-black text-center py-10 tracking-[0.3em]">No Manifest Data Recorded</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}
