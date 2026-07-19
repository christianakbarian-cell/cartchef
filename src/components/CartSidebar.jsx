import { useState } from 'react'
import { formatEntries } from '../utils/format'

function buildListText(cartItems) {
  return cartItems
    .map((item) => {
      const qty = formatEntries(item.entries)
      const name = item.name.replace(/\b\w/g, (c) => c.toUpperCase())
      return qty ? `[ ] ${qty} ${name}` : `[ ] ${name}`
    })
    .join('\n')
}

export default function CartSidebar({ cartItems, selectedRecipes, recipes }) {
  const [isCopied, setIsCopied] = useState(false)

  async function copyList() {
    const text = buildListText(cartItems)
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <aside className="lg:w-80 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <span>🛒</span> Master Cart
            </h2>
            {cartItems.length > 0 && (
              <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
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
                    className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded-full"
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
              <p className="text-sm text-slate-500 font-medium">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1">Open a recipe to add ingredients</p>
            </div>
          ) : (
            <pre className="mb-5 max-h-[420px] overflow-y-auto pr-1 whitespace-pre-wrap font-sans text-sm text-slate-800 leading-relaxed select-text">
              {buildListText(cartItems)}
            </pre>
          )}

          <button
            disabled={cartItems.length === 0}
            onClick={copyList}
            className={`w-full font-bold text-sm py-3 rounded-xl transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed ${
              isCopied
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-500 hover:bg-amber-400 text-white'
            }`}
          >
            {isCopied ? 'Copied! ✓' : 'Copy List'}
          </button>
        </div>
      </div>
    </aside>
  )
}
