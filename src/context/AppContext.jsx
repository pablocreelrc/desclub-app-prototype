import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [screen, setScreen] = useState('login') // login | onboarding | app | detail | map | profile
  const [tab, setTab] = useState('home') // home | deals | rewards | wallet
  const [selectedDeal, setSelectedDeal] = useState(null)
  const [savedDeals, setSavedDeals] = useState([])
  const [points, setPoints] = useState(1250)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showQRCard, setShowQRCard] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const toggleSave = (dealId) => {
    setSavedDeals(prev => prev.includes(dealId) ? prev.filter(id => id !== dealId) : [...prev, dealId])
  }

  const navigate = (newScreen, data) => {
    if (newScreen === 'detail' && data) setSelectedDeal(data)
    setScreen(newScreen)
  }

  const goBack = () => {
    setSelectedDeal(null)
    setScreen('app')
  }

  const value = {
    screen, setScreen, tab, setTab,
    selectedDeal, setSelectedDeal,
    savedDeals, toggleSave,
    points, setPoints,
    showNotifications, setShowNotifications,
    showQRCard, setShowQRCard,
    showProfile, setShowProfile,
    navigate, goBack,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
