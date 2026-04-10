const NOTIFICATIONS = [
  { id: 1, type: 'deal', title: 'Nueva oferta: Liverpool 20% OFF', body: 'Ropa y accesorios seleccionados', time: 'Hace 2h', read: false },
  { id: 2, type: 'expiry', title: 'Tu descuento en Starbucks vence mañana', body: '15% OFF en todas las bebidas', time: 'Hace 5h', read: false },
  { id: 3, type: 'points', title: 'Ganaste 50 puntos', body: 'Canje en Cinépolis — 2x1 Boletos', time: 'Ayer', read: true },
  { id: 4, type: 'promo', title: 'Doble puntos este fin de semana', body: 'Gana 2X en todos los comercios sáb-dom', time: 'Ayer', read: true },
  { id: 5, type: 'deal', title: 'Hertz: 25% OFF renta de auto', body: 'Disponible este fin de semana', time: '2 días', read: true },
]

const ICONS = {
  deal: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z',
  expiry: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7V7z',
  points: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  promo: 'M12 2L12 22 M2 12L22 12 M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10a10 10 0 0 1-10-10A10 10 0 0 1 12 2z',
}

const COLORS = {
  deal: 'bg-blue-500/15 text-blue-400',
  expiry: 'bg-red-500/15 text-red-400',
  points: 'bg-green-500/15 text-green-400',
  promo: 'bg-purple-500/15 text-purple-400',
}

export default function NotificationsPanel({ onClose }) {
  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-16" onClick={onClose}>
      <div className="bg-[#111] w-[calc(100%-2rem)] max-w-[380px] rounded-2xl border border-[#222] overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]">
          <h2 className="text-white text-base font-bold">Notificaciones</h2>
          <button onClick={onClose} className="text-[#555] text-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {NOTIFICATIONS.map(n => (
            <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-[#1a1a1a] last:border-0 ${!n.read ? 'bg-[#0a0a15]' : ''}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${COLORS[n.type]}`}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d={ICONS[n.type]} /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${!n.read ? 'text-white' : 'text-[#aaa]'} leading-tight`}>{n.title}</p>
                <p className="text-xs text-[#666] mt-0.5">{n.body}</p>
                <p className="text-[10px] text-[#444] mt-1">{n.time}</p>
              </div>
              {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
