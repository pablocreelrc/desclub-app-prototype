const TABS = [
  {
    key: 'home',
    label: 'Inicio',
    icon: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  },
  {
    key: 'deals',
    label: 'Ofertas',
    icon: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  },
  {
    key: 'dc',
    label: 'DC',
    isCenter: true,
  },
  {
    key: 'rewards',
    label: 'Puntos',
    icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  },
  {
    key: 'wallet',
    label: 'Cartera',
    icon: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  },
]

export default function TabBar({ active, onChange, onDCPress }) {
  return (
    <div
      className="shrink-0 flex items-end justify-around bg-[#0a0a0a] border-t border-[#1a1a1a] px-2"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      {TABS.map((tab) => {
        if (tab.isCenter) {
          return (
            <button
              key={tab.key}
              onClick={onDCPress}
              className="flex flex-col items-center -mt-5"
            >
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center dc-glow shadow-lg shadow-blue-500/30">
                <span className="text-white text-lg font-bold tracking-tight">DC</span>
              </div>
            </button>
          )
        }

        const isActive = active === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className="flex flex-col items-center gap-0.5 pt-2 pb-1 px-3 min-w-[56px]"
          >
            <svg
              className="w-[22px] h-[22px]"
              viewBox="0 0 24 24"
              fill={isActive ? '#ffffff' : '#555555'}
            >
              <path d={tab.icon} />
            </svg>
            <span
              className="text-[10px] font-semibold"
              style={{ color: isActive ? '#ffffff' : '#555555' }}
            >
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
