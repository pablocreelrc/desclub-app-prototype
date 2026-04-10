import { useState } from 'react'

const CATEGORIES = [
  { key: 'comida', label: 'Comida', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z' },
  { key: 'cine', label: 'Cine y Eventos', icon: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' },
  { key: 'retail', label: 'Retail', icon: 'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z' },
  { key: 'wellness', label: 'Wellness', icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z' },
  { key: 'viajes', label: 'Viajes', icon: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' },
  { key: 'autos', label: 'Transporte', icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' },
]

export default function Onboarding({ onComplete, variant = 'light' }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState([])
  const isDark = variant === 'dark'
  const bg = isDark ? 'bg-black' : 'bg-white'
  const text = isDark ? 'text-white' : 'text-gray-900'
  const sub = isDark ? 'text-[#888]' : 'text-gray-500'
  const pill = isDark ? 'bg-[#111] border-[#222]' : 'bg-gray-50 border-gray-200'
  const pillActive = isDark ? 'bg-blue-500/20 border-blue-500' : 'bg-blue-50 border-blue-500'
  const accent = isDark ? 'bg-white text-black' : 'bg-blue-500 text-white'

  const toggle = (key) => setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])

  const steps = [
    // Step 1: Categories
    <div key="cats" className="flex-1 flex flex-col px-6 pt-8">
      <h1 className={`text-2xl font-bold ${text} mb-2`}>Elige tus categorías</h1>
      <p className={`text-sm ${sub} mb-6`}>Personaliza tu feed con lo que más te interesa</p>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => toggle(cat.key)}
            className={`flex flex-col items-center justify-center py-5 rounded-2xl border-2 transition-all active:scale-95 ${
              selected.includes(cat.key) ? pillActive : pill
            }`}
          >
            <svg className={`w-7 h-7 mb-2 ${selected.includes(cat.key) ? 'text-blue-500' : isDark ? 'text-[#555]' : 'text-gray-400'}`} viewBox="0 0 24 24" fill="currentColor">
              <path d={cat.icon} />
            </svg>
            <span className={`text-sm font-semibold ${selected.includes(cat.key) ? 'text-blue-500' : text}`}>{cat.label}</span>
          </button>
        ))}
      </div>
      <p className={`text-xs ${sub} text-center mt-4`}>Selecciona al menos 2</p>
    </div>,

    // Step 2: Location
    <div key="loc" className="flex-1 flex flex-col items-center justify-center px-8 text-center" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className={`w-20 h-20 rounded-full ${isDark ? 'bg-blue-500/15' : 'bg-blue-50'} flex items-center justify-center mb-6`}>
        <svg className="w-10 h-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      </div>
      <h1 className={`text-2xl font-bold ${text} mb-2`}>Ofertas cerca de ti</h1>
      <p className={`text-sm ${sub} leading-relaxed mb-8`}>
        Activa tu ubicación para descubrir descuentos<br />en comercios a tu alrededor
      </p>
      <button onClick={() => setStep(2)} className={`w-full h-12 ${accent} rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform mb-3`}>
        Activar ubicación
      </button>
      <button onClick={() => setStep(2)} className={`text-sm font-medium ${sub}`}>
        Ahora no
      </button>
    </div>,

    // Step 3: Welcome bonus
    <div key="bonus" className="flex-1 flex flex-col items-center justify-center px-8 text-center" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
      <div className={`w-24 h-24 rounded-full ${isDark ? 'bg-green-500/15' : 'bg-green-50'} flex items-center justify-center mb-6`}>
        <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      </div>
      <h1 className={`text-2xl font-bold ${text} mb-2`}>Tu bono de bienvenida</h1>
      <div className={`${isDark ? 'bg-[#111] border-[#222]' : 'bg-blue-50 border-blue-100'} border rounded-2xl px-6 py-4 mb-4`}>
        <p className="text-blue-500 text-4xl font-bold mb-1">$50 MXN</p>
        <p className={`text-sm ${sub}`}>en tu primer canje</p>
      </div>
      <p className={`text-xs ${sub} leading-relaxed mb-8`}>
        Canjea cualquier descuento y recibe $50 adicionales.<br />Válido por 30 días.
      </p>
      <button onClick={onComplete} className={`w-full h-12 ${accent} rounded-xl font-semibold text-sm active:scale-[0.98] transition-transform`}>
        Empezar a ahorrar
      </button>
    </div>,
  ]

  return (
    <div className={`flex-1 min-h-0 flex flex-col ${bg}`}>
      {/* Progress dots */}
      <div className="shrink-0 flex items-center justify-center gap-2 pt-6 pb-2">
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 rounded-full transition-all ${i === step ? 'w-8 bg-blue-500' : `w-2 ${isDark ? 'bg-[#333]' : 'bg-gray-200'}`}`} />
        ))}
      </div>

      {/* Skip button */}
      <div className="shrink-0 flex justify-end px-5">
        <button onClick={onComplete} className={`text-xs font-medium ${sub} py-2`}>
          Saltar
        </button>
      </div>

      {/* Step content */}
      {steps[step]}

      {/* Bottom action for step 0 */}
      {step === 0 && (
        <div className="shrink-0 px-6 pb-6" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
          <button
            onClick={() => selected.length >= 2 && setStep(1)}
            className={`w-full h-12 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
              selected.length >= 2 ? accent : `${isDark ? 'bg-[#222] text-[#555]' : 'bg-gray-200 text-gray-400'}`
            }`}
          >
            Continuar ({selected.length}/2 mínimo)
          </button>
        </div>
      )}
    </div>
  )
}
