import { useState, useEffect } from 'react'
import './App.css'
import V1Phone from './phones/V1Phone'
import V2App from './screens/v2/V2App'
import V3App from './screens/v3/V3App'
import IPhoneFrame from './components/iPhoneFrame'
import VersionToggle from './components/VersionToggle'
import ThemeDemo from './components/ThemeDemo'

const VERSIONS = [
  { key: 'a', sub: 'Consumer', color: '#2196F3' },
  { key: 'b', sub: 'Membership Pass', color: '#ffffff' },
  { key: 'c', sub: 'Puntos + Wallet', color: '#3b82f6' },
]

function getVersionFromHash() {
  const hash = window.location.hash.replace('#', '')
  return ['a', 'b', 'c'].includes(hash) ? hash : 'a'
}

function DesktopPicker({ active, onChange }) {
  const isDark = active !== 'a'
  return (
    <div className={`hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-[60] items-center gap-1 p-1 rounded-2xl backdrop-blur-xl border ${
      isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
    }`}>
      {VERSIONS.map((v) => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className="relative px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
          style={active === v.key ? {
            background: v.color,
            color: '#fff',
            boxShadow: `0 4px 14px ${v.color}55`,
          } : {
            color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.35)',
          }}
        >
          <span className="block">{v.key.toUpperCase()}</span>
          <span className="block text-[10px] font-normal opacity-70 mt-0.5">{v.sub}</span>
        </button>
      ))}
    </div>
  )
}

export default function App() {
  const [version, setVersion] = useState(getVersionFromHash)
  const [showThemeDemo, setShowThemeDemo] = useState(false)

  useEffect(() => {
    const onHash = () => setVersion(getVersionFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Set mobile background color to match version theme
  useEffect(() => {
    const bg = version === 'a' ? '#ffffff' : '#000000'
    document.documentElement.style.setProperty('--app-bg', bg)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content',
      version === 'a' ? '#2196F3' : '#000000'
    )
  }, [version])

  const changeVersion = (v) => {
    window.location.hash = v
    setVersion(v)
  }

  return (
    <>
      <IPhoneFrame version={version}>
        {version === 'a' && <V1Phone />}
        {version === 'b' && <V2App />}
        {version === 'c' && <V3App />}
      </IPhoneFrame>

      <DesktopPicker active={version} onChange={changeVersion} />

      <div className="md:hidden">
        <VersionToggle active={version} onChange={changeVersion} />
      </div>

      {/* White-label demo button */}
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
