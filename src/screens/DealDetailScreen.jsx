import { useState } from 'react'

export default function DealDetailScreen({ deal, saved, onToggleSave, onBack }) {
  const [showQR, setShowQR] = useState(false)

  if (!deal) return null

  return (
    <div className="h-full flex flex-col bg-white font-va">
      {/* Hero image */}
      <div className="h-64 relative shrink-0 overflow-hidden">
        <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        <button
          onClick={onBack}
          className="absolute top-12 left-5 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg active:scale-90 transition-transform"
        >
          ←
        </button>
        <button
          onClick={onToggleSave}
          className="absolute top-12 right-16 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-lg active:scale-90 transition-transform"
        >
          {saved ? '❤️' : '🤍'}
        </button>
        <button
          onClick={() => { if (navigator.share) navigator.share({ title: deal.brand + ' — ' + deal.discount, text: deal.description, url: 'https://desclub.com.mx' }) }}
          className="absolute top-12 right-5 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg active:scale-90 transition-transform"
        >
          ↗
        </button>

        <div className="absolute bottom-4 left-5 flex items-end gap-3">
          <div className="bg-accent-500 text-white text-2xl font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-accent-500/40">
            {deal.discount}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <h1 className="text-3xl font-bold text-gray-900">{deal.brand}</h1>
        <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
          <span>{deal.cat}</span>
          <span className="text-gray-300">•</span>
          <span>📍 {deal.dist || 'Online'}</span>
          <span className="text-gray-300">•</span>
          <span>⭐ {deal.rating}</span>
        </p>

        <p className="text-[15px] text-gray-700 mt-5 leading-relaxed">
          {deal.description}
        </p>

        {/* Meta chips */}
        <div className="flex gap-2 mt-5 flex-wrap">
          <span className="bg-red-50 text-red-600 text-xs font-semibold px-3.5 py-2 rounded-xl">
            ⏰ Vence en {deal.expiry}
          </span>
          <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3.5 py-2 rounded-xl">
            👥 {deal.redeemed.toLocaleString()} canjearon
          </span>
          {deal.redeemed > 200 && (
            <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3.5 py-2 rounded-xl">
              🔥 Popular
            </span>
          )}
        </div>

        {/* How to redeem */}
        <div className="bg-primary-50 rounded-2xl p-4 mt-6 border border-primary-100">
          <h3 className="font-semibold text-sm text-primary-800 mb-2">🎯 Cómo canjear</h3>
          <div className="flex gap-3">
            {['Muestra tu QR', 'El comercio lo escanea', 'Disfruta tu descuento'].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-sm font-bold flex items-center justify-center mx-auto mb-1.5">
                  {i + 1}
                </div>
                <p className="text-[11px] text-primary-700 leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-gray-50 rounded-2xl p-4 mt-4">
          <h3 className="font-semibold text-sm text-gray-900 mb-2">📋 Términos y condiciones</h3>
          <ul className="space-y-1.5">
            {deal.terms.map((t, i) => (
              <li key={i} className="text-[13px] text-gray-500 flex items-start gap-2">
                <span className="text-gray-300 mt-0.5">•</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl animate-in" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Tu descuento</h2>
            <p className="text-sm text-gray-500 mb-6">{deal.brand} — {deal.discount}</p>
            {/* QR placeholder */}
            <div className="w-52 h-52 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
              <div className="grid grid-cols-7 gap-[3px] p-4">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-sm ${
                    [0,1,2,3,4,5,6,7,13,14,20,21,27,28,34,35,42,43,44,45,46,47,48,
                     2,3,4,9,10,11,16,17,18,30,31,32,37,38,39,44,45,46].includes(i)
                      ? 'bg-gray-900' : 'bg-white'
                  }`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-mono mb-1">5114 1102 5020 1775</p>
            <p className="text-xs text-gray-400">Presenta este código en el establecimiento</p>
            <button
              onClick={() => setShowQR(false)}
              className="mt-6 w-full h-12 bg-gray-100 rounded-2xl text-gray-700 font-semibold text-sm active:bg-gray-200"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 px-5 pt-3 pb-8 flex gap-3">
        {deal.dist && (
          <button
            onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(deal.brand)}/@${deal.lat || 19.43},${deal.lng || -99.13},15z`, '_blank')}
            className="w-16 h-[52px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-sm active:bg-gray-200 transition-colors"
          >
            <span className="text-lg">📍</span>
            <span className="text-[10px] text-gray-600 font-medium">Ir</span>
          </button>
        )}
        <button
          onClick={() => setShowQR(true)}
          className="flex-1 h-[52px] bg-accent-500 rounded-2xl flex items-center justify-center text-white font-bold text-[17px] active:scale-[0.97] transition-transform shadow-lg shadow-accent-500/30"
        >
          Canjear descuento
        </button>
      </div>
    </div>
  )
}
