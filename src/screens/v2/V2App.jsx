import { useState } from 'react'
import V2Login from './V2Login'

const TABS = ['Overview', 'Benefits', 'My Account', 'Support']

const DEALS = [
  { id: 1, brand: 'Cinépolis', discount: '2x1', detail: 'Boletos Martes y Jueves', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=300&fit=crop', cat: 'Entretenimiento' },
  { id: 2, brand: 'Hertz', discount: '25% OFF', detail: 'Renta de auto fin de semana', image: 'https://images.unsplash.com/photo-1449965408869-ebd13bc7e0a6?w=600&h=300&fit=crop', cat: 'Transporte' },
  { id: 3, brand: 'Starbucks', discount: '15% OFF', detail: 'Todas las bebidas', image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=600&h=300&fit=crop', cat: 'Alimentos' },
  { id: 4, brand: 'Sport City', discount: '3 días GRATIS', detail: 'Pase de cortesía completo', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop', cat: 'Wellness' },
  { id: 5, brand: 'Liverpool', discount: '20% OFF', detail: 'Ropa y accesorios seleccionados', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop', cat: 'Retail' },
  { id: 6, brand: 'Volaris', discount: '10% OFF', detail: 'Vuelos nacionales exclusivos', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=300&fit=crop', cat: 'Viajes' },
  { id: 7, brand: 'Tim Hortons', discount: '2x1', detail: 'Cafés y donuts L-M', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=300&fit=crop', cat: 'Alimentos' },
  { id: 8, brand: 'Devlyn', discount: '30% OFF', detail: 'Lentes y armazones premium', image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=300&fit=crop', cat: 'Retail' },
]

function OverviewTab() {
  return (
    <div className="px-5 pb-6">
      {/* Welcome card */}
      <div className="bg-gradient-to-r from-[#1a2744] to-[#243b6a] rounded-2xl p-5 mb-6 border border-[#2a4070]">
        <p className="text-[#8899bb] text-xs font-medium mb-1">BIENVENIDO DE VUELTA</p>
        <h2 className="text-white text-xl font-bold mb-3">Descuentos Exclusivos, Pablo</h2>
        <p className="text-[#8899bb] text-sm leading-relaxed mb-4">Tu membresía te da acceso a más de 500 marcas y 6,000 establecimientos.</p>
        <button className="bg-white text-[#1a2744] text-sm font-bold px-5 py-2.5 rounded-xl active:scale-95 transition-transform">
          📋 Ver Membresía
        </button>
      </div>

      {/* Around Me */}
      <h3 className="text-white text-lg font-bold mb-3">Cerca de ti</h3>
      <div className="bg-[#1c1c28] rounded-2xl p-6 mb-6 border border-[#2a2a3a] text-center">
        <p className="text-[#666680] text-sm">Activa tu ubicación para ver ofertas cercanas</p>
        <button className="mt-3 text-blue-400 text-sm font-semibold">Activar ubicación →</button>
      </div>

      {/* Content & Promotions */}
      <h3 className="text-white text-lg font-bold mb-3">Promociones Destacadas</h3>
      <div className="space-y-4">
        {DEALS.slice(0, 4).map((deal) => (
          <div key={deal.id} className="rounded-2xl overflow-hidden border border-[#2a2a3a] bg-[#1c1c28]">
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
          </div>
        ))}
      </div>
    </div>
  )
}

function BenefitsTab() {
  const categories = [
    { title: 'Ofertas de Entretenimiento', desc: 'Cine, eventos, espectáculos y más', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=250&fit=crop' },
    { title: 'Sorteos Exclusivos', desc: 'Sorteos exclusivos para miembros DescluB', image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&h=250&fit=crop' },
    { title: 'Ofertas de Marcas', desc: 'Descuentos de tus marcas favoritas', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=250&fit=crop' },
    { title: 'Experiencias VIP', desc: 'Accesos y experiencias premium', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=250&fit=crop' },
    { title: 'Viajes y Hospedaje', desc: 'Descuentos en hoteles, vuelos y más', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=250&fit=crop' },
  ]

  return (
    <div className="px-5 pb-6 space-y-4">
      {categories.map((cat, i) => (
        <button key={i} className="w-full rounded-2xl overflow-hidden border border-[#2a2a3a] bg-[#1c1c28] text-left active:scale-[0.98] transition-transform">
          <div className="relative h-32">
            <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          <div className="p-4">
            <p className="text-white font-bold text-sm">{cat.title}</p>
            <p className="text-[#666680] text-xs mt-1">{cat.desc}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

function AccountTab() {
  const [subTab, setSubTab] = useState('Profile')
  const subTabs = ['Profile', 'Favorites', 'Communications']

  return (
    <div className="px-5 pb-6">
      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6">
        {subTabs.map((st) => (
          <button
            key={st}
            onClick={() => setSubTab(st)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              subTab === st ? 'bg-white text-black' : 'bg-transparent border border-[#444] text-[#888]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {subTab === 'Profile' && (
        <div className="space-y-0 divide-y divide-[#2a2a3a]">
          {[
            { label: 'Cuenta', value: 'Pablo Creel' },
            { label: 'Contraseña', value: '••••••••••' },
            { label: 'Membresía', value: '5114 1102 5020 1775' },
            { label: 'Plan', value: 'Premium' },
            { label: 'Empresa', value: 'Texas McCombs' },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center justify-between py-4 text-left">
              <span className="text-white text-sm font-semibold">{item.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[#666680] text-sm">{item.value}</span>
                <span className="text-[#444] text-sm">›</span>
              </div>
            </button>
          ))}

          <div className="pt-6">
            <h3 className="text-white text-lg font-bold mb-4">Preferences</h3>
            {[
              { label: 'Zona horaria', value: 'CDMX (GMT-6)' },
              { label: 'Idioma', value: 'Español' },
              { label: 'Distancia', value: 'Kilómetros' },
              { label: 'Privacidad', value: '' },
              { label: 'Dar Feedback', value: '' },
              { label: 'Sobre la App', value: 'v2.0.0' },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center justify-between py-3.5 border-b border-[#2a2a3a] last:border-0 text-left">
                <span className="text-white text-sm font-semibold">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.value && <span className="text-[#666680] text-sm">{item.value}</span>}
                  <span className="text-[#444] text-sm">›</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {subTab === 'Favorites' && (
        <div>
          <h3 className="text-white text-lg font-bold mb-1">Categorías Favoritas</h3>
          <p className="text-[#666680] text-xs mb-4">Personaliza tu feed de ofertas</p>
          {['Entretenimiento', 'Alimentos', 'Retail', 'Viajes', 'Wellness'].map((cat) => (
            <button key={cat} className="w-full flex items-center justify-between py-3.5 border-b border-[#2a2a3a] text-left">
              <span className="text-white text-sm font-semibold">{cat}</span>
              <span className="text-[#444] text-sm">›</span>
            </button>
          ))}

          <h3 className="text-white text-lg font-bold mt-6 mb-1">Marcas Favoritas</h3>
          <p className="text-[#666680] text-xs mb-4">Recibe alertas de tus marcas</p>
          {['Cinépolis', 'Starbucks', 'Liverpool'].map((brand) => (
            <button key={brand} className="w-full flex items-center justify-between py-3.5 border-b border-[#2a2a3a] text-left">
              <span className="text-white text-sm font-semibold">{brand}</span>
              <span className="text-blue-400 text-xs">3 ofertas</span>
            </button>
          ))}
        </div>
      )}

      {subTab === 'Communications' && (
        <div>
          <button className="w-full flex items-center justify-between py-3.5 border-b border-[#2a2a3a] text-left">
            <span className="text-white text-sm font-semibold">Notificaciones</span>
            <span className="text-blue-400 text-sm">On</span>
          </button>

          <h3 className="text-white text-lg font-bold mt-6 mb-1">Comunicaciones</h3>
          <p className="text-[#666680] text-xs mb-4">Elige qué quieres recibir</p>
          {[
            { label: 'Ofertas y Promociones', desc: 'Descuentos nuevos de tus categorías' },
            { label: 'Ofertas Cercanas', desc: 'Alertas cuando estés cerca de un descuento' },
            { label: 'Newsletter Semanal', desc: 'Resumen de las mejores ofertas' },
            { label: 'Sorteos y Eventos', desc: 'Invitaciones exclusivas para miembros' },
            { label: 'Actualizaciones del Programa', desc: 'Nuevas funciones y mejoras' },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3.5 border-b border-[#2a2a3a]">
              <div>
                <p className="text-white text-sm font-semibold">{item.label}</p>
                <p className="text-[#666680] text-[11px] mt-0.5">{item.desc}</p>
              </div>
              <div className="w-11 h-6 bg-blue-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SupportTab() {
  const [openFaq, setOpenFaq] = useState(null)
  const faqs = [
    { q: '¿Qué es DescluB?', a: 'DescluB es la red de descuentos más grande de México con más de 6,000 establecimientos y 500 marcas afiliadas.' },
    { q: '¿Cuánto cuesta la membresía?', a: 'Tu membresía es un beneficio proporcionado por tu empresa o programa de lealtad. No tiene costo adicional para ti.' },
    { q: '¿Qué beneficios recibo?', a: 'Acceso a descuentos exclusivos en restaurantes, entretenimiento, retail, viajes, wellness y más. Cada marca ofrece diferentes niveles de descuento.' },
    { q: '¿Cómo canjeo un descuento?', a: 'Selecciona el descuento que quieres usar, presiona "Canjear descuento" y muestra el código QR en el establecimiento.' },
    { q: '¿Por qué no veo un beneficio que alguien más tiene?', a: 'Algunos beneficios son exclusivos por zona geográfica, categoría de membresía o empresa. Contacta soporte para más información.' },
    { q: '¿Qué pasó con mi membresía anterior?', a: 'Si tenías una membresía DescluB anterior, tus datos fueron migrados automáticamente. Si no aparece tu historial, contacta soporte.' },
  ]

  return (
    <div className="px-5 pb-6">
      <h3 className="text-white text-lg font-bold mb-4">Preguntas Frecuentes</h3>
      <div className="space-y-0 divide-y divide-[#2a2a3a]">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="text-white text-sm font-semibold pr-4">{faq.q}</span>
              <span className="text-[#666680] text-lg shrink-0">{openFaq === i ? '∧' : '∨'}</span>
            </button>
            {openFaq === i && (
              <p className="text-[#888] text-sm pb-4 leading-relaxed">{faq.a}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <button className="w-full h-12 bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2 active:bg-[#252535]">
          💬 Chat de Soporte
        </button>
        <button className="w-full h-12 bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2 active:bg-[#252535]">
          📞 Llamar: 800-DESCLUB
        </button>
        <button className="w-full h-12 bg-[#1c1c28] border border-[#2a2a3a] rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2 active:bg-[#252535]">
          📧 soporte@desclub.com.mx
        </button>
      </div>
    </div>
  )
}

export default function V2App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')

  if (!loggedIn) {
    return <V2Login onLogin={() => setLoggedIn(true)} />
  }

  return (
    <div className="h-full flex flex-col bg-[#111118] text-white">
      {/* Header */}
      <div className="pt-12 pb-3 px-5 bg-[#111118]">
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-blue-400 text-xl font-bold">◎</span>
              <span className="text-white text-lg font-bold tracking-tight">DescluB</span>
              <span className="text-[#444] text-[10px] font-semibold bg-[#1c1c28] px-2 py-0.5 rounded-full">PASS</span>
            </div>
            <p className="text-white text-base font-semibold">Welcome, Pablo</p>
          </div>
          <button className="text-[#666680] text-xl">✕</button>
        </div>
        <button className="w-full bg-[#1c1c28] border border-[#2a2a3a] rounded-xl py-3 text-center text-sm text-white font-semibold mt-2 active:bg-[#252535]">
          📋 Membership Card
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2a2a3a] px-5 bg-[#111118]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-semibold text-center transition-colors relative ${
              activeTab === tab ? 'text-white' : 'text-[#555]'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pt-5">
        {activeTab === 'Overview' && <OverviewTab />}
        {activeTab === 'Benefits' && <BenefitsTab />}
        {activeTab === 'My Account' && <AccountTab />}
        {activeTab === 'Support' && <SupportTab />}
      </div>
    </div>
  )
}
