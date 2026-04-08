import { useState, useEffect, useRef } from 'react'

const VERSION_CONFIG = {
  a: { label: 'Consumer', color: '#2196F3' },
  b: { label: 'Pass', color: '#ffffff' },
  c: { label: 'Puntos', color: '#3b82f6' },
}

export default function VersionToggle({ active, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [open])

  const accent = VERSION_CONFIG[active]?.color ?? '#2196F3'

  return (
    <div ref={ref} className="fixed z-[60]" style={{ bottom: 96, right: 14 }}>
      {/* Expanded picker */}
      {open && (
        <div className="flex flex-col gap-1.5 mb-2 animate-in">
          {Object.entries(VERSION_CONFIG).map(([key, { label, color }]) => {
            const isActive = key === active
            return (
              <button
                key={key}
                onClick={() => { onChange(key); setOpen(false) }}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all duration-150"
                style={{
                  background: isActive ? color : 'rgba(0,0,0,0.65)',
                  color: '#fff',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1.5px solid ${isActive ? color : 'rgba(255,255,255,0.15)'}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                <span
                  className="flex items-center justify-center rounded-full text-[10px] font-bold shrink-0"
                  style={{
                    width: 22, height: 22,
                    background: isActive ? 'rgba(255,255,255,0.25)' : color,
                  }}
                >
                  {key.toUpperCase()}
                </span>
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center justify-center rounded-full transition-all duration-200 ml-auto"
        style={{
          width: 40, height: 40,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `2px solid ${accent}`,
          boxShadow: `0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)`,
        }}
      >
        <span className="text-sm font-bold" style={{ color: accent }}>
          {active.toUpperCase()}
        </span>
      </button>
    </div>
  )
}
