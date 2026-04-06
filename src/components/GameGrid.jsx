// src/components/GameGrid.jsx
import { motion } from 'framer-motion'
import GameCard from './GameCard'

export default function GameGrid({ games }) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        😢 Tidak ada game yang ditemukan.
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </motion.div>
  )
}