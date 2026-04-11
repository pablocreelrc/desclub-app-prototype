import { useState } from 'react'
import { USER } from '../../data/user'
import { useApp } from '../../context/AppContext'
import WhatsAppButton from '../../components/WhatsAppButton'

const FAQS = [
  { q: 'Que es DescluB?', a: 'DescluB es la red de descuentos mas grande de México con mas de 6,000 establecimientos y 500 marcas afiliadas.' },
  { q: 'Cuanto cuesta la membresía?', a: 'Tu membresía es un beneficio proporcionado por tu empresa o programa de lealtad. No tiene costo adicional para ti.' },
  { q: 'Que beneficios recibo?', a: 'Acceso a descuentos exclusivos en restaurantes, entretenimiento, retail, viajes, wellness y mas.' },
  { q: 'Cómo canjeo un descuento?', a: 'Selecciona el descuento, presiona "Canjear descuento" y muestra el código QR en el establecimiento.' },
  { q: 'Por que no veo un beneficio?', a: 'Algunos beneficios son exclusivos por zona, categoría de membresía o empresa. Contacta soporte via WhatsApp.' },
  { q: 'Un beneficio ya no esta disponible. Que paso?', a: 'Las promociónes estan sujetas a disponibilidad y pueden cambiar sin previo aviso. Revisa la sección de Beneficios para ver ofertas actualizadas.' },
  { q: 'Cómo contacto soporte?', a: 'Usa el boton de WhatsApp abajo para chatear con nuestro equipo de soporte 24/7.' },
]

const HISTORY = [
  { brand: 'Cinépolis', date: 'Hoy, 3:45 PM', saved: '$89' },
  { brand: 'Starbucks', date: 'Ayer, 9:20 AM', saved: '$42' },
  { brand: 'Liverpool', date: '3 abr, 2:10 PM', saved: '$580' },
  { brand: 'Tim Hortons', date: '1 abr, 11:00 AM', saved: '$65' },
  { brand: 'Sport City', date: '28 mar', saved: '$350' },
]

const TERMS_TEXT = 'Al utilizar la aplicacion DescluB, aceptas los presentes términos y condiciones. DescluB es operado por Loyalty Solutions SA de CV. Los descuentos y promociónes estan sujetos a disponibilidad y pueden cambiar sin previo aviso. La membresía es personal e intransferible. Los puntos acumulados tienen una vigencia de 12 meses a partir de su generacion. Loyalty Solutions se reserva el derecho de modificar, suspender o cancelar el programa en cualquier momento. Para consultas o aclaraciones, contacta a nuestro equipo de soporte via WhatsApp.'

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-blue-500' : 'bg-[#333]'}`}
    >
      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${enabled ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  )
}

function SectionHeader({ children }) {
  return (
    <div className="mt-6 mb-2 first:mt-2">
      <p className="text-[#666] text-[10px] font-bold uppercase tracking-wider">{children}</p>
      <div className="w-full h-px bg-[#222] mt-1.5" />
    </div>
  )
}

function Row({ label, value, onClick, toggle, onToggle, children }) {
  if (toggle !== undefined) {
    return (
      <div className="flex items-center justify-between py-3.5 border-b border-[#1a1a1a]">
        <span className="text-white text-sm">{label}</span>
        <Toggle enabled={toggle} onChange={onToggle} />
      </div>
    )
  }
  return (
    <>
      <button onClick={onClick} className="w-full flex items-center justify-between py-3.5 border-b border-[#1a1a1a] text-left active:bg-[#0a0a0a]">
        <span className="text-white text-sm">{label}</span>
        <div className="flex items-center gap-2">
          {value && <span className="text-[#888] text-xs">{value}</span>}
          {onClick && <span className="text-[#444]">{'\u203A'}</span>}
        </div>
      </button>
      {children}
    </>
  )
}

export default function ProfileSheet({ onClose, onLogout }) {
  const { savedDeals } = useApp()
  const [activeSection, setActiveSection] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  // Toggles
  const [notifications, setNotifications] = useState(true)
  const [locationAlerts, setLocationAlerts] = useState(true)
  const [comms, setComms] = useState({ ofertas: true, cercanas: true, newsletter: true, sorteos: false })

  // Form state
  const [personalInfo, setPersonalInfo] = useState({ name: USER.name, email: 'pablo@creel.com', phone: '+52 55 1234 5678' })
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })

  // Rating
  const [rating, setRating] = useState(null)
  const ratingFaces = [
    { emoji: '\uD83D\uDE1E', label: 'Muy mal' },
    { emoji: '\uD83D\uDE10', label: 'Mal' },
    { emoji: '\uD83D\uDE42', label: 'OK' },
    { emoji: '\uD83D\uDE0A', label: 'Bien' },
    { emoji: '\uD83E\uDD29', label: 'Excelente' },
  ]

  const toggle = (section) => {
    setActiveSection(activeSection === section ? null : section)
    setOpenFaq(null)
  }

  const favoriteBrands = ['Cinépolis', 'Starbucks', 'Liverpool', 'Tim Hortons', 'Sport City']

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div
        className="bg-[#111] w-full rounded-t-3xl max-h-[85%] overflow-y-auto border-t border-[#222]"
        style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#333]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-0">
          <h2 className="text-white text-xl font-bold">Mi Cuenta</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#222] active:bg-[#333]">
            <svg className="w-4 h-4 text-[#888]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* User info card */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white text-lg font-bold">{USER.initials}</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-base font-bold">{USER.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-blue-400 text-[10px] font-bold bg-blue-500/15 px-2 py-0.5 rounded-full">{USER.tier}</span>
                <span className="text-[#888] text-xs">{'\u2022'} {USER.points.toLocaleString()} puntos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-5">
          {/* ── Account ── */}
          <SectionHeader>Cuenta</SectionHeader>

          <Row label="Datos personales" onClick={() => toggle('personal')} />
          {activeSection === 'personal' && (
            <div className="py-3 space-y-3 border-b border-[#1a1a1a]">
              {[
                { key: 'name', label: 'Nombre', type: 'text' },
                { key: 'email', label: 'Email', type: 'email' },
                { key: 'phone', label: 'Teléfono', type: 'tel' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[#666] text-[10px] uppercase tracking-wider">{field.label}</label>
                  <input
                    type={field.type}
                    value={personalInfo[field.key]}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm mt-1 outline-none focus:border-blue-500/50"
                  />
                </div>
              ))}
              <button className="w-full h-10 bg-blue-500 rounded-lg text-white text-sm font-semibold active:bg-blue-600">Guardar</button>
            </div>
          )}

          <Row label="Contraseña" onClick={() => toggle('password')} />
          {activeSection === 'password' && (
            <div className="py-3 space-y-3 border-b border-[#1a1a1a]">
              {[
                { key: 'current', label: 'Contraseña actual', placeholder: 'Ingresa tu contraseña actual' },
                { key: 'newPass', label: 'Nueva contraseña', placeholder: 'Minimo 8 caracteres' },
                { key: 'confirm', label: 'Confirmar contraseña', placeholder: 'Repite la nueva contraseña' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-[#666] text-[10px] uppercase tracking-wider">{field.label}</label>
                  <input
                    type="password"
                    value={passwordForm[field.key]}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2.5 text-white text-sm mt-1 outline-none focus:border-blue-500/50 placeholder:text-[#444]"
                  />
                </div>
              ))}
              <button className="w-full h-10 bg-blue-500 rounded-lg text-white text-sm font-semibold active:bg-blue-600">Actualizar</button>
            </div>
          )}

          <Row label="Historial de canjes" value={String(USER.stats.canjes)} onClick={() => toggle('history')} />
          {activeSection === 'history' && (
            <div className="py-2 border-b border-[#1a1a1a]">
              {HISTORY.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5">
                  <div className="w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{item.brand}</p>
                    <p className="text-[#555] text-[11px]">{item.date}</p>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold">-{item.saved}</span>
                </div>
              ))}
            </div>
          )}

          <Row label="Favoritos" value={String(savedDeals.length || USER.stats.favoritos)} onClick={() => toggle('favorites')} />
          {activeSection === 'favorites' && (
            <div className="py-2 border-b border-[#1a1a1a]">
              {favoriteBrands.map((brand, i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <span className="text-white text-sm">{brand}</span>
                  <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
              ))}
            </div>
          )}

          {/* ── Notifications ── */}
          <SectionHeader>Notificaciones</SectionHeader>
          <Row label="Push notifications" toggle={notifications} onToggle={setNotifications} />
          <Row label="Alertas por ubicación" toggle={locationAlerts} onToggle={setLocationAlerts} />

          {/* ── Communications ── */}
          <SectionHeader>Comunicaciones</SectionHeader>
          {[
            { key: 'ofertas', label: 'Ofertas y Promociones' },
            { key: 'cercanas', label: 'Ofertas Cercanas' },
            { key: 'newsletter', label: 'Newsletter Semanal' },
            { key: 'sorteos', label: 'Sorteos y Eventos' },
          ].map((item) => (
            <Row
              key={item.key}
              label={item.label}
              toggle={comms[item.key]}
              onToggle={(v) => setComms(prev => ({ ...prev, [item.key]: v }))}
            />
          ))}

          {/* ── Support ── */}
          <SectionHeader>Soporte</SectionHeader>
          <div className="py-3">
            <WhatsAppButton label="Chat de soporte" />
          </div>

          <Row label="Preguntas frecuentes" onClick={() => toggle('faq')} />
          {activeSection === 'faq' && (
            <div className="py-2 border-b border-[#1a1a1a]">
              {FAQS.map((faq, i) => (
                <div key={i}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-3 text-left">
                    <span className="text-white text-sm font-semibold pr-4">{faq.q}</span>
                    <span className="text-[#555] text-sm shrink-0">{openFaq === i ? '\u2227' : '\u2228'}</span>
                  </button>
                  {openFaq === i && <p className="text-[#888] text-xs pb-3 leading-relaxed">{faq.a}</p>}
                </div>
              ))}
            </div>
          )}

          <Row label="Términos y condiciones" onClick={() => toggle('terms')} />
          {activeSection === 'terms' && (
            <div className="py-3 border-b border-[#1a1a1a]">
              <p className="text-[#888] text-xs leading-relaxed">{TERMS_TEXT}</p>
            </div>
          )}

          {/* ── More ── */}
          <SectionHeader>Más</SectionHeader>

          <Row label="Compartir DescluB" onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'DescluB', text: 'Descuentos exclusivos y puntos que valen.', url: 'https://desclub.mx' })
            }
          }} />

          <Row label="Calificar la app" onClick={() => toggle('rating')} />
          {activeSection === 'rating' && (
            <div className="py-4 border-b border-[#1a1a1a] text-center">
              <p className="text-[#888] text-xs mb-3">Cómo calificarias tu experiencia?</p>
              <div className="flex justify-center gap-4">
                {ratingFaces.map((face, i) => (
                  <button key={i} onClick={() => setRating(i)} className={`text-2xl transition-transform ${rating === i ? 'scale-125' : 'opacity-50'}`}>
                    {face.emoji}
                  </button>
                ))}
              </div>
              {rating !== null && (
                <p className="text-blue-400 text-xs mt-2 font-semibold">Gracias por tu feedback!</p>
              )}
            </div>
          )}

          <Row label="Version" value="2.0.0" />

          {/* Logout */}
          <button onClick={onLogout} className="w-full mt-6 py-4 text-red-400 text-base font-semibold text-center border-t border-[#1a1a1a] active:bg-[#0a0a0a]">
            Cerrar sesión
          </button>

          <p className="text-center text-[#333] text-[10px] mt-3 mb-4">&copy; 2026 Loyalty Solutions SA de CV</p>
        </div>
      </div>
    </div>
  )
}
