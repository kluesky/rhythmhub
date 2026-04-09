// src/pages/Privacy.jsx - Professional & Clean Version
import { motion } from 'framer-motion'

export default function Privacy() {
  const policies = [
    {
      title: 'Information We Collect',
      content: 'When you use the "Game Request" or "Feedback" features, we collect public data such as Username (optional), Email (optional), and requested game details. We do not automatically collect sensitive personal data without your consent.'
    },
    {
      title: 'Data Usage',
      content: 'Collected data is used purely for game catalog development purposes, MOD status synchronization in our cloud database, and responding to feedback or complaints you submit.'
    },
    {
      title: 'Cloud Data Security',
      content: 'RhythmHub uses third-party infrastructure (Pastefy API) to store request data. Although we strive to maintain data integrity, you should understand that data transmission over the internet is never 100% secure.'
    },
    {
      title: 'Cookies & Tracking',
      content: 'We use browser local storage to save your language preferences and login session so your experience remains smooth without having to reset everything on each visit.'
    },
    {
      title: 'Third-Party Links',
      content: 'Our website contains links to the Playstore or external hosting files. We are not responsible for the privacy policies or content of those third-party sites.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f111a] py-20 px-4 text-left">
      <div className="container mx-auto max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-16"
        >
          {/* --- HEADER --- */}
          <div className="space-y-4 border-b border-white/10 pb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-4 text-gray-500 text-xs font-medium uppercase tracking-widest">
              <span>Version 1.0.2</span>
              <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
              <span>Updated April 07, 2026</span>
            </div>
          </div>

          {/* --- INTRO BANNER --- */}
          <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
            <p className="text-sm text-blue-400 font-medium leading-relaxed">
              Your privacy is our priority. RhythmHub is committed to minimizing personal data collection for the security and convenience of users accessing our services.
            </p>
          </div>

          {/* --- POLICIES LIST --- */}
          <div className="space-y-12">
            {policies.map((item, index) => (
              <section key={index} className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-blue-600 font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-7 pl-9">
                  {item.content}
                </p>
              </section>
            ))}
          </div>

          {/* --- FOOTER SECTION --- */}
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <button 
              onClick={() => window.history.back()}
              className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
            
            <p className="text-[11px] text-gray-600 font-medium">
              © 2026 RhythmHub. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}