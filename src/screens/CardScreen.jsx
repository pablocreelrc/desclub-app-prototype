import { useState } from 'react'

export default function CardScreen() {
  const [flipped, setFlipped] = useState(false)
  const [addedToWallet, setAddedToWallet] = useState(false)

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-primary-500 pt-14 pb-5 px-5">
        <h1 className="text-white text-xl font-bold">💳 Mi Tarjeta</h1>
        <p className="text-white/70 text-[13px] mt-0.5">Membresía virtual DescluB</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-4">
        {/* Card with flip animation */}
        <div className="card-flip-container mb-6">
          <button onClick={() => setFlipped(!flipped)} className="w-full">
            <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`} style={{ height: 224 }}>
              {/* Front */}
              <div className="card-flip-front w-full h-56 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-primary-500/30">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-[-20px] right-[-20px] w-40 h-40 rounded-full border-[20px] border-white" />
                  <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 rounded-full border-[20px] border-white" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-2xl font-bold tracking-tight">DescluB</span>
                    <span className="text-white/60 text-xs font-medium bg-white/10 px-3 py-1 rounded-full">PREMIUM</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs mb-1">Número de membresía</p>
                    <p className="text-white text-xl font-mono tracking-[3px]">5114 1102 5020 1775</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-white/60 text-[10px] mb-0.5">MIEMBRO</p>
                      <p className="text-white text-sm font-semibold">Pablo Creel</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-[10px] mb-0.5">VENCE</p>
                      <p className="text-white text-sm font-semibold">06/26</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Back */}
              <div className="card-flip-back w-full h-56 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="w-full h-12 bg-gray-700 mt-8" />
                <div className="px-6 mt-4">
                  <div className="bg-white rounded-lg h-10 flex items-center justify-end px-4">
                    <span className="text-gray-800 text-sm font-mono font-bold">CVV: 847</span>
                  </div>
                  <p className="text-gray-400 text-[10px] mt-3 leading-relaxed">
                    Esta tarjeta es propiedad de Loyalty Solutions SA de CV.
                    Para soporte: WhatsApp 💬
                  </p>
                </div>
                <div className="absolute bottom-4 right-6">
                  <span className="text-gray-600 text-lg font-bold">DescluB</span>
                </div>
              </div>
            </div>
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">Toca para {flipped ? 'ver frente' : 'ver reverso'}</p>
        </div>

        {/* Add to Wallet */}
        <button
          onClick={() => setAddedToWallet(true)}
          className={`w-full h-14 rounded-2xl font-semibold text-base flex items-center justify-center gap-3 transition-all mb-6 ${
            addedToWallet
              ? 'bg-green-50 text-green-600 border-2 border-green-200'
              : 'bg-black text-white active:scale-[0.97]'
          }`}
        >
          {addedToWallet ? (
            <>✅ Agregada a tu wallet</>
          ) : (
            <> Agregar a Apple Wallet</>
          )}
        </button>

        {/* Savings */}
        <div className="bg-gradient-to-r from-accent-500 to-accent-400 rounded-2xl p-5 mb-5 shadow-lg shadow-accent-500/20">
          <h3 className="text-white font-bold text-base mb-3">Tu ahorro</h3>
          <div className="flex gap-4">
            <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
              <p className="text-white text-2xl font-bold">$2,450</p>
              <p className="text-white/70 text-[11px] mt-0.5">Este mes</p>
            </div>
            <div className="flex-1 bg-white/20 rounded-xl p-3 text-center">
              <p className="text-white text-2xl font-bold">$18,320</p>
              <p className="text-white/70 text-[11px] mt-0.5">Acumulado</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { value: '23', label: 'Canjes', icon: '🎟' },
            { value: '12', label: 'Favoritos', icon: '❤️' },
            { value: '48', label: 'Visitas', icon: '👣' },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-50 rounded-2xl p-3.5 text-center">
              <p className="text-lg mb-1">{stat.icon}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent redemptions */}
        <h3 className="font-bold text-base text-gray-900 mb-3">Últimos canjes</h3>
        {[
          { brand: 'Cinépolis', date: 'Hoy, 3:45 PM', discount: '2x1', saved: '$89' },
          { brand: 'Starbucks', date: 'Ayer, 9:20 AM', discount: '15% OFF', saved: '$42' },
          { brand: 'Liverpool', date: '3 abr, 2:10 PM', discount: '20% OFF', saved: '$580' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-sm">🎟</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{item.brand}</p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-green-600">-{item.saved}</p>
              <p className="text-[10px] text-gray-400">{item.discount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
