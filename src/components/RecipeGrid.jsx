import RecipeCard from './RecipeCard'
import { formatQty } from '../utils/format'

export default function RecipeGrid({
  recipes,
  selectedRecipes,
  activeRecipe,
  checkedItems,
  isLoading,
  fetchError,
  isDescExpanded,
  onOpenRecipe,
  onBack,
  onRemoveRecipe,
  onToggleItem,
  onToggleDescExpanded,
  onRetry,
  applianceFilters,
}) {
  const currentRecipe = recipes.find((r) => r.id === activeRecipe)

  if (activeRecipe) {
    return (
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Recipes
        </button>

        {currentRecipe && (() => {
          const highResImage = currentRecipe.image
            ? currentRecipe.image.replace('312x231', '636x393')
            : null
          return (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {highResImage ? (
                  <img
                    src={highResImage}
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
                  <h1 className="text-2xl font-bold text-slate-900">{currentRecipe.name}</h1>
                  <button
                    onClick={() => onRemoveRecipe(currentRecipe.id)}
                    className="shrink-0 text-xs text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Remove from cart
                  </button>
                </div>
                {(() => {
                  const THRESHOLD = 180
                  const desc = currentRecipe.description.replace(/<[^>]*>/g, '').trim()
                  const isLong = desc.length > THRESHOLD
                  return (
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      {isLong && !isDescExpanded ? (
                        <>
                          {desc.slice(0, THRESHOLD)}
                          {'… '}
                          <button
                            onClick={() => onToggleDescExpanded(true)}
                            className="text-amber-600 hover:text-amber-700 font-medium inline-block transition-colors"
                          >
                            View More
                          </button>
                        </>
                      ) : (
                        <>
                          {desc}
                          {isLong && (
                            <>
                              {' '}
                              <button
                                onClick={() => onToggleDescExpanded(false)}
                                className="text-amber-600 hover:text-amber-700 font-medium ml-1 inline-block transition-colors"
                              >
                                View Less
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </p>
                  )
                })()}

                <div className="flex items-center flex-wrap gap-4 text-sm text-slate-400 mb-2 pb-6 border-b border-gray-200">
                  <span>⏱ {currentRecipe.time}</span>
                  <span>🍽 {currentRecipe.servings} serving{currentRecipe.servings !== 1 ? 's' : ''}</span>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-slate-900">Ingredients</h2>
                    <p className="text-xs text-slate-400">Uncheck items you already have</p>
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
                              ? 'bg-white border-gray-200 hover:bg-gray-50'
                              : 'bg-gray-50 border-gray-100'
                          }`}
                          onClick={() => onToggleItem(currentRecipe.id, ing.name)}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                              checked
                                ? 'bg-amber-500 border-amber-500'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {checked && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <span
                            className={`flex-1 text-sm font-medium capitalize transition-colors ${
                              checked ? 'text-slate-800' : 'text-slate-400 line-through'
                            }`}
                          >
                            {ing.name}
                          </span>
                          <span className={`text-sm shrink-0 ${checked ? 'text-slate-500' : 'text-slate-300'}`}>
                            {formatQty(ing.qty)}{ing.unit ? ` ${ing.unit}` : ''}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Recipes</h1>
        <p className="text-slate-500 mt-1 text-sm">
          Select your gear below — we'll find recipes that match.
        </p>
      </div>

      {applianceFilters}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse shadow-sm">
              <div className="bg-gray-200 h-36" />
              <div className="p-5 space-y-3">
                <div className="bg-gray-200 rounded-lg h-4 w-3/4" />
                <div className="bg-gray-200 rounded-lg h-3 w-full" />
                <div className="bg-gray-200 rounded-lg h-3 w-2/3" />
                <div className="flex gap-2 mt-1">
                  <div className="bg-gray-200 rounded h-3 w-12" />
                  <div className="bg-gray-200 rounded h-3 w-16" />
                </div>
                <div className="bg-gray-200 rounded-xl h-10 w-full mt-3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && fetchError && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="text-slate-800 font-semibold mb-1">Couldn't load recipes</p>
          <p className="text-slate-500 text-sm mb-6 max-w-xs">{fetchError}</p>
          <button
            onClick={onRetry}
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !fetchError && recipes.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-5xl mb-4">🍽</div>
          <p className="text-slate-800 font-semibold mb-1">No recipes found</p>
          <p className="text-slate-500 text-sm">Try enabling more appliances above.</p>
        </div>
      )}

      {!isLoading && !fetchError && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isSelected={selectedRecipes.has(recipe.id)}
              onOpen={onOpenRecipe}
            />
          ))}
        </div>
      )}
    </div>
  )
}
