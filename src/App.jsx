import { useState } from 'react'
import './App.css'
import { AppProvider, useApp } from './context/AppContext'
import { ThemeProvider } from './context/ThemeContext'
import IPhoneFrame from './components/iPhoneFrame'
import StatusBar from './components/StatusBar'
import TabBar from './components/layout/TabBar'
import Header from './components/layout/Header'
import Onboarding from './components/Onboarding'
import NotificationsPanel from './components/NotificationsPanel'
import ThemeDemo from './components/ThemeDemo'
import HomeScreen from './screens/tabs/HomeScreen'
import DealsScreen from './screens/tabs/DealsScreen'
import RewardsScreen from './screens/tabs/RewardsScreen'
import WalletScreen from './screens/tabs/WalletScreen'
import DealDetailScreen from './screens/detail/DealDetailScreen'
import MapScreen from './screens/detail/MapScreen'
import ProfileSheet from './screens/profile/ProfileSheet'

function LoginScreen({ onLogin }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-black">
      <div className="flex-1 relative flex flex-col items-center justify-center px-10 text-center">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-[#1a2a4a] to-[#0a0a0f]" />
        <div className="relative z-10">
          {/* DescluB brand logo */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white text-2xl font-bold tracking-tighter">DC</span>
              </div>
              <div className="text-left">
                <p className="text-white text-2xl font-bold tracking-tight leading-none">DescluB</p>
                <p className="text-blue-400 text-xs font-semibold tracking-widest leading-none mt-1">DESCUENTOS + PUNTOS</p>
              </div>
            </div>
          </div>
          <p className="text-[#666680] text-sm leading-relaxed mb-2">
            Descuentos exclusivos, puntos<br />que valen y marcas que amas.
          </p>
          <div className="flex gap-6 mt-8 justify-center">
            {[{ n: '6,000+', l: 'comercios' }, { n: '500+', l: 'marcas' }, { n: '1:1', l: 'puntos' }].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-white text-lg font-bold">{s.n}</p>
                <p className="text-[#555] text-[10px]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-8 flex flex-col gap-3" style={{ paddingBottom: 'calc(2.5rem + env(safe-area-inset-bottom, 0px))' }}>
        <button onClick={onLogin} className="w-full h-[52px] bg-white text-black rounded-xl font-semibold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> Continuar con Apple
        </button>
        <button onClick={onLogin} className="w-full h-[52px] bg-[#111] border border-[#222] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuar con Google
        </button>
        <button onClick={onLogin} className="w-full h-[52px] bg-[#111] border border-[#222] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-transform">
          Continuar con Email
        </button>
      </div>
    </div>
  )
}

function AppInner() {
  const { screen, setScreen, tab, setTab, selectedDeal, showNotifications, setShowNotifications, showQRCard, setShowQRCard, showProfile, setShowProfile } = useApp()
  const [showThemeDemo, setShowThemeDemo] = useState(false)
  const [dealsCategoryFilter, setDealsCategoryFilter] = useState(null)

  // Handle category selection from HomeScreen → switch to deals tab with filter
  const handleCategorySelect = (catKey) => {
    setDealsCategoryFilter(catKey)
    setTab('deals')
  }

  // Deal detail screen
  if (screen === 'detail' && selectedDeal) {
    return (
      <IPhoneFrame version="b">
        <StatusBar variant="dark" />
        <DealDetailScreen />
      </IPhoneFrame>
    )
  }

  // Map screen
  if (screen === 'map') {
    return (
      <IPhoneFrame version="b">
        <StatusBar variant="dark" />
        <MapScreen />
      </IPhoneFrame>
    )
  }

  // Login screen
  if (screen === 'login') {
    return (
      <IPhoneFrame version="b">
        <StatusBar variant="dark" />
        <LoginScreen onLogin={() => setScreen('onboarding')} />
      </IPhoneFrame>
    )
  }

  // Onboarding
  if (screen === 'onboarding') {
    return (
      <IPhoneFrame version="b">
        <StatusBar variant="dark" />
        <Onboarding variant="dark" onComplete={() => setScreen('app')} />
      </IPhoneFrame>
    )
  }

  // Main app
  return (
    <>
      <IPhoneFrame version="b">
        <div className="flex-1 min-h-0 flex flex-col bg-black text-white relative overflow-hidden">
          <StatusBar variant="dark" />
          <Header
            onBellPress={() => setShowNotifications(true)}
            onAvatarPress={() => setShowProfile(true)}
          />

          {/* Tab content */}
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">
            {tab === 'home' && <HomeScreen onCategorySelect={handleCategorySelect} />}
            {tab === 'deals' && <DealsScreen initialCategory={dealsCategoryFilter} />}
            {tab === 'rewards' && <RewardsScreen />}
            {tab === 'wallet' && <WalletScreen />}
          </div>

          {/* Overlays */}
          {showProfile && <ProfileSheet onClose={() => setShowProfile(false)} onLogout={() => { setShowProfile(false); setScreen('login') }} />}
          {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
          {showQRCard && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQRCard(false)}>
              <div className="bg-[#111] rounded-3xl p-6 mx-6 text-center border border-[#2a2a3a]" onClick={e => e.stopPropagation()}>
                <h2 className="text-lg font-bold text-white mb-1">Tu Membresía DescluB</h2>
                <p className="text-sm text-[#888] mb-4">Presenta este QR en el comercio</p>
                <div className="w-44 h-44 mx-auto bg-white rounded-2xl flex items-center justify-center mb-3">
                  <div className="grid grid-cols-7 gap-[2px] p-3">
                    {Array.from({ length: 49 }).map((_, i) => (
                      <div key={i} className={`w-3.5 h-3.5 rounded-sm ${[0,1,2,5,6,7,13,14,20,21,27,28,35,42,43,44,47,48,10,11,16,17,31,32,37,38].includes(i) ? 'bg-gray-900' : 'bg-gray-100'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#666] font-mono">5114 1102 5020 1775</p>
                <p className="text-[10px] text-blue-400 mt-1">Pablo Creel &bull; Gold</p>
                <button onClick={() => setShowQRCard(false)} className="mt-4 w-full h-11 bg-[#1a1a1a] rounded-xl text-white text-sm font-semibold">Cerrar</button>
              </div>
            </div>
          )}

          {/* Tab bar */}
          <TabBar active={tab} onChange={(t) => { setTab(t); if (t === 'deals') setDealsCategoryFilter(null); }} onDCPress={() => setShowQRCard(true)} />
        </div>
      </IPhoneFrame>

      {/* Theme demo button */}
      <button
        onClick={() => setShowThemeDemo(true)}
        className="fixed z-[55] left-3 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 flex items-center gap-1.5 text-white/60 text-[10px] font-semibold active:bg-white/20 transition-colors"
        style={{ bottom: 'calc(110px + env(safe-area-inset-bottom, 0px))' }}
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        Demo Clientes
      </button>

      {showThemeDemo && <ThemeDemo onClose={() => setShowThemeDemo(false)} />}
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </ThemeProvider>
  )
}
