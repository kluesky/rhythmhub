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
      content: 'Seluruh konten MOD APK yang tersedia di platform ini disediakan murni untuk tujuan edukasi, pengujian fitur, dan analisis teknis. Kami tidak menyarankan penggunaan file ini untuk mendapatkan keuntungan tidak adil dalam kompetisi.'
    },
    {
      id: '03',
      title: 'Risiko & Tanggung Jawab',
      content: 'Penggunaan aplikasi modifikasi memiliki risiko terhadap keamanan akun. RhythmHub tidak bertanggung jawab atas segala bentuk kehilangan data, kerusakan perangkat, atau pemblokiran akun yang terjadi akibat penggunaan file dari platform kami.'
    },
    {
      id: '04',
      title: 'Hak Cipta',
      content: 'Seluruh aset, logo, dan nama game adalah hak cipta milik pengembang asli. RhythmHub adalah platform pihak ketiga dan tidak memiliki afiliasi resmi dengan pengembang game mana pun.'
    },
    {
      id: '05',
      title: 'Perubahan Layanan',
      content: 'Kami berhak untuk menambah, mengubah, atau menghapus konten di RhythmHub kapan saja tanpa pemberitahuan sebelumnya, termasuk memutus akses file jika ditemukan masalah keamanan.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f111a] py-12 md:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-gray-500 text-sm">
              Terakhir diperbarui pada 7 April 2026
            </p>
            <div className="h-1 w-12 bg-blue-600"></div>
          </div>

          {/* Warning Section */}
          <div className="p-6 bg-red-500/5 border-l-4 border-red-500 rounded-r-xl">
            <p className="text-sm text-red-400 leading-relaxed font-medium">
              Penting: Harap baca ketentuan ini dengan saksama. Jika Anda tidak menyetujui poin-poin di bawah ini, harap berhenti menggunakan layanan kami.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12 text-left">
            {sections.map((section) => (
              <section key={section.id} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-blue-500">{section.id}</span>
                  <h2 className="text-lg font-semibold text-white">
                    {section.title}
                  </h2>
                </div>
                <p className="text-gray-400 text-[15px] leading-relaxed pl-7">
                  {section.content}
                </p>
              </section>
            ))}
          </div>

          {/* Footer Info */}
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2.5 text-sm font-semibold text-gray-300 hover:text-white border border-gray-800 hover:border-gray-600 rounded-lg transition-all"
            >
              Kembali
            </button>
            <p className="text-xs text-gray-600">
              RhythmHub Documentation &copy; 2026
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
