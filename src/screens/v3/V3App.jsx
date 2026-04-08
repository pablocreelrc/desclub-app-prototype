import { useState } from 'react'
import V3Login from './V3Login'
import StatusBar from '../../components/StatusBar'

const DEALS = [
  { id: 1, brand: 'Cinépolis', discount: '2x1', detail: 'Boletos Martes y Jueves', dist: '1.2 km', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop', cat: 'Entretenimiento', points: '3X', description: 'Compra 1 boleto y lleva el 2do GRATIS todos los martes y jueves. Aplica para todas las salas incluyendo IMAX, 4DX y Macro XE.', expiry: '15 días', redeemed: 342, terms: ['Válido martes y jueves', 'No acumulable con otras promociones', 'Presentar membresía DescluB vigente', 'Sujeto a disponibilidad'] },
  { id: 2, brand: 'Hertz', discount: '25% OFF', detail: 'Renta de auto fin de semana', dist: '3.5 km', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=300&fit=crop', cat: 'Transporte', points: '2X', description: 'Obtén 25% de descuento en tu renta de auto para fines de semana. Incluye seguro básico y kilometraje ilimitado.', expiry: '30 días', redeemed: 128, terms: ['Válido viernes a domingo', 'Reservación con 48hrs de anticipación', 'Presentar membresía DescluB vigente', 'No aplica en temporada alta'] },
  { id: 3, brand: 'Starbucks', discount: '15% OFF', detail: 'Todas las bebidas', dist: '0.4 km', image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=300&fit=crop', cat: 'Comida', points: '3X', description: '15% de descuento en cualquier bebida del menú. Aplica en cualquier sucursal participante.', expiry: '7 días', redeemed: 891, terms: ['Una bebida por visita', 'No acumulable', 'Sucursales participantes', 'Presentar QR de membresía'] },
  { id: 4, brand: 'Sport City', discount: '3 días GRATIS', detail: 'Pase de cortesía completo', dist: '2.1 km', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop', cat: 'Fitness', points: '1X', description: 'Prueba Sport City con 3 días de acceso completo a todas las instalaciones sin costo.', expiry: '10 días', redeemed: 256, terms: ['Una vez por usuario', 'Registro presencial requerido', 'Aplica en cualquier sucursal', 'Mayor de 18 años'] },
  { id: 5, brand: 'Liverpool', discount: '20% OFF', detail: 'Ropa y accesorios', dist: '0.8 km', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop', cat: 'Retail', points: '2X', description: '20% de descuento en ropa y accesorios seleccionados. Válido en tienda física y en línea.', expiry: '20 días', redeemed: 567, terms: ['Departamentos seleccionados', 'No aplica con otras promociones', 'Válido en tienda y online', 'Máximo $5,000 MXN de descuento'] },
  { id: 6, brand: 'Volaris', discount: '10% OFF', detail: 'Vuelos nacionales', dist: '', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=300&fit=crop', cat: 'Viajes', points: '1X', description: 'Descuento exclusivo en vuelos nacionales comprando desde la app de Volaris con tu código DescluB.', expiry: '45 días', redeemed: 89, terms: ['Compra en volaris.com o app', 'Código único por membresía', 'Sujeto a disponibilidad de tarifas', 'No aplica en temporada alta'] },
  { id: 7, brand: 'Tim Hortons', discount: '2x1', detail: 'Cafés y donuts L-M', dist: '0.6 km', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=300&fit=crop', cat: 'Comida', points: '3X', description: '2x1 en todos los cafés y donuts de lunes a miércoles. Aplica en sucursales participantes.', expiry: '12 días', redeemed: 445, terms: ['Válido lunes a miércoles', 'Una promoción por visita', 'Sucursales participantes', 'No aplica en delivery'] },
  { id: 8, brand: 'Devlyn', discount: '30% OFF', detail: 'Lentes y armazones', dist: '1.5 km', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=300&fit=crop', cat: 'Retail', points: '2X', description: '30% de descuento en armazones y lentes graduados. Incluye marcas premium como Ray-Ban y Oakley.', expiry: '25 días', redeemed: 198, terms: ['Armazones seleccionados', 'Incluye antirreflejante básico', 'Presentar membresía vigente', 'No acumulable'] },
]

const TABS = [
  { key: 'explore', icon: '🔍', label: 'Explorar' },
  { key: 'deals', icon: '🏷', label: 'Ofertas' },
  { key: 'center', icon: '◎', label: '' },
  { key: 'rewards', icon: '🎯', label: 'Puntos' },
  { key: 'wallet', icon: '💳', label: 'Wallet' },
]

/* Full-screen Deal Detail Page */
function DealDetail({ deal, onBack }) {
  const [showQR, setShowQR] = useState(false)
  if (!deal) return null

  return (
    <div className="h-full flex flex-col bg-black relative">
      <StatusBar variant="dark" />
      {/* Hero image */}
      <div className="h-64 relative shrink-0 overflow-hidden">
        <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-black/30" />
        <button
          onClick={onBack}
          className="absolute top-14 left-5 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg active:scale-90 transition-transform"
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
            ⏰ Vence en {deal.expiry}
          </span>
          <span className="bg-blue-500/15 text-blue-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
            👥 {deal.redeemed.toLocaleString()} canjearon
          </span>
          {deal.redeemed > 200 && (
            <span className="bg-orange-500/15 text-orange-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
              🔥 Popular
            </span>
          )}
        </div>

        {/* How to redeem */}
        <div className="bg-blue-500/10 rounded-2xl p-4 mt-6 border border-blue-500/20">
          <h3 className="font-semibold text-sm text-blue-400 mb-2">🎯 Cómo canjear</h3>
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
          <h3 className="font-semibold text-sm text-white mb-2">📋 Términos y condiciones</h3>
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

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-[#111] rounded-3xl p-8 mx-6 text-center border border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
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
            <p className="text-[10px] text-blue-400 mt-1">+{deal.points} puntos al canjear</p>
            <button onClick={() => setShowQR(false)} className="mt-5 w-full h-11 bg-[#1a1a1a] rounded-xl text-white text-sm font-semibold">Cerrar</button>
          </div>
        </div>
      )}

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-[#1a1a25] px-5 pt-3 pb-8 flex gap-3">
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

function ExploreTab({ onDealClick }) {
  const categories = [
    { icon: '🍽', label: 'Comida' },
    { icon: '🎬', label: 'Cine' },
    { icon: '💪', label: 'Fitness' },
    { icon: '🎭', label: 'Experiencias' },
    { icon: '🛍', label: 'Retail' },
    { icon: '✈️', label: 'Viajes' },
  ]
  return (
    <div className="pb-6">
      {/* Hero banner */}
      <div className="h-32 bg-gradient-to-b from-[#1a2a4a] to-[#0f0f18] relative px-5 pt-3 flex items-end pb-4">
        <div className="absolute inset-0 opacity-20" style={{ background: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=200&fit=crop") center/cover' }} />
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-sm font-bold">📍</span>
            <span className="text-white text-sm font-semibold">CDMX</span>
            <span className="text-[#555] text-xs">• {DEALS.length} ofertas cerca</span>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Welcome */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-white text-sm font-bold">PC</div>
          <div>
            <p className="text-white text-base font-bold">Bienvenido, Pablo</p>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 text-xs font-semibold">🟢 Gold</span>
              <span className="text-[#555] text-xs">• Miembro desde '24</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <h3 className="text-white text-lg font-bold mb-1">Explora por categoría</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map((c) => (
            <button key={c.label} className="bg-[#111] border border-[#1a1a1a] rounded-xl py-3.5 text-center active:bg-[#1a1a1a] transition-colors">
              <span className="text-xl">{c.icon}</span>
              <p className="text-white text-xs font-medium mt-1">{c.label}</p>
            </button>
          ))}
        </div>

        {/* Picks for you */}
        <h3 className="text-white text-lg font-bold mb-1">Selección para ti</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        {DEALS.slice(0, 2).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl mb-3 overflow-hidden text-left active:scale-[0.98] transition-transform">
            <img src={deal.image} alt={deal.brand} className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">{deal.brand}</p>
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
        <h3 className="text-white text-lg font-bold mt-8 mb-1">Top comercios</h3>
        <div className="w-12 h-0.5 bg-blue-500 mb-3" />
        {DEALS.slice(4, 8).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-3 mb-2 active:bg-[#1a1a1a]">
            <img src={deal.image} alt={deal.brand} className="w-14 h-14 rounded-lg object-cover" />
            <div className="flex-1 text-left">
              <p className="text-white text-sm font-semibold">{deal.brand}</p>
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

function DealsTab({ onDealClick }) {
  const [activeCat, setActiveCat] = useState(null)
  const cats = [null, 'Comida', 'Entretenimiento', 'Retail', 'Fitness', 'Viajes', 'Transporte']
  const catLabels = { null: '🔥 Todos', 'Comida': '🍽 Comida', 'Entretenimiento': '🎬 Cine', 'Retail': '🛍 Retail', 'Fitness': '💪 Fitness', 'Viajes': '✈️ Viajes', 'Transporte': '🚗 Autos' }

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
              <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <p className="text-white font-bold text-base">{deal.brand}</p>
                  <p className="text-gray-300 text-xs mt-0.5">{deal.detail}</p>
                </div>
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">{deal.discount}</span>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {deal.dist && <span className="text-[#888] text-xs">📍 {deal.dist}</span>}
                <span className="text-[#555] text-xs">{deal.cat}</span>
              </div>
              <span className="text-blue-400 text-xs font-bold">{deal.points} pts</span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#555]">
          <p className="text-4xl mb-3">🔍</p>
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
            <div className="flex items-center gap-3"><span className="text-sm">🕐</span><span className="text-white text-sm font-semibold">Historial de canjes</span></div>
            <span className="text-[#444]">›</span>
          </button>
          <button className="w-full flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-3"><span className="text-sm">🔔</span><span className="text-white text-sm font-semibold">Alertas de ofertas</span></div>
            <span className="text-blue-400 text-xs font-semibold">On</span>
          </button>
          <button className="w-full flex items-center justify-between py-3">
            <div className="flex items-center gap-3"><span className="text-sm">⭐</span><span className="text-white text-sm font-semibold">Pagar con puntos</span></div>
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
        💬 Soporte vía WhatsApp
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
                <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <p className="text-white font-bold text-sm">{deal.brand}</p>
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
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=200&fit=crop" alt="travel" className="w-full h-36 object-cover" />
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
              <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-xs">✈</span>
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
            <div key={i} className="flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-2">
              <span className="text-xl">{p.icon}</span>
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
        {addedToWallet ? '✓ Agregada a Wallet' : ' Agregar a Apple Wallet'}
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
          <span className="w-7 h-7 bg-[#1a1a1a] rounded-full flex items-center justify-center text-[#888] text-lg">+</span>
        </div>
      ))}

      <button className="w-full border border-dashed border-[#333] rounded-xl py-4 text-center text-[#555] text-sm font-medium mt-2 active:bg-[#111]">
        + Agregar otra tarjeta
      </button>
    </div>
  )
}

export default function V3App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('explore')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [showQRCard, setShowQRCard] = useState(false)
  const [showAccount, setShowAccount] = useState(false)
  const points = 1250

  if (!loggedIn) {
    return (
      <div className="h-full relative">
        <StatusBar variant="dark" />
        <V3Login onLogin={() => setLoggedIn(true)} />
      </div>
    )
  }

  /* Full-screen deal detail */
  if (selectedDeal) {
    return <DealDetail deal={selectedDeal} onBack={() => setSelectedDeal(null)} />
  }

  return (
    <div className="h-full flex flex-col bg-black text-white relative overflow-hidden font-vc">
      <StatusBar variant="dark" />
      {/* Header */}
      <div className="pt-14 pb-2 px-5 flex items-center justify-between bg-black">
        <div className="flex items-center gap-1.5 bg-[#111] border border-[#1a1a1a] rounded-full px-3 py-1.5">
          <span className="text-blue-400 text-xs">👤</span>
          <span className="text-white text-xs font-bold">{points.toLocaleString()} pts</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-[#111] border border-[#1a1a1a] rounded-full flex items-center justify-center text-white text-sm">🔔</button>
          <button onClick={() => setShowAccount(true)} className="w-9 h-9 bg-[#111] border border-[#1a1a1a] rounded-full flex items-center justify-center text-[#888] text-sm">👤</button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {activeTab === 'explore' && <ExploreTab onDealClick={setSelectedDeal} />}
        {activeTab === 'deals' && <DealsTab onDealClick={setSelectedDeal} />}
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

      {/* Account Modal */}
      {showAccount && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end" onClick={() => setShowAccount(false)}>
          <div className="bg-[#111] w-full rounded-t-3xl p-6 pb-10 border-t border-[#222]" onClick={e => e.stopPropagation()}>
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
              💬 Soporte vía WhatsApp
            </button>
            <button
              onClick={() => { setShowAccount(false); setLoggedIn(false) }}
              className="w-full mt-3 py-4 text-red-400 text-sm font-semibold text-center"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <div className="shrink-0 bg-black border-t border-[#1a1a25] flex items-center justify-around px-2 pt-2 pb-6">
        {TABS.map((tab) => (
          <button key={tab.key} onClick={() => tab.key === 'center' ? setShowQRCard(true) : setActiveTab(tab.key)} className={`flex flex-col items-center gap-0.5 ${tab.key === 'center' ? 'relative -mt-5' : ''}`}>
            {tab.key === 'center' ? (
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold dc-glow active:scale-95 transition-transform">
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
    </div>
  )
}
