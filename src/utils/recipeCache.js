const CACHE_VERSION = 'v1'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

function storageKey(applianceName) {
  return `cartchef_${CACHE_VERSION}_recipes_${applianceName}`
}

/**
 * Returns cached Spoonacular results for a given appliance query, or null if
 * the cache is missing or older than 24 hours.
 */
export function getCached(applianceName) {
  try {
    const raw = localStorage.getItem(storageKey(applianceName))
    if (!raw) return null
    const { results, cachedAt } = JSON.parse(raw)
    if (Date.now() - cachedAt > CACHE_TTL_MS) {
      localStorage.removeItem(storageKey(applianceName))
      return null
    }
    return results
  } catch {
    return null
  }
}

/**
 * Persists Spoonacular results for a given appliance query into localStorage.
 * Silently no-ops if storage is unavailable or full.
 */
export function setCached(applianceName, results) {
  try {
    localStorage.setItem(
      storageKey(applianceName),
      JSON.stringify({ results, cachedAt: Date.now() })
    )
  } catch {
    // localStorage unavailable or quota exceeded — skip silently
  }
}
