import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DEALS } from '../../data/deals'

const cats = [null, 'Comida', 'Cine', 'Retail', 'Wellness', 'Viajes', 'Autos', 'Entretenimiento', 'Servicios']
const catLabels = { null: 'Todos', 'Comida': 'Comida', 'Cine': 'Cine', 'Retail': 'Retail', 'Wellness': 'Wellness', 'Viajes': 'Viajes', 'Autos': 'Autos', 'Entretenimiento': 'Eventos', 'Servicios': 'Servicios' }

export default function DealsScreen({ initialCategory }) {
  const { navigate } = useApp()
  const [activeCat, setActiveCat] = useState(initialCategory || null)

  const filtered = activeCat ? DEALS.filter(d => d.cat === activeCat) : DEALS

  return (
    <div className="px-5 pb-6 pt-2 overflow-x-hidden">
      <h2 className="text-white text-2xl font-bold mb-1">Todas las ofertas</h2>
      <p className="text-[#888] text-sm mb-4">{filtered.length} descuentos disponibles</p>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-5">
        {cats.map((cat) => (
          <button
            key={String(cat)}
            onClick={() => setActiveCat(cat)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCat === cat
                ? 'bg-white text-black'
                : 'bg-[#111] border border-[#1a1a1a] text-[#888]'
            }`}
          >
            {catLabels[cat]}
          </button>
        ))}
      </div>

      {/* Deal cards */}
      <div className="space-y-3">
        {filtered.map((deal) => (
          <button key={deal.id} onClick={() => navigate('detail', deal)} className="w-full bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden text-left active:scale-[0.98] transition-transform">
            <div className="relative h-36">
              <img src={deal.image} alt={deal.brand} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <img src={deal.logo} alt={deal.brand} className="w-5 h-5 rounded-full object-contain bg-white shrink-0" />
                    <p className="text-white font-bold text-base">{deal.brand}</p>
                  </div>
                  <p className="text-gray-300 text-xs mt-0.5">{deal.detail}</p>
                </div>
                <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">{deal.discount}</span>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {deal.dist && (
                  <span className="text-[#888] text-xs flex items-center gap-0.5">
                    <svg className="w-3 h-3 inline-block" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    {deal.dist}
                  </span>
                )}
                <span className="text-[#555] text-xs">{deal.cat}</span>
              </div>
              <span className="text-blue-400 text-xs font-bold">{deal.points} pts</span>
            </div>
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12 text-[#555]">
          <div className="flex justify-center mb-3">
            <svg className="w-10 h-10 text-[#555]" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </div>
          <p className="font-medium text-white">No hay ofertas en esta categoría</p>
          <p className="text-sm mt-1">Prueba otra categoría</p>
        </div>
      )}
    </div>
  )
}
