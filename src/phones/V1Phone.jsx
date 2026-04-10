import { useState } from 'react'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import DealDetailScreen from '../screens/DealDetailScreen'
import MapScreen from '../screens/MapScreen'
import CardScreen from '../screens/CardScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TabBar from '../components/TabBar'
import StatusBar from '../components/StatusBar'

const DEALS = [
  { id: 1, brand: 'Cinépolis', discount: '2x1', detail: 'Martes y Jueves', dist: '1.2 km', rating: 4.8, cat: 'Cine', catKey: 'cine', lat: 19.4326, lng: -99.1332, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=200&fit=crop', description: 'Compra 1 boleto y lleva el 2do GRATIS todos los martes y jueves. Aplica para todas las salas incluyendo IMAX, 4DX y Macro XE.', expiry: '15 días', redeemed: 342, terms: ['Válido martes y jueves', 'No acumulable con otras promociones', 'Presentar membresía DescluB vigente', 'Sujeto a disponibilidad'] },
  { id: 2, brand: 'Hertz', discount: '25% OFF', detail: 'Renta fin de semana', dist: '3.5 km', rating: 4.5, cat: 'Autos', catKey: 'autos', lat: 19.4360, lng: -99.1400, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=200&fit=crop', description: 'Obtén 25% de descuento en tu renta de auto para fines de semana. Incluye seguro básico y kilometraje ilimitado.', expiry: '30 días', redeemed: 128, terms: ['Válido viernes a domingo', 'Reservación con 48hrs de anticipación', 'Presentar membresía DescluB vigente', 'No aplica en temporada alta'] },
  { id: 3, brand: 'Starbucks', discount: '15% OFF', detail: 'Todas las bebidas', dist: '0.4 km', rating: 4.7, cat: 'Comida', catKey: 'comida', lat: 19.4280, lng: -99.1380, image: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=400&h=200&fit=crop', description: '15% de descuento en cualquier bebida del menú. Aplica en cualquier sucursal participante.', expiry: '7 días', redeemed: 891, terms: ['Una bebida por visita', 'No acumulable', 'Sucursales participantes', 'Presentar QR de membresía'] },
  { id: 4, brand: 'Sport City', discount: '3 días GRATIS', detail: 'Pase de cortesía', dist: '2.1 km', rating: 4.3, cat: 'Wellness', catKey: 'wellness', lat: 19.4250, lng: -99.1450, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=200&fit=crop', description: 'Prueba Sport City con 3 días de acceso completo a todas las instalaciones sin costo.', expiry: '10 días', redeemed: 256, terms: ['Una vez por usuario', 'Registro presencial requerido', 'Aplica en cualquier sucursal', 'Mayor de 18 años'] },
  { id: 5, brand: 'Liverpool', discount: '20% OFF', detail: 'Ropa y accesorios', dist: '0.8 km', rating: 4.6, cat: 'Retail', catKey: 'retail', lat: 19.4310, lng: -99.1280, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop', description: '20% de descuento en ropa y accesorios seleccionados. Válido en tienda física y en línea.', expiry: '20 días', redeemed: 567, terms: ['Departamentos seleccionados', 'No aplica con otras promociones', 'Válido en tienda y online', 'Máximo $5,000 MXN de descuento'] },
  { id: 6, brand: 'Volaris', discount: '10% OFF', detail: 'Vuelos nacionales', dist: '', rating: 4.1, cat: 'Viajes', catKey: 'viajes', lat: 19.4370, lng: -99.1250, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=200&fit=crop', description: 'Descuento exclusivo en vuelos nacionales comprando desde la app de Volaris con tu código DescluB.', expiry: '45 días', redeemed: 89, terms: ['Compra en volaris.com o app', 'Código único por membresía', 'Sujeto a disponibilidad de tarifas', 'No aplica en temporada alta'] },
  { id: 7, brand: 'Tim Hortons', discount: '2x1', detail: 'Cafés y donuts', dist: '0.6 km', rating: 4.4, cat: 'Comida', catKey: 'comida', lat: 19.4295, lng: -99.1310, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=200&fit=crop', description: '2x1 en todos los cafés y donuts de lunes a miércoles. Aplica en sucursales participantes.', expiry: '12 días', redeemed: 445, terms: ['Válido lunes a miércoles', 'Una promoción por visita', 'Sucursales participantes', 'No aplica en delivery'] },
  { id: 8, brand: 'Devlyn', discount: '30% OFF', detail: 'Lentes y armazones', dist: '1.5 km', rating: 4.2, cat: 'Retail', catKey: 'retail', lat: 19.4340, lng: -99.1360, image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=200&fit=crop', description: '30% de descuento en armazones y lentes graduados. Incluye marcas premium como Ray-Ban y Oakley.', expiry: '25 días', redeemed: 198, terms: ['Armazones seleccionados', 'Incluye antirreflejante básico', 'Presentar membresía vigente', 'No acumulable'] },
]

export default function V1Phone() {
  const [screen, setScreen] = useState('login')
  const [tab, setTab] = useState('home')
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [savedDeals, setSavedDeals] = useState([])

  const toggleSave = (dealId) => {
    setSavedDeals(prev => prev.includes(dealId) ? prev.filter(id => id !== dealId) : [...prev, dealId])
  }

  if (screen === 'login') {
    return (
      <div className="h-full flex flex-col bg-white relative overflow-hidden font-va">
        <StatusBar variant="light" />
        <div className="flex-1 min-h-0 flex flex-col">
          <LoginScreen onLogin={() => { setScreen('app'); setTab('home'); }} />
        </div>
      </div>
    )
  }

  if (screen === 'detail') {
    return (
      <div className="h-full flex flex-col bg-white relative overflow-hidden font-va">
        <StatusBar variant="light" />
        <div className="flex-1 min-h-0 flex flex-col">
          <DealDetailScreen
            deal={selectedDeal}
            saved={savedDeals.includes(selectedDeal?.id)}
            onToggleSave={() => toggleSave(selectedDeal?.id)}
            onBack={() => setScreen('app')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden font-va">
      <StatusBar variant="light" />
      <div className="flex-1 min-h-0 flex flex-col">
        {tab === 'home' && <HomeScreen deals={DEALS} onDealClick={(d) => { setSelectedDeal(d); setScreen('detail'); }} />}
        {tab === 'map' && <MapScreen deals={DEALS} onDealClick={(d) => { setSelectedDeal(d); setScreen('detail'); }} />}
        {tab === 'card' && <CardScreen />}
        {tab === 'profile' && <ProfileScreen onLogout={() => setScreen('login')} />}
      </div>
      <TabBar active={tab} onChange={(t) => { setTab(t); setScreen('app'); }} />
    </div>
  )
}
