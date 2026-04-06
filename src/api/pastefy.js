// src/api/pastefy.js
const PASTEFY_API_URL = 'https://pastefy.app/api/v2'
const PASTEFY_API_KEY = 'aJLzptOLgwIhDwVRkOTSEXsqnYWKg42aoh3FhxrZ1CgvFooGtKUNkwKVPvzD'
const PASTEFY_PASTE_ID = 'L0H9sY2c'  // Paste ID untuk request
const PASTEFY_GAMES_PASTE_ID = 'BHBujUrw'  // Ganti dengan paste ID baru untuk menyimpan games

// Helper headers
const getHeaders = () => ({
  'Authorization': `Bearer ${PASTEFY_API_KEY}`,
  'Content-Type': 'application/json'
})

// ==================== REQUEST GAMES ====================

// Ambil semua request dari paste
export async function getAllRequestsFromPastefy() {
  try {
    const response = await fetch(`${PASTEFY_API_URL}/paste/${PASTEFY_PASTE_ID}`, {
      method: 'GET',
      headers: getHeaders()
    })
    
    const data = await response.json()

    if (response.ok && data && data.content) {
      try {
        const parsed = JSON.parse(data.content)
        const requests = Array.isArray(parsed) ? parsed : []
        return { success: true, requests }
      } catch (e) {
        console.error('Parse error:', e)
        return { success: true, requests: [] }
      }
    }
    
    return { success: true, requests: [] }
  } catch (error) {
    console.error('Fetch error:', error)
    return { success: false, error: error.message, requests: [] }
  }
}

// Simpan semua request ke paste (overwrite)
export async function saveAllRequestsToPastefy(requests) {
  try {
    const content = JSON.stringify(requests, null, 2)
    
    const response = await fetch(`${PASTEFY_API_URL}/paste/${PASTEFY_PASTE_ID}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ content })
    })
    
    if (response.ok) {
      return { success: true }
    }
    return { success: false, error: 'Gagal menyimpan' }
  } catch (error) {
    console.error('Save error:', error)
    return { success: false, error: error.message }
  }
}

// Tambah request baru
export async function addRequestToPastefy(requestData) {
  try {
    const existing = await getAllRequestsFromPastefy()
    const requests = existing.requests || []
    
    const newRequest = {
      id: Date.now(),
      gameName: requestData.gameName,
      version: requestData.version,
      requester: requestData.requester || 'Anonymous',
      modFeatures: requestData.modFeatures,
      message: requestData.message || '-',
      email: requestData.email || '-',
      timestamp: new Date().toISOString(),
      upvotes: 0,
      status: 'pending'
    }
    
    requests.unshift(newRequest)
    const saveResult = await saveAllRequestsToPastefy(requests)
    
    if (saveResult.success) {
      return { success: true, request: newRequest }
    }
    return { success: false, error: saveResult.error }
  } catch (error) {
    console.error('Add request error:', error)
    return { success: false, error: error.message }
  }
}

// Update upvote
export async function updateRequestUpvote(requestId, currentUpvotes) {
  try {
    const existing = await getAllRequestsFromPastefy()
    const requests = existing.requests || []
    
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? { ...req, upvotes: (currentUpvotes || 0) + 1 }
        : req
    )
    
    const saveResult = await saveAllRequestsToPastefy(updatedRequests)
    return { success: saveResult.success }
  } catch (error) {
    console.error('Upvote error:', error)
    return { success: false, error: error.message }
  }
}

// Update status request (pending → done)
export async function updateRequestStatus(requestId, newStatus) {
  try {
    const existing = await getAllRequestsFromPastefy()
    const requests = existing.requests || []
    
    const updatedRequests = requests.map(req => 
      req.id === requestId 
        ? { ...req, status: newStatus }
        : req
    )
    
    const saveResult = await saveAllRequestsToPastefy(updatedRequests)
    return { success: saveResult.success }
  } catch (error) {
    console.error('Update status error:', error)
    return { success: false, error: error.message }
  }
}

// ==================== GAMES DATA (Upload Game) ====================

// Ambil semua games dari Pastefy
export async function getAllGamesFromPastefy() {
  try {
    const response = await fetch(`${PASTEFY_API_URL}/paste/${PASTEFY_GAMES_PASTE_ID}`, {
      method: 'GET',
      headers: getHeaders()
    })
    
    const data = await response.json()

    if (response.ok && data && data.content) {
      try {
        const parsed = JSON.parse(data.content)
        const games = Array.isArray(parsed) ? parsed : []
        return { success: true, games }
      } catch (e) {
        console.error('Parse error:', e)
        return { success: true, games: [] }
      }
    }
    
    return { success: true, games: [] }
  } catch (error) {
    console.error('Fetch games error:', error)
    return { success: false, error: error.message, games: [] }
  }
}

// Simpan semua games ke paste (overwrite)
export async function saveAllGamesToPastefy(games) {
  try {
    const content = JSON.stringify(games, null, 2)
    
    const response = await fetch(`${PASTEFY_API_URL}/paste/${PASTEFY_GAMES_PASTE_ID}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ content })
    })
    
    if (response.ok) {
      return { success: true }
    }
    return { success: false, error: 'Gagal menyimpan games' }
  } catch (error) {
    console.error('Save games error:', error)
    return { success: false, error: error.message }
  }
}

// Tambah game baru
export async function addGameToPastefy(gameData) {
  try {
    const existing = await getAllGamesFromPastefy()
    const games = existing.games || []
    
    const newGame = {
      id: Date.now(),
      name: gameData.name,
      version: gameData.version,
      imageUrl: gameData.imageUrl,
      playstoreLink: gameData.playstoreLink,
      genre: gameData.genre,
      publisher: gameData.publisher,
      description: gameData.description,
      features: gameData.features ? gameData.features.split(',').map(f => f.trim()) : [],
      modFeatures: gameData.modFeatures ? gameData.modFeatures.split(',').map(f => f.trim()) : [],
      status: gameData.status || 'success',
      statusText: gameData.statusText || '🟢 Online / Stable',
      createdAt: new Date().toISOString()
    }
    
    games.push(newGame)
    const saveResult = await saveAllGamesToPastefy(games)
    
    if (saveResult.success) {
      return { success: true, game: newGame }
    }
    return { success: false, error: saveResult.error }
  } catch (error) {
    console.error('Add game error:', error)
    return { success: false, error: error.message }
  }
}

// Update game
export async function updateGameOnPastefy(gameId, updatedData) {
  try {
    const existing = await getAllGamesFromPastefy()
    const games = existing.games || []
    
    const updatedGames = games.map(game => 
      game.id === gameId 
        ? { ...game, ...updatedData, updatedAt: new Date().toISOString() }
        : game
    )
    
    const saveResult = await saveAllGamesToPastefy(updatedGames)
    return { success: saveResult.success }
  } catch (error) {
    console.error('Update game error:', error)
    return { success: false, error: error.message }
  }
}

// Hapus game
export async function deleteGameFromPastefy(gameId) {
  try {
    const existing = await getAllGamesFromPastefy()
    const games = existing.games || []
    
    const filteredGames = games.filter(game => game.id !== gameId)
    const saveResult = await saveAllGamesToPastefy(filteredGames)
    return { success: saveResult.success }
  } catch (error) {
    console.error('Delete game error:', error)
    return { success: false, error: error.message }
  }
}

// Update status game (Stable/Warning/Maintenance)
export async function updateGameStatusOnPastefy(gameId, status, statusText) {
  try {
    const existing = await getAllGamesFromPastefy()
    const games = existing.games || []
    
    const updatedGames = games.map(game => 
      game.id === gameId 
        ? { ...game, status: status, statusText: statusText, updatedAt: new Date().toISOString() }
        : game
    )
    
    const saveResult = await saveAllGamesToPastefy(updatedGames)
    return { success: saveResult.success }
  } catch (error) {
    console.error('Update game status error:', error)
    return { success: false, error: error.message }
  }
}