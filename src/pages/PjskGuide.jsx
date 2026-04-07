// src/pages/PjskGuide.jsx - MULTILINGUAL VERSION
import { motion } from 'framer-motion'

export default function PjskGuide() {
  const safetyRules = [
    {
      id: "01",
      title: "Recommended Settings",
      desc: "Hanya gunakan fitur 'God Mode' dan 'Skip Story'. Ini adalah konfigurasi paling aman untuk menghindari deteksi server.",
      descEn: "Only use 'God Mode' and 'Skip Story' features. This is the safest configuration to avoid server detection.",
      tag: "SAFE_PROTOCOL"
    },
    {
      id: "02",
      title: "Note Accuracy Warning",
      desc: "Meskipun mod mengubah notes menjadi Perfect, user TETAP WAJIB menekan (tap) notes secara manual untuk sinkronisasi aktivitas.",
      descEn: "Even though the mod changes notes to Perfect, users ARE STILL REQUIRED to tap notes manually to synchronize activity.",
      tag: "USER_SYNC"
    },
    {
      id: "03",
      title: "Anti-AFK Protocol",
      desc: "Dilarang membiarkan mod bekerja otomatis tanpa input sentuhan sama sekali. Sistem akan menandai aktivitas tanpa input sebagai bot.",
      descEn: "Prohibited from letting the mod work automatically without any touch input. The system will flag no-input activity as a bot.",
      tag: "INPUT_DETECTION"
    },
    {
      id: "04",
      title: "Natural Gameplay",
      desc: "Mod dirancang sebagai helper. Klik notes secara wajar agar sistem mencatat data aktivitas manusiawi di log server.",
      descEn: "The mod is designed as a helper. Tap notes naturally so the system records human-like activity data in the server logs.",
      tag: "HUMAN_LOG"
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="max-w-4xl mx-auto space-y-16 pb-24 px-4"
    >
      {/* HEADER SECTION */}
      <div className="text-left space-y-2 border-l-2 border-blue-600 pl-6">
        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
          PJSK <span className="text-blue-500">Safety Guide</span>
        </h2>
        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.5em] leading-none">
          How to operate mods without triggering system ban
        </p>
      </div>

      {/* CRITICAL WARNING */}
      <div className="relative bg-red-950/20 border border-red-900/40 rounded-[2rem] p-8 overflow-hidden group shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          <div className="shrink-0">
             <span className="text-[10px] font-black bg-red-600 text-white px-3 py-1 rounded-md tracking-[0.2em] uppercase leading-none">
               Warning_Level: High
             </span>
          </div>
          <div className="space-y-2 text-left">
            <p className="text-gray-200 text-xs md:text-sm leading-relaxed uppercase font-black tracking-tight">
              "Mod akan membantu akurasi, namun User tetap wajib melakukan tap secara manual. Jangan biarkan sistem bekerja sendirian."
            </p>
            <p className="text-red-400 text-[10px] md:text-xs leading-relaxed uppercase font-bold italic opacity-80">
              "Mods will help with accuracy, but the User is still required to tap manually. Do not let the system work alone."
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px] rounded-full pointer-events-none"></div>
      </div>

      {/* RULES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safetyRules.map((rule, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#161b2c]/30 border border-white/5 p-8 rounded-3xl group hover:border-blue-500/20 transition-all flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                 <span className="text-[24px] font-black text-blue-600/20 group-hover:text-blue-600/40 transition-colors font-mono tracking-tighter">
                   {rule.id}
                 </span>
                 <span className="text-[7px] font-black text-gray-600 uppercase tracking-[0.3em] border border-white/5 px-2 py-1 rounded">
                   {rule.tag}
                 </span>
              </div>
              <h4 className="text-white font-black uppercase italic text-sm tracking-tight border-b border-white/5 pb-2">
                {rule.title}
              </h4>
              
              {/* Multilingual Description */}
              <div className="space-y-3 text-left">
                <p className="text-gray-400 text-[10px] font-bold leading-relaxed uppercase">
                  {rule.desc}
                </p>
                <p className="text-blue-500/50 text-[9px] font-bold leading-relaxed uppercase italic">
                  {rule.descEn}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FOOTER TERMINAL */}
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-left">
        <div className="space-y-1">
           <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest italic">
             Database: <span className="text-blue-400">RhythmHub_v2.0</span>
           </p>
           <p className="text-[8px] text-gray-700 font-bold uppercase tracking-widest leading-none">
             Status: Secure Encryption Active
           </p>
        </div>
        <div className="max-w-xs space-y-2">
           <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed text-center md:text-right">
             Selalu gunakan akun cadangan (tumbal) untuk pengujian awal. Pengembang mod tidak bertanggung jawab atas pemblokiran akun.
           </p>
           <p className="text-[7px] text-blue-500/40 font-bold uppercase tracking-widest leading-relaxed text-center md:text-right italic">
             Always use a backup account for initial testing. Mod developers are not responsible for account bans.
           </p>
        </div>
      </div>
    </motion.div>
  )
}
