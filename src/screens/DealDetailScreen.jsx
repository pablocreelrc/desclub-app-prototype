import { useState } from 'react'
import RedemptionFlow from '../components/RedemptionFlow'

export default function DealDetailScreen({ deal, saved, onToggleSave, onBack }) {
  const [showQR, setShowQR] = useState(false)
  if (!deal) return null

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white font-va relative">
      {/* Hero */}
      <div className="h-48 md:h-56 relative shrink-0 overflow-hidden">
        <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Top buttons */}
        <div className="absolute left-4 flex items-center gap-2" style={{ top: 'max(env(safe-area-inset-top, 12px), 12px)' }}>
          <button onClick={onBack} className="w-9 h-9 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </div>
        <div className="absolute right-4 flex items-center gap-2" style={{ top: 'max(env(safe-area-inset-top, 12px), 12px)' }}>
          <button onClick={onToggleSave} className="w-9 h-9 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform">
            {saved
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF4444" stroke="#FF4444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            }
          </button>
          <button
            onClick={() => { if (navigator.share) navigator.share({ title: deal.brand, text: deal.description, url: 'https://desclub.com.mx' }) }}
            className="w-9 h-9 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>

        <div className="absolute bottom-3 left-4">
          <span className="bg-accent-500 text-white text-xl font-bold px-4 py-2 rounded-xl shadow-lg">
            {deal.discount}
          </span>
        </div>
      </div>

      {/* Body — scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 pt-4 pb-28">
        <h1 className="text-[24px] font-bold text-text-primary">{deal.brand}</h1>
        <div className="flex items-center gap-1.5 mt-1 text-[13px] text-text-secondary font-medium">
          <span>{deal.cat.replace(/^[^\s]+\s/, '')}</span>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-0.5"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> {deal.dist || 'Online'}</span>
          <span className="text-gray-300">·</span>
          <span>★ {deal.rating}</span>
        </div>

        <p className="text-[14px] text-text-secondary mt-4 leading-relaxed">{deal.description}</p>

        {/* Chips */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <span className="bg-red-50 text-red-600 text-[12px] font-semibold px-3 py-1.5 rounded-lg">
            Vence en {deal.expiry}
          </span>
          <span className="bg-blue-50 text-blue-600 text-[12px] font-semibold px-3 py-1.5 rounded-lg">
            {deal.redeemed.toLocaleString()} canjearon
          </span>
          {deal.redeemed > 200 && (
            <span className="bg-orange-50 text-orange-600 text-[12px] font-semibold px-3 py-1.5 rounded-lg">
              Popular
            </span>
          )}
        </div>

        {/* How to redeem */}
        <div className="bg-primary-50 rounded-2xl p-4 mt-5">
          <p className="text-[13px] font-bold text-primary-800 mb-3">Cómo canjear</p>
          <div className="flex gap-3">
            {['Muestra tu QR', 'El comercio escanea', 'Disfruta'].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-[13px] font-bold flex items-center justify-center mx-auto mb-1.5">{i + 1}</div>
                <p className="text-[11px] text-primary-700 leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-surface rounded-2xl p-4 mt-3">
          <p className="text-[13px] font-bold text-text-primary mb-2">Términos</p>
          {deal.terms.map((t, i) => (
            <p key={i} className="text-[12px] text-text-secondary py-1.5 border-b border-gray-100 last:border-0 flex items-start gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />{t}
            </p>
          ))}
        </div>
      </div>

      {/* Redemption Flow */}
      {showQR && <RedemptionFlow deal={deal} variant="light" onClose={() => setShowQR(false)} />}

      {/* CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-4 pt-3 flex gap-2.5" style={{ paddingBottom: 'max(1rem, calc(1rem + env(safe-area-inset-bottom, 0px)))' }}>
        {deal.dist && (
          <button
            onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(deal.brand)}/@${deal.lat || 19.43},${deal.lng || -99.13},15z`, '_blank')}
            className="w-14 h-12 bg-gray-100 rounded-xl flex items-center justify-center active:bg-gray-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </button>
        )}
        <button onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${deal.brand}: ${deal.discount} - ${deal.detail}. Descarga DescluB: desclub.com.mx`)}`, '_blank')} className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center active:scale-95 transition-transform shrink-0">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        </button>
        <button
          onClick={() => setShowQR(true)}
          className="flex-1 h-12 bg-accent-500 rounded-xl flex items-center justify-center text-white font-bold text-[15px] active:scale-[0.98] transition-transform shadow-md shadow-accent-500/25"
        >
          Canjear descuento
        </button>
      </div>
    </div>
  )
}
