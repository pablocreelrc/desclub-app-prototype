const TABS = [
  {
    key: 'home',
    label: 'Inicio',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'currentColor' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0} />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: 'map',
    label: 'Mapa',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'currentColor' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0} />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    key: 'card',
    label: 'Tarjeta',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'currentColor' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="3" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0} />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    key: 'profile',
    label: 'Perfil',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? 'currentColor' : '#9CA3AF'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.15 : 0} />
      </svg>
    ),
  },
]

export default function TabBar({ active, onChange }) {
  return (
    <div
      className="shrink-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/80 flex items-start justify-around pt-2.5 px-4"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))', minHeight: 72 }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex flex-col items-center gap-1 min-w-[56px] transition-all duration-200 ${
              isActive ? 'text-primary-500' : 'text-gray-400'
            }`}
          >
            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
              {tab.icon(isActive)}
            </div>
            <span className={`text-[10px] font-semibold transition-colors ${
              isActive ? 'text-primary-600' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
