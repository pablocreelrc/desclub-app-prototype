import { useState } from 'react'
import Onboarding from '../components/Onboarding'
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import DealDetailScreen from '../screens/DealDetailScreen'
import MapScreen from '../screens/MapScreen'
import CardScreen from '../screens/CardScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TabBar from '../components/TabBar'
import StatusBar from '../components/StatusBar'
import { DEALS } from '../data/deals'

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
          <LoginScreen onLogin={() => { setScreen('onboarding'); }} />
        </div>
      </div>
    )
  }

  if (screen === 'onboarding') {
    return (
      <div className="h-full flex flex-col bg-white relative overflow-hidden font-va">
        <StatusBar variant="light" />
        <div className="flex-1 min-h-0 flex flex-col">
          <Onboarding variant="light" onComplete={() => { setScreen('app'); setTab('home'); }} />
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
