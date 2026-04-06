// src/pages/About.jsx
import { motion } from 'framer-motion'

export default function About() {
  const features = [
    "Always Perfect", "Auto Dance / Play", "Skip Story",
    "God Mode (No Miss)", "Notes Perfect", "Unlock All Songs",
    "Unlimited Resources", "No Damage", "Rank Hack",
    "Anti Ban (Limited)", "Free Shopping", "All Unlocked"
  ];

  const supportedGames = [
    "Project Sekai JP", "Project Sekai Global", "BanG Dream! JP", 
    "BanG Dream! Global", "Pianista", "SM SUPERSTAR"
  ];

  return (
    <div className="min-h-screen bg-[#0f111a] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* --- HEADER SECTION --- */}
          <div className="text-center space-y-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-1.5 border border-blue-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Official Platform</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              RHYTHM<span className="text-blue-600">HUB</span>
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed">
              Pusat koleksi MOD APK Game Rhythm terbesar dengan fitur premium yang dikembangkan khusus untuk komunitas.
            </p>
          </div>

          {/* --- MAIN CONTENT CARD --- */}
          <div className="bg-[#161b2c] rounded-3xl shadow-2xl border border-gray-800 overflow-hidden">
            {/* HERO BANNER */}
            <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 px-8 py-10 overflow-hidden">
               <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">#1 Rhythm MOD Provider</h2>
                  <p className="text-blue-100/80 text-sm font-medium">Menghadirkan pengalaman bermain tanpa batas dengan fitur eksklusif.</p>
               </div>
               {/* Decorative Element */}
               <div className="absolute -right-10 -bottom-10 text-9xl opacity-10 font-black italic select-none">MUSIC</div>
            </div>

            <div className="p-8 md:p-10 space-y-10">
              
              {/* SECTION: APA ITU */}
              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wider">🎯 Apa Itu RhythmHub?</h3>
                </div>
                <p className="text-gray-400 text-sm leading-loose">
                  RhythmHub adalah platform independen yang berfokus pada modifikasi game rhythm populer. 
                  Kami memahami tantangan dalam game rhythm, itulah mengapa kami menyediakan fitur seperti 
                  <span className="text-blue-400 font-bold"> Always Perfect</span>, 
                  <span className="text-blue-400 font-bold"> Auto Dance</span>, dan 
                  <span className="text-blue-400 font-bold"> Unlock All Songs</span> untuk membantu Anda menikmati konten game secara maksimal tanpa hambatan.
                </p>
              </section>

              {/* SECTION: FITUR MOD */}
              <section className="space-y-5">
                <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em]">⚡ Mod Capabilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {features.map((feature, idx) => (
                    <div key={idx} className="group flex items-center gap-3 p-3 bg-[#0f111a] border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all">
                      <span className="text-blue-500 font-bold text-xs">0{idx + 1}</span>
                      <span className="text-xs text-gray-300 font-bold group-hover:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: GAMES & HOW TO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Supported Games */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em]">🎮 Supported Games</h3>
                  <div className="flex flex-wrap gap-2">
                    {supportedGames.map((game, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#1e2235] text-blue-300 text-[10px] font-black rounded-lg border border-blue-900/30 uppercase tracking-tighter">
                        {game}
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-600 font-bold italic">*Update rutin berdasarkan request komunitas.</p>
                </div>

                {/* Step to Install */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em]">📥 Installation Guide</h3>
                  <div className="space-y-3">
                    {["Pilih Game & Versi", "Klik Download MOD APK", "Aktifkan Unknown Sources", "Install & Enjoy!"].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center italic">{i + 1}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION: DISCLAIMER (RED DESIGN) */}
              <div className="bg-[#451010]/20 border border-[#7f1d1d]/50 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-[#f87171]">
                  <span className="text-lg">⚠️</span>
                  <h3 className="text-xs font-black uppercase tracking-widest">Legal & Risk Disclaimer</h3>
                </div>
                <ul className="text-[11px] text-[#f87171]/80 space-y-1.5 list-none font-medium">
                  <li className="flex items-start gap-2"><span className="opacity-50">●</span> Project Sekai memiliki risiko deteksi banned yang sangat tinggi.</li>
                  <li className="flex items-start gap-2"><span className="opacity-50">●</span> Gunakan akun "Guest" atau "Smurf", jangan gunakan akun utama.</li>
                  <li className="flex items-start gap-2"><span className="opacity-50">●</span> Segala kerugian akun adalah tanggung jawab pengguna sepenuhnya.</li>
                </ul>
              </div>

              {/* FOOTER ABOUT */}
              <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left space-y-1">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">© 2024 RhythmHub Database</p>
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-tighter">Developed for Rhythm Game Enthusiasts</p>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-md border border-blue-500/20">
                    VERSION 1.0.4 | STABLE
                  </div>
                  <p className="text-[9px] text-gray-600 mt-2 font-bold italic">Last Synced: April 07, 2026</p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
