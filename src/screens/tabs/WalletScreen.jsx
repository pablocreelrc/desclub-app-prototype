import { useState } from 'react'
import { USER } from '../../data/user'

export default function WalletScreen() {
  const [flipped, setFlipped] = useState(false)
  const [addedToWallet, setAddedToWallet] = useState(false)

  return (
    <div className="px-5 pb-6 pt-2">
      {/* Membership card with flip animation */}
      <div className="card-flip-container mb-4">
        <button onClick={() => setFlipped(!flipped)} className="w-full">
          <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`} style={{ height: 210 }}>
            {/* Front */}
            <div className="card-flip-front w-full h-[210px] bg-gradient-to-br from-[#1a2a4a] to-[#0f1a30] rounded-2xl border border-[#2a3a5a] p-5 relative overflow-hidden">
              <div className="absolute top-[-20px] right-[-20px] w-36 h-36 rounded-full border-[16px] border-white/5" />
              <div className="absolute bottom-[-25px] left-[-25px] w-40 h-40 rounded-full border-[16px] border-white/5" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-white text-xl font-bold tracking-tighter">DescluB</span>
                  <span className="text-blue-400 text-[10px] font-bold bg-blue-500/15 px-2.5 py-0.5 rounded-full">GOLD</span>
                </div>
                <div>
                  <p className="text-[#556] text-[10px] mb-1">NÚMERO DE MEMBRESIA</p>
                  <p className="text-white text-lg font-mono tracking-[3px]">{USER.memberNumber}</p>
                </div>
                <div className="flex justify-between">
                  <div><p className="text-[#556] text-[9px]">MIEMBRO</p><p className="text-white text-sm font-semibold">{USER.name}</p></div>
                  <div className="text-right"><p className="text-[#556] text-[9px]">VENCE</p><p className="text-white text-sm font-semibold">{USER.expiry}</p></div>
                </div>
              </div>
            </div>
            {/* Back */}
            <div className="card-flip-back w-full h-[210px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl relative overflow-hidden">
              <div className="w-full h-10 bg-gray-700 mt-7" />
              <div className="px-5 mt-3">
                <div className="bg-white rounded-md h-9 flex items-center justify-end px-3">
                  <span className="text-gray-800 text-[13px] font-mono font-bold">CVV: 847</span>
                </div>
                <p className="text-gray-400 text-[10px] mt-3 leading-relaxed">
                  Propiedad de Loyalty Solutions SA de CV. Soporte: WhatsApp
                </p>
              </div>
              <div className="absolute bottom-3 right-5">
                <span className="text-gray-600 text-[16px] font-bold">DescluB</span>
              </div>
            </div>
          </div>
        </button>
        <p className="text-center text-[#555] text-xs mt-2">Toca para {flipped ? 'ver frente' : 'ver reverso'}</p>
      </div>

      {/* Add to Wallet button */}
      <button
        onClick={() => setAddedToWallet(true)}
        className={`w-full h-12 rounded-xl font-semibold text-sm mb-5 flex items-center justify-center gap-2 transition-all ${addedToWallet ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-white text-black active:scale-[0.97]'}`}
      >
        {addedToWallet ? (
          <><svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Agregada a Cartera</>
        ) : (
          <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> Agregar a Apple Wallet</>
        )}
      </button>

      {/* Savings dashboard */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-4 mb-5">
        <p className="text-white font-bold text-sm mb-2.5">Tu ahorro</p>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
            <p className="text-white text-xl font-bold">${USER.savings.month.toLocaleString()}</p>
            <p className="text-white/65 text-[11px]">Este mes</p>
          </div>
          <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
            <p className="text-white text-xl font-bold">${USER.savings.total.toLocaleString()}</p>
            <p className="text-white/65 text-[11px]">Acumulado</p>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { value: USER.stats.canjes, label: 'Canjes' },
          { value: USER.stats.favoritos, label: 'Favoritos' },
          { value: USER.stats.visitas, label: 'Visitas' },
        ].map((s) => (
          <div key={s.label} className="bg-[#111] border border-[#1a1a1a] rounded-xl p-3 text-center">
            <p className="text-white text-lg font-bold">{s.value}</p>
            <p className="text-[#888] text-[11px]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <h3 className="text-white text-sm font-bold mb-2">Últimos canjes</h3>
      {[
        { brand: 'Cinépolis', date: 'Hoy, 3:45 PM', discount: '2x1', saved: '$89' },
        { brand: 'Starbucks', date: 'Ayer, 9:20 AM', discount: '15% OFF', saved: '$42' },
        { brand: 'Liverpool', date: '3 abr, 2:10 PM', discount: '20% OFF', saved: '$580' },
        { brand: 'Tim Hortons', date: '1 abr, 11:00 AM', discount: '2x1', saved: '$65' },
        { brand: 'Sport City', date: '28 mar', discount: '3 días GRATIS', saved: '$350' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#1a1a25] last:border-0">
          <div className="w-9 h-9 bg-blue-500/15 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-9 7.5h-2v-2h2v2zm0-4.5h-2v-2h2v2zm0-4.5h-2v-2h2v2z"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[13px] font-semibold">{item.brand}</p>
            <p className="text-[#555] text-[11px]">{item.date}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-emerald-400 text-[12px] font-semibold">-{item.saved}</p>
            <p className="text-[#555] text-[10px]">{item.discount}</p>
          </div>
        </div>
      ))}

      {/* Linked cards */}
      <h3 className="text-white text-sm font-bold mt-5 mb-1">Gana puntos en pagos</h3>
      <p className="text-[#888] text-xs mb-4">con cualquier tarjeta vinculada</p>

      {[
        { name: 'BBVA Visa', last4: '4521', color: '#004481' },
        { name: 'Nu Credit', last4: '8903', color: '#820AD1' },
      ].map((card, i) => (
        <div key={i} className="flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-2">
          <div className="w-12 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color }}>
            <span className="text-white text-[10px] font-bold">VISA</span>
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{card.name}</p>
            <p className="text-[#888] text-xs">{'\u2022\u2022\u2022\u2022'} {card.last4}</p>
          </div>
          <span className="text-blue-400 text-xs font-semibold">Vinculada</span>
        </div>
      ))}

      <button className="w-full border border-dashed border-[#333] rounded-xl py-4 text-center text-[#555] text-sm font-medium mt-2 active:bg-[#111]">
        + Agregar otra tarjeta
      </button>
    </div>
  )
}
