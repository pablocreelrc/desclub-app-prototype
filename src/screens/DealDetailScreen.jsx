import { useState } from 'react'

export default function DealDetailScreen({ deal, onBack }) {
  const [saved, setSaved] = useState(false)
  const [showQR, setShowQR] = useState(false)

  if (!deal) return null

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Hero image */}
      <div className="h-56 bg-primary-100 relative shrink-0">
        <button
          onClick={onBack}
          className="absolute top-12 left-5 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-lg"
        >
          ←
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className="absolute top-12 right-5 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-lg"
        >
          {saved ? '♥' : '♡'}
        </button>
        <div className="absolute bottom-4 left-5 bg-accent-500 text-white text-2xl font-bold px-4 py-2 rounded-xl">
          {deal.discount}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
        {/* Brand */}
        <h1 className="text-3xl font-bold text-gray-900">{deal.brand}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {deal.cat} &nbsp;•&nbsp; 📍 {deal.dist || 'Online'} &nbsp;•&nbsp; ⭐ {deal.rating}
        </p>

        {/* Description */}
        <p className="text-[15px] text-gray-800 mt-4 leading-relaxed">
          {deal.description}
        </p>

        {/* Meta chips */}
        <div className="flex gap-2 mt-5 flex-wrap">
          <span className="bg-surface text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">
            ⏰ Vence en {deal.expiry}
          </span>
          <span className="bg-surface text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">
            👥 {deal.redeemed} canjearon
          </span>
          <span className="bg-surface text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">
            🔥 Popular
          </span>
        </div>

        {/* Terms */}
        <div className="bg-surface rounded-2xl p-4 mt-5">
          <h3 className="font-semibold text-sm text-gray-900 mb-2">📋 Términos y condiciones</h3>
          <ul className="space-y-1">
            {deal.terms.map((t, i) => (
              <li key={i} className="text-[13px] text-gray-500">• {t}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-3xl p-8 mx-8 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tu descuento</h2>
            <p className="text-sm text-gray-500 mb-6">{deal.brand} — {deal.discount}</p>
            {/* QR placeholder */}
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <div className="grid grid-cols-5 gap-1">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className={`w-6 h-6 rounded-sm ${Math.random() > 0.4 ? 'bg-gray-900' : 'bg-white'}`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-1">Membresía #5114 1102 5020 1775</p>
            <p className="text-xs text-gray-400">Presenta este código en el establecimiento</p>
            <button
              onClick={() => setShowQR(false)}
              className="mt-6 text-accent-500 font-semibold text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 pt-3 pb-8 flex gap-3">
        <button className="w-20 h-[52px] bg-surface rounded-2xl flex items-center justify-center text-sm font-semibold text-gray-700">
          📍 Ir
        </button>
        <button
          onClick={() => setShowQR(true)}
          className="flex-1 h-[52px] bg-accent-500 rounded-2xl flex items-center justify-center text-white font-bold text-[17px] active:scale-[0.97] transition-transform"
        >
          Canjear descuento
        </button>
      </div>
    </div>
  )
}
