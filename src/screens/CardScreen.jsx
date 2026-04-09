import { useState } from 'react'

export default function CardScreen() {
  const [flipped, setFlipped] = useState(false)
  const [addedToWallet, setAddedToWallet] = useState(false)

  return (
    <div className="h-full flex flex-col bg-white font-va">
      {/* Header */}
      <div className="shrink-0 bg-primary-500 pb-4 px-5 pt-safe md:pt-[54px]">
        <h1 className="text-white text-[20px] font-bold">Mi Tarjeta</h1>
        <p className="text-white/70 text-[13px]">Membresía virtual DescluB</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 pt-5 pb-4">
        {/* Card flip */}
        <div className="card-flip-container mb-5">
          <button onClick={() => setFlipped(!flipped)} className="w-full">
            <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`} style={{ height: 210 }}>
              {/* Front */}
              <div className="card-flip-front w-full h-[210px] bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-2xl p-5 relative overflow-hidden shadow-lg shadow-primary-500/25">
                <div className="absolute top-[-20px] right-[-20px] w-36 h-36 rounded-full border-[16px] border-white/[0.06]" />
                <div className="absolute bottom-[-25px] left-[-25px] w-40 h-40 rounded-full border-[16px] border-white/[0.06]" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-[20px] font-bold">DescluB</span>
                    <span className="text-white/60 text-[10px] font-semibold bg-white/10 px-2.5 py-1 rounded-full">PREMIUM</span>
                  </div>
                  <div>
                    <p className="text-white/55 text-[11px] mb-0.5">Número de membresía</p>
                    <p className="text-white text-[18px] font-mono tracking-[2px]">5114 1102 5020 1775</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-white/50 text-[10px]">MIEMBRO</p>
                      <p className="text-white text-[13px] font-semibold">Pablo Creel</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/50 text-[10px]">VENCE</p>
                      <p className="text-white text-[13px] font-semibold">06/26</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Back */}
              <div className="card-flip-back w-full h-[210px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl relative overflow-hidden shadow-lg">
                <div className="w-full h-10 bg-gray-700 mt-7" />
                <div className="px-5 mt-3">
                  <div className="bg-white rounded-md h-9 flex items-center justify-end px-3">
                    <span className="text-gray-800 text-[13px] font-mono font-bold">CVV: 847</span>
                  </div>
                  <p className="text-gray-400 text-[10px] mt-3 leading-relaxed">
                    Propiedad de Loyalty Solutions SA de CV. Soporte: WhatsApp 💬
                  </p>
                </div>
                <div className="absolute bottom-3 right-5">
                  <span className="text-gray-600 text-[16px] font-bold">DescluB</span>
                </div>
              </div>
            </div>
          </button>
          <p className="text-center text-[11px] text-text-secondary mt-2.5">Toca para {flipped ? 'ver frente' : 'ver reverso'}</p>
        </div>

        {/* Wallet */}
        <button
          onClick={() => setAddedToWallet(true)}
          className={`w-full h-12 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all mb-5 ${
            addedToWallet
              ? 'bg-green-50 text-green-600 border border-green-200'
              : 'bg-gray-900 text-white active:scale-[0.98]'
          }`}
        >
          {addedToWallet ? '✅ Agregada a Wallet' : ' Agregar a Apple Wallet'}
        </button>

        {/* Savings */}
        <div className="bg-gradient-to-r from-accent-500 to-accent-400 rounded-2xl p-4 mb-5 shadow-md shadow-accent-500/15">
          <p className="text-white font-bold text-[14px] mb-2.5">Tu ahorro</p>
          <div className="flex gap-3">
            <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
              <p className="text-white text-[20px] font-bold">$2,450</p>
              <p className="text-white/65 text-[11px]">Este mes</p>
            </div>
            <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
              <p className="text-white text-[20px] font-bold">$18,320</p>
              <p className="text-white/65 text-[11px]">Acumulado</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          {[
            { value: '23', label: 'Canjes' },
            { value: '12', label: 'Favoritos' },
            { value: '48', label: 'Visitas' },
          ].map((s) => (
            <div key={s.label} className="bg-surface rounded-xl p-3 text-center">
              <p className="text-[18px] font-bold text-text-primary">{s.value}</p>
              <p className="text-[11px] text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent */}
        <p className="text-[14px] font-bold text-text-primary mb-2">Últimos canjes</p>
        {[
          { brand: 'Cinépolis', date: 'Hoy, 3:45 PM', discount: '2x1', saved: '$89' },
          { brand: 'Starbucks', date: 'Ayer, 9:20 AM', discount: '15% OFF', saved: '$42' },
          { brand: 'Liverpool', date: '3 abr, 2:10 PM', discount: '20% OFF', saved: '$580' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
            <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center text-[14px]">🎟</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-text-primary">{item.brand}</p>
              <p className="text-[11px] text-text-secondary">{item.date}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[12px] font-semibold text-success">-{item.saved}</p>
              <p className="text-[10px] text-text-secondary">{item.discount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
