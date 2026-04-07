// src/pages/Privacy.jsx - Professional & Clean Version
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
    <div className="min-h-screen bg-[#0f111a] py-20 px-4 text-left">
      <div className="container mx-auto max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* --- HEADER --- */}
          <div className="space-y-4 border-b border-white/10 pb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-xs font-medium uppercase tracking-widest">
              <span>Version 1.0.2</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>Updated April 07, 2026</span>
            </div>
          </div>

          {/* --- INTRO BANNER --- */}
          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-sm text-blue-400 font-medium leading-relaxed">
              Privasi Anda adalah prioritas kami. RhythmHub berkomitmen untuk meminimalkan pengumpulan data pribadi demi keamanan dan kenyamanan pengguna dalam mengakses layanan kami.
            </p>
          </div>

          {/* --- POLICIES LIST --- */}
          <div className="space-y-12">
            {policies.map((item, index) => (
              <section key={index} className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-blue-600 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-7 pl-9">
                  {item.content}
                </p>
              </section>
            ))}
          </div>

          {/* --- FOOTER SECTION --- */}
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <button 
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Halaman Utama
            </button>
            
            <p className="text-[11px] text-gray-600 font-medium">
              © 2026 RhythmHub. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
