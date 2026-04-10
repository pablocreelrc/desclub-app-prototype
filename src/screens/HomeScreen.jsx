import { useState } from 'react'

const CATEGORIES = [
  { key: null, label: 'Todos' },
  { key: 'comida', label: 'Comida' },
  { key: 'cine', label: 'Cine' },
  { key: 'retail', label: 'Retail' },
  { key: 'wellness', label: 'Wellness' },
  { key: 'viajes', label: 'Viajes' },
  { key: 'autos', label: 'Autos' },
  { key: 'servicios', label: 'Servicios' },
]

export default function HomeScreen({ deals, onDealClick }) {
  const [activeCat, setActiveCat] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = deals.filter((d) => {
    if (activeCat && d.catKey !== activeCat) return false
    if (search) {
      const q = search.toLowerCase()
      if (!d.brand.toLowerCase().includes(q) && !d.cat.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <div className="flex-1 min-h-0 flex flex-col font-va" style={{ background: '#F7F8F9' }}>
      {/* ── Header ── */}
      <div className="shrink-0 bg-primary-500 px-5 pb-5 pt-safe md:pt-[54px]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-[13px] font-medium">Buenos días</p>
            <h1 className="text-white text-[22px] font-bold leading-tight">Pablo Creel</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-semibold">
            PC
          </div>
        </div>

        {/* Search */}
        <div className="h-11 bg-white/15 rounded-xl flex items-center px-3.5 gap-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar marcas o categorías..."
            className="flex-1 bg-transparent text-white text-[14px] outline-none placeholder:text-white/40 font-medium"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-white/50 text-sm font-bold px-1">✕</button>
          )}
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="shrink-0 bg-white px-4 py-2.5 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCat(cat.key)}
            className={`shrink-0 h-8 px-4 rounded-full text-[13px] font-semibold transition-colors ${
              activeCat === cat.key
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Deal Feed ── */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
        <div className="px-4 pt-4 pb-6">

          {/* Expiring soon — horizontal scroll */}
          {!activeCat && !search && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <h2 className="text-[15px] font-bold text-text-primary">Últimas horas</h2>
                <button onClick={() => setActiveCat(null)} className="text-primary-500 text-[13px] font-semibold active:opacity-70">Ver todo</button>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4">
                {deals.filter(d => parseInt(d.expiry) <= 12).slice(0, 4).map((deal) => (
                  <button
                    key={`exp-${deal.id}`}
                    onClick={() => onDealClick(deal)}
                    className="shrink-0 w-[156px] bg-white rounded-2xl overflow-hidden shadow-sm active:scale-[0.97] transition-transform"
                  >
                    <div className="h-[88px] relative">
                      <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                        {deal.expiry}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-[7px] font-bold shrink-0">{deal.logo}</div>
                        <p className="text-[13px] font-semibold text-text-primary truncate">{deal.brand}</p>
                      </div>
                      <p className="text-accent-500 text-[12px] font-bold">{deal.discount}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section title */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-text-primary">
              {activeCat ? CATEGORIES.find(c => c.key === activeCat)?.label : 'Cerca de ti'}
            </h2>
            <span className="text-text-secondary text-[13px]">{filtered.length} ofertas</span>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((deal, idx) => (
              <button
                key={deal.id}
                onClick={() => onDealClick(deal)}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm text-left active:scale-[0.97] transition-transform animate-scale-in stagger-${Math.min(idx + 1, 8)}`}
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.brand}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute bottom-2 left-2 bg-accent-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
                    {deal.discount}
                  </span>
                  <span className="absolute top-2 right-2 bg-black/30 backdrop-blur-sm text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium">
                    ★ {deal.rating}
                  </span>
                </div>
                <div className="p-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-primary-500 flex items-center justify-center text-white text-[7px] font-bold shrink-0">{deal.logo}</div>
                    <p className="text-[13px] font-semibold text-text-primary truncate">{deal.brand}</p>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5 truncate">{deal.detail}</p>
                  {deal.dist && (
                    <p className="text-[10px] text-text-secondary mt-1 font-medium flex items-center gap-0.5"><svg className="w-2.5 h-2.5 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> {deal.dist}</p>
                  )}
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="flex justify-center mb-2"><svg className="w-10 h-10 text-text-secondary" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>
              <p className="text-[15px] font-semibold text-text-primary">Sin resultados</p>
              <p className="text-[13px] text-text-secondary mt-1">Prueba otra categoría</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
