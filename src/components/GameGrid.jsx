// src/components/GameGrid.jsx
import { motion } from 'framer-motion'
import GameCard from './GameCard'

export default function GameGrid({ games, onDownload }) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center py-24 border border-white/5 rounded-[2.5rem] bg-white/5">
        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.5em]">No Protocol Found</p>
      </div>
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {games.map((game) => (
        <GameCard 
          key={game.id} 
          game={game} 
          onDownload={onDownload} // Meneruskan fungsi download ke kartu
        />
      ))}
    </motion.div>
  )
}
