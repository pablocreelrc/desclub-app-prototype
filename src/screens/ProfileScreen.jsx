import { useState } from 'react'

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

export default function ProfileScreen({ onLogout }) {
  const [notifications, setNotifications] = useState(true)
  const [location, setLocation] = useState(true)

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-primary-500 pt-14 pb-6 px-5">
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
          <button className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center text-white text-sm">
            ✏️
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-4">
        {/* Account */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Cuenta</h3>
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <SettingsRow icon="👤" label="Datos personales" onClick={() => {}} />
            <SettingsRow icon="🔒" label="Contraseña" onClick={() => {}} />
            <SettingsRow icon="📊" label="Historial de canjes" value="23" onClick={() => {}} />
            <SettingsRow icon="❤️" label="Favoritos" value="12" onClick={() => {}} />
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
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <SettingsRow icon="💬" label="Chat de soporte" value="WhatsApp" onClick={() => window.open('https://wa.me/525500000000', '_blank')} />
            <SettingsRow icon="❓" label="Preguntas frecuentes" onClick={() => {}} />
            <SettingsRow icon="📋" label="Términos y condiciones" onClick={() => {}} />
          </div>
        </div>

        {/* About */}
        <div className="mb-5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1 mb-2">Más</h3>
          <div className="bg-gray-50 rounded-2xl overflow-hidden divide-y divide-gray-100">
            <SettingsRow icon="📤" label="Compartir DescluB" onClick={() => {}} />
            <SettingsRow icon="⭐" label="Calificar la app" onClick={() => {}} />
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
    </div>
  )
}
