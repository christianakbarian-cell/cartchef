import { useState, useEffect, useRef } from 'react'
import { localRecipes } from './data/localRecipes'
import { getCached, setCached } from './utils/recipeCache'
import ApplianceFilters from './components/ApplianceFilters'
import RecipeGrid from './components/RecipeGrid'
import CartSidebar from './components/CartSidebar'

// Parse all API keys from VITE_SPOONACULAR_KEYS (comma-separated) or fall back
// to the single-key variable. Supports full key rotation across multiple accounts.
const API_KEYS = (import.meta.env.VITE_SPOONACULAR_KEYS ?? import.meta.env.VITE_SPOONACULAR_KEY ?? '')
  .split(',')
  .map((k) => k.trim())
  .filter(Boolean)

const APPLIANCES = [
  { id: 'microwave', label: 'Microwave', emoji: '📡', apiName: 'microwave' },
  { id: 'kettle',    label: 'Electric Kettle', emoji: '🫖', apiName: 'electric kettle' },
  { id: 'airfryer',  label: 'Air Fryer', emoji: '🌀', apiName: 'air fryer' },
]

// Strip HTML tags from Spoonacular summaries
function stripHtml(html) {
  return (html ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

// Normalize instructions from local arrays, Spoonacular analyzedInstructions, or HTML
function extractInstructions(r) {
  if (Array.isArray(r.instructions) && r.instructions.every((s) => typeof s === 'string')) {
    return r.instructions.map((s) => s.trim()).filter(Boolean)
  }

  const fromAnalyzed = (r.analyzedInstructions ?? [])
    .flatMap((block) => block.steps ?? [])
    .map((s) => (s.step ?? '').trim())
    .filter(Boolean)
  if (fromAnalyzed.length > 0) return fromAnalyzed

  if (typeof r.instructions === 'string' && r.instructions.trim()) {
    const text = stripHtml(r.instructions)
    const numbered = text
      .split(/(?:^|\n)\s*\d+\.\s+/)
      .map((s) => s.trim())
      .filter(Boolean)
    if (numbered.length > 1) return numbered
    return text ? [text] : []
  }

  return []
}

// Transform a Spoonacular recipe object into our internal shape
function mapRecipe(r) {
  const seen = new Set()
  const ingredients = (r.extendedIngredients ?? [])
    .filter((ing) => {
      const key = (ing.originalName || ing.name || '').toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .map((ing) => ({
      name: ing.originalName || ing.name || 'Ingredient',
      qty: ing.amount ?? 1,
      unit: ing.unit || '',
    }))

  const summary = r.summary ? stripHtml(r.summary) : ''
  const description = summary || 'A great recipe for your kitchen.'

  return {
    id: String(r.id),
    name: r.title,
    image: r.image ?? null,
    description,
    time: `${r.readyInMinutes ?? '?'} min`,
    servings: r.servings ?? 1,
    // Appliance filtering is done server-side; no per-recipe requirement data from API
    requiredAppliances: [],
    ingredients,
    instructions: extractInstructions(r),
  }
}

// Consolidate checked ingredients across all selected recipes
function buildCartItems(recipes, selectedRecipes, checkedItems) {
  const consolidated = {}
  for (const recipe of recipes) {
    if (!selectedRecipes.has(recipe.id)) continue
    for (const ing of recipe.ingredients) {
      const key = `${recipe.id}-${ing.name}`
      if (checkedItems[key] === false) continue
      const normName = ing.name.toLowerCase()
      if (!consolidated[normName]) {
        consolidated[normName] = { name: ing.name, entries: [] }
      }
      const existing = consolidated[normName].entries.find((e) => e.unit === ing.unit)
      if (existing) {
        existing.qty += ing.qty
      } else {
        consolidated[normName].entries.push({ qty: ing.qty, unit: ing.unit })
      }
    }
  }
  return Object.values(consolidated).sort((a, b) => a.name.localeCompare(b.name))
}

export default function App() {
  const [appliances, setAppliances] = useState({ microwave: true, kettle: true, airfryer: true })
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [fetchVersion, setFetchVersion] = useState(0)

  const [selectedRecipes, setSelectedRecipes] = useState(new Set())
  const [checkedItems, setCheckedItems] = useState({})
  const [activeRecipe, setActiveRecipe] = useState(null)
  const [isDescExpanded, setIsDescExpanded] = useState(false)

  // Tracks API keys that returned 402 this session so we skip them immediately
  const exhaustedKeys = useRef(new Set())

  // Serialize appliances to a stable string for the effect dependency
  const applianceKey = JSON.stringify(appliances)

  useEffect(() => {
    let cancelled = false

    async function fetchRecipes() {
      setIsLoading(true)
      setFetchError(null)
      // Reset cart whenever the recipe set changes
      setSelectedRecipes(new Set())
      setCheckedItems({})
      setActiveRecipe(null)

      const activeAppliances = APPLIANCES.filter((a) => appliances[a.id]).map((a) => a.apiName)

      // Filter local recipes client-side by cross-referencing each recipe's step equipment
      // against the active appliance names (OR logic — a recipe passes if it uses ANY active appliance)
      const filteredLocal = activeAppliances.length === 0
        ? localRecipes
        : localRecipes.filter((recipe) => {
            const usedEquipment = (recipe.analyzedInstructions?.[0]?.steps ?? [])
              .flatMap((step) => step.equipment ?? [])
              .map((e) => e.name.toLowerCase())
            return activeAppliances.some((name) => usedEquipment.includes(name.toLowerCase()))
          })

      // One query key per active appliance, or '__all__' when nothing is selected
      const cacheKeys = activeAppliances.length > 0 ? activeAppliances : ['__all__']

      const baseUrl =
        `https://api.spoonacular.com/recipes/complexSearch` +
        `?number=9&fillIngredients=true&addRecipeInformation=true`

      /**
       * Fetch one appliance query with two layers of defense:
       *   1. localStorage cache (24-hour TTL) — zero API points consumed
       *   2. Key rotation — if the active key returns 402, silently retry
       *      with the next key in the list until one succeeds or all are exhausted
       */
      async function fetchAppliance(applianceName) {
        // Layer 1: check persistent cache first
        const cached = getCached(applianceName)
        if (cached !== null) return cached

        // Layer 2: call the API with key rotation
        const queryUrl =
          applianceName === '__all__'
            ? baseUrl
            : `${baseUrl}&equipment=${encodeURIComponent(applianceName)}`

        const available = API_KEYS.filter((k) => !exhaustedKeys.current.has(k))
        for (const key of available) {
          const res = await fetch(`${queryUrl}&apiKey=${key}`)
          if (res.status === 402) {
            // This key is out of quota — mark it and try the next one
            exhaustedKeys.current.add(key)
            continue
          }
          if (!res.ok) throw new Error(`Spoonacular error ${res.status}`)
          const results = (await res.json()).results ?? []
          // Persist to localStorage so the next load costs 0 API points
          setCached(applianceName, results)
          return results
        }

        // All keys exhausted — signal caller to fall back to local recipes
        throw new Error('quota_exceeded')
      }

      try {
        const allResults = await Promise.all(cacheKeys.map(fetchAppliance))

        // Flatten and deduplicate across appliance queries
        const seen = new Set()
        const merged = []
        for (const results of allResults) {
          for (const r of results) {
            if (!seen.has(r.id)) {
              seen.add(r.id)
              merged.push(r)
            }
          }
        }

        // Local favorites first, then live Spoonacular results
        if (!cancelled) setRecipes([...filteredLocal.map(mapRecipe), ...merged.map(mapRecipe)])
      } catch (err) {
        // API unavailable or quota exceeded — silently show local recipes only
        console.warn('Spoonacular fetch failed, using local recipes:', err.message)
        if (!cancelled) setRecipes(filteredLocal.map(mapRecipe))
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchRecipes()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applianceKey, fetchVersion])

  function toggleAppliance(id) {
    setAppliances((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function openRecipe(recipe) {
    setIsDescExpanded(false)
    setActiveRecipe(recipe.id)
    setSelectedRecipes((prev) => {
      const next = new Set(prev)
      next.add(recipe.id)
      return next
    })
    setCheckedItems((prev) => {
      const next = { ...prev }
      for (const ing of recipe.ingredients) {
        const key = `${recipe.id}-${ing.name}`
        if (!(key in next)) next[key] = true
      }
      return next
    })
  }

  function toggleItem(recipeId, ingName) {
    const key = `${recipeId}-${ingName}`
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  function removeRecipe(recipeId) {
    setSelectedRecipes((prev) => {
      const next = new Set(prev)
      next.delete(recipeId)
      return next
    })
    if (activeRecipe === recipeId) setActiveRecipe(null)
  }

  const cartItems = buildCartItems(recipes, selectedRecipes, checkedItems)

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Cart<span className="text-amber-500">Chef</span>
            </span>
          </div>
          <p className="text-sm text-slate-400 hidden sm:block">
            Pick recipes · Build your cart · Order groceries
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <RecipeGrid
              recipes={recipes}
              selectedRecipes={selectedRecipes}
              activeRecipe={activeRecipe}
              checkedItems={checkedItems}
              isLoading={isLoading}
              fetchError={fetchError}
              isDescExpanded={isDescExpanded}
              onOpenRecipe={openRecipe}
              onBack={() => setActiveRecipe(null)}
              onRemoveRecipe={removeRecipe}
              onToggleItem={toggleItem}
              onToggleDescExpanded={setIsDescExpanded}
              onRetry={() => setFetchVersion((v) => v + 1)}
              applianceFilters={
                <ApplianceFilters
                  applianceList={APPLIANCES}
                  appliances={appliances}
                  onToggle={toggleAppliance}
                />
              }
            />
          </main>

          <CartSidebar
            cartItems={cartItems}
            selectedRecipes={selectedRecipes}
            recipes={recipes}
          />
        </div>
      </div>
    </div>
  )
}
