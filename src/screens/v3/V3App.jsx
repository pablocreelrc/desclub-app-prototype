import { useState } from 'react'
import V3Login from './V3Login'

const DEALS = [
  { id: 1, brand: 'Cinépolis', discount: '2x1', detail: 'Boletos Martes y Jueves', dist: '1.2 km', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop', cat: 'Entretenimiento', points: '3X' },
  { id: 2, brand: 'Hertz', discount: '25% OFF', detail: 'Renta de auto fin de semana', dist: '3.5 km', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=300&fit=crop', cat: 'Transporte', points: '2X' },
  { id: 3, brand: 'Starbucks', discount: '15% OFF', detail: 'Todas las bebidas', dist: '0.4 km', image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=300&fit=crop', cat: 'Comida', points: '3X' },
  { id: 4, brand: 'Sport City', discount: '3 días GRATIS', detail: 'Pase de cortesía completo', dist: '2.1 km', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop', cat: 'Fitness', points: '1X' },
  { id: 5, brand: 'Liverpool', discount: '20% OFF', detail: 'Ropa y accesorios', dist: '0.8 km', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop', cat: 'Retail', points: '2X' },
  { id: 6, brand: 'Volaris', discount: '10% OFF', detail: 'Vuelos nacionales', dist: '', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=300&fit=crop', cat: 'Viajes', points: '1X' },
  { id: 7, brand: 'Tim Hortons', discount: '2x1', detail: 'Cafés y donuts L-M', dist: '0.6 km', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=300&fit=crop', cat: 'Comida', points: '3X' },
  { id: 8, brand: 'Devlyn', discount: '30% OFF', detail: 'Lentes y armazones', dist: '1.5 km', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=300&fit=crop', cat: 'Retail', points: '2X' },
]

const TABS = [
  { key: 'neighborhood', icon: '📍', label: 'Vecindario' },
  { key: 'home', icon: '🏠', label: 'Mi Zona' },
  { key: 'center', icon: '◎', label: '' },
  { key: 'rewards', icon: '🎯', label: 'Puntos' },
  { key: 'wallet', icon: '💳', label: 'Wallet' },
]

function DealSheet({ deal, onClose }) {
  const [showQR, setShowQR] = useState(false)
  if (!deal) return null
  if (showQR) {
    return (
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowQR(false)}>
        <div className="bg-[#1a1a25] rounded-3xl p-8 mx-6 text-center border border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
          <span className="text-3xl">✅</span>
          <h2 className="text-xl font-bold text-white mt-3 mb-1">{deal.brand}</h2>
          <p className="text-sm text-[#888] mb-5">{deal.discount}</p>
          <div className="w-44 h-44 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4">
            <div className="grid grid-cols-7 gap-[2px] p-3">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={`w-3.5 h-3.5 rounded-sm ${[0,1,2,5,6,7,13,14,20,21,27,28,35,42,43,44,47,48,10,11,16,17,31,32,37,38].includes(i) ? 'bg-gray-900' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
          <p className="text-xs text-[#666] font-mono">5114 1102 5020 1775</p>
          <button onClick={() => setShowQR(false)} className="mt-5 w-full h-11 bg-[#252535] rounded-xl text-white text-sm font-semibold">Cerrar</button>
        </div>
      </div>
    )
  }
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div className="bg-[#1a1a25] rounded-t-3xl w-full max-h-[80%] overflow-y-auto border-t border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
        <div className="relative h-44">
          <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a25] to-transparent" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur rounded-full text-white text-sm flex items-center justify-center">✕</button>
          <div className="absolute bottom-3 left-5 flex items-center gap-2">
            <span className="bg-[#4a7a5a] text-white text-sm font-bold px-3 py-1 rounded-lg">{deal.discount}</span>
            <span className="bg-[#4a7a5a]/30 text-[#4a7a5a] text-xs font-bold px-2 py-1 rounded-lg">{deal.points} puntos</span>
          </div>
        </div>
        <div className="px-5 pb-8">
          <h2 className="text-2xl font-bold text-white mt-3">{deal.brand}</h2>
          <p className="text-sm text-[#888] mt-1">{deal.cat} • {deal.dist || 'Online'} • {deal.detail}</p>
          <button onClick={() => setShowQR(true)} className="w-full h-14 bg-white text-black rounded-2xl font-bold text-base mt-5 active:scale-[0.97] transition-transform">
            Canjear descuento
          </button>
          <button onClick={() => window.open('https://wa.me/525500000000', '_blank')} className="w-full h-12 bg-[#252535] text-[#888] rounded-2xl font-semibold text-sm mt-3 flex items-center justify-center gap-2">
            🎙 Preguntar al Concierge
          </button>
        </div>
      </div>
    </div>
  )
}

function NeighborhoodTab({ onDealClick }) {
  const categories = [
    { icon: '🍽', label: 'Comida' },
    { icon: '🎬', label: 'Cine' },
    { icon: '💪', label: 'Fitness' },
    { icon: '🎭', label: 'Experiencias' },
    { icon: '💊', label: 'Farmacia' },
    { icon: '🅿️', label: 'Parking' },
  ]
  return (
    <div className="pb-6">
      {/* Map header */}
      <div className="h-32 bg-gradient-to-b from-[#1a3a2a] to-[#0f0f18] relative px-5 pt-3 flex items-end pb-4">
        <div className="absolute inset-0 opacity-30" style={{ background: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop") center/cover' }} />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-[#4a7a5a] text-sm font-bold">📍</span>
            <span className="text-white text-sm font-semibold">CDMX</span>
            <span className="text-[#555] text-xs">• Condesa</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Welcome */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#1a1a25] border border-[#2a2a3a] flex items-center justify-center text-white text-sm font-bold">PC</div>
          <div>
            <p className="text-white text-base font-bold">Bienvenido, Pablo</p>
            <div className="flex items-center gap-2">
              <span className="text-[#4a7a5a] text-xs font-semibold">🟢 Gold</span>
              <span className="text-[#555] text-xs">• Miembro desde '24</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <h3 className="text-white text-base font-bold mb-3">Explora beneficios en tu vecindario</h3>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map((c) => (
            <button key={c.label} className="bg-[#1a1a25] border border-[#2a2a3a] rounded-xl py-3.5 text-center active:bg-[#252535] transition-colors">
              <span className="text-xl">{c.icon}</span>
              <p className="text-white text-xs font-medium mt-1">{c.label}</p>
            </button>
          ))}
        </div>

        {/* This week from concierge */}
        <h3 className="text-white text-base font-bold mb-3">Esta semana del concierge</h3>
        {DEALS.slice(0, 2).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full bg-[#1a1a25] border border-[#2a2a3a] rounded-2xl mb-3 overflow-hidden text-left active:scale-[0.98] transition-transform">
            <img src={deal.image} alt={deal.brand} className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">{deal.brand}</p>
                  <p className="text-[#888] text-xs mt-0.5">{deal.dist ? `${deal.dist} • ` : ''}{deal.cat} • {deal.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[#4a7a5a] text-xs font-bold bg-[#4a7a5a]/15 px-2.5 py-1 rounded-lg">{deal.points} Puntos</span>
                <span className="text-white text-xs font-bold bg-[#333] px-2.5 py-1 rounded-lg">{deal.discount}</span>
              </div>
            </div>
          </button>
        ))}

        {/* Experiences */}
        <h3 className="text-white text-base font-bold mt-4 mb-3">Experiencias cerca de ti</h3>
        <button onClick={() => onDealClick(DEALS[3])} className="w-full bg-[#1a1a25] border border-[#2a2a3a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform mb-3">
          <div className="relative">
            <img src={DEALS[3].image} alt="Sport City" className="w-full h-28 object-cover" />
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">⏰ Termina en 15d 22h</div>
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
        <h3 className="text-white text-base font-bold mt-4 mb-3">Top comercios</h3>
        {DEALS.slice(4, 8).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full flex items-center gap-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl p-3 mb-2 active:bg-[#252535]">
            <img src={deal.image} alt={deal.brand} className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-semibold">{deal.brand}</p>
              <p className="text-[#666] text-xs">{deal.detail}</p>
              <span className="text-[#4a7a5a] text-xs font-bold">{deal.points} Puntos</span>
            </div>
            <span className="text-white text-xs font-bold bg-[#333] px-2 py-1 rounded-lg">{deal.discount}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function MyZoneTab() {
  return (
    <div className="px-5 pb-6 pt-2">
      <h2 className="text-white text-2xl font-bold mb-1">Colonia Condesa</h2>
      <p className="text-[#888] text-sm mb-5">Tu zona de beneficios</p>

      {/* Balance card */}
      <div className="bg-[#1a1a25] border border-[#2a2a3a] rounded-2xl p-5 mb-5">
        <p className="text-[#888] text-xs mb-1">Tu ahorro acumulado</p>
        <p className="text-white text-4xl font-bold">$18,320</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#4a7a5a] text-xs font-semibold">✓ Sin cargos pendientes</span>
        </div>
        <div className="mt-4 space-y-3">
          <button className="w-full flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-3"><span className="text-sm">🕐</span><span className="text-white text-sm font-semibold">Historial de canjes</span></div>
            <span className="text-[#444]">›</span>
          </button>
          <button className="w-full flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-3"><span className="text-sm">🔔</span><span className="text-white text-sm font-semibold">Alertas de ofertas</span></div>
            <span className="text-[#4a7a5a] text-xs font-semibold">On</span>
          </button>
          <button className="w-full flex items-center justify-between py-3">
            <div className="flex items-center gap-3"><span className="text-sm">⭐</span><span className="text-white text-sm font-semibold">Pagar con puntos</span></div>
            <span className="text-[#888] text-xs bg-[#252535] px-2 py-0.5 rounded">Gana 1,000 pts mínimo</span>
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
          <div className="w-10 h-10 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl flex items-center justify-center text-sm">{a.icon}</div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{a.label}</p>
            <p className="text-[#555] text-xs">{a.date}</p>
          </div>
          <span className="text-[#4a7a5a] text-xs font-bold">{a.pts}</span>
        </div>
      ))}
    </div>
  )
}

function RewardsTab({ onDealClick }) {
  const [redeemTab, setRedeemTab] = useState('Experiencias')
  const rTabs = ['Experiencias', 'Viajes', 'Transferir']

  return (
    <div className="px-5 pb-6 pt-2">
      <h2 className="text-white text-2xl font-bold mb-0.5">Canjea tus puntos</h2>
      <p className="text-[#4a7a5a] text-base font-semibold mb-5">Experiencias, viajes y más</p>

      <div className="flex gap-0 bg-[#1a1a25] rounded-xl p-1 mb-5 border border-[#2a2a3a]">
        {rTabs.map((t) => (
          <button key={t} onClick={() => setRedeemTab(t)} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-colors ${redeemTab === t ? 'bg-white text-black' : 'text-[#888]'}`}>
            {t}
          </button>
        ))}
      </div>

      {redeemTab === 'Experiencias' && (
        <div className="space-y-3">
          {DEALS.slice(0, 4).map((deal) => (
            <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full bg-[#1a1a25] border border-[#2a2a3a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform">
              <div className="relative h-32">
                <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <p className="text-white font-bold text-sm">{deal.brand}</p>
                  <span className="text-white text-xs bg-[#4a7a5a] px-2 py-1 rounded-lg font-bold">{deal.discount}</span>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-[#888] text-xs">{deal.detail}</p>
                <span className="text-[#4a7a5a] text-xs font-bold">{deal.points} pts</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {redeemTab === 'Viajes' && (
        <div>
          <div className="bg-[#1a1a25] border border-[#2a2a3a] rounded-2xl overflow-hidden mb-4">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=200&fit=crop" alt="travel" className="w-full h-36 object-cover" />
            <div className="p-4">
              <span className="text-[#4a7a5a] text-[10px] font-bold bg-[#4a7a5a]/15 px-2 py-0.5 rounded">TRAVEL REWARDS</span>
              <h3 className="text-white font-bold text-base mt-2">Transfiere puntos DescluB a Volaris</h3>
              <p className="text-[#888] text-xs mt-1">Reserva vuelos nacionales con tus puntos acumulados.</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[#888] text-xs">Transferencia 1:1</span>
                <span className="text-[#888] text-xs">•</span>
                <span className="text-[#888] text-xs">1K pts = 1K millas</span>
              </div>
              <button className="mt-3 border border-[#444] text-white text-xs font-semibold px-4 py-2 rounded-lg">Transferir</button>
            </div>
          </div>
          <h3 className="text-white text-sm font-bold mb-3">Beneficios en viajes</h3>
          {['2X puntos en hoteles', '1X puntos en vuelos', '10% descuento Hertz'].map((b, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#1a1a25]">
              <span className="w-8 h-8 bg-[#4a7a5a]/20 rounded-lg flex items-center justify-center text-[#4a7a5a] text-xs">✈</span>
              <p className="text-white text-sm">{b}</p>
            </div>
          ))}
        </div>
      )}

      {redeemTab === 'Transferir' && (
        <div>
          <p className="text-[#888] text-sm mb-4">Transfiere puntos a programas de lealtad aliados.</p>
          {[
            { name: 'Volaris V.Club', ratio: '1:1', icon: '✈️' },
            { name: 'Club Premier', ratio: '1:1', icon: '🌟' },
            { name: 'Hilton Honors', ratio: '1:1', icon: '🏨' },
            { name: 'Cinépolis Club', ratio: '1:2', icon: '🎬' },
          ].map((p, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl p-4 mb-2">
              <span className="text-xl">{p.icon}</span>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{p.name}</p>
                <p className="text-[#888] text-xs">Transfer {p.ratio}</p>
              </div>
              <button className="border border-[#444] text-white text-xs font-semibold px-3 py-1.5 rounded-lg active:bg-[#333]">Transferir</button>
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
      {/* Card carousel */}
      <div className="mb-4">
        <div className="w-full h-52 bg-gradient-to-br from-[#1a1a25] to-[#252535] rounded-2xl border border-[#2a2a3a] p-5 relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-36 h-36 rounded-full border-[16px] border-white/5" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-white text-xl font-bold tracking-tighter">DescluB</span>
              <span className="text-[#4a7a5a] text-[10px] font-bold bg-[#4a7a5a]/15 px-2.5 py-0.5 rounded-full">GOLD</span>
            </div>
            <div>
              <p className="text-[#555] text-[10px] mb-1">NÚMERO DE MEMBRESÍA</p>
              <p className="text-white text-lg font-mono tracking-[3px]">5114 1102 5020 1775</p>
            </div>
            <div className="flex justify-between">
              <div><p className="text-[#555] text-[9px]">MIEMBRO</p><p className="text-white text-sm font-semibold">Pablo Creel</p></div>
              <div className="text-right"><p className="text-[#555] text-[9px]">VENCE</p><p className="text-white text-sm font-semibold">06/26</p></div>
            </div>
          </div>
        </div>
        <p className="text-center text-[#555] text-xs mt-2">DescluB Card</p>
      </div>

      <button onClick={() => setAddedToWallet(true)} className={`w-full h-12 rounded-xl font-semibold text-sm mb-5 transition-all ${addedToWallet ? 'bg-[#4a7a5a]/20 text-[#4a7a5a] border border-[#4a7a5a]/30' : 'bg-white text-black active:scale-[0.97]'}`}>
        {addedToWallet ? '✓ Agregada a Wallet' : ' Agregar a Apple Wallet'}
      </button>

      {/* Linked cards */}
      <h3 className="text-white text-base font-bold mb-1">Gana puntos en pagos</h3>
      <p className="text-[#888] text-xs mb-4">con cualquier tarjeta vinculada</p>

      {[
        { name: 'BBVA Visa', last4: '4521', color: '#004481' },
        { name: 'Nu Credit', last4: '8903', color: '#820AD1' },
      ].map((card, i) => (
        <div key={i} className="flex items-center gap-3 bg-[#1a1a25] border border-[#2a2a3a] rounded-xl p-4 mb-2">
          <div className="w-12 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color }}>
            <span className="text-white text-[10px] font-bold">VISA</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{card.name}</p>
            <p className="text-[#888] text-xs">•••• {card.last4}</p>
          </div>
          <span className="w-7 h-7 bg-[#252535] rounded-full flex items-center justify-center text-[#888] text-lg">+</span>
        </div>
      ))}

      <button className="w-full border border-dashed border-[#333] rounded-xl py-4 text-center text-[#555] text-sm font-medium mt-2 active:bg-[#1a1a25]">
        + Agregar otra tarjeta
      </button>
    </div>
  )
}

export default function V3App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('neighborhood')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const points = 1250

  if (!loggedIn) return <V3Login onLogin={() => setLoggedIn(true)} />

  return (
    <div className="h-full flex flex-col bg-[#0f0f18] text-white relative">
      {/* Header */}
      <div className="pt-12 pb-2 px-5 flex items-center justify-between bg-[#0f0f18]">
        <div className="flex items-center gap-1.5 bg-[#1a1a25] border border-[#2a2a3a] rounded-full px-3 py-1.5">
          <span className="text-[#4a7a5a] text-xs">👤</span>
          <span className="text-white text-xs font-bold">{points.toLocaleString()} pts</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-[#1a1a25] border border-[#2a2a3a] rounded-full flex items-center justify-center text-white text-sm">🔔</button>
          <button onClick={() => setLoggedIn(false)} className="w-9 h-9 bg-[#1a1a25] border border-[#2a2a3a] rounded-full flex items-center justify-center text-[#888] text-sm">⚙</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'neighborhood' && <NeighborhoodTab onDealClick={setSelectedDeal} />}
        {activeTab === 'home' && <MyZoneTab />}
        {activeTab === 'rewards' && <RewardsTab onDealClick={setSelectedDeal} />}
        {activeTab === 'wallet' && <WalletTab />}
      </div>

      {/* Tab bar */}
      <div className="shrink-0 bg-[#0f0f18] border-t border-[#1a1a25] flex items-center justify-around px-2 pt-2 pb-6">
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => tab.key !== 'center' && setActiveTab(tab.key)} className={`flex flex-col items-center gap-0.5 ${tab.key === 'center' ? 'relative -mt-5' : ''}`}>
            {tab.key === 'center' ? (
              <div className="w-14 h-14 bg-[#1a1a25] border-2 border-[#2a2a3a] rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                DC
              </div>
            ) : (
              <>
                <span className="text-lg">{tab.icon}</span>
                <span className={`text-[9px] font-semibold ${activeTab === tab.key ? 'text-white' : 'text-[#555]'}`}>{tab.label}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {selectedDeal && <DealSheet deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
    </div>
  )
}
