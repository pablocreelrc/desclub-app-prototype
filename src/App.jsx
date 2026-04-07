import { useState } from 'react'
import './App.css'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import DealDetailScreen from './screens/DealDetailScreen'

const DEALS = [
  { id: 1, brand: 'Cinépolis', discount: '2x1', detail: 'Martes y Jueves', dist: '1.2 km', rating: 4.8, cat: '🎬 Cine', description: 'Compra 1 boleto y lleva el 2do GRATIS todos los martes y jueves. Aplica para todas las salas incluyendo IMAX, 4DX y Macro XE.', expiry: '15 días', redeemed: 342, terms: ['Válido martes y jueves', 'No acumulable con otras promociones', 'Presentar membresía DescluB vigente', 'Sujeto a disponibilidad'] },
  { id: 2, brand: 'Hertz', discount: '25% OFF', detail: 'Renta fin de semana', dist: '3.5 km', rating: 4.5, cat: '🚗 Autos', description: 'Obtén 25% de descuento en tu renta de auto para fines de semana. Incluye seguro básico y kilometraje ilimitado.', expiry: '30 días', redeemed: 128, terms: ['Válido viernes a domingo', 'Reservación con 48hrs de anticipación', 'Presentar membresía DescluB vigente', 'No aplica en temporada alta'] },
  { id: 3, brand: 'Starbucks', discount: '15% OFF', detail: 'Todas las bebidas', dist: '0.4 km', rating: 4.7, cat: '🍔 Comida', description: '15% de descuento en cualquier bebida del menú. Aplica en cualquier sucursal participante.', expiry: '7 días', redeemed: 891, terms: ['Una bebida por visita', 'No acumulable', 'Sucursales participantes', 'Presentar QR de membresía'] },
  { id: 4, brand: 'Sport City', discount: '3 días GRATIS', detail: 'Pase de cortesía', dist: '2.1 km', rating: 4.3, cat: '💆 Wellness', description: 'Prueba Sport City con 3 días de acceso completo a todas las instalaciones sin costo.', expiry: '10 días', redeemed: 256, terms: ['Una vez por usuario', 'Registro presencial requerido', 'Aplica en cualquier sucursal', 'Mayor de 18 años'] },
  { id: 5, brand: 'Liverpool', discount: '20% OFF', detail: 'Ropa y accesorios', dist: '0.8 km', rating: 4.6, cat: '🛍 Retail', description: '20% de descuento en ropa y accesorios seleccionados. Válido en tienda física y en línea.', expiry: '20 días', redeemed: 567, terms: ['Departamentos seleccionados', 'No aplica con otras promociones', 'Válido en tienda y online', 'Máximo $5,000 MXN de descuento'] },
  { id: 6, brand: 'Volaris', discount: '10% OFF', detail: 'Vuelos nacionales', dist: '', rating: 4.1, cat: '✈️ Viajes', description: 'Descuento exclusivo en vuelos nacionales comprando desde la app de Volaris con tu código DescluB.', expiry: '45 días', redeemed: 89, terms: ['Compra en volaris.com o app', 'Código único por membresía', 'Sujeto a disponibilidad de tarifas', 'No aplica en temporada alta'] },
]

export default function App() {
  const [screen, setScreen] = useState('login')
  const [selectedDeal, setSelectedDeal] = useState(null)

  const navigate = (s, deal = null) => {
    setScreen(s)
    if (deal) setSelectedDeal(deal)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative" style={{ width: 390, height: 844 }}>
        <div className="w-full h-full bg-white rounded-[40px] overflow-hidden shadow-2xl relative">
          {screen === 'login' && <LoginScreen onLogin={() => navigate('home')} />}
          {screen === 'home' && <HomeScreen deals={DEALS} onDealClick={(d) => navigate('detail', d)} />}
          {screen === 'detail' && <DealDetailScreen deal={selectedDeal} onBack={() => navigate('home')} />}
        </div>
      </div>
    </div>
  )
}
