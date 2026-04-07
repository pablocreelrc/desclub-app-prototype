import { useState } from 'react'
import V2Login from './V2Login'

const TABS = ['Inicio', 'Beneficios', 'Mi Cuenta', 'Soporte']

const DEALS = [
  { id: 1, brand: 'Cinépolis', discount: '2x1', detail: 'Boletos Martes y Jueves', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop', cat: 'Entretenimiento' },
  { id: 2, brand: 'Hertz', discount: '25% OFF', detail: 'Renta de auto fin de semana', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=300&fit=crop', cat: 'Transporte' },
  { id: 3, brand: 'Starbucks', discount: '15% OFF', detail: 'Todas las bebidas', image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=300&fit=crop', cat: 'Alimentos' },
  { id: 4, brand: 'Sport City', discount: '3 días GRATIS', detail: 'Pase de cortesía completo', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop', cat: 'Wellness' },
  { id: 5, brand: 'Liverpool', discount: '20% OFF', detail: 'Ropa y accesorios seleccionados', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop', cat: 'Retail' },
  { id: 6, brand: 'Volaris', discount: '10% OFF', detail: 'Vuelos nacionales exclusivos', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=300&fit=crop', cat: 'Viajes' },
  { id: 7, brand: 'Tim Hortons', discount: '2x1', detail: 'Cafés y donuts L-M', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=300&fit=crop', cat: 'Alimentos' },
  { id: 8, brand: 'Devlyn', discount: '30% OFF', detail: 'Lentes y armazones premium', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=300&fit=crop', cat: 'Retail' },
]

function V2Toggle({ enabled, onChange }) {
  return (
    <button onClick={() => onChange(!enabled)} className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? 'bg-blue-500' : 'bg-[#333]'}`}>
      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow transition-transform ${enabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  )
}

function V2Modal({ title, onClose, children }) {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div className="bg-[#1c1c28] rounded-t-3xl w-full max-h-[70%] overflow-y-auto p-6 pb-10 border-t border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-[#666] text-xl active:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function DealModal({ deal, onClose }) {
  const [showQR, setShowQR] = useState(false)
  if (!deal) return null

  if (showQR) {
    return (
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setShowQR(false)}>
        <div className="bg-[#1c1c28] rounded-3xl p-8 mx-6 text-center border border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
          <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">{deal.brand}</h2>
          <p className="text-sm text-[#888] mb-5">{deal.discount}</p>
          <div className="w-44 h-44 mx-auto bg-white rounded-2xl flex items-center justify-center mb-4">
            <div className="grid grid-cols-7 gap-[2px] p-3">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={`w-3.5 h-3.5 rounded-sm ${[0,1,2,5,6,7,13,14,20,21,27,28,35,42,43,44,47,48,10,11,16,17,31,32,37,38].includes(i) ? 'bg-gray-900' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
          <p className="text-xs text-[#666] font-mono">5114 1102 5020 1775</p>
          <button onClick={() => setShowQR(false)} className="mt-5 w-full h-11 bg-[#252535] rounded-xl text-white text-sm font-semibold active:bg-[#333]">Cerrar</button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div className="bg-[#1c1c28] rounded-t-3xl w-full max-h-[85%] overflow-y-auto border-t border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
        <div className="relative h-48">
          <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c28] to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur rounded-full text-white text-sm flex items-center justify-center">✕</button>
          <div className="absolute bottom-3 left-5 bg-blue-500 text-white text-xl font-bold px-4 py-1.5 rounded-xl">{deal.discount}</div>
        </div>
        <div className="px-5 pb-8">
          <h2 className="text-2xl font-bold text-white mt-3">{deal.brand}</h2>
          <p className="text-sm text-[#888] mt-1">{deal.cat} • {deal.detail}</p>
          <button
            onClick={() => setShowQR(true)}
            className="w-full h-14 bg-blue-500 rounded-2xl text-white font-bold text-base mt-6 active:scale-[0.97] transition-transform"
          >
            Canjear descuento
          </button>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({ onDealClick, onShowCard }) {
  const [locationOn, setLocationOn] = useState(false)

  return (
    <div className="px-5 pb-6">
      <div className="bg-gradient-to-r from-[#1a2744] to-[#243b6a] rounded-2xl p-5 mb-6 border border-[#2a4070]">
        <p className="text-[#8899bb] text-xs font-medium mb-1">BIENVENIDO DE VUELTA</p>
        <h2 className="text-white text-xl font-bold mb-3">Descuentos Exclusivos, Pablo</h2>
        <p className="text-[#8899bb] text-sm leading-relaxed mb-4">Tu membresía te da acceso a más de 500 marcas y 6,000 establecimientos.</p>
        <button onClick={onShowCard} className="bg-white text-[#1a2744] text-sm font-bold px-5 py-2.5 rounded-xl active:scale-95 transition-transform">
          📋 Ver Membresía
        </button>
      </div>

      <h3 className="text-white text-lg font-bold mb-3">Cerca de ti</h3>
      {!locationOn ? (
        <div className="bg-[#1c1c28] rounded-2xl p-6 mb-6 border border-[#2a2a3a] text-center">
          <p className="text-[#666680] text-sm">Activa tu ubicación para ver ofertas cercanas</p>
          <button onClick={() => setLocationOn(true)} className="mt-3 text-blue-400 text-sm font-semibold active:text-blue-300">Activar ubicación →</button>
        </div>
      ) : (
        <div className="bg-[#1c1c28] rounded-2xl p-4 mb-6 border border-[#2a2a3a]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <p className="text-green-400 text-xs font-semibold">Ubicación activa — CDMX</p>
          </div>
          <p className="text-[#888] text-sm">{DEALS.length} ofertas en un radio de 5 km</p>
        </div>
      )}

      <h3 className="text-white text-lg font-bold mb-3">Promociones Destacadas</h3>
      <div className="space-y-4">
        {DEALS.slice(0, 4).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full rounded-2xl overflow-hidden border border-[#2a2a3a] bg-[#1c1c28] text-left active:scale-[0.98] transition-transform">
            <div className="relative h-40">
              <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-base">{deal.brand}</p>
                    <p className="text-gray-300 text-xs mt-0.5">{deal.detail}</p>
                  </div>
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">{deal.discount}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function BenefitsTab({ onDealClick }) {
  const categories = [
    { title: 'Ofertas de Entretenimiento', desc: 'Cine, eventos, espectáculos y más', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=250&fit=crop', deals: DEALS.filter(d => d.cat === 'Entretenimiento') },
    { title: 'Sorteos Exclusivos', desc: 'Sorteos exclusivos para miembros DescluB', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=250&fit=crop', deals: [] },
    { title: 'Ofertas de Marcas', desc: 'Descuentos de tus marcas favoritas', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=250&fit=crop', deals: DEALS.filter(d => d.cat === 'Retail') },
    { title: 'Experiencias VIP', desc: 'Accesos y experiencias premium', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=250&fit=crop', deals: [] },
    { title: 'Viajes y Hospedaje', desc: 'Descuentos en hoteles, vuelos y más', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=250&fit=crop', deals: DEALS.filter(d => d.cat === 'Viajes') },
  ]
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="px-5 pb-6 space-y-4">
      {categories.map((cat, i) => (
        <div key={i}>
          <button onClick={() => setExpanded(expanded === i ? null : i)} className="w-full rounded-2xl overflow-hidden border border-[#2a2a3a] bg-[#1c1c28] text-left active:scale-[0.98] transition-transform">
            <div className="relative h-32">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-sm">{cat.title}</p>
                <p className="text-[#666680] text-xs mt-1">{cat.desc}</p>
              </div>
              <span className="text-[#666] text-sm">{expanded === i ? '∧' : '∨'}</span>
            </div>
          </button>
          {expanded === i && cat.deals.length > 0 && (
            <div className="mt-2 space-y-2 pl-2">
              {cat.deals.map(deal => (
                <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full flex items-center gap-3 bg-[#1c1c28] rounded-xl p-3 border border-[#2a2a3a] active:bg-[#252535]">
                  <img src={deal.image} alt={deal.brand} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="flex-1 text-left">
                    <p className="text-white text-sm font-semibold">{deal.brand}</p>
                    <p className="text-[#666] text-xs">{deal.detail}</p>
                  </div>
                  <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2.5 py-1 rounded-lg">{deal.discount}</span>
                </button>
              ))}
            </div>
          )}
          {expanded === i && cat.deals.length === 0 && (
            <p className="text-[#555] text-xs text-center py-3 mt-1">Próximamente — estamos preparando ofertas exclusivas</p>
          )}
        </div>
      ))}
    </div>
  )
}

function AccountTab({ onLogout }) {
  const [subTab, setSubTab] = useState('Perfil')
  const subTabs = ['Perfil', 'Favoritos', 'Comunicaciones']
  const [modal, setModal] = useState(null)
  const [comms, setComms] = useState({ ofertas: true, cercanas: true, newsletter: true, sorteos: true, updates: false })

  return (
    <div className="px-5 pb-6 relative">
      <div className="flex gap-2 mb-6">
        {subTabs.map((st) => (
          <button key={st} onClick={() => setSubTab(st)} className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${subTab === st ? 'bg-white text-black' : 'bg-transparent border border-[#444] text-[#888]'}`}>
            {st}
          </button>
        ))}
      </div>

      {subTab === 'Perfil' && (
        <div className="divide-y divide-[#2a2a3a]">
          {[
            { label: 'Cuenta', value: 'Pablo Creel' },
            { label: 'Contraseña', value: '••••••••••' },
            { label: 'Membresía', value: '5114 ••• 1775' },
            { label: 'Plan', value: 'Premium' },
          ].map((item) => (
            <button key={item.label} onClick={() => setModal(item.label)} className="w-full flex items-center justify-between py-4 text-left active:bg-[#1a1a25]">
              <span className="text-white text-sm font-semibold">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#666680] text-sm">{item.value}</span>
                <span className="text-[#444] text-sm">›</span>
              </div>
            </button>
          ))}

          <div className="pt-5">
            <h3 className="text-white text-lg font-bold mb-3">Preferencias</h3>
            {[{ label: 'Idioma', value: 'Español' }, { label: 'Sobre la App', value: 'v2.0.0' }].map((item) => (
              <button key={item.label} onClick={() => setModal(item.label)} className="w-full flex items-center justify-between py-3.5 border-b border-[#2a2a3a] last:border-0 text-left active:bg-[#1a1a25]">
                <span className="text-white text-sm font-semibold">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#666680] text-sm">{item.value}</span>
                  <span className="text-[#444] text-sm">›</span>
                </div>
              </button>
            ))}
          </div>

          <button onClick={onLogout} className="w-full mt-6 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl font-semibold text-sm active:bg-red-500/20">
            Cerrar sesión
          </button>
        </div>
      )}

      {subTab === 'Favoritos' && (
        <div>
          <h3 className="text-white text-lg font-bold mb-1">Marcas Favoritas</h3>
          <p className="text-[#666680] text-xs mb-4">Recibe alertas de tus marcas</p>
          {['Cinépolis', 'Starbucks', 'Liverpool'].map((brand) => (
            <button key={brand} onClick={() => setModal(brand)} className="w-full flex items-center justify-between py-3.5 border-b border-[#2a2a3a] text-left active:bg-[#1a1a25]">
              <span className="text-white text-sm font-semibold">{brand}</span>
              <span className="text-blue-400 text-xs">Ver ofertas ›</span>
            </button>
          ))}
        </div>
      )}

      {subTab === 'Comunicaciones' && (
        <div>
          <h3 className="text-white text-lg font-bold mb-1">Comunicaciones</h3>
          <p className="text-[#666680] text-xs mb-4">Elige qué quieres recibir</p>
          {[
            { key: 'ofertas', label: 'Ofertas y Promociones', desc: 'Descuentos nuevos de tus categorías' },
            { key: 'cercanas', label: 'Ofertas Cercanas', desc: 'Alertas cuando estés cerca' },
            { key: 'newsletter', label: 'Newsletter Semanal', desc: 'Resumen de las mejores ofertas' },
            { key: 'sorteos', label: 'Sorteos y Eventos', desc: 'Invitaciones exclusivas para miembros' },
            { key: 'updates', label: 'Actualizaciones', desc: 'Nuevas funciones y mejoras' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3.5 border-b border-[#2a2a3a]">
              <div>
                <p className="text-white text-sm font-semibold">{item.label}</p>
                <p className="text-[#666680] text-[11px] mt-0.5">{item.desc}</p>
              </div>
              <V2Toggle enabled={comms[item.key]} onChange={(v) => setComms(prev => ({ ...prev, [item.key]: v }))} />
            </div>
          ))}
        </div>
      )}

      {modal && (
        <V2Modal title={modal} onClose={() => setModal(null)}>
          <p className="text-[#888] text-sm">Configuración de {modal} — próximamente disponible en la versión final.</p>
          <button onClick={() => setModal(null)} className="w-full h-11 bg-blue-500 rounded-xl text-white text-sm font-semibold mt-4 active:scale-[0.98]">Entendido</button>
        </V2Modal>
      )}
    </div>
  )
}

function SupportTab() {
  const [openFaq, setOpenFaq] = useState(null)
  const faqs = [
    { q: '¿Qué es DescluB?', a: 'DescluB es la red de descuentos más grande de México con más de 6,000 establecimientos y 500 marcas afiliadas.' },
    { q: '¿Cuánto cuesta la membresía?', a: 'Tu membresía es un beneficio proporcionado por tu empresa o programa de lealtad. No tiene costo adicional para ti.' },
    { q: '¿Qué beneficios recibo?', a: 'Acceso a descuentos exclusivos en restaurantes, entretenimiento, retail, viajes, wellness y más.' },
    { q: '¿Cómo canjeo un descuento?', a: 'Selecciona el descuento, presiona "Canjear descuento" y muestra el código QR en el establecimiento.' },
    { q: '¿Por qué no veo un beneficio?', a: 'Algunos beneficios son exclusivos por zona, categoría de membresía o empresa. Contacta soporte vía WhatsApp.' },
  ]

  return (
    <div className="px-5 pb-6">
      <h3 className="text-white text-lg font-bold mb-4">Preguntas Frecuentes</h3>
      <div className="divide-y divide-[#2a2a3a]">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-4 text-left active:bg-[#1a1a25]">
              <span className="text-white text-sm font-semibold pr-4">{faq.q}</span>
              <span className="text-[#666680] text-lg shrink-0">{openFaq === i ? '∧' : '∨'}</span>
            </button>
            {openFaq === i && <p className="text-[#888] text-sm pb-4 leading-relaxed">{faq.a}</p>}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button
          onClick={() => window.open('https://wa.me/525500000000', '_blank')}
          className="w-full h-14 bg-[#25D366] rounded-2xl text-white text-sm font-bold flex items-center justify-center gap-3 active:scale-[0.97] transition-transform shadow-lg shadow-[#25D366]/20"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat de Soporte vía WhatsApp
        </button>
      </div>
    </div>
  )
}

export default function V2App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('Inicio')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [showCard, setShowCard] = useState(false)

  if (!loggedIn) return <V2Login onLogin={() => setLoggedIn(true)} />

  return (
    <div className="h-full flex flex-col bg-[#111118] text-white relative">
      {/* Header */}
      <div className="pt-12 pb-3 px-5 bg-[#111118]">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-blue-400 text-xl font-bold">◎</span>
              <span className="text-white text-lg font-bold tracking-tight">DescluB</span>
              <span className="text-[#444] text-[10px] font-semibold bg-[#1c1c28] px-2 py-0.5 rounded-full">PASS</span>
            </div>
            <p className="text-white text-base font-semibold">Bienvenido, Pablo</p>
          </div>
        </div>
        <button onClick={() => setShowCard(true)} className="w-full bg-[#1c1c28] border border-[#2a2a3a] rounded-xl py-3 text-center text-sm text-white font-semibold mt-2 active:bg-[#252535]">
          📋 Ver Tarjeta de Membresía
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2a2a3a] px-5 bg-[#111118]">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 text-xs font-semibold text-center transition-colors relative ${activeTab === tab ? 'text-white' : 'text-[#555]'}`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full" />}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pt-5">
        {activeTab === 'Inicio' && <OverviewTab onDealClick={setSelectedDeal} onShowCard={() => setShowCard(true)} />}
        {activeTab === 'Beneficios' && <BenefitsTab onDealClick={setSelectedDeal} />}
        {activeTab === 'Mi Cuenta' && <AccountTab onLogout={() => setLoggedIn(false)} />}
        {activeTab === 'Soporte' && <SupportTab />}
      </div>

      {/* Deal Detail Modal */}
      {selectedDeal && <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}

      {/* Card Modal */}
      {showCard && (
        <V2Modal title="Tu Membresía" onClose={() => setShowCard(false)}>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-[-10px] right-[-10px] w-32 h-32 rounded-full border-[16px] border-white/10" />
            <p className="text-white/60 text-[10px] font-semibold mb-6">DESCLUB PREMIUM PASS</p>
            <p className="text-white text-lg font-mono tracking-[3px]">5114 1102 5020 1775</p>
            <div className="flex justify-between mt-4">
              <div><p className="text-white/50 text-[9px]">MIEMBRO</p><p className="text-white text-sm font-semibold">Pablo Creel</p></div>
              <div className="text-right"><p className="text-white/50 text-[9px]">VENCE</p><p className="text-white text-sm font-semibold">06/26</p></div>
            </div>
          </div>
          <button className="w-full h-12 bg-white text-black rounded-xl font-semibold text-sm mt-4 active:scale-[0.98]"> Agregar a Wallet</button>
        </V2Modal>
      )}
    </div>
  )
}
