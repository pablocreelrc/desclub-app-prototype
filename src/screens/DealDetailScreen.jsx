import { useState } from 'react'

export default function DealDetailScreen({ deal, saved, onToggleSave, onBack }) {
  const [showQR, setShowQR] = useState(false)

  if (!deal) return null

  return (
    <div className="h-full flex flex-col bg-white font-va screen-enter">
      {/* Hero image */}
      <div className="h-64 relative shrink-0 overflow-hidden">
        <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />

        <button
          onClick={onBack}
          className="absolute top-[max(env(safe-area-inset-top,12px),12px)] md:top-12 left-5 w-10 h-10 bg-black/25 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button
          onClick={onToggleSave}
          className="absolute top-[max(env(safe-area-inset-top,12px),12px)] md:top-12 right-16 w-10 h-10 bg-black/25 backdrop-blur-xl rounded-2xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? '#E45A3B' : 'none'} stroke={saved ? '#E45A3B' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button
          onClick={() => { if (navigator.share) navigator.share({ title: deal.brand + ' — ' + deal.discount, text: deal.description, url: 'https://desclub.com.mx' }) }}
          className="absolute top-[max(env(safe-area-inset-top,12px),12px)] md:top-12 right-5 w-10 h-10 bg-black/25 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        </button>

        <div className="absolute bottom-4 left-5 flex items-end gap-2">
          <div className="bg-accent-500 text-white text-2xl font-extrabold px-5 py-2.5 rounded-2xl shadow-lg shadow-accent-500/30">
            {deal.discount}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <h1 className="text-[28px] font-extrabold text-gray-900 tracking-tight">{deal.brand}</h1>
        <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-2 font-medium">
          <span>{deal.cat.replace(/^[^\s]+\s/, '')}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {deal.dist || 'Online'}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            {deal.rating}
          </span>
        </p>

        <p className="text-[15px] text-gray-600 mt-5 leading-relaxed">
          {deal.description}
        </p>

        {/* Meta chips */}
        <div className="flex gap-2 mt-5 flex-wrap">
          <span className="bg-accent-500/10 text-accent-600 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Vence en {deal.expiry}
          </span>
          <span className="bg-primary-50 text-primary-600 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            {deal.redeemed.toLocaleString()} canjearon
          </span>
          {deal.redeemed > 200 && (
            <span className="bg-orange-50 text-orange-600 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/></svg>
              Popular
            </span>
          )}
        </div>

        {/* How to redeem */}
        <div className="bg-primary-50/70 rounded-2xl p-5 mt-6 border border-primary-100/50">
          <h3 className="font-bold text-sm text-primary-800 mb-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            Cómo canjear
          </h3>
          <div className="flex gap-3">
            {['Muestra tu QR', 'El comercio lo escanea', 'Disfruta tu descuento'].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-9 h-9 rounded-xl bg-primary-500 text-white text-sm font-bold flex items-center justify-center mx-auto mb-2 shadow-sm shadow-primary-500/20">
                  {i + 1}
                </div>
                <p className="text-[11px] text-primary-700 leading-tight font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-gray-50 rounded-2xl p-5 mt-4">
          <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Términos y condiciones
          </h3>
          <ul className="space-y-2">
            {deal.terms.map((t, i) => (
              <li key={i} className="text-[13px] text-gray-500 flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-3xl p-8 mx-6 text-center shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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
              className="mt-6 w-full h-12 bg-gray-100 rounded-2xl text-gray-700 font-semibold text-sm active:bg-gray-200 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/80 px-5 pt-3 flex gap-3" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom, 0px))' }}>
        {deal.dist && (
          <button
            onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(deal.brand)}/@${deal.lat || 19.43},${deal.lng || -99.13},15z`, '_blank')}
            className="w-14 h-[52px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center active:bg-gray-200 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6246EA" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="text-[9px] text-gray-600 font-semibold mt-0.5">Ir</span>
          </button>
        )}
        <button
          onClick={() => setShowQR(true)}
          className="flex-1 h-[52px] bg-accent-500 rounded-2xl flex items-center justify-center text-white font-bold text-[16px] active:scale-[0.97] transition-all shadow-lg shadow-accent-500/25"
        >
          Canjear descuento
        </button>
      </div>
    </div>
  )
}
