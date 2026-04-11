import { useState } from 'react'
import { DEALS } from '../../data/deals'
import { USER } from '../../data/user'
import { useApp } from '../../context/AppContext'

const TRANSFER_PARTNERS = [
  { name: 'Volaris V.Club', ratio: '1:1', icon: 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z' },
  { name: 'Club Premier', ratio: '1:1', icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
  { name: 'Hilton Honors', ratio: '1:1', icon: 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6 3v5.64l-6 3-6-3V7.18l6-3z' },
  { name: 'Cinépolis Club', ratio: '1:2', icon: 'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' },
]

export default function RewardsScreen() {
  const { navigate } = useApp()
  const [redeemTab, setRedeemTab] = useState('Experiencias')
  const rTabs = ['Experiencias', 'Viajes', 'Transferir']

  return (
    <div className="px-5 pb-6 pt-2">
      {/* Points summary card */}
      <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 mb-5">
        <p className="text-[#888] text-xs mb-1">Tu ahorro acumulado</p>
        <p className="text-white text-4xl font-bold">${USER.savings.total.toLocaleString()}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-blue-400 text-xs font-semibold">{'\u2713'} {USER.points.toLocaleString()} puntos disponibles</span>
        </div>
        <div className="mt-4 space-y-0">
          {/* Historial de canjes */}
          <button className="w-full flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z"/></svg>
              <span className="text-white text-sm font-semibold">Historial de canjes</span>
            </div>
            <span className="text-[#444]">{'\u203A'}</span>
          </button>
          {/* Alertas de ofertas */}
          <button className="w-full flex items-center justify-between py-3 border-b border-[#2a2a3a]">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
              <span className="text-white text-sm font-semibold">Alertas de ofertas</span>
            </div>
            <span className="text-blue-400 text-xs font-semibold">On</span>
          </button>
          {/* Pagar con puntos */}
          <button className="w-full flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <span className="text-white text-sm font-semibold">Pagar con puntos</span>
            </div>
            <span className="text-[#888] text-xs bg-[#1a1a1a] px-2 py-0.5 rounded">Gana 1,000 pts mínimo</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-0 bg-[#111] rounded-xl p-1 mb-5 border border-[#2a2a3a]">
        {rTabs.map((t) => (
          <button key={t} onClick={() => setRedeemTab(t)} className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-colors ${redeemTab === t ? 'bg-white text-black' : 'text-[#888]'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Experiencias */}
      {redeemTab === 'Experiencias' && (
        <div className="space-y-3">
          {DEALS.slice(0, 4).map((deal) => (
            <button key={deal.id} onClick={() => navigate('detail', deal)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform">
              <div className="relative h-32">
                <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
                  <div className="flex items-center gap-1.5">
                    <img src={deal.logo} alt={deal.brand} className="w-4 h-4 rounded-full object-contain bg-white shrink-0" />
                    <p className="text-white font-bold text-sm">{deal.brand}</p>
                  </div>
                  <span className="text-white text-xs bg-blue-500 px-2 py-1 rounded-lg font-bold">{deal.discount}</span>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-[#888] text-xs">{deal.detail}</p>
                <span className="text-blue-400 text-xs font-bold">{deal.points} pts</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Viajes */}
      {redeemTab === 'Viajes' && (
        <div>
          <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden mb-4">
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=200&fit=crop" alt="travel" className="w-full h-36 object-cover" loading="lazy" />
            <div className="p-4">
              <span className="text-blue-400 text-[10px] font-bold bg-blue-500/15 px-2 py-0.5 rounded">TRAVEL REWARDS</span>
              <h3 className="text-white font-bold text-base mt-2">Transfiere puntos DescluB a Volaris</h3>
              <p className="text-[#888] text-xs mt-1">Reserva vuelos nacionales con tus puntos acumulados.</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[#888] text-xs">Transferencia 1:1</span>
                <span className="text-[#888] text-xs">{'\u2022'}</span>
                <span className="text-[#888] text-xs">1K pts = 1K millas</span>
              </div>
              <button className="mt-3 bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg active:bg-blue-600">Transferir puntos</button>
            </div>
          </div>
          <h3 className="text-white text-sm font-bold mb-3">Beneficios en viajes</h3>
          {['2X puntos en hoteles', '1X puntos en vuelos', '10% descuento Hertz'].map((b, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[#1a1a25]">
              <span className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
              </span>
              <p className="text-white text-sm">{b}</p>
            </div>
          ))}
        </div>
      )}

      {/* Transferir */}
      {redeemTab === 'Transferir' && (
        <div>
          <p className="text-[#888] text-sm mb-4">Transfiere puntos a programas de lealtad aliados.</p>
          {TRANSFER_PARTNERS.map((p, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#111] border border-[#1a1a1a] rounded-xl p-4 mb-2">
              <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d={p.icon}/></svg>
              <div className="flex-1">
                <p className="text-white text-sm font-semibold">{p.name}</p>
                <p className="text-[#888] text-xs">Transfer {p.ratio}</p>
              </div>
              <button className="bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg active:bg-blue-600">Transferir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
