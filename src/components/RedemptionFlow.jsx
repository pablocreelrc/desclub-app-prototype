import { useState, useEffect } from 'react'

export default function RedemptionFlow({ deal, onClose, variant = 'light' }) {
  const [stage, setStage] = useState('qr') // qr → success
  const [timeLeft, setTimeLeft] = useState(900) // 15 min
  const [savings, setSavings] = useState(0)

  const isDark = variant === 'dark'
  const bg = isDark ? 'bg-black/80' : 'bg-black/60'
  const card = isDark ? 'bg-[#111] border-[#2a2a3a]' : 'bg-white'
  const text = isDark ? 'text-white' : 'text-gray-900'
  const sub = isDark ? 'text-[#888]' : 'text-gray-500'

  useEffect(() => {
    if (stage !== 'qr') return
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) { clearInterval(interval); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [stage])

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60

  const handleRedeem = () => {
    const disc = deal.discount.toLowerCase()
    let amount
    if (disc.includes('2x1')) {
      amount = Math.floor(Math.random() * 51) + 70 // 70-120
    } else if (disc.includes('gratis')) {
      amount = Math.floor(Math.random() * 301) + 200 // 200-500
    } else {
      const pctMatch = disc.match(/(\d+)%/)
      if (pctMatch) {
        const pct = parseInt(pctMatch[1], 10)
        const multiplier = Math.random() * 2 + 3 // 3-5
        amount = Math.round(pct * multiplier)
      } else {
        amount = Math.floor(Math.random() * 150) + 40
      }
    }
    setSavings(amount)
    setStage('success')
  }

  if (stage === 'success') {
    return (
      <div className={`absolute inset-0 ${bg} backdrop-blur-sm flex items-center justify-center z-50`} onClick={onClose}>
        <div className={`${card} rounded-3xl p-8 mx-6 text-center border max-w-[340px] w-full`} onClick={e => e.stopPropagation()}>
          <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <h2 className={`text-xl font-bold ${text} mb-1`}>Descuento canjeado</h2>
          <p className={`text-sm ${sub} mb-5`}>{deal.brand} — {deal.discount}</p>

          <div className={`${isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-100'} border rounded-2xl p-4 mb-5`}>
            <p className={`text-xs ${sub} mb-1`}>Ahorraste</p>
            <p className="text-green-500 text-3xl font-bold">${savings} MXN</p>
          </div>

          <div className={`${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'} rounded-xl p-3 mb-5 flex items-center gap-3`}>
            <div className={`w-10 h-10 ${isDark ? 'bg-[#222]' : 'bg-white'} rounded-lg flex items-center justify-center`}>
              <svg className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className={`text-sm font-semibold ${text}`}>+50 puntos ganados</p>
              <p className={`text-xs ${sub}`}>Balance: 1,300 pts</p>
            </div>
          </div>

          <button onClick={onClose} className={`w-full h-12 ${isDark ? 'bg-white text-black' : 'bg-blue-500 text-white'} rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform`}>
            Listo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`absolute inset-0 ${bg} backdrop-blur-sm flex items-center justify-center z-50`} onClick={onClose}>
      <div className={`${card} rounded-3xl p-6 mx-6 text-center border max-w-[340px] w-full`} onClick={e => e.stopPropagation()}>
        <p className={`text-xs ${sub} mb-1`}>Tu descuento</p>
        <h2 className={`text-xl font-bold ${text} mb-1`}>{deal.brand}</h2>
        <p className="text-blue-500 font-bold text-lg mb-4">{deal.discount}</p>

        {/* QR with animated border */}
        <div className="relative mx-auto w-48 h-48 mb-4">
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-500 animate-pulse" />
          <div className={`w-full h-full ${isDark ? 'bg-white' : 'bg-gray-50'} rounded-2xl flex items-center justify-center`}>
            <div className="grid grid-cols-7 gap-[2px] p-3">
              {Array.from({ length: 49 }).map((_, i) => (
                <div key={i} className={`w-3.5 h-3.5 rounded-sm ${
                  [0,1,2,5,6,7,13,14,20,21,27,28,35,42,43,44,47,48,10,11,16,17,31,32,37,38].includes(i)
                    ? 'bg-gray-900' : 'bg-gray-100'
                }`} />
              ))}
            </div>
          </div>
        </div>

        <p className={`text-xs ${sub} font-mono mb-1`}>5114 1102 5020 1775</p>
        <p className={`text-xs ${sub} mb-4`}>Presenta en el establecimiento</p>

        {/* Countdown */}
        <div className={`${isDark ? 'bg-[#1a1a1a]' : 'bg-gray-50'} rounded-xl px-4 py-2.5 mb-4 flex items-center justify-center gap-2`}>
          <svg className={`w-4 h-4 ${timeLeft < 120 ? 'text-red-500' : 'text-blue-500'}`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z" />
          </svg>
          <span className={`text-sm font-mono font-bold ${timeLeft < 120 ? 'text-red-500' : text}`}>
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
          <span className={`text-xs ${sub}`}>para canjear</span>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className={`flex-1 h-11 ${isDark ? 'bg-[#1a1a1a] text-white' : 'bg-gray-100 text-gray-700'} rounded-xl text-sm font-semibold`}>
            Cerrar
          </button>
          <button onClick={handleRedeem} className={`flex-1 h-11 ${isDark ? 'bg-white text-black' : 'bg-blue-500 text-white'} rounded-xl text-sm font-bold active:scale-[0.98] transition-transform`}>
            Confirmar canje
          </button>
        </div>
      </div>
    </div>
  )
}
