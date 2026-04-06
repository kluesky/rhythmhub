// src/components/Pagination.jsx
import { motion } from 'framer-motion'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Logic untuk menghasilkan urutan angka halaman
  const getPageNumbers = () => {
    const pages = []
    const showMax = 3 // Jumlah angka yang tampil di sekitar halaman aktif

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > showMax) pages.push('...')

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i)
      }

      if (currentPage < totalPages - showMax + 1) pages.push('...')
      if (!pages.includes(totalPages)) pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-12 pb-8">
      {/* Info Teks */}
      <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
        Page <span className="text-blue-500">{currentPage}</span> of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        {/* Tombol Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2.5 rounded-xl bg-[#161b2c] border border-gray-800 text-gray-400 disabled:opacity-20 disabled:cursor-not-allowed hover:border-blue-500 hover:text-white transition-all active:scale-90"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Angka Halaman */}
        <div className="flex items-center gap-1.5">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-2 text-gray-600 font-black">...</span>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onPageChange(page)}
                  className={`min-w-[42px] h-[42px] rounded-xl text-xs font-black transition-all border ${
                    currentPage === page
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
                      : 'bg-[#161b2c] border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
                  }`}
                >
                  {page}
                </motion.button>
              )}
            </div>
          ))}
        </div>

        {/* Tombol Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2.5 rounded-xl bg-[#161b2c] border border-gray-800 text-gray-400 disabled:opacity-20 disabled:cursor-not-allowed hover:border-blue-500 hover:text-white transition-all active:scale-90"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
