import { useState, useEffect } from 'react'

const APPLIANCES = [
  { id: 'microwave', label: 'Microwave', emoji: '📡', apiName: 'microwave' },
  { id: 'kettle',    label: 'Electric Kettle', emoji: '🫖', apiName: 'electric kettle' },
  { id: 'airfryer',  label: 'Air Fryer', emoji: '🌀', apiName: 'air fryer' },
]

// Strip HTML tags from Spoonacular summaries
function stripHtml(html) {
  return (html ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
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
  const description =
    summary.length > 130 ? summary.slice(0, 130) + '…' : summary || 'A great recipe for your dorm room.'

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

function formatQty(qty) {
  if (qty % 1 === 0) return String(qty)
  const fractions = { 0.25: '¼', 0.5: '½', 0.75: '¾' }
  return fractions[qty] ?? qty.toFixed(1)
}

function formatEntries(entries) {
  return entries
    .map((e) => `${formatQty(e.qty)}${e.unit ? ' ' + e.unit : ''}`)
    .join(' + ')
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
  const [showModal, setShowModal] = useState(false)
  const [isOrdering, setIsOrdering] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

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
      const equipmentParam =
        activeAppliances.length > 0
          ? `&equipment=${encodeURIComponent(activeAppliances.join(','))}`
          : ''

      const url =
        `https://api.spoonacular.com/recipes/complexSearch` +
        `?apiKey=${import.meta.env.VITE_SPOONACULAR_KEY}` +
        `&number=12&fillIngredients=true&addRecipeInformation=true` +
        equipmentParam

      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Spoonacular error ${res.status}`)
        const data = await res.json()
        if (!cancelled) setRecipes((data.results ?? []).map(mapRecipe))
      } catch (err) {
        if (!cancelled) setFetchError(err.message || 'Failed to load recipes.')
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

  async function exportToInstacart() {
    setIsOrdering(true)

    const payload = {
      title: 'DormChef Weekly Groceries',
      ingredients: cartItems.map((item) => ({
        name: item.name.toLowerCase(),
        display_text: item.name,
        measurements: item.entries.map((e) => ({
          quantity: e.qty,
          unit: e.unit,
        })),
      })),
    }

    console.log('Instacart API payload:', JSON.stringify(payload, null, 2))

    // Uncomment to call the real Instacart Developer Platform API:
    // const INSTACART_API_KEY = import.meta.env.VITE_INSTACART_API_KEY
    // const response = await fetch('https://connect.dev.instacart.tools/idp/v1/products/recipe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${INSTACART_API_KEY}`,
    //   },
    //   body: JSON.stringify(payload),
    // })
    // const data = await response.json()
    // const instacartUrl = data.url

    // Mock: simulate a 2-second network round-trip
    const instacartUrl = await new Promise((resolve) =>
      setTimeout(() => resolve('https://www.instacart.com/store/recipes/mock123'), 2000)
    )

    window.open(instacartUrl, '_blank', 'noopener,noreferrer')
    setSelectedRecipes(new Set())
    setCheckedItems({})
    setIsOrdering(false)
    setShowModal(false)
  }

  async function copyList() {
    const text = cartItems
      .map((item) => `• ${formatEntries(item.entries)} ${item.name}`)
      .join('\n')
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const cartItems = buildCartItems(recipes, selectedRecipes, checkedItems)
  const currentRecipe = recipes.find((r) => r.id === activeRecipe)

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🍳</span>
            <span className="text-xl font-bold text-white tracking-tight">
              Dorm<span className="text-amber-400">Chef</span>
            </span>
          </div>
          <p className="text-sm text-slate-500 hidden sm:block">
            Pick recipes · Build your cart · Order groceries
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main area */}
          <main className="flex-1 min-w-0">
            {!activeRecipe ? (
              <div>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-white">Dorm Recipes</h1>
                  <p className="text-slate-400 mt-1 text-sm">
                    Select your gear below — we'll find recipes that match.
                  </p>
                </div>

                {/* Appliance Checklist */}
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 mb-6">
                  <h2 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <span>🔌</span> Your Appliances
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {APPLIANCES.map((appliance) => {
                      const active = appliances[appliance.id]
                      return (
                        <button
                          key={appliance.id}
                          onClick={() => toggleAppliance(appliance.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all select-none ${
                            active
                              ? 'bg-amber-500/15 border-amber-400/60 text-amber-300'
                              : 'bg-slate-700/50 border-slate-600 text-slate-500 line-through'
                          }`}
                        >
                          <span>{appliance.emoji}</span>
                          {appliance.label}
                          {active && (
                            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Loading skeletons */}
                {isLoading && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden animate-pulse">
                        <div className="bg-slate-700 h-36" />
                        <div className="p-5 space-y-3">
                          <div className="bg-slate-700 rounded-lg h-4 w-3/4" />
                          <div className="bg-slate-700 rounded-lg h-3 w-full" />
                          <div className="bg-slate-700 rounded-lg h-3 w-2/3" />
                          <div className="flex gap-2 mt-1">
                            <div className="bg-slate-700 rounded h-3 w-12" />
                            <div className="bg-slate-700 rounded h-3 w-16" />
                          </div>
                          <div className="bg-slate-700 rounded-xl h-10 w-full mt-3" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error state */}
                {!isLoading && fetchError && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-5xl mb-4">⚠️</div>
                    <p className="text-slate-200 font-semibold mb-1">Couldn't load recipes</p>
                    <p className="text-slate-500 text-sm mb-6 max-w-xs">{fetchError}</p>
                    <button
                      onClick={() => setFetchVersion((v) => v + 1)}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Empty results */}
                {!isLoading && !fetchError && recipes.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-5xl mb-4">🍽</div>
                    <p className="text-slate-200 font-semibold mb-1">No recipes found</p>
                    <p className="text-slate-500 text-sm">Try enabling more appliances above.</p>
                  </div>
                )}

                {/* Recipe Grid */}
                {!isLoading && !fetchError && recipes.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {recipes.map((recipe) => {
                      const isSelected = selectedRecipes.has(recipe.id)
                      return (
                        <div
                          key={recipe.id}
                          className={`bg-slate-800 rounded-2xl border-2 shadow-sm overflow-hidden transition-all ${
                            isSelected
                              ? 'border-amber-400 shadow-amber-500/10 shadow-lg'
                              : 'border-slate-700 hover:border-slate-500 hover:shadow-md hover:shadow-black/30'
                          }`}
                        >
                          {/* Card image */}
                          <div className="relative h-36 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                            {recipe.image ? (
                              <img
                                src={recipe.image}
                                alt={recipe.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-5xl">
                                🍽
                              </div>
                            )}
                            {isSelected && (
                              <span className="absolute top-2 right-2 text-xs bg-amber-500/90 text-slate-950 font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">
                                In cart
                              </span>
                            )}
                          </div>

                          <div className="p-5">
                            <h2 className="text-base font-semibold text-slate-100 leading-snug mb-1 line-clamp-2">
                              {recipe.name}
                            </h2>
                            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                              {recipe.description}
                            </p>
                            <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-4">
                              <span>⏱ {recipe.time}</span>
                              <span>🍽 {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}</span>
                              <span>🧂 {recipe.ingredients.length} ingredients</span>
                            </div>
                            <button
                              onClick={() => openRecipe(recipe)}
                              className="w-full text-sm font-semibold py-2.5 rounded-xl transition-colors bg-amber-500 hover:bg-amber-400 text-slate-950"
                            >
                              View Recipe
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Recipe Detail View */
              <div>
                <button
                  onClick={() => setActiveRecipe(null)}
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-100 mb-6 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Recipes
                </button>

                {currentRecipe && (
                  <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-sm overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 overflow-hidden">
                      {currentRecipe.image ? (
                        <img
                          src={currentRecipe.image}
                          alt={currentRecipe.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-8xl">
                          🍽
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h1 className="text-2xl font-bold text-white">{currentRecipe.name}</h1>
                        <button
                          onClick={() => removeRecipe(currentRecipe.id)}
                          className="shrink-0 text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Remove from cart
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm mb-4">{currentRecipe.description}</p>

                      <div className="flex items-center flex-wrap gap-4 text-sm text-slate-500 mb-2 pb-6 border-b border-slate-700">
                        <span>⏱ {currentRecipe.time}</span>
                        <span>🍽 {currentRecipe.servings} serving{currentRecipe.servings !== 1 ? 's' : ''}</span>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-base font-semibold text-white">Ingredients</h2>
                          <p className="text-xs text-slate-500">Uncheck items you already have</p>
                        </div>
                        <ul className="space-y-2">
                          {currentRecipe.ingredients.map((ing) => {
                            const key = `${currentRecipe.id}-${ing.name}`
                            const checked = checkedItems[key] !== false
                            return (
                              <li
                                key={ing.name}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors cursor-pointer select-none ${
                                  checked
                                    ? 'bg-slate-700/50 border-slate-600 hover:bg-slate-700'
                                    : 'bg-slate-800/50 border-slate-700/50'
                                }`}
                                onClick={() => toggleItem(currentRecipe.id, ing.name)}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                                    checked
                                      ? 'bg-amber-500 border-amber-500'
                                      : 'bg-transparent border-slate-600'
                                  }`}
                                >
                                  {checked && (
                                    <svg className="w-3 h-3 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span
                                  className={`flex-1 text-sm font-medium capitalize transition-colors ${
                                    checked ? 'text-slate-100' : 'text-slate-600 line-through'
                                  }`}
                                >
                                  {ing.name}
                                </span>
                                <span className={`text-sm shrink-0 ${checked ? 'text-slate-400' : 'text-slate-700'}`}>
                                  {formatQty(ing.qty)}{ing.unit ? ` ${ing.unit}` : ''}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>

          {/* Master Cart Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-sm sticky top-24">
              <div className="p-5 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-white flex items-center gap-2">
                    <span>🛒</span> Master Cart
                  </h2>
                  {cartItems.length > 0 && (
                    <span className="text-xs bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-400/30">
                      {cartItems.length} items
                    </span>
                  )}
                </div>
                {selectedRecipes.size > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {[...selectedRecipes].map((id) => {
                      const r = recipes.find((x) => x.id === id)
                      if (!r) return null
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 text-xs bg-slate-700 text-slate-300 border border-slate-600 px-2 py-1 rounded-full"
                        >
                          🍽 {r.name}
                        </span>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="p-5">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">🧺</div>
                    <p className="text-sm text-slate-400 font-medium">Your cart is empty</p>
                    <p className="text-xs text-slate-600 mt-1">Open a recipe to add ingredients</p>
                  </div>
                ) : (
                  <ul className="space-y-2 mb-5 max-h-[420px] overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between gap-2 py-2 border-b border-slate-700/50 last:border-0"
                      >
                        <span className="text-sm font-medium text-slate-200 capitalize">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-400 shrink-0 bg-slate-700 px-2 py-0.5 rounded-full">
                          {formatEntries(item.entries)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  disabled={cartItems.length === 0}
                  onClick={() => setShowModal(true)}
                  className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-950 font-bold text-sm py-3 rounded-xl transition-colors"
                >
                  Order Groceries
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Order Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget && !isOrdering) setShowModal(false) }}
        >
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-lg font-bold text-white">Order Summary</h2>
              <button
                onClick={() => !isOrdering && setShowModal(false)}
                disabled={isOrdering}
                className="text-slate-500 hover:text-slate-300 disabled:opacity-30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-slate-400 mb-4">
                <span className="font-semibold text-slate-100">{cartItems.length} items</span>{' '}
                ready to go — copy the list or send directly to Instacart:
              </p>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between gap-3 p-3 bg-slate-700/60 rounded-xl"
                  >
                    <span className="text-sm font-medium text-slate-200 capitalize">{item.name}</span>
                    <span className="text-xs text-slate-400 shrink-0">{formatEntries(item.entries)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-6 pb-6 flex flex-col sm:flex-row gap-3">
              {/* Button A: Copy List */}
              <button
                onClick={copyList}
                disabled={isOrdering || cartItems.length === 0}
                className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl border transition-all disabled:cursor-not-allowed ${
                  isCopied
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white disabled:opacity-40'
                }`}
              >
                {isCopied ? (
                  'List Copied! 📋'
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Copy List
                  </>
                )}
              </button>

              {/* Button B: Send to Instacart */}
              <button
                onClick={exportToInstacart}
                disabled={isOrdering || cartItems.length === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 disabled:cursor-not-allowed text-slate-950 font-bold text-sm py-2.5 rounded-xl transition-colors"
              >
                {isOrdering ? (
                  <>
                    <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Building Cart...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Send to Instacart (Beta)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
