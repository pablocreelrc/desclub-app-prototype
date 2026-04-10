import { useState } from 'react'

export default function SearchBar({ deals, onDealClick, variant = 'dark' }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const isDark = variant === 'dark'

  const results = query.length >= 2
    ? deals.filter(d => d.brand.toLowerCase().includes(query.toLowerCase()) || d.cat?.toLowerCase().includes(query.toLowerCase()) || d.detail?.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : []

  return (
    <div className="relative">
      <div className={`h-10 ${isDark ? 'bg-[#111] border-[#1a1a1a]' : 'bg-white/15'} border rounded-xl flex items-center px-3 gap-2`}>
        <svg className={`w-4 h-4 ${isDark ? 'text-[#555]' : 'text-white/50'} shrink-0`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Buscar marcas o categorías..."
          className={`flex-1 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder:text-[#555]' : 'text-white placeholder:text-white/40'}`}
        />
        {query && (
          <button onClick={() => setQuery('')} className={`text-xs font-bold px-1 ${isDark ? 'text-[#555]' : 'text-white/50'}`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {focused && results.length > 0 && (
        <div className={`absolute top-12 left-0 right-0 ${isDark ? 'bg-[#111] border-[#222]' : 'bg-black/90 border-white/10'} border rounded-xl overflow-hidden z-30 shadow-xl`}>
          {results.map(deal => (
            <button
              key={deal.id}
              onClick={() => { onDealClick(deal); setQuery(''); setFocused(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left ${isDark ? 'active:bg-[#1a1a1a]' : 'active:bg-white/10'} border-b ${isDark ? 'border-[#1a1a1a]' : 'border-white/5'} last:border-0`}
            >
              <img src={deal.image} alt={deal.brand} className="w-10 h-10 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{deal.brand}</p>
                <p className={`text-xs ${isDark ? 'text-[#666]' : 'text-white/50'} truncate`}>{deal.detail}</p>
              </div>
              <span className="text-white text-xs font-bold shrink-0">{deal.discount}</span>
            </button>
          ))}
        </div>
      )}

      {focused && query.length >= 2 && results.length === 0 && (
        <div className={`absolute top-12 left-0 right-0 ${isDark ? 'bg-[#111] border-[#222]' : 'bg-black/90 border-white/10'} border rounded-xl p-4 text-center z-30`}>
          <p className="text-[#888] text-sm">Sin resultados para "{query}"</p>
        </div>
      )}
    </div>
  )
}
