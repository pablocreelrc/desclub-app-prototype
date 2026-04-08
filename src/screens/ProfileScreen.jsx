import { useState } from 'react'
import WhatsAppButton from '../components/WhatsAppButton'

function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`w-11 h-6 rounded-full transition-colors relative ${enabled ? 'bg-primary-500' : 'bg-gray-300'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 transition-transform ${enabled ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
    </button>
  )
}

function SettingsRow({ icon, label, value, onClick, toggle, toggleValue, onToggle }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${onClick ? 'active:bg-gray-100' : ''}`}
    >
      <span className="text-lg w-7 text-center">{icon}</span>
      <span className="flex-1 text-sm font-medium text-gray-900">{label}</span>
      {value && <span className="text-sm text-gray-400">{value}</span>}
      {toggle && <ToggleSwitch enabled={toggleValue} onChange={onToggle} />}
      {onClick && !toggle && <span className="text-gray-300 text-sm">›</span>}
    </button>
  )
}

function Modal({ title, onClose, children }) {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div className="bg-white rounded-t-3xl w-full max-h-[70%] overflow-y-auto p-6 pb-10" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 text-xl active:text-gray-600">✕</button>
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
    <div className="h-full flex flex-col bg-white relative font-va screen-enter">
      {/* Header */}
      <div className="bg-primary-500 pt-safe-header md:pt-14 pb-6 px-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/25 flex items-center justify-center text-white text-2xl font-bold ring-3 ring-white/30">
            PC
          </div>
          <div className="flex-1">
            <h1 className="text-white text-xl font-bold">Pablo Creel</h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="bg-white/20 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full">PREMIUM</span>
              <span className="text-white/50 text-[10px]">Vence 06/2026</span>
            </div>
          </div>
          <button
            onClick={() => setModal('profile')}
            className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center text-white text-sm active:bg-white/25"
          >
            ✏️
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4">
        {/* Account */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Cuenta</h3>
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <SettingsRow icon="👤" label="Datos personales" onClick={() => setModal('profile')} />
            <SettingsRow icon="🔒" label="Contraseña" onClick={() => setModal('password')} />
            <SettingsRow icon="📊" label="Historial de canjes" value="23" onClick={() => setModal('history')} />
            <SettingsRow icon="❤️" label="Favoritos" value="12" onClick={() => setModal('favorites')} />
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Notificaciones</h3>
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <SettingsRow icon="🔔" label="Push notifications" toggle toggleValue={notifications} onToggle={setNotifications} />
            <SettingsRow icon="📍" label="Alertas por ubicación" toggle toggleValue={location} onToggle={setLocation} />
          </div>
        </div>

        {/* Support — WhatsApp only */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Soporte</h3>
          <div className="mb-3">
            <WhatsAppButton label="Chat de soporte" />
          </div>
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <SettingsRow icon="❓" label="Preguntas frecuentes" onClick={() => setModal('faq')} />
            <SettingsRow icon="📋" label="Términos y condiciones" onClick={() => setModal('terms')} />
          </div>
        </div>

        {/* More */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Más</h3>
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <SettingsRow icon="📤" label="Compartir DescluB" onClick={() => { if (navigator.share) navigator.share({ title: 'DescluB', text: 'Descubre miles de descuentos', url: 'https://desclub.com.mx' }) }} />
            <SettingsRow icon="⭐" label="Calificar la app" onClick={() => setModal('rate')} />
            <SettingsRow icon="ℹ️" label="Versión" value="2.0.0" />
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full h-12 bg-red-50 text-red-500 rounded-2xl font-semibold text-sm mb-4 active:bg-red-100 transition-colors"
        >
          Cerrar sesión
        </button>

        <p className="text-center text-[10px] text-gray-300 mb-6">
          © 2026 Loyalty Solutions SA de CV
        </p>
      </div>

      {/* Modals */}
      {modal === 'profile' && (
        <Modal title="Datos personales" onClose={() => setModal(null)}>
          <div className="space-y-4">
            {[{ l: 'Nombre', v: 'Pablo' }, { l: 'Apellido', v: 'Creel' }, { l: 'Email', v: 'pablocreelrc@gmail.com' }, { l: 'Teléfono', v: '+52 55 1234 5678' }].map(f => (
              <div key={f.l}>
                <label className="text-xs text-gray-500 font-medium">{f.l}</label>
                <input defaultValue={f.v} className="w-full mt-1 h-11 bg-gray-50 rounded-xl px-4 text-sm text-gray-800 outline-none border border-gray-200 focus:border-primary-500" />
              </div>
            ))}
            <button className="w-full h-12 bg-primary-500 text-white rounded-2xl font-semibold text-sm mt-2 active:scale-[0.98]" onClick={() => setModal(null)}>
              Guardar cambios
            </button>
          </div>
        </Modal>
      )}

      {modal === 'password' && (
        <Modal title="Cambiar contraseña" onClose={() => setModal(null)}>
          <div className="space-y-4">
            {['Contraseña actual', 'Nueva contraseña', 'Confirmar contraseña'].map(l => (
              <div key={l}>
                <label className="text-xs text-gray-500 font-medium">{l}</label>
                <input type="password" placeholder="••••••••" className="w-full mt-1 h-11 bg-gray-50 rounded-xl px-4 text-sm text-gray-800 outline-none border border-gray-200 focus:border-primary-500" />
              </div>
            ))}
            <button className="w-full h-12 bg-primary-500 text-white rounded-2xl font-semibold text-sm mt-2 active:scale-[0.98]" onClick={() => setModal(null)}>
              Actualizar contraseña
            </button>
          </div>
        </Modal>
      )}

      {modal === 'history' && (
        <Modal title="Historial de canjes" onClose={() => setModal(null)}>
          {[
            { brand: 'Cinépolis', date: 'Hoy, 3:45 PM', discount: '2x1', saved: '$89' },
            { brand: 'Starbucks', date: 'Ayer, 9:20 AM', discount: '15% OFF', saved: '$42' },
            { brand: 'Liverpool', date: '3 abr, 2:10 PM', discount: '20% OFF', saved: '$580' },
            { brand: 'Tim Hortons', date: '1 abr, 8:30 AM', discount: '2x1', saved: '$65' },
            { brand: 'Sport City', date: '28 mar, 6:00 PM', discount: 'Gratis', saved: '$450' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-sm">🎟</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.brand}</p>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-green-600">-{item.saved}</p>
                <p className="text-[10px] text-gray-400">{item.discount}</p>
              </div>
            </div>
          ))}
        </Modal>
      )}

      {modal === 'favorites' && (
        <Modal title="Favoritos guardados" onClose={() => setModal(null)}>
          {['Cinépolis', 'Starbucks', 'Liverpool', 'Hertz', 'Sport City', 'Tim Hortons'].map((brand, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-sm">❤️</div>
              <p className="flex-1 text-sm font-semibold text-gray-900">{brand}</p>
              <span className="text-xs text-gray-400">Ver ofertas ›</span>
            </div>
          ))}
        </Modal>
      )}

      {modal === 'faq' && (
        <Modal title="Preguntas frecuentes" onClose={() => setModal(null)}>
          {[
            { q: '¿Cómo canjeo un descuento?', a: 'Selecciona el descuento, presiona "Canjear" y muestra el QR en el establecimiento.' },
            { q: '¿Tiene costo la membresía?', a: 'Tu membresía es un beneficio de tu empresa o programa. Sin costo adicional.' },
            { q: '¿Cómo contacto soporte?', a: 'Usa el botón de WhatsApp en la sección de Soporte para chatear directamente.' },
            { q: '¿Puedo compartir mi membresía?', a: 'No, cada membresía es personal e intransferible.' },
          ].map((faq, i) => (
            <div key={i} className="py-3 border-b border-gray-100 last:border-0">
              <p className="text-sm font-semibold text-gray-900 mb-1">{faq.q}</p>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </div>
          ))}
        </Modal>
      )}

      {modal === 'terms' && (
        <Modal title="Términos y condiciones" onClose={() => setModal(null)}>
          <p className="text-sm text-gray-600 leading-relaxed">
            Al utilizar DescluB, aceptas que los descuentos están sujetos a disponibilidad y términos específicos de cada marca aliada. DescluB no es responsable por cambios en las promociones sin previo aviso. La membresía es personal e intransferible. Para más información, contacta soporte vía WhatsApp.
          </p>
        </Modal>
      )}

      {modal === 'rate' && (
        <Modal title="Calificar DescluB" onClose={() => setModal(null)}>
          <div className="text-center py-4">
            <p className="text-4xl mb-4">⭐⭐⭐⭐⭐</p>
            <p className="text-sm text-gray-600 mb-4">¿Cómo ha sido tu experiencia?</p>
            <div className="flex gap-2 justify-center text-3xl mb-6">
              {['😞', '😐', '🙂', '😊', '🤩'].map((e, i) => (
                <button key={i} className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center active:scale-110 transition-transform">
                  {e}
                </button>
              ))}
            </div>
            <button className="w-full h-12 bg-primary-500 text-white rounded-2xl font-semibold text-sm active:scale-[0.98]" onClick={() => setModal(null)}>
              Enviar calificación
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
