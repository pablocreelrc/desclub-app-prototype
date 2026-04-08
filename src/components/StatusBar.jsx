import { useState, useEffect } from 'react'

export default function StatusBar({ variant = 'light' }) {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  })

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`)
    }
    const ms = (60 - new Date().getSeconds()) * 1000
    const t = setTimeout(() => {
      update()
      const i = setInterval(update, 60000)
      return () => clearInterval(i)
    }, ms)
    return () => clearTimeout(t)
  }, [])

  const c = variant === 'dark' ? '#fff' : '#000'

  return (
    <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none hidden md:block" style={{ height: 54 }}>
      {/* Dynamic Island — desktop only (real phones have their own) */}
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-[20px]" />

      {/* Left: time */}
      <div className="absolute left-7 bottom-[6px]">
        <span className="text-[15px] font-semibold" style={{ color: c, fontVariantNumeric: 'tabular-nums' }}>
          {time}
        </span>
      </div>

      {/* Right: indicators */}
      <div className="absolute right-6 bottom-[8px] flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="8" width="3" height="3" rx=".7" fill={c} />
          <rect x="4.5" y="5.5" width="3" height="5.5" rx=".7" fill={c} />
          <rect x="9" y="2.5" width="3" height="8.5" rx=".7" fill={c} />
          <rect x="13.5" y="0" width="3" height="11" rx=".7" fill={c} />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <circle cx="7.5" cy="9.5" r="1.2" fill={c}/>
          <path d="M4.8 7.5a3.8 3.8 0 015.4 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M2.4 5a7 7 0 0110.2 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M.3 2.5a10 10 0 0114.4 0" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x=".5" y=".5" width="21" height="11" rx="2.5" stroke={c} strokeOpacity=".3"/>
          <rect x="22.5" y="3.5" width="1.5" height="5" rx=".75" fill={c} fillOpacity=".3"/>
          <rect x="2" y="2" width="16.8" height="8" rx="1.5" fill={c}/>
        </svg>
      </div>
    </div>
  )
}
