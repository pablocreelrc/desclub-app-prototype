import { useState } from 'react'

const CATEGORIES = [
  { key: null, label: '🔥 Todos' },
  { key: 'comida', label: '🍔 Comida' },
  { key: 'cine', label: '🎬 Cine' },
  { key: 'retail', label: '🛍 Retail' },
  { key: 'wellness', label: '💆 Wellness' },
  { key: 'viajes', label: '✈️ Viajes' },
  { key: 'autos', label: '🚗 Autos' },
]

export default function HomeScreen({ deals, onDealClick }) {
  const [activeCat, setActiveCat] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = deals.filter((d) => {
    if (activeCat && d.catKey !== activeCat) return false
    if (search && !d.brand.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 pt-14 pb-5 px-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl font-bold">Hola Pablo 👋</h1>
            <p className="text-white/75 text-[13px] mt-0.5">Tienes {deals.length} descuentos cerca de ti</p>
          </div>
          <div className="w-11 h-11 rounded-full bg-white/25 flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/30">
            PC
          </div>
        </div>

        {/* Search */}
        <div className="flex gap-2.5 mt-4">
          <div className="flex-1 h-11 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center px-4 gap-2 border border-white/20">
            <span className="text-white/50 text-sm">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar marcas, categorías..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-white/50 text-xs">✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCat(cat.key)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCat === cat.key
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Deal feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Expiring soon banner */}
        {!activeCat && !search && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-gray-900">⏰ Últimas horas</h2>
              <span className="text-accent-500 text-xs font-medium">Ver todas</span>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
              {deals.filter(d => parseInt(d.expiry) <= 12).slice(0, 3).map((deal) => (
                <button
                  key={`exp-${deal.id}`}
                  onClick={() => onDealClick(deal)}
                  className="shrink-0 w-[200px] bg-red-50 border border-red-100 rounded-2xl overflow-hidden text-left active:scale-[0.97] transition-transform"
                >
                  <div className="h-20 relative overflow-hidden">
                    <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
                    <div className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {deal.expiry}
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="font-semibold text-xs text-gray-900">{deal.brand}</p>
                    <p className="text-accent-500 text-xs font-bold">{deal.discount}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900">
            {activeCat ? CATEGORIES.find(c => c.key === activeCat)?.label : '📍 Cerca de ti'}
          </h2>
          <span className="text-accent-500 text-sm font-medium">{filtered.length} ofertas</span>
        </div>

        {/* Deal cards grid */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((deal) => (
            <button
              key={deal.id}
              onClick={() => onDealClick(deal)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-left active:scale-[0.97] transition-transform group"
            >
              {/* Image */}
              <div className="h-28 relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.brand}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-2 bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                  {deal.discount}
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                  ⭐ {deal.rating}
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm text-gray-900">{deal.brand}</p>
                <p className="text-xs text-gray-500 mt-0.5">{deal.detail}</p>
                <div className="flex items-center gap-2 mt-2 text-[11px] text-gray-400">
                  {deal.dist && <span>📍 {deal.dist}</span>}
                  <span>{deal.cat}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">No hay ofertas</p>
            <p className="text-sm mt-1">Prueba otra categoría o búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
