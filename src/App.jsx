import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen bg-[#0f111a] text-white font-sans flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/20 flex items-center justify-center">
            <span className="text-4xl font-black tracking-tighter uppercase text-white italic">
              R<span className="text-blue-500">H</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase text-white italic mb-4">
          RHYTHM<span className="text-blue-500">HUB</span>
        </h1>
        
        {/* Maintenance Badge */}
        <div className="inline-block mb-8">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-full px-5 py-2">
            <p className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em]">
              Platform Maintenance
            </p>
          </div>
        </div>

        {/* Main Message */}
        <p className="text-xl md:text-2xl font-light text-white/70 mb-6">
          Temporarily Unavailable
        </p>
        
        {/* Professional Explanation */}
        <div className="space-y-4 text-left max-w-md mx-auto mb-8">
          <p className="text-gray-300 text-sm leading-relaxed">
            RhythmHub is currently undergoing a comprehensive security enhancement and database maintenance procedure.
          </p>
          
          <p className="text-gray-400 text-sm leading-relaxed">
            This scheduled maintenance includes:
          </p>
          
          <ul className="text-gray-400 text-sm leading-relaxed space-y-2 list-disc pl-5">
            <li>Security protocol upgrade across all systems</li>
            <li>Database integrity verification and restoration</li>
            <li>Server infrastructure reconfiguration</li>
            <li>Implementation of enhanced protection layers</li>
            <li>Full system backup and recovery testing</li>
          </ul>
          
          <p className="text-gray-400 text-sm leading-relaxed pt-2">
            During this process, all platform features including game downloads, user authentication, 
            and content access are temporarily suspended to ensure data integrity and system security.
          </p>
          
          <p className="text-gray-500 text-sm leading-relaxed">
            We appreciate your understanding and patience as we work to provide you with a more secure 
            and reliable platform experience.
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Notice Box */}
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-[9px] text-blue-400/80 uppercase tracking-widest">
            Security Upgrade Protocol Active
          </p>
          <p className="text-[8px] text-gray-600 mt-2">
            All systems are being restored with enhanced security measures.
          </p>
          <p className="text-[8px] text-gray-600 mt-1">
            Thank you for your patience and continued trust in RhythmHub.
          </p>
        </div>

        {/* Footer */}
        <p className="text-[7px] text-gray-700 uppercase tracking-[0.2em] mt-12">
          RhythmHub Security Protocol • Version 3.0 • Encrypted Connection Active
        </p>
      </motion.div>
    </div>
  )
}

export default App;
