import { useState } from 'react'

const CATEGORIES = ['🍔 Comida', '🎬 Cine', '🛍 Retail', '💆 Wellness', '✈️ Viajes', '🚗 Autos']

export default function HomeScreen({ deals, onDealClick }) {
  const [activeCat, setActiveCat] = useState(null)

  const filtered = activeCat
    ? deals.filter((d) => d.cat === activeCat)
    : deals

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-primary-500 pt-12 pb-4 px-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">Hola Pablo 👋</h1>
            <p className="text-white/80 text-[13px]">Tienes {deals.length} descuentos cerca de ti</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/25 flex items-center justify-center text-white text-sm font-bold">
            PC
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2.5 mt-4">
          <div className="flex-1 h-10 bg-white/20 rounded-full flex items-center px-4 gap-2">
            <span className="text-white/60 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Buscar marcas, categorías..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/50"
            />
          </div>
          <button className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-white text-sm">
            ⚙
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(activeCat === cat ? null : cat)}
            className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
              activeCat === cat
                ? 'bg-primary-500 text-white'
                : 'bg-surface text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deal feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">📍 Cerca de ti</h2>
          <span className="text-accent-500 text-sm font-medium">Ver todos →</span>
        </div>

        {/* Deal cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((deal) => (
            <button
              key={deal.id}
              onClick={() => onDealClick(deal)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left active:scale-[0.97] transition-transform"
            >
              {/* Image placeholder */}
              <div className="h-24 bg-primary-100 relative">
                <div className="absolute bottom-2 left-2 bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  {deal.discount}
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm text-gray-900">{deal.brand}</p>
                <p className="text-xs text-gray-500 mt-0.5">{deal.detail}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
                  {deal.dist && <span>📍 {deal.dist}</span>}
                  <span>{deal.cat}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-100 flex items-start justify-around pt-3 px-2">
        {[
          { icon: '🏠', label: 'Inicio', active: true },
          { icon: '🔍', label: 'Explorar', active: false },
          { icon: '📍', label: 'Mapa', active: false },
          { icon: '💳', label: 'Tarjeta', active: false },
          { icon: '👤', label: 'Perfil', active: false },
        ].map((tab) => (
          <button key={tab.label} className="flex flex-col items-center gap-0.5">
            <span className="text-lg">{tab.icon}</span>
            <span className={`text-[10px] font-medium ${tab.active ? 'text-primary-500' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
