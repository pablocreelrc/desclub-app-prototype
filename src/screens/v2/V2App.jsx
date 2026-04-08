import { useState } from 'react'
import V2Login from './V2Login'
import StatusBar from '../../components/StatusBar'

const TABS = ['Overview', 'Beneficios', 'Mi Cuenta', 'Soporte']

const DEALS = [
  { id: 1, brand: 'Cinépolis', discount: '2x1', detail: 'Boletos Martes y Jueves', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop', cat: 'Entretenimiento', description: 'Compra 1 boleto y lleva el 2do GRATIS todos los martes y jueves. Aplica para todas las salas incluyendo IMAX, 4DX y Macro XE.', expiry: '15 días', redeemed: 342, terms: ['Válido martes y jueves', 'No acumulable con otras promociones', 'Presentar membresía DescluB vigente', 'Sujeto a disponibilidad'] },
  { id: 2, brand: 'Hertz', discount: '25% OFF', detail: 'Renta de auto fin de semana', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=300&fit=crop', cat: 'Transporte', description: 'Obtén 25% de descuento en tu renta de auto para fines de semana. Incluye seguro básico y kilometraje ilimitado.', expiry: '30 días', redeemed: 128, terms: ['Válido viernes a domingo', 'Reservación con 48hrs de anticipación', 'Presentar membresía DescluB vigente', 'No aplica en temporada alta'] },
  { id: 3, brand: 'Starbucks', discount: '15% OFF', detail: 'Todas las bebidas', image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=300&fit=crop', cat: 'Alimentos', description: '15% de descuento en cualquier bebida del menú. Aplica en cualquier sucursal participante.', expiry: '7 días', redeemed: 891, terms: ['Una bebida por visita', 'No acumulable', 'Sucursales participantes', 'Presentar QR de membresía'] },
  { id: 4, brand: 'Sport City', discount: '3 días GRATIS', detail: 'Pase de cortesía completo', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop', cat: 'Wellness', description: 'Prueba Sport City con 3 días de acceso completo a todas las instalaciones sin costo.', expiry: '10 días', redeemed: 256, terms: ['Una vez por usuario', 'Registro presencial requerido', 'Aplica en cualquier sucursal', 'Mayor de 18 años'] },
  { id: 5, brand: 'Liverpool', discount: '20% OFF', detail: 'Ropa y accesorios seleccionados', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop', cat: 'Retail', description: '20% de descuento en ropa y accesorios seleccionados. Válido en tienda física y en línea.', expiry: '20 días', redeemed: 567, terms: ['Departamentos seleccionados', 'No aplica con otras promociones', 'Válido en tienda y online', 'Máximo $5,000 MXN de descuento'] },
  { id: 6, brand: 'Volaris', discount: '10% OFF', detail: 'Vuelos nacionales exclusivos', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=300&fit=crop', cat: 'Viajes', description: 'Descuento exclusivo en vuelos nacionales comprando desde la app de Volaris con tu código DescluB.', expiry: '45 días', redeemed: 89, terms: ['Compra en volaris.com o app', 'Código único por membresía', 'Sujeto a disponibilidad de tarifas', 'No aplica en temporada alta'] },
  { id: 7, brand: 'Tim Hortons', discount: '2x1', detail: 'Cafés y donuts L-M', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=300&fit=crop', cat: 'Alimentos', description: '2x1 en todos los cafés y donuts de lunes a miércoles. Aplica en sucursales participantes.', expiry: '12 días', redeemed: 445, terms: ['Válido lunes a miércoles', 'Una promoción por visita', 'Sucursales participantes', 'No aplica en delivery'] },
  { id: 8, brand: 'Devlyn', discount: '30% OFF', detail: 'Lentes y armazones premium', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=300&fit=crop', cat: 'Retail', description: '30% de descuento en armazones y lentes graduados. Incluye marcas premium como Ray-Ban y Oakley.', expiry: '25 días', redeemed: 198, terms: ['Armazones seleccionados', 'Incluye antirreflejante básico', 'Presentar membresía vigente', 'No acumulable'] },
]

function V2Toggle({ enabled, onChange }) {
  return (
    <button onClick={() => onChange(!enabled)} className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? 'bg-white' : 'bg-[#333]'}`}>
      <div className={`w-5 h-5 rounded-full absolute top-0.5 shadow transition-transform ${enabled ? 'bg-black translate-x-[22px]' : 'bg-[#888] translate-x-0.5'}`} />
    </button>
  )
}

/* Full-screen Deal Detail Page */
function DealDetail({ deal, onBack }) {
  const [showQR, setShowQR] = useState(false)
  if (!deal) return null

  return (
    <div className="h-full flex flex-col bg-black relative">
      <StatusBar variant="dark" />
      <div className="h-64 relative shrink-0 overflow-hidden">
        <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        <button onClick={onBack} className="absolute top-14 left-5 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg active:scale-90 transition-transform">←</button>
        <div className="absolute bottom-4 left-5">
          <span className="bg-white text-black text-2xl font-bold px-5 py-2.5 rounded-xl">{deal.discount}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <h1 className="text-3xl font-bold text-white">{deal.brand}</h1>
        <p className="text-sm text-[#888] mt-1.5">{deal.cat} — {deal.detail}</p>
        <p className="text-[15px] text-[#aaa] mt-5 leading-relaxed">{deal.description}</p>

        <div className="flex gap-2 mt-5 flex-wrap">
          <span className="text-red-400 text-xs font-semibold">Vence en {deal.expiry}</span>
          <span className="text-[#555]">·</span>
          <span className="text-[#888] text-xs">{deal.redeemed.toLocaleString()} canjearon</span>
        </div>

        <div className="mt-8">
          <h3 className="text-white text-lg font-bold mb-1">Cómo canjear</h3>
          <div className="w-full h-px bg-[#333] mb-4" />
          <div className="flex gap-6">
            {['Muestra tu QR', 'El comercio lo escanea', 'Disfruta tu descuento'].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <p className="text-white text-lg font-bold mb-1">{i + 1}</p>
                <p className="text-[#888] text-[11px] leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-white text-lg font-bold mb-1">Términos</h3>
          <div className="w-full h-px bg-[#333] mb-4" />
          {deal.terms.map((t, i) => (
            <p key={i} className="text-[#888] text-sm py-2 border-b border-[#1a1a1a] last:border-0">{t}</p>
          ))}
        </div>
      </div>

      {showQR && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-[#111] rounded-3xl p-8 mx-6 text-center border border-[#222]" onClick={e => e.stopPropagation()}>
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
            <button onClick={() => setShowQR(false)} className="mt-5 w-full h-11 border border-[#333] rounded-xl text-white text-sm font-semibold active:bg-[#222]">Cerrar</button>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-[#222] px-5 pt-3 pb-8">
        <button onClick={() => setShowQR(true)} className="w-full h-[52px] bg-white text-black rounded-xl flex items-center justify-center font-bold text-[17px] active:scale-[0.97] transition-transform">
          Canjear descuento
        </button>
      </div>
    </div>
  )
}

/* ─── Overview Tab ─── */
function OverviewTab({ onDealClick, onShowCard }) {
  return (
    <div className="px-5 pb-8">
      {/* Getting Started hero — like PGA "Golf, Rewarded" */}
      <div className="rounded-xl overflow-hidden mb-8">
        <div className="relative h-36">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=250&fit=crop" alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-xl font-bold">Descuentos, Premiados</h3>
            <p className="text-[#aaa] text-xs mt-1">Guía rápida: Cómo aprovechar tu DescluB Pass al máximo</p>
          </div>
        </div>
      </div>

      {/* Getting started 2x2 grid — like PGA Tour actions */}
      <div className="grid grid-cols-2 gap-3 mb-10">
        {[
          { label: 'Activar ubicación para ofertas locales', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&h=200&fit=crop' },
          { label: 'Agregar marcas favoritas a tu perfil', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop' },
          { label: 'Agregar tarjeta a Apple Wallet', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop', onClick: onShowCard },
          { label: 'Activar notificaciones de ofertas', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=200&fit=crop' },
        ].map((item, i) => (
          <button key={i} onClick={item.onClick} className="rounded-xl overflow-hidden text-left active:opacity-80 transition-opacity">
            <div className="relative h-24">
              <img src={item.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <p className="text-white text-xs font-medium mt-2 leading-tight">{item.label}</p>
          </button>
        ))}
      </div>

      {/* Around Me — PGA "Around Me" section */}
      <h2 className="text-white text-2xl font-bold mb-1">Cerca de ti</h2>
      <div className="w-16 h-0.5 bg-blue-500 mb-5" />

      <div className="space-y-0">
        {DEALS.filter(d => d.detail).slice(0, 3).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full flex items-center gap-4 py-4 border-b border-[#1a1a1a] text-left active:bg-[#111] transition-colors">
            <img src={deal.image} alt={deal.brand} className="w-16 h-16 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold">{deal.brand}</p>
              <p className="text-[#888] text-xs mt-0.5">{deal.detail}</p>
            </div>
            <span className="text-white text-sm font-bold shrink-0">{deal.discount}</span>
          </button>
        ))}
      </div>

      {/* Content & Promotions — PGA "Content & Promotions" carousel */}
      <h2 className="text-white text-2xl font-bold mt-10 mb-1">Contenido y Promociones</h2>
      <div className="w-16 h-0.5 bg-blue-500 mb-5" />

      <div className="space-y-4">
        {DEALS.slice(3, 6).map((deal) => (
          <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full rounded-xl overflow-hidden text-left active:scale-[0.98] transition-transform">
            <div className="relative h-44">
              <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-bold text-base">{deal.brand}</p>
                <p className="text-[#aaa] text-xs mt-0.5">{deal.detail} — {deal.discount}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Dot indicators like PGA */}
      <div className="flex justify-center gap-1.5 mt-4">
        {[0, 1, 2, 3, 4, 5].map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-[#333]'}`} />
        ))}
      </div>
    </div>
  )
}

/* ─── Benefits Tab ─── */
function BenefitsTab({ onDealClick }) {
  const categories = [
    { title: 'Ofertas de Entretenimiento', desc: 'Cine, eventos, espectáculos y más', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop', deals: DEALS.filter(d => d.cat === 'Entretenimiento') },
    { title: 'Sorteos Exclusivos', desc: 'Sorteos exclusivos para miembros DescluB', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=300&fit=crop', deals: [] },
    { title: 'Ofertas de Marcas', desc: 'Descuentos de tus marcas favoritas', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop', deals: DEALS.filter(d => d.cat === 'Retail') },
    { title: 'Experiencias VIP', desc: 'Accesos y experiencias premium', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop', deals: DEALS.filter(d => d.cat === 'Wellness') },
    { title: 'Viajes y Hospedaje', desc: 'Descuentos en hoteles, vuelos y más', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=300&fit=crop', deals: DEALS.filter(d => d.cat === 'Viajes') },
  ]
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="px-5 pb-8">
      {/* Category cards — PGA style: image + title + desc stacked */}
      {categories.map((cat, i) => (
        <div key={i} className="mb-4">
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full text-left active:opacity-80 transition-opacity"
          >
            <div className="relative h-36 rounded-xl overflow-hidden">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="mt-2 flex items-start justify-between">
              <div>
                <p className="text-white font-bold text-base">{cat.title}</p>
                <p className="text-[#888] text-xs mt-0.5">{cat.desc}</p>
              </div>
              <span className="text-[#555] text-lg mt-1">{expanded === i ? '∧' : '∨'}</span>
            </div>
          </button>

          {expanded === i && cat.deals.length > 0 && (
            <div className="mt-3">
              {cat.deals.map(deal => (
                <button key={deal.id} onClick={() => onDealClick(deal)} className="w-full flex items-center gap-3 py-3 border-b border-[#1a1a1a] text-left active:bg-[#111]">
                  <img src={deal.image} alt={deal.brand} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{deal.brand}</p>
                    <p className="text-[#666] text-xs">{deal.detail}</p>
                  </div>
                  <span className="text-white text-xs font-bold">{deal.discount}</span>
                </button>
              ))}
            </div>
          )}
          {expanded === i && cat.deals.length === 0 && (
            <p className="text-[#555] text-xs py-4">Próximamente — estamos preparando ofertas exclusivas</p>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── My Account Tab ─── */
function AccountTab({ onLogout }) {
  const [subTab, setSubTab] = useState('Perfil')
  const subTabs = ['Perfil', 'Favoritos', 'Comunicaciones']
  const [comms, setComms] = useState({ ofertas: true, cercanas: true, newsletter: true, sorteos: false, updates: false })

  return (
    <div className="px-5 pb-8">
      {/* Sub-tab pills — PGA style */}
      <div className="flex gap-2 mb-6">
        {subTabs.map((st) => (
          <button key={st} onClick={() => setSubTab(st)} className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-colors ${subTab === st ? 'bg-white text-black' : 'border border-[#444] text-[#888]'}`}>
            {st}
          </button>
        ))}
      </div>

      {subTab === 'Perfil' && (
        <div>
          {/* Profile section — PGA style with line separators */}
          <h2 className="text-white text-2xl font-bold mb-1">Perfil</h2>
          <div className="w-full h-0.5 bg-blue-500 mb-4" />

          {[
            { label: 'Cuenta', value: 'Pablo Creel' },
            { label: 'Contraseña', value: '************' },
            { label: 'Mi Membresía', value: 'DescluB Pass' },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between py-5 border-b border-[#1a1a1a] text-left active:bg-[#111]">
              <span className="text-white text-base font-semibold">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#888] text-sm">{item.value}</span>
                <span className="text-[#555]">›</span>
              </div>
            </button>
          ))}

          <h2 className="text-white text-2xl font-bold mt-8 mb-1">Preferencias</h2>
          <div className="w-full h-0.5 bg-blue-500 mb-4" />

          {[
            { label: 'Idioma', value: 'Español' },
            { label: 'Privacidad', value: '' },
            { label: 'Enviar feedback', value: '' },
            { label: 'Sobre la App', value: '2.0.0' },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between py-5 border-b border-[#1a1a1a] text-left active:bg-[#111]">
              <span className="text-white text-base font-semibold">{item.label}</span>
              <div className="flex items-center gap-2">
                {item.value && <span className="text-[#888] text-sm">{item.value}</span>}
                <span className="text-[#555]">›</span>
              </div>
            </button>
          ))}

          <button onClick={onLogout} className="w-full mt-8 py-4 text-red-400 text-base font-semibold text-left border-t border-[#1a1a1a]">
            Cerrar sesión
          </button>
        </div>
      )}

      {subTab === 'Favoritos' && (
        <div>
          <h2 className="text-white text-2xl font-bold mb-1">Marcas Favoritas</h2>
          <div className="w-full h-0.5 bg-blue-500 mb-4" />

          {['Cinépolis', 'Starbucks', 'Liverpool', 'Tim Hortons', 'Sport City'].map((brand) => (
            <button key={brand} className="w-full flex items-center justify-between py-5 border-b border-[#1a1a1a] text-left active:bg-[#111]">
              <span className="text-white text-base font-semibold">{brand}</span>
              <span className="text-[#555]">›</span>
            </button>
          ))}

          <h2 className="text-white text-2xl font-bold mt-8 mb-1">Categorías Favoritas</h2>
          <div className="w-full h-0.5 bg-blue-500 mb-4" />

          {[
            { label: 'Entretenimiento', count: 2 },
            { label: 'Alimentos', count: 3 },
            { label: 'Retail', count: 2 },
          ].map((cat) => (
            <button key={cat.label} className="w-full flex items-center justify-between py-5 border-b border-[#1a1a1a] text-left active:bg-[#111]">
              <span className="text-white text-base font-semibold">{cat.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#888] text-sm">{cat.count}</span>
                <span className="text-[#555]">›</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {subTab === 'Comunicaciones' && (
        <div>
          <button className="w-full flex items-center justify-between py-5 border-b border-[#1a1a1a] text-left active:bg-[#111]">
            <span className="text-white text-base font-semibold">Notificaciones</span>
            <div className="flex items-center gap-2">
              <span className="text-[#888] text-sm">On</span>
              <span className="text-[#555]">›</span>
            </div>
          </button>

          <h2 className="text-white text-2xl font-bold mt-8 mb-1">Comunicaciones</h2>
          <div className="w-full h-0.5 bg-blue-500 mb-2" />
          <p className="text-[#888] text-sm mb-6">Elige qué comunicaciones quieres recibir de DescluB.</p>

          <h3 className="text-white text-lg font-bold mb-1">Newsletters DescluB</h3>
          <div className="w-full h-px bg-[#333] mb-4" />

          {[
            { key: 'ofertas', label: 'Ofertas y Promociones' },
            { key: 'cercanas', label: 'Ofertas Cercanas' },
            { key: 'newsletter', label: 'Newsletter Semanal' },
            { key: 'sorteos', label: 'Sorteos y Eventos' },
            { key: 'updates', label: 'Actualizaciones de la App' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
              <span className="text-white text-sm font-semibold">{item.label}</span>
              <V2Toggle enabled={comms[item.key]} onChange={(v) => setComms(prev => ({ ...prev, [item.key]: v }))} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Support Tab ─── */
function SupportTab() {
  const [openFaq, setOpenFaq] = useState(null)
  const faqs = [
    { q: '¿Qué es DescluB Pass?', a: 'DescluB es la red de descuentos más grande de México con más de 6,000 establecimientos y 500 marcas afiliadas.' },
    { q: '¿Cuánto cuesta la membresía?', a: 'Tu membresía es un beneficio proporcionado por tu empresa o programa de lealtad. No tiene costo adicional para ti.' },
    { q: '¿Qué beneficios recibo?', a: 'Acceso a descuentos exclusivos en restaurantes, entretenimiento, retail, viajes, wellness y más.' },
    { q: '¿Cómo canjeo un descuento?', a: 'Selecciona el descuento, presiona "Canjear descuento" y muestra el código QR en el establecimiento.' },
    { q: '¿Por qué no veo un beneficio?', a: 'Algunos beneficios son exclusivos por zona, categoría de membresía o empresa. Contacta soporte vía WhatsApp.' },
    { q: 'Un beneficio ya no está disponible. ¿Qué pasó?', a: 'Las promociones están sujetas a disponibilidad y pueden cambiar sin previo aviso. Revisa la sección de Beneficios para ver ofertas actualizadas.' },
    { q: '¿Cómo contacto soporte?', a: 'Usa el botón de WhatsApp abajo para chatear con nuestro equipo de soporte 24/7.' },
  ]

  return (
    <div className="px-5 pb-8">
      <h2 className="text-white text-2xl font-bold mb-1">FAQs</h2>
      <div className="w-full h-0.5 bg-blue-500 mb-4" />

      {faqs.map((faq, i) => (
        <div key={i}>
          <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 border-b border-[#1a1a1a] text-left active:bg-[#111]">
            <span className="text-white text-base font-bold pr-4">{faq.q}</span>
            <span className="text-[#555] text-lg shrink-0">{openFaq === i ? '∧' : '∨'}</span>
          </button>
          {openFaq === i && <p className="text-[#888] text-sm py-4 leading-relaxed border-b border-[#1a1a1a]">{faq.a}</p>}
        </div>
      ))}

      {/* WhatsApp support */}
      <div className="mt-10">
        <button
          onClick={() => window.open('https://wa.me/525500000000', '_blank')}
          className="w-full h-14 bg-[#25D366] rounded-xl text-white text-sm font-bold flex items-center justify-center gap-3 active:scale-[0.97] transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Chat de Soporte vía WhatsApp
        </button>
      </div>
    </div>
  )
}

/* ─── Main V2App ─── */
export default function V2App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [showCard, setShowCard] = useState(false)

  if (!loggedIn) {
    return (
      <div className="h-full relative">
        <StatusBar variant="dark" />
        <V2Login onLogin={() => setLoggedIn(true)} />
      </div>
    )
  }

  if (selectedDeal) {
    return <DealDetail deal={selectedDeal} onBack={() => setSelectedDeal(null)} />
  }

  return (
    <div className="h-full flex flex-col bg-black text-white relative">
      <StatusBar variant="dark" />

      {/* Header — PGA style: logo + welcome + membership card button */}
      <div className="pt-14 pb-3 px-5 bg-[#0a0f1a]">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1a2744] rounded-md flex items-center justify-center">
              <span className="text-white text-lg font-bold">◎</span>
            </div>
            <div>
              <p className="text-white text-sm font-bold tracking-tight leading-none">DESCLUB</p>
              <p className="text-white text-lg font-black tracking-tight leading-none">PASS</p>
            </div>
          </div>
          <button className="w-7 h-7 rounded-full border border-[#444] flex items-center justify-center text-[#888] text-xs active:bg-[#222]">✕</button>
        </div>

        <p className="text-white text-lg font-bold mb-3">Bienvenido, Pablo</p>

        <button onClick={() => setShowCard(true)} className="w-full border border-[#444] rounded-lg py-3 text-center text-white text-sm font-medium flex items-center justify-center gap-2 active:bg-[#111]">
          <span className="text-sm">📋</span> Tarjeta de Membresía
        </button>
      </div>

      {/* Top tabs — PGA style */}
      <div className="flex px-5 bg-black">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-xs font-semibold text-center transition-colors relative ${activeTab === tab ? 'text-white' : 'text-[#666]'}`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-1 right-1 h-0.5 bg-white" />}
          </button>
        ))}
      </div>
      <div className="w-full h-px bg-[#222]" />

      {/* Content */}
      <div className="flex-1 overflow-y-auto pt-6">
        {activeTab === 'Overview' && <OverviewTab onDealClick={setSelectedDeal} onShowCard={() => setShowCard(true)} />}
        {activeTab === 'Beneficios' && <BenefitsTab onDealClick={setSelectedDeal} />}
        {activeTab === 'Mi Cuenta' && <AccountTab onLogout={() => setLoggedIn(false)} />}
        {activeTab === 'Soporte' && <SupportTab />}
      </div>

      {/* Card Modal */}
      {showCard && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end" onClick={() => setShowCard(false)}>
          <div className="bg-[#111] w-full rounded-t-3xl p-6 pb-10 border-t border-[#222]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-bold">Tu Membresía</h2>
              <button onClick={() => setShowCard(false)} className="text-[#666] text-xl">✕</button>
            </div>
            <div className="bg-gradient-to-br from-[#1a2744] to-[#0f1a30] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute top-[-10px] right-[-10px] w-32 h-32 rounded-full border-[16px] border-white/5" />
              <p className="text-[#556] text-[10px] font-semibold mb-6">DESCLUB PASS</p>
              <p className="text-white text-lg font-mono tracking-[3px]">5114 1102 5020 1775</p>
              <div className="flex justify-between mt-4">
                <div><p className="text-[#556] text-[9px]">MIEMBRO</p><p className="text-white text-sm font-semibold">Pablo Creel</p></div>
                <div className="text-right"><p className="text-[#556] text-[9px]">VENCE</p><p className="text-white text-sm font-semibold">06/26</p></div>
              </div>
            </div>
            <button className="w-full h-12 bg-white text-black rounded-xl font-semibold text-sm mt-4 active:scale-[0.98]"> Agregar a Wallet</button>
          </div>
        </div>
      )}
    </div>
  )
}
