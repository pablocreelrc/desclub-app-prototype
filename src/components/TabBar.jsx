const TABS = [
  { key: 'home', icon: '🏠', label: 'Inicio' },
  { key: 'map', icon: '📍', label: 'Mapa' },
  { key: 'card', icon: '💳', label: 'Tarjeta' },
  { key: 'profile', icon: '👤', label: 'Perfil' },
]

export default function TabBar({ active, onChange }) {
  return (
    <div className="shrink-0 h-20 bg-white border-t border-gray-100 flex items-start justify-around pt-3 px-4">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex flex-col items-center gap-0.5 min-w-[60px] transition-all ${
            active === tab.key ? 'scale-110' : ''
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className={`text-[10px] font-semibold ${
            active === tab.key ? 'text-primary-500' : 'text-gray-400'
          }`}>
            {tab.label}
          </span>
          {active === tab.key && (
            <div className="w-1 h-1 rounded-full bg-primary-500 mt-0.5" />
          )}
        </button>
      ))}
    </div>
  )
}
