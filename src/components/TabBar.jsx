const TABS = [
  { key: 'home', label: 'Inicio', d: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10' },
  { key: 'map', label: 'Mapa', d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0' },
  { key: 'card', label: 'Tarjeta', d: 'M1 4h22v16H1z M1 10h22' },
  { key: 'profile', label: 'Perfil', d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0' },
]

export default function TabBar({ active, onChange }) {
  return (
    <div
      className="shrink-0 bg-white border-t border-gray-200 flex items-center justify-around px-2"
      style={{
        paddingTop: 8,
        paddingBottom: 'max(8px, calc(8px + env(safe-area-inset-bottom, 0px)))',
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="flex flex-col items-center gap-0.5 min-w-[56px] py-1"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke={isActive ? '#2196F3' : '#9CA3AF'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d={tab.d} />
            </svg>
            <span className={`text-[10px] font-semibold ${isActive ? 'text-primary-500' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
