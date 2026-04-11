import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useApp } from '../../context/AppContext'
import { DEALS } from '../../data/deals'

const createIcon = (discount) => L.divIcon({
  className: '',
  html: `<div style="
    background: #3b82f6;
    color: white;
    font-weight: 700;
    font-size: 11px;
    padding: 4px 8px;
    border-radius: 12px;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    border: 2px solid rgba(255,255,255,0.3);
    font-family: Inter, system-ui, sans-serif;
  ">${discount}</div>`,
  iconSize: [60, 28],
  iconAnchor: [30, 28],
})

export default function MapScreen() {
  const { navigate, goBack } = useApp()
  const [selected, setSelected] = useState(null)
  const center = [19.4310, -99.1350]
  const dealsWithLocation = DEALS.filter(d => d.lat)

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black relative">
      {/* Header */}
      <div className="shrink-0 bg-[#0a0a0f] border-b border-[#1a1a25] pb-3 px-5 pt-3 z-10 flex items-center gap-3">
        <button
          onClick={goBack}
          className="w-9 h-9 bg-[#1a1a1a] border border-[#2a2a3a] rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div>
          <h1 className="text-white text-[18px] font-bold">Mapa</h1>
          <p className="text-[#888] text-[12px]">{dealsWithLocation.length} descuentos cerca</p>
        </div>
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
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          {dealsWithLocation.map((deal) => (
            <Marker
              key={deal.id}
              position={[deal.lat, deal.lng]}
              icon={createIcon(deal.discount)}
              eventHandlers={{ click: () => setSelected(deal) }}
            />
          ))}
        </MapContainer>

        {/* Selected deal card */}
        {selected && (
          <div className="absolute bottom-3 left-3 right-3 z-[1000]">
            <button
              onClick={() => navigate('detail', selected)}
              className="w-full bg-[#111] border border-[#2a2a3a] rounded-2xl shadow-xl overflow-hidden flex active:scale-[0.98] transition-transform"
            >
              <img src={selected.image} alt={selected.brand} className="w-24 h-24 object-cover shrink-0" loading="lazy" />
              <div className="flex-1 p-3 text-left min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <img src={selected.logo} alt={selected.brand} className="w-4 h-4 rounded-full object-contain bg-white shrink-0" />
                    <p className="font-bold text-[15px] text-white truncate">{selected.brand}</p>
                  </div>
                  <span className="shrink-0 bg-blue-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md">{selected.discount}</span>
                </div>
                <p className="text-[12px] text-[#888] mt-0.5 truncate">{selected.detail}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[11px] text-[#666] flex items-center gap-0.5">
                    <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    {selected.dist}
                  </p>
                  <span className="text-blue-400 text-[11px] font-bold">{selected.points} pts</span>
                </div>
              </div>
            </button>
            <button onClick={() => setSelected(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-[#333] border border-[#444] text-white rounded-full text-[11px] flex items-center justify-center shadow-md">&#10005;</button>
          </div>
        )}
      </div>
    </div>
  )
}
