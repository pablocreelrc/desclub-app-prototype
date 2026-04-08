import { useState } from 'react'

const CATEGORIES = [
  { key: null, label: 'Todos', icon: '✦' },
  { key: 'comida', label: 'Comida', icon: null, svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { key: 'cine', label: 'Cine', icon: null, svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/><line x1="17" y1="17" x2="22" y2="17"/></svg> },
  { key: 'retail', label: 'Retail', icon: null, svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
  { key: 'wellness', label: 'Wellness', icon: null, svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { key: 'viajes', label: 'Viajes', icon: null, svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg> },
  { key: 'autos', label: 'Autos', icon: null, svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h2m10 0h2M2 9l2-5h16l2 5M2 9h20v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9z"/><circle cx="7" cy="17" r="1"/><circle cx="17" cy="17" r="1"/></svg> },
]

export default function HomeScreen({ deals, onDealClick }) {
  const [activeCat, setActiveCat] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = deals.filter((d) => {
    if (activeCat && d.catKey !== activeCat) return false
    if (search && !d.brand.toLowerCase().includes(search.toLowerCase()) && !d.cat.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="h-full flex flex-col bg-surface font-va screen-enter">
      {/* Header — warm gradient with texture */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-safe-header md:pt-[60px] pb-6 px-5 relative overflow-hidden">
        {/* Subtle geometric decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-[22px] font-bold tracking-tight">Hola Pablo</h1>
              <p className="text-white/65 text-[13px] mt-0.5 font-medium">{deals.length} descuentos disponibles</p>
            </div>
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-white text-sm font-bold ring-2 ring-white/20">
              PC
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="h-12 bg-white/12 backdrop-blur-sm rounded-2xl flex items-center px-4 gap-3 border border-white/15 transition-colors focus-within:bg-white/18 focus-within:border-white/25">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar marcas, categorías..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/35 font-medium"
              />
              {search && (
                <button onClick={() => setSearch('')} className="text-white/40 hover:text-white/70 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories — clean pills with SVG icons */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCat(cat.key)}
            className={`shrink-0 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              activeCat === cat.key
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white text-gray-600 shadow-sm border border-gray-100 hover:border-gray-200'
            }`}
          >
            {cat.svg || <span className="text-xs">{cat.icon}</span>}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Deal feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Expiring soon banner */}
        {!activeCat && !search && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Últimas horas</h2>
              <button className="text-primary-500 text-xs font-semibold hover:text-primary-600 transition-colors">Ver todas</button>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar">
              {deals.filter(d => parseInt(d.expiry) <= 12).slice(0, 3).map((deal, idx) => (
                <button
                  key={`exp-${deal.id}`}
                  onClick={() => onDealClick(deal)}
                  className={`shrink-0 w-[180px] bg-white rounded-2xl overflow-hidden text-left card-lift shadow-sm border border-gray-100 animate-slide-right stagger-${idx + 1}`}
                >
                  <div className="h-20 relative overflow-hidden">
                    <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute top-2 right-2 bg-accent-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-lg">
                      {deal.expiry}
                    </div>
                  </div>
                  <div className="p-2.5">
                    <p className="font-semibold text-xs text-gray-900 tracking-tight">{deal.brand}</p>
                    <p className="text-accent-500 text-xs font-bold mt-0.5">{deal.discount}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            {activeCat ? CATEGORIES.find(c => c.key === activeCat)?.label : 'Cerca de ti'}
          </h2>
          <span className="text-primary-500 text-sm font-semibold">{filtered.length}</span>
        </div>

        {/* Deal cards grid — refined */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((deal, idx) => (
            <button
              key={deal.id}
              onClick={() => onDealClick(deal)}
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden text-left card-lift animate-scale-in stagger-${Math.min(idx + 1, 8)}`}
            >
              {/* Image with refined overlay */}
              <div className="h-[120px] relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.brand}
                  className="w-full h-full object-cover transition-transform duration-500"
                  style={{ willChange: 'transform' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 bg-accent-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-md">
                  {deal.discount}
                </div>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/25 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {deal.rating}
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-[13px] text-gray-900 tracking-tight">{deal.brand}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 font-medium">{deal.detail}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-400 font-medium">
                  {deal.dist && (
                    <span className="flex items-center gap-0.5">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {deal.dist}
                    </span>
                  )}
                  <span>{deal.cat.replace(/^[^\s]+\s/, '')}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-3 text-gray-300">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <p className="font-semibold text-gray-500">No hay ofertas</p>
            <p className="text-sm mt-1">Prueba otra categoría o búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}
