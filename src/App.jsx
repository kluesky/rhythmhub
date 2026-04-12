import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans flex items-center justify-center px-6 selection:bg-blue-600/30">
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        {/* Brand Header */}
        <header className="flex items-center gap-5 mb-16">
          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-xl">
            <span className="text-xl font-black italic tracking-tighter text-black">
              R<span className="text-blue-600">H</span>
            </span>
          </div>
          <div className="h-6 w-[1px] bg-zinc-800" />
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
              RHYTHM<span className="text-blue-600">HUB</span>
            </h1>
            <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">
              Official Platform
            </span>
          </div>
        </header>

        {/* Hero Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
              Maintenance <br />
              <span className="text-zinc-500 italic font-light font-serif">in progress.</span>
            </h2>
            
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
          </div>

          <div className="space-y-6">
            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              RhythmHub is currently undergoing a comprehensive security enhancement and database maintenance procedure to ensure the best experience for our community.
            </p>
            
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
              All platform features, including authentication and content access, are temporarily suspended. We appreciate your patience as we strengthen our infrastructure.
            </p>
          </div>

          {/* Personal Commitment Tag */}
          <div className="pt-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] italic">
                I will do my best
              </span>
            </div>
          </div>
        </section>
      </motion.div>

    </div>
  )
}

export default App;
