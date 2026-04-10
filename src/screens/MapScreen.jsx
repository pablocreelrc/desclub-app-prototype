import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const createIcon = (discount) => L.divIcon({
  className: '',
  html: `<div style="
    background: #FF8C00;
    color: white;
    font-weight: 700;
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 12px;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
    border: 2px solid white;
    font-family: Inter, system-ui, sans-serif;
  ">${discount}</div>`,
  iconSize: [60, 28],
  iconAnchor: [30, 28],
})

export default function MapScreen({ deals, onDealClick }) {
  const [selected, setSelected] = useState(null)
  const center = [19.4310, -99.1350]

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white font-va relative">
      {/* Header */}
      <div className="shrink-0 bg-primary-500 pb-3 px-5 pt-safe md:pt-[54px] z-10">
        <h1 className="text-white text-[20px] font-bold">Mapa</h1>
        <p className="text-white/70 text-[13px]">{deals.length} descuentos cerca</p>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {deals.filter(d => d.lat).map((deal) => (
            <Marker
              key={deal.id}
              position={[deal.lat, deal.lng]}
              icon={createIcon(deal.discount)}
              eventHandlers={{ click: () => setSelected(deal) }}
            />
          ))}
        </MapContainer>

        {selected && (
          <div className="absolute bottom-3 left-3 right-3 z-[1000]">
            <button
              onClick={() => onDealClick(selected)}
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden flex active:scale-[0.98] transition-transform"
            >
              <img src={selected.image} alt={selected.brand} className="w-24 h-24 object-cover shrink-0" loading="lazy" />
              <div className="flex-1 p-3 text-left min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-[15px] text-text-primary truncate">{selected.brand}</p>
                  <span className="shrink-0 bg-accent-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">{selected.discount}</span>
                </div>
                <p className="text-[12px] text-text-secondary mt-0.5 truncate">{selected.detail}</p>
                <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-0.5"><svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg> {selected.dist} · ★ {selected.rating}</p>
              </div>
            </button>
            <button onClick={() => setSelected(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full text-[11px] flex items-center justify-center shadow-md">✕</button>
          </div>
        )}
      </div>
    </div>
  )
}
