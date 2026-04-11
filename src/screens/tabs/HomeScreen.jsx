import { useApp } from '../../context/AppContext'
import { DEALS } from '../../data/deals'
import { USER } from '../../data/user'
import SearchBar from '../../components/SearchBar'

const categories = [
  { path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', label: 'Comida', catKey: 'Comida' },
  { path: 'M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5S10.07 5 12 5zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V18z', label: 'Cine', catKey: 'Cine' },
  { path: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z', label: 'Fitness', catKey: 'Wellness' },
  { path: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z', label: 'Experiencias', catKey: 'Entretenimiento' },
  { path: 'M21 8H7V6H21M21 16H7v-2H21M21 12H7v-2H21M3 8V6H1v2H3M3 16V14H1v2H3M3 12V10H1v2H3', label: 'Retail', catKey: 'Retail' },
  { path: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z', label: 'Viajes', catKey: 'Viajes' },
]

export default function HomeScreen({ onCategorySelect }) {
  const { navigate } = useApp()

  const handleCategoryClick = (cat) => {
    if (onCategorySelect) onCategorySelect(cat.catKey)
  }

  return (
    <div className="pb-6">
      {/* Location header banner */}
      <div className="h-32 bg-gradient-to-b from-[#1a2a4a] to-[#0f0f18] relative px-5 pt-3 flex items-end pb-4">
        <div className="absolute inset-0 opacity-20" style={{ background: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop") center/cover' }} />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span className="text-white text-sm font-semibold">CDMX</span>
            <span className="text-[#555] text-xs">&bull; {DEALS.length} ofertas cerca</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Search bar */}
        <div className="mb-4">
          <SearchBar deals={DEALS} onDealClick={(deal) => navigate('detail', deal)} variant="dark" />
        </div>

        {/* Welcome section */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-white text-sm font-bold">{USER.initials}</div>
          <div>
            <p className="text-white text-base font-bold">Bienvenido, {USER.name.split(' ')[0]}</p>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs font-semibold">{USER.tier}</span>
              <span className="text-[#555] text-xs">&bull; Miembro desde {USER.memberSince}</span>
            </div>
          </div>
        </div>

        {/* Category grid */}
        <h3 className="text-white text-lg font-bold mb-1">Explora por categoria</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map((c) => (
            <button key={c.label} onClick={() => handleCategoryClick(c)} className="bg-[#111] border border-[#1a1a1a] rounded-xl py-3.5 text-center active:bg-[#1a1a1a] transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-400 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d={c.path} />
              </svg>
              <p className="text-white text-xs font-medium mt-1">{c.label}</p>
            </button>
          ))}
        </div>

        {/* Termina pronto - horizontal scroll */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white text-lg font-bold">Termina pronto</h3>
          <span className="text-red-400 text-[10px] font-bold bg-red-500/10 px-2 py-0.5 rounded-full">En vivo</span>
        </div>
        <div className="w-12 h-0.5 bg-red-500 mb-3" />
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 mb-8">
          {DEALS.filter(d => parseInt(d.expiry) <= 12).slice(0, 4).map(deal => (
            <button key={`exp-${deal.id}`} onClick={() => navigate('detail', deal)} className="shrink-0 w-[140px] bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden active:scale-[0.97] transition-transform">
              <div className="h-20 relative">
                <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">{deal.expiry}</span>
              </div>
              <div className="p-2.5">
                <div className="flex items-center gap-1">
                  <img src={deal.logo} alt={deal.brand} className="w-4 h-4 rounded-full object-contain bg-white shrink-0" />
                  <p className="text-white text-xs font-semibold truncate">{deal.brand}</p>
                </div>
                <p className="text-blue-400 text-[11px] font-bold">{deal.discount}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Para ti - featured cards */}
        <h3 className="text-white text-lg font-bold mb-1">Para ti</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        {DEALS.slice(0, 2).map((deal) => (
          <button key={deal.id} onClick={() => navigate('detail', deal)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl mb-3 overflow-hidden text-left active:scale-[0.98] transition-transform">
            <img src={deal.image} alt={deal.brand} className="w-full h-32 object-cover" loading="lazy" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <img src={deal.logo} alt={deal.brand} className="w-5 h-5 rounded-full object-contain bg-white shrink-0" />
                    <p className="text-white font-bold text-sm">{deal.brand}</p>
                  </div>
                  <p className="text-[#888] text-xs mt-0.5">{deal.dist ? `${deal.dist} \u2022 ` : ''}{deal.cat} &bull; {deal.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-blue-400 text-xs font-bold bg-blue-500/15 px-2.5 py-1 rounded-lg">{deal.points} Puntos</span>
                <span className="text-white text-xs font-bold bg-[#333] px-2.5 py-1 rounded-lg">{deal.discount}</span>
              </div>
            </div>
          </button>
        ))}

        {/* Experiencias cerca de ti */}
        <h3 className="text-white text-lg font-bold mt-8 mb-1">Experiencias cerca de ti</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        <button onClick={() => navigate('detail', DEALS[3])} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform mb-3">
          <div className="relative">
            <img src={DEALS[3].image} alt={DEALS[3].brand} className="w-full h-28 object-cover" loading="lazy" />
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
              <svg className="w-2.5 h-2.5 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z"/></svg>
              Termina en {DEALS[3].expiry}
            </div>
          </div>
          <div className="p-4">
            <p className="text-white font-bold text-sm">{DEALS[3].brand} &mdash; {DEALS[3].discount}</p>
            <p className="text-[#888] text-xs mt-1">{DEALS[3].description.slice(0, 70)}...</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[#888] text-xs border border-[#333] px-2.5 py-1 rounded-lg">Hoy: 6:00 AM</span>
              <span className="text-[#888] text-xs border border-[#333] px-2.5 py-1 rounded-lg">7:00 AM</span>
              <span className="text-[#888] text-xs border border-[#333] px-2.5 py-1 rounded-lg">8:00 AM</span>
            </div>
          </div>
        </button>

        {/* Top comercios */}
        <h3 className="text-white text-lg font-bold mt-8 mb-1">Top comercios</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        {DEALS.slice(4, 8).map((deal) => (
          <button key={deal.id} onClick={() => navigate('detail', deal)} className="w-full flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-3 mb-2 active:bg-[#1a1a1a]">
            <img src={deal.image} alt={deal.brand} className="w-14 h-14 rounded-lg object-cover" loading="lazy" />
            <div className="flex-1 text-left">
              <div className="flex items-center gap-1.5">
                <img src={deal.logo} alt={deal.brand} className="w-4 h-4 rounded-full object-contain bg-white shrink-0" />
                <p className="text-white text-sm font-semibold">{deal.brand}</p>
              </div>
              <p className="text-[#666] text-xs">{deal.detail}</p>
              <span className="text-blue-400 text-xs font-bold">{deal.points} Puntos</span>
            </div>
            <span className="text-white text-xs font-bold bg-[#333] px-2 py-1 rounded-lg">{deal.discount}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
