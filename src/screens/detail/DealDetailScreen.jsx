import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DEALS } from '../../data/deals'
import RedemptionFlow from '../../components/RedemptionFlow'

export default function DealDetailScreen() {
  const { selectedDeal: deal, goBack, savedDeals, toggleSave, navigate } = useApp()
  const [showQR, setShowQR] = useState(false)

  if (!deal) return null

  const isSaved = savedDeals.includes(deal.id)
  const similarDeals = DEALS.filter(d => d.cat === deal.cat && d.id !== deal.id).slice(0, 3)

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black relative">
      {/* Hero image */}
      <div className="h-64 relative shrink-0 overflow-hidden">
        <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f18] via-transparent to-black/30" />

        {/* Back button */}
        <button
          onClick={goBack}
          className="absolute left-5 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
          style={{ top: 'max(env(safe-area-inset-top, 12px), 12px)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>

        {/* Save + Share buttons */}
        <div className="absolute right-5 flex items-center gap-2" style={{ top: 'max(env(safe-area-inset-top, 12px), 12px)' }}>
          <button onClick={() => toggleSave(deal.id)} className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center active:scale-90 transition-transform">
            {isSaved
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF4444" stroke="#FF4444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            }
          </button>
          <button
            onClick={() => { if (navigator.share) navigator.share({ title: deal.brand, text: deal.description, url: 'https://desclub.com.mx' }) }}
            className="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>

        {/* Discount + Points badges */}
        <div className="absolute bottom-4 left-5 flex items-center gap-2">
          <span className="bg-blue-500 text-white text-2xl font-bold px-5 py-2.5 rounded-2xl shadow-lg">{deal.discount}</span>
          <span className="bg-blue-500/30 text-blue-400 text-sm font-bold px-3 py-2 rounded-xl">{deal.points} puntos</span>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-32">
        <h1 className="text-3xl font-bold text-white">{deal.brand}</h1>
        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-[#888]">
          <span>{deal.cat}</span>
          <span className="text-[#444]">&bull;</span>
          <span className="flex items-center gap-0.5">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            {deal.dist || 'Online'}
          </span>
          <span className="text-[#444]">&bull;</span>
          <span className="text-yellow-500">&#9733; {deal.rating}</span>
        </div>

        <p className="text-[15px] text-[#aaa] mt-5 leading-relaxed">{deal.description}</p>

        {/* Meta chips */}
        <div className="flex gap-2 mt-5 flex-wrap">
          <span className="bg-red-500/15 text-red-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
            Vence en {deal.expiry}
          </span>
          <span className="bg-blue-500/15 text-blue-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
            {deal.redeemed.toLocaleString()} canjearon
          </span>
          {deal.redeemed > 200 && (
            <span className="bg-orange-500/15 text-orange-400 text-xs font-semibold px-3.5 py-2 rounded-xl">
              Popular
            </span>
          )}
        </div>

        {/* How to redeem */}
        <div className="bg-blue-500/10 rounded-2xl p-4 mt-6 border border-blue-500/20">
          <h3 className="font-semibold text-sm text-blue-400 mb-2">Cómo canjear</h3>
          <div className="flex gap-3">
            {['Muestra tu QR', 'El comercio lo escanea', 'Gana puntos extras'].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold flex items-center justify-center mx-auto mb-1.5">
                  {i + 1}
                </div>
                <p className="text-[11px] text-blue-300 leading-tight">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <div className="bg-[#111] rounded-2xl p-4 mt-4 border border-[#2a2a3a]">
          <h3 className="font-semibold text-sm text-white mb-2">Términos y condiciones</h3>
          <ul className="space-y-1.5">
            {deal.terms.map((t, i) => (
              <li key={i} className="text-[13px] text-[#888] flex items-start gap-2">
                <span className="text-[#444] mt-0.5">&bull;</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Similar deals */}
        {similarDeals.length > 0 && (
          <>
            <h3 className="text-white text-lg font-bold mt-8 mb-3">También te puede interesar</h3>
            {similarDeals.map((d) => (
              <button key={d.id} onClick={() => navigate('detail', d)} className="w-full flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-3 mb-2 active:bg-[#1a1a1a]">
                <img src={d.image} alt={d.brand} className="w-14 h-14 rounded-lg object-cover" loading="lazy" />
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <img src={d.logo} alt={d.brand} className="w-4 h-4 rounded-full object-contain bg-white shrink-0" />
                    <p className="text-white text-sm font-semibold">{d.brand}</p>
                  </div>
                  <p className="text-[#666] text-xs">{d.detail}</p>
                </div>
                <span className="text-white text-xs font-bold bg-[#333] px-2 py-1 rounded-lg">{d.discount}</span>
              </button>
            ))}
          </>
        )}
      </div>

      {/* Redemption modal */}
      {showQR && <RedemptionFlow deal={deal} variant="dark" onClose={() => setShowQR(false)} />}

      {/* CTA bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-[#1a1a25] px-5 pt-3 flex gap-2" style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}>
        <button
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(`${deal.brand}: ${deal.discount} - ${deal.detail}. Descarga DescluB: desclub.com.mx`)}`, '_blank')}
          className="w-12 h-[52px] bg-[#25D366] rounded-2xl flex items-center justify-center active:scale-95 transition-transform shrink-0"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        </button>
        {deal.dist && (
          <button
            onClick={() => navigate('map')}
            className="w-12 h-[52px] bg-[#1a1a1a] border border-[#2a2a3a] rounded-2xl flex items-center justify-center active:scale-95 transition-transform shrink-0"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </button>
        )}
        <button
          onClick={() => setShowQR(true)}
          className="flex-1 h-[52px] bg-white text-black rounded-2xl flex items-center justify-center font-bold text-[17px] active:scale-[0.97] transition-transform"
        >
          Canjear descuento
        </button>
      </div>
    </div>
  )
}
