// src/components/ActivityLog.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ActivityLog() {
  const [activity, setActivity] = useState(null)
  
  // Daftar pesan acak agar terlihat real-time
    const activities = [
    // --- DOWNLOAD & INSTALL (CORE) ---
    "> Fetching package: pjsk_mod_v3.4.2_unlocked.apk",
    "> Incoming request for HOK_Global_HighFPS.patch",
    "> Download initialized: gakuen_idmaster_jp_v1.0.4",
    "> User 182.16.xx.xx downloading arcaea_all_songs.zip",
    "> MLBB_skin_script_latest.bin successfully transferred",
    "> Cytus_II_v5.0.1_full_data.obb (Download Started)",
    "> Deemo_II_core_update.apk - 100% transfer complete",
    "> [LOG] MuseDash_godmode_v3.1.0 downloaded by member",
    "> System: Lanota_full_version_unlocked (Mirror 1 Active)",
    "> Processing download: kalpa_infinite_stamina_build_72",

    // --- REQUEST & DATABASE ---
    "> Request submitted: Mobile Legends update v1.8.x",
    "> DB_Update: Project Sekai moved to Priority 1",
    "> New entry: Muse_Dash_v3.5.0 (Review Pending)",
    "> User 'RhythmMaster_99' triggered HOK_JP update request",
    "> Vote received for BangG_Dream_GirlsBand_Party",
    "> Analyzing request #4420: Rotation_Game_v2.0",
    "> New request logged: Phigros_v3.1.2_patch",
    "> Syncing user feedback #8821 with cloud_database",

    // --- SYSTEM & SECURITY LOGS (TECHNICAL) ---
    "> Database Sync: 12 mod_files updated automatically",
    "> Cloud_Node: Pastefy API connection established",
    "> Security_Scan: Integrity check 100% (No Breach)",
    "> Network: Latency 18ms - South East Asia Node",
    "> [CRON] Backup_System: DB archived to cloud_storage",
    "> Auth_Service: Session encrypted via AuthContext",
    "> Traffic: 1,420 active nodes connected to Hub",
    "> Patching: pjsk_anti_ban_signature updated",
    "> System: Backend_Engine_v2.5.0_STABLE deployed",
    "> Migration: User_sessions moved to high_speed_node",

    // --- ADMIN & USER ACTIVITY ---
    "> Registry: New member 'AdoFanboy_2026' verified",
    "> Admin: Case #9920 status changed to [DEPLOYED]",
    "> User 'MikuLover' updated profile_metadata",
    "> Legal: Terms_of_Service accessed by user",
    "> Registry: New member 'HOK_Slayer' verified",
    "> Admin: Uploaded gakuen_idmaster_v1.2.mod",
    "> User 'Harith_GoldLane' modified bio_descriptor",

    // --- TECH & SCANNING ---
    "> Scanning: Google_Playstore for new game_builds",
    "> Patching: Bypassing integrity_check (Latest Rhythm Patch)",
    "> Satellite_Link: Syncing global_download_mirrors",
    "> Terminal: Fetching metadata from RhythmHub_Cloud",
    "> Alert: Unauthorized login attempt blocked (IP: 103.xx.xx.xx)",
    "> Package_Manager: Decrypting MOD_DATA_v4.enc",
    "> Engine: Rendering GameGrid with hardware_acceleration",
    "> Fixing: Login_protocol for JP_Version_Client",
    "> Analysis: Comparing APK_signatures for v3.5.0 update",
    "> Debug: Socket_io connection stabilized (Hub_Realtime)"
  ]


  useEffect(() => {
    const showRandomActivity = () => {
      // Pilih teks acak
      const randomText = activities[Math.floor(Math.random() * activities.length)]
      setActivity(randomText)

      // Hilangkan setelah 5 detik
      setTimeout(() => setActivity(null), 5000)
    }

    // Muncul pertama kali setelah 3 detik
    const initialTimeout = setTimeout(showRandomActivity, 3000)

    // Muncul berkala setiap 10-20 detik secara acak
    const interval = setInterval(() => {
      showRandomActivity()
    }, Math.random() * (20000 - 10000) + 10000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed bottom-8 left-8 z-[200] pointer-events-none select-none">
      <AnimatePresence>
        {activity && (
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-[#161b2c]/80 backdrop-blur-2xl border border-blue-500/30 p-4 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-start gap-4 max-w-[300px] border-l-4 border-l-blue-500"
          >
            {/* Status Radar Icon */}
            <div className="relative flex h-3 w-3 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_10px_#3b82f6]"></span>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[8px] font-black text-blue-400 uppercase tracking-[0.3em]">Live Feed</span>
                <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">• Just Now</span>
              </div>
              <p className="text-[11px] font-bold text-gray-300 leading-relaxed tracking-wide">
                {activity}
              </p>
            </div>

            {/* Garis Dekoratif Kecil */}
            <div className="absolute top-2 right-4 flex gap-1">
               <div className="w-1 h-1 bg-white/10 rounded-full"></div>
               <div className="w-1 h-1 bg-white/10 rounded-full"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
