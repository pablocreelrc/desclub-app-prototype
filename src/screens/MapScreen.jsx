import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Custom marker icon
const createIcon = (discount) => L.divIcon({
  className: '',
  html: `<div style="
    background: #E45A3B;
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
    <div className="h-full flex flex-col bg-white relative screen-enter">
      {/* Header */}
      <div className="bg-primary-500 pt-safe-header md:pt-14 pb-4 px-5 z-10">
        <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          Mapa
        </h1>
        <p className="text-white/70 text-[13px] mt-0.5">{deals.length} descuentos cerca de ti</p>
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

        {/* Selected deal card overlay */}
        {selected && (
          <div className="absolute bottom-4 left-4 right-4 z-[1000]">
            <button
              onClick={() => onDealClick(selected)}
              className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex active:scale-[0.98] transition-transform"
            >
              <img src={selected.image} alt={selected.brand} className="w-28 h-28 object-cover" />
              <div className="flex-1 p-3.5 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-base text-gray-900">{selected.brand}</p>
                  <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                    {selected.discount}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{selected.detail}</p>
                <div className="flex items-center gap-3 mt-2.5 text-[11px] text-gray-400">
                  <span>📍 {selected.dist}</span>
                  <span>⭐ {selected.rating}</span>
                  <span>{selected.cat}</span>
                </div>
              </div>
            </button>
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-2 -right-2 w-7 h-7 bg-gray-800 text-white rounded-full text-xs flex items-center justify-center shadow-md"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
