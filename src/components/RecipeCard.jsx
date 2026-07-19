export default function RecipeCard({ recipe, isSelected, onOpen }) {
  const isFeatured = String(recipe.id).startsWith('90000')

  return (
    <div
      className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden transition-all ${
        isSelected
          ? 'border-amber-400 shadow-amber-500/20 shadow-lg'
          : isFeatured
          ? 'border-violet-200 hover:border-violet-300 hover:shadow-md'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="relative h-36 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
        {isFeatured && !isSelected && (
          <span className="absolute bottom-2 left-2 text-xs bg-violet-500 text-white font-semibold px-2 py-0.5 rounded-full shadow">
            ⭐ Featured
          </span>
        )}
        {isSelected && (
          <span className="absolute top-2 right-2 text-xs bg-amber-500 text-white font-semibold px-2 py-0.5 rounded-full shadow">
            In cart
          </span>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-base font-semibold text-slate-900 leading-snug mb-1 line-clamp-2">
          {recipe.name}
        </h2>
        <p className="text-sm text-slate-500 mb-4 line-clamp-3">
          {recipe.description}
        </p>
        <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 mb-4">
          <span>⏱ {recipe.time}</span>
          <span>🍽 {recipe.servings} serving{recipe.servings !== 1 ? 's' : ''}</span>
          <span>🧂 {recipe.ingredients.length} ingredients</span>
        </div>
        <button
          onClick={() => onOpen(recipe)}
          className="w-full text-sm font-semibold py-2.5 rounded-xl transition-colors bg-amber-500 hover:bg-amber-400 text-white"
        >
          View Recipe
        </button>
      </div>
    </div>
  )
}
