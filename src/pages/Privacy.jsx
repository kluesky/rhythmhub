// src/pages/Privacy.jsx
import { motion } from 'framer-motion'

export default function Privacy() {
  const policies = [
    {
      title: 'Informasi yang Kami Kumpulkan',
      content: 'Saat Anda menggunakan fitur "Request Game" atau "Feedback", kami mengumpulkan data publik seperti Username (opsional), Email (opsional), dan detail game yang diminta. Kami tidak mengumpulkan data pribadi sensitif secara otomatis tanpa persetujuan Anda.'
    },
    {
      title: 'Penggunaan Data',
      content: 'Data yang dikumpulkan digunakan murni untuk keperluan pengembangan katalog game, sinkronisasi status MOD di database cloud kami, serta menanggapi masukan atau keluhan yang Anda kirimkan.'
    },
    {
      title: 'Keamanan Data Cloud',
      content: 'RhythmHub menggunakan infrastruktur pihak ketiga (Pastefy API) untuk menyimpan data request. Meskipun kami berupaya menjaga integritas data, perlu dipahami bahwa pengiriman data melalui internet tidak pernah 100% aman.'
    },
    {
      title: 'Cookies & Pelacakan',
      content: 'Kami menggunakan penyimpanan lokal browser (Local Storage) untuk menyimpan preferensi bahasa dan session login Anda agar pengalaman penggunaan tetap mulus tanpa harus mengatur ulang setiap kali kunjungan.'
    },
    {
      title: 'Tautan Pihak Ketiga',
      content: 'Website kami berisi tautan ke Playstore atau file hosting luar. Kami tidak bertanggung jawab atas kebijakan privasi atau konten dari situs pihak ketiga tersebut.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f111a] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* --- HEADER --- */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-4 py-1.5 border border-blue-500/20">
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Data Protection</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
              PRIVACY <span className="text-blue-600">& POLICY</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium italic">Versi 1.0.2 | Update: 07 April 2026</p>
          </div>

          {/* --- CONTENT BOX --- */}
          <div className="bg-[#161b2c] rounded-[2.5rem] border border-gray-800 overflow-hidden shadow-2xl">
            {/* Info Banner */}
            <div className="bg-blue-600/10 border-b border-blue-500/20 p-6 flex items-start gap-4">
              <span className="text-2xl">🛡️</span>
              <p className="text-[11px] text-blue-400 font-bold leading-relaxed uppercase tracking-widest">
                Privasi Anda adalah prioritas kami. RhythmHub berkomitmen untuk meminimalkan pengumpulan data pribadi demi keamanan pengguna.
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              {policies.map((item, index) => (
                <section key={index} className="space-y-3 group">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-6 bg-blue-600 rounded-full group-hover:w-10 transition-all duration-300"></div>
                    <h3 className="text-sm font-black text-white uppercase tracking-widest">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-loose pl-9">
                    {item.content}
                  </p>
                </section>
              ))}

              {/* --- CLOSING --- */}
              <div className="pt-8 border-t border-gray-800 text-center">
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.3em]">
                  RhythmHub Security Compliance
                </p>
              </div>
            </div>
          </div>

          {/* --- FOOTER ACTIONS --- */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4">
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-3.5 bg-[#1e2235] text-white text-[10px] font-black uppercase tracking-widest rounded-2xl border border-gray-700 hover:border-blue-500 transition-all active:scale-95 shadow-xl"
            >
              ← Back to Main
            </button>
            <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">
              © 2026 RhythmHub — Secured Cloud System
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
