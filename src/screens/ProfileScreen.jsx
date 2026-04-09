import { useState } from 'react'
import WhatsAppButton from '../components/WhatsAppButton'

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button onClick={() => onChange(!enabled)} className={`w-10 h-[22px] rounded-full transition-colors relative ${enabled ? 'bg-primary-500' : 'bg-gray-300'}`}>
      <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm absolute top-[2px] transition-transform ${enabled ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} />
    </button>
  )
}

function Row({ label, value, onClick, toggle, toggleValue, onToggle }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 text-left ${onClick ? 'active:bg-gray-50' : ''}`}>
      <span className="flex-1 text-[14px] font-medium text-text-primary">{label}</span>
      {value && <span className="text-[13px] text-text-secondary">{value}</span>}
      {toggle && <ToggleSwitch enabled={toggleValue} onChange={onToggle} />}
      {onClick && !toggle && <span className="text-gray-300 text-[14px]">›</span>}
    </button>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div className="bg-white rounded-t-2xl w-full max-h-[70%] overflow-y-auto p-5 pb-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-gray-400 text-[18px] active:text-gray-600">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function ProfileScreen({ onLogout }) {
  const [notifications, setNotifications] = useState(true)
  const [location, setLocation] = useState(true)
  const [modal, setModal] = useState(null)

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white relative font-va">
      {/* Header */}
      <div className="shrink-0 bg-primary-500 pb-5 px-5 pt-safe md:pt-[54px]">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white text-[20px] font-bold ring-2 ring-white/25">
            PC
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white text-[18px] font-bold">Pablo Creel</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">PREMIUM</span>
              <span className="text-white/50 text-[10px]">Vence 06/2026</span>
            </div>
          </div>
          <button onClick={() => setModal('profile')} className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center text-white text-[13px] active:bg-white/25">
            ✏️
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pt-4 pb-4">
        {/* Account */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider px-1 mb-1.5">Cuenta</p>
          <div className="bg-surface rounded-xl overflow-hidden divide-y divide-gray-100">
            <Row label="Datos personales" onClick={() => setModal('profile')} />
            <Row label="Contraseña" onClick={() => setModal('password')} />
            <Row label="Historial de canjes" value="23" onClick={() => setModal('history')} />
            <Row label="Favoritos" value="12" onClick={() => setModal('favorites')} />
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider px-1 mb-1.5">Notificaciones</p>
          <div className="bg-surface rounded-xl overflow-hidden divide-y divide-gray-100">
            <Row label="Push notifications" toggle toggleValue={notifications} onToggle={setNotifications} />
            <Row label="Alertas por ubicación" toggle toggleValue={location} onToggle={setLocation} />
          </div>
        </div>

        {/* Support */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider px-1 mb-1.5">Soporte</p>
          <div className="mb-2.5"><WhatsAppButton label="Chat de soporte" /></div>
          <div className="bg-surface rounded-xl overflow-hidden divide-y divide-gray-100">
            <Row label="Preguntas frecuentes" onClick={() => setModal('faq')} />
            <Row label="Términos y condiciones" onClick={() => setModal('terms')} />
          </div>
        </div>

        {/* More */}
        <div className="mb-4">
          <p className="text-[11px] font-semibold text-text-secondary uppercase tracking-wider px-1 mb-1.5">Más</p>
          <div className="bg-surface rounded-xl overflow-hidden divide-y divide-gray-100">
            <Row label="Compartir DescluB" onClick={() => { if (navigator.share) navigator.share({ title: 'DescluB', text: 'Miles de descuentos', url: 'https://desclub.com.mx' }) }} />
            <Row label="Calificar la app" onClick={() => setModal('rate')} />
            <Row label="Versión" value="2.0.0" />
          </div>
        </div>

        <button onClick={onLogout} className="w-full h-11 bg-red-50 text-red-500 rounded-xl font-semibold text-[14px] mb-3 active:bg-red-100">
          Cerrar sesión
        </button>
        <p className="text-center text-[10px] text-gray-300 mb-4">© 2026 Loyalty Solutions SA de CV</p>
      </div>

      {/* Modals */}
      {modal === 'profile' && (
        <Modal title="Datos personales" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {[{ l: 'Nombre', v: 'Pablo' }, { l: 'Apellido', v: 'Creel' }, { l: 'Email', v: 'pablocreelrc@gmail.com' }, { l: 'Teléfono', v: '+52 55 1234 5678' }].map(f => (
              <div key={f.l}>
                <label className="text-[11px] text-text-secondary font-medium">{f.l}</label>
                <input defaultValue={f.v} className="w-full mt-1 h-10 bg-surface rounded-lg px-3 text-[14px] text-text-primary outline-none border border-gray-200 focus:border-primary-500" />
              </div>
            ))}
            <button className="w-full h-11 bg-primary-500 text-white rounded-xl font-semibold text-[14px] mt-2 active:scale-[0.98]" onClick={() => setModal(null)}>Guardar</button>
          </div>
        </Modal>
      )}
      {modal === 'password' && (
        <Modal title="Cambiar contraseña" onClose={() => setModal(null)}>
          <div className="space-y-3">
            {['Actual', 'Nueva', 'Confirmar'].map(l => (
              <div key={l}>
                <label className="text-[11px] text-text-secondary font-medium">{l}</label>
                <input type="password" placeholder="••••••••" className="w-full mt-1 h-10 bg-surface rounded-lg px-3 text-[14px] outline-none border border-gray-200 focus:border-primary-500" />
              </div>
            ))}
            <button className="w-full h-11 bg-primary-500 text-white rounded-xl font-semibold text-[14px] mt-2 active:scale-[0.98]" onClick={() => setModal(null)}>Actualizar</button>
          </div>
        </Modal>
      )}
      {modal === 'history' && (
        <Modal title="Historial" onClose={() => setModal(null)}>
          {[
            { brand: 'Cinépolis', date: 'Hoy, 3:45 PM', discount: '2x1', saved: '$89' },
            { brand: 'Starbucks', date: 'Ayer, 9:20 AM', discount: '15% OFF', saved: '$42' },
            { brand: 'Liverpool', date: '3 abr', discount: '20% OFF', saved: '$580' },
            { brand: 'Tim Hortons', date: '1 abr', discount: '2x1', saved: '$65' },
            { brand: 'Sport City', date: '28 mar', discount: 'Gratis', saved: '$450' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
              <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center text-[14px]">🎟</div>
              <div className="flex-1"><p className="text-[13px] font-semibold text-text-primary">{item.brand}</p><p className="text-[11px] text-text-secondary">{item.date}</p></div>
              <div className="text-right"><p className="text-[12px] font-semibold text-success">-{item.saved}</p><p className="text-[10px] text-text-secondary">{item.discount}</p></div>
            </div>
          ))}
        </Modal>
      )}
      {modal === 'favorites' && (
        <Modal title="Favoritos" onClose={() => setModal(null)}>
          {['Cinépolis', 'Starbucks', 'Liverpool', 'Hertz', 'Sport City', 'Tim Hortons'].map((brand, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
              <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center text-[14px]">❤️</div>
              <p className="flex-1 text-[13px] font-semibold text-text-primary">{brand}</p>
              <span className="text-[12px] text-text-secondary">Ver ›</span>
            </div>
          ))}
        </Modal>
      )}
      {modal === 'faq' && (
        <Modal title="Preguntas frecuentes" onClose={() => setModal(null)}>
          {[
            { q: '¿Cómo canjeo?', a: 'Selecciona el descuento, presiona "Canjear" y muestra el QR.' },
            { q: '¿Tiene costo?', a: 'Tu membresía es un beneficio. Sin costo adicional.' },
            { q: '¿Cómo contacto soporte?', a: 'Usa el botón de WhatsApp en Soporte.' },
            { q: '¿Puedo compartir?', a: 'No, cada membresía es personal e intransferible.' },
          ].map((f, i) => (
            <div key={i} className="py-2.5 border-b border-gray-100 last:border-0">
              <p className="text-[13px] font-semibold text-text-primary mb-0.5">{f.q}</p>
              <p className="text-[13px] text-text-secondary">{f.a}</p>
            </div>
          ))}
        </Modal>
      )}
      {modal === 'terms' && (
        <Modal title="Términos" onClose={() => setModal(null)}>
          <p className="text-[13px] text-text-secondary leading-relaxed">
            Al utilizar DescluB, aceptas que los descuentos están sujetos a disponibilidad y términos de cada marca. DescluB no es responsable por cambios sin previo aviso. La membresía es personal e intransferible.
          </p>
        </Modal>
      )}
      {modal === 'rate' && (
        <Modal title="Calificar DescluB" onClose={() => setModal(null)}>
          <div className="text-center py-2">
            <p className="text-[14px] text-text-secondary mb-4">¿Cómo ha sido tu experiencia?</p>
            <div className="flex gap-2 justify-center text-[28px] mb-5">
              {['😞', '😐', '🙂', '😊', '🤩'].map((e, i) => (
                <button key={i} className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center active:scale-110 transition-transform">{e}</button>
              ))}
            </div>
            <button className="w-full h-11 bg-primary-500 text-white rounded-xl font-semibold text-[14px] active:scale-[0.98]" onClick={() => setModal(null)}>Enviar</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
