export default function ApplianceFilters({ applianceList, appliances, onToggle }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
      <h2 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
        <span>🔌</span> Your Appliances
      </h2>
      <div className="flex flex-wrap gap-3">
        {applianceList.map((appliance) => {
          const active = appliances[appliance.id]
          return (
            <button
              key={appliance.id}
              onClick={() => onToggle(appliance.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all select-none ${
                active
                  ? 'bg-amber-50 border-amber-300 text-amber-700'
                  : 'bg-gray-100 border-gray-200 text-slate-400 line-through'
              }`}
            >
              <span>{appliance.emoji}</span>
              {appliance.label}
              {active && (
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
