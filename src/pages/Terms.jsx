// src/pages/Terms.jsx
import { motion } from 'framer-motion'

export default function Terms() {
  const sections = [
    {
      id: '01',
      title: 'Penerimaan Ketentuan',
      content: 'Dengan mengakses dan menggunakan platform RhythmHub, Anda dianggap telah membaca, memahami, dan menyetujui untuk terikat oleh seluruh syarat dan ketentuan yang berlaku di halaman ini.'
    },
    {
      id: '02',
      title: 'Penggunaan Layanan (Edukasi)',
      content: 'Seluruh konten MOD APK yang tersedia di platform ini disediakan murni untuk tujuan edukasi, pengujian fitur, dan analisis teknis. Kami tidak menyarankan penggunaan file ini untuk merugikan pihak pengembang asli atau mendapatkan keuntungan tidak adil dalam kompetisi.'
    },
    {
      id: '03',
      title: 'Risiko & Tanggung Jawab',
      content: 'Penggunaan aplikasi modifikasi memiliki risiko tinggi terhadap keamanan akun (Banned/Suspended). RhythmHub tidak bertanggung jawab atas segala bentuk kehilangan data, kerusakan perangkat, atau pemblokiran akun yang terjadi akibat penggunaan file dari platform kami.'
    },
    {
      id: '04',
      title: 'Hak Cipta',
      content: 'Seluruh aset, logo, dan nama game adalah hak cipta milik pengembang asli (Developer/Publisher). RhythmHub hanyalah platform penyedia modifikasi pihak ketiga dan tidak memiliki afiliasi resmi dengan pengembang game mana pun.'
    },
    {
      id: '05',
      title: 'Perubahan Layanan',
      content: 'Kami berhak untuk menambah, mengubah, atau menghapus konten dan layanan di RhythmHub kapan saja tanpa pemberitahuan sebelumnya, termasuk memutus akses file jika ditemukan masalah keamanan yang krusial.'
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
              <span className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">Legal Document</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
              TERMS OF <span className="text-blue-600">SERVICE</span>
            </h1>
            <p className="text-gray-500 text-sm font-medium italic">Terakhir Diperbarui: 07 April 2026</p>
          </div>

          {/* --- CONTENT BOX --- */}
          <div className="bg-[#161b2c] rounded-[2.5rem] border border-gray-800 overflow-hidden shadow-2xl">
            {/* Warning Banner */}
            <div className="bg-[#451010]/30 border-b border-[#7f1d1d]/50 p-6 flex items-start gap-4">
              <span className="text-2xl">⚠️</span>
              <p className="text-xs text-[#f87171] font-bold leading-relaxed uppercase tracking-wider">
                Penting: Mohon baca ketentuan ini dengan seksama. Jika Anda tidak setuju dengan poin-poin di bawah ini, harap segera tinggalkan platform ini.
              </p>
            </div>

            <div className="p-8 md:p-12 space-y-12">
              {sections.map((section) => (
                <section key={section.id} className="relative group">
                  <div className="flex gap-6 items-start">
                    <span className="text-4xl font-black text-blue-600/20 group-hover:text-blue-600/40 transition-colors italic leading-none select-none">
                      {section.id}
                    </span>
                    <div className="space-y-3">
                      <h3 className="text-lg font-black text-white uppercase tracking-tight">
                        {section.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-loose">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </section>
              ))}

              {/* --- CLOSING --- */}
              <div className="pt-10 border-t border-gray-800">
                <p className="text-xs text-gray-500 text-center leading-relaxed">
                  Dengan mengunduh file apa pun dari RhythmHub, Anda secara otomatis menyetujui seluruh <br className="hidden md:block" /> 
                  syarat dan ketentuan yang telah ditetapkan di atas.
                </p>
              </div>
            </div>
          </div>

          {/* --- FOOTER ACTIONS --- */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-4 bg-[#1e2235] text-white text-xs font-black uppercase tracking-widest rounded-2xl border border-gray-700 hover:border-gray-500 transition-all active:scale-95 shadow-xl"
            >
              Kembali
            </button>
            <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest italic">
              RhythmHub Documentation v1.0.4
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
