import { motion } from 'framer-motion'

export default function Terms() {
  const sections = [
    {
      id: '01',
      title: 'Acceptance of Terms',
      content: 'By accessing and using the RhythmHub platform, you are deemed to have read, understood, and agreed to be bound by all applicable terms and conditions on this page.'
    },
    {
      id: '02',
      title: 'Use of Service (Educational)',
      content: 'All MOD APK content available on this platform is provided purely for educational purposes, feature testing, and technical analysis. We do not recommend using these files to gain unfair advantages in competitions.'
    },
    {
      id: '03',
      title: 'Risks & Responsibilities',
      content: 'The use of modified applications carries risks to account security. RhythmHub is not responsible for any form of data loss, device damage, or account bans that occur as a result of using files from our platform.'
    },
    {
      id: '04',
      title: 'Copyright',
      content: 'All assets, logos, and game names are copyrighted by their respective developers. RhythmHub is a third-party platform and has no official affiliation with any game developers.'
    },
    {
      id: '05',
      title: 'Service Changes',
      content: 'We reserve the right to add, modify, or remove content on RhythmHub at any time without prior notice, including terminating file access if security issues are found.'
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
              Last updated on April 7, 2026
            </p>
            <div className="h-1 w-12 bg-blue-600"></div>
          </div>

          {/* Warning Section */}
          <div className="p-6 bg-red-500/5 border-l-4 border-red-500 rounded-r-xl">
            <p className="text-sm text-red-400 leading-relaxed font-medium">
              Important: Please read these terms carefully. If you do not agree with the points below, please stop using our services.
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
              Back
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