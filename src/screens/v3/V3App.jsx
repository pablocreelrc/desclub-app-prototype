import { useState } from 'react'
import V3Login from './V3Login'
import Onboarding from '../../components/Onboarding'
import RedemptionFlow from '../../components/RedemptionFlow'
import SearchBar from '../../components/SearchBar'
import NotificationsPanel from '../../components/NotificationsPanel'
import StatusBar from '../../components/StatusBar'
import { DEALS } from '../../data/deals'

const TAB_ICONS = {
  explore: 'M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  deals: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z M7 7h.01',
  center: 'M12 2L12 22 M2 12L22 12 M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10a10 10 0 0 1-10-10A10 10 0 0 1 12 2z',
  rewards: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  wallet: 'M1 4h22v16H1z M1 10h22',
}
const TABS = [
  { key: 'explore', label: 'Explorar' },
  { key: 'deals', label: 'Ofertas' },
  { key: 'center', label: 'DC' },
  { key: 'rewards', label: 'Puntos' },
  { key: 'wallet', label: 'Cartera' },
]

/* Full-screen Deal Detail Page */
function DealDetail({ deal, onBack }) {
  const [showQR, setShowQR] = useState(false)
  if (!deal) return null

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black relative">
      <StatusBar variant="dark" />
      {/* Hero image */}
      <div className="h-64 relative shrink-0 overflow-hidden">
        <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-black/30" />
        <button
          onClick={onBack}
          className="absolute top-[max(env(safe-area-inset-top,12px),12px)] md:top-14 left-5 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg active:scale-90 transition-transform"
        >
          ←
        </button>
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <span className="bg-blue-500 text-white text-2xl font-bold px-5 py-2.5 rounded-2xl shadow-lg">{deal.discount}</span>
          <span className="bg-blue-500/30 text-blue-400 text-sm font-bold px-3 py-2 rounded-xl">{deal.points} puntos</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <h1 className="text-3xl font-bold text-white">{deal.brand}</h1>
        <p className="text-sm text-[#888] mt-1.5">{deal.cat} • {deal.dist || 'Online'} • {deal.detail}</p>

        <p className="text-[15px] text-[#aaa] mt-5 leading-relaxed">{deal.description}</p>

        {/* Meta chips */}
        <div className="flex gap-2 mt-5 flex-wrap">
          <span className="bg-red-500/15 text-red-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
            Vence en {deal.expiry}
          </span>
          <span className="bg-blue-500/15 text-blue-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
            {deal.redeemed.toLocaleString()} canjearon
          </span>
          {deal.redeemed > 200 && (
            <span className="bg-orange-500/15 text-orange-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
              Popular
            </span>
          )}
        </div>

        {/* How to redeem */}
        <div className="bg-blue-500/10 rounded-2xl p-4 mt-6 border border-blue-500/20">
          <h3 className="font-semibold text-sm text-blue-400 mb-2">Cómo canjear</h3>
          <div className="flex gap-3">
            {['Muestra tu QR', 'El comercio lo escanea', 'Gana puntos extras'].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mx-auto mb-1.5">
                  {i + 1}
                </div>
                <p className="text-[11px] text-blue-300 leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-[#111] rounded-2xl p-4 mt-4 border border-[#2a2a3a]">
          <h3 className="font-semibold text-sm text-white mb-2">Términos y condiciones</h3>
          <ul className="space-y-1.5">
            {deal.terms.map((t, i) => (
              <li key={i} className="text-[13px] text-[#888] flex items-start gap-2">
                <span className="text-[#444] mt-0.5">•</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Redemption Flow */}
      {showQR && <RedemptionFlow deal={deal} variant="dark" onClose={() => setShowQR(false)} />}

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-[#1a1a25] px-5 pt-3 flex gap-2" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
        <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${deal.brand}: ${deal.discount} - ${deal.detail}. Descarga DescluB: desclub.com.mx`)}`, '_blank')} className="w-12 h-[52px] bg-[#25D366] rounded-2xl flex items-center justify-center active:scale-95 transition-transform shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        </button>
        <button
          onClick={() => setShowQR(true)}
          className="flex-1 h-[52px] bg-white text-black rounded-2xl flex items-center justify-center font-bold text-[17px] active:scale-[0.97] transition-transform"
        >
          Canjear descuento
        </button>
      </div>
    </div>
  )
}

function ExploreTab({ onDealClick, onCategoryClick }) {
  const categories = [
    { path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', label: 'Comida' },
    { path: 'M19 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 12 12 12s-3.5-1.57-3.5-3.5S10.07 5 12 5zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V18z', label: 'Cine' },
    { path: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z', label: 'Fitness' },
    { path: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z', label: 'Experiencias' },
    { path: 'M21 8H7V6H21M21 16H7v-2H21M21 12H7v-2H21M3 8V6H1v2H3M3 16V14H1v2H3M3 12V10H1v2H3', label: 'Retail' },
    { path: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z', label: 'Viajes' },
  ]
  return (
    <div className="pb-6">
      {/* Hero banner */}
      <div className="h-32 bg-gradient-to-b from-[#1a2a4a] to-[#0f0f18] relative px-5 pt-3 flex items-end pb-4">
        <div className="absolute inset-0 opacity-20" style={{ background: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop") center/cover' }} />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-400" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            <span className="text-white text-sm font-semibold">CDMX</span>
            <span className="text-[#555] text-xs">• {DEALS.length} ofertas cerca</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Search */}
        <div className="mb-4">
          <SearchBar deals={DEALS} onDealClick={onDealClick} variant="dark" />
        </div>

        {/* Welcome */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-white text-sm font-bold">PC</div>
          <div>
            <p className="text-white text-base font-bold">Bienvenido, Pablo</p>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs font-semibold">Gold</span>
              <span className="text-[#555] text-xs">• Miembro desde '24</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <h3 className="text-white text-lg font-bold mb-1">Explora por categoría</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map((c) => (
            <button key={c.label} onClick={() => onCategoryClick && onCategoryClick(c.label)} className="bg-[#111] border border-[#1a1a1a] rounded-xl py-3.5 text-center active:bg-[#1a1a1a] transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-400 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d={c.path} />
              </svg>
              <p className="text-white text-xs font-medium mt-1">{c.label}</p>
            </button>
          ))}
        </div>

        {/* Expiring soon */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-white text-lg font-bold">Termina pronto</h3>
          <span className="text-red-400 text-[10px] font-bold bg-red-500/10 px-2 py-0.5 rounded-full">En vivo</span>
        </div>
        <div className="w-12 h-0.5 bg-red-500 mb-3" />
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 mb-8">
          {DEALS.filter(d => parseInt(d.expiry) <= 12).slice(0, 3).map(deal => (
            <button key={`exp-${deal.id}`} onClick={() => onDealClick(deal)} className="shrink-0 w-[140px] bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden active:scale-[0.97] transition-transform">
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

        {/* Picks for you */}
        <h3 className="text-white text-lg font-bold mb-1">Para ti</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        {DEALS.slice(0, 2).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl mb-3 overflow-hidden text-left active:scale-[0.98] transition-transform">
            <img src={deal.image} alt={deal.brand} className="w-full h-32 object-cover" loading="lazy" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <img src={deal.logo} alt={deal.brand} className="w-5 h-5 rounded-full object-contain bg-white shrink-0" />
                    <p className="text-white font-bold text-sm">{deal.brand}</p>
                  </div>
                  <p className="text-[#888] text-xs mt-0.5">{deal.dist ? `${deal.dist} • ` : ''}{deal.cat} • {deal.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-blue-400 text-xs font-bold bg-blue-500/15 px-2.5 py-1 rounded-lg">{deal.points} Puntos</span>
                <span className="text-white text-xs font-bold bg-[#333] px-2.5 py-1 rounded-lg">{deal.discount}</span>
              </div>
            </div>
          </button>
        ))}

        {/* Experiences */}
        <h3 className="text-white text-lg font-bold mt-8 mb-1">Experiencias cerca de ti</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        <button onClick={() => onDealClick(DEALS[3])} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform mb-3">
          <div className="relative">
            <img src={DEALS[3].image} alt="Sport City" className="w-full h-28 object-cover" loading="lazy" />
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5"><svg className="w-2.5 h-2.5 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z"/></svg> Termina en 15d 22h</div>
          </div>
          <div className="p-4">
            <p className="text-white font-bold text-sm">Sport City — 3 días GRATIS</p>
            <p className="text-[#888] text-xs mt-1">Pase de cortesía completo a todas las instalaciones</p>
            <div className="flex items-center gap-3 mt-3">
              <span className="text-[#888] text-xs border border-[#333] px-2.5 py-1 rounded-lg">Hoy: 6:00 AM</span>
              <span className="text-[#888] text-xs border border-[#333] px-2.5 py-1 rounded-lg">7:00 AM</span>
              <span className="text-[#888] text-xs border border-[#333] px-2.5 py-1 rounded-lg">8:00 AM</span>
            </div>
          </div>
        </button>

        {/* More deals */}
        <h3 className="text-white text-lg font-bold mt-8 mb-1">Top comercios</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        {DEALS.slice(4, 8).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-3 mb-2 active:bg-[#1a1a1a]">
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

function DealsTab({ onDealClick, initialCategory }) {
  const catMap = { 'Comida': 'Comida', 'Cine': 'Cine', 'Fitness': 'Wellness', 'Experiencias': 'Entretenimiento', 'Retail': 'Retail', 'Viajes': 'Viajes' }
  const [activeCat, setActiveCat] = useState(initialCategory ? (catMap[initialCategory] || null) : null)
  const cats = [null, 'Comida', 'Cine', 'Retail', 'Wellness', 'Viajes', 'Autos', 'Entretenimiento', 'Servicios']
  const catLabels = { null: 'Todos', 'Comida': 'Comida', 'Cine': 'Cine', 'Retail': 'Retail', 'Wellness': 'Wellness', 'Viajes': 'Viajes', 'Autos': 'Autos', 'Entretenimiento': 'Eventos', 'Servicios': 'Servicios' }

  const filtered = activeCat ? DEALS.filter(d => d.cat === activeCat) : DEALS

  return (
    <div className="px-5 pb-6 pt-2 overflow-x-hidden">
      <h2 className="text-white text-2xl font-bold mb-1">Todas las ofertas</h2>
      <p className="text-[#888] text-sm mb-4">{filtered.length} descuentos disponibles</p>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
        {cats.map((cat) => (
          <button
            key={String(cat)}
            onClick={() => setActiveCat(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCat === cat
                ? 'bg-white text-black'
                : 'bg-[#111] border border-[#1a1a1a] text-[#888]'
            }`}
          >
            {catLabels[cat]}
          </button>
        ))}
      </div>

      {/* Deal list */}
      <div className="space-y-3">
        {filtered.map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform">
            <div className="relative h-36">
              <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <img src={deal.logo} alt={deal.brand} className="w-5 h-5 rounded-full object-contain bg-white shrink-0" />
                    <p className="text-white font-bold text-base">{deal.brand}</p>
                  </div>
                  <p className="text-gray-300 text-xs mt-0.5">{deal.detail}</p>
                </div>
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">{deal.discount}</span>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {deal.dist && <span className="text-[#888] text-xs flex items-center gap-0.5"><svg className="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> {deal.dist}</span>}
                <span className="text-[#555] text-xs">{deal.cat}</span>
              </div>
              <span className="text-blue-400 text-xs font-bold">{deal.points} pts</span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#555]">
          <div className="flex justify-center mb-3"><svg className="w-10 h-10 text-[#555]" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>
          <p className="font-medium text-white">No hay ofertas en esta categoría</p>
          <p className="text-sm mt-1">Prueba otra categoría</p>
        </div>
      )}
    </div>
  )
}

function MyAccountTab() {
  return (
    <div className="px-5 pb-6 pt-2">
      <h2 className="text-white text-2xl font-bold mb-1">Mi Cuenta</h2>
      <p className="text-[#888] text-sm mb-5">Tu resumen DescluB</p>

      {/* Balance card */}
      <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 mb-5">
        <p className="text-[#888] text-xs mb-1">Tu ahorro acumulado</p>
        <p className="text-white text-4xl font-bold">$18,320</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-blue-400 text-xs font-semibold">✓ 1,250 puntos disponibles</span>
        </div>
        <div className="mt-4 space-y-3">
          <button className="w-full flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-3"><svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z"/></svg><span className="text-white text-sm font-semibold">Historial de canjes</span></div>
            <span className="text-[#444]">›</span>
          </button>
          <button className="w-full flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-3"><svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg><span className="text-white text-sm font-semibold">Alertas de ofertas</span></div>
            <span className="text-blue-400 text-xs font-semibold">On</span>
          </button>
          <button className="w-full flex items-center justify-between py-3">
            <div className="flex items-center gap-3"><svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg><span className="text-white text-sm font-semibold">Pagar con puntos</span></div>
            <span className="text-[#888] text-xs bg-[#1a1a1a] px-2 py-0.5 rounded">Gana 1,000 pts mínimo</span>
          </button>
        </div>
      </div>

      {/* Recent activity */}
      <h3 className="text-white text-base font-bold mb-3">Actividad reciente</h3>
      {[
        { icon: '🎟', label: 'Canje en Cinépolis', date: 'Hoy', pts: '+50 pts' },
        { icon: '☕', label: 'Canje en Starbucks', date: 'Ayer', pts: '+30 pts' },
        { icon: '🛍', label: 'Canje en Liverpool', date: '3 abr', pts: '+120 pts' },
      ].map((a, i) => (
        <div key={i} className="flex items-center gap-3 py-3 border-b border-[#1a1a25]">
          <div className="w-10 h-10 bg-[#111] border border-[#1a1a1a] rounded-xl flex items-center justify-center text-sm">{a.icon}</div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{a.label}</p>
            <p className="text-[#555] text-xs">{a.date}</p>
          </div>
          <span className="text-blue-400 text-xs font-bold">{a.pts}</span>
        </div>
      ))}

      {/* WhatsApp support */}
      <button
        onClick={() => window.open('https://wa.me/525500000000', '_blank')}
        className="w-full h-12 bg-[#25D366]/15 border border-[#25D366]/30 rounded-2xl text-[#25D366] text-sm font-semibold flex items-center justify-center gap-2 mt-6 active:bg-[#25D366]/25"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg> Soporte vía WhatsApp
      </button>
    </div>
  )
}

function RewardsTab({ onDealClick }) {
  const [redeemTab, setRedeemTab] = useState('Experiencias')
  const rTabs = ['Experiencias', 'Viajes', 'Transferir']

  return (
    <div className="px-5 pb-6 pt-2">
      <h2 className="text-white text-2xl font-bold mb-0.5">Canjea tus puntos</h2>
      <p className="text-blue-400 text-base font-semibold mb-5">Experiencias, viajes y más</p>

      <div className="flex gap-0 bg-[#111] rounded-xl p-1 mb-5 border border-[#2a2a3a]">
        {rTabs.map((t) => (
          <button key={t} onClick={() => setRedeemTab(t)} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-colors ${redeemTab === t ? 'bg-white text-black' : 'text-[#888]'}`}>
            {t}
          </button>
        ))}
      </div>

      {redeemTab === 'Experiencias' && (
        <div className="space-y-3">
          {DEALS.slice(0, 4).map((deal) => (
            <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform">
              <div className="relative h-32">
                <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <div className="flex items-center gap-1.5">
                    <img src={deal.logo} alt={deal.brand} className="w-4 h-4 rounded-full object-contain bg-white shrink-0" />
                    <p className="text-white font-bold text-sm">{deal.brand}</p>
                  </div>
                  <span className="text-white text-xs bg-blue-500 px-2 py-1 rounded-lg font-bold">{deal.discount}</span>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-[#888] text-xs">{deal.detail}</p>
                <span className="text-blue-400 text-xs font-bold">{deal.points} pts</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {redeemTab === 'Viajes' && (
        <div>
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden mb-4">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=200&fit=crop" alt="travel" className="w-full h-36 object-cover" loading="lazy" />
            <div className="p-4">
              <span className="text-blue-400 text-[10px] font-bold bg-blue-500/15 px-2 py-0.5 rounded">TRAVEL REWARDS</span>
              <h3 className="text-white font-bold text-base mt-2">Transfiere puntos DescluB a Volaris</h3>
              <p className="text-[#888] text-xs mt-1">Reserva vuelos nacionales con tus puntos acumulados.</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[#888] text-xs">Transferencia 1:1</span>
                <span className="text-[#888] text-xs">•</span>
                <span className="text-[#888] text-xs">1K pts = 1K millas</span>
              </div>
              <button className="mt-3 bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg active:bg-blue-600">Transferir puntos</button>
            </div>
          </div>
          <h3 className="text-white text-sm font-bold mb-3">Beneficios en viajes</h3>
          {['2X puntos en hoteles', '1X puntos en vuelos', '10% descuento Hertz'].map((b, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#1a1a25]">
              <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center"><svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg></span>
              <p className="text-white text-sm">{b}</p>
            </div>
          ))}
        </div>
      )}

      {redeemTab === 'Transferir' && (
        <div>
          <p className="text-[#888] text-sm mb-4">Transfiere puntos a programas de lealtad aliados.</p>
          {[
            { name: 'Volaris V.Club', ratio: '1:1', icon: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' },
            { name: 'Club Premier', ratio: '1:1', icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
            { name: 'Hilton Honors', ratio: '1:1', icon: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6 3v5.64l-6 3-6-3V7.18l6-3z' },
            { name: 'Cinépolis Club', ratio: '1:2', icon: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-2">
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d={p.icon}/></svg>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{p.name}</p>
                <p className="text-[#888] text-xs">Transfer {p.ratio}</p>
              </div>
              <button className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg active:bg-blue-600">Transferir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function WalletTab() {
  const [addedToWallet, setAddedToWallet] = useState(false)
  return (
    <div className="px-5 pb-6 pt-2">
      {/* Card */}
      <div className="mb-4">
        <div className="w-full h-52 bg-gradient-to-br from-[#1a2a4a] to-[#0f1a30] rounded-2xl border border-[#2a3a5a] p-5 relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-36 h-36 rounded-full border-[16px] border-white/5" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-white text-xl font-bold tracking-tighter">DescluB</span>
              <span className="text-blue-400 text-[10px] font-bold bg-blue-500/15 px-2.5 py-0.5 rounded-full">GOLD</span>
            </div>
            <div>
              <p className="text-[#556] text-[10px] mb-1">NÚMERO DE MEMBRESÍA</p>
              <p className="text-white text-lg font-mono tracking-[3px]">5114 1102 5020 1775</p>
            </div>
            <div className="flex justify-between">
              <div><p className="text-[#556] text-[9px]">MIEMBRO</p><p className="text-white text-sm font-semibold">Pablo Creel</p></div>
              <div className="text-right"><p className="text-[#556] text-[9px]">VENCE</p><p className="text-white text-sm font-semibold">06/26</p></div>
            </div>
          </div>
        </div>
        <p className="text-center text-[#555] text-xs mt-2">DescluB Card</p>
      </div>

      <button onClick={() => setAddedToWallet(true)} className={`w-full h-12 rounded-xl font-semibold text-sm mb-5 transition-all ${addedToWallet ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white text-black active:scale-[0.97]'}`}>
        {addedToWallet ? '✓ Agregada a Cartera' : 'Agregar a Apple Wallet'}
      </button>

      {/* Linked cards */}
      <h3 className="text-white text-base font-bold mb-1">Gana puntos en pagos</h3>
      <p className="text-[#888] text-xs mb-4">con cualquier tarjeta vinculada</p>

      {[
        { name: 'BBVA Visa', last4: '4521', color: '#004481' },
        { name: 'Nu Credit', last4: '8903', color: '#820AD1' },
      ].map((card, i) => (
        <div key={i} className="flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-2">
          <div className="w-12 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color }}>
            <span className="text-white text-[10px] font-bold">VISA</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{card.name}</p>
            <p className="text-[#888] text-xs">•••• {card.last4}</p>
          </div>
          <span className="text-blue-400 text-xs font-semibold">Vinculada</span>
        </div>
      ))}

      <button className="w-full border border-dashed border-[#333] rounded-xl py-4 text-center text-[#555] text-sm font-medium mt-2 active:bg-[#111]">
        + Agregar otra tarjeta
      </button>
    </div>
  )
}

export default function V3App() {
  const [screen, setScreen] = useState('login')
  const [activeTab, setActiveTab] = useState('explore')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [showQRCard, setShowQRCard] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [dealsCatFilter, setDealsCatFilter] = useState(null)
  const points = 1250

  if (screen === 'login') {
    return (
      <div className="flex-1 min-h-0 flex flex-col relative">
        <StatusBar variant="dark" />
        <V3Login onLogin={() => setScreen('onboarding')} />
      </div>
    )
  }

  if (screen === 'onboarding') {
    return (
      <div className="flex-1 min-h-0 flex flex-col relative">
        <StatusBar variant="dark" />
        <Onboarding variant="dark" onComplete={() => setScreen('app')} />
      </div>
    )
  }

  /* Full-screen deal detail */
  if (selectedDeal) {
    return <DealDetail deal={selectedDeal} onBack={() => setSelectedDeal(null)} />
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black text-white relative overflow-hidden font-vc">
      <StatusBar variant="dark" />
      {/* Header */}
      <div className="pt-safe md:pt-14 pb-2 px-5 bg-black">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 bg-[#111] border border-[#1a1a1a] rounded-full px-3 py-1.5">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/></svg>
            <span className="text-white text-xs font-bold">{points.toLocaleString()} pts</span>
            <span className="text-[#555] text-[10px]">= ${Math.floor(points / 10)} MXN</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowNotifications(true)} className="w-9 h-9 bg-[#111] border border-[#1a1a1a] rounded-full flex items-center justify-center text-white text-sm relative">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V5a2 2 0 1 0-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/></svg>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">2</span>
            </button>
            <button onClick={() => setShowAccount(true)} className="w-9 h-9 bg-[#111] border border-[#1a1a1a] rounded-full flex items-center justify-center text-[#888] text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/></svg>
            </button>
          </div>
        </div>
        {/* Tier progress bar */}
        <div className="flex items-center gap-2">
          <span className="text-blue-400 text-[10px] font-bold">Gold</span>
          <div className="flex-1 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: '62%' }} />
          </div>
          <span className="text-[#555] text-[10px]">Platinum</span>
        </div>
        <p className="text-[10px] text-[#444] mt-0.5">750 pts más para subir de nivel</p>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">
        {activeTab === 'explore' && <ExploreTab onDealClick={setSelectedDeal} onCategoryClick={(cat) => { setDealsCatFilter(cat); setActiveTab('deals'); }} />}
        {activeTab === 'deals' && <DealsTab onDealClick={setSelectedDeal} initialCategory={dealsCatFilter} />}
        {activeTab === 'rewards' && <RewardsTab onDealClick={setSelectedDeal} />}
        {activeTab === 'wallet' && <WalletTab />}
      </div>

      {/* QR Card Modal */}
      {showQRCard && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQRCard(false)}>
          <div className="bg-[#111] rounded-3xl p-6 mx-6 text-center border border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-white mb-1">Tu Membresía DescluB</h2>
            <p className="text-sm text-[#888] mb-4">Presenta este QR en el comercio</p>
            <div className="w-44 h-44 mx-auto bg-white rounded-2xl flex items-center justify-center mb-3">
              <div className="grid grid-cols-7 gap-[2px] p-3">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div key={i} className={`w-3.5 h-3.5 rounded-sm ${[0,1,2,5,6,7,13,14,20,21,27,28,35,42,43,44,47,48,10,11,16,17,31,32,37,38].includes(i) ? 'bg-gray-900' : 'bg-gray-100'}`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#666] font-mono">5114 1102 5020 1775</p>
            <p className="text-[10px] text-blue-400 mt-1">Pablo Creel • Gold</p>
            <button onClick={() => setShowQRCard(false)} className="mt-4 w-full h-11 bg-[#1a1a1a] rounded-xl text-white text-sm font-semibold">Cerrar</button>
          </div>
        </div>
      )}

      {/* Notifications Panel */}
      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}

      {/* Account Modal */}
      {showAccount && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end" onClick={() => setShowAccount(false)}>
          <div className="bg-[#111] w-full rounded-t-3xl p-6 border-t border-[#222]" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-lg font-bold">Mi Cuenta</h2>
              <button onClick={() => setShowAccount(false)} className="text-[#666] text-xl">✕</button>
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-white text-sm font-bold">PC</div>
              <div>
                <p className="text-white text-base font-bold">Pablo Creel</p>
                <p className="text-blue-400 text-xs font-semibold">Gold • {points.toLocaleString()} puntos</p>
              </div>
            </div>
            {[
              { label: 'Historial de canjes', value: '23' },
              { label: 'Marcas favoritas', value: '12' },
              { label: 'Ahorro acumulado', value: '$18,320' },
              { label: 'Notificaciones', value: 'On' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
                <span className="text-white text-sm font-semibold">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#888] text-sm">{item.value}</span>
                  <span className="text-[#555]">›</span>
                </div>
              </div>
            ))}
            <button
              onClick={() => window.open('https://wa.me/525500000000', '_blank')}
              className="w-full h-12 bg-[#25D366]/15 border border-[#25D366]/30 rounded-xl text-[#25D366] text-sm font-semibold flex items-center justify-center gap-2 mt-5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg> Soporte vía WhatsApp
            </button>
            <button
              onClick={() => { setShowAccount(false); setScreen('login') }}
              className="w-full mt-3 py-4 text-red-400 text-sm font-semibold text-center"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="shrink-0 bg-black border-t border-[#1a1a25] flex items-center justify-around px-2 pt-2" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => { if (tab.key === 'center') { setShowQRCard(true) } else { setActiveTab(tab.key); if (tab.key === 'deals') setDealsCatFilter(null); } }} className={`flex flex-col items-center gap-0.5 ${tab.key === 'center' ? 'relative -mt-5' : ''}`}>
            {tab.key === 'center' ? (
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold dc-glow active:scale-95 transition-transform">
                DC
              </div>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={activeTab === tab.key ? '#fff' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={TAB_ICONS[tab.key]} />
                </svg>
                <span className={`text-[9px] font-semibold ${activeTab === tab.key ? 'text-white' : 'text-[#555]'}`}>{tab.label}</span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
