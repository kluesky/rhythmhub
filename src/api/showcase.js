// src/api/showcase.js
const PASTEFY_API_URL = 'https://pastefy.app/api/v2'
const PASTEFY_API_KEY = 'aJLzptOLgwIhDwVRkOTSEXsqnYWKg42aoh3FhxrZ1CgvFooGtKUNkwKVPvzD'
const SHOWCASE_PASTE_ID = 'bQ9SXTPg' // ← Buat paste baru, isi []

const getHeaders = () => ({
  'Authorization': `Bearer ${PASTEFY_API_KEY}`,
  'Content-Type': 'application/json'
})

// Ambil semua video showcase
export async function getAllShowcases() {
  try {
    const response = await fetch(`${PASTEFY_API_URL}/paste/${SHOWCASE_PASTE_ID}`, {
      method: 'GET',
      headers: getHeaders()
    })
    const data = await response.json()
    if (response.ok && data && data.content) {
      const parsed = JSON.parse(data.content)
      return { success: true, videos: Array.isArray(parsed) ? parsed : [] }
    }
    return { success: true, videos: [] }
  } catch (error) {
    return { success: false, videos: [] }
  }
}

// Tambah video baru
export async function addShowcaseToPastefy(videoData) {
  try {
    const existing = await getAllShowcases()
    const videos = existing.videos || []
    
    const newEntry = {
      id: Date.now(),
      username: videoData.username,
      gameName: videoData.gameName,
      videoUrl: videoData.videoUrl,
      timestamp: new Date().toISOString()
    }
    
    videos.unshift(newEntry) // Video terbaru di atas
    
    const response = await fetch(`${PASTEFY_API_URL}/paste/${SHOWCASE_PASTE_ID}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ content: JSON.stringify(videos, null, 2) })
    })
    
    return { success: response.ok }
  } catch (error) {
    return { success: false }
  }
}
