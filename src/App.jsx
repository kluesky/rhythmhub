import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans flex items-center justify-center px-6 selection:bg-blue-500/30">
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl"
      >
        {/* Logo Section - Modernized */}
        <div className="mb-12 flex justify-start items-center gap-5">
          <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <span className="text-2xl font-black tracking-tighter uppercase text-black italic">
              R<span className="text-blue-600">H</span>
            </span>
          </div>
          <div className="h-10 w-[1px] bg-zinc-800" />
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase text-white italic">
              RHYTHM<span className="text-blue-600">HUB</span>
            </h1>
          </div>
        </div>
        
        {/* Maintenance Badge - Simplified */}
        <div className="inline-block mb-8">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-md px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">
              Platform Maintenance
            </p>
          </div>
        </div>

        {/* Main Message */}
        <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8">
          Temporarily Unavailable
        </p>
        
        {/* Professional Explanation - Modern Layout */}
        <div className="grid gap-8 mb-12">
          <p className="text-zinc-400 text-lg leading-relaxed font-light border-l-2 border-zinc-800 pl-6">
            RhythmHub is currently undergoing a comprehensive security enhancement and database maintenance procedure.
          </p>
          
          <div className="space-y-4">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              This scheduled maintenance includes:
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-400 text-sm leading-relaxed">
              {[
                "Security protocol upgrade across all systems",
                "Database integrity verification and restoration",
                "Server infrastructure reconfiguration",
                "Implementation of enhanced protection layers",
                "Full system backup and recovery testing"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-[-2px]">/</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-zinc-900">
            <p className="text-zinc-500 text-sm leading-relaxed">
              During this process, all platform features including game downloads, user authentication, 
              and content access are temporarily suspended to ensure data integrity and system security.
            </p>
            
            <p className="text-zinc-400 text-sm leading-relaxed italic">
              We appreciate your understanding and patience as we work to provide you with a more secure 
              and reliable platform experience.
            </p>
          </div>
        </div>

        {/* Status Section - Replaces the Loading Bounces */}
        <div className="flex items-center gap-4 mb-12">
           <div className="flex gap-1">
              <div className="w-1 h-4 bg-blue-600/30 rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
              <div className="w-1 h-4 bg-blue-600/60 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
              <div className="w-1 h-4 bg-blue-600 rounded-full animate-[pulse_1.4s_ease-in-out_infinite]" />
           </div>
           <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Restoring Services</span>
        </div>
      </motion.div>
    </div>
  )
}

export default App;
