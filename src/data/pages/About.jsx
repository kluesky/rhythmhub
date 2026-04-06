import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4 border border-primary/20">
              <span className="text-xs text-primary font-medium">Tentang Kami</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Rhythm<span className="text-primary">Hub</span>
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Platform khusus MOD APK game rhythm terbaik dan terlengkap
            </p>
          </div>

          {/* Konten Utama */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-8 text-white">
              <h2 className="text-2xl font-bold mb-2">#1 Rhythm Game MOD Hub</h2>
              <p className="text-blue-100">Koleksi MOD APK game rhythm pilihan dengan fitur premium</p>
            </div>

            {/* Deskripsi */}
            <div className="p-6 space-y-6">
              {/* Apa Itu RhythmHub */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">🎯 Apa Itu RhythmHub?</h3>
                <p className="text-gray-600 leading-relaxed">
                  RhythmHub adalah platform khusus yang menyediakan kumpulan MOD APK dari game-game rhythm terbaik. 
                  Kami menghadirkan fitur-fitur premium seperti <span className="font-medium text-primary">Always Perfect</span>, 
                  <span className="font-medium text-primary"> Auto Dance</span>, <span className="font-medium text-primary">God Mode</span>, 
                  dan berbagai fitur eksklusif lainnya yang <span className="font-semibold">TIDAK tersedia</span> di versi original.
                </p>
              </div>

              {/* Fitur MOD yang Tersedia */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">⚡ Fitur MOD yang Tersedia</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Always Perfect", "Auto Dance / Auto Play", "Skip Story",
                    "God Mode (No Miss)", "ESP / All Notes Perfect", "Unlock All Songs",
                    "Unlimited Resources (Visual)", "No Damage", "Rank Hack (Visual)",
                    "Anti Ban (Limited)", "Free Shopping", "All Characters Unlocked"
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-primary">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Game yang Didukung */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🎮 Game yang Didukung</h3>
                <div className="flex flex-wrap gap-2">
                  {["Project Sekai JP", "Project Sekai Global", "BanG Dream! JP", 
                    "BanG Dream! Global", "Pianista", "SM SUPERSTAR"].map((game, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {game}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  *Update game baru akan ditambahkan secara berkala sesuai request dari pengunjung
                </p>
              </div>

              {/* Cara Mendapatkan MOD */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📥 Cara Mendapatkan MOD</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span>Pilih game yang diinginkan dari daftar</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span>Klik tombol "Download MOD APK"</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span>Install APK (pastikan izin instalasi dari sumber tidak dikenal aktif)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span>Buka game dan nikmati fitur MOD!</span>
                  </div>
                </div>
              </div>

              {/* Request Game */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">📝 Request Game Baru</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Game rhythm favoritmu belum tersedia? Langsung request melalui halaman 
                  <span className="font-medium text-primary"> Request Game</span>.
                </p>
                <p className="text-gray-500 text-xs">
                  Request akan langsung masuk ke database online dan menjadi prioritas kami untuk dikerjakan.
                </p>
              </div>

              {/* Disclaimer Penting */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-yellow-800 mb-2">⚠️ Disclaimer Penting</h3>
                <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                  <li>MOD APK ini untuk tujuan edukasi dan pengujian</li>
                  <li>Project Sekai memiliki RISIKO TINGGI deteksi & banned</li>
                  <li>Gunakan dengan bijak dan jangan di main account utama</li>
                  <li>Kami tidak bertanggung jawab atas konsekuensi yang terjadi</li>
                  <li>Beberapa fitur MOD mungkin tidak berfungsi setelah update game</li>
                </ul>
              </div>

              {/* Kontak */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">📞 Kontak & Dukungan</h3>
                <p className="text-xs text-gray-500">
                  Untuk pertanyaan, laporan bug, atau request game, silakan gunakan halaman Request Game atau hubungi via:
                </p>
                <div className="flex gap-4 mt-2">
                  <a href="#" className="text-xs text-primary hover:underline">Discord</a>
                  <a href="#" className="text-xs text-primary hover:underline">Telegram</a>
                  <a href="#" className="text-xs text-primary hover:underline">Email</a>
                </div>
              </div>

              <div className="text-center text-xs text-gray-400 pt-4 border-t border-gray-100">
                <p>© 2024 RhythmHub — MOD Game Rhythm Terbaik</p>
                <p className="mt-1">Versi 2.0 | Last Update: December 2024</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}