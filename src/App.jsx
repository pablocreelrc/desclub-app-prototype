import { useState, useEffect } from 'react'
import './App.css'
import V1Phone from './phones/V1Phone'
import V2App from './screens/v2/V2App'
import V3App from './screens/v3/V3App'
import IPhoneFrame from './components/iPhoneFrame'
import VersionToggle from './components/VersionToggle'

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
    </>
  )
}
