import { useState } from 'react'

const THEMES = [
  { key: 'desclub', name: 'DescluB', color: '#2196F3', accent: '#FF8C00', bg: '#000', logo: 'DC', tagline: 'Miles de descuentos' },
  { key: 'disney', name: 'Disney+ Perks', color: '#6C3CE1', accent: '#FFD700', bg: '#0C0A1A', logo: 'D+', tagline: 'Beneficios mágicos' },
  { key: 'scotia', name: 'Scotiabank', color: '#EC111A', accent: '#FFFFFF', bg: '#1A0000', logo: 'SB', tagline: 'Más beneficios para ti' },
  { key: 'tamex', name: 'TAMEX Rewards', color: '#00875A', accent: '#FFB800', bg: '#001A0F', logo: 'TX', tagline: 'Puntos que valen' },
]

export default function ThemeDemo({ onClose }) {
  const [active, setActive] = useState('desclub')
  const theme = THEMES.find(t => t.key === active)

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-[70] flex flex-col" onClick={onClose}>
      <div className="flex-1 flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="shrink-0 pt-safe md:pt-14 px-5 pb-3 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Tu marca, nuestra app</p>
            <h2 className="text-white text-lg font-bold">Tu marca, nuestra plataforma</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-sm">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Theme pills */}
        <div className="shrink-0 flex gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
          {THEMES.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                active === t.key ? 'text-white' : 'bg-white/5 text-white/40 border border-white/10'
              }`}
              style={active === t.key ? { background: t.color, boxShadow: `0 4px 14px ${t.color}55` } : {}}
            >
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: active === t.key ? 'rgba(255,255,255,0.25)' : t.color, color: '#fff' }}>
                {t.logo}
              </span>
              {t.name}
            </button>
          ))}
        </div>

        {/* Phone preview */}
        <div className="flex-1 flex items-center justify-center px-8 pb-8">
          <div className="w-full max-w-[300px] rounded-[40px] overflow-hidden border-2 border-white/10 shadow-2xl" style={{ background: theme.bg }}>
            {/* Fake status bar */}
            <div className="h-11 flex items-end justify-between px-6 pb-1">
              <span className="text-white text-[11px] font-semibold">9:41</span>
              <div className="flex gap-1.5 items-center">
                <div className="w-3.5 h-2.5 border border-white/50 rounded-sm"><div className="w-2 h-1.5 bg-white/80 rounded-[1px] ml-[1px] mt-[1px]" /></div>
              </div>
            </div>

            {/* App header */}
            <div className="px-5 pt-3 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: theme.color }}>
                    {theme.logo}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{theme.name}</p>
                    <p className="text-white/40 text-[10px]">{theme.tagline}</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PC</span>
                </div>
              </div>

              {/* Search */}
              <div className="h-9 bg-white/5 border border-white/10 rounded-xl flex items-center px-3 gap-2">
                <svg className="w-3.5 h-3.5 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <span className="text-white/20 text-xs">Buscar ofertas...</span>
              </div>
            </div>

            {/* Deal cards */}
            <div className="px-5 pb-5 space-y-2.5">
              {[
                { name: 'Cinépolis', discount: '2x1', sub: 'Boletos Martes y Jueves' },
                { name: 'Starbucks', discount: '15% OFF', sub: 'Todas las bebidas' },
                { name: 'Liverpool', discount: '20% OFF', sub: 'Ropa y accesorios' },
              ].map((deal, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl p-3">
                  <div className="w-11 h-11 rounded-lg skeleton" />
                  <div className="flex-1">
                    <p className="text-white text-xs font-semibold">{deal.name}</p>
                    <p className="text-white/30 text-[10px]">{deal.sub}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg text-white" style={{ background: theme.color }}>{deal.discount}</span>
                </div>
              ))}
            </div>

            {/* Bottom tab bar */}
            <div className="flex items-center justify-around px-4 py-2.5 border-t border-white/5">
              {['Inicio', 'Ofertas', 'Tarjeta', 'Perfil'].map((tab, i) => (
                <div key={tab} className="flex flex-col items-center gap-0.5">
                  <div className={`w-5 h-5 rounded-full ${i === 0 ? '' : 'bg-white/5'}`} style={i === 0 ? { background: theme.color } : {}} />
                  <span className={`text-[8px] font-semibold ${i === 0 ? 'text-white' : 'text-white/25'}`}>{tab}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
