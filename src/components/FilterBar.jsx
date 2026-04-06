import { motion } from 'framer-motion'

export default function FilterBar({ filter, setFilter }) {
  const filters = [
    { id: 'all', label: 'Semua Game' },
    { id: 'jp', label: '🇯🇵 JP Version' },
    { id: 'global', label: '🌍 Global Version' }
  ]

  return (
    <div className="flex justify-center gap-3 mb-10 flex-wrap">
      {filters.map((f) => (
        <motion.button
          key={f.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setFilter(f.id)}
          className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm ${
            filter === f.id
              ? 'bg-primary text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {f.label}
        </motion.button>
      ))}
    </div>
  )
}